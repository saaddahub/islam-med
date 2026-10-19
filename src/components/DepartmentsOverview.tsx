import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CLINIC_SERVICES, DEPARTMENTS, careHref, type Department } from '../data/departments';
import ClinicalIllustration from './ClinicalIllustration';
import './DepartmentsOverview.css';

export default function DepartmentsOverview({ onOpenAppointment }: { onOpenAppointment: () => void }) {
  const [preview, setPreview] = useState({ entry: DEPARTMENTS[0], instant: false });
  const select = (entry: Department, instant = false) => setPreview(previous => previous.entry === entry ? previous : { entry, instant });
  return <section id="departments" className="departments-overview relative z-20" aria-labelledby="departments-title">
    <div className="departments-container">
      <header className="departments-intro">
        <h2 id="departments-title" className="font-editorial">Our <em>departments.</em></h2>
        <p>Find the care you need.<br />Explore a department to learn more and plan your visit.</p>
      </header>
      <div className="departments-layout">
        <div className="department-preview">
          <div className="department-preview-art" key={careHref(preview.entry)} data-instant={preview.instant}>
            <ClinicalIllustration variant={preview.entry.illustration} />
          </div>
          <div className="department-preview-copy">
            <h3 className="font-editorial">{preview.entry.name}</h3>
            <p>{preview.entry.shortDesc}</p>
            <a href={careHref(preview.entry)}>Explore {preview.entry.kind} <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <nav aria-label="Department overview" className="department-index">
          {DEPARTMENTS.map(entry => <a data-care-link key={entry.id} href={careHref(entry)}
            onPointerEnter={event => { if (event.pointerType === 'mouse') select(entry); }}
            onFocus={() => select(entry, true)}
            className={preview.entry === entry ? 'is-current' : undefined}>
            <span><span className="department-index-name font-editorial">{entry.name}</span><span className="department-index-focus">{entry.focus}</span></span>
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>)}
        </nav>
      </div>
      <div className="department-services">
        <div>
          <h3 className="font-editorial">Services, together.</h3>
          <p>Consultations, testing and everyday support in one place.</p>
        </div>
        <nav aria-label="Clinical services" className="department-services-index">
          {CLINIC_SERVICES.map(entry => <a data-care-link key={entry.id} href={careHref(entry)}>
            <span>{entry.name}</span><ArrowUpRight size={15} aria-hidden="true" />
          </a>)}
        </nav>
      </div>
      <div className="departments-reception"><p>Not sure where to begin? Our reception team can guide you.</p>
        <button type="button" onClick={onOpenAppointment}>Speak to reception <ArrowUpRight size={16} aria-hidden="true" /></button>
      </div>
    </div>
  </section>;
}

