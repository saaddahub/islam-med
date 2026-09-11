import React from 'react';
import { ArrowUpRight, Award, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../lib/useReducedMotion';

interface FounderSpotlightProps {
  onOpenAppointment: () => void;
}

export const FounderSpotlight: React.FC<FounderSpotlightProps> = ({ onOpenAppointment }) => {
  const isReduced = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isReduced ? 0 : 0.15,
      },
    },
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.88, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: isReduced
        ? { duration: 0 }
        : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: isReduced
        ? { duration: 0 }
        : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="about"
      className="relative z-20 w-full bg-[#0D1B2A] text-white py-24 sm:py-36 border-t border-white/10 overflow-hidden"
    >
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#1D4ED8]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-5xl mx-auto space-y-12"
        >
          {/* Top Two-Part Header: Circular Photo + Large Condensed Headline */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            {/* Circular Headshot */}
            <motion.div variants={photoVariants} className="relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden ring-4 ring-[#1D4ED8]/40 shadow-2xl bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=85&w=600"
                  alt="Dr. Tariq Islam, Founder & Medical Director"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Online / Active Chief Status Badge */}
              <span
                className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#0D1B2A] flex items-center justify-center border border-white/20"
                title="Active Chief of Surgery"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" aria-hidden="true" />
              </span>
            </motion.div>

            {/* Headline and Tag Pill */}
            <motion.div variants={textVariants} className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-white/10 text-xs font-mono tracking-widest text-[#93C5FD] uppercase border border-white/10">
                  LEADERSHIP & VISION
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
                  FOUNDER & MEDICAL DIRECTOR
                </span>
              </div>

              <h2 className="font-anton text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white leading-[0.92]">
                HEY — I&apos;M DR. TARIQ ISLAM
              </h2>
            </motion.div>
          </div>

          {/* Lower Two-Column Body: Bio Copy + Credentials & CTA */}
          <motion.div
            variants={textVariants}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/10"
          >
            {/* Left Column: Role & Mission Statement */}
            <div className="md:col-span-4 space-y-3">
              <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#1D4ED8]/20 text-[#93C5FD] text-xs font-mono font-medium uppercase tracking-wider border border-[#1D4ED8]/30">
                FOUNDER & CHIEF SURGEON
              </div>
              <div className="text-sm font-sans font-medium text-white">
                Islam Medical Complex • Islamabad
              </div>
              <p className="text-xs font-sans text-slate-400 leading-relaxed">
                Dedicated to pioneering robotic precision while protecting the warmth of bedside care.
              </p>
            </div>

            {/* Right Column: Bio Paragraph, Stats, & CTA */}
            <div className="md:col-span-8 space-y-6">
              <p className="font-sans text-base sm:text-xl text-slate-200 leading-relaxed font-normal">
                &ldquo;Islam Medical Complex was founded on a simple belief: world-class clinical precision 
                and genuine human warmth aren&apos;t a trade-off. Every space here — from our sub-millimeter 
                robotic theaters to light-filled circadian recovery suites — is designed around patient 
                dignity, safety, and tranquil restoration.&rdquo;
              </p>

              {/* Clinical Trust Credentials Row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#93C5FD]" aria-hidden="true" />
                  <span>MD, FACS • Johns Hopkins Fellow</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                  <span>25+ Years Surgical Leadership</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#DC2626]" aria-hidden="true" />
                  <span>18,400+ Surgeries Supervised</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="px-6 py-3 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] active:scale-95 text-white font-medium text-xs sm:text-sm uppercase tracking-wider transition-[background-color,transform] duration-150 shadow-[0_2px_12px_rgba(29,78,216,0.25)] flex items-center gap-2 cursor-pointer"
                >
                  <span>Schedule Consultation</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <a
                  href="#hero-mosaic"
                  className="px-5 py-3 rounded-full border border-white/20 hover:bg-white/10 active:scale-95 text-white text-xs sm:text-sm font-medium uppercase tracking-wider transition-[background-color,border-color,transform] duration-150 cursor-pointer"
                >
                  Explore Campus Facility
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSpotlight;
