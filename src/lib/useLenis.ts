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
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    const syncDialog = () => {
      if (document.querySelector('dialog[open]')) lenis.stop();
      else lenis.start();
    };
    syncDialog();
    document.addEventListener('toggle', syncDialog, true);

    return () => {
      document.removeEventListener('toggle', syncDialog, true);
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, [reduced]);
}

export default useLenis;

