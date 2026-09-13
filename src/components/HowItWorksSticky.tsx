import React from 'react';
import { PROCESS_STEPS } from '../data/processSteps';
import { ArrowUpRight, CheckCircle2, UserCheck, CalendarDays, HeartPulse, MessageSquareQuote, Sparkles } from 'lucide-react';
import SquiggleUnderline from './SquiggleUnderline';
import { motion } from 'framer-motion';
import { EASINGS } from '../lib/useScrollTrigger';

interface HowItWorksStickyProps {
  onOpenAppointment: () => void;
}

export const HowItWorksSticky: React.FC<HowItWorksStickyProps> = ({ onOpenAppointment }) => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <UserCheck className="w-5 h-5 text-[#2563EB]" aria-hidden="true" />;
      case 1:
        return <CalendarDays className="w-5 h-5 text-[#DC2626]" aria-hidden="true" />;
      case 2:
        return <HeartPulse className="w-5 h-5 text-[#2563EB]" aria-hidden="true" />;
      case 3:
      default:
        return <MessageSquareQuote className="w-5 h-5 text-[#DC2626]" aria-hidden="true" />;
    }
  };

  return (
    <section id="how-it-works" className="relative z-20 w-full bg-[#F0F4FA] text-[#1C1C1E] py-24 sm:py-32 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two Column Layout: Left Column Sticky, Right Column Scrolling Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Sticky / Pinned via CSS sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            
            {/* Eyebrow Label in Inter uppercase */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
              <span>06 / SIMPLE SCHEDULING</span>
            </div>

            {/* Headline in Display Serif with Squiggle */}
            <h2 className="font-serif-display text-5xl sm:text-6xl md:text-7xl text-[#1C1C1E] leading-[0.95]">
              How it{' '}
              <span className="relative inline-block italic font-normal text-[#1C1C1E]">
                works
                <SquiggleUnderline color="#DC2626" className="w-full" />
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              A frictionless patient journey built from zero-wait arrivals to 
              post-consultation digital physician connectivity.
            </p>

            {/* Persistent CTA block (pill button + circular arrow icon) */}
            <div className="p-6 rounded-3xl bg-[#05091A] text-white space-y-4 border border-white/10">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#93C5FD] uppercase tracking-wider">
                  RAPID APPOINTMENT ACCESS
                </span>
                <div className="font-anton text-xl uppercase tracking-tight text-white">
                  Ready for personalized attention?
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="flex-1 py-3 px-5 rounded-full bg-[#2563EB] text-white font-medium text-xs uppercase tracking-wider hover:bg-[#1D4ED8] active:scale-95 transition-[background-color,transform] duration-150 flex items-center justify-center gap-2 shadow-[0_2px_12px_rgba(37,99,235,0.25)] cursor-pointer"
                >
                  <span>Book Visit Now</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white hover:text-[#05091A] active:scale-90 transition-[background-color,color,transform] duration-150 shrink-0 cursor-pointer"
                  title="Direct Consultation"
                  aria-label="Direct Consultation"
                >
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Stack of Full-Color Pastel Blocks */}
          <div className="lg:col-span-7 space-y-6">
            {PROCESS_STEPS.map((step, idx) => {
              const isBlue = step.bgVariant === 'lavender';

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, ease: EASINGS.easeOutExpo }}
                  className={`relative p-8 sm:p-10 rounded-[2rem] border transition-shadow duration-200 hover:shadow-md ${
                    isBlue
                      ? 'bg-gradient-to-br from-[#F0F5FA] to-[#E2ECF7] border-[#CEE0F2]'
                      : 'bg-gradient-to-br from-[#FAF5EE] to-[#F3EBE0] border-[#E5DACB]'
                  }`}
                >
                  {/* Top-Right Line Icon & Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1C1C1E] border border-black/5 shadow-xs">
                      Step {step.step}
                    </span>

                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-md border border-black/5 shadow-xs">
                      {getStepIcon(idx)}
                    </div>
                  </div>

                  {/* Headline & Description */}
                  <div className="space-y-3">
                    <h3 className="font-anton text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#1C1C1E]">
                      {step.title}
                    </h3>
                    
                    <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Highlight pill at bottom */}
                  <div className="mt-6 pt-4 border-t border-black/10 flex items-center gap-2 text-xs font-sans text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" aria-hidden="true" />
                    <span>{step.highlight}</span>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorksSticky;
