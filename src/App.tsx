import { useRef, useState } from 'react';
import useLenis from './lib/useLenis';
import { usePageMotion } from './lib/usePageMotion';
import { useCinematicScrollMotion } from './lib/useCinematicScrollMotion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DarkPanelSlide from './components/DarkPanelSlide';
import ServiceAccordion from './components/ServiceAccordion';
import DoctorList from './components/DoctorList';
import FacilityReveal from './components/FacilityReveal';
import { StickyImagePairSection } from './components/StickyImagePairSection';
import HowItWorksSticky from './components/HowItWorksSticky';
import FounderSpotlight from './components/FounderSpotlight';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import DoctorProfileModal from './components/DoctorProfileModal';
import type { Doctor } from './data/doctors';

export function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  useLenis();
  usePageMotion();
  useCinematicScrollMotion(rootRef);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const openAppointment = () => {
    setSelectedDoctor(null);
    setIsAppointmentOpen(true);
  };

  return (
    <div id="top" ref={rootRef} className="min-h-screen bg-[#F5F3EF] text-[#1C1C1E] flex flex-col selection:bg-[#1C3460] selection:text-white">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar onOpenAppointment={openAppointment} />
      <main id="main-content" tabIndex={-1}>
      <Hero onOpenAppointment={openAppointment} />
      <DarkPanelSlide />
      <ServiceAccordion onOpenAppointment={openAppointment} />
      <FacilityReveal />
      <DoctorList onSelectDoctor={setSelectedDoctor} onOpenAppointment={openAppointment} />
      <StickyImagePairSection />
      <HowItWorksSticky onOpenAppointment={openAppointment} />
      <FounderSpotlight onOpenAppointment={openAppointment} />
      </main>
      <Footer onOpenAppointment={openAppointment} />
      <AppointmentModal isOpen={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} />
      <DoctorProfileModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBookWithDoctor={openAppointment}
      />
    </div>
  );
}

export default App;

