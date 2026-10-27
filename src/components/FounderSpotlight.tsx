import { clinicLinks } from '../content/model';
import { useContent } from '../content/context';
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FounderSpotlightProps {
  onOpenAppointment: () => void;
}

export const FounderSpotlight: React.FC<FounderSpotlightProps> = ({ onOpenAppointment }) => {
  const content = useContent();
  const copy = content.copy.FounderSpotlight;
  const CLINIC = clinicLinks(content.clinic);
  return (
    <section id="about" className="founder-section relative z-20 w-full" aria-labelledby="leadership-heading">
      <div className="founder-container">
        <header className="leadership-header">
          <p className="cinema-eyebrow">{copy.text_1}</p>
          <h2 id="leadership-heading" className="font-editorial">{copy.heading_1}<br /><em>{copy.text_2}</em></h2>
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
                  src={copy.photograph_1}
                  alt={copy.image_description_1}
                  width={1024}
                  height={1536}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <figcaption data-leadership-name className="founder-caption">
              <p className="founder-role">{copy.text_3}</p>
              <h3 className="font-editorial">{copy.heading_2}</h3>
            </figcaption>
          </figure>
          <figure className="founder-portrait-column leadership-director">
            <div className="founder-portrait-outline">
              <div className="founder-portrait-crop">
                <img
                  data-founder-portrait
                  src={copy.photograph_2}
                  alt={copy.image_description_2}
                  width={768}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <figcaption data-leadership-name className="founder-caption">
              <p className="founder-role">{copy.text_4}</p>
              <h3 className="font-editorial">{copy.heading_3}</h3>
            </figcaption>
          </figure>
          </div>

          <div className="founder-content">
            <div>
              <p className="leadership-location">{copy.text_5}{CLINIC.location}</p>
              <div className="founder-quote">
                <p className="font-editorial">
                  {copy.text_6}</p>
                <p className="founder-quote-detail">
                  {copy.text_7}</p>
              </div>

              <div className="founder-practice">
                <h3>{copy.heading_4}</h3>
                <p>{copy.text_8}</p>
                <ul aria-label="Our approach">
                  <li>{copy.text_9}</li>
                  <li>{copy.text_10}</li>
                  <li>{copy.text_11}</li>
                </ul>
              </div>

              <div className="founder-actions">
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="founder-consult transition-[background-color,transform] duration-150 active:scale-95"
                >
                  <span>{copy.text_12}</span>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </button>
                <a href="#facilities" className="founder-campus transition-[background-color,transform] duration-150 active:scale-95">
                  <span>{copy.text_13}</span>
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
