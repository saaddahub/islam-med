import Modal from './Modal';
import { X, Sparkles, Phone, MapPin, Clock } from 'lucide-react';

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
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="modal-coming-soon-title">
      <div className="relative w-full max-w-lg bg-[#191919] text-white rounded-3xl border border-white/15 overflow-hidden">

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C3460] transition-[background-color,transform] duration-150 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Top decorative band */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0E1E3A] via-[#1C3460] to-[#DC2626]" aria-hidden="true" />

        <div className="p-8 sm:p-10 space-y-8">

          {/* Icon badge */}
          <div className="w-14 h-14 rounded-2xl bg-[#1C3460]/15 border border-[#1C3460]/25 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-[#93B4D4]" aria-hidden="true" />
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <span className="text-[11px] font-label font-bold uppercase tracking-widest text-[#93B4D4]">
              Online Booking Portal
            </span>
            <h2
              id="modal-coming-soon-title"
              className="font-anton text-4xl sm:text-5xl uppercase tracking-tight text-white leading-[0.95]"
            >
              Coming Soon
            </h2>
            <p className="font-sans text-sm text-slate-400 leading-relaxed max-w-sm">
              Online booking is not available yet. To arrange an appointment, please call reception
              or visit the medical complex.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 text-slate-600 text-xs">
            <div className="flex-1 h-px bg-white/8" aria-hidden="true" />
            <span className="font-label uppercase tracking-wider">Book now via</span>
            <div className="flex-1 h-px bg-white/8" aria-hidden="true" />
          </div>

          {/* Contact options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="tel:+9251111475475"
              className="group flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 transition-[background-color,border-color] duration-150"
            >
              <div className="w-9 h-9 rounded-full bg-[#DC2626]/15 border border-[#DC2626]/25 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#DC2626]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Call Reception</p>
                <p className="text-sm font-medium text-white group-hover:text-[#93B4D4] transition-colors duration-150">
                  +92 51 111 475 475
                </p>
              </div>
            </a>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/8">
              <div className="w-9 h-9 rounded-full bg-[#1C3460]/15 border border-[#1C3460]/25 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#93B4D4]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Walk-in Hours</p>
                <p className="text-sm font-medium text-white">Sector G-10, Islamabad</p>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Reception open Sat–Thu, 9 AM–9 PM. 24/7 emergency line available.</span>
          </div>

        </div>
      </div>
    </Modal>
  );
};

export default AppointmentModal;
