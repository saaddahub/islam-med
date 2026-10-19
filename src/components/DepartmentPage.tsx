import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Phone } from 'lucide-react';
import { CLINIC_SERVICES, DEPARTMENTS, careHref, type Department } from '../data/departments';
import { getCareDetails } from '../data/departmentDetails';
import { CLINIC } from '../data/clinic';
import ClinicalIllustration from './ClinicalIllustration';

export default function DepartmentPage({ department, onOpenAppointment }: {
  department: Department;
  onOpenAppointment: () => void;
}) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${department.name} — Islam Medical Complex`;
    return () => { document.title = previousTitle; };
  }, [department]);

  return <article className="department-reading">
    <div className="department-reading-container">
      <a href="#departments" className="department-back"><ArrowLeft size={18} aria-hidden="true" /> All departments &amp; services</a>
      <header className="department-reading-heading">
        <div>
        <h1 id="department-title" tabIndex={-1} data-long={department.name.split(/\s+/).some(word => word.length > 15)} className="font-editorial">{department.name}</h1>
        <p>{department.shortDesc}</p>
        <span className="department-availability">{department.focus}</span>
        </div>
        <div className="department-reading-art"><ClinicalIllustration variant={department.illustration} /></div>
      </header>
      <div className="department-reading-layout">
        <div className="department-reading-content">
          {getCareDetails(department).map(section => <section key={section.title} className="department-reading-section">
            <h2 className="font-editorial">{section.title}</h2>
            {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            {section.items && <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}
          </section>)}
        </div>
        <aside className="department-reading-aside">
          <h2 className="font-editorial">Plan your visit</h2>
          <p>Our reception team can help you confirm clinic timings and arrange the right consultation.</p>
          <button className="founder-consult" onClick={onOpenAppointment}>Arrange a visit <ArrowUpRight size={18} aria-hidden="true" /></button>
          <a href={CLINIC.phoneHref} className="department-phone"><Phone size={16} aria-hidden="true" /> {CLINIC.phone}</a>
          <p className="department-location">{CLINIC.shortAddress}</p>
          <nav aria-label="Related services" className="department-related">
            <h3>Related services</h3>
            {CLINIC_SERVICES.filter(item => department.relatedServices.includes(item.id)).map(item => <a key={item.id} href={careHref(item)}>{item.name}<ArrowUpRight size={16} aria-hidden="true" /></a>)}
          </nav>
        </aside>
      </div>
      <nav aria-label="Explore more care" className="department-more-care">
        <h2 className="font-editorial">Explore {department.kind === 'department' ? 'departments' : 'services'}</h2>
        <div>{(department.kind === 'department' ? DEPARTMENTS : CLINIC_SERVICES).filter(item => item.id !== department.id).map(item => <a key={item.id} href={careHref(item)}>{item.name}<ArrowUpRight size={16} aria-hidden="true" /></a>)}</div>
      </nav>
    </div>
  </article>;
}
