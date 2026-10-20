import { useLayoutEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';
import { useMediaQuery } from './useMediaQuery';

// Observe after React mounts so fallback reveals can find the page content.
export function usePageMotion() {
  const reduced = useReducedMotion();
  const compact = useMediaQuery('(max-width: 1023px)');

  useLayoutEffect(() => {
    const root = document.documentElement;
    const device = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const cores = device.hardwareConcurrency || 8;
    const memory = device.deviceMemory || 8;
    const tier = reduced || device.connection?.saveData || cores <= 2 || memory <= 2
      ? 'none'
      : cores <= 4 || memory <= 4 ? 'lite' : 'full';
    root.dataset.motion = tier;
    if (tier === 'none') return;

    const scrollDriven = !compact && CSS.supports('animation-timeline: view()');
    const mode = compact ? 'mobile-motion' : scrollDriven ? 'sd' : 'fb';
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
    let observer: IntersectionObserver | undefined;
    let progress: HTMLDivElement | undefined;

    if (scrollDriven) {
      progress = document.createElement('div');
      progress.className = 'scroll-progress';
      progress.setAttribute('aria-hidden', 'true');
      document.body.append(progress);
    } else if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove('reveal-pending');
          observer?.unobserve(entry.target);
        }
      }, { rootMargin: compact ? '0px 0px -6% 0px' : '0px 0px -10% 0px', threshold: 0.08 });
      items.forEach((item) => {
        item.classList.add('reveal-pending');
        observer?.observe(item);
      });
    }
    root.classList.add(mode);

    return () => {
      root.classList.remove(mode);
      observer?.disconnect();
      items.forEach((item) => item.classList.remove('reveal-pending'));
      progress?.remove();
    };
  }, [reduced, compact]);
}
