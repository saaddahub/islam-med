import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './useScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

export function useLenis(viewKey?: string) {
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

    // A department reading view remounts the landing scenes. Their async hero pin
    // can shift anchors after navigation; align again on refresh until user input.
    const anchor = window.location.hash.slice(1);
    let anchorFrame = 0;
    let followAnchor = true;
    const alignAnchor = () => {
      cancelAnimationFrame(anchorFrame);
      if (!followAnchor) return;
      anchorFrame = requestAnimationFrame(() => {
        if (!followAnchor) return;
        lenis.resize();
        const target = document.getElementById(anchor);
        const pinnedStart = anchor === 'departments' ? ScrollTrigger.getById('cinema-departments')?.start : undefined;
        lenis.scrollTo(pinnedStart !== undefined ? pinnedStart + 1 : target || 0, {
          immediate: true, force: true, offset: pinnedStart !== undefined || !target || anchor === 'top' ? 0 : -96,
        });
      });
    };
    const stopFollowing = () => { followAnchor = false; cancelAnimationFrame(anchorFrame); };
    const inputEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const;
    inputEvents.forEach(type => window.addEventListener(type, stopFollowing, { passive: true }));
    ScrollTrigger.addEventListener('refresh', alignAnchor);
    alignAnchor();

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
      cancelAnimationFrame(anchorFrame);
      inputEvents.forEach(type => window.removeEventListener(type, stopFollowing));
      ScrollTrigger.removeEventListener('refresh', alignAnchor);
      dialogObserver.disconnect();
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, [reduced, viewKey]);
}

export default useLenis;

