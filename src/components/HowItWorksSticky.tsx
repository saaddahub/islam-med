import React from 'react';
import { PROCESS_STEPS } from '../data/processSteps';
import { ArrowUpRight, CheckCircle2, UserCheck, CalendarDays, HeartPulse, MessageSquareQuote, Sparkles } from 'lucide-react';
import SquiggleUnderline from './SquiggleUnderline';

interface HowItWorksStickyProps {
  onOpenAppointment: () => void;
}

export const HowItWorksSticky: React.FC<HowItWorksStickyProps> = ({ onOpenAppointment }) => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <UserCheck className="w-5 h-5 text-forest" aria-hidden="true" />;
      case 1:
        return <CalendarDays className="w-5 h-5 text-bronze" aria-hidden="true" />;
      case 2:
        return <HeartPulse className="w-5 h-5 text-forest" aria-hidden="true" />;
      case 3:
      default:
        return <MessageSquareQuote className="w-5 h-5 text-bronze" aria-hidden="true" />;
    }
  };

  return (
    <section id="how-it-works" data-stack="in" className="relative z-20 w-full bg-cream text-ink py-24 sm:py-32 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two Column Layout: Left Column Sticky, Right Column Scrolling Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Sticky / Pinned via CSS sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            
            {/* Eyebrow Label in Inter uppercase */}
            <div data-reveal="up" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-semibold uppercase tracking-wider text-ink backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-forest" aria-hidden="true" />
              <span>06 / SIMPLE SCHEDULING</span>
            </div>

            <h2 data-reveal="mask" className="font-serif-display text-5xl sm:text-6xl md:text-7xl text-ink leading-[0.95]">
              How it{' '}
              <span className="relative inline-block italic font-normal text-ink">
                works
                <SquiggleUnderline color="var(--color-bronze)" className="w-full" />
              </span>
            </h2>

            <p data-reveal="up" className="font-sans text-base sm:text-lg text-muted leading-relaxed font-normal">
              A frictionless patient journey built from zero-wait arrivals to 
              post-consultation digital physician connectivity.
            </p>

            {/* Persistent CTA block (pill button + circular arrow icon) */}
            <div className="p-6 rounded-3xl bg-forest text-white space-y-4 border border-white/10">
              <div className="space-y-1">
                <span className="text-[11px] font-label text-oat uppercase tracking-wider">
                  RAPID APPOINTMENT ACCESS
                </span>
                <div className="font-display text-xl tracking-tight text-white">
                  Ready for personalized attention?
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenAppointment}
                className="w-full py-3 px-5 rounded-full bg-forest text-white font-medium text-xs uppercase tracking-wider hover:bg-forest-hover active:scale-95 transition-[background-color,transform] duration-150 flex items-center justify-center gap-2 shadow-[0_2px_12px_rgba(48,60,53,0.20)] cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                <span>Book Visit Now</span>
              </button>
            </div>

          </div>

          {/* Right Column: Stack of Full-Color Pastel Blocks */}
          <div data-stagger className="lg:col-span-7 space-y-6">
            {PROCESS_STEPS.map((step, idx) => {
              const isBlue = step.bgVariant === 'lavender';

              return (
                <div
                  data-reveal="up"
                  key={step.step}
                  className={`relative p-8 sm:p-10 rounded-[2rem] border transition-shadow duration-200 hover:shadow-md ${
                    isBlue
                      ? 'bg-oat border-oat'
                      : 'bg-paper border-oat'
                  }`}
                >
                  {/* Top-Right Line Icon & Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-label text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/25 backdrop-blur-md text-ink border border-black/10">
                      Step {step.step}
                    </span>

                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/25 backdrop-blur-md border border-black/10">
                      {getStepIcon(idx)}
                    </div>
                  </div>

                  {/* Headline & Description */}
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-ink">
                      {step.title}
                    </h3>
                    
                    <p className="font-sans text-sm sm:text-base text-muted leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Highlight pill at bottom */}
                  <div className="mt-6 pt-4 border-t border-black/15 flex items-center gap-2 text-xs font-sans text-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-forest shrink-0" aria-hidden="true" />
                    <span>{step.highlight}</span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorksSticky;

