import React, { useState, useEffect, useRef } from 'react';
import { DEPARTMENTS } from '../data/departments';
import { ArrowUpRight, ChevronDown, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, ScrollTrigger, isDesktop as checkIsDesktop } from '../lib/useScrollTrigger';
import { useReducedMotion } from '../lib/useReducedMotion';

interface ServiceAccordionProps {
  onOpenAppointment: () => void;
}

export const ServiceAccordion: React.FC<ServiceAccordionProps> = ({
  onOpenAppointment,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDesktopState, setIsDesktopState] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    setIsDesktopState(checkIsDesktop());
    const handleResize = () => {
      setIsDesktopState(checkIsDesktop());
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current || isReduced) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const rowCount = DEPARTMENTS.length;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => '+=' + window.innerHeight * rowCount,
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            rowCount - 1,
            Math.floor(self.progress * rowCount)
          );
          setActiveIndex(idx);
        },
      });
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      mm.revert();
    };
  }, [isReduced]);

  const handleMobileClick = (index: number) => {
    if (!isDesktopState || isReduced) {
      setActiveIndex((prev) => (prev === index ? -1 : index));
    }
  };

  const transitionConfig = isReduced
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.65, 0, 0.35, 1] as const };

  return (
    <section
      ref={containerRef}
      id="services-accordion"
      className="relative z-20 w-full bg-[#0D1B2A] text-white py-14 sm:py-20 md:py-0 md:min-h-screen md:flex md:flex-col md:justify-center selection:bg-[#1D4ED8] selection:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Section Eyebrow on Desktop */}
        <div className="hidden md:flex items-center justify-between pb-6 mb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#93C5FD]">
              02 / CLINICAL SPECIALTIES ACCORDION
            </span>
          </div>
          <div className="text-xs font-mono text-slate-400">
            <span>SCROLL TO ADVANCE PILLARS</span> • <span>0{activeIndex + 1} / 0{DEPARTMENTS.length}</span>
          </div>
        </div>

        {/* Accordion Rows Container */}
        <div className="border-t border-white/15 divide-y divide-white/15">
          {DEPARTMENTS.map((dept, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={dept.id}
                className={`accordion-row transition-colors duration-300 ${
                  isActive ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Accordion Row Header */}
                <button
                  type="button"
                  onClick={() => handleMobileClick(index)}
                  className={`w-full text-left py-5 sm:py-7 md:py-8 flex items-center justify-between gap-4 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1D4ED8] ${
                    isDesktopState && !isReduced ? 'cursor-default' : 'cursor-pointer'
                  }`}
                  aria-expanded={isActive}
                  id={`accordion-btn-${dept.id}`}
                >
                  <div className="flex items-baseline gap-4 sm:gap-8 flex-1 min-w-0">
                    {/* Number in Anton with color transition */}
                    <span
                      className={`font-anton text-2xl sm:text-4xl md:text-5xl transition-colors duration-250 ${
                        isActive ? 'text-[#93C5FD]' : 'text-slate-500'
                      }`}
                    >
                      {dept.number}
                    </span>

                    {/* Department Name in Anton with color transition */}
                    <span
                      className={`font-anton text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight truncate transition-colors duration-250 ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {dept.name}
                    </span>
                  </div>

                  {/* Right Status Pill & Chevron Icon */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`hidden sm:inline-block text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-[border-color,color,background-color] duration-200 ${
                        isActive
                          ? 'border-[#93C5FD]/40 text-[#93C5FD] bg-[#93C5FD]/10'
                          : 'border-white/10 text-slate-400'
                      }`}
                    >
                      {dept.stat}
                    </span>
                    
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={transitionConfig}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-colors duration-200 ${
                        isActive
                          ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                          : 'border-white/20 text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    </motion.div>
                  </div>
                </button>

                {/* Accordion Expandable Content with Framer Motion */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key={`content-${dept.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={transitionConfig}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-8 sm:pb-10 pl-0 sm:pl-16 md:pl-20 max-w-5xl space-y-6">
                        
                        {/* Department Description */}
                        <p className="font-sans text-sm sm:text-base md:text-lg text-[#EDEDED] leading-relaxed max-w-3xl font-normal">
                          {dept.shortDesc}
                        </p>

                        {/* Sub-list of 3 numbered services */}
                        <div className="border-t border-white/10 divide-y divide-white/10">
                          {dept.services.map((sub) => (
                            <div
                              key={sub.number}
                              className="py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 px-2 rounded-lg transition-colors duration-150 hover:bg-white/[0.02]"
                            >
                              <div className="flex items-baseline gap-4 sm:gap-6">
                                <span className="font-mono text-xs sm:text-sm text-[#93C5FD] font-semibold">
                                  {sub.number}
                                </span>
                                <span className="font-sans font-semibold text-sm sm:text-base text-white">
                                  {sub.name}
                                </span>
                              </div>

                              <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-md pl-7 sm:pl-0 font-normal">
                                {sub.detail}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10">
                          <div className="flex items-center gap-2 text-xs text-slate-300">
                            <Stethoscope className="w-4 h-4 text-[#DC2626]" aria-hidden="true" />
                            <span>Department Lead: <strong className="text-white">{dept.leadDoctor}</strong></span>
                          </div>

                          <button
                            type="button"
                            onClick={onOpenAppointment}
                            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] active:scale-95 text-white font-medium text-xs uppercase tracking-wider transition-[background-color,transform] duration-150 shadow-sm cursor-pointer"
                          >
                            <span>Consult Department Team</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServiceAccordion;
