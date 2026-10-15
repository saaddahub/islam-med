import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDown, ShieldCheck, Clock, ChevronRight, Pause, Play } from 'lucide-react';
import SquiggleUnderline from './SquiggleUnderline';
import { motion, AnimatePresence } from 'framer-motion';
import { EASINGS } from '../lib/useScrollTrigger';
import { useReducedMotion } from '../lib/useReducedMotion';

interface HeroProps {
  onOpenAppointment: () => void;
}

export interface HeroSlide {
  id: string;
  title: string;
  src: string;
  thumbnail: string;
  duration?: number; // duration in seconds
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "directory",
    title: "Hospital Navigation & Departments",
    src: "/directory-corridor.jpg",
    thumbnail: "/directory-corridor.jpg",
    duration: 6,
  },
  {
    id: "pharmacy",
    title: "24/7 In-House Pharmacy & Lab",
    src: "/pharmacy.png",
    thumbnail: "/pharmacy.png",
    duration: 6,
  },
  {
    id: "staff",
    title: "Multidisciplinary Surgical Team",
    src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=85&w=2000",
    thumbnail: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=85&w=2000",
    duration: 6,
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenAppointment }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = HERO_SLIDES[activeSlideIndex];
  const reduced = useReducedMotion();

  // Automatic slideshow timing
  useEffect(() => {
    if (reduced || isPaused) return;
    const duration = (activeSlide.duration || 6) * 1000;
    const timer = setInterval(() => {
      // Keep the photograph steady while the viewer scrubs the cinematic sequence.
      if (Number(document.getElementById('hero')?.dataset.sceneProgress || 0) > 0.01) return;
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, duration);

    return () => {
      clearInterval(timer);
    };
  }, [activeSlide, reduced, isPaused]);

  return (
    <section id="hero" className="hero-cinema relative min-h-[100dvh] w-full flex flex-col justify-between bg-imc-paper pt-28 pb-12 sm:pt-32 sm:pb-16">
      {/* Background Slideshow Layer positioned on the right half */}
      <div className="hero-photo-shell absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <div className="hero-photo-window absolute top-0 right-0 bottom-0 w-full lg:w-[56%] h-full overflow-hidden">
          <div data-hero-photo className="absolute inset-0">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASINGS.easeInOutSoft }}
              className="absolute inset-0"
            >
              <motion.img
                src={activeSlide.src}
                alt=""
                initial={{ scale: reduced ? 1 : 1.03 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: 'easeOut' }}
                className="w-full h-full object-cover object-[center_12%] filter brightness-[0.97] contrast-[1.02]"
                aria-hidden="true"
              />

              <div className="hero-photo-wash absolute inset-0 bg-imc-paper/90 lg:bg-transparent" />
            </motion.div>
          </AnimatePresence>
          </div>
          <div data-hero-shade className="hero-photo-shade absolute inset-0" aria-hidden="true" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="hero-copy relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="hero-copy-inner max-w-2xl space-y-6">

          {/* Headline in Display Serif with Squiggle */}
          <h1 className="hero-headline font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-imc-ink leading-[1.02]">
            <span data-hero-line className="hero-line">Care that feels</span>{' '}
            <span data-hero-line className="hero-line relative inline-block italic font-normal text-imc-ink">
              closer
              <SquiggleUnderline color="var(--color-imc-blue-soft)" className="w-full" />
            </span>{' '}
            <span data-hero-line className="hero-line">than you think.</span>
          </h1>

          {/* Subcopy in Inter */}
          <p data-hero-support className="font-sans text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed font-normal">
            Islam Medical Complex harmonizes sub-millimeter surgical robotics with calm,
            thoughtfully designed healing suites. A boutique hospital where high technology
            meets human warmth.
          </p>

          {/* Action CTAs */}
          <div data-hero-support className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-imc-blue text-white font-medium text-sm sm:text-base tracking-tight hover:bg-imc-blue-hover active:scale-95 transition-[background-color,transform] duration-150 shadow-[0_4px_16px_rgba(28,52,96,0.20)] group cursor-pointer"
              >
                <span>Book Appointment</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </button>

              <a
                href="#departments"
                className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/90 backdrop-blur-md text-imc-ink font-medium text-sm sm:text-base border border-slate-200 hover:bg-white hover:border-slate-300 active:scale-95 transition-[background-color,border-color,transform] duration-150 cursor-pointer shadow-xs"
              >
                <span>Explore Departments</span>
                <ChevronRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
              </a>
            </div>

          </div>

          {/* Authentic hospital services indicators */}
          <div data-hero-support className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-600 border-t border-slate-300/70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-imc-blue" aria-hidden="true" />
              <span className="font-medium">24/7 Emergency &amp; Trauma Care</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-imc-blue" aria-hidden="true" />
              <span className="font-medium">24/7 In-House Pharmacy &amp; Lab</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" aria-hidden="true" />
              <span className="font-medium">Operation Theaters &amp; Private Wards</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Row: Active Caption on Left + Interactive Thumbnail Strip on Bottom-Right */}
      <div data-hero-controls className="hero-controls relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6 flex flex-col sm:flex-row items-end justify-between gap-4">

        {/* Active image caption tag with smooth animated label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 text-xs text-slate-700 shadow-xs"
          >
            <span className="font-medium">{activeSlide.title}</span>
          </motion.div>
        </AnimatePresence>

        {/* Bottom-Right Thumbnail Carousel Strip */}
        <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-md">
          <div className="flex items-center gap-2 sm:gap-2.5">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <button
                  type="button"
                  key={slide.id}
                  onClick={() => { setActiveSlideIndex(idx); setIsPaused(true); }}
                  aria-pressed={isActive}
                  className={`group relative w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden transition-[transform,opacity,box-shadow] duration-200 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'ring-2 ring-imc-blue scale-105 shadow-sm opacity-100'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  title={slide.title}
                  aria-label={`Switch hero slide to ${slide.title}`}
                >
                  <img
                    src={slide.thumbnail}
                    alt=""
                    width={80}
                    height={64}
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Subtle dark tint for non-active thumbnails */}
                  <div
                    className={`absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors ${
                      isActive ? 'bg-transparent' : ''
                    }`}
                  />

                  {/* Slide number tag */}
                  <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/70 text-[9px] font-label text-white">
                    0{idx + 1}
                  </div>

                  {/* Active Slide Progress Line Indicator */}
                  {isActive && !reduced && !isPaused && (
                    <motion.div
                      key={`progress-${slide.id}-${activeSlideIndex}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: slide.duration || 6,
                        ease: 'linear',
                      }}
                      style={{ originX: 0 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-imc-blue"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {!reduced && (
            <button type="button" onClick={() => setIsPaused(paused => !paused)} aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"} className="flex items-center justify-center w-11 h-11 text-imc-blue rounded-full hover:bg-slate-100 transition-colors cursor-pointer">
              {isPaused ? <Play className="w-4 h-4" aria-hidden="true" /> : <Pause className="w-4 h-4" aria-hidden="true" />}
            </button>
          )}
          <div className="hidden md:flex flex-col text-[11px] text-slate-500 pl-1 pr-2">
            <span className="font-semibold text-slate-800">Slideshow</span>
            <span className="text-[10px] text-slate-500">{reduced || isPaused ? 'Manual controls' : 'Auto-cycling'}</span>
          </div>
        </div>

      </div>
      <div className="hero-film-caption cinema-only" aria-hidden="true">
        <span data-hero-finale className="font-serif-display">Closer.</span>
        <span className="cinema-eyebrow">Care that feels closer than you think.</span>
      </div>
      <div className="cinema-hud cinema-only" aria-hidden="true">
        <span>Care, closer</span><span className="cinema-scroll-cue">Scroll to explore <ArrowDown className="cinema-scroll-arrow" /></span>
      </div>
    </section>
  );
};

export default Hero;

