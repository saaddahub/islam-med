import { useContent } from '../content/context';
import React, { useState } from 'react';
import SquiggleUnderline from './SquiggleUnderline';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../lib/useReducedMotion';
import { imageSources } from '../lib/imageSources';

export const FacilityReveal: React.FC = () => {
  const content = useContent();
  const copy = content.copy.FacilityReveal;
  const FACILITIES_DATA = { features: content.facilities };
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);
  const isReduced = useReducedMotion();
  const currentFeature = FACILITIES_DATA.features[selectedFeatureIndex];

  return (
    <section id="facilities" className="facility-cinema relative z-20 w-full bg-imc-paper text-imc-ink border-t border-slate-200">
      <div className="facility-cinema-stage">
        <div className="cinema-hud cinema-only" aria-hidden="true">
          <span>{copy.text_1}</span><span>{copy.text_2}</span>
        </div>
        <div data-facility-heading className="facility-cinema-heading">
          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-imc-ink leading-[1.05]">
            {copy.heading_1}{' '}
            <span className="relative inline-block italic font-normal">
              {copy.text_3}<SquiggleUnderline color="var(--color-imc-blue-soft)" className="w-full" />
            </span>{' '}{copy.heading_2}</h2>
          <p className="font-sans text-sm sm:text-base text-slate-600">
            {copy.text_4}</p>
        </div>
        <div className="facility-mobile-tabs" role="group" aria-label="Choose a facility">
          {FACILITIES_DATA.features.map((feature, index) => <button type="button" key={feature.id} aria-pressed={index === selectedFeatureIndex} onClick={() => setSelectedFeatureIndex(index)}>{feature.title}</button>)}
        </div>
        <div className="facility-photo-space">
          {FACILITIES_DATA.features.filter(feature => feature.id !== currentFeature.id).map((feature, index) => (
            <div key={index === 0 ? 'left' : 'right'} data-facility-wing={index === 0 ? 'left' : 'right'} className="facility-photo-wing cinema-only" aria-hidden="true">
              <img src={feature.image} srcSet={imageSources(feature.image)} sizes="(max-width: 1023px) 70vw, 40vw" alt="" loading="lazy" decoding="async" />
              <span className="cinema-eyebrow">{feature.title}</span>
            </div>
          ))}
          <div data-facility-main className="facility-photo-main">
            <div className="facility-photo-surface" data-facility-surface>
            <AnimatePresence initial={false} mode="wait">
              <motion.div key={currentFeature.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: isReduced ? 0 : 0.25 }} className="absolute inset-0">
                <img src={currentFeature.image} srcSet={imageSources(currentFeature.image)} sizes="(max-width: 1023px) 92vw, 100vw" alt={currentFeature.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
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
              <span className="font-label text-xs text-slate-500">{copy.text_5}{index + 1} {copy.text_6}{feature.tag}</span>
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
