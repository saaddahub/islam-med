export interface SubService {
  number: string;
  name: string;
  detail: string;
}

export interface Department {
  id: string;
  number: string;
  name: string;
  shortDesc: string;
  services: SubService[];
  leadDoctor: string;
  stat: string;
}

export const DEPARTMENTS: Department[] = [
  {
    id: "diagnostics",
    number: "01.",
    name: "Diagnostics & Imaging",
    shortDesc: "High-precision laboratory pathology, 3T MRI, 128-slice CT, and molecular diagnostics designed for prompt, definitive answers.",
    services: [
      {
        number: "01",
        name: "3T High-Field MRI & CT Scans",
        detail: "Ultra-high resolution neuro, musculoskeletal, and cardiac imaging with AI-enhanced reconstruction.",
      },
      {
        number: "02",
        name: "Automated Clinical Pathology",
        detail: "Fully automated biochemistry, hematology, and genomic markers with same-day digital portal results.",
      },
      {
        number: "03",
        name: "Comprehensive Preventive Screening",
        detail: "Tailored executive health audits and early biomarker risk detection packages.",
      },
    ],
    leadDoctor: "Dr. Hamza Malik",
    stat: "99.8% Diagnostic Accuracy",
  },
  {
    id: "treatment",
    number: "02.",
    name: "Advanced Surgery & Treatment",
    shortDesc: "Minimally invasive laparoscopic, robotic-assisted surgical theatres, and evidence-based clinical protocols.",
    services: [
      {
        number: "01",
        name: "Robotic-Assisted Microsurgery",
        detail: "Sub-millimeter precision for urological, gynecological, and gastrointestinal procedures with reduced downtime.",
      },
      {
        number: "02",
        name: "Interventional Cardiology Suites",
        detail: "Continuous digital catheterization lab for immediate angiography, stenting, and pacemaker implants.",
      },
      {
        number: "03",
        name: "Orthopedic Joint Reconstruction",
        detail: "Computer-navigated total hip & knee replacements with rapid recovery rehabilitation pathways.",
      },
    ],
    leadDoctor: "Dr. Alice Toschi",
    stat: "14,820 Successful Procedures",
  },
  {
    id: "recovery",
    number: "03.",
    name: "Recovery & Post-Operative Care",
    shortDesc: "Private acoustic suites, continuous vital monitoring, and personalized multi-disciplinary physiotherapy regimens.",
    services: [
      {
        number: "01",
        name: "Acoustic Private Recovery Suites",
        detail: "Circadian-tuned lighting, private HEPA filtration, and dedicated nursing care for peaceful convalescence.",
      },
      {
        number: "02",
        name: "Targeted Physical Rehabilitation",
        detail: "Hydrotherapy, gait training, and personalized kinesiology plans guided by clinical physiotherapists.",
      },
      {
        number: "03",
        name: "Digital Post-Discharge Tele-monitoring",
        detail: "Remote biometric tracking and daily physician check-ins directly through the patient mobile app.",
      },
    ],
    leadDoctor: "Dr. Elena Rostova",
    stat: "99.4% Recovery Satisfaction",
  },
  {
    id: "emergency",
    number: "04.",
    name: "Emergency & Trauma Center",
    shortDesc: "Level-1 emergency bay, rapid triage, and on-call trauma teams ready to deploy within 90 seconds.",
    services: [
      {
        number: "01",
        name: "Rapid Resuscitation Bay",
        detail: "Immediate life-support triage equipped with point-of-care ultrasound and advanced ventilators.",
      },
      {
        number: "02",
        name: "Acute Stroke & Cardiac Fast-Track",
        detail: "Immediate code-STEMI catheterization and thrombolysis pathways without waiting room delays.",
      },
      {
        number: "03",
        name: "Mobile Critical Care Fleet",
        detail: "ICU-equipped ambulances staffed by certified emergency paramedics and tele-linked to trauma specialists.",
      },
    ],
    leadDoctor: "Dr. Marcus Vance",
    stat: "< 90 Sec Response Triage",
  },
];
