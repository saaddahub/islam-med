import { gsap } from './useScrollTrigger';

/** Compact scenes use native scrolling, short ranges and independent transform layers. */
export function createMobileScenes(root: HTMLElement) {
  const heroPhoto = root.querySelector('.hero-still');
  gsap.fromTo(heroPhoto, { rotationX: 7, rotationY: -4, rotationZ: -2, scale: .95, y: 16, transformPerspective: 900 }, {
    rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1, y: 0, ease: 'none',
    scrollTrigger: { trigger: heroPhoto, start: 'top 90%', end: 'top 35%', scrub: true },
  });
  gsap.fromTo('.hero-still img', { scale: 1.08, yPercent: -2 }, { scale: 1, yPercent: 2, ease: 'none',
    scrollTrigger: { trigger: heroPhoto, start: 'top 95%', end: 'bottom 10%', scrub: true },
  });

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
