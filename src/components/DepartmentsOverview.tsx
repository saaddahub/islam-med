import { useContent } from '../content/context';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { careHref, type Department } from '../data/departments';
import ClinicalIllustration from './ClinicalIllustration';
import './DepartmentsOverview.css';

export default function DepartmentsOverview({ onOpenAppointment }: { onOpenAppointment: () => void }) {
  const content = useContent();
  const copy = content.copy.DepartmentsOverview;
  const DEPARTMENTS = content.departments; const CLINIC_SERVICES = content.services;
  const [preview, setPreview] = useState({ entry: DEPARTMENTS[0], instant: false });
  const select = (entry: Department, instant = false) => setPreview(previous => previous.entry === entry ? previous : { entry, instant });
  return <section id="departments" className="departments-overview relative z-20" aria-labelledby="departments-title">
    <div className="departments-container">
      <header className="departments-intro">
        <h2 id="departments-title" className="font-editorial">{copy.heading_1}<em>{copy.text_1}</em></h2>
        <div className="department-mobile-art"><ClinicalIllustration variant="gynecology" /></div>
        <p>{copy.text_2}<br />{copy.text_3}</p>
      </header>
      <div className="departments-layout">
        <div className="department-preview">
          <div className="department-preview-art" key={careHref(preview.entry)} data-instant={preview.instant}>
            <ClinicalIllustration variant={preview.entry.illustration} />
          </div>
          <div className="department-preview-copy">
            <h3 className="font-editorial">{preview.entry.name}</h3>
            <p>{preview.entry.shortDesc}</p>
            <a href={careHref(preview.entry)}>{copy.link_or_button_text_1}{preview.entry.kind} <ArrowUpRight size={17} aria-hidden="true" /></a>
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
          <h3 className="font-editorial">{copy.heading_2}</h3>
          <p>{copy.text_4}</p>
        </div>
        <nav aria-label="Clinical services" className="department-services-index">
          {CLINIC_SERVICES.map(entry => <a data-care-link key={entry.id} href={careHref(entry)}>
            <span>{entry.name}</span><ArrowUpRight size={15} aria-hidden="true" />
          </a>)}
        </nav>
      </div>
      <div className="departments-reception"><p>{copy.text_5}</p>
        <button type="button" onClick={onOpenAppointment}>{copy.link_or_button_text_2}<ArrowUpRight size={16} aria-hidden="true" /></button>
      </div>
    </div>
  </section>;
}

