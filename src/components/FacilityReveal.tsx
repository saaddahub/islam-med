import React, { useState, useEffect, useRef } from 'react';
import { FACILITIES_DATA } from '../data/facilities';
import { Layers } from 'lucide-react';
import SquiggleUnderline from './SquiggleUnderline';
import { gsap, ScrollTrigger, isDesktop as checkIsDesktop } from '../lib/useScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../lib/useReducedMotion';

interface FacilityRevealProps {
  onOpenAppointment?: () => void;
}

export const FacilityReveal: React.FC<FacilityRevealProps> = () => {
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);
  const [isDesktopState, setIsDesktopState] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainPhotoRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  const currentFeature = FACILITIES_DATA.features[selectedFeatureIndex];

  useEffect(() => {
    setIsDesktopState(checkIsDesktop());
    const handleResize = () => {
      setIsDesktopState(checkIsDesktop());
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1. Scroll-in layered reveal for the main block using GSAP ScrollTrigger
  useEffect(() => {
    if (!sectionRef.current || !mainPhotoRef.current || isReduced) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      });

      // Background main photo: zoom-out into place (scale: 1.1 -> 1, opacity: 0 -> 1)
      tl.fromTo(
        mainPhotoRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none', duration: 0.6 },
        0
      );
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      mm.revert();
    };
  }, [isReduced]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      rotateX: isDesktopState && !isReduced ? 15 : 0,
      y: 40,
      scale: 0.92,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      scale: 1,
      transition: isReduced
        ? { duration: 0 }
        : { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isReduced ? 0 : 0.15,
      },
    },
  };

  return (
    <section
      id="facilities"
      ref={sectionRef}
      className="relative z-20 w-full bg-[#05091A] text-white py-24 sm:py-32 overflow-hidden border-t border-white/10"
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

        {/* Main Photo Stage */}
        <div className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-3 sm:p-5">
          
          {/* Main Hero Photo with AnimatePresence crossfade when switching cards */}
          <div
            ref={mainPhotoRef}
            className="relative w-full h-[420px] sm:h-[520px] md:h-[560px] rounded-2xl overflow-hidden shadow-2xl z-10 will-change-transform bg-slate-900"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={isReduced ? { duration: 0 } : { duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <img
                  src={currentFeature.image}
                  alt={currentFeature.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.95]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                
                {/* Overlay Title Pill */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono tracking-widest text-[#93C5FD] uppercase">
                      {currentFeature.tag}
                    </span>
                    <h3 className="font-anton text-2xl sm:text-4xl md:text-5xl uppercase text-white tracking-tight">
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
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* 3 Selector Cards with Staggered 3D Perspective Tilt Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ perspective: isDesktopState && !isReduced ? 1000 : undefined }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8"
        >
          {FACILITIES_DATA.features.map((feature, idx) => {
            const isSelected = idx === selectedFeatureIndex;

            return (
              <motion.button
                type="button"
                key={feature.id}
                variants={cardVariants}
                onClick={() => setSelectedFeatureIndex(idx)}
                className={`text-left p-6 rounded-2xl transition-[background-color,border-color,transform] duration-200 cursor-pointer active:scale-[0.98] border ${
                  isSelected
                    ? 'bg-white/10 border-[#2563EB] ring-1 ring-[#2563EB]/40'
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#93C5FD] font-semibold">
                    0{idx + 1}
                  </span>
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-[background-color,transform] duration-200 ${
                      isSelected ? 'bg-[#DC2626] scale-110' : 'bg-white/20'
                    }`}
                    aria-hidden="true"
                  />
                </div>

                <h4 className="font-anton text-xl uppercase tracking-tight text-white mb-2">
                  {feature.title}
                </h4>

                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </motion.button>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default FacilityReveal;
