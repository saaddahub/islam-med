import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu as MenuIcon, X, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  onOpenAppointment: () => void;
  onOpenDoctorModal?: (doctorId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAppointment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Departments", href: "#departments" },
    { label: "Our Doctors", href: "#doctors" },
    { label: "Facilities", href: "#facilities" },
    { label: "Care Plans", href: "#care-plans" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "About Us", href: "#about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'py-3 sm:py-4 px-4 sm:px-6 lg:px-8'
            : 'py-0 px-0'
        }`}
      >
        {/* Dark gradient scrim — ensures navbar text is readable over any hero image */}
        <div
          className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none transition-opacity duration-500 ${
            isScrolled ? 'opacity-0' : 'opacity-100'
          }`}
        />

        <div
          className={`relative mx-auto transition-all duration-500 ease-out ${
            isScrolled
              ? 'max-w-7xl rounded-full glass-navbar-dark text-white shadow-xl py-2.5 px-4 sm:px-6 border border-white/10'
              : 'w-full max-w-none rounded-none bg-transparent text-white py-3.5 sm:py-4 px-4 sm:px-8 lg:px-12'
          }`}
        >
          <div className="relative flex items-center justify-between w-full max-w-7xl mx-auto">
            {/* Top edge specular glass highlight (visible when floating) */}
            <div
              className={`absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none transition-opacity duration-500 ${
                isScrolled ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Top-Left: Authentic Brand Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 group cursor-pointer active:scale-95 transition-transform"
            >
              <Logo variant="icon" isDarkBg={true} className="w-8 h-8" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-anton uppercase tracking-wider text-xl sm:text-2xl leading-none text-white">
                    ISLAM
                  </span>
                  <span className="font-anton uppercase tracking-wider text-xs sm:text-sm leading-tight text-[#E11D2A] mt-0.5">
                    MEDICAL COMPLEX
                  </span>
                </div>
                <span className="text-[9px] tracking-widest uppercase font-mono text-white/60">
                  Clinical Excellence & Surgery
                </span>
              </div>
            </a>

            {/* Center: Pill-shaped Glass Nav / Quick Menu */}
            <div
              className="hidden md:flex items-center gap-1 rounded-full p-1 bg-white/10 backdrop-blur-sm border border-white/15"
            >
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-[background-color,color,transform] duration-150 cursor-pointer active:scale-95 bg-white/10 text-white hover:bg-white/20 border border-white/10"
              >
                <MenuIcon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Menu</span>
              </button>
              
              <div className="h-4 w-px mx-1 bg-white/15" />
              
              <nav className="flex items-center space-x-1">
                {navLinks.slice(0, 4).map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-[color,background-color,transform] duration-150 active:scale-95"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Top-Right: Ghost Circular Arrow + Primary Appointment Pill Button */}
            <div className="flex items-center gap-2">
              <a
                href="#how-it-works"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/15 text-white hover:bg-white/20 transition-[background-color,transform] duration-150 cursor-pointer active:scale-90"
                title="How Care Works"
                aria-label="How Care Works"
              >
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onOpenAppointment}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#1D4ED8] text-white font-medium text-xs sm:text-sm tracking-tight hover:bg-[#1E40AF] active:scale-95 transition-[background-color,transform,box-shadow] duration-150 shadow-[0_2px_10px_rgba(29,78,216,0.25)] cursor-pointer"
              >
                <span>Book Appointment</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white hover:bg-white/20 transition-[background-color,transform] duration-150 cursor-pointer active:scale-90"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out / Dropdown Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex items-start justify-center pt-24 px-4 bg-[#0D1B2A]/80 backdrop-blur-xl">
          <div className="w-full max-w-xl bg-[#0D1B2A]/95 backdrop-blur-2xl text-white rounded-3xl p-6 sm:p-8 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-anton uppercase tracking-widest text-xs text-[#DC2626]">
                DIRECT NAVIGATION
              </span>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 active:scale-90 transition-[background-color,transform] duration-150 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {navLinks.map((link, idx) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/5 transition-[background-color,transform] duration-150"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#93C5FD] font-mono font-bold">0{idx + 1}</span>
                    <span className="font-medium text-sm group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#DC2626]" aria-hidden="true" />
                <span>Hotline: +1 (800) 475-2663</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#93C5FD]" aria-hidden="true" />
                <span>Sector G-10 Medical Enclave</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
