import React, { useState } from 'react';
import { X, Sparkles, Phone, MapPin, Clock, Bell, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDoctorId?: string;
  selectedDepartmentId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const [isNotified, setIsNotified] = useState(false);

  if (!isOpen) return null;

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setIsNotified(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-coming-soon-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
    >
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
              We're building a seamless self-serve scheduling system. Sign up below and we'll
              notify you the moment it goes live.
            </p>
          </div>

          {/* Notify me form / confirmed state */}
          {isNotified ? (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#1C3460]/10 border border-[#1C3460]/20" aria-live="polite">
              <CheckCircle2 className="w-5 h-5 text-[#93B4D4] shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-white">You're on the list!</p>
                <p className="text-xs text-slate-400 mt-0.5">We'll email <span className="text-[#93B4D4]">{email}</span> as soon as online booking launches.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleNotify} className="space-y-3">
              <label htmlFor="notify-email" className="text-xs font-label uppercase tracking-wider text-slate-400">
                Notify me when it's live
              </label>
              <div className="flex gap-2">
                <input
                  id="notify-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-base sm:text-sm text-white focus:border-[#1C3460] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C3460]/60 placeholder:text-slate-600 transition-colors duration-150"
                />
                <button
                  type="submit"
                  className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C3460] hover:bg-[#152A52] active:scale-95 text-white font-medium text-sm transition-[background-color,transform] duration-150 cursor-pointer shadow-[0_2px_12px_rgba(28,52,96,0.25)]"
                >
                  <Bell className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Notify Me</span>
                  <ArrowRight className="w-4 h-4 sm:hidden" aria-hidden="true" />
                </button>
              </div>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 text-slate-600 text-xs">
            <div className="flex-1 h-px bg-white/8" aria-hidden="true" />
            <span className="font-label uppercase tracking-wider">Book now via</span>
            <div className="flex-1 h-px bg-white/8" aria-hidden="true" />
          </div>

          {/* Contact options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="tel:+925111147547"
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
            <span>Reception open SatThu, 9 AM  9 PM. 24/7 emergency line available.</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
