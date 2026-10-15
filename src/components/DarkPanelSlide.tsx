import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const DarkPanelSlide: React.FC = () => (
  <section id="care-story" className="care-cinema relative z-20 w-full bg-imc-night text-white">
    <div className="care-cinema-stage">
      <div className="care-heading-block">
        <h2 className="care-cinema-title font-editorial">
          <span className="care-line-mask"><span data-care-line>How we <em className="font-normal">care</em></span></span>{' '}
          <span className="care-line-mask"><span data-care-line>for you.</span></span>
        </h2>
        <div data-care-rule className="care-story-rule" aria-hidden="true" />
      </div>
      <div data-care-detail className="care-cinema-detail">
        <p className="font-sans text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
          Four specialized clinical pillars engineered to guide you from precision diagnostics
          through minimally invasive treatment and tranquil post-operative recovery.
        </p>
        <div className="care-cinema-facts">
          <div><span className="font-editorial">24 / 7</span><span>Emergency &amp; Trauma</span></div>
          <div><span className="font-editorial">In-house</span><span>Pharmacy &amp; Diagnostics</span></div>
        </div>
        <a href="#departments" className="care-departments-link">Explore our departments <ArrowUpRight size={20} aria-hidden="true" /></a>
      </div>
    </div>
  </section>
);

export default DarkPanelSlide;
