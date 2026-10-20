import { useLayoutEffect, type RefObject } from 'react';
import { gsap, ScrollTrigger } from './useScrollTrigger';
import { useReducedMotion } from './useReducedMotion';
import { createMobileScenes } from './createMobileScenes';

/** Each scene owns its transform layers; department previews update only on selection. */
export function useCinematicScrollMotion(rootRef: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced || document.documentElement.dataset.motion === 'none') return;
    const media = gsap.matchMedia();
    let active = true;

    media.add({
      cinema: '(min-width: 1024px) and (min-height: 650px)',
      compact: '(max-width: 1023px)',
      motion: '(prefers-reduced-motion: no-preference)',
    }, (context) => {
      if (!context.conditions?.motion) return;
      const cinematic = context.conditions.cinema && document.documentElement.dataset.motion === 'full';
      if (!context.conditions.compact) {
        gsap.fromTo('.departments-intro', { y: 24, opacity: .4 }, { y: 0, opacity: 1, duration: .65, ease: 'power3.out',
          scrollTrigger: { trigger: '#departments', start: 'top 80%', once: true },
        });
        gsap.fromTo('[data-care-link]', { y: 14, opacity: .4 }, { y: 0, opacity: 1, duration: .5, stagger: .035, ease: 'power3.out',
          scrollTrigger: { trigger: '.department-index', start: 'top 85%', once: true },
        });
      }
      if (cinematic) {
        root.classList.add('cinema-active');
        const facility = root.querySelector<HTMLElement>('.facility-cinema-stage')!;
        const updateChapter = (element: HTMLElement) => (self: ScrollTrigger) => {
          element.dataset.sceneProgress = self.progress.toFixed(3);
        };
        const pinOptions = {
          start: 'top top', pin: true, pinSpacing: true, anticipatePin: 1,
          scrub: 0.4, invalidateOnRefresh: true,
        };

        // Photographic hinges keep their front faces visible; the heading clears before expansion.
        const wings = facility.querySelectorAll('[data-facility-wing]');
        const facilityTimeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
          ...pinOptions, id: 'cinema-facility', trigger: facility, refreshPriority: 1,
          end: () => `+=${window.innerHeight * 1.45}`, onUpdate: updateChapter(facility),
        } });
        facilityTimeline
          .fromTo(wings, {
            scale: 0.3, xPercent: i => i === 0 ? -34 : 34, yPercent: 16,
            rotationY: i => i === 0 ? 48 : -48, rotationZ: i => i === 0 ? -5 : 5, z: -180,
          }, { scale: 0.36, xPercent: i => i === 0 ? -33 : 33, yPercent: 12,
            rotationY: i => i === 0 ? 24 : -24, rotationZ: 0, z: 0, duration: 0.28 }, 0)
          .fromTo('[data-facility-main]', { scale: 0.47, yPercent: 22, rotationX: 12, rotationY: -7, z: -100 },
            { scale: 0.57, yPercent: 16, rotationX: 0, rotationY: 0, z: 0, duration: 0.28 }, 0)
          .to('[data-facility-heading]', { y: -38, opacity: 0, duration: 0.18 }, 0.2)
          .to(wings, { xPercent: i => i === 0 ? -85 : 85,
            rotationY: i => i === 0 ? -78 : 78, z: -280, opacity: 0, duration: 0.38 }, 0.3)
          .to('[data-facility-main]', { scale: 1, yPercent: 0, duration: 0.4 }, 0.36)
          .fromTo('.facility-photo-shade', { opacity: 0 }, { opacity: 1, duration: 0.18 }, 0.62)
          .fromTo('[data-facility-caption]', { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.18 }, 0.7)
          .to({}, { duration: 0.1 }, 0.88);
      } else if (context.conditions.compact) {
        createMobileScenes(root);
      } else {
        gsap.fromTo('[data-facility-main]', { rotationX: 10, scale: 0.94 }, {
          rotationX: 0, scale: 1, ease: 'none',
          scrollTrigger: { trigger: '[data-facility-main]', start: 'top 90%', end: 'top 40%', scrub: 0.4 },
        });
      }

      if (!context.conditions.compact) {
        const founder = root.querySelector('#about')!;
        gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
          trigger: founder, start: 'top 85%', end: 'top 20%', scrub: 0.45,
        } })
          .fromTo('[data-founder-frame]', { clipPath: 'inset(0% 12% 0% 12%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6 }, 0)
          .fromTo('[data-founder-portrait]', { scale: 1.2, x: -22 }, { scale: 1, x: 0, duration: 0.6 }, 0)
          .fromTo('[data-founder-heading]', { clipPath: 'inset(-10% 100% -10% 0%)', x: -22 },
            { clipPath: 'inset(-10% 0% -10% 0%)', x: 0, duration: 0.45 }, 0.12)
          .fromTo('[data-founder-copy]', { y: 35, opacity: 0.3 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.42 }, 0.22);
      }

      return () => {
        root.classList.remove('cinema-active');
        root.querySelectorAll('[data-scene-progress]').forEach(element => element.removeAttribute('data-scene-progress'));
      };
    }, root);

    const images = Array.from(root.querySelectorAll<HTMLImageElement>('#hero img, #facilities img, #about img'));
    const refresh = () => { if (active) ScrollTrigger.refresh(); };
    images.forEach(image => image.addEventListener('load', refresh, { once: true }));
    void document.fonts.ready.then(refresh);
    return () => {
      active = false;
      images.forEach(image => image.removeEventListener('load', refresh));
      media.revert();
      root.classList.remove('cinema-active');
    };
  }, [rootRef, reduced]);
}
