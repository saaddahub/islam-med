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
  careTeam: string;
  stat: string;
}

// Content source: IMC Department details.docx. Full service information lives
// in departmentDetails.ts; these summaries keep the landing-page chapters readable.
export const DEPARTMENTS: Department[] = [
  {
    id: 'gynecology',
    number: '01.',
    name: 'Gynecology & Obstetrics',
    shortDesc: 'Care for women through pregnancy, childbirth and reproductive health, including high-risk pregnancy management, infertility treatment and 24/7 gynecological emergency care.',
    services: [
      {
        number: '01',
        name: 'Pregnancy & Delivery',
        detail: 'Antenatal and high-risk pregnancy care, normal and forceps delivery, C-sections and neonatal care.',
      },
      {
        number: '02',
        name: 'Gynecology & Infertility',
        detail: 'Minor and major gynecological procedures, minimally invasive laparoscopic surgery, infertility treatment and care for common reproductive-health concerns.',
      },
      {
        number: '03',
        name: 'Ultrasound & Prenatal Assessment',
        detail: 'Trimester scans, 3D/4D ultrasound, fetal ECHO, genetic and prenatal screening, CVS, amniocentesis and ultrasound-guided procedures.',
      },
    ],
    careTeam: "Women's health & maternity care",
    stat: '24/7 Gynecological Emergency',
  },
  {
    id: 'pediatrics',
    number: '02.',
    name: 'Pediatrics',
    shortDesc: 'Primary and subspecialty care for newborns, children and adolescents, with inpatient and outpatient services that include families in the care journey.',
    services: [
      {
        number: '01',
        name: 'Newborn & Child Health',
        detail: 'Assessment, diagnosis and treatment of infant and childhood health concerns, with support for growth and nutrition.',
      },
      {
        number: '02',
        name: 'Pediatric Specialty Care',
        detail: 'Care for conditions affecting the heart, lungs, nervous system, endocrine glands, immune system and kidneys.',
      },
      {
        number: '03',
        name: 'Family-Centered Support',
        detail: 'Inpatient and outpatient clinical care with clear communication and attention to the needs of children and their families.',
      },
    ],
    careTeam: 'Pediatric & adolescent care',
    stat: 'Inpatient & Outpatient Care',
  },
  {
    id: 'outpatients',
    number: '03.',
    name: 'Outpatient Department',
    shortDesc: 'Screening, examination, treatment and referral to the appropriate medical or surgical specialist, with consultant clinics from morning to late evening.',
    services: [
      {
        number: '01',
        name: 'Outpatient Consultations',
        detail: 'Screening, examination, treatment and referral to medical or surgical specialists, with reception support from morning to late evening.',
      },
      {
        number: '02',
        name: 'Reception & Guidance',
        detail: 'Multiple reception counters offer information and assistance, with attention to privacy, dignity, communication and personal comfort.',
      },
      {
        number: '03',
        name: 'Medical & Surgical Clinics',
        detail: 'Consultant clinics cover medical and surgical specialties for both adults and children.',
      },
    ],
    careTeam: 'Outpatient consultations & referrals',
    stat: 'Morning to Late Evening Clinics',
  },
  {
    id: 'internal-medicine',
    number: '04.',
    name: 'Internal Medicine',
    shortDesc: 'Adult primary and preventive care, with diagnosis and treatment of chronic, complex and multi-system illnesses in coordination with other specialties.',
    services: [
      { number: '01', name: 'Adult & Preventive Care', detail: 'Primary care, age-related health concerns and assessment of persistent or recurring symptoms.' },
      { number: '02', name: 'Long-Term Conditions', detail: 'Management of diabetes, hypertension, asthma, cardiac conditions and other chronic illnesses.' },
      { number: '03', name: 'Complex Diagnoses', detail: 'Coordinated care for conditions affecting the lungs, heart, kidneys, digestive system, nervous system and joints.' },
    ],
    careTeam: 'Adult health & coordinated care',
    stat: 'Primary & Preventive Care',
  },
  {
    id: 'laboratory',
    number: '05.',
    name: 'Laboratory Testing',
    shortDesc: 'Diagnostic and laboratory testing supports clinical assessment, diagnosis, treatment decisions and ongoing patient care at Islam Medical Complex.',
    services: [
      {
        number: '01',
        name: 'Diagnostic Testing',
        detail: 'Laboratory investigations that help your clinician understand your health concerns and plan your care.',
      },
      {
        number: '02',
        name: 'Treatment & Monitoring',
        detail: 'Testing to support treatment decisions and the ongoing management of health conditions.',
      },
      {
        number: '03',
        name: 'Test Information',
        detail: 'Contact reception about the required test, any preparation instructions and arrangements for your visit.',
      },
    ],
    careTeam: 'Diagnostic & laboratory services',
    stat: 'Laboratory Test Facility',
  },
];
