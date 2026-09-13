import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap, isDesktop, isReducedMotion } from '../lib/useScrollTrigger';

export const DarkPanelSlide: React.FC = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!panelRef.current || !headlineRef.current || !isDesktop() || isReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panelRef.current,
          start: 'top bottom',
          end: 'top 20%',
          scrub: 1,
        },
      });

      tl.fromTo(
        panelRef.current,
        { y: 80, opacity: 0.92 },
        { y: 0, opacity: 1, ease: 'none' }
      );

      tl.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );
    }, panelRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={panelRef}
      className="relative z-20 w-full bg-[#0F2318] text-white rounded-t-[2.5rem] sm:rounded-t-[3.5rem] border-t border-white/10 pt-16 sm:pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Tag */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#DC2626]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#86EFAC]">
              02 / CLINICAL EXCELLENCE DIVISIONS
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#94A3B8] font-mono">
            <span>SCROLL TO EXPLORE DEPARTMENTS</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#86EFAC]" aria-hidden="true" />
          </div>
        </div>

        {/* Giant Anton Condensed Headline */}
        <div className="space-y-4 max-w-5xl">
          <h2
            ref={headlineRef}
            className="font-anton text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white leading-[0.9]"
          >
            HOW WE CARE FOR YOU
          </h2>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
            <p className="font-sans text-slate-300 text-base sm:text-xl max-w-2xl leading-relaxed font-normal">
              Four specialized clinical pillars engineered to guide you from precision diagnostics 
              through minimally invasive treatment and tranquil post-operative recovery.
            </p>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 self-start md:self-auto">
              <div className="text-right">
                <div className="font-anton text-2xl text-[#DC2626] tabular-nums leading-none">90s</div>
                <div className="text-[10px] text-slate-400 tracking-wider uppercase font-sans">Emergency Triage</div>
              </div>
              <div className="h-8 w-px bg-white/10" aria-hidden="true" />
              <div>
                <div className="font-anton text-2xl text-[#86EFAC] tabular-nums leading-none">99.8%</div>
                <div className="text-[10px] text-slate-400 tracking-wider uppercase font-sans">Diagnostic Accuracy</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DarkPanelSlide;
