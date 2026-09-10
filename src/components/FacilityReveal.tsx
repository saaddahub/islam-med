import React, { useState, useEffect, useRef } from 'react';
import { FACILITIES_DATA } from '../data/facilities';
import { Layers } from 'lucide-react';
import SquiggleUnderline from './SquiggleUnderline';
import { gsap, isDesktop, isReducedMotion } from '../lib/useScrollTrigger';

interface FacilityRevealProps {
  onOpenAppointment?: () => void;
}

export const FacilityReveal: React.FC<FacilityRevealProps> = () => {
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainPhotoRef = useRef<HTMLDivElement>(null);
  const cornerLeftRef = useRef<HTMLDivElement>(null);
  const cornerRightRef = useRef<HTMLDivElement>(null);

  const currentFeature = FACILITIES_DATA.features[selectedFeatureIndex];

  useEffect(() => {
    if (!sectionRef.current || !mainPhotoRef.current || !cornerLeftRef.current || !cornerRightRef.current) {
      return;
    }

    if (!isDesktop() || isReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      });

      // Phase 1 (0–50%): main photo shrinks, corners slide in
      tl.to(
        mainPhotoRef.current,
        { scale: 0.82, ease: 'none' },
        0
      );

      tl.fromTo(
        cornerLeftRef.current,
        { x: '-40%', y: '40%', opacity: 0 },
        { x: '0%', y: '0%', opacity: 1, ease: 'none' },
        0
      );

      tl.fromTo(
        cornerRightRef.current,
        { x: '40%', y: '-40%', opacity: 0 },
        { x: '0%', y: '0%', opacity: 1, ease: 'none' },
        0
      );

      // Phase 2 (50–100%): subtle focus parallax
      tl.to(
        cornerLeftRef.current,
        { scale: 1.05, ease: 'none' },
        0.5
      );

      tl.to(
        cornerRightRef.current,
        { scale: 1.05, ease: 'none' },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="facilities"
      ref={sectionRef}
      className="relative z-20 w-full bg-[#0D1B2A] text-white py-24 sm:py-32 overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 mb-12 sm:mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-[#93C5FD] uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" aria-hidden="true" />
              <span>04 / ARCHITECTURAL SANCTUARY</span>
            </div>

            <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-white leading-none">
              Spaces designed for{' '}
              <span className="relative inline-block italic font-normal text-white">
                healing
                <SquiggleUnderline color="#DC2626" className="w-full" />
              </span>{' '}
              and quiet.
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-md">
            Every square meter at Islam Medical Complex integrates HEPA-filtered clean air, 
            acoustic isolation, and circadian light therapies to elevate restorative recovery.
          </p>
        </div>

        {/* Layered Photo Peekaboo Stage */}
        <div className="relative min-h-[500px] sm:min-h-[640px] rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-4 sm:p-8 flex items-center justify-center">
          
          {/* Main Hero Photo */}
          <div
            ref={mainPhotoRef}
            className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl z-10 will-change-transform"
          >
            <img
              src={currentFeature.image}
              alt=""
              className="w-full h-full object-cover object-center filter brightness-[0.95]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Overlay Title Pill */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono tracking-widest text-[#93C5FD] uppercase">
                  {currentFeature.tag}
                </span>
                <h3 className="font-anton text-2xl sm:text-4xl uppercase text-white">
                  {currentFeature.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-lg">
                  {currentFeature.subtitle}
                </p>
              </div>

              {/* Specs Pills */}
              <div className="flex flex-wrap gap-2">
                {currentFeature.specs.map((spec) => (
                  <span
                    key={spec}
                    className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-sans text-white border border-white/10"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Corner Left Peekaboo Photo */}
          <div
            ref={cornerLeftRef}
            className="hidden lg:block absolute bottom-4 left-4 w-64 h-44 rounded-2xl overflow-hidden border-2 border-white/20 z-20 pointer-events-none will-change-transform"
          >
            <img
              src={FACILITIES_DATA.cornerImageLeft}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#0D1B2A]/90 text-[10px] font-mono text-[#93C5FD]">
              01 Private Suite
            </div>
          </div>

          {/* Corner Right Peekaboo Photo */}
          <div
            ref={cornerRightRef}
            className="hidden lg:block absolute top-4 right-4 w-72 h-48 rounded-2xl overflow-hidden border-2 border-white/20 z-20 pointer-events-none will-change-transform"
          >
            <img
              src={FACILITIES_DATA.cornerImageRight}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#0D1B2A]/90 text-[10px] font-mono text-[#93C5FD]">
              02 Robotic Theatre
            </div>
          </div>

        </div>

        {/* Feature Selector Strip & Caption Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
          {FACILITIES_DATA.features.map((feature, idx) => {
            const isSelected = idx === selectedFeatureIndex;

            return (
              <button
                type="button"
                key={feature.id}
                onClick={() => setSelectedFeatureIndex(idx)}
                className={`text-left p-6 rounded-2xl transition-[background-color,border-color,transform] duration-200 cursor-pointer active:scale-[0.98] border ${
                  isSelected
                    ? 'bg-white/10 border-[#1D4ED8] ring-1 ring-[#1D4ED8]/40'
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#93C5FD] font-semibold">
                    0{idx + 1}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-[#DC2626]' : 'bg-white/20'
                    }`}
                    aria-hidden="true"
                  />
                </div>

                <h4 className="font-anton text-xl uppercase tracking-tight text-white mb-2">
                  {feature.title}
                </h4>

                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FacilityReveal;
