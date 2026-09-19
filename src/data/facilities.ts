export interface FacilityFeature {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  image: string;
  specs: string[];
}

export const FACILITIES_DATA = {
  heroImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600",
  cornerImageLeft: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=900",
  cornerImageRight: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=900",
  
  features: [
    {
      id: "suites",
      title: "Private Recovery Suites",
      subtitle: "Quiet, comfortable rooms designed for healing.",
      tag: "INPATIENT WELLNESS",
      description: "Acoustically isolated suites equipped with dynamic circadian lighting, HEPA-filtered clean air circulation, and ergonomic guest rest accommodations.",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=1200",
      specs: ["Single-Occupancy Ensuite", "Circadian Smart Lighting", "Dedicated Nurse Call System"],
    },
    {
      id: "theatres",
      title: "Robotic Surgical Suites",
      subtitle: "Sub-millimeter precision engineering.",
      tag: "ADVANCED THEATRES",
      description: "State-of-the-art laminar air-flow surgical suites integrated with 4K 3D robotic visualization systems and zero-latency interventional telemetry.",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000",
      specs: ["Laminar Flow ISO-5 Air", "Robotic Tele-Navigation", "Intra-operative Imaging"],
    },
    {
      id: "diagnostics",
      title: "Molecular Imaging Lounge",
      subtitle: "Comfort-centered high field imaging.",
      tag: "DIAGNOSTIC SUITE",
      description: "Wide-bore 3T MRI systems with soothing ambient projection ceilings designed to eliminate claustrophobia while delivering sub-millimeter scans.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000",
      specs: ["Wide-Bore 70cm Gantry", "Ambient Light & Audio", "Same-Day AI Analysis"],
    },
  ],
};
