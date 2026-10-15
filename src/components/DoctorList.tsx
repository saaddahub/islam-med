import React, { useState, useEffect, useRef } from 'react';
import { DOCTORS } from '../data/doctors';
import type { Doctor } from '../data/doctors';
import { ArrowUpRight, Clock } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../lib/useReducedMotion';
import { useMediaQuery } from '../lib/useMediaQuery';

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
  const springConfig = { stiffness: 750, damping: 32, mass: 0.05 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  const isInitialized = useRef(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Softly hide floating pill while scrolling so it never floats awkwardly in mid-air
  useEffect(() => {
    const onScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const targetX = Math.min(window.innerWidth - 130, Math.max(10, e.clientX + 10));
      const targetY = Math.min(window.innerHeight - 45, Math.max(10, e.clientY + 9));

      if (!isInitialized.current) {
        x.set(targetX);
        y.set(targetY);
        smoothX.jump(targetX);
        smoothY.jump(targetY);
        isInitialized.current = true;
      } else {
        x.set(targetX);
        y.set(targetY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y, smoothX, smoothY]);

  // When visible changes to true, jump immediately to cursor position so it never flies across the screen
  useEffect(() => {
    if (visible && isInitialized.current) {
      smoothX.jump(x.get());
      smoothY.jump(y.get());
    }
  }, [visible, smoothX, smoothY, x, y]);

  return (
    <AnimatePresence>
      {visible && !isScrolling && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            x: smoothX,
            y: smoothY,
            pointerEvents: 'none',
            zIndex: 40,
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.12, ease: 'easeOut' }}
          className="hidden md:block select-none pointer-events-none"
        >
          <span className="rounded-full bg-imc-blue text-white px-3.5 py-1.5 text-xs font-label font-medium shadow-2xl flex items-center gap-1.5 border border-white/25 backdrop-blur-md">
            <span>View Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-imc-mist" aria-hidden="true" />
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
  const isTouchDevice = !useMediaQuery('(hover: hover) and (pointer: fine)');
  const isReduced = useReducedMotion();

  const handleRowClick = (doctor: Doctor) => {
    setHoveredDoctorId(null);
    onSelectDoctor(doctor);
  };

  const rowTransition = isReduced
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section
      id="doctors"
      data-stack="in out"
      className="relative z-20 w-full bg-imc-night text-white py-20 sm:py-28 border-t border-white/10"
    >
      {/* Signature Cursor-Following Pill Button (suppressed on touch & reduced motion) */}
      {!isTouchDevice && !isReduced && (
        <CursorFollowButton visible={!!hoveredDoctorId} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Giant Oversized Section Label in Anton */}
        <div className="relative mb-8 sm:mb-12 select-none">
          <h2 data-reveal="mask" className="font-editorial text-6xl sm:text-8xl uppercase tracking-tight text-white leading-[1.05] opacity-95">
            Our <em className="font-normal">doctors</em>
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
                  backgroundColor: isHovered ? 'rgba(244, 239, 230, 0.05)' : 'rgba(28, 48, 59, 0)',
                }}
                transition={rowTransition}
                onMouseEnter={() => {
                  if (!isTouchDevice) setHoveredDoctorId(doctor.id);
                }}
                onFocus={() => setHoveredDoctorId(doctor.id)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setHoveredDoctorId(null);
                }}

                className={`group relative py-6 sm:py-7 px-4 sm:px-6 my-0.5 cursor-pointer select-none rounded-2xl text-white transition-colors duration-150 ${
                  isHovered ? 'shadow-lg' : ''
                }`}
              >
                {/* Main Row Header (Stable layout that never wraps on hover) */}
                <div className="grid grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)_auto] items-center gap-x-4 gap-y-3 lg:gap-x-6">
                  
                  {/* Left: Department & Role */}
                  <div className="col-span-2 lg:col-span-1 min-w-0 space-y-1">
                    <div
                      className={`text-xs sm:text-sm font-label tracking-widest uppercase transition-colors duration-150 ${
                        isHovered ? 'text-imc-mist' : 'text-slate-400'
                      }`}
                    >
                      {doctor.yearMeta}
                    </div>
                    <div
                      className={`text-xs font-sans transition-colors duration-150 ${
                        isHovered ? 'text-slate-200' : 'text-slate-400'
                      }`}
                    >
                      {doctor.role}
                    </div>
                  </div>

                  {/* Doctor Full Name in Anton */}
                  <div className="min-w-0 lg:text-right">
                    <h3
                      className={`font-editorial text-3xl sm:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-tight transition-colors duration-150 ${
                        isHovered ? 'text-white' : 'text-slate-200'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleRowClick(doctor)}
                        className="doctor-profile-trigger text-left lg:text-right cursor-pointer before:absolute before:inset-0 before:rounded-2xl"
                        aria-label={`View profile of ${doctor.name}`}
                      >
                        {doctor.name}
                      </button>
                    </h3>
                  </div>

                  {/* Far Right: Circular Arrow Indicator */}
                  <div className="flex items-center justify-end shrink-0">
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-[background-color,color,border-color,transform,box-shadow] duration-200 border ${
                        isHovered
                          ? 'bg-imc-blue text-white border-imc-blue rotate-45 scale-105 shadow-md'
                          : 'border-white/20 text-slate-400 group-hover:border-white/40 group-hover:text-white'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    </div>
                  </div>

                </div>

                {/* Micro-details popping up smoothly from underneath on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={rowTransition}
                      className="overflow-hidden"
                    >
                      <div className="pt-5 mt-5 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-slate-300">
                        
                        {/* Left: Doctor photo thumbnail + credentials + timings */}
                        <div className="flex items-center gap-4 sm:gap-5">
                          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-imc-blue bg-white/5">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              loading="lazy"
                              className="w-full h-full object-cover object-center"
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-white px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-[11px] font-label">
                                {doctor.qualifications.slice(0, 2).join(' • ')}
                              </span>
                              <span className="text-imc-mist font-medium text-xs">
                                {doctor.experience}
                              </span>
                            </div>
                            
                            <div className="text-slate-300 flex items-center gap-2 text-xs">
                              <Clock className="w-3.5 h-3.5 text-imc-mist shrink-0" aria-hidden="true" />
                              <span>Timings: <strong className="text-white">{doctor.availability[0]}</strong></span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Profile action */}
                        <div className="flex items-center gap-3 self-end md:self-auto">

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(doctor);
                            }}
                            className="relative z-10 px-4 py-2 rounded-full bg-imc-blue hover:bg-imc-blue-hover text-white font-medium text-xs tracking-wider uppercase active:scale-95 transition-[background-color,transform] duration-150 cursor-pointer shadow-md flex items-center gap-1.5"
                          >
                            <span>View profile</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-imc-mist" aria-hidden="true" />
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
            <h4 className="font-editorial text-2xl sm:text-3xl uppercase tracking-tight">
              Looking for a specific specialist or second opinion?
            </h4>
            <p className="font-sans text-xs sm:text-sm text-slate-300">
              Contact reception for help finding the right department and confirming your consultation timings.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenAppointment}
            className="shrink-0 px-6 py-3 rounded-full bg-imc-blue text-white font-medium text-xs sm:text-sm uppercase tracking-wider hover:bg-imc-blue-hover active:scale-95 transition-[background-color,transform] duration-150 shadow-md cursor-pointer"
          >
            Contact reception
          </button>
        </div>

      </div>
    </section>
  );
};

export default DoctorList;
