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
        const hero = root.querySelector<HTMLElement>('#hero')!;
        const departments = root.querySelector<HTMLElement>('#departments')!;
        const facility = root.querySelector<HTMLElement>('.facility-cinema-stage')!;
        const heroCards = hero.querySelectorAll<HTMLElement>('[data-hero-orbit-card]');
        const heroRig = hero.querySelector<HTMLElement>('.hero-gallery-rig')!;
        const heroShades = hero.querySelectorAll('[data-hero-orbit-shade]');
        const updateChapter = (element: HTMLElement) => (self: ScrollTrigger) => {
          element.dataset.sceneProgress = self.progress.toFixed(3);
        };
        const pinOptions = {
          start: 'top top', pin: true, pinSpacing: true, anticipatePin: 1,
          scrub: 0.4, invalidateOnRefresh: true,
        };

        // The photographs share one cylindrical track: a single camera turn brings care into view.
        // Layout is recalculated only on refresh; the scroll itself transforms the common rig.
        const layoutHeroGallery = () => {
          // A pinned element still has its old width during refreshInit after a viewport resize.
          const radius = document.documentElement.clientWidth * 0.5;
          gsap.set(heroCards, {
            xPercent: -50, yPercent: -50,
            x: index => Math.sin(index * 55 * Math.PI / 180) * radius,
            z: index => (Math.cos(index * 55 * Math.PI / 180) - 1) * radius,
            rotationY: index => index * 55,
          });
          gsap.set(heroRig, { transformOrigin: `50% 50% ${-radius}px` });
        };
        layoutHeroGallery();
        const heroTimeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
          ...pinOptions, id: 'cinema-hero', trigger: hero, refreshPriority: 3,
          end: () => `+=${window.innerHeight * 0.95}`,
          onRefreshInit: layoutHeroGallery, onUpdate: updateChapter(hero),
        } });
        heroTimeline
          .fromTo(heroRig, { xPercent: 30, rotationY: -8 },
            { xPercent: 0, rotationY: -55, duration: 0.8 }, 0.08)
          .to('.hero-headline', { y: -28, opacity: 0, duration: 0.14 }, 0)
          .to('[data-hero-support]', { y: -28, autoAlpha: 0, duration: 0.14 }, 0)
          .to('[data-hero-controls]', { autoAlpha: 0, y: 12, duration: 0.1 }, 0)
          .fromTo([heroCards[1], heroCards[2]], { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.08)
          .fromTo(heroShades[0], { opacity: 0 }, { opacity: 0.24, duration: 0.6 }, 0.2)
          .fromTo(heroShades[1], { opacity: 0.2 }, { opacity: 0, duration: 0.6 }, 0.2)
          .fromTo(heroShades[2], { opacity: 0.32 }, { opacity: 0.18, duration: 0.6 }, 0.2)
          .fromTo('[data-hero-orbit-caption]', { opacity: 0, y: 8 },
            { opacity: 1, y: 0, stagger: 0.04, duration: 0.15 }, 0.35)
          .to({}, { duration: 0.12 }, 0.88);

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
        // Refresh callbacks also place these geometry-only wrappers; no React styles live on them.
        root.querySelectorAll('[data-hero-orbit-card], .hero-gallery-rig').forEach(element => element.removeAttribute('style'));
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
