import React, { useState } from 'react';
import { DEPARTMENTS } from '../data/departments';
import { ArrowUpRight, ChevronDown, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceAccordionProps {
  onOpenAppointment: () => void;
}

export const ServiceAccordion: React.FC<ServiceAccordionProps> = ({
  onOpenAppointment,
}) => {
  const [activeDeptId, setActiveDeptId] = useState<string>(DEPARTMENTS[0].id);

  const handleToggle = (deptId: string) => {
    setActiveDeptId((prev) => (prev === deptId ? '' : deptId));
  };

  return (
    <section
      id="departments"
      className="relative z-20 w-full bg-[#0D1B2A] text-white py-12 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Accordion Container */}
        <div className="border-t border-white/15 divide-y divide-white/15">
          {DEPARTMENTS.map((dept, index) => {
            const isOpen = dept.id === activeDeptId;

            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`transition-colors duration-200 ${
                  isOpen ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Accordion Row Header */}
                <button
                  type="button"
                  onClick={() => handleToggle(dept.id)}
                  className="w-full text-left py-6 sm:py-8 flex items-center justify-between gap-4 group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1D4ED8] active:bg-white/[0.04]"
                  aria-expanded={isOpen}
                  id={`accordion-btn-${dept.id}`}
                >
                  <div className="flex items-baseline gap-4 sm:gap-8 flex-1 min-w-0">
                    {/* Faded Number in Anton */}
                    <span
                      className={`font-anton text-2xl sm:text-4xl md:text-5xl transition-colors duration-200 ${
                        isOpen ? 'text-[#93C5FD]' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    >
                      {dept.number}
                    </span>

                    {/* Department Name in Anton */}
                    <span
                      className={`font-anton text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight truncate transition-colors duration-200 ${
                        isOpen ? 'text-white' : 'text-slate-400 group-hover:text-white'
                      }`}
                    >
                      {dept.name}
                    </span>
                  </div>

                  {/* Right Status Pill & Arrow Icon */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden md:inline-block text-xs font-mono text-slate-300 uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">
                      {dept.stat}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-200 ${
                        isOpen
                          ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                          : 'border-white/20 text-white group-hover:border-white/40 group-active:scale-90'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" aria-hidden="true" />
                    </motion.div>
                  </div>
                </button>

                {/* Accordion Expandable Content with Framer Motion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`content-${dept.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-10 sm:pb-12 pl-0 sm:pl-16 md:pl-24 max-w-5xl space-y-8">
                        
                        {/* Department 1-sentence description in Inter */}
                        <p className="font-sans text-base sm:text-xl text-[#EDEDED] leading-relaxed max-w-3xl font-normal">
                          {dept.shortDesc}
                        </p>

                        {/* Sub-list of 3 numbered services in Reference A typographic hierarchy */}
                        <div className="border-t border-white/10 divide-y divide-white/10">
                          {dept.services.map((sub) => (
                            <div
                              key={sub.number}
                              className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 group/sub hover:bg-white/[0.02] px-2 rounded-lg transition-colors duration-150"
                            >
                              <div className="flex items-baseline gap-4 sm:gap-6">
                                {/* Faded sub-number */}
                                <span className="font-mono text-sm sm:text-base text-slate-400 font-semibold">
                                  {sub.number}
                                </span>
                                {/* Bold sub-service label */}
                                <span className="font-sans font-semibold text-base sm:text-lg text-white group-hover/sub:text-[#93C5FD] transition-colors duration-150">
                                  {sub.name}
                                </span>
                              </div>

                              {/* Sub-service detail in muted Inter */}
                              <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-md pl-8 sm:pl-0">
                                {sub.detail}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Action Bar for this department */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                          <div className="flex items-center gap-2 text-xs text-slate-300">
                            <Stethoscope className="w-4 h-4 text-[#DC2626]" aria-hidden="true" />
                            <span>Department Lead: <strong className="text-white">{dept.leadDoctor}</strong></span>
                          </div>

                          <button
                            type="button"
                            onClick={onOpenAppointment}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white active:scale-95 font-semibold text-xs uppercase tracking-wider transition-[background-color,color,transform] duration-150 border border-white/10 hover:border-transparent cursor-pointer"
                          >
                            <span>Consult Department Team</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServiceAccordion;
