import { clinicLinks } from '../content/model';
import { useContent } from '../content/context';
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu as MenuIcon, X, Phone, MapPin, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import Modal from './Modal';
import { careHref } from '../data/departments';

interface NavbarProps {
  onOpenAppointment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAppointment }) => {
  const content = useContent();
  const copy = content.copy.Navbar;
  const CLINIC = clinicLinks(content.clinic); const DEPARTMENTS = content.departments; const CLINIC_SERVICES = content.services;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeMobile = () => { if (desktop.matches) setIsMenuOpen(false); };
    const closeDropdown = (event: PointerEvent) => {
      if (event.target instanceof Element && !event.target.closest('.department-nav')) {
        document.querySelector<HTMLDetailsElement>('.department-nav')?.removeAttribute('open');
      }
    };
    desktop.addEventListener('change', closeMobile);
    document.addEventListener('pointerdown', closeDropdown);
    return () => {
      desktop.removeEventListener('change', closeMobile);
      document.removeEventListener('pointerdown', closeDropdown);
    };
  }, []);

  const navLinks = [
    { label: "Departments", href: "#departments" },
    { label: "Our Doctors", href: "#doctors" },
    { label: "Facilities", href: "#facilities" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "About Us", href: "#about" },
  ];

  return (
    <>
      <header
        className={`site-header fixed top-0 left-0 right-0 z-50 ${
          isScrolled
            ? 'py-3 sm:py-4 px-2 sm:px-6 lg:px-8'
            : 'py-0 px-0'
        }`}
      >
        <div
          className={`relative mx-auto transition-[background-color,border-color,box-shadow,border-radius] duration-300 ease-out ${
            isScrolled
              ? 'max-w-7xl rounded-full bg-imc-paper text-imc-ink py-2.5 px-3 sm:px-6 border border-imc-blue/15'
              : 'w-full max-w-none rounded-none bg-imc-paper text-imc-ink py-3 sm:py-3.5 px-4 sm:px-8 lg:px-12 border-b border-imc-blue/10'
          }`}
        >
          <div className="relative flex items-center justify-between gap-3 w-full max-w-7xl mx-auto">
            {/* Top-Left: Authentic Brand Logo */}
            <a
              href="#top"
              aria-label="Islam Medical Complex home"
              className="flex items-center gap-2 sm:gap-2.5 min-h-11 min-w-0 group cursor-pointer active:scale-95 transition-transform"
            >
              <Logo variant="icon" isDarkBg={false} className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-anton uppercase tracking-wider text-lg sm:text-2xl leading-none text-imc-blue">
                    {copy.text_1}</span>
                  <span className="font-anton uppercase tracking-wider text-[10px] sm:text-sm leading-tight text-[#DC2626] max-w-16 sm:max-w-none sm:whitespace-nowrap mt-0.5">
                    {copy.text_2}</span>
                </div>
                <span className="text-[8px] sm:text-[9px] tracking-[0.08em] sm:tracking-widest uppercase font-label text-slate-600 whitespace-nowrap">
                  {copy.text_3}</span>
              </div>
            </a>

            <nav aria-label="Main navigation" className="desktop-navigation hidden lg:flex items-center gap-1">
              <details className="department-nav"
                onPointerEnter={event => { if (event.pointerType === 'mouse') event.currentTarget.open = true; }}
                onPointerLeave={event => { if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) event.currentTarget.open = false; }}
                onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false; }}
                onKeyDown={event => {
                  if (event.key === 'Escape') {
                    event.preventDefault();
                    event.currentTarget.open = false;
                    event.currentTarget.querySelector('summary')?.focus();
                  }
                }}>
                <summary className="desktop-nav-link">{copy.text_4}<ChevronDown size={13} aria-hidden="true" /></summary>
                <div className="department-dropdown" data-lenis-prevent>
                  <a href="#departments" className="department-dropdown-all" onClick={event => { const details = event.currentTarget.closest('details'); if (details) details.open = false; }}>{copy.link_or_button_text_1}<ArrowUpRight size={16} aria-hidden="true" /></a>
                  <div className="department-dropdown-groups">
                  <div><h2>{copy.heading_1}</h2>
                  <ul>
                    {DEPARTMENTS.map(department => <li key={department.id}>
                      <a href={careHref(department)} aria-current={location.hash === careHref(department) ? 'page' : undefined} onClick={event => { const details = event.currentTarget.closest('details'); if (details) details.open = false; }}>
                        <span>{department.name}</span><ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    </li>)}
                  </ul>
                  </div><div><h2>{copy.heading_2}</h2><ul>
                    {CLINIC_SERVICES.map(service => <li key={service.id}><a href={careHref(service)} aria-current={location.hash === careHref(service) ? 'page' : undefined} onClick={event => { const details = event.currentTarget.closest('details'); if (details) details.open = false; }}><span>{service.name}</span><ArrowUpRight size={15} aria-hidden="true" /></a></li>)}
                  </ul></div></div>
                </div>
              </details>
              {navLinks.slice(1).map(link => <a key={link.href} href={link.href} className="desktop-nav-link">{link.label}</a>)}
            </nav>

            {/* Top-Right: Ghost Circular Arrow + Primary Appointment Pill Button */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onOpenAppointment}
                aria-label="Book Appointment"
                className="flex items-center justify-center min-h-11 gap-2 px-4 sm:px-5 py-2 rounded-full bg-imc-blue text-white font-medium text-xs sm:text-sm whitespace-nowrap tracking-tight hover:bg-imc-blue-hover active:scale-95 transition-[background-color,transform,box-shadow] duration-150 cursor-pointer"
              >
                <span className="sm:hidden">{copy.text_5}</span>
                <span className="hidden sm:inline">{copy.text_6}</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full border border-imc-blue/20 text-imc-blue hover:bg-imc-linen transition-[background-color,transform] duration-150 cursor-pointer active:scale-90"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                aria-controls="site-navigation"
              >
                {isMenuOpen ? <X className="w-4 h-4" aria-hidden="true" /> : <MenuIcon className="w-4 h-4" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out / Dropdown Menu Overlay */}
      {isMenuOpen && (
        <Modal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} id="site-navigation" labelledBy="site-navigation-title" className="navigation-modal">
          <div className="navigation-sheet w-full max-w-xl bg-imc-paper text-imc-ink rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] space-y-6">
            <div className="navigation-sheet-header flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 id="site-navigation-title" className="font-editorial text-3xl text-imc-ink">
                {copy.heading_3}</h2>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="w-11 h-11 flex items-center justify-center rounded-full text-slate-600 hover:text-imc-ink hover:bg-slate-100 active:scale-90 transition-[background-color,transform] duration-150 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="All sections" className="mobile-navigation-links">
              {navLinks.slice(1).map(link => <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>{link.label}<ArrowUpRight size={18} aria-hidden="true" /></a>)}
              <details className="mobile-departments">
                <summary>{copy.text_7}<ChevronDown size={18} aria-hidden="true" /></summary>
                <ul>
                  <li><a href="#departments" onClick={() => setIsMenuOpen(false)}>{copy.link_or_button_text_2}<ArrowUpRight size={15} aria-hidden="true" /></a></li>
                  {DEPARTMENTS.map(department => <li key={department.id}><a href={careHref(department)} onClick={() => setIsMenuOpen(false)}>{department.name}<ArrowUpRight size={15} aria-hidden="true" /></a></li>)}
                </ul>
              </details>
              <details className="mobile-departments">
                <summary>{copy.text_8}<ChevronDown size={18} aria-hidden="true" /></summary>
                <ul>{CLINIC_SERVICES.map(service => <li key={service.id}><a href={careHref(service)} onClick={() => setIsMenuOpen(false)}>{service.name}<ArrowUpRight size={15} aria-hidden="true" /></a></li>)}</ul>
              </details>
            </nav>

            <div className="navigation-sheet-contact pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#DC2626]" aria-hidden="true" />
                <a href={CLINIC.phoneHref} className="inline-flex min-h-11 items-center font-medium">{CLINIC.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-imc-blue" aria-hidden="true" />
                <span>{CLINIC.shortAddress}</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Navbar;

