import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FounderSpotlightProps {
  onOpenAppointment: () => void;
}

export const FounderSpotlight: React.FC<FounderSpotlightProps> = ({ onOpenAppointment }) => {
  return (
    <section id="about" className="founder-section relative z-20 w-full" aria-labelledby="founder-name">
      <div className="founder-container">
        <div data-founder-frame className="founder-composition">
          <figure className="founder-portrait-column">
            <div className="founder-portrait-outline">
              <div className="founder-portrait-crop">
                <img
                  data-founder-portrait
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=85&w=1000"
                  alt="Dr. Imran Islam, Founder & Medical Director"
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <figcaption data-founder-copy className="founder-caption">
              <p>Leadership &amp; vision</p>
              <span>Islam Medical Complex · Islamabad</span>
            </figcaption>
          </figure>

          <div className="founder-content">
            <div>
              <h2 id="founder-name" data-founder-heading className="font-editorial">Dr. Imran Islam</h2>
              <p className="founder-role">Founder &amp; Medical Director</p>
            </div>

            <div data-founder-copy>
              <blockquote className="founder-quote">
                <p className="font-editorial">
                  &ldquo;Islam Medical Complex was founded on a simple belief: world-class clinical precision
                  and genuine human warmth aren&apos;t a trade-off.
                </p>
                <p className="founder-quote-detail">
                  Every space here — from our sub-millimeter robotic theaters to light-filled circadian
                  recovery suites — is designed around patient dignity, safety, and tranquil restoration.&rdquo;
                </p>
              </blockquote>

              <div className="founder-practice">
                <h3>Founder &amp; Chief Surgeon</h3>
                <p>Dedicated to pioneering robotic precision while protecting the warmth of bedside care.</p>
                <ul aria-label="Clinical approach">
                  <li>Consultant Surgical Leadership</li>
                  <li>Evidence-Based Clinical Standards</li>
                  <li>Patient-Centered Bedside Care</li>
                </ul>
              </div>

              <div className="founder-actions">
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="founder-consult transition-[background-color,transform] duration-150 active:scale-95"
                >
                  <span>Schedule consultation</span>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </button>
                <a href="#facilities" className="founder-campus transition-[background-color,transform] duration-150 active:scale-95">
                  <span>Explore our campus</span>
                  <span className="founder-campus-arrow"><ArrowUpRight size={19} aria-hidden="true" /></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSpotlight;
