import Modal from './Modal';
import type { Doctor } from '../data/doctors';
import { X, ArrowUpRight, Clock, ArrowLeft } from 'lucide-react';
import { CLINIC } from '../data/clinic';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookWithDoctor: () => void;
}

export const DoctorProfileModal = ({ doctor, onClose, onBookWithDoctor }: DoctorProfileModalProps) => {
  if (!doctor) return null;

  return (
    <Modal isOpen={true} onClose={onClose} labelledBy="doctor-profile-name" className="doctor-profile-modal">
      <article className="doctor-profile-sheet">
        <div className="doctor-profile-toolbar">
          <button type="button" onClick={onClose} className="doctor-profile-back">
            <ArrowLeft size={17} aria-hidden="true" />
            <span>Our doctors</span>
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
            <p className="doctor-profile-place">Islam Medical Complex <span>{CLINIC.location}</span></p>
          </aside>

          <div className="doctor-profile-details">
            <header className="doctor-profile-heading">
              <h2 id="doctor-profile-name" className="font-editorial">{doctor.name}</h2>
              <p className="doctor-profile-role">{doctor.role}</p>
              <p className="doctor-profile-specialty">{doctor.department.toLowerCase()}</p>
            </header>

            <div className="doctor-profile-bio">
              <h3>Clinical focus</h3>
              <p>{doctor.bio}</p>
            </div>

            <div className="doctor-profile-qualifications">
              <h3>Qualifications &amp; fellowships</h3>
              <ul>
                {doctor.qualifications.map((qualification) => <li key={qualification}>{qualification}</li>)}
              </ul>
            </div>

            <div className="doctor-profile-hours">
              <Clock size={21} aria-hidden="true" />
              <div>
                <h3>Consultation hours</h3>
                {doctor.availability.map((slot) => <p key={slot}>{slot}</p>)}
              </div>
            </div>
          </div>
        </div>

        <div className="doctor-profile-actions">
          <p>Plan your visit with our reception team.</p>
          <button type="button" onClick={onBookWithDoctor} className="doctor-profile-book transition-[background-color,transform] duration-150 active:scale-95">
            <span>Contact reception to book</span>
            <ArrowUpRight size={19} aria-hidden="true" />
          </button>
        </div>
      </article>
    </Modal>
  );
};

export default DoctorProfileModal;
