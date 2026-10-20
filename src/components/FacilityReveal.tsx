import React, { useState } from 'react';
import { FACILITIES_DATA } from '../data/facilities';
import SquiggleUnderline from './SquiggleUnderline';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../lib/useReducedMotion';

export const FacilityReveal: React.FC = () => {
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);
  const isReduced = useReducedMotion();
  const currentFeature = FACILITIES_DATA.features[selectedFeatureIndex];

  return (
    <section id="facilities" className="facility-cinema relative z-20 w-full bg-imc-paper text-imc-ink border-t border-slate-200">
      <div className="facility-cinema-stage">
        <div className="cinema-hud cinema-only" aria-hidden="true">
          <span>Spaces for healing</span><span>Designed around you</span>
        </div>
        <div data-facility-heading className="facility-cinema-heading">
          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-imc-ink leading-[1.05]">
            Spaces designed for{' '}
            <span className="relative inline-block italic font-normal">
              healing<SquiggleUnderline color="var(--color-imc-blue-soft)" className="w-full" />
            </span>{' '}and quiet.
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-600">
            Privacy, dignity, clear communication and personal attention guide the
            patient experience, from reception to your clinical consultation.
          </p>
        </div>
        <div className="facility-mobile-tabs" role="group" aria-label="Choose a facility">
          {FACILITIES_DATA.features.map((feature, index) => <button type="button" key={feature.id} aria-pressed={index === selectedFeatureIndex} onClick={() => setSelectedFeatureIndex(index)}>{feature.title}</button>)}
        </div>
        <div className="facility-photo-space">
          {[FACILITIES_DATA.features[1], FACILITIES_DATA.features[2]].map((feature, index) => (
            <div key={feature.id} data-facility-wing={index === 0 ? 'left' : 'right'} className="facility-photo-wing cinema-only" aria-hidden="true">
              <img src={feature.image} alt="" loading="lazy" decoding="async" />
              <span className="cinema-eyebrow">{feature.title}</span>
            </div>
          ))}
          <div data-facility-main className="facility-photo-main">
            <div className="facility-photo-surface" data-facility-surface>
            <AnimatePresence initial={false} mode="wait">
              <motion.div key={currentFeature.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: isReduced ? 0 : 0.25 }} className="absolute inset-0">
                <img src={currentFeature.image} alt={currentFeature.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="facility-photo-shade absolute inset-0" />
              </motion.div>
            </AnimatePresence>
            </div>
            <div data-facility-caption className="facility-photo-caption">
              <span className="cinema-eyebrow">{currentFeature.tag}</span>
              <h3 className="font-editorial">{currentFeature.title}</h3>
              <p>{currentFeature.subtitle}</p>
              <p className="facility-mobile-description">{currentFeature.description}</p>
              <div className="facility-specs">{currentFeature.specs.map(spec => <span key={spec}>{spec}</span>)}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="facility-feature-picker max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-slate-300">
          {FACILITIES_DATA.features.map((feature, index) => (
            <button type="button" key={feature.id} onClick={() => setSelectedFeatureIndex(index)} aria-pressed={index === selectedFeatureIndex}
              className={`facility-feature-button text-left cursor-pointer ${index === selectedFeatureIndex ? 'is-selected' : ''}`}>
              <span className="font-label text-xs text-slate-500">0{index + 1} / {feature.tag}</span>
              <span className="font-editorial text-2xl sm:text-3xl">{feature.title}</span>
              <span className="text-sm text-slate-600 leading-relaxed">{feature.description}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilityReveal;
