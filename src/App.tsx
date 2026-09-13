import { useState } from 'react';
import useLenis from './lib/useLenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DarkPanelSlide from './components/DarkPanelSlide';
import ServiceAccordion from './components/ServiceAccordion';
import DoctorList from './components/DoctorList';
import FacilityReveal from './components/FacilityReveal';
import { StickyImagePairSection } from './components/StickyImagePairSection';
import TiltCardCarousel from './components/TiltCardCarousel';
import HowItWorksSticky from './components/HowItWorksSticky';
import FounderSpotlight from './components/FounderSpotlight';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import DoctorProfileModal from './components/DoctorProfileModal';
import type { Doctor } from './data/doctors';

export function App() {
  useLenis();
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDoctorIdForBooking, setSelectedDoctorIdForBooking] = useState<string | undefined>(undefined);

  const handleOpenAppointment = (doctorId?: string) => {
    setSelectedDoctorIdForBooking(doctorId);
    setIsAppointmentOpen(true);
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="min-h-screen bg-[#F0F4FA] text-[#1C1C1E] flex flex-col selection:bg-[#2563EB] selection:text-white">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* 2. Section 1: Hero (Editorial style with Display Serif, Squiggle, & 3-thumbnail crossfade) */}
      <Hero
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* 3. Section 2: Light -> Dark Panel Slide Transition (Reference A style with Anton Headline) */}
      <DarkPanelSlide />

      {/* 4. Section 3: Sticky Numbered Accordion (01-04 Departments) */}
      <ServiceAccordion
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* 5. Section 4: Doctors List (Consultant roster with hover reveal & cursor tooltip) */}
      <DoctorList
        onSelectDoctor={handleSelectDoctor}
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* 6. Section 5: Layered Photo Reveal Gallery (Peekaboo scroll choreography) */}
      <FacilityReveal
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* 6.5 Sticky Image-Pair Scroll Transition (Solid caption on one side, scrolling image on other side) */}
      <StickyImagePairSection />

      {/* 7. Section 6: Pastel Card Carousel with 3D Tilt Entrance (Reference B "Where care feels personal") */}
      <TiltCardCarousel
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* 8. Section 7: Sticky "How it Works" Process (Reference B sticky 2-column pastel stack) */}
      <HowItWorksSticky
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* 9. Section 8: Founder & CEO Spotlight (Reference A "Hey — I'm Dario" style) */}
      <FounderSpotlight
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* 10. Section 9: Dark Footer with Giant Anton Closing CTA Line */}
      <Footer
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* Interactive Modals */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        selectedDoctorId={selectedDoctorIdForBooking}
      />

      <DoctorProfileModal
        doctor={selectedDoctor}
        isOpen={!!selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBookWithDoctor={(docId) => handleOpenAppointment(docId)}
      />

    </div>
  );
}

export default App;
