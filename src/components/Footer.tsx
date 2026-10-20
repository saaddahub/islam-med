import React from 'react';
import { ArrowUp, ArrowUpRight, Phone, Mail, MapPin, ShieldCheck, Clock, Heart } from 'lucide-react';
import Logo from './Logo';
import { DEPARTMENTS } from '../data/departments';
import { CLINIC, CLINIC_MAP_URL } from '../data/clinic';

interface FooterProps {
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAppointment }) => {
  return (
    <footer data-stack="in" className="relative z-20 w-full bg-imc-night text-white border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Giant Anton Closing CTA Line */}
        <div className="border-b border-white/10 pb-16 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-4xl">

              <h2 data-reveal="mask" className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white leading-[0.88]">
                Exceptional <em className="font-normal">care</em> starts here
              </h2>
            </div>

            <button
              type="button"
              onClick={onOpenAppointment}
              className="shrink-0 px-8 py-5 rounded-full bg-imc-blue text-white font-medium text-sm sm:text-base tracking-tight uppercase hover:bg-imc-blue-hover active:scale-95 transition-[background-color,transform] duration-150 flex items-center gap-3 cursor-pointer"
            >
              <span>Contact reception</span>
              <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Multi-Column Directory in Clean Inter Sans */}
        <div data-stagger className="footer-directory grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10 text-xs text-slate-300">

          {/* Col 1: Brand & Patient Care */}
          <div data-reveal="up" className="lg:col-span-2 space-y-4">
            <Logo variant="full" isDarkBg={true} />
            <p className="font-sans text-sm text-slate-300 max-w-sm leading-relaxed">
              Care for women, children and adults in Sabzazar, Lahore, with outpatient
              consultations, inpatient services and laboratory testing.
            </p>
            <div className="flex items-center gap-2 text-white font-medium">
              <ShieldCheck className="w-4 h-4 text-imc-mist" aria-hidden="true" />
              <span>Privacy, Dignity &amp; Personal Attention</span>
            </div>
          </div>

          {/* Col 2: Clinical Divisions */}
          <div data-reveal="up" className="space-y-3">
            <h4 className="font-label text-xs uppercase tracking-widest text-white">
              DIVISIONS
            </h4>
            <ul className="space-y-2 font-sans">
              {DEPARTMENTS.map(department => <li key={department.id}>
                <a href={`#department-${department.id}`} className="hover:text-white transition-colors duration-150">{department.name}</a>
              </li>)}
            </ul>
          </div>

          {/* Col 3: Patient Services */}
          <div data-reveal="up" className="space-y-3">
            <h4 className="font-label text-xs uppercase tracking-widest text-white">
              PATIENTS & VISITORS
            </h4>
            <ul className="space-y-2 font-sans">
              <li><a href="#departments" className="hover:text-white transition-colors duration-150">Departments &amp; Services</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors duration-150">Planning Your Visit</a></li>
              <li><a href="#facilities" className="hover:text-white transition-colors duration-150">Patient Reception</a></li>
              <li><a href="#doctors" className="hover:text-white transition-colors duration-150">Consultant Doctor Roster</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors duration-150">Appointments &amp; Reception</a></li>
              <li><a href="#about" className="hover:text-white transition-colors duration-150">About Islam Medical Complex</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Emergency */}
          <div data-reveal="up" className="space-y-3">
            <h4 className="font-label text-xs uppercase tracking-widest text-white">
              CONTACT &amp; VISITING
            </h4>
            <div className="space-y-2.5 font-sans">
              <a href={CLINIC.phoneHref} className="flex items-center gap-2 min-h-11 text-white hover:text-imc-mist transition-colors duration-150">
                <Phone className="w-3.5 h-3.5 text-[#DC2626] shrink-0" aria-hidden="true" />
                <span className="font-bold tabular-nums">{CLINIC.phone}</span>
              </a>
              <a href={CLINIC.emailHref} className="flex items-center gap-2 min-h-11 hover:text-white transition-colors duration-150">
                <Mail className="w-3.5 h-3.5 text-imc-mist shrink-0" aria-hidden="true" />
                <span className="break-all">{CLINIC.email}</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-imc-mist shrink-0 mt-0.5" aria-hidden="true" />
                <a href={CLINIC_MAP_URL} target="_blank" rel="noopener noreferrer" className="min-h-11 hover:text-white underline">{CLINIC.address}</a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-imc-mist shrink-0" aria-hidden="true" />
                <span>{CLINIC.clinicHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Islam Medical Complex. All rights reserved.</span>
            <span aria-hidden="true">•</span>
            <span className="flex items-center gap-1">Crafted for healing <Heart className="w-3 h-3 text-imc-mist inline fill-imc-mist" aria-hidden="true" /></span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2 text-center sm:text-right">
            <span className="text-slate-400">{CLINIC.location}</span>
            <span className="text-slate-600" aria-hidden="true">•</span>
            <span className="text-slate-400">{CLINIC.emergencyCare}</span>

            <a
              href="#top"
              className="w-11 h-11 shrink-0 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 active:scale-90 transition-[background-color,transform] duration-150 cursor-pointer"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

