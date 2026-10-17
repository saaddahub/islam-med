import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/processSteps';
import { gsap, ScrollTrigger } from '../lib/useScrollTrigger';
import { useReducedMotion } from '../lib/useReducedMotion';

export default function HowItWorksSticky({ onOpenAppointment }: { onOpenAppointment: () => void }) {
  const routeRef = useRef<HTMLOListElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const route = routeRef.current;
    const svg = svgRef.current;
    if (!route || !svg) return;
    let context: ReturnType<typeof gsap.context> | undefined;
    let frame = 0;
    let lastSize = '';
    const rows = Array.from(route.querySelectorAll<HTMLElement>('[data-journey-step]'));
    const draw = () => {
      const width = route.clientWidth;
      const height = route.clientHeight;
      const size = `${width}:${height}`;
      if (size === lastSize) return;
      lastSize = size;
      context?.revert();
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      const anchors = rows.map(row => {
        const marker = row.querySelector<HTMLElement>('.journey-marker')!;
        return { x: marker.offsetLeft, y: row.offsetTop + marker.offsetTop + marker.offsetHeight / 2 };
      });
      const progressPaths = Array.from(svg.querySelectorAll<SVGPathElement>('[data-journey-progress]'));
      anchors.slice(0, -1).forEach((point, index) => {
        const next = anchors[index + 1];
        const tangent = (next.y - point.y) * 0.52;
        // Vertical tangents join each bend smoothly into one narrow, flowing S.
        const path = `M ${point.x} ${point.y} C ${point.x} ${point.y + tangent} ${next.x} ${next.y - tangent} ${next.x} ${next.y}`;
        svg.querySelector(`[data-journey-track="${index}"]`)?.setAttribute('d', path);
        progressPaths[index].setAttribute('d', path);
      });
      if (reduced || document.documentElement.dataset.motion === 'none') return;
      context = gsap.context(() => {
        // Each segment completes at the next step, keeping the line and copy in sync.
        // SVG paint is limited to the single thin route; text uses transform/opacity.
        progressPaths.forEach((path, index) => {
          gsap.fromTo(path, { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, ease: 'none',
            scrollTrigger: { trigger: rows[index], endTrigger: rows[index + 1], start: 'top+=14 65%', end: 'top+=14 65%', scrub: true },
          });
        });
        rows.forEach(row => {
          gsap.fromTo(row.querySelector('[data-journey-copy]'), { y: 8, opacity: 0.55 }, { y: 0, opacity: 1, ease: 'none',
            scrollTrigger: { trigger: row, start: 'top 83%', end: 'top 65%', scrub: true },
          });
          const update = (self: ScrollTrigger) => { row.dataset.passed = String(self.scroll() >= self.start); };
          ScrollTrigger.create({ trigger: row, start: 'top+=14 65%', onUpdate: update, onRefresh: update });
        });
      }, route);
      ScrollTrigger.refresh();
    };
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    });
    observer.observe(route);
    draw();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      context?.revert();
      rows.forEach(row => delete row.dataset.passed);
    };
  }, [reduced]);

  return <section id="how-it-works" className="journey-section" aria-labelledby="journey-title">
    <div className="journey-container">
      <header className="journey-heading">
        <h2 id="journey-title" className="font-editorial">How it <em>works.</em></h2>
        <p>A little guidance at every step, from your first enquiry to your follow-up.</p>
      </header>
      <div className="journey-map">
        <svg ref={svgRef} className="journey-line" aria-hidden="true" fill="none" preserveAspectRatio="none">
          {PROCESS_STEPS.slice(0, -1).map((step, index) => <g key={step.step}>
            <path data-journey-track={index} className="journey-line-track" />
            <path data-journey-progress pathLength="1" strokeDasharray="1 1" className="journey-line-fill" />
          </g>)}
        </svg>
        <ol ref={routeRef} className="journey-steps">
          {PROCESS_STEPS.map(step => <li key={step.step} data-journey-step className="journey-step">
            <span className="journey-marker" aria-hidden="true">{step.step}</span>
            <div data-journey-copy className="journey-copy">
              <h3 className="font-editorial">{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>)}
        </ol>
      </div>
      <div className="journey-action">
        <button type="button" onClick={onOpenAppointment} className="founder-consult">Arrange your visit <ArrowUpRight size={18} aria-hidden="true" /></button>
      </div>
    </div>
  </section>;
}
