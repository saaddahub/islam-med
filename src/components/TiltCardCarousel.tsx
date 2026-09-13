import React, { useState, useEffect } from 'react';
import { CARE_PACKAGES } from '../data/packages';
import { ArrowUpRight, Clock, ShieldCheck, Bed, HeartHandshake } from 'lucide-react';
import SquiggleUnderline from './SquiggleUnderline';
import { motion } from 'framer-motion';
import { isDesktop as checkIsDesktop } from '../lib/useScrollTrigger';
import { useReducedMotion } from '../lib/useReducedMotion';

interface TiltCardCarouselProps {
  onOpenAppointment: () => void;
}

export const TiltCardCarousel: React.FC<TiltCardCarouselProps> = ({ onOpenAppointment }) => {
  const [isDesktopState, setIsDesktopState] = useState(false);
  const isReduced = useReducedMotion();

  useEffect(() => {
    setIsDesktopState(checkIsDesktop());
    const handleResize = () => {
      setIsDesktopState(checkIsDesktop());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: isReduced ? 0 : 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      rotateX: isDesktopState && !isReduced ? 15 : 0,
      y: 40,
      scale: 0.92,
    },
    show: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      scale: 1,
      transition: isReduced
        ? { duration: 0 }
        : {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as const,
          },
    },
  };

  const getStatIcon = (iconType: string) => {
    switch (iconType) {
      case 'slot':
        return <Bed className="w-3.5 h-3.5 text-[#1B4332]" aria-hidden="true" />;
      case 'clock':
        return <Clock className="w-3.5 h-3.5 text-[#DC2626]" aria-hidden="true" />;
      case 'shield':
      default:
        return <ShieldCheck className="w-3.5 h-3.5 text-[#1B4332]" aria-hidden="true" />;
    }
  };

  return (
    <section
      id="care-plans"
      className="relative z-20 w-full py-24 sm:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F5F0E8 0%, #F0F5FA 50%, #F5EFE6 100%)',
      }}
    >
      {/* Background soft ambient noise/circles */}
      <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header with Instrument Serif and Squiggle */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-[#DC2626]" aria-hidden="true" />
            <span>05 / INDIVIDUALIZED CARE PLANS</span>
          </div>

          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-[#1C1C1E] leading-[1.05]">
            Where care feels{' '}
            <span className="relative inline-block italic font-normal text-[#1C1C1E]">
              personal
              <SquiggleUnderline color="#DC2626" className="w-full" />
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-slate-700 max-w-xl mx-auto leading-relaxed font-normal">
            Transparent, concierge-managed treatment plans created to make world-class specialist 
            care straightforward, accessible, and seamless.
          </p>
        </div>

        {/* 3 Horizontally Arranged Cards with 3D Perspective Tilt Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-center"
          style={{ perspective: isDesktopState && !isReduced ? 1000 : undefined }}
        >
          {CARE_PACKAGES.map((pkg) => {
            const isFeatured = pkg.isFeatured;

            return (
              <motion.div
                key={pkg.id}
                variants={cardVariants}
                className={`group relative rounded-[2rem] bg-white/90 backdrop-blur-xl p-6 sm:p-7 border border-slate-200/80 shadow-lg transition-[transform,background-color] duration-300 hover:bg-white ${
                  isFeatured
                    ? 'lg:scale-[1.05] lg:-translate-y-4 z-20 ring-2 ring-[#1B4332]/30 shadow-2xl bg-white'
                    : 'z-10'
                }`}
              >
                {/* Card Top: Rounded Photo with Status Pill */}
                <div className="relative h-52 sm:h-56 rounded-2xl overflow-hidden mb-6 shadow-sm">
                  <img
                    src={pkg.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Top-Left Status Pill */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-semibold text-[#1C1C1E] shadow-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" aria-hidden="true" />
                    <span>{pkg.badge}</span>
                  </div>

                  {/* Top-Right Department Tag */}
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-md bg-[#0F2318]/90 backdrop-blur-md text-[10px] font-mono text-white">
                    {pkg.department}
                  </div>
                </div>

                {/* Stat Icons Row (3 stats: bed, clock, shield) */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-5 text-[11px] text-slate-700">
                  {pkg.stats.map((st, sIdx) => (
                    <div key={sIdx} className="flex flex-col items-center text-center gap-1">
                      {getStatIcon(st.icon)}
                      <span className="font-medium leading-tight">{st.label}</span>
                    </div>
                  ))}
                </div>

                {/* Title & 1-sentence Description */}
                <div className="space-y-2 mb-6">
                  <h3 className="font-anton text-2xl uppercase tracking-tight text-[#1C1C1E]">
                    {pkg.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[3rem]">
                    {pkg.description}
                  </p>
                </div>

                {/* Price & Duration */}
                <div className="flex items-baseline gap-2 mb-6 border-t border-slate-200 pt-4">
                  <span className="font-anton text-3xl sm:text-4xl text-[#1C1C1E] tabular-nums">
                    {pkg.price}
                  </span>
                  <span className="text-xs text-slate-500 font-sans">
                    / {pkg.period}
                  </span>
                </div>

                {/* Side-by-side Button Pairing: Primary Pill + Secondary Circular Arrow */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onOpenAppointment}
                    className="flex-1 py-3 px-5 rounded-full bg-[#1B4332] hover:bg-[#15382A] active:scale-95 text-white font-medium text-xs uppercase tracking-wider transition-[background-color,transform] duration-150 shadow-[0_2px_12px_rgba(27,67,50,0.25)] flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <span>Explore Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenAppointment}
                    className="w-11 h-11 rounded-full flex items-center justify-center bg-white border border-slate-200 text-[#1C1C1E] hover:bg-[#0F2318] hover:text-white active:scale-90 transition-[background-color,color,transform] duration-150 shadow-xs shrink-0 cursor-pointer"
                    title="Book Consultation"
                    aria-label="Book Consultation"
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default TiltCardCarousel;
