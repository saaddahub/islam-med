import React, { useState } from 'react';
import { DOCTORS } from '../data/doctors';
import type { Doctor } from '../data/doctors';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../lib/useReducedMotion';

interface DoctorListProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onOpenAppointment: () => void;
}

export const DoctorList: React.FC<DoctorListProps> = ({
  onSelectDoctor,
  onOpenAppointment,
}) => {
  const [hoveredDoctorId, setHoveredDoctorId] = useState<string | null>(null);
  const isReduced = useReducedMotion();

  const handleRowClick = (doctor: Doctor) => {
    setHoveredDoctorId(null);
    onSelectDoctor(doctor);
  };

  const rowTransition = isReduced
    ? { duration: 0 }
    : { duration: 0.2, ease: 'easeOut' as const };

  const photoTransition = isReduced
    ? { duration: 0 }
    : { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      id="doctors"
      data-stack="in out"
      className="relative z-20 w-full bg-[#191919] text-white py-20 sm:py-28 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Giant Oversized Section Label in Anton */}
        <div className="relative mb-6 sm:mb-12 select-none overflow-hidden">
          <div data-reveal="up" className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2 text-xs font-label tracking-widest text-slate-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" aria-hidden="true" />
              <span>03 / CONSULTANT ROSTER</span>
            </div>
            <span className="text-xs font-sans text-slate-400 hidden sm:inline-block">
              Click any consultant to view full medical dossier
            </span>
          </div>

          <h2 data-reveal="mask" className="font-anton text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] uppercase tracking-tight text-white leading-[0.85] opacity-95">
            OUR DOCTORS
          </h2>
        </div>

        {/* Doctor Rows with Hairline Dividers */}
        <div
          data-stagger
          onMouseLeave={() => setHoveredDoctorId(null)}
          className="border-t border-white/10 divide-y divide-white/10"
        >
          {DOCTORS.map((doctor) => {
            const isHovered = hoveredDoctorId === doctor.id;

            return (
              <motion.div
                data-reveal="up"
                key={doctor.id}
                initial={false}
                animate={{
                  backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.06)' : 'rgba(25, 25, 25, 0)',
                }}
                transition={rowTransition}
                onMouseEnter={() => setHoveredDoctorId(doctor.id)}
                onClick={() => handleRowClick(doctor)}
                className={`group relative py-6 sm:py-7 px-4 sm:px-6 my-0.5 cursor-pointer select-none rounded-2xl text-white transition-colors duration-200 ${
                  isHovered ? 'shadow-lg' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Left Metadata + Animated Thumbnail Slide-in */}
                  <div className="flex items-center gap-4 sm:gap-6">
                    
                    {/* Doctor thumbnail photo sliding in smoothly on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, width: 0, scale: 0.8 }}
                          animate={{ opacity: 1, width: 72, scale: 1 }}
                          exit={{ opacity: 0, width: 0, scale: 0.8 }}
                          transition={photoTransition}
                          className="relative overflow-hidden rounded-2xl shrink-0 h-18 ring-2 ring-[#1C3460] shadow-md hidden sm:block"
                        >
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            loading="lazy"
                            className="w-full h-full object-cover object-center"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-1">
                      <div
                        className={`text-xs sm:text-sm font-label tracking-widest uppercase transition-colors duration-200 ${
                          isHovered ? 'text-[#93B4D4]' : 'text-slate-400'
                        }`}
                      >
                        {doctor.yearMeta}
                      </div>
                      <div
                        className={`text-xs font-sans transition-colors duration-200 ${
                          isHovered ? 'text-slate-200' : 'text-slate-400'
                        }`}
                      >
                        {doctor.role} <span className="text-slate-500">•</span> <span className="text-[#93B4D4] font-medium">{doctor.experience}</span>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Full Name in Anton */}
                  <div className="flex-1 md:text-right">
                    <h3
                      className={`font-anton text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight transition-colors duration-200 ${
                        isHovered ? 'text-white' : 'text-slate-200'
                      }`}
                    >
                      {doctor.name}
                    </h3>
                  </div>

                  {/* Far Right: View Profile Pill + Directional Indicator */}
                  <div className="flex items-center justify-end shrink-0 gap-3 pl-2 sm:pl-4">
                    <span
                      className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-label font-medium uppercase tracking-wider transition-all duration-200 border ${
                        isHovered
                          ? 'bg-[#1C3460] text-white border-white/20 shadow-md translate-x-0 opacity-100'
                          : 'opacity-0 translate-x-2 pointer-events-none'
                      }`}
                    >
                      <span>View Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#93B4D4]" aria-hidden="true" />
                    </span>

                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 border ${
                        isHovered
                          ? 'bg-[#1C3460] text-white border-[#1C3460] rotate-45 scale-105 shadow-md'
                          : 'border-white/20 text-slate-400 group-hover:border-white/40 group-hover:text-white'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    </div>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Bottom Fast Action */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white/[0.04] text-white border border-white/10">
          <div className="space-y-1">
            <h4 className="font-anton text-2xl sm:text-3xl uppercase tracking-tight">
              Looking for a specific specialist or second opinion?
            </h4>
            <p className="font-sans text-xs sm:text-sm text-slate-300">
              Our concierge triage coordinator matches you with the ideal department chair within 2 hours.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenAppointment}
            className="shrink-0 px-6 py-3 rounded-full bg-[#1C3460] text-white font-medium text-xs sm:text-sm uppercase tracking-wider hover:bg-[#152A52] active:scale-95 transition-[background-color,transform] duration-150 shadow-md cursor-pointer"
          >
            Direct Specialist Triage
          </button>
        </div>

      </div>
    </section>
  );
};

export default DoctorList;
