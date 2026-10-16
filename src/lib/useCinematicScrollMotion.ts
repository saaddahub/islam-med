import { useLayoutEffect, type RefObject } from 'react';
import { gsap, ScrollTrigger } from './useScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

/** Each scene owns its transform layers; only department boundaries update React. */
export function useCinematicScrollMotion(rootRef: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced || document.documentElement.dataset.motion === 'none') return;
    const media = gsap.matchMedia();
    const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-care-step]'));
    let active = true;

    media.add({
      cinema: '(min-width: 1024px) and (min-height: 650px)',
      motion: '(prefers-reduced-motion: no-preference)',
    }, (context) => {
      if (!context.conditions?.motion) return;
      const cinematic = context.conditions.cinema && document.documentElement.dataset.motion === 'full';
      if (cinematic) {
        root.classList.add('cinema-active');
        const departments = root.querySelector<HTMLElement>('#departments')!;
        const hero = root.querySelector<HTMLElement>('#hero')!;
        const updateChapter = (element: HTMLElement) => (self: ScrollTrigger) => {
          element.dataset.sceneProgress = self.progress.toFixed(3);
        };
        const pinOptions = {
          start: 'top top', pin: true, pinSpacing: true, anticipatePin: 1,
          scrub: 0.4, invalidateOnRefresh: true,
        };

        // Four readable stops, with direct selection still available throughout.
        const departmentCount = departments.querySelectorAll('[data-department-row]').length;
        let lastDepartment = -1;
        const selectDepartment = (self: ScrollTrigger) => {
          const index = Math.min(departmentCount - 1, Math.floor(self.progress * departmentCount));
          departments.dataset.sceneProgress = self.progress.toFixed(3);
          if (index !== lastDepartment) {
            lastDepartment = index;
            departments.dispatchEvent(new CustomEvent<number>('departmentchange', { detail: index }));
          }
        };
        ScrollTrigger.create({
          ...pinOptions, id: 'cinema-departments', trigger: departments, refreshPriority: 2,
          end: () => `+=${window.innerHeight * 2.6}`,
          onUpdate: selectDepartment,
          onRefresh: selectDepartment,
        });

        // The loved photographic hinge sequence now opens the page and fills the viewport.
        const wings = hero.querySelectorAll('[data-hero-wing]');
        gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
          ...pinOptions, id: 'cinema-hero', trigger: hero, refreshPriority: 3,
          end: () => `+=${window.innerHeight * 1.45}`, onUpdate: updateChapter(hero),
        } })
          .to('.hero-headline', { y: -38, opacity: 0, duration: 0.18 }, 0)
          .to('[data-hero-support]', { y: -28, autoAlpha: 0, duration: 0.14 }, 0)
          .to('.hero-scroll-note', { autoAlpha: 0, duration: 0.1 }, 0)
          .fromTo(wings, {
            scale: 0.3, xPercent: i => i === 0 ? -34 : 34, yPercent: 16,
            rotationY: i => i === 0 ? 48 : -48, rotationZ: i => i === 0 ? -5 : 5, z: -180, opacity: 0,
          }, { scale: 0.36, xPercent: i => i === 0 ? -33 : 33, yPercent: 12,
            rotationY: i => i === 0 ? 24 : -24, rotationZ: 0, z: 0, opacity: 1, duration: 0.23 }, 0.05)
          .fromTo('[data-hero-main]', { scale: 0.43, xPercent: 27, yPercent: 0, rotationX: 12, rotationY: -7, z: -100 },
            { scale: 0.57, xPercent: 0, yPercent: 16, rotationX: 0, rotationY: 0, z: 0, duration: 0.28 }, 0)
          .to(wings, { xPercent: i => i === 0 ? -85 : 85,
            rotationY: i => i === 0 ? -78 : 78, z: -280, opacity: 0, duration: 0.38 }, 0.3)
          .to('[data-hero-main]', { scale: 1, yPercent: 0, duration: 0.4 }, 0.36)
          .fromTo('.hero-scene-caption', { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.18 }, 0.7)
          .to({}, { duration: 0.1 }, 0.88);
      } else {
        gsap.fromTo('[data-facility-main]', { rotationX: 10, scale: 0.94 }, {
          rotationX: 0, scale: 1, ease: 'none',
          scrollTrigger: { trigger: '[data-facility-main]', start: 'top 90%', end: 'top 40%', scrub: 0.4 },
        });
      }

      // A contained, two-line editorial reveal introduces the clinical journey without pinning it.
      const care = root.querySelector('#care-story')!;
      gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
        trigger: care, start: 'top 88%', end: 'top 35%', scrub: 0.35,
      } })
        .fromTo('[data-care-line]', { yPercent: 110 }, { yPercent: 0, stagger: 0.08, duration: 0.55 }, 0)
        .fromTo('[data-care-rule]', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.5 }, 0.12)
        .fromTo('[data-care-detail]', { x: 35, opacity: 0.35 }, { x: 0, opacity: 1, duration: 0.5 }, 0.15);

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

      const route = root.querySelector<HTMLElement>('[data-care-route]');
      const fill = root.querySelector('[data-care-progress]');
      if (route && fill) {
        gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: route, start: 'top 60%', end: 'bottom 60%', scrub: 0.3 },
        });
        steps.forEach(step => {
          const update = (self: ScrollTrigger) => { step.dataset.passed = String(self.scroll() >= self.start); };
          ScrollTrigger.create({ trigger: step, start: 'top 60%', end: 'bottom 60%', onUpdate: update, onRefresh: update });
        });
      }
      return () => {
        root.classList.remove('cinema-active');
        root.querySelectorAll('[data-scene-progress]').forEach(element => element.removeAttribute('data-scene-progress'));
        steps.forEach(step => delete step.dataset.passed);
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
