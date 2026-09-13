import StickyImagePair from './StickyImagePair';
import SquiggleUnderline from './SquiggleUnderline';
import { Eye } from 'lucide-react';

export function StickyImagePairSection() {
  return (
    <section
      id="spaces-exhibit"
      className="relative z-20 w-full bg-[#F0F4FA] text-[#1C1C1E] py-24 sm:py-32 border-t border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8 mb-16 sm:mb-24">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-xs font-mono text-[#2563EB] uppercase tracking-wider">
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              <span>05 / ARCHITECTURAL IMMERSION</span>
            </div>

            <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-[#1C1C1E] leading-none">
              A physical environment built for{' '}
              <span className="relative inline-block italic font-normal text-[#1C1C1E]">
                clarity
                <SquiggleUnderline color="#DC2626" className="w-full" />
              </span>{' '}
              and ease.
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-slate-600 max-w-md">
            Explore our continuous care spaces. As you scroll, experience seamless vertical transitions
            engineered with pure native precision.
          </p>
        </div>

        {/* Sticky Image-Pair Sequence with alternating reverse */}
        <div className="space-y-24 sm:space-y-32">
          
          {/* Pair 1: Caption LEFT, Image RIGHT */}
          <StickyImagePair
            heading="01 / Private Recovery"
            image="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1400"
            caption={{
              thumbnail: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600",
              label: "Private Inpatient Sanctuary",
              description: "Acoustically isolated ensuite rooms with dynamic circadian lighting and ergonomic guest rest accommodations.",
            }}
            reverse={false}
          />

          {/* Pair 2: Image LEFT, Caption RIGHT */}
          <StickyImagePair
            heading="02 / Precision Surgery"
            image="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1400"
            caption={{
              thumbnail: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600",
              label: "Robotic Surgical Suites",
              description: "Sub-millimeter 3D robotic tele-navigation integrated with ISO-5 laminar sterile airflow.",
            }}
            reverse={true}
          />

          {/* Pair 3: Caption LEFT, Image RIGHT */}
          <StickyImagePair
            heading="03 / Molecular Diagnostics"
            image="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1400"
            caption={{
              thumbnail: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600",
              label: "Molecular Diagnostic Lounge",
              description: "Wide-bore 3T MRI systems with ambient visual projections engineered to eliminate claustrophobia.",
            }}
            reverse={false}
          />

          {/* Pair 4: Image LEFT, Caption RIGHT */}
          <StickyImagePair
            heading="04 / Restorative Pavilion"
            image="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1400"
            caption={{
              thumbnail: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
              label: "Biophilic Healing Terraces",
              description: "Sunlit botanical courtyards and serene recovery lounges accelerating patient restoration.",
            }}
            reverse={true}
          />

        </div>

      </div>
    </section>
  );
};

export default StickyImagePairSection;
