import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CLINIC } from '../data/clinic';

interface FounderSpotlightProps {
  onOpenAppointment: () => void;
}

export const FounderSpotlight: React.FC<FounderSpotlightProps> = ({ onOpenAppointment }) => {
  return (
    <section id="about" className="founder-section relative z-20 w-full" aria-labelledby="leadership-heading">
      <div className="founder-container">
        <header className="leadership-header">
          <p className="cinema-eyebrow">Leadership &amp; vision</p>
          <h2 id="leadership-heading" className="font-editorial">The people behind<br /><em>your care.</em></h2>
        </header>
        <div className="founder-composition">
          <div className="leadership-pair">
            <svg className="leadership-thread" viewBox="0 0 600 420" fill="none" aria-hidden="true">
              <path data-leadership-thread pathLength="1" d="M 35 280 C -30 95 100 -35 225 55 C 290 100 270 305 370 340 C 510 390 635 220 565 115" />
            </svg>
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
            <figcaption data-leadership-name className="founder-caption">
              <p className="founder-role">Founder</p>
              <h3 className="font-editorial">Imran Islam</h3>
            </figcaption>
          </figure>
          <figure className="founder-portrait-column leadership-director">
            <div className="founder-portrait-outline">
              <div className="founder-portrait-crop">
                <img
                  data-founder-portrait
                  src="/doctors/dr-yasmin-sattar.jpg"
                  alt="Dr Yasmeen, Director of Islam Medical Complex"
                  width={768}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <figcaption data-leadership-name className="founder-caption">
              <p className="founder-role">Director</p>
              <h3 className="font-editorial">Dr Yasmeen</h3>
            </figcaption>
          </figure>
          </div>

          <div className="founder-content">
            <div>
              <p className="leadership-location">Islam Medical Complex · {CLINIC.location}</p>
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
