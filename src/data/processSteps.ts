export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Find your care',
    description: 'Choose a department, or ask reception to help you find the right care.',
  },
  {
    step: '02',
    title: 'Arrange your visit',
    description: 'Confirm your consultant, clinic time and what to bring with reception.',
  },
  {
    step: '03',
    title: 'Meet your clinician',
    description: 'Discuss your concerns, assessment and treatment with your clinician.',
  },
  {
    step: '04',
    title: 'Plan the next step',
    description: 'Leave with a clear plan for treatment, tests and any follow-up.',
  },
];
