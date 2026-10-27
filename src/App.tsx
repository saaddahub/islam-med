import { useEffect, useRef, useState } from 'react';
import useLenis from './lib/useLenis';
import { usePageMotion } from './lib/usePageMotion';
import { useCinematicScrollMotion } from './lib/useCinematicScrollMotion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DepartmentsOverview from './components/DepartmentsOverview';
import DoctorList from './components/DoctorList';
import FacilityReveal from './components/FacilityReveal';
import { StickyImagePairSection } from './components/StickyImagePairSection';
import HowItWorksSticky from './components/HowItWorksSticky';
import FounderSpotlight from './components/FounderSpotlight';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import DoctorProfileModal from './components/DoctorProfileModal';
import type { Doctor } from './data/doctors';
import { findCareEntry } from './data/departments';
import DepartmentPage from './components/DepartmentPage';
import { useStartupReady } from './lib/useStartupReady';
import { useContent } from './content/context';

function LandingPage({ onOpenAppointment, onSelectDoctor }: { onOpenAppointment: () => void; onSelectDoctor: (doctor: Doctor) => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  usePageMotion();
  useCinematicScrollMotion(rootRef);
  return <div ref={rootRef}>
    <Hero onOpenAppointment={onOpenAppointment} />
    <DepartmentsOverview onOpenAppointment={onOpenAppointment} />
    <FacilityReveal />
    <DoctorList onSelectDoctor={onSelectDoctor} onOpenAppointment={onOpenAppointment} />
    <StickyImagePairSection />
    <HowItWorksSticky onOpenAppointment={onOpenAppointment} />
    <FounderSpotlight onOpenAppointment={onOpenAppointment} />
  </div>;
}

export function App() {
  const content = useContent();
  const [hash, setHash] = useState(() => location.hash);
  const route = findCareEntry(hash);
  const department = route && [...content.departments, ...content.services].find(entry => entry.id === route.id && entry.kind === route.kind);
  // Remount scroll smoothing with each reading view, clearing any old scroll momentum.
  useLenis(department ? `${department.kind}-${department.id}` : undefined);
  useStartupReady();
  useEffect(() => {
    const update = () => setHash(location.hash);
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (department) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.getElementById('department-title')?.focus({ preventScroll: true });
      } else if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const target = document.getElementById(location.hash.slice(1) || 'top');
        target?.scrollIntoView({ behavior: 'instant' });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [department]);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const openAppointment = () => {
    setSelectedDoctor(null);
    setIsAppointmentOpen(true);
  };

  return (
    <div id="top" className="min-h-screen bg-imc-paper text-imc-ink flex flex-col selection:bg-imc-blue selection:text-white">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar onOpenAppointment={openAppointment} />
      <main id="main-content" tabIndex={-1}>
      {department
        ? <DepartmentPage key={`${department.kind}-${department.id}`} department={department} onOpenAppointment={openAppointment} />
        : <LandingPage onOpenAppointment={openAppointment} onSelectDoctor={setSelectedDoctor} />}
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

