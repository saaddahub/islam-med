import { ArrowUpRight, ArrowDown, ShieldCheck, Clock, ChevronRight } from 'lucide-react';
import SquiggleUnderline from './SquiggleUnderline';
import HeroSculpture from './HeroSculpture';

export default function Hero({ onOpenAppointment }: { onOpenAppointment: () => void }) {
  return (
    <section id="hero" className="hero-cinema relative min-h-[100dvh] w-full flex flex-col justify-between bg-imc-paper pt-28 pb-12 sm:pt-32 sm:pb-16">
      <div className="hero-still" aria-hidden="true">
        <img src="/pharmacy.png" alt="" fetchPriority="high" decoding="async" />
      </div>
      <HeroSculpture />
      {/* Main Content Area */}
      <div className="hero-copy relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="hero-copy-inner max-w-2xl space-y-6">

          {/* Headline in Display Serif with Squiggle */}
          <h1 className="hero-headline font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-imc-ink leading-[1.02]">
            <span data-hero-line className="hero-line">Care that feels</span>{' '}
            <span data-hero-line className="hero-line relative inline-block italic font-normal text-imc-ink">
              Closer
              <SquiggleUnderline color="var(--color-imc-blue-soft)" className="w-full" />
            </span>{' '}
            <span data-hero-line className="hero-line">than you think.</span>
          </h1>

          {/* Subcopy in Inter */}
          <p data-hero-support className="font-sans text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed font-normal">
            Care for women, children and adults in Sabzazar, Lahore. Islam Medical Complex
            brings together maternity and pediatric care, outpatient consultations,
            internal medicine and laboratory testing.
          </p>

          {/* Action CTAs */}
          <div data-hero-support className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-imc-blue text-white font-medium text-sm sm:text-base tracking-tight hover:bg-imc-blue-hover active:scale-95 transition-[background-color,transform] duration-150 group cursor-pointer"
              >
                <span>Book Appointment</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </button>

              <a
                href="#departments"
                className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-imc-paper text-imc-ink font-medium text-sm sm:text-base border border-slate-200 hover:bg-white hover:border-slate-300 active:scale-95 transition-[background-color,border-color,transform] duration-150 cursor-pointer"
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
              <span className="font-medium">24/7 Gynecological Emergency</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-imc-blue" aria-hidden="true" />
              <span className="font-medium">On-site Laboratory Testing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" aria-hidden="true" />
              <span className="font-medium">Outpatient &amp; Inpatient Care</span>
            </div>
          </div>

        </div>
      </div>

      <div className="hero-scene-caption" aria-hidden="true">
        <span>Islam Medical Complex</span><span>Sabzazar, Lahore</span>
      </div>
      <div className="hero-scroll-note" aria-hidden="true">
        <span>Care, brought together.</span>
        <span>Scroll to unfold <ArrowDown className="w-4 h-4" /></span>
      </div>
    </section>
  );
}
