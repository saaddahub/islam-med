import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, isDesktop } from '../lib/useScrollTrigger';
import { Sparkles, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../lib/useReducedMotion';

interface SatellitePhoto {
  id: string;
  title: string;
  category: string;
  image: string;
  group: 'top' | 'side' | 'bottom';
  posX: number;
  posY: number;
  className: string;
}

const SATELLITE_PHOTOS: SatellitePhoto[] = [
  {
    id: 'top-left',
    title: 'Precision Pathology Lab',
    category: '01. Diagnostics',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600',
    group: 'top',
    posX: 15,
    posY: 20,
    className: 'top-[20%] left-[15%] w-[130px] h-[130px] lg:w-[150px] lg:h-[150px]',
  },
  {
    id: 'top-right',
    title: 'Robotic Surgery Theatre',
    category: '02. Surgery',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600',
    group: 'top',
    posX: 78,
    posY: 20,
    className: 'top-[20%] left-[78%] w-[130px] h-[130px] lg:w-[150px] lg:h-[150px]',
  },
  {
    id: 'mid-left',
    title: 'Inpatient Recovery Lounge',
    category: '03. Care Suites',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600',
    group: 'side',
    posX: 16,
    posY: 45,
    className: 'top-[45%] left-[16%] w-[170px] h-[170px] lg:w-[200px] lg:h-[200px]',
  },
  {
    id: 'mid-right',
    title: 'Consultant Clinical Staff',
    category: '04. Specialists',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    group: 'side',
    posX: 83,
    posY: 45,
    className: 'top-[45%] left-[83%] w-[170px] h-[170px] lg:w-[200px] lg:h-[200px]',
  },
  {
    id: 'bottom-left',
    title: 'Biophilic Healing Grounds',
    category: '05. Architecture',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=600',
    group: 'bottom',
    posX: 3,
    posY: 92,
    className: 'top-[92%] left-[3%] w-[170px] h-[170px] lg:w-[200px] lg:h-[200px]',
  },
  {
    id: 'bottom-right',
    title: 'Emergency Resuscitation Bay',
    category: '06. Critical Care',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
    group: 'bottom',
    posX: 83,
    posY: 92,
    className: 'top-[92%] left-[83%] w-[170px] h-[170px] lg:w-[200px] lg:h-[200px]',
  },
];

export const PhotoMosaicTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClientDesktop, setIsClientDesktop] = useState(false);
  const isReduced = useReducedMotion();

  useEffect(() => {
    setIsClientDesktop(isDesktop());
    const handleResize = () => {
      setIsClientDesktop(isDesktop());
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current || isReduced) return;

    const mm = gsap.matchMedia();

    // Desktop Animation (≥768px): Scroll-scrubbed burst-in
    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      });

      tl.fromTo(
        '.mosaic-center',
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'power3.out' }
      )
        .fromTo(
          '.mosaic-top',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'power3.out', stagger: 0.08 },
          '-=0.6'
        )
        .fromTo(
          '.mosaic-side',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'power3.out', stagger: 0.08 },
          '-=0.5'
        )
        .fromTo(
          '.mosaic-bottom',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'power3.out', stagger: 0.08 },
          '-=0.4'
        );
    });

    // Mobile Animation (<768px): Simple scroll-triggered fade-up
    mm.add('(max-width: 767px)', () => {
      const items = gsap.utils.toArray<HTMLElement>('.mosaic-item');
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
            },
          }
        );
      });
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      mm.revert();
    };
  }, [isReduced]);

  return (
    <section
      ref={containerRef}
      id="hero-mosaic"
      className="relative z-20 w-full min-h-[90vh] lg:h-screen bg-[#F5F0E8] overflow-hidden flex items-center justify-center select-none py-16 lg:py-0"
    >
      {/* Subtle Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] rounded-full bg-blue-100/25 blur-3xl pointer-events-none" />

      {/* Floating Header Tag */}
      <div className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-center pointer-events-none px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#1DBF8A]" aria-hidden="true" />
          <span>SYNCHRONIZED MEDICAL SPACES</span>
        </div>
        <p className="font-serif-display text-xl sm:text-2xl text-[#1C1C1E] italic max-w-lg">
          Designed from the ground up for quiet healing and surgical mastery
        </p>
      </div>

      {/* 6 Satellite Burst Photos (Tagged mosaic-top, mosaic-side, mosaic-bottom) */}
      {SATELLITE_PHOTOS.map((item) => (
        <div
          key={item.id}
          className={`hidden md:block absolute -translate-x-1/2 -translate-y-1/2 z-10 rounded-xl overflow-hidden shadow-lg bg-slate-200 group will-change-transform mosaic-item mosaic-${item.group} ${item.className}`}
          style={{
            left: `${item.posX}%`,
            top: `${item.posY}%`,
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center filter brightness-[0.96]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-2 left-2 right-2 text-[10px] font-mono text-white leading-tight truncate">
            <span className="text-[#A7F3D0] block">{item.category}</span>
            <span className="font-sans font-medium text-slate-100">{item.title}</span>
          </div>
        </div>
      ))}

      {/* Center Anchor Photo (Tagged mosaic-center) */}
      {isClientDesktop ? (
        <div className="mosaic-center mosaic-item relative z-20 w-[90vw] sm:w-[520px] md:w-[640px] lg:w-[720px] aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-slate-900 will-change-transform">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=85&w=1600"
            alt="Central Clinical Pavilion & Main Atrium"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          
          {/* Badge in Bottom Overlay */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-[#A7F3D0]">
                CAMPUS ATRIUM
              </span>
              <h3 className="font-anton text-xl sm:text-3xl uppercase tracking-tight text-white">
                ISLAM MEDICAL COMPLEX
              </h3>
              <p className="font-sans text-xs text-slate-200 hidden sm:block max-w-sm">
                State-of-the-art biophilic patient architecture bathed in natural light.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-mono border border-white/20">
              <span>SCROLL</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#A7F3D0]" aria-hidden="true" />
            </div>
          </div>
        </div>
      ) : (
        /* Mobile fallback: Simple fade-up on view per Section 4 specification */
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mosaic-item relative z-20 w-[90vw] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl bg-slate-900"
        >
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=85&w=1600"
            alt="Central Clinical Pavilion & Main Atrium"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 space-y-1">
            <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-mono uppercase tracking-widest text-[#A7F3D0]">
              CAMPUS ATRIUM
            </span>
            <h3 className="font-anton text-lg uppercase tracking-tight text-white">
              ISLAM MEDICAL COMPLEX
            </h3>
          </div>
        </motion.div>
      )}

    </section>
  );
};

export default PhotoMosaicTransition;
