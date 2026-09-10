import React, { useEffect, useRef } from 'react';
import { gsap, isDesktop, isReducedMotion } from '../lib/useScrollTrigger';
import { Sparkles, ArrowDown } from 'lucide-react';

interface SatellitePhoto {
  id: string;
  title: string;
  category: string;
  image: string;
  className: string;
  centerOffsetX: string;
  centerOffsetY: string;
}

const SATELLITE_PHOTOS: SatellitePhoto[] = [
  {
    id: 'top-left',
    title: 'Precision Pathology Lab',
    category: '01. Diagnostics',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600',
    className: 'top-[20%] left-[15%] w-[130px] h-[130px] sm:w-[150px] sm:h-[150px]',
    centerOffsetX: '35vw',
    centerOffsetY: '30vh',
  },
  {
    id: 'top-right',
    title: 'Robotic Surgery Theatre',
    category: '02. Surgery',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600',
    className: 'top-[20%] left-[78%] w-[130px] h-[130px] sm:w-[150px] sm:h-[150px]',
    centerOffsetX: '-28vw',
    centerOffsetY: '30vh',
  },
  {
    id: 'mid-left',
    title: 'Inpatient Recovery Lounge',
    category: '03. Care Suites',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600',
    className: 'top-[48%] left-[16%] w-[170px] h-[170px] sm:w-[200px] sm:h-[200px]',
    centerOffsetX: '34vw',
    centerOffsetY: '2vh',
  },
  {
    id: 'mid-right',
    title: 'Consultant Clinical Staff',
    category: '04. Specialists',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    className: 'top-[48%] left-[83%] w-[170px] h-[170px] sm:w-[200px] sm:h-[200px]',
    centerOffsetX: '-33vw',
    centerOffsetY: '2vh',
  },
  {
    id: 'bottom-left',
    title: 'Biophilic Healing Grounds',
    category: '05. Architecture',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=600',
    className: 'top-[86%] left-[6%] w-[170px] h-[170px] sm:w-[200px] sm:h-[200px]',
    centerOffsetX: '44vw',
    centerOffsetY: '-36vh',
  },
  {
    id: 'bottom-right',
    title: 'Emergency Resuscitation Bay',
    category: '06. Critical Care',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
    className: 'top-[86%] left-[83%] w-[170px] h-[170px] sm:w-[200px] sm:h-[200px]',
    centerOffsetX: '-33vw',
    centerOffsetY: '-36vh',
  },
];

export const PhotoMosaicTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const textHeaderRef = useRef<HTMLDivElement>(null);
  const satelliteRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !centerImageRef.current) return;

    if (!isDesktop() || isReducedMotion()) {
      // In mobile or reduced motion: Show center image in settled state
      if (centerImageRef.current) {
        gsap.set(centerImageRef.current, { scale: 1, opacity: 1 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Setup initial states
      gsap.set(centerImageRef.current, { scale: 0.18, opacity: 0 });
      if (textHeaderRef.current) {
        gsap.set(textHeaderRef.current, { opacity: 0, y: -20 });
      }

      satelliteRefs.current.forEach((el, index) => {
        if (!el) return;
        const config = SATELLITE_PHOTOS[index];
        gsap.set(el, {
          x: config.centerOffsetX,
          y: config.centerOffsetY,
          scale: 0,
          opacity: 0,
        });
      });

      // Master Scroll-Scrubbed Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Phase A (0.00 -> 0.20): "Seed"
      tl.to(
        centerImageRef.current,
        {
          scale: 0.45,
          opacity: 1,
          ease: 'power2.out',
          duration: 0.2,
        },
        0
      );

      if (textHeaderRef.current) {
        tl.to(
          textHeaderRef.current,
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: 0.18,
          },
          0.02
        );
      }

      // Phase B (0.20 -> 0.55): "Burst Outward"
      tl.to(
        centerImageRef.current,
        {
          scale: 0.82,
          ease: 'none',
          duration: 0.35,
        },
        0.2
      );

      // Satellites burst with rippling stagger: top pair (0.20), mid pair (0.24), bottom pair (0.28)
      const burstStaggers = [0.20, 0.20, 0.24, 0.24, 0.28, 0.28];
      satelliteRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.to(
          el,
          {
            x: '0vw',
            y: '0vh',
            scale: 1,
            opacity: 1,
            ease: 'power3.out',
            duration: 0.3,
          },
          burstStaggers[i]
        );
      });

      // Phase C (0.55 -> 1.00): "Contract & Anchor"
      // Satellites contract in reverse order: top pair (0.55), mid pair (0.60), bottom pair (0.65)
      const contractStaggers = [0.55, 0.55, 0.60, 0.60, 0.65, 0.65];
      satelliteRefs.current.forEach((el, i) => {
        if (!el) return;
        const config = SATELLITE_PHOTOS[i];
        tl.to(
          el,
          {
            x: config.centerOffsetX,
            y: config.centerOffsetY,
            scale: 0,
            opacity: 0,
            ease: 'power2.in',
            duration: 0.28,
          },
          contractStaggers[i]
        );
      });

      // Center image grows into large final presentation anchor
      tl.to(
        centerImageRef.current,
        {
          scale: 1.22,
          ease: 'power2.inOut',
          duration: 0.45,
        },
        0.55
      );

      if (textHeaderRef.current) {
        tl.to(
          textHeaderRef.current,
          {
            opacity: 0,
            y: 20,
            ease: 'power2.in',
            duration: 0.25,
          },
          0.72
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="photo-mosaic"
      className="relative z-20 w-full h-screen bg-[#FAF8F5] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Subtle Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] rounded-full bg-blue-100/30 blur-3xl pointer-events-none" />

      {/* Floating Header Tag */}
      <div
        ref={textHeaderRef}
        className="absolute top-10 sm:top-14 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-center pointer-events-none px-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8]" aria-hidden="true" />
          <span>SYNCHRONIZED MEDICAL SPACES</span>
        </div>
        <p className="font-serif-display text-xl sm:text-2xl text-[#0F172A] italic">
          Designed from ground up for quiet healing and surgical mastery
        </p>
      </div>

      {/* 6 Satellite Burst Photos (Desktop only via CSS visibility / scale) */}
      {SATELLITE_PHOTOS.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => {
            satelliteRefs.current[index] = el;
          }}
          className={`hidden md:block absolute -translate-x-1/2 -translate-y-1/2 z-10 rounded-2xl overflow-hidden shadow-xl group ${item.className}`}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover object-center filter brightness-[0.96]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-2 left-2 right-2 text-[10px] font-mono text-white leading-tight truncate">
            <span className="text-[#93C5FD] block">{item.category}</span>
            <span className="font-sans font-medium">{item.title}</span>
          </div>
        </div>
      ))}

      {/* Center Anchor Photo (Survives and anchors next section) */}
      <div
        ref={centerImageRef}
        className="relative z-20 w-[88vw] sm:w-[480px] md:w-[580px] lg:w-[660px] aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl will-change-transform"
      >
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=85&w=1600"
          alt="Central Clinical Pavilion & Main Atrium"
          className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        
        {/* Badge in Bottom Overlay */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-[#93C5FD]">
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
            <ArrowDown className="w-3.5 h-3.5 text-[#93C5FD]" aria-hidden="true" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default PhotoMosaicTransition;
