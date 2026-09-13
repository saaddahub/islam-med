import React, { useState } from 'react';
import { X, CheckCircle2, User, Phone, Mail, Stethoscope, AlertCircle, ArrowRight, Calendar } from 'lucide-react';
import { DOCTORS } from '../data/doctors';
import { DEPARTMENTS } from '../data/departments';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDoctorId?: string;
  selectedDepartmentId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  selectedDoctorId,
  selectedDepartmentId,
}) => {
  const [selectedDept, setSelectedDept] = useState(selectedDepartmentId || DEPARTMENTS[0].id);
  const [selectedDoc, setSelectedDoc] = useState(selectedDoctorId || DOCTORS[0].id);
  const [date, setDate] = useState('2026-09-15');
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const availableSlots = ["09:00 AM", "10:30 AM", "01:30 PM", "03:00 PM", "04:30 PM"];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-appointment-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-[#0C1414] text-white rounded-3xl border border-white/15 p-6 sm:p-8 my-8">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DBF8A] transition-[background-color,transform] duration-150 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {isSubmitted ? (
          /* Confirmation State */
          <div className="text-center py-10 space-y-6" aria-live="polite">
            <div className="w-16 h-16 rounded-full bg-[#1DBF8A]/20 text-[#A7F3D0] border border-[#1DBF8A]/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#A7F3D0] uppercase tracking-widest font-bold">
                BOOKING CONFIRMED
              </span>
              <h3 id="modal-appointment-title" className="font-anton text-3xl sm:text-4xl uppercase tracking-tight text-white">
                APPOINTMENT SCHEDULED
              </h3>
              <p className="font-sans text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <strong className="text-white">{patientName || "Patient"}</strong>. A confirmation SMS and digital calendar pass have been generated.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto text-left text-xs space-y-2 text-slate-300">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-slate-400">Specialist:</span>
                <span className="font-semibold text-white">
                  {DOCTORS.find((d) => d.id === selectedDoc)?.name || "Department Specialist"}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-slate-400">Date & Time:</span>
                <span className="text-[#A7F3D0] font-mono font-bold">{date} at {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Facility Location:</span>
                <span>Islam Medical Complex, Sector G-10</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-3 rounded-full bg-[#1DBF8A] text-white font-medium text-xs uppercase tracking-wider hover:bg-[#0EA571] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DBF8A] active:scale-95 transition-[background-color,transform] duration-150 cursor-pointer shadow-md"
            >
              Done
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Header */}
            <div className="space-y-1 pr-8">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#A7F3D0] uppercase tracking-wider font-semibold">
                <Stethoscope className="w-3.5 h-3.5 text-[#DC2626]" aria-hidden="true" />
                <span>DIRECT SPECIALIST CONSULTATION</span>
              </div>
              <h3 id="modal-appointment-title" className="font-anton text-2xl sm:text-4xl uppercase tracking-tight text-white">
                SCHEDULE AN APPOINTMENT
              </h3>
              <p className="font-sans text-xs text-slate-300">
                Select your department, doctor, and preferred time slot for zero-wait arrival.
              </p>
            </div>

            {/* Department & Doctor Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="dept-select" className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Department
                </label>
                <select
                  id="dept-select"
                  name="department"
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white focus:border-[#1DBF8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DBF8A]/60 transition-colors duration-150"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.id} className="bg-[#0C1414] text-white">
                      {dept.number} {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="doc-select" className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Consulting Doctor
                </label>
                <select
                  id="doc-select"
                  name="doctor"
                  value={selectedDoc}
                  onChange={(e) => setSelectedDoc(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white focus:border-[#1DBF8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DBF8A]/60 transition-colors duration-150"
                >
                  {DOCTORS.map((doc) => (
                    <option key={doc.id} value={doc.id} className="bg-[#0C1414] text-white">
                      {doc.name} ({doc.department})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="apt-date" className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Select Date & Time Slot
                </label>
                <div className="flex items-center gap-1.5 text-xs text-[#A7F3D0]">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  <input
                    id="apt-date"
                    name="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent border-0 text-[#A7F3D0] font-mono text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1DBF8A] rounded px-1 cursor-pointer"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {availableSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 px-2 text-xs font-mono rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DBF8A] transition-[background-color,border-color,transform] duration-150 active:scale-95 cursor-pointer ${
                      timeSlot === slot
                        ? 'bg-[#1DBF8A] text-white border-[#1DBF8A] font-bold shadow-xs'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Patient Details with proper autocomplete, 16px iOS zoom prevention, and inputmode */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="patient-name" className="text-xs font-sans text-slate-400">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" aria-hidden="true" />
                  <input
                    id="patient-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Tariq Mehmood"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-base sm:text-sm text-white focus:border-[#1DBF8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DBF8A]/60 placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="patient-phone" className="text-xs font-sans text-slate-400">
                  Phone Number <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" aria-hidden="true" />
                  <input
                    id="patient-phone"
                    name="tel"
                    type="tel"
                    inputMode="tel"
                    required
                    autoComplete="tel"
                    placeholder="+92 300 1234567"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-base sm:text-sm text-white focus:border-[#1DBF8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DBF8A]/60 placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="patient-email" className="text-xs font-sans text-slate-400">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" aria-hidden="true" />
                  <input
                    id="patient-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck={false}
                    placeholder="patient@islammedical.org"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-base sm:text-sm text-white focus:border-[#1DBF8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DBF8A]/60 placeholder:text-slate-600"
                  />
                </div>
              </div>
            </div>

            {/* Reason for Visit */}
            <div className="space-y-1.5">
              <label htmlFor="patient-reason" className="text-xs font-sans text-slate-400">
                Brief Reason for Visit / Symptoms
              </label>
              <textarea
                id="patient-reason"
                name="reason"
                rows={2}
                placeholder="Describe your health concern or desired examination..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-base sm:text-sm text-white focus:border-[#1DBF8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DBF8A]/60 placeholder:text-slate-600"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-between gap-4 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                <AlertCircle className="w-3.5 h-3.5 text-[#A7F3D0]" aria-hidden="true" />
                <span>Zero cancellation fees. Reschedule anytime.</span>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#1DBF8A] hover:bg-[#0EA571] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DBF8A] text-white font-medium text-xs uppercase tracking-wider transition-[background-color,transform] duration-150 flex items-center gap-2 cursor-pointer shadow-[0_2px_12px_rgba(29,191,138,0.3)]"
              >
                <span>Confirm Booking</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default AppointmentModal;
