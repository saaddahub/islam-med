import React, { useState } from 'react';
import { DOCTORS } from '../data/doctors';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { EASINGS } from '../lib/useScrollTrigger';

interface DoctorSpotlightProps {
  onOpenAppointment: () => void;
  onSelectDoctor: (doctor: typeof DOCTORS[0]) => void;
}

export const DoctorSpotlight: React.FC<DoctorSpotlightProps> = ({
  onOpenAppointment,
  onSelectDoctor,
}) => {
  const [activeDoctorIndex, setActiveDoctorIndex] = useState(0);
  const doctor = DOCTORS[activeDoctorIndex];

  const handleNext = () => {
    setActiveDoctorIndex((prev) => (prev + 1) % DOCTORS.length);
  };

  const handlePrev = () => {
    setActiveDoctorIndex((prev) => (prev - 1 + DOCTORS.length) % DOCTORS.length);
  };

  return (
    <section id="about" className="relative z-20 w-full bg-[#05091A] text-white py-24 sm:py-36 border-t border-white/10 overflow-hidden">
      
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: EASINGS.easeOutExpo }}
          className="max-w-5xl mx-auto space-y-12"
        >
          
          {/* Reference A "Hey — I'm Dario" Layout Proportions */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8">
            
            {/* Small Circular Headshot with active indicator */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#2563EB]">
                <img
                  src={doctor.image}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#05091A] flex items-center justify-center border border-white/20" title="Clinical Chief on active roster">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" aria-hidden="true" />
              </span>
            </div>

            {/* Giant Anton Condensed Headline */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono tracking-widest text-[#93C5FD] uppercase border border-white/10">
                  07 / CLINICAL LEADERSHIP SPOTLIGHT
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  {doctor.department}
                </span>
              </div>

              <h2 className="font-anton text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white leading-[0.9]">
                HEY — WE'RE HERE FOR YOU
              </h2>
            </div>

          </div>

          {/* Paragraph + Tag side-by-side with generous whitespace */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-white/10">
            
            <div className="md:col-span-4 space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-[#2563EB]/20 text-[#93C5FD] text-xs font-medium uppercase tracking-wider border border-[#2563EB]/30">
                MEET {doctor.name}
              </div>
              <div className="text-sm font-sans font-medium text-white">
                {doctor.role}
              </div>
              <div className="text-xs font-mono text-slate-300">
                {doctor.experience} • {doctor.patientsTreated} Patients Treated
              </div>
            </div>

            <div className="md:col-span-8 space-y-6">
              <p className="font-sans text-base sm:text-xl text-slate-200 leading-relaxed font-normal">
                "{doctor.bio} At Islam Medical Complex, our mission is to eliminate fear from healthcare, 
                replacing anxiety with absolute transparency, compassionate attentiveness, and cutting-edge 
                surgical robotics."
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                
                {/* Doctor switch controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 active:bg-white/20 active:scale-90 transition-[background-color,transform] duration-150 cursor-pointer"
                    aria-label="Previous Doctor"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 active:bg-white/20 active:scale-90 transition-[background-color,transform] duration-150 cursor-pointer"
                    aria-label="Next Doctor"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <span className="text-xs font-mono text-slate-300 ml-2">
                    {activeDoctorIndex + 1} / {DOCTORS.length} Specialists
                  </span>
                </div>

                {/* Profile Modal CTA & Appointment CTA */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectDoctor(doctor)}
                    className="px-5 py-2.5 rounded-full border border-white/20 hover:border-white active:scale-95 text-white text-xs font-medium uppercase tracking-wider transition-[border-color,transform] duration-150 cursor-pointer"
                  >
                    View Doctor Dossier
                  </button>

                  <button
                    type="button"
                    onClick={onOpenAppointment}
                    className="px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95 text-white text-xs font-medium uppercase tracking-wider transition-[background-color,transform] duration-150 shadow-[0_2px_12px_rgba(37,99,235,0.25)] flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Direct</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>

              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default DoctorSpotlight;
