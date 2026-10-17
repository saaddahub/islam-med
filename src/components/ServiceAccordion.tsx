import React, { useLayoutEffect, useRef, useState } from 'react';
import { DEPARTMENTS } from '../data/departments';
import { ArrowUpRight, ChevronDown, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../lib/useReducedMotion';

interface ServiceAccordionProps {
  onOpenAppointment: () => void;
}

export const ServiceAccordion: React.FC<ServiceAccordionProps> = ({
  onOpenAppointment,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLElement>(null);
  const isReduced = useReducedMotion();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const selectFromScroll = (event: Event) => setActiveIndex((event as CustomEvent<number>).detail);
    container.addEventListener('departmentchange', selectFromScroll);
    return () => container.removeEventListener('departmentchange', selectFromScroll);
  }, []);

  const toggleDepartment = (index: number) => {
    const cinematic = containerRef.current?.closest('.cinema-active');
    setActiveIndex((prev) => cinematic ? index : prev === index ? -1 : index);
  };

  const transitionConfig = isReduced
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section
      ref={containerRef}
      id="departments"
      className="department-section relative z-20 w-full bg-imc-night text-white py-14 sm:py-20 selection:bg-imc-blue selection:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="department-section-title font-editorial">Our departments</h2>
        <div className="hidden md:flex items-center justify-between pb-4 mb-3 border-b border-white/10">

          <div className="text-xs font-label text-slate-400">
            <span className="department-manual-hint">Select a department</span><span className="department-scroll-hint">Scroll or select a department</span> • <span>{activeIndex < 0 ? '—' : `0${activeIndex + 1}`} / 0{DEPARTMENTS.length}</span>
          </div>
        </div>

        {/* Accordion Rows Container */}
        <div data-stagger className="department-grid border-t border-white/10 divide-y divide-white/10">
          {DEPARTMENTS.map((dept, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                data-department-row
                style={{ '--department-row': index + 1 } as React.CSSProperties}
                data-reveal="up"
                key={dept.id}
                className={`accordion-row transition-colors duration-300 gpu-layer ${
                  isActive ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Accordion Row Header */}
                <button
                  type="button"
                  onClick={() => toggleDepartment(index)}
                  className="w-full text-left py-4 sm:py-4 md:py-4.5 flex items-center justify-between gap-3 sm:gap-4 group focus-visible:outline-2 focus-visible:outline-imc-mist focus-visible:-outline-offset-2 cursor-pointer"
                  aria-expanded={isActive}
                  aria-controls={`accordion-panel-${dept.id}`}
                  id={`accordion-btn-${dept.id}`}
                >
                  <div className="flex items-baseline gap-3 sm:gap-6 flex-1 min-w-0">
                    {/* Number in Anton with color transition */}
                    <span
                      className={`font-editorial text-xl sm:text-2xl md:text-3xl lg:text-4xl transition-colors duration-250 ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {dept.number}
                    </span>

                    {/* Department Name in Anton with color transition */}
                    <span
                      className={`font-editorial min-w-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.15] uppercase tracking-tight transition-colors duration-250 ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {dept.name}
                    </span>
                  </div>

                  {/* Right Status Pill & Chevron Icon */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`department-stat hidden sm:inline-block text-xs font-label uppercase tracking-wider px-3 py-1 rounded-full border transition-[border-color,color,background-color] duration-200 ${
                        isActive
                          ? 'border-white/20 text-slate-200 bg-white/10'
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
                          ? 'bg-imc-blue text-white border-imc-blue'
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
                      id={`accordion-panel-${dept.id}`}
                      role="region"
                      aria-labelledby={`accordion-btn-${dept.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0 } }}
                      transition={transitionConfig}
                      className="department-panel overflow-hidden"
                    >
                      <div className="department-details pt-2 pb-5 sm:pb-6 pl-0 sm:pl-12 md:pl-16 max-w-5xl space-y-4">

                        {/* Department Description */}
                        <p className="font-sans text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl font-normal">
                          {dept.shortDesc}
                        </p>

                        {/* Sub-list of 3 numbered services */}
                        <div className="border-t border-white/10 divide-y divide-white/10">
                          {dept.services.map((sub) => (
                            <div
                              key={sub.number}
                              className="py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-6 px-2 rounded-lg transition-colors duration-150 hover:bg-white/[0.04]"
                            >
                              <div className="flex items-baseline gap-3 sm:gap-5">
                                <span className="font-label text-xs text-slate-400 font-semibold">
                                  {sub.number}
                                </span>
                                <span className="font-sans font-semibold text-sm text-white">
                                  {sub.name}
                                </span>
                              </div>

                              <p className="font-sans text-sm leading-relaxed text-slate-400 max-w-md pl-6 sm:pl-0 font-normal">
                                {sub.detail}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2.5 border-t border-white/10">
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <Stethoscope className="w-3.5 h-3.5 text-imc-mist" aria-hidden="true" />
                            <a className="department-detail-link" href={`#department-${dept.id}`}>All services &amp; department information <ArrowUpRight size={16} aria-hidden="true" /></a>
                          </div>

                          <button
                            type="button"
                            onClick={onOpenAppointment}
                            className="flex items-center min-h-11 gap-2 px-4 py-2 rounded-full bg-imc-blue hover:bg-imc-blue-hover active:scale-95 text-white font-medium text-xs uppercase tracking-wider transition-[background-color,transform] duration-150 shadow-sm cursor-pointer"
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

