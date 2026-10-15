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

// Content source: IMC Department details.docx. OPD and internal medicine share
// one chapter so the established four-stage scroll sequence stays intact.
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
    id: 'internal-medicine',
    number: '03.',
    name: 'OPD & Internal Medicine',
    shortDesc: 'Outpatient assessment, treatment and referral, alongside adult preventive care and management of chronic or complex conditions affecting more than one organ system.',
    services: [
      {
        number: '01',
        name: 'Outpatient Consultations',
        detail: 'Screening, examination, treatment and referral to medical or surgical specialists, with reception support from morning to late evening.',
      },
      {
        number: '02',
        name: 'Adult & Chronic-Condition Care',
        detail: 'Assessment and management of adult health concerns, including diabetes, hypertension, asthma and other long-term conditions.',
      },
      {
        number: '03',
        name: 'Prevention & Coordinated Care',
        detail: 'Preventive care, assessment of recurring symptoms and coordination with other specialties for complex or multi-system illnesses.',
      },
    ],
    careTeam: 'Outpatient & adult medicine',
    stat: 'Morning to Late Evening Clinics',
  },
  {
    id: 'laboratory',
    number: '04.',
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
