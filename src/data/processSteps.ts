export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  badge: string;
  bgVariant: "lavender" | "pink";
  highlight: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Find your doctor",
    description: "Browse certified departmental specialists by clinical focus, credentials, patient ratings, and available same-day calendar slots.",
    badge: "Specialist Matching",
    bgVariant: "lavender",
    highlight: "Direct access to 24+ top consultants with verified credentials.",
  },
  {
    step: "02",
    title: "Book your visit",
    description: "Choose an in-person acoustic suite consult or secure digital video triage with instant SMS and calendar sync.",
    badge: "Zero Waiting Room Queue",
    bgVariant: "pink",
    highlight: "Guaranteed on-time entry with pre-arrival digital check-in.",
  },
  {
    step: "03",
    title: "Get personalized care",
    description: "Experience thorough 30–45 minute clinical examinations with on-site high-field imaging and bespoke recovery roadmaps.",
    badge: "Comprehensive Exam",
    bgVariant: "lavender",
    highlight: "Integrated multidisciplinary consults under one roof.",
  },
  {
    step: "04",
    title: "Follow-up made easy",
    description: "Access lab reports, prescription refills, and continuous physician direct-messaging on your patient portal anytime.",
    badge: "Continuous Convalescence",
    bgVariant: "pink",
    highlight: "Proactive health monitoring with automated status check-ins.",
  },
];
