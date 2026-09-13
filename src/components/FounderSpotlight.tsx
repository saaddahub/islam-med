import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Award, ShieldCheck, Heart } from 'lucide-react';
import { gsap, ScrollTrigger } from '../lib/useScrollTrigger';
import { useReducedMotion } from '../lib/useReducedMotion';

interface FounderSpotlightProps {
  onOpenAppointment: () => void;
}

export const FounderSpotlight: React.FC<FounderSpotlightProps> = ({ onOpenAppointment }) => {
  const isReduced = useReducedMotion();
  const wrapperRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const box = boxRef.current;
    const content = contentRef.current;
    if (!wrapper || !box || !content) return;

    // Reduced motion: full size + full opacity immediately, no animation
    if (isReduced) {
      gsap.set(box, { scaleX: 1, scaleY: 1 });
      gsap.set(content, { opacity: 1 });
      return;
    }

    const activeTriggers: ScrollTrigger[] = [];

    if (window.innerWidth >= 768) {
      // ── Desktop: scroll-scrubbed scale-from-center + pin ──────────────────
      // scaleX starts wider than scaleY (0.5 vs 0.45) to match the spec's
      // "box starts slightly wider than it is tall relative to its final size"
      const boxTween = gsap.fromTo(
        box,
        { scaleX: 0.5, scaleY: 0.45 },
        {
          scaleX: 1,
          scaleY: 1,
          ease: 'none',      // scrub provides all easing feel — no curve on top
          scrollTrigger: {
            trigger: wrapper,
            start: 'top bottom',  // begins as section enters viewport from below
            end: 'top 20%',       // fully expanded before section top hits 20%
            scrub: 1,
            pin: true,            // section holds while box grows
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // Content fades in only once box is mostly expanded (start at 55%, end at 20%)
      const contentTween = gsap.fromTo(
        content,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 55%',
            end: 'top 20%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      if (boxTween.scrollTrigger) activeTriggers.push(boxTween.scrollTrigger);
      if (contentTween.scrollTrigger) activeTriggers.push(contentTween.scrollTrigger);
    } else {
      // ── Mobile: static box at full size, simple content slide-up ──────────
      gsap.set(box, { scaleX: 1, scaleY: 1, clearProps: 'transform' });

      const mobileTween = gsap.fromTo(
        content,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 85%',
          },
        }
      );
      if (mobileTween.scrollTrigger) activeTriggers.push(mobileTween.scrollTrigger);
    }

    // Give ScrollTrigger one tick to measure layout after mount
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(refreshTimer);
      activeTriggers.forEach((st) => st.kill());
    };
  }, [isReduced]);

  return (
    /*
     * height: 100vh + overflow: hidden set as INLINE STYLES intentionally.
     * This keeps them scoped to this element only — no global CSS class collision.
     * The absolute-positioned box inside resolves its height against this
     * explicit 100vh (percentage heights need an explicit parent height, not
     * just min-height, to resolve correctly).
     */
    <section
      id="about"
      ref={wrapperRef}
      className="relative z-20 w-full border-t border-white/10"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      {/*
       * The reveal box: position: absolute; inset: 0 fills the section's
       * explicit 100vh height exactly.
       * transform-origin: center center is the critical property — scaleX/scaleY
       * expand outward from the center in both axes simultaneously.
       * overflow: hidden on the parent clips the box edges cleanly while
       * scaleX/scaleY are below 1.
       */}
      <div ref={boxRef} className="founder-reveal-box">

        {/* Subtle Background Glow Accent — unchanged */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />

        {/*
         * All founder content is UNCHANGED — only the entrance animation wrapping
         * was added above. Text, photo, bio, credentials, buttons: verbatim.
         */}
        <div ref={contentRef} className="founder-content relative z-10">
          <div className="max-w-5xl mx-auto space-y-12">

            {/* Top Two-Part Header: Circular Photo + Large Condensed Headline */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
              {/* Circular Headshot */}
              <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden ring-4 ring-[#2563EB]/40 shadow-2xl bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=85&w=600"
                    alt="Dr. Tariq Islam, Founder & Medical Director"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Online / Active Chief Status Badge */}
                <span
                  className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#05091A] flex items-center justify-center border border-white/20"
                  title="Active Chief of Surgery"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" aria-hidden="true" />
                </span>
              </div>

              {/* Headline and Tag Pill */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-white/10 text-xs font-mono tracking-widest text-[#93C5FD] uppercase border border-white/10">
                    LEADERSHIP &amp; VISION
                  </span>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
                    FOUNDER &amp; MEDICAL DIRECTOR
                  </span>
                </div>

                <h2 className="font-anton text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white leading-[0.92]">
                  HEY — I&apos;M DR. TARIQ ISLAM
                </h2>
              </div>
            </div>

            {/* Lower Two-Column Body: Bio Copy + Credentials & CTA */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/10">
              {/* Left Column: Role & Mission Statement */}
              <div className="md:col-span-4 space-y-3">
                <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#2563EB]/20 text-[#93C5FD] text-xs font-mono font-medium uppercase tracking-wider border border-[#2563EB]/30">
                  FOUNDER &amp; CHIEF SURGEON
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
                    <ShieldCheck className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
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
                    className="px-6 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95 text-white font-medium text-xs sm:text-sm uppercase tracking-wider transition-[background-color,transform] duration-150 shadow-[0_2px_12px_rgba(37,99,235,0.25)] flex items-center gap-2 cursor-pointer"
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

          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSpotlight;
