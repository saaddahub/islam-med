import Modal from './Modal';
import { X, ArrowUpRight } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal = ({
  isOpen,
  onClose,
}: AppointmentModalProps) => {

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="appointment-title" describedBy="appointment-description" className="appointment-modal">
      <div className="relative w-full max-w-lg rounded-xl bg-[#F5F3EF] text-[#1C1C1E] p-6 sm:p-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 w-11 h-11 rounded-md flex items-center justify-center text-[#5E5A54] hover:bg-[#E8E4DD] hover:text-[#1C1C1E] transition-[background-color,color] duration-150 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <h2 id="appointment-title" className="font-editorial text-4xl sm:text-5xl pr-9 sm:pr-10">
          Arrange your visit
        </h2>
        <p id="appointment-description" className="mt-4 font-sans text-sm leading-relaxed text-[#5E5A54] max-w-sm">
          Online booking is not available yet. Call reception or visit the medical complex
          to arrange an appointment.
        </p>

        <div className="mt-8 pb-7 border-b border-[#1C3460]/15">
          <p className="text-sm font-medium">Call reception</p>
          <a
            href="tel:+9251111475475"
            aria-label="Call reception at +92 51 111 475 475"
            className="group inline-flex items-center gap-2 sm:gap-3 min-h-11 mt-1 rounded-sm text-[22px] sm:text-[28px] font-medium tabular-nums text-[#1C3460] hover:text-[#152A52] transition-colors duration-150"
          >
            <span className="whitespace-nowrap underline decoration-[#1C3460]/30 underline-offset-[6px] group-hover:decoration-[#1C3460] transition-colors duration-150">+92 51 111 475 475</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" aria-hidden="true" />
          </a>
        </div>

        <dl className="mt-6 space-y-5 text-sm leading-relaxed">
          <div className="sm:grid sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
            <dt className="font-medium">Visit us</dt>
            <dd className="mt-1 sm:mt-0 text-[#5E5A54]">Sector G-10, Islamabad</dd>
          </div>
          <div className="sm:grid sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
            <dt className="font-medium">Reception hours</dt>
            <dd className="mt-1 sm:mt-0 text-[#5E5A54]">Sat–Thu, 9 AM–9 PM</dd>
          </div>
        </dl>

        <p className="mt-7 text-xs leading-relaxed text-[#5E5A54]">24/7 emergency line available.</p>
      </div>
    </Modal>
  );
};

export default AppointmentModal;
