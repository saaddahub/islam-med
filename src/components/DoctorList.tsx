import React, { useState, useEffect, useRef } from 'react';
import { DOCTORS } from '../data/doctors';
import type { Doctor } from '../data/doctors';
import { ArrowUpRight, Award, ShieldCheck } from 'lucide-react';
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
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const springX = useSpring(x, { stiffness: 650, damping: 38, mass: 0.15 });
  const springY = useSpring(y, { stiffness: 650, damping: 38, mass: 0.15 });
  const hasPosition = useRef(false);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const targetX = e.clientX + 14;
      const targetY = e.clientY + 14;
      if (!hasPosition.current) {
        x.set(targetX);
        y.set(targetY);
        springX.jump(targetX);
        springY.jump(targetY);
        hasPosition.current = true;
      } else {
        x.set(targetX);
        y.set(targetY);
      }
    }

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, [x, y, springX, springY]);

  // When appearing, immediately sync spring to current mouse position so it never flies across the screen
  useEffect(() => {
    if (visible && hasPosition.current) {
      springX.jump(x.get());
      springY.jump(y.get());
    }
  }, [visible, x, y, springX, springY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            x: springX,
            y: springY,
            pointerEvents: 'none',
            zIndex: 100,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="hidden md:block select-none"
        >
          <span className="rounded-full bg-[#1C3460] text-white px-3.5 py-1.5 text-xs font-label font-medium shadow-2xl flex items-center gap-1.5 border border-white/20 backdrop-blur-sm">
            <span>View Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#93B4D4]" aria-hidden="true" />
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
      data-stack="in out"
      className="relative z-20 w-full bg-[#191919] text-white py-20 sm:py-28 border-t border-white/10"
    >
      {/* Signature Cursor-Following Pill Button (suppressed on touch & reduced motion) */}
      {!isTouchDevice && !isReduced && (
        <CursorFollowButton visible={!!hoveredDoctorId} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Giant Oversized Section Label in Anton */}
        <div className="relative mb-6 sm:mb-12 select-none overflow-hidden">
          <div data-reveal="up" className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2 text-xs font-label tracking-widest text-slate-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" aria-hidden="true" />
              <span>03 / CONSULTANT ROSTER</span>
            </div>
            <span className="text-xs font-sans text-slate-400 hidden sm:inline-block">
              {isTouchDevice
                ? 'Tap to expand credentials • View dossier'
                : 'Hover to reveal credentials • Click to view full dossier'}
            </span>
          </div>

          <h2 data-reveal="mask" className="font-anton text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] uppercase tracking-tight text-white leading-[0.85] opacity-95">
            OUR DOCTORS
          </h2>
        </div>

        {/* Doctor Rows with Hairline Dividers & Framer Motion Layout Tweening */}
        <div data-stagger className="border-t border-white/10 divide-y divide-white/10">
          {DOCTORS.map((doctor) => {
            const isHovered = hoveredDoctorId === doctor.id;

            return (
              <motion.div
                data-reveal="up"
                key={doctor.id}
                initial={false}
                animate={{
                  backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'rgba(25, 25, 25, 0)',
                }}
                transition={rowTransition}
                onMouseEnter={() => {
                  if (!isTouchDevice) setHoveredDoctorId(doctor.id);
                }}
                onMouseLeave={() => {
                  if (!isTouchDevice) setHoveredDoctorId(null);
                }}
                onClick={() => handleRowClick(doctor)}
                className={`group relative py-7 px-4 sm:px-6 my-1 cursor-pointer select-none rounded-2xl gpu-layer text-white ${
                  isHovered ? 'shadow-xl' : ''
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
                          className="relative overflow-hidden rounded-2xl shrink-0 w-20 h-20 ring-2 ring-[#1C3460]"
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
                        {doctor.role}
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

                  {/* Far Right: Directional Indicator */}
                  <div className="hidden sm:flex items-center justify-end shrink-0 pl-4">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-[background-color,border-color,transform] duration-200 border ${
                        isHovered
                          ? 'bg-[#1C3460] text-white border-[#1C3460] rotate-45 scale-105'
                          : 'border-white/20 text-slate-400 group-hover:border-white/40 group-hover:text-white'
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
                          <div className="flex items-center gap-1.5 text-[#93B4D4]">
                            <Award className="w-4 h-4 text-[#93B4D4]" aria-hidden="true" />
                            <span className="font-semibold text-white">{doctor.experience}</span>
                          </div>
                          <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
                            <ShieldCheck className="w-4 h-4 text-[#DC2626]" aria-hidden="true" />
                            <span>Verified Medical Specialist</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-slate-300">
                            Appointments: <strong className="text-white">Direct &amp; Walk-In</strong>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectDoctor(doctor);
                            }}
                            className="px-4 py-1.5 rounded-full bg-[#1C3460] text-white font-medium text-xs tracking-wider uppercase hover:bg-[#152A52] active:scale-95 transition-[background-color,transform] duration-150 cursor-pointer shadow-xs"
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

