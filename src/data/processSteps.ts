export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  highlight: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Find your care',
    description: "Explore women's health, pediatrics, outpatient and internal medicine, or laboratory services to find the care you need.",
    highlight: 'Reception can help you choose the appropriate department.',
  },
  {
    step: '02',
    title: 'Arrange your visit',
    description: 'Call reception to confirm your consultant, clinic timings and any information to bring to your appointment.',
    highlight: 'Visit Islam Medical Complex in Sabzazar, Lahore.',
  },
  {
    step: '03',
    title: 'Meet your clinician',
    description: 'Your clinician will assess your concerns and discuss treatment, relevant tests or referral to another specialist.',
    highlight: 'Care with attention to privacy, dignity and clear communication.',
  },
  {
    step: '04',
    title: 'Plan the next step',
    description: 'Discuss your treatment plan, recommended investigations and any follow-up arrangements with your clinical team.',
    highlight: 'Contact reception for help arranging a return visit.',
  },
];
