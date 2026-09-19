import React, { useRef } from 'react';
import { ArrowUpRight, Award, ShieldCheck, Heart } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '../lib/useReducedMotion';

interface FounderSpotlightProps {
  onOpenAppointment: () => void;
}

export const FounderSpotlight: React.FC<FounderSpotlightProps> = ({ onOpenAppointment }) => {
  const isReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Responsive spring for 60-90 FPS buttery feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  // Card starts at 0.82 scale and grows to 1.0 (full bleed)
  const scale = useTransform(
    isReduced ? scrollYProgress : smoothProgress,
    [0, 0.45],
    [0.82, 1]
  );

  // Border radius collapses from 28px → 0 as it fills the screen
  const borderRadius = useTransform(
    isReduced ? scrollYProgress : smoothProgress,
    [0, 0.45],
    [28, 0]
  );

  // Content fades in as the card expands
  const contentOpacity = useTransform(
    isReduced ? scrollYProgress : smoothProgress,
    [0, 0.25],
    [0.6, 1]
  );

  const contentY = useTransform(
    isReduced ? scrollYProgress : smoothProgress,
    [0, 0.25],
    [20, 0]
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      data-stack="out"
      className="relative z-20 w-full bg-[#F5F3EF] border-t border-slate-200 py-24 sm:py-36"
    >
      {/* Ambient blobs on the light bg */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#1C3460]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#DC2626]/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/4" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label — fades in normally */}
        <div
          data-reveal="up"
          className="flex items-center gap-2 text-xs font-label tracking-widest text-slate-500 uppercase mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-[#DC2626]" aria-hidden="true" />
          <span>06 / FOUNDER &amp; VISION</span>
        </div>

        {/*
         * The dark card — this is the element that scales outward toward the viewer.
         * It starts at 82% size (scaleX/scaleY via scale) with rounded corners,
         * and as the user scrolls, it grows to 100% and corners flatten to 0.
         */}
        <motion.div
          style={isReduced ? {} : { scale, borderRadius }}
          className="relative bg-[#1C1C1E] text-white overflow-hidden shadow-2xl gpu-layer"
        >
          {/* Card inner ambient glow */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#1C3460]/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#DC2626]/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

          {/* All content fades in as card expands */}
          <motion.div
            style={isReduced ? {} : { opacity: contentOpacity, y: contentY }}
            className="relative z-10 p-8 sm:p-12 lg:p-16 space-y-10"
          >
            {/* Top: Photo + Headline */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
              {/* Circular headshot */}
              <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-4 ring-[#1C3460]/60 shadow-xl bg-slate-700">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=85&w=600"
                    alt="Dr. Imran Islam, Founder & Medical Director"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span
                  className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#374151] flex items-center justify-center border border-white/10"
                  title="Active Chief of Surgery"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" aria-hidden="true" />
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-white/10 text-xs font-label tracking-widest text-slate-300 uppercase border border-white/10">
                    LEADERSHIP &amp; VISION
                  </span>
                  <span className="text-xs text-slate-400 font-label hidden sm:inline-block">
                    FOUNDER &amp; MEDICAL DIRECTOR
                  </span>
                </div>
                <h2 className="font-anton text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white leading-[0.92]">
                  HEY — I&apos;M DR. IMRAN ISLAM
                </h2>
              </div>
            </div>

            {/* Bottom: Two-column body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/10">
              {/* Left: Role */}
              <div className="md:col-span-4 space-y-3">
                <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#1C3460]/30 text-slate-300 text-xs font-label font-medium uppercase tracking-wider border border-[#1C3460]/40">
                  FOUNDER &amp; CHIEF SURGEON
                </div>
                <div className="text-sm font-sans font-medium text-white">
                  Islam Medical Complex • Islamabad
                </div>
                <p className="text-xs font-sans text-slate-400 leading-relaxed">
                  Dedicated to pioneering robotic precision while protecting the warmth of bedside care.
                </p>
              </div>

              {/* Right: Bio + credentials + CTAs */}
              <div className="md:col-span-8 space-y-6">
                <p className="font-sans text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
                  &ldquo;Islam Medical Complex was founded on a simple belief: world-class clinical precision
                  and genuine human warmth aren&apos;t a trade-off. Every space here — from our sub-millimeter
                  robotic theaters to light-filled circadian recovery suites — is designed around patient
                  dignity, safety, and tranquil restoration.&rdquo;
                </p>

                {/* Credentials row */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#93B4D4]" aria-hidden="true" />
                    <span>Consultant Surgical Leadership</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-slate-400" aria-hidden="true" />
                    <span>Evidence-Based Clinical Standards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#DC2626]" aria-hidden="true" />
                    <span>Patient-Centered Bedside Care</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={onOpenAppointment}
                    className="px-6 py-3 rounded-full bg-[#1C3460] hover:bg-[#152A52] active:scale-95 text-white font-medium text-xs sm:text-sm uppercase tracking-wider transition-[background-color,transform] duration-150 shadow-[0_2px_12px_rgba(28,52,96,0.30)] flex items-center gap-2 cursor-pointer"
                  >
                    <span>Schedule Consultation</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <a
                    href="#facilities"
                    className="px-5 py-3 rounded-full border border-white/20 hover:bg-white/10 active:scale-95 text-white text-xs sm:text-sm font-medium uppercase tracking-wider transition-[background-color,border-color,transform] duration-150 cursor-pointer"
                  >
                    Explore Campus Facility
                  </a>
                </div>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSpotlight;

