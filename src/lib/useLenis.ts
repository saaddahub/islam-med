import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './useScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

export function useLenis() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 0.95,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      anchors: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    let dialogWasOpen = false;
    const syncDialog = () => {
      const dialogIsOpen = Boolean(document.querySelector('dialog[open]'));
      if (dialogIsOpen === dialogWasOpen) return;
      dialogWasOpen = dialogIsOpen;
      if (dialogIsOpen) lenis.stop();
      else lenis.start();
    };
    syncDialog();
    // A conditionally rendered dialog can disappear before its queued close/toggle event fires.
    // Observe removal as well as the open attribute so page scrolling always resumes.
    const dialogObserver = new MutationObserver(syncDialog);
    dialogObserver.observe(document.body, {
      childList: true, subtree: true, attributes: true, attributeFilter: ['open'],
    });

    return () => {
      dialogObserver.disconnect();
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, [reduced]);
}

export default useLenis;

