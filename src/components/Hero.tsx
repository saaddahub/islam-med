import React, { useState } from 'react';
import { ArrowUpRight, ShieldCheck, Star, Clock, ChevronRight } from 'lucide-react';
import SquiggleUnderline from './SquiggleUnderline';
import { motion, AnimatePresence } from 'framer-motion';
import { EASINGS } from '../lib/useScrollTrigger';

interface HeroProps {
  onOpenAppointment: () => void;
}

interface HeroSlide {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "lobby",
    title: "Central Atrium & Lobby",
    category: "01. Architecture",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=85&w=2000",
    caption: "Biophilic architectural spaces filled with natural light and clean acoustic design.",
  },
  {
    id: "staff",
    title: "Multidisciplinary Surgical Team",
    category: "02. Clinical Staff",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=85&w=2000",
    caption: "Board-certified consultants delivering synchronized interventional care.",
  },
  {
    id: "suite",
    title: "Private Inpatient Recovery Suite",
    category: "03. Patient Suites",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=85&w=2000",
    caption: "Circadian-lit private rooms engineered for uninterrupted restorative rest.",
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenAppointment }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = HERO_SLIDES[activeSlideIndex];

  return (
    <section id="hero" className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#F5F0E8] pt-28 pb-12 sm:pt-32 sm:pb-16">
      {/* Background Image Layer with Framer Motion AnimatePresence smooth crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASINGS.easeInOutSoft }}
            className="absolute inset-0"
          >
            <img
              src={activeSlide.image}
              alt=""
              className="w-full h-full object-cover object-center filter brightness-[0.94] contrast-[1.02]"
            />
            {/* Subtle editorial gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0E8]/95 via-[#F5F0E8]/75 to-transparent sm:w-2/3" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E8] via-transparent to-black/15" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#DC2626]" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#1C1C1E] font-sans">
              Islam Medical Complex • Islamabad
            </span>
          </div>

          {/* Headline in Freight Text / Display Serif */}
          <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#1C1C1E] leading-[0.95]">
            Care that feels{' '}
            <span className="relative inline-block italic font-normal text-[#1C1C1E]">
              closer
              <SquiggleUnderline color="#DC2626" className="w-full" />
            </span>{' '}
            than you think.
          </h1>

          {/* Subcopy in Inter */}
          <p className="font-sans text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed font-normal">
            Islam Medical Complex harmonizes sub-millimeter surgical robotics with calm, 
            thoughtfully designed healing suites. A boutique hospital where high technology 
            meets human warmth.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenAppointment}
              className="flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-[#1DBF8A] text-white font-medium text-sm sm:text-base tracking-tight hover:bg-[#0EA571] active:scale-95 transition-[background-color,transform] duration-150 shadow-[0_4px_16px_rgba(29,191,138,0.25)] group cursor-pointer"
            >
              <span>Schedule Consultation</span>
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

          {/* Quick clinical trust indicators */}
          <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-slate-600 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1DBF8A]" aria-hidden="true" />
              <span className="font-medium">Joint Commission Gold Accredited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1" aria-label="5 star rating">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#1DBF8A] text-[#1DBF8A]" aria-hidden="true" />
                ))}
              </div>
              <span className="font-medium">4.98/5.0 Patient Quality Index</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#DC2626]" aria-hidden="true" />
              <span className="font-medium">24/7 Level-1 Trauma & Acute Stroke Bay</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Row: Active Caption on Left + 3-Thumbnail Strip on Bottom-Right */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6 flex flex-col sm:flex-row items-end justify-between gap-4">
        
        {/* Active image caption tag */}
        <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 text-xs text-slate-700 shadow-xs">
          <span className="font-mono text-[#1DBF8A] font-bold">{activeSlide.category}</span>
          <span className="text-slate-300" aria-hidden="true">•</span>
          <span className="font-medium">{activeSlide.title}</span>
        </div>

        {/* Bottom-Right Thumbnail Carousel Strip */}
        <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-md">
          <div className="flex items-center gap-2.5">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                type="button"
                key={slide.id}
                onClick={() => setActiveSlideIndex(idx)}
                className={`group relative w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden transition-[transform,opacity,box-shadow] duration-200 cursor-pointer active:scale-95 ${
                  idx === activeSlideIndex
                    ? 'ring-2 ring-[#1DBF8A] scale-105 shadow-sm'
                    : 'opacity-75 hover:opacity-100'
                }`}
                title={slide.title}
                aria-label={`Switch hero photo to ${slide.title}`}
              >
                <img
                  src={slide.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors ${
                    idx === activeSlideIndex ? 'bg-transparent' : ''
                  }`}
                />
                <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/60 text-[9px] font-mono text-white">
                  0{idx + 1}
                </div>
              </button>
            ))}
          </div>
          
          <div className="hidden md:flex flex-col text-[11px] text-slate-500 pl-1 pr-2">
            <span className="font-semibold text-slate-800">Preview Gallery</span>
            <span>Select space</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
