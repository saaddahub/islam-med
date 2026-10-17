import { useEffect } from 'react';
import { ScrollTrigger } from './useScrollTrigger';

const startupTasks = new Set<Promise<unknown>>();

/** Register async layout work before the app's first effect settles. */
export function trackStartupTask(task: Promise<unknown>) {
  startupTasks.add(task);
  void task.finally(() => startupTasks.delete(task)).catch(() => {});
}

const nextFrame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

export function useStartupReady() {
  useEffect(() => {
    if (!document.getElementById('startup')) return;
    let active = true;
    let deadline: ReturnType<typeof setTimeout>;
    const prepare = async () => {
      // Let descendant effects register scene initialization, including StrictMode remounts.
      await nextFrame();
      if (!active) return;
      const images = Array.from(document.querySelectorAll<HTMLImageElement>('img:not([loading="lazy"])'));
      const ready = Promise.allSettled([
        document.fonts.ready,
        ...images.map(image => image.decode()),
        ...startupTasks,
      ]);
      await Promise.race([ready, new Promise<void>(resolve => { deadline = setTimeout(resolve, 8000); })]);
      clearTimeout(deadline);
      if (!active) return;
      ScrollTrigger.refresh();
      // Refresh listeners also align direct hash links; give those two paint frames.
      await nextFrame();
      await nextFrame();
      if (active) window.dispatchEvent(new Event('imc:ready'));
    };
    void prepare();
    return () => { active = false; clearTimeout(deadline); };
  }, []);
}
