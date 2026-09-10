import React, { useState } from 'react';
import { DOCTORS } from '../data/doctors';
import type { Doctor } from '../data/doctors';
import { ArrowUpRight, Award, Star } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface DoctorListProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onOpenAppointment: () => void;
}

export const DoctorList: React.FC<DoctorListProps> = ({
  onSelectDoctor,
  onOpenAppointment,
}) => {
  const [hoveredDoctorId, setHoveredDoctorId] = useState<string | null>(null);
  
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const springConfig = { damping: 30, stiffness: 300 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    rawX.set(e.clientX);
    rawY.set(e.clientY);
  };

  return (
    <section
      id="doctors"
      onMouseMove={handleMouseMove}
      className="relative z-20 w-full bg-[#FAF8F5] text-[#0F172A] py-20 sm:py-28 overflow-hidden"
    >
      {/* Floating "VIEW PROFILE" Pill Tooltip */}
      {hoveredDoctorId && (
        <motion.div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1D4ED8] text-white font-medium text-xs uppercase tracking-wider shadow-lg"
          style={{
            left: smoothX,
            top: smoothY,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
        >
          <span>VIEW PROFILE</span>
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Giant Oversized Section Label in Anton */}
        <div className="relative mb-6 sm:mb-12 select-none overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-600 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" aria-hidden="true" />
              <span>03 / CONSULTANT ROSTER</span>
            </div>
            <span className="text-xs font-sans text-slate-500">
              Hover to reveal credentials • Click to view full dossier
            </span>
          </div>

          <h2 className="font-anton text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] uppercase tracking-tight text-[#0F172A] leading-[0.85] opacity-95">
            OUR DOCTORS
          </h2>
        </div>

        {/* Doctor Rows with Hairline Dividers */}
        <div className="border-t border-slate-200 divide-y divide-slate-200">
          {DOCTORS.map((doctor) => {
            const isHovered = hoveredDoctorId === doctor.id;

            return (
              <div
                key={doctor.id}
                onMouseEnter={() => setHoveredDoctorId(doctor.id)}
                onMouseLeave={() => setHoveredDoctorId(null)}
                onClick={() => onSelectDoctor(doctor)}
                className={`group relative py-7 px-4 sm:px-6 my-1 transition-[background-color,color,transform] duration-200 ease-out cursor-pointer select-none rounded-2xl active:scale-[0.99] ${
                  isHovered
                    ? 'bg-[#0D1B2A] text-white scale-[1.008] shadow-xl'
                    : 'bg-transparent text-[#0F172A] hover:bg-slate-100/60'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Left Metadata in Inter uppercase + Thumbnail reveal on hover */}
                  <div className="flex items-center gap-4 sm:gap-8">
                    
                    {/* Doctor thumbnail photo sliding in with GPU scale & opacity */}
                    <div
                      className={`relative overflow-hidden rounded-2xl shrink-0 w-20 h-20 transition-[opacity,transform] duration-200 ease-out ${
                        isHovered
                          ? 'opacity-100 scale-100 ring-2 ring-[#1D4ED8]'
                          : 'opacity-0 scale-75 pointer-events-none -mr-20'
                      }`}
                    >
                      <img
                        src={doctor.image}
                        alt=""
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    <div className="space-y-1">
                      <div
                        className={`text-xs sm:text-sm font-mono tracking-widest uppercase transition-colors duration-200 ${
                          isHovered ? 'text-[#93C5FD]' : 'text-slate-500'
                        }`}
                      >
                        {doctor.yearMeta}
                      </div>
                      <div
                        className={`text-xs font-sans transition-colors duration-200 ${
                          isHovered ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {doctor.role}
                      </div>
                    </div>
                  </div>

                  {/* Doctor Full Name in Anton */}
                  <div className="flex-1 md:text-right">
                    <h3
                      className={`font-anton text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight transition-colors duration-200 ${
                        isHovered ? 'text-white' : 'text-[#0F172A]'
                      }`}
                    >
                      {doctor.name}
                    </h3>
                  </div>

                  {/* Far Right: External-link arrow icon */}
                  <div className="hidden sm:flex items-center justify-end shrink-0 pl-4">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-[background-color,border-color,transform] duration-200 border ${
                        isHovered
                          ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] rotate-45 scale-110'
                          : 'border-slate-300 text-slate-500 group-hover:border-slate-400'
                      }`}
                    >
                      <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>

                </div>

                {/* Expanded Micro-details visible on hover or mobile */}
                {isHovered && (
                  <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1.5 text-amber-400">
                        <Star className="w-4 h-4 fill-amber-400" aria-hidden="true" />
                        <span className="font-semibold text-white">{doctor.rating}</span>
                        <span className="text-slate-400">({doctor.patientsTreated} patients)</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#93C5FD]" aria-hidden="true" />
                        <span>{doctor.experience}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-slate-300">Consultation: <strong className="text-white">{doctor.consultationFee}</strong></span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDoctor(doctor);
                        }}
                        className="px-4 py-1.5 rounded-full bg-[#1D4ED8] text-white font-medium text-xs tracking-wider uppercase hover:bg-[#1E40AF] active:scale-95 transition-[background-color,transform] duration-150 cursor-pointer shadow-xs"
                      >
                        View Full Dossier
                      </button>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Bottom Fast Action */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-[#0D1B2A] text-white border border-white/10">
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
            className="shrink-0 px-6 py-3 rounded-full bg-[#1D4ED8] text-white font-medium text-xs sm:text-sm uppercase tracking-wider hover:bg-[#1E40AF] active:scale-95 transition-[background-color,transform] duration-150 shadow-md cursor-pointer"
          >
            Direct Specialist Triage
          </button>
        </div>

      </div>
    </section>
  );
};

export default DoctorList;
