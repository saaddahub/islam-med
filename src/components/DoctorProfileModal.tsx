import { clinicLinks } from '../content/model';
import { useContent } from '../content/context';
import Modal from './Modal';
import type { Doctor } from '../data/doctors';
import { X, ArrowUpRight, Clock, ArrowLeft } from 'lucide-react';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookWithDoctor: () => void;
}

export const DoctorProfileModal = ({ doctor, onClose, onBookWithDoctor }: DoctorProfileModalProps) => {
  const content = useContent();
  const copy = content.copy.DoctorProfileModal;
  const CLINIC = clinicLinks(content.clinic);
  if (!doctor) return null;

  return (
    <Modal isOpen={true} onClose={onClose} labelledBy="doctor-profile-name" className="doctor-profile-modal">
      <article className="doctor-profile-sheet">
        <div className="doctor-profile-toolbar">
          <button type="button" onClick={onClose} className="doctor-profile-back">
            <ArrowLeft size={17} aria-hidden="true" />
            <span>{copy.text_1}</span>
          </button>
          <button type="button" onClick={onClose} className="doctor-profile-close" aria-label="Close profile">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="doctor-profile-layout">
          <aside className="doctor-profile-portrait-column">
            <div className="doctor-portrait-outline">
              <div className="doctor-portrait-crop">
                <img src={doctor.image} alt={doctor.name} width={480} height={600} />
              </div>
            </div>
            <p className="doctor-profile-experience">{doctor.experience}</p>
            <p className="doctor-profile-place">{copy.text_2}<span>{CLINIC.location}</span></p>
          </aside>

          <div className="doctor-profile-details">
            <header className="doctor-profile-heading">
              <h2 id="doctor-profile-name" className="font-editorial">{doctor.name}</h2>
              <p className="doctor-profile-role">{doctor.role}</p>
              <p className="doctor-profile-specialty">{doctor.department.toLowerCase()}</p>
            </header>

            <div className="doctor-profile-bio">
              <h3>{copy.heading_1}</h3>
              <p>{doctor.bio}</p>
            </div>

            <div className="doctor-profile-qualifications">
              <h3>{copy.heading_2}</h3>
              <ul>
                {doctor.qualifications.map((qualification) => <li key={qualification}>{qualification}</li>)}
              </ul>
            </div>

            <div className="doctor-profile-hours">
              <Clock size={21} aria-hidden="true" />
              <div>
                <h3>{copy.heading_3}</h3>
                {doctor.availability.map((slot) => <p key={slot}>{slot}</p>)}
              </div>
            </div>
          </div>
        </div>

        <div className="doctor-profile-actions">
          <p>{copy.text_3}</p>
          <button type="button" onClick={onBookWithDoctor} className="doctor-profile-book transition-[background-color,transform] duration-150 active:scale-95">
            <span>{copy.text_4}</span>
            <ArrowUpRight size={19} aria-hidden="true" />
          </button>
        </div>
      </article>
    </Modal>
  );
};

export default DoctorProfileModal;
