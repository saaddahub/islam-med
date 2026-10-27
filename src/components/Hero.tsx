import { useContent } from '../content/context';
import { ArrowUpRight, ArrowDown, ShieldCheck, Clock, ChevronRight } from 'lucide-react';
import SquiggleUnderline from './SquiggleUnderline';
import HeroSculpture from './HeroSculpture';

export default function Hero({ onOpenAppointment }: { onOpenAppointment: () => void }) {
  const content = useContent();
  const copy = content.copy.Hero;
  return (
    <section id="hero" data-custom-headline={copy.text_1.length > 20 || copy.text_2.length > 12 || copy.text_3.length > 20} className="hero-cinema relative min-h-[100dvh] w-full flex flex-col justify-between bg-imc-paper pt-28 pb-12 sm:pt-32 sm:pb-16">
      <div className="hero-visual">
        <div className="hero-mobile-wing" aria-hidden="true"><img src={copy.photograph_1} srcSet={copy.photograph_1 === "/images/imc-corridor-restored.webp" ? "/images/imc-corridor-640.webp 640w, /images/imc-corridor-restored.webp 1086w" : undefined} sizes="(max-width: 1023px) 44vw, 1px" alt="" width={1086} height={1448} loading="lazy" decoding="async" /></div>
        <div className="hero-mobile-wing hero-mobile-wing-right" aria-hidden="true"><img src={copy.photograph_2} alt="" width={764} height={1024} loading="lazy" decoding="async" /></div>
        <div className="hero-still" aria-hidden="true">
          <picture className="hero-photo-picture">
            <img src={copy.photograph_3} srcSet={copy.photograph_3 === "/images/imc-pharmacy-1800.webp" ? "/images/imc-pharmacy-800.webp 800w, /images/imc-pharmacy-1280.webp 1280w, /images/imc-pharmacy-1800.webp 1800w, /images/imc-pharmacy-2336.webp 2336w" : undefined} sizes="(max-width: 1023px) 92vw, 50vw" alt="" fetchPriority="high" decoding="async" width={2336} height={1744} />
          </picture>
        </div>
        <HeroSculpture />
      </div>
      {/* Main Content Area */}
      <div className="hero-copy relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="hero-copy-inner max-w-2xl space-y-6">

          {/* Headline in Display Serif with Squiggle */}
          <h1 className="hero-headline font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-imc-ink leading-[1.02]">
            <span data-hero-line className="hero-line">{copy.text_1}</span>{' '}
            <span data-hero-line className="hero-line relative inline-block italic font-normal text-imc-ink">
              {copy.text_2}<SquiggleUnderline color="var(--color-imc-blue-soft)" className="w-full" />
            </span>{' '}
            <span data-hero-line className="hero-line">{copy.text_3}</span>
          </h1>

          {/* Subcopy in Inter */}
          <p data-hero-support className="font-sans text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed font-normal">
            <span className="hero-desktop-description">{copy.text_4}</span>
            <span className="hero-mobile-description">{copy.text_5}</span>
          </p>

          {/* Action CTAs */}
          <div data-hero-support className="hero-actions space-y-3 pt-2">
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-imc-blue text-white font-medium text-sm sm:text-base tracking-tight hover:bg-imc-blue-hover active:scale-95 transition-[background-color,transform] duration-150 group cursor-pointer"
              >
                <span>{copy.text_6}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </button>

              <a
                href="#departments"
                className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-imc-paper text-imc-ink font-medium text-sm sm:text-base border border-slate-200 hover:bg-white hover:border-slate-300 active:scale-95 transition-[background-color,border-color,transform] duration-150 cursor-pointer"
              >
                <span className="hero-desktop-description">{copy.text_7}</span><span className="hero-mobile-description">{copy.text_8}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
              </a>
            </div>

          </div>

          {/* Authentic hospital services indicators */}
          <div data-hero-support className="hero-service-indicators pt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-600 border-t border-slate-300/70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-imc-blue" aria-hidden="true" />
              <span className="font-medium">{copy.text_9}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-imc-blue" aria-hidden="true" />
              <span className="font-medium">{copy.text_10}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" aria-hidden="true" />
              <span className="font-medium">{copy.text_11}</span>
            </div>
          </div>

        </div>
      </div>

      <div className="hero-mobile-assurance"><ShieldCheck size={15} aria-hidden="true" /><span>{copy.text_12}</span><ArrowDown size={15} aria-hidden="true" /></div>

      <div className="hero-scene-caption" aria-hidden="true">
        <span>{copy.text_13}</span><span>{copy.text_14}</span>
      </div>
      <div className="hero-scroll-note" aria-hidden="true">
        <span>{copy.text_15}</span>
        <span>{copy.text_16}<ArrowDown className="w-4 h-4" /></span>
      </div>
    </section>
  );
}
