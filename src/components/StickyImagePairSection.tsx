import StickyImagePair from './StickyImagePair';
import SquiggleUnderline from './SquiggleUnderline';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMediaQuery } from '../lib/useMediaQuery';
import { useReducedMotion } from '../lib/useReducedMotion';

export function StickyImagePairSection() {
  const compact = useMediaQuery('(max-width: 1023px)');
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const track = trackRef.current;
    if (!compact || !track) return;
    const slides = Array.from(track.children);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.intersectionRatio >= .65) setActive(slides.indexOf(entry.target)); });
    }, { root: track, threshold: .65 });
    slides.forEach(slide => observer.observe(slide));
    return () => observer.disconnect();
  }, [compact]);
  const move = (direction: number) => {
    const track = trackRef.current;
    const next = track?.children[active + direction] as HTMLElement | undefined;
    if (track && next) track.scrollTo({ left: next.offsetLeft - (track.children[0] as HTMLElement).offsetLeft, behavior: reduced ? 'instant' : 'smooth' });
  };
  return (
    <section
      id="spaces-exhibit"
      data-stack="out"
      className="relative z-20 w-full bg-imc-paper text-imc-ink py-24 sm:py-32 border-t border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8 mb-16 sm:mb-24">
          <div className="space-y-4 max-w-2xl">

            <h2 data-reveal="mask" className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-imc-ink leading-[1.05]">
              A physical environment built for{' '}
              <span className="relative inline-block italic font-normal text-imc-ink">
                clarity
                <SquiggleUnderline color="var(--color-imc-blue-soft)" className="w-full" />
              </span>{' '}
              and ease.
            </h2>
          </div>

          <p data-reveal="up" className="font-sans text-sm sm:text-base text-slate-600 max-w-md">
            A closer look at reception, clinical care and patient comfort. Healthcare photography in this section is illustrative.
          </p>
        </div>

        {/* Sticky Image-Pair Sequence with alternating reverse */}
        <div ref={trackRef} className="spaces-gallery-track space-y-24 sm:space-y-32" tabIndex={compact ? 0 : undefined} role={compact ? 'region' : undefined} aria-label={compact ? 'Medical complex photo gallery' : undefined}>

          {/* Pair 1: Caption LEFT, Image RIGHT */}
          <StickyImagePair
            heading="01 / Reception & Wayfinding"
            image="/directory-corridor.jpg"
            caption={{
              thumbnail: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=600",
              label: "A Clear Start to Your Visit",
              description: "Reception staff provide clinic information and help patients reach the appropriate medical or surgical service.",
            }}
            reverse={false}
          />

          {/* Pair 2: Image LEFT, Caption RIGHT */}
          <StickyImagePair
            heading="02 / Women’s Health"
            image="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1400"
            caption={{
              thumbnail: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600",
              label: "Gynecological & Obstetric Care",
              description: "Pregnancy care, delivery services, gynecological procedures and minimally invasive laparoscopic surgery.",
            }}
            reverse={true}
          />

          {/* Pair 3: Caption LEFT, Image RIGHT */}
          <StickyImagePair
            heading="03 / Clinical Care"
            image="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1400"
            caption={{
              thumbnail: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600",
              label: "Assessment & Treatment",
              description: "Outpatient and internal medicine consultations support assessment, treatment and referral, with laboratory testing when required.",
            }}
            reverse={false}
          />

          {/* Pair 4: Image LEFT, Caption RIGHT */}
          <StickyImagePair
            heading="04 / Patient Comfort"
            image="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1400"
            caption={{
              thumbnail: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
              label: "Personal Attention & Dignity",
              description: "Privacy, clear communication, cleanliness and comfort are central to your visit.",
            }}
            reverse={true}
          />

        </div>
        <div className="spaces-gallery-controls">
          <span>Swipe to explore</span><span>{String(active + 1).padStart(2, '0')} / 04</span>
          <div><button type="button" onClick={() => move(-1)} disabled={active === 0} aria-label="Previous photograph"><ChevronLeft size={18} /></button><button type="button" onClick={() => move(1)} disabled={active === 3} aria-label="Next photograph"><ChevronRight size={18} /></button></div>
        </div>

      </div>
    </section>
  );
};

export default StickyImagePairSection;

