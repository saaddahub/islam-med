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
      const compact = width < 640;
      const anchors = rows.map((row, index) => ({
        x: compact ? 24 : width * (index % 2 === 0 ? 0.1 : 0.9),
        y: row.offsetTop + 24,
      }));
      const progressPaths = Array.from(svg.querySelectorAll<SVGPathElement>('[data-journey-progress]'));
      anchors.slice(0, -1).forEach((point, index) => {
        const next = anchors[index + 1];
        const right = index % 2 === 0;
        const bend = compact ? (right ? 42 : 6) : (right ? width - 16 : 16);
        const radius = compact ? 18 : Math.min(64, (next.y - point.y) / 2);
        const entry = right ? bend - radius : bend + radius;
        const path = `M ${point.x} ${point.y} H ${entry} Q ${bend} ${point.y} ${bend} ${point.y + radius} V ${next.y - radius} Q ${bend} ${next.y} ${entry} ${next.y} H ${next.x}`;
        svg.querySelector(`[data-journey-track="${index}"]`)?.setAttribute('d', path);
        progressPaths[index].setAttribute('d', path);
      });
      if (reduced || document.documentElement.dataset.motion === 'none') return;
      context = gsap.context(() => {
        // Each segment completes at the next step, keeping the line and copy in sync.
        // SVG paint is limited to the single thin route; text uses transform/opacity.
        progressPaths.forEach((path, index) => {
          gsap.fromTo(path, { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, ease: 'none',
            scrollTrigger: { trigger: rows[index], endTrigger: rows[index + 1], start: 'top+=24 65%', end: 'top+=24 65%', scrub: true },
          });
        });
        rows.forEach(row => {
          gsap.fromTo(row.querySelector('[data-journey-copy]'), { y: 14, opacity: 0.35 }, { y: 0, opacity: 1, ease: 'none',
            scrollTrigger: { trigger: row, start: 'top 83%', end: 'top 65%', scrub: true },
          });
          const update = (self: ScrollTrigger) => { row.dataset.passed = String(self.scroll() >= self.start); };
          ScrollTrigger.create({ trigger: row, start: 'top+=24 65%', onUpdate: update, onRefresh: update });
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
        <p>From choosing a department to planning your next visit, our reception and clinical teams help you understand each step of your care.</p>
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
              <p className="journey-note">{step.highlight}</p>
            </div>
          </li>)}
        </ol>
      </div>
      <div className="journey-action">
        <p className="font-editorial">We’ll help you take the first step.</p>
        <button type="button" onClick={onOpenAppointment} className="founder-consult">Arrange your visit <ArrowUpRight size={18} aria-hidden="true" /></button>
      </div>
    </div>
  </section>;
}
