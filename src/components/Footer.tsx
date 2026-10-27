import { clinicLinks } from '../content/model';
import { useContent } from '../content/context';
import React from 'react';
import { ArrowUp, ArrowUpRight, Phone, Mail, MapPin, ShieldCheck, Clock, Heart } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAppointment }) => {
  const content = useContent();
  const copy = content.copy.Footer;
  const CLINIC = clinicLinks(content.clinic); const CLINIC_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC.address)}`; const DEPARTMENTS = content.departments;
  return (
    <footer data-stack="in" className="relative z-20 w-full bg-imc-night text-white border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Giant Anton Closing CTA Line */}
        <div className="border-b border-white/10 pb-16 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-4xl">

              <h2 data-reveal="mask" className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white leading-[0.88]">
                {copy.heading_1}<em className="font-normal">{copy.text_1}</em> {copy.heading_2}</h2>
            </div>

            <button
              type="button"
              onClick={onOpenAppointment}
              className="shrink-0 px-8 py-5 rounded-full bg-imc-blue text-white font-medium text-sm sm:text-base tracking-tight uppercase hover:bg-imc-blue-hover active:scale-95 transition-[background-color,transform] duration-150 flex items-center gap-3 cursor-pointer"
            >
              <span>{copy.text_2}</span>
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
              {copy.text_3}</p>
            <div className="flex items-center gap-2 text-white font-medium">
              <ShieldCheck className="w-4 h-4 text-imc-mist" aria-hidden="true" />
              <span>{copy.text_4}</span>
            </div>
          </div>

          {/* Col 2: Clinical Divisions */}
          <div data-reveal="up" className="space-y-3">
            <h4 className="font-label text-xs uppercase tracking-widest text-white">
              {copy.heading_3}</h4>
            <ul className="space-y-2 font-sans">
              {DEPARTMENTS.map(department => <li key={department.id}>
                <a href={`#department-${department.id}`} className="hover:text-white transition-colors duration-150">{department.name}</a>
              </li>)}
            </ul>
          </div>

          {/* Col 3: Patient Services */}
          <div data-reveal="up" className="space-y-3">
            <h4 className="font-label text-xs uppercase tracking-widest text-white">
              {copy.heading_4}</h4>
            <ul className="space-y-2 font-sans">
              <li><a href="#departments" className="hover:text-white transition-colors duration-150">{copy.link_or_button_text_1}</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors duration-150">{copy.link_or_button_text_2}</a></li>
              <li><a href="#facilities" className="hover:text-white transition-colors duration-150">{copy.link_or_button_text_3}</a></li>
              <li><a href="#doctors" className="hover:text-white transition-colors duration-150">{copy.link_or_button_text_4}</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors duration-150">{copy.link_or_button_text_5}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors duration-150">{copy.link_or_button_text_6}</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Emergency */}
          <div data-reveal="up" className="space-y-3">
            <h4 className="font-label text-xs uppercase tracking-widest text-white">
              {copy.heading_5}</h4>
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
            <span>{copy.text_5}{new Date().getFullYear()} {copy.text_6}</span>
            <span aria-hidden="true">{copy.text_7}</span>
            <span className="flex items-center gap-1">{copy.text_8}<Heart className="w-3 h-3 text-imc-mist inline fill-imc-mist" aria-hidden="true" /></span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2 text-center sm:text-right">
            <span className="text-slate-400">{CLINIC.location}</span>
            <span className="text-slate-600" aria-hidden="true">{copy.text_9}</span>
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

