import React from 'react';
import type { Doctor } from '../data/doctors';
import { X, Star, CheckCircle, ArrowUpRight, GraduationCap, Clock } from 'lucide-react';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onBookWithDoctor: (doctorId: string) => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  doctor,
  isOpen,
  onClose,
  onBookWithDoctor,
}) => {
  if (!isOpen || !doctor) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctor-profile-name"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl bg-[#0C1414] text-white rounded-3xl border border-white/15 overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 active:scale-90 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DBF8A] transition-[background-color,transform] duration-150 cursor-pointer"
          aria-label="Close profile"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Doctor Portrait & Quick Badges */}
          <div className="md:col-span-5 relative bg-slate-900 min-h-[280px] md:min-h-full">
            <img
              src={doctor.image}
              alt=""
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1414] via-transparent to-transparent md:hidden" />
            
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-[#A7F3D0] border border-white/10 w-max">
                <span className="w-2 h-2 rounded-full bg-[#DC2626]" aria-hidden="true" />
                <span>ACCEPTING PATIENTS</span>
              </div>
            </div>
          </div>

          {/* Right Column: Full Dossier Details */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            
            {/* Header / Department */}
            <div className="space-y-1">
              <div className="text-xs font-mono tracking-widest text-[#A7F3D0] uppercase font-bold">
                {doctor.yearMeta}
              </div>
              <h2 id="doctor-profile-name" className="font-anton text-3xl sm:text-4xl uppercase tracking-tight text-white leading-none">
                {doctor.name}
              </h2>
              <div className="text-sm font-sans font-medium text-slate-300">
                {doctor.role}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400" aria-hidden="true" />
                  <span>{doctor.rating}</span>
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">Rating</div>
              </div>
              <div className="border-x border-white/10">
                <div className="font-anton text-sm text-white">{doctor.patientsTreated}</div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">Treated</div>
              </div>
              <div>
                <div className="font-anton text-sm text-[#A7F3D0]">{doctor.consultationFee}</div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">Consult Fee</div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400">
                CLINICAL FOCUS & BIOGRAPHY
              </h4>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                {doctor.bio}
              </p>
            </div>

            {/* Credentials / Education */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#A7F3D0]" aria-hidden="true" />
                <span>QUALIFICATIONS & FELLOWSHIPS</span>
              </h4>
              <div className="space-y-1.5">
                {doctor.qualifications.map((q, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-[#A7F3D0] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Consultation Slots */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#DC2626]" aria-hidden="true" />
                <span>UPCOMING CONSULTATION SLOTS</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {doctor.availability.map((slot) => (
                  <span
                    key={slot}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#EDEDED]"
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex items-center justify-between gap-4 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-full border border-white/20 active:scale-95 text-xs uppercase tracking-wider text-slate-300 hover:text-white transition-[background-color,color,transform] duration-150 cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookWithDoctor(doctor.id);
                }}
                className="px-6 py-2.5 rounded-full bg-[#1DBF8A] hover:bg-[#0EA571] active:scale-95 text-white font-medium text-xs uppercase tracking-wider transition-[background-color,transform] duration-150 shadow-[0_2px_12px_rgba(29,191,138,0.3)] flex items-center gap-2 cursor-pointer"
              >
                <span>Book Direct with {doctor.name.split(' ')[1] || doctor.name}</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default DoctorProfileModal;
