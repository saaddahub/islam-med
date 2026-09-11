import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, isDesktop, isReducedMotion } from '../lib/useScrollTrigger';
import { Sparkles, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface SatellitePhoto {
  id: string;
  title: string;
  category: string;
  image: string;
  posX: number;
  posY: number;
  className: string;
  burstStart: number;
  contractStart: number;
}

const SATELLITE_PHOTOS: SatellitePhoto[] = [
  {
    id: 'top-left',
    title: 'Precision Pathology Lab',
    category: '01. Diagnostics',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600',
    posX: 15,
    posY: 20,
    className: 'top-[20%] left-[15%] w-[130px] h-[130px] lg:w-[150px] lg:h-[150px]',
    burstStart: 0.20,
    contractStart: 0.55,
  },
  {
    id: 'top-right',
    title: 'Robotic Surgery Theatre',
    category: '02. Surgery',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600',
    posX: 78,
    posY: 20,
    className: 'top-[20%] left-[78%] w-[130px] h-[130px] lg:w-[150px] lg:h-[150px]',
    burstStart: 0.20,
    contractStart: 0.55,
  },
  {
    id: 'mid-left',
    title: 'Inpatient Recovery Lounge',
    category: '03. Care Suites',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600',
    posX: 16,
    posY: 45,
    className: 'top-[45%] left-[16%] w-[170px] h-[170px] lg:w-[200px] lg:h-[200px]',
    burstStart: 0.25,
    contractStart: 0.60,
  },
  {
    id: 'mid-right',
    title: 'Consultant Clinical Staff',
    category: '04. Specialists',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    posX: 83,
    posY: 45,
    className: 'top-[45%] left-[83%] w-[170px] h-[170px] lg:w-[200px] lg:h-[200px]',
    burstStart: 0.25,
    contractStart: 0.60,
  },
  {
    id: 'bottom-left',
    title: 'Biophilic Healing Grounds',
    category: '05. Architecture',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=600',
    posX: 3,
    posY: 92,
    className: 'top-[92%] left-[3%] w-[170px] h-[170px] lg:w-[200px] lg:h-[200px]',
    burstStart: 0.30,
    contractStart: 0.65,
  },
  {
    id: 'bottom-right',
    title: 'Emergency Resuscitation Bay',
    category: '06. Critical Care',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
    posX: 83,
    posY: 92,
    className: 'top-[92%] left-[83%] w-[170px] h-[170px] lg:w-[200px] lg:h-[200px]',
    burstStart: 0.30,
    contractStart: 0.65,
  },
];

export const PhotoMosaicTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const textHeaderRef = useRef<HTMLDivElement>(null);
  const satelliteRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isClientDesktop, setIsClientDesktop] = useState(false);

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
    if (!containerRef.current || !centerImageRef.current) return;

    if (!isDesktop() || isReducedMotion()) {
      if (centerImageRef.current) {
        gsap.set(centerImageRef.current, { scale: 1, opacity: 1, x: 0, y: 0 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial State: Center image seeded small (scale: 0.15, opacity: 0)
      gsap.set(centerImageRef.current, {
        scale: 0.15,
        opacity: 0,
        transformOrigin: '50% 50%',
      });

      if (textHeaderRef.current) {
        gsap.set(textHeaderRef.current, { opacity: 0, y: -20 });
      }

      // Initialize all 6 satellite images collapsed at center point (50vw, 50vh)
      satelliteRefs.current.forEach((el, index) => {
        if (!el) return;
        const photo = SATELLITE_PHOTOS[index];
        const offsetX = `${50 - photo.posX}vw`;
        const offsetY = `${50 - photo.posY}vh`;

        gsap.set(el, {
          x: offsetX,
          y: offsetY,
          scale: 0,
          opacity: 0,
          transformOrigin: '50% 50%',
        });
      });

      // Master Scroll-Scrubbed Timeline pinned for the entire duration
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ==========================================
      // PHASE A: "SEED" (0% to 20% of scroll range)
      // Center image: scale: 0.15 → 0.4, opacity: 0 → 1
      // Satellites remain scale: 0, opacity: 0
      // ==========================================
      tl.to(
        centerImageRef.current,
        {
          scale: 0.4,
          opacity: 1,
          ease: 'power2.out',
          duration: 0.20,
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

      // ==========================================
      // PHASE B: "BURST" (20% to 55% of scroll range)
      // Center image: continues scale: 0.4 → 0.75
      // Satellites burst outward to target grid positions
      // Staggered: top pair (0.20), mid pair (0.25), bottom pair (0.30)
      // Easing: power3.out
      // ==========================================
      tl.to(
        centerImageRef.current,
        {
          scale: 0.75,
          ease: 'none',
          duration: 0.35,
        },
        0.20
      );

      satelliteRefs.current.forEach((el, i) => {
        if (!el) return;
        const photo = SATELLITE_PHOTOS[i];
        tl.to(
          el,
          {
            x: '0vw',
            y: '0vh',
            scale: 1,
            opacity: 1,
            ease: 'power3.out',
            duration: 0.25,
          },
          photo.burstStart
        );
      });

      // ==========================================
      // PHASE C: "CONTRACT" (55% to 100% of scroll range)
      // Satellites contract back to center point (scale: 0, opacity: 0)
      // Reverse stagger: first in, first out (top 0.55, mid 0.60, bottom 0.65)
      // Center image: scale 0.75 → 1.0 (settled anchor)
      // Easing: power2.inOut
      // ==========================================
      satelliteRefs.current.forEach((el, i) => {
        if (!el) return;
        const photo = SATELLITE_PHOTOS[i];
        const offsetX = `${50 - photo.posX}vw`;
        const offsetY = `${50 - photo.posY}vh`;

        tl.to(
          el,
          {
            x: offsetX,
            y: offsetY,
            scale: 0,
            opacity: 0,
            ease: 'power2.inOut',
            duration: 0.25,
          },
          photo.contractStart
        );
      });

      // Center image expands to full settled anchor size
      tl.to(
        centerImageRef.current,
        {
          scale: 1.0,
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
            y: 15,
            ease: 'power2.in',
            duration: 0.20,
          },
          0.75
        );
      }

    }, containerRef);

    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="photo-mosaic"
      className="relative z-20 w-full h-screen bg-[#FAF8F5] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Subtle Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] rounded-full bg-blue-100/25 blur-3xl pointer-events-none" />

      {/* Floating Header Tag */}
      <div
        ref={textHeaderRef}
        className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-center pointer-events-none px-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8]" aria-hidden="true" />
          <span>SYNCHRONIZED MEDICAL SPACES</span>
        </div>
        <p className="font-serif-display text-xl sm:text-2xl text-[#0F172A] italic max-w-lg">
          Designed from the ground up for quiet healing and surgical mastery
        </p>
      </div>

      {/* 6 Satellite Burst Photos (Visible on desktop; positioned per specification table) */}
      {SATELLITE_PHOTOS.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => {
            satelliteRefs.current[index] = el;
          }}
          className={`hidden md:block absolute -translate-x-1/2 -translate-y-1/2 z-10 rounded-xl overflow-hidden shadow-lg bg-slate-200 group will-change-transform ${item.className}`}
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
            <span className="text-[#93C5FD] block">{item.category}</span>
            <span className="font-sans font-medium text-slate-100">{item.title}</span>
          </div>
        </div>
      ))}

      {/* Center Anchor Photo */}
      {isClientDesktop ? (
        <div
          ref={centerImageRef}
          className="relative z-20 w-[90vw] sm:w-[520px] md:w-[640px] lg:w-[720px] aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-slate-900 will-change-transform"
        >
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
      ) : (
        /* Mobile fallback: Simple fade-in on view per Section 4 specification */
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-20 w-[90vw] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl bg-slate-900"
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
            <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-mono uppercase tracking-widest text-[#93C5FD]">
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
