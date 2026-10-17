import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CLINIC } from '../data/clinic';

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
                  src="/imran-islam-founder.webp"
                  alt="Imran Islam, Founder of Islam Medical Complex"
                  width={1024}
                  height={1536}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <figcaption data-founder-copy className="founder-caption">
              <p>Leadership &amp; vision</p>
              <span>Islam Medical Complex · {CLINIC.location}</span>
            </figcaption>
          </figure>

          <div className="founder-content">
            <div>
              <h2 id="founder-name" data-founder-heading className="font-editorial">Imran Islam</h2>
              <p className="founder-role">Founder</p>
            </div>

            <div data-founder-copy>
              <div className="founder-quote">
                <p className="font-editorial">
                  Care with attention to your privacy, dignity and individual needs.
                </p>
                <p className="founder-quote-detail">
                  The patient experience at Islam Medical Complex begins with clear communication,
                  helpful reception staff and access to women's health, pediatric, outpatient
                  and internal medicine services.
                </p>
              </div>

              <div className="founder-practice">
                <h3>Our approach to care</h3>
                <p>Personal attention, cleanliness and comfort are central to how patients are welcomed and cared for.</p>
                <ul aria-label="Our approach">
                  <li>Women's &amp; Children's Health</li>
                  <li>Adult &amp; Preventive Care</li>
                  <li>Clear Communication &amp; Personal Attention</li>
                </ul>
              </div>

              <div className="founder-actions">
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="founder-consult transition-[background-color,transform] duration-150 active:scale-95"
                >
                  <span>Contact reception</span>
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
