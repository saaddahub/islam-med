import { gsap } from './useScrollTrigger';

/** Compact scenes use native scrolling, short ranges and independent transform layers. */
export function createMobileScenes(root: HTMLElement) {
  // The shared startup screen waits for these visible phone images, even on a deep link.
  root.querySelectorAll<HTMLImageElement>('.hero-mobile-wing img').forEach(image => { image.loading = 'eager'; });
  gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
    trigger: '#hero', start: 'top top', end: () => `+=${Math.min(root.querySelector<HTMLElement>('#hero')!.offsetHeight * .42, 360)}`,
    scrub: true, invalidateOnRefresh: true,
  } })
    .fromTo('.hero-still', { scale: .8, rotationX: 6, rotationY: -16, rotationZ: -5, y: 0, transformPerspective: 1000 },
      { scale: 1, rotationX: 0, rotationY: 0, rotationZ: 0, y: 0, duration: 1 }, 0)
    .fromTo('.hero-mobile-wing', { xPercent: i => i === 0 ? -14 : 14, rotationY: i => i === 0 ? 28 : -28,
      rotationZ: i => i === 0 ? -14 : 14, y: 12, scale: .94, autoAlpha: 1, transformPerspective: 1000 },
      { xPercent: i => i === 0 ? -60 : 60, rotationY: i => i === 0 ? 48 : -48,
        rotationZ: i => i === 0 ? -22 : 22, scale: .84, y: 0, duration: .72 }, 0)
    .to('.hero-mobile-wing', { autoAlpha: 0, duration: .28 }, .5);

  gsap.fromTo('.departments-intro', { y: 16, opacity: .5 }, { y: 0, opacity: 1, duration: .5, ease: 'power3.out',
    scrollTrigger: { trigger: '.departments-intro', start: 'top 90%', once: true },
  });
  root.querySelectorAll<HTMLElement>('[data-care-link]').forEach(link => {
    gsap.fromTo(link, { y: 12, opacity: .5 }, { y: 0, opacity: 1, duration: .4, ease: 'power3.out',
      scrollTrigger: { trigger: link, start: 'top 94%', once: true },
    });
  });

  const photoSpace = root.querySelector('.facility-photo-space');
  gsap.fromTo('[data-facility-wing]', { xPercent: index => index === 0 ? -9 : 9, rotationZ: index => index === 0 ? -8 : 8, scale: .94 }, {
    xPercent: index => index === 0 ? -3 : 3, rotationZ: index => index === 0 ? -3 : 3, scale: .98, ease: 'none',
    scrollTrigger: { trigger: photoSpace, start: 'top 90%', end: 'top 40%', scrub: true },
  });
  gsap.fromTo('[data-facility-surface]', { rotationX: 8, y: 18, scale: .95, transformPerspective: 900 }, {
    rotationX: 0, y: 0, scale: 1, ease: 'none',
    scrollTrigger: { trigger: photoSpace, start: 'top 90%', end: 'top 35%', scrub: true },
  });
  gsap.fromTo('[data-founder-portrait]', { scale: 1.08, yPercent: 2 }, {
    scale: 1, yPercent: 0, ease: 'none',
    scrollTrigger: { trigger: '#about', start: 'top 85%', end: 'top 25%', scrub: true },
  });
}
