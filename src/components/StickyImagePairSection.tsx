import { useContent } from '../content/context';
import StickyImagePair from './StickyImagePair';
import SquiggleUnderline from './SquiggleUnderline';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMediaQuery } from '../lib/useMediaQuery';
import { useReducedMotion } from '../lib/useReducedMotion';

export function StickyImagePairSection() {
  const content = useContent();
  const copy = content.copy.StickyImagePairSection;
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
              {copy.heading_1}{' '}
              <span className="relative inline-block italic font-normal text-imc-ink">
                {copy.text_1}<SquiggleUnderline color="var(--color-imc-blue-soft)" className="w-full" />
              </span>{' '}
              {copy.heading_2}</h2>
          </div>

          <p data-reveal="up" className="font-sans text-sm sm:text-base text-slate-600 max-w-md">
            {copy.text_2}</p>
        </div>

        {/* Sticky Image-Pair Sequence with alternating reverse */}
        <div ref={trackRef} className="spaces-gallery-track space-y-24 sm:space-y-32" tabIndex={compact ? 0 : undefined} role={compact ? 'region' : undefined} aria-label={compact ? 'Medical complex photo gallery' : undefined}>

          {content.gallery.map((photo, index) => <StickyImagePair key={photo.id} heading={photo.heading} image={photo.image} caption={{ thumbnail: photo.thumbnail, label: photo.label, description: photo.description }} reverse={index % 2 === 1} />)}

        </div>
        <div className="spaces-gallery-controls">
          <span>{copy.text_3}</span><span>{String(active + 1).padStart(2, '0')} / {String(content.gallery.length).padStart(2, '0')}</span>
          <div><button type="button" onClick={() => move(-1)} disabled={active === 0} aria-label="Previous photograph"><ChevronLeft size={18} /></button><button type="button" onClick={() => move(1)} disabled={active === content.gallery.length - 1} aria-label="Next photograph"><ChevronRight size={18} /></button></div>
        </div>

      </div>
    </section>
  );
};

export default StickyImagePairSection;

