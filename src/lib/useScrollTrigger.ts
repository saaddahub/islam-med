import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Standard easing tokens (§2)
export const EASINGS = {
  easeInOutSoft: [0.65, 0, 0.35, 1] as const,
};

export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const isDesktop = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768;
};

export { gsap, ScrollTrigger };
export default ScrollTrigger;

