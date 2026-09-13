import React from 'react';
import { ArrowUp, ArrowUpRight, Phone, Mail, MapPin, ShieldCheck, Clock, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { EASINGS } from '../lib/useScrollTrigger';
import Logo from './Logo';

interface FooterProps {
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAppointment }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 w-full bg-[#0F2318] text-white border-t border-white/10 pt-20 pb-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: EASINGS.easeOutExpo }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Giant Anton Closing CTA Line */}
        <div className="border-b border-white/10 pb-16 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-4xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#86EFAC]">
                SPECIALIST REFERRALS & ADMISSIONS
              </span>
              <h2 className="font-anton text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white leading-[0.88]">
                EXCEPTIONAL CARE STARTS HERE
              </h2>
            </div>

            <button
              type="button"
              onClick={onOpenAppointment}
              className="shrink-0 px-8 py-5 rounded-full bg-[#1B4332] text-white font-medium text-sm sm:text-base tracking-tight uppercase hover:bg-[#15382A] active:scale-95 transition-[background-color,transform] duration-150 shadow-[0_4px_20px_rgba(27,67,50,0.35)] flex items-center gap-3 cursor-pointer"
            >
              <span>Book Priority Consult</span>
              <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Multi-Column Directory in Clean Inter Sans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10 text-xs text-slate-300">
          
          {/* Col 1: Brand & Accreditation */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="full" isDarkBg={true} />
            <p className="font-sans text-sm text-slate-300 max-w-sm leading-relaxed">
              A modern quaternary care medical center combining robotic surgical precision 
              with peaceful, recovery-oriented inpatient architecture.
            </p>
            <div className="flex items-center gap-2 text-white font-medium">
              <ShieldCheck className="w-4 h-4 text-[#86EFAC]" aria-hidden="true" />
              <span>Accredited by Joint Commission International (JCI)</span>
            </div>
          </div>

          {/* Col 2: Clinical Divisions */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white">
              DIVISIONS
            </h4>
            <ul className="space-y-2 font-sans">
              <li><a href="#departments" className="hover:text-white transition-colors duration-150">Cardiovascular Center</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors duration-150">Robotic Surgery & Urology</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors duration-150">Orthopedics & Joint Spine</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors duration-150">High-Field 3T Radiology</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors duration-150">Precision Oncology</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors duration-150">Trauma & Acute Resuscitation</a></li>
            </ul>
          </div>

          {/* Col 3: Patient Services */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white">
              PATIENTS & VISITORS
            </h4>
            <ul className="space-y-2 font-sans">
              <li><a href="#care-plans" className="hover:text-white transition-colors duration-150">Individualized Care Plans</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors duration-150">Digital Portal Check-in</a></li>
              <li><a href="#facilities" className="hover:text-white transition-colors duration-150">Private Suite Accommodations</a></li>
              <li><a href="#doctors" className="hover:text-white transition-colors duration-150">Consultant Doctor Roster</a></li>
              <li><a href="#care-plans" className="hover:text-white transition-colors duration-150">Insurance Coverage & Billing</a></li>
              <li><a href="#about" className="hover:text-white transition-colors duration-150">Second Opinion Tele-Triage</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Emergency */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white">
              EMERGENCY & VISITING
            </h4>
            <div className="space-y-2.5 font-sans">
              <div className="flex items-center gap-2 text-white">
                <Phone className="w-3.5 h-3.5 text-[#DC2626]" aria-hidden="true" />
                <span className="font-bold">Hotline: (800) 475-2663</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#86EFAC]" aria-hidden="true" />
                <span>care@islammedical.org</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#86EFAC] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Sector G-10 Medical Enclave, Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#86EFAC]" aria-hidden="true" />
                <span>OPD: 08:00 AM – 10:00 PM (Mon-Sat)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Islam Medical Complex. All rights reserved.</span>
            <span aria-hidden="true">•</span>
            <span className="flex items-center gap-1">Crafted for healing <Heart className="w-3 h-3 text-[#DC2626] inline fill-[#DC2626]" aria-hidden="true" /></span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">JCI Accredited Facility</span>
            <span className="text-slate-600" aria-hidden="true">•</span>
            <span className="text-slate-400">Islamabad Healthcare Commission Registered</span>
            
            <button
              type="button"
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 active:scale-90 transition-[background-color,transform] duration-150 cursor-pointer"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

      </motion.div>
    </footer>
  );
};

export default Footer;
