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
      className="relative z-20 w-full bg-[#0C1414] text-white py-14 sm:py-20 md:py-0 md:min-h-screen md:flex md:flex-col md:justify-center selection:bg-[#1DBF8A] selection:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Section Eyebrow on Desktop */}
        <div className="hidden md:flex items-center justify-between pb-4 mb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#1DBF8A]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#A7F3D0]">
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
                  className={`w-full text-left py-3.5 sm:py-4 md:py-4.5 flex items-center justify-between gap-4 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1DBF8A] ${
                    isDesktopState && !isReduced ? 'cursor-default' : 'cursor-pointer'
                  }`}
                  aria-expanded={isActive}
                  id={`accordion-btn-${dept.id}`}
                >
                  <div className="flex items-baseline gap-4 sm:gap-6 flex-1 min-w-0">
                    {/* Number in Anton with color transition */}
                    <span
                      className={`font-anton text-xl sm:text-2xl md:text-3xl lg:text-4xl transition-colors duration-250 ${
                        isActive ? 'text-[#A7F3D0]' : 'text-slate-500'
                      }`}
                    >
                      {dept.number}
                    </span>

                    {/* Department Name in Anton with color transition */}
                    <span
                      className={`font-anton text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight truncate transition-colors duration-250 ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {dept.name}
                    </span>
                  </div>

                  {/* Right Status Pill & Chevron Icon */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`hidden sm:inline-block text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full border transition-[border-color,color,background-color] duration-200 ${
                        isActive
                          ? 'border-[#A7F3D0]/40 text-[#A7F3D0] bg-[#A7F3D0]/10'
                          : 'border-white/10 text-slate-400'
                      }`}
                    >
                      {dept.stat}
                    </span>
                    
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={transitionConfig}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-colors duration-200 ${
                        isActive
                          ? 'bg-[#1DBF8A] text-white border-[#1DBF8A]'
                          : 'border-white/20 text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
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
                      <div className="pt-2 pb-5 sm:pb-6 pl-0 sm:pl-12 md:pl-16 max-w-5xl space-y-4">
                        
                        {/* Department Description */}
                        <p className="font-sans text-xs sm:text-sm md:text-base text-[#EDEDED] leading-relaxed max-w-3xl font-normal">
                          {dept.shortDesc}
                        </p>

                        {/* Sub-list of 3 numbered services */}
                        <div className="border-t border-white/10 divide-y divide-white/10">
                          {dept.services.map((sub) => (
                            <div
                              key={sub.number}
                              className="py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-6 px-2 rounded-lg transition-colors duration-150 hover:bg-white/[0.02]"
                            >
                              <div className="flex items-baseline gap-3 sm:gap-5">
                                <span className="font-mono text-xs text-[#A7F3D0] font-semibold">
                                  {sub.number}
                                </span>
                                <span className="font-sans font-semibold text-xs sm:text-sm text-white">
                                  {sub.name}
                                </span>
                              </div>

                              <p className="font-sans text-xs text-slate-300 max-w-md pl-6 sm:pl-0 font-normal">
                                {sub.detail}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2.5 border-t border-white/10">
                          <div className="flex items-center gap-2 text-xs text-slate-300">
                            <Stethoscope className="w-3.5 h-3.5 text-[#DC2626]" aria-hidden="true" />
                            <span>Department Lead: <strong className="text-white">{dept.leadDoctor}</strong></span>
                          </div>

                          <button
                            type="button"
                            onClick={onOpenAppointment}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1DBF8A] hover:bg-[#0EA571] active:scale-95 text-white font-medium text-xs uppercase tracking-wider transition-[background-color,transform] duration-150 shadow-sm cursor-pointer"
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
