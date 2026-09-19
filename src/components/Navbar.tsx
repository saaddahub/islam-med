import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu as MenuIcon, X, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  onOpenAppointment: () => void;
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
    { label: "How It Works", href: "#how-it-works" },
    { label: "About Us", href: "#about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[padding] duration-500 ease-out ${
          isScrolled
            ? 'py-3 sm:py-4 px-4 sm:px-6 lg:px-8'
            : 'py-0 px-0'
        }`}
      >
        <div
          className={`relative mx-auto transition-all duration-500 ease-out ${
            isScrolled
              ? 'max-w-7xl rounded-full bg-white/65 backdrop-blur-xl text-[#1C1C1E] shadow-md py-2.5 px-4 sm:px-6 border border-white/50'
              : 'w-full max-w-none rounded-none bg-white/60 backdrop-blur-xl text-[#1C1C1E] py-3 sm:py-3.5 px-4 sm:px-8 lg:px-12 border-b border-white/40 shadow-xs'
          }`}
        >
          <div className="relative flex items-center justify-between w-full max-w-7xl mx-auto">
            {/* Specular top highlight when floating */}
            <div
              className={`absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none transition-opacity duration-500 ${
                isScrolled ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Top-Left: Authentic Brand Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 group cursor-pointer active:scale-95 transition-transform"
            >
              <Logo variant="icon" isDarkBg={false} className="w-8 h-8" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-anton uppercase tracking-wider text-xl sm:text-2xl leading-none text-[#1C3460]">
                    ISLAM
                  </span>
                  <span className="font-anton uppercase tracking-wider text-xs sm:text-sm leading-tight text-[#DC2626] mt-0.5">
                    MEDICAL COMPLEX
                  </span>
                </div>
                <span className="text-[9px] tracking-widest uppercase font-label text-slate-500">
                  Clinical Excellence & Surgery
                </span>
              </div>
            </a>

            {/* Center: Pill-shaped Glass Nav / Quick Menu */}
            <div
              className="hidden md:flex items-center gap-1 rounded-full p-1 bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-xs"
            >
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-[background-color,color,transform] duration-150 cursor-pointer active:scale-95 bg-slate-100 text-[#1C1C1E] hover:bg-slate-200/80 border border-slate-200/80"
              >
                <MenuIcon className="w-3.5 h-3.5 text-[#1C3460]" aria-hidden="true" />
                <span>Menu</span>
              </button>
              
              <div className="h-4 w-px mx-1 bg-slate-200" />
              
              <nav className="flex items-center space-x-1">
                {navLinks.slice(0, 4).map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-700 hover:text-[#1C3460] hover:bg-slate-100 transition-[color,background-color,transform] duration-150 active:scale-95"
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
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/85 backdrop-blur-md border border-slate-200/90 text-slate-700 hover:text-[#1C3460] hover:bg-white hover:border-slate-300 transition-[background-color,border-color,color,transform] duration-150 cursor-pointer active:scale-90 shadow-xs"
                title="How Care Works"
                aria-label="How Care Works"
              >
                <ArrowUpRight className="w-4 h-4 text-[#1C3460]" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onOpenAppointment}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#1C3460] text-white font-medium text-xs sm:text-sm tracking-tight hover:bg-[#152A52] active:scale-95 transition-[background-color,transform,box-shadow] duration-150 shadow-[0_2px_10px_rgba(28,52,96,0.22)] cursor-pointer"
              >
                <span>Book Appointment</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-full bg-white/85 backdrop-blur-md border border-slate-200 text-slate-800 hover:bg-white transition-[background-color,transform] duration-150 cursor-pointer active:scale-90 shadow-xs"
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
        <div className="fixed inset-0 z-40 flex items-start justify-center pt-24 px-4 bg-black/40 backdrop-blur-md">
          <div className="w-full max-w-xl bg-white/95 backdrop-blur-2xl text-[#1C1C1E] rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="font-anton uppercase tracking-widest text-xs text-[#DC2626]">
                DIRECT NAVIGATION
              </span>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-[#1C1C1E] hover:bg-slate-100 active:scale-90 transition-[background-color,transform] duration-150 cursor-pointer"
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
                  className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 active:scale-[0.98] border border-slate-200/60 transition-[background-color,transform] duration-150"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#1C3460] font-label font-bold">0{idx + 1}</span>
                    <span className="font-medium text-sm text-slate-800 group-hover:text-[#1C3460] group-hover:translate-x-1 transition-[color,transform]">
                      {link.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#1C3460] transition-colors" aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#DC2626]" aria-hidden="true" />
                <span className="font-medium">Hotline: +92 51 111 475 475</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#1C3460]" aria-hidden="true" />
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

