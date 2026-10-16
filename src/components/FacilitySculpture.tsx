import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/useScrollTrigger';

export default function FacilitySculpture({ imageSrc }: { imageSrc: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const generationRef = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest<HTMLElement>('.facility-cinema-stage');
    if (!canvas || !hero) return;
    const media = gsap.matchMedia();
    media.add('(min-width: 1024px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)', () => {
      if (document.documentElement.dataset.motion !== 'full') return;
      const generation = ++generationRef.current;
      const controller = new AbortController();
      let disposed = false;
      let scene: Awaited<ReturnType<typeof import('../lib/createFacilitySculpture').createFacilitySculpture>> | undefined;
      let context: ReturnType<typeof gsap.context> | undefined;
      let observer: IntersectionObserver | undefined;
      let dialogObserver: MutationObserver | undefined;
      const progress = { value: 0 };
      const pointer = { x: 0, y: 0 };
      let rendered = -1;
      let x = 0;
      let y = 0;
      let inView = true;
      let dialogOpen = false;
      const isCurrent = () => !disposed && generationRef.current === generation;
      const resize = () => {
        if (!scene || !isCurrent()) return;
        scene.resize(document.documentElement.clientWidth, window.innerHeight);
        rendered = -1;
      };
      const syncDialog = () => {
        const next = Boolean(document.querySelector('dialog[open]'));
        if (dialogOpen && !next) rendered = -1;
        dialogOpen = next;
      };
      const draw = (_time: number, delta: number) => {
        if (!scene || !isCurrent() || !inView || document.hidden || dialogOpen) return;
        const damping = 1 - Math.exp(-Math.min(delta, 64) / 110);
        x += (pointer.x - x) * damping;
        y += (pointer.y - y) * damping;
        if (Math.abs(rendered - progress.value) < 0.00001 && Math.abs(x - pointer.x) + Math.abs(y - pointer.y) < 0.001) return;
        scene.render(progress.value, x, y);
        rendered = progress.value;
      };
      const movePointer = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        pointer.x = event.clientX / window.innerWidth * 2 - 1;
        pointer.y = event.clientY / window.innerHeight * 2 - 1;
      };
      const resetPointer = () => { pointer.x = 0; pointer.y = 0; };
      const loseContext = (event: Event) => {
        event.preventDefault();
        teardown();
        ScrollTrigger.refresh();
      };
      function teardown() {
        if (disposed) return;
        disposed = true;
        controller.abort();
        context?.revert();
        gsap.ticker.remove(draw);
        observer?.disconnect();
        dialogObserver?.disconnect();
        window.removeEventListener('resize', resize);
        hero!.removeEventListener('pointermove', movePointer);
        hero!.removeEventListener('pointerleave', resetPointer);
        canvas!.removeEventListener('webglcontextlost', loseContext);
        scene?.dispose();
        scene = undefined;
        if (generationRef.current === generation) {
          hero!.classList.remove('facility-3d-ready');
          delete hero!.dataset.sceneProgress;
        }
      }
      // Loss can occur while the texture loads or shaders compile, before the scene is ready.
      canvas.addEventListener('webglcontextlost', loseContext);
      void import('../lib/createFacilitySculpture').then(async ({ createFacilitySculpture }) => {
        if (!isCurrent()) return;
        const created = await createFacilitySculpture(canvas, controller.signal, imageSrc);
        if (!isCurrent()) { created.dispose(); return; }
        scene = created;
        resize();
        scene.render(0, 0, 0);
        hero.classList.add('facility-3d-ready');
        context = gsap.context(() => {}, hero);
        context.add(() => {
          gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
            id: 'cinema-facility', trigger: hero, start: 'top top',
            end: () => `+=${window.innerHeight * 1.25}`,
            pin: true, anticipatePin: 1, scrub: true, refreshPriority: 1,
            invalidateOnRefresh: true,
            onUpdate: self => { hero.dataset.sceneProgress = self.progress.toFixed(3); },
          } })
            .to(progress, { value: 1, duration: 1 }, 0)
            .to('[data-facility-heading]', { y: -38, opacity: 0, duration: 0.18 }, 0.08)
            .fromTo('[data-facility-main]', { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.94)
            .fromTo('[data-facility-caption]', { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.13 }, 0.83);

        });
        observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; if (inView) rendered = -1; });
        observer.observe(hero);
        syncDialog();
        dialogObserver = new MutationObserver(syncDialog);
        dialogObserver.observe(document.body, {
          childList: true, subtree: true, attributes: true, attributeFilter: ['open'],
        });
        gsap.ticker.add(draw);
        window.addEventListener('resize', resize);
        hero.addEventListener('pointermove', movePointer, { passive: true });
        hero.addEventListener('pointerleave', resetPointer);
        ScrollTrigger.refresh();
      }).catch(() => {
        if (!isCurrent()) return;
        // HTML photograph and actions remain usable if WebGL initialization fails.
        teardown();
        ScrollTrigger.refresh();
      });
      return teardown;
    });
    return () => media.revert();
  }, [imageSrc]);
  return <canvas ref={canvasRef} className="facility-sculpture" aria-hidden="true" />;
}
