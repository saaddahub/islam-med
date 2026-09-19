import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUpRight, ShieldCheck, Clock, ChevronRight } from 'lucide-react';
import SquiggleUnderline from './SquiggleUnderline';
import { motion, AnimatePresence } from 'framer-motion';
import { EASINGS } from '../lib/useScrollTrigger';

interface HeroProps {
  onOpenAppointment: () => void;
}

export interface HeroSlide {
  id: string;
  title: string;
  category: string;
  src: string;
  thumbnail: string;
  caption: string;
  duration?: number; // duration in seconds
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "directory",
    title: "Hospital Navigation & Departments",
    category: "01. Complex Directory",
    src: "/directory-corridor.jpg",
    thumbnail: "/directory-corridor.jpg",
    caption: "Direct multi-floor access to operating theaters, labour rooms, emergency bays, and consultant suites.",
    duration: 6,
  },
  {
    id: "pharmacy",
    title: "24/7 In-House Pharmacy & Lab",
    category: "02. Pharmacy & Diagnostics",
    src: "/pharmacy.png",
    thumbnail: "/pharmacy.png",
    caption: "Fully stocked 24/7 medicine dispensary and certified TestZone diagnostic laboratory.",
    duration: 6,
  },
  {
    id: "staff",
    title: "Multidisciplinary Surgical Team",
    category: "03. Clinical Staff",
    src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=85&w=2000",
    thumbnail: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=85&w=2000",
    caption: "Board-certified consultants delivering synchronized interventional and surgical care.",
    duration: 6,
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenAppointment }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = HERO_SLIDES[activeSlideIndex];

  const handleNextSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  // Automatic slideshow timing
  useEffect(() => {
    const current = HERO_SLIDES[activeSlideIndex];
    const duration = (current.duration || 6) * 1000;
    const timer = setTimeout(() => {
      handleNextSlide();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [activeSlideIndex, handleNextSlide]);

  return (
    <section id="hero" data-stack="out" className="relative min-h-[100dvh] w-full flex flex-col justify-between bg-[#F5F3EF] pt-28 pb-12 sm:pt-32 sm:pb-16">
      {/* Background Slideshow Layer positioned on the right half */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[56%] h-full overflow-hidden">
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
                initial={{ scale: 1.03 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: 'easeOut' }}
                className="w-full h-full object-cover object-[center_12%] filter brightness-[0.97] contrast-[1.02]"
                aria-hidden="true"
              />

              {/* Seamless feathering gradient for desktop */}
              <div className="hidden lg:block absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#F5F3EF] via-[#F5F3EF]/60 to-transparent" />
              {/* Mobile overlay to ensure text readability */}
              <div className="lg:hidden absolute inset-0 bg-gradient-to-r from-[#F5F3EF]/95 via-[#F5F3EF]/85 to-[#F5F3EF]/40" />
              {/* Top & bottom blending */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#F5F3EF]/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F5F3EF] to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          
          {/* Eyebrow badge */}
          <div data-intro style={{"--i": 0} as React.CSSProperties} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#DC2626]" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#1C1C1E] font-sans">
              Islam Medical Complex • Islamabad
            </span>
          </div>

          {/* Headline in Display Serif with Squiggle */}
          <h1 data-intro style={{"--i": 1} as React.CSSProperties} className="font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1C1C1E] leading-[0.95]">
            Care that feels{' '}
            <span className="relative inline-block italic font-normal text-[#1C1C1E]">
              closer
              <SquiggleUnderline color="#DC2626" className="w-full" />
            </span>{' '}
            than you think.
          </h1>

          {/* Subcopy in Inter */}
          <p data-intro style={{"--i": 2} as React.CSSProperties} className="font-sans text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed font-normal">
            Islam Medical Complex harmonizes sub-millimeter surgical robotics with calm, 
            thoughtfully designed healing suites. A boutique hospital where high technology 
            meets human warmth.
          </p>

          {/* Action CTAs */}
          <div data-intro style={{"--i": 3} as React.CSSProperties} className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-[#1C3460] text-white font-medium text-sm sm:text-base tracking-tight hover:bg-[#152A52] active:scale-95 transition-[background-color,transform] duration-150 shadow-[0_4px_16px_rgba(28,52,96,0.20)] group cursor-pointer"
              >
                <span>Book Appointment</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </button>

              <a
                href="#departments"
                className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/90 backdrop-blur-md text-[#1C1C1E] font-medium text-sm sm:text-base border border-slate-200 hover:bg-white hover:border-slate-300 active:scale-95 transition-[background-color,border-color,transform] duration-150 cursor-pointer shadow-xs"
              >
                <span>Explore Departments</span>
                <ChevronRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
              </a>
            </div>


          </div>

          {/* Authentic hospital services indicators */}
          <div data-intro style={{"--i": 4} as React.CSSProperties} className="pt-6 flex flex-wrap items-center gap-6 text-xs text-slate-600 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1C3460]" aria-hidden="true" />
              <span className="font-medium">24/7 Emergency &amp; Trauma Care</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#1C3460]" aria-hidden="true" />
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6 flex flex-col sm:flex-row items-end justify-between gap-4">
        
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
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`group relative w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden transition-[transform,opacity,box-shadow] duration-200 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'ring-2 ring-[#1C3460] scale-105 shadow-sm opacity-100'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  title={slide.title}
                  aria-label={`Switch hero slide to ${slide.title}`}
                >
                  <img
                    src={slide.thumbnail}
                    alt=""
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
                  {isActive && (
                    <motion.div
                      key={`progress-${slide.id}-${activeSlideIndex}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: slide.duration || 6,
                        ease: 'linear',
                      }}
                      style={{ originX: 0 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1C3460]"
                    />
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="hidden md:flex flex-col text-[11px] text-slate-500 pl-1 pr-2">
            <span className="font-semibold text-slate-800">Slideshow</span>
            <span className="text-[10px] text-slate-500">Auto-cycling</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;


