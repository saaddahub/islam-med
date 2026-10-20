import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './useScrollTrigger';
import { useReducedMotion } from './useReducedMotion';
import { useMediaQuery } from './useMediaQuery';

export function useLenis(viewKey?: string) {
  const reduced = useReducedMotion();
  const smooth = useMediaQuery('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
  useEffect(() => {
    if (reduced || !smooth) {
      // Keep native touch momentum. Align deep links again after async layout work,
      // but stop following as soon as the visitor starts interacting.
      let frame = 0;
      let follow = true;
      const anchor = location.hash.slice(1);
      const scrollToTarget = (id: string) => {
        const target = document.getElementById(id);
        if (!target) return;
        const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - margin, behavior: 'instant' });
      };
      const align = () => {
        if (!follow) return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (!follow) return;
          const target = document.getElementById(anchor);
          if (target) scrollToTarget(anchor);
          else window.scrollTo({ top: 0, behavior: 'instant' });
        });
      };
      const stop = () => { follow = false; cancelAnimationFrame(frame); };
      const navigate = () => {
        stop();
        // A hash click from inside a modal can occur while the destination is
        // still inert. Wait for the dialog to close before the native scroll.
        frame = requestAnimationFrame(() => {
          scrollToTarget(location.hash.slice(1));
        });
      };
      const sameAnchor = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
        if (link && link.hash === location.hash) navigate();
      };
      const events = ['touchstart', 'wheel', 'pointerdown', 'keydown'] as const;
      events.forEach(event => window.addEventListener(event, stop, { passive: true }));
      window.addEventListener('hashchange', navigate);
      window.addEventListener('click', sameAnchor);
      ScrollTrigger.addEventListener('refresh', align);
      align();
      return () => {
        cancelAnimationFrame(frame);
        events.forEach(event => window.removeEventListener(event, stop));
        window.removeEventListener('hashchange', navigate);
        window.removeEventListener('click', sameAnchor);
        ScrollTrigger.removeEventListener('refresh', align);
      };
    }

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
        lenis.scrollTo(target || 0, {
          // Lenis already honours each target's CSS scroll-margin-top.
          immediate: true, force: true,
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
  }, [reduced, smooth, viewKey]);
}

export default useLenis;

