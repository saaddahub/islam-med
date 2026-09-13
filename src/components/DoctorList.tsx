import React, { useState, useEffect } from 'react';
import { DOCTORS } from '../data/doctors';
import type { Doctor } from '../data/doctors';
import { ArrowUpRight, Award, Star } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../lib/useReducedMotion';

interface DoctorListProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onOpenAppointment: () => void;
}

interface CursorFollowButtonProps {
  visible: boolean;
}

const CursorFollowButton: React.FC<CursorFollowButtonProps> = ({ visible }) => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      x.set(e.clientX + 16);
      y.set(e.clientY + 16);
    }
    if (visible) {
      window.addEventListener('mousemove', handleMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, [visible, x, y]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{
            position: 'fixed',
            left: springX,
            top: springY,
            pointerEvents: 'none',
            zIndex: 50,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="hidden md:block"
        >
          <span className="rounded-full bg-[#1DBF8A] text-white px-4 py-2 text-xs font-mono font-medium shadow-xl flex items-center gap-1.5">
            <span>View Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const DoctorList: React.FC<DoctorListProps> = ({
  onSelectDoctor,
  onOpenAppointment,
}) => {
  const [hoveredDoctorId, setHoveredDoctorId] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
      setIsTouchDevice(!mq.matches);

      const handler = (e: MediaQueryListEvent) => {
        setIsTouchDevice(!e.matches);
      };
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  const handleRowClick = (doctor: Doctor) => {
    if (isTouchDevice) {
      setHoveredDoctorId((prev) => (prev === doctor.id ? null : doctor.id));
    } else {
      onSelectDoctor(doctor);
    }
  };

  const rowTransition = isReduced
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.65, 0, 0.35, 1] as const };

  const photoTransition = isReduced
    ? { duration: 0 }
    : { duration: 0.35, ease: 'easeOut' as const };

  return (
    <section
      id="doctors"
      className="relative z-20 w-full bg-[#F5F0E8] text-[#1C1C1E] py-20 sm:py-28 overflow-hidden"
    >
      {/* Signature Cursor-Following Pill Button (suppressed on touch & reduced motion) */}
      {!isTouchDevice && !isReduced && (
        <CursorFollowButton visible={!!hoveredDoctorId} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Giant Oversized Section Label in Anton */}
        <div className="relative mb-6 sm:mb-12 select-none overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-600 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" aria-hidden="true" />
              <span>03 / CONSULTANT ROSTER</span>
            </div>
            <span className="text-xs font-sans text-slate-500 hidden sm:inline-block">
              {isTouchDevice
                ? 'Tap to expand credentials • View dossier'
                : 'Hover to reveal credentials • Click to view full dossier'}
            </span>
          </div>

          <h2 className="font-anton text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] uppercase tracking-tight text-[#1C1C1E] leading-[0.85] opacity-95">
            OUR DOCTORS
          </h2>
        </div>

        {/* Doctor Rows with Hairline Dividers & Framer Motion Layout Tweening */}
        <div className="border-t border-slate-200 divide-y divide-slate-200">
          {DOCTORS.map((doctor) => {
            const isHovered = hoveredDoctorId === doctor.id;

            return (
              <motion.div
                key={doctor.id}
                layout
                initial={false}
                animate={{
                  backgroundColor: isHovered ? '#0C1414' : 'rgba(245, 240, 232, 0)',
                }}
                transition={rowTransition}
                onHoverStart={() => {
                  if (!isTouchDevice) setHoveredDoctorId(doctor.id);
                }}
                onHoverEnd={() => {
                  if (!isTouchDevice) setHoveredDoctorId(null);
                }}
                onClick={() => handleRowClick(doctor)}
                className={`group relative py-7 px-4 sm:px-6 my-1 cursor-pointer select-none rounded-2xl ${
                  isHovered ? 'text-white shadow-xl' : 'text-[#1C1C1E]'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Left Metadata + Animated Thumbnail Slide-in */}
                  <div className="flex items-center gap-4 sm:gap-8">
                    
                    {/* Doctor thumbnail photo sliding in from left with fade + scale */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, x: -20, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -20, scale: 0.95 }}
                          transition={photoTransition}
                          className="relative overflow-hidden rounded-2xl shrink-0 w-20 h-20 ring-2 ring-[#1DBF8A]"
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
                        className={`text-xs sm:text-sm font-mono tracking-widest uppercase transition-colors duration-200 ${
                          isHovered ? 'text-[#A7F3D0]' : 'text-slate-500'
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
                        isHovered ? 'text-white' : 'text-[#1C1C1E]'
                      }`}
                    >
                      {doctor.name}
                    </h3>
                  </div>

                  {/* Far Right: Directional Indicator */}
                  <div className="hidden sm:flex items-center justify-end shrink-0 pl-4">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-[background-color,border-color,transform] duration-200 border ${
                        isHovered
                          ? 'bg-[#1DBF8A] text-white border-[#1DBF8A] rotate-45 scale-105'
                          : 'border-slate-300 text-slate-500 group-hover:border-slate-400'
                      }`}
                    >
                      <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>

                </div>

                {/* Expanded Micro-details on hover or touch expansion */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={rowTransition}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-1.5 text-amber-400">
                            <Star className="w-4 h-4 fill-amber-400" aria-hidden="true" />
                            <span className="font-semibold text-white">{doctor.rating}</span>
                            <span className="text-slate-400">({doctor.patientsTreated} patients)</span>
                          </div>
                          <div className="hidden sm:flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-[#A7F3D0]" aria-hidden="true" />
                            <span>{doctor.experience}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-slate-300">
                            Consultation: <strong className="text-white">{doctor.consultationFee}</strong>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectDoctor(doctor);
                            }}
                            className="px-4 py-1.5 rounded-full bg-[#1DBF8A] text-white font-medium text-xs tracking-wider uppercase hover:bg-[#0EA571] active:scale-95 transition-[background-color,transform] duration-150 cursor-pointer shadow-xs"
                          >
                            View Full Dossier
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

        {/* Bottom Fast Action */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-[#0C1414] text-white border border-white/10">
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
            className="shrink-0 px-6 py-3 rounded-full bg-[#1DBF8A] text-white font-medium text-xs sm:text-sm uppercase tracking-wider hover:bg-[#0EA571] active:scale-95 transition-[background-color,transform] duration-150 shadow-md cursor-pointer"
          >
            Direct Specialist Triage
          </button>
        </div>

      </div>
    </section>
  );
};

export default DoctorList;
