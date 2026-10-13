import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu as MenuIcon, X } from 'lucide-react';
import Logo from './Logo';
import Modal from './Modal';

interface NavbarProps {
  onOpenAppointment: () => void;
}

const navLinks = [
  { label: 'Departments', href: '#departments' },
  { label: 'Our Doctors', href: '#doctors' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About Us', href: '#about' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenAppointment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`refined-navigation fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow] duration-300 ${isScrolled ? 'bg-[#FFFCF5]/95 border-[#E8DECB] shadow-sm backdrop-blur-lg' : 'bg-[#F6F1E7]/90 border-[#E8DECB]/60'}`}>
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-4">
          <a href="#hero" aria-label="Islam Medical Complex home" className="flex shrink-0 items-center gap-2.5">
            <Logo variant="icon" isDarkBg={false} className="w-7 h-7 sm:w-9 sm:h-9" />
            <span className="flex flex-col gap-1">
              <span className="font-bold tracking-[-0.045em] text-lg sm:text-xl leading-none text-[#303C35]">ISLAM</span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.16em] font-semibold text-[#806044]">MEDICAL COMPLEX</span>
            </span>
          </a>
          <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-6">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="nav-link text-xs font-semibold text-[#303C35] py-2">{link.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" onClick={onOpenAppointment} className="premium-button flex items-center gap-2 rounded-full bg-[#303C35] text-[#FFFCF5] px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold hover:bg-[#253029] transition-colors cursor-pointer">
              <span className="sm:hidden">Book a visit</span>
              <span className="hidden sm:inline">Book Appointment</span>
              <ArrowUpRight className="hidden sm:block w-4 h-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => setIsMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={isMenuOpen} aria-haspopup="dialog" className="xl:hidden p-3 border border-[#E8DECB] rounded-full text-[#303C35] hover:bg-[#E8DECB] transition-colors cursor-pointer">
              <MenuIcon className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <Modal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} labelledBy="navigation-title">
        <div className="refined-navigation bg-[#F6F1E7] text-[#303C35] rounded-2xl p-6 sm:p-10 w-full max-w-xl mx-auto">
          <div className="flex justify-between items-center pb-6 border-b border-[#E8DECB]">
            <h2 id="navigation-title" className="font-bold tracking-[-0.045em] text-2xl">Explore our hospital</h2>
            <button type="button" onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="p-3 rounded-full hover:bg-[#E8DECB] transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
          </div>
          <nav aria-label="Mobile navigation" className="divide-y divide-[#E8DECB]">
            {navLinks.map((link, index) => (
              <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="group flex items-center gap-5 py-5">
                <span className="text-xs text-[#806044]">0{index + 1}</span>
                <span className="font-bold tracking-[-0.045em] text-xl sm:text-2xl flex-1">{link.label}</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;

