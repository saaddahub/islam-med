export type ClinicalScene = 'consultation' | 'gynecology' | 'maternity' | 'pediatrics' | 'dermatology' | 'orthopedics' | 'gastroenterology' | 'ultrasound' | 'labour' | 'physiotherapy' | 'ctg' | 'ecg' | 'emergency' | 'pharmacy' | 'laboratory';

export interface Department {
  id: string;
  kind: 'department' | 'service';
  name: string;
  shortDesc: string;
  focus: string;
  illustration: ClinicalScene;
  relatedServices: string[];
}

// Availability comes from the owner's updated list. Descriptions explain each
// field without inventing specialist procedures, equipment, staff or timings.
export const DEPARTMENTS: Department[] = [
  { id: 'gynecology', kind: 'department', name: 'Gynecology', focus: 'Women’s reproductive health', illustration: 'gynecology', relatedServices: ['ultrasound', 'laboratory', 'outpatients'],
    shortDesc: 'Personal, confidential care for menstrual, hormonal and reproductive-health concerns, with assessment and guidance through different stages of life.' },
  { id: 'obstetrics', kind: 'department', name: 'Obstetrics', focus: 'Pregnancy & maternity care', illustration: 'maternity', relatedServices: ['ultrasound', 'ctg', 'emergency'],
    shortDesc: 'Care through pregnancy and after birth, bringing antenatal consultations, assessment and birth planning into one connected maternity journey.' },
  { id: 'pediatrics', kind: 'department', name: 'Pediatrics', focus: 'Newborn, child & adolescent health', illustration: 'pediatrics', relatedServices: ['outpatients', 'laboratory', 'pharmacy'],
    shortDesc: 'Care for newborns, children and adolescents, with attention to everyday health concerns, growth and development, and clear communication with families.' },
  { id: 'dermatology', kind: 'department', name: 'Dermatology', focus: 'Skin, hair & nail health', illustration: 'dermatology', relatedServices: ['outpatients', 'pharmacy', 'laboratory'],
    shortDesc: 'Assessment of skin, hair and nail concerns, from acne and rashes to ongoing irritation, with a care plan shaped around your symptoms.' },
  { id: 'orthopedics', kind: 'department', name: 'Orthopedics', focus: 'Bone, joint & muscle health', illustration: 'orthopedics', relatedServices: ['outpatients', 'pharmacy'],
    shortDesc: 'Assessment of bone, joint and muscle concerns, injuries and movement difficulties, with guidance on treatment, rehabilitation and next steps.' },
  { id: 'gastroenterology', kind: 'department', name: 'Gastroenterology', focus: 'Digestive-system health', illustration: 'gastroenterology', relatedServices: ['ultrasound', 'laboratory', 'outpatients'],
    shortDesc: 'Consultations for digestive concerns affecting the stomach, bowel and related organs, with assessment and an individual plan for investigation or follow-up.' },
  { id: 'ultrasound', kind: 'department', name: 'Diagnostic Ultrasound', focus: 'Imaging to support your care', illustration: 'ultrasound', relatedServices: ['ultrasound', 'outpatients'],
    shortDesc: 'Ultrasound imaging supports pregnancy care and other clinical assessments. The appropriate scan and any preparation are confirmed for your referral.' },
  { id: 'labour-delivery', kind: 'department', name: 'Labour & Delivery', focus: 'Care during birth & early recovery', illustration: 'labour', relatedServices: ['ctg', 'emergency', 'pharmacy'],
    shortDesc: 'Maternity care during labour, delivery and the early period after birth, with attention to the needs, comfort and dignity of mother and baby.' },
  { id: 'general-medicine', kind: 'department', name: 'General Medicine', focus: 'General physician consultations', illustration: 'consultation', relatedServices: ['outpatients', 'ecg', 'laboratory'],
    shortDesc: 'A first point of contact for everyday symptoms, general health questions and ongoing conditions, with referral to another specialty when appropriate.' },
  { id: 'physiotherapy', kind: 'department', name: 'Physiotherapy & Rehabilitation', focus: 'Movement, strength & recovery', illustration: 'physiotherapy', relatedServices: ['outpatients'],
    shortDesc: 'Assessment and rehabilitation focused on movement, strength and daily function, with a plan tailored to your symptoms, abilities and recovery goals.' },
];

export const CLINIC_SERVICES: Department[] = [
  { id: 'ultrasound', kind: 'service', name: 'Ultrasound', focus: 'Diagnostic imaging', illustration: 'ultrasound', relatedServices: ['outpatients'],
    shortDesc: 'Imaging that uses sound waves to create pictures inside the body, helping your clinician assess a pregnancy or investigate a health concern.' },
  { id: 'outpatients', kind: 'service', name: 'Outpatient Department (OPD)', focus: 'Consultations without an overnight stay', illustration: 'consultation', relatedServices: ['laboratory', 'pharmacy'],
    shortDesc: 'Reception, consultant appointments and clinical assessment for patients attending the complex without an overnight admission.' },
  { id: 'ctg', kind: 'service', name: 'Cardiotocography (CTG)', focus: 'Fetal-heartbeat & contraction monitoring', illustration: 'ctg', relatedServices: ['ultrasound'],
    shortDesc: 'Monitoring that records a baby’s heart rate and uterine contractions during pregnancy or labour when recommended by the maternity team.' },
  { id: 'ecg', kind: 'service', name: 'Electrocardiography (ECG)', focus: 'Heart-rate & rhythm recording', illustration: 'ecg', relatedServices: ['outpatients', 'laboratory'],
    shortDesc: 'A recording of the heart’s electrical activity that helps your clinician assess its rate and rhythm as part of your care.' },
  { id: 'emergency', kind: 'service', name: 'Emergency Care', focus: 'Urgent assessment & clinical coordination', illustration: 'emergency', relatedServices: ['ultrasound', 'laboratory', 'pharmacy'],
    shortDesc: 'Urgent clinical assessment, with 24/7 gynecological emergency care and coordination with the appropriate team for further care or referral.' },
  { id: 'pharmacy', kind: 'service', name: 'Pharmacy', focus: 'Medicines & prescription support', illustration: 'pharmacy', relatedServices: ['outpatients'],
    shortDesc: 'On-site support with prescribed medicines. Ask the pharmacy team about availability and the instructions supplied with your prescription.' },
  { id: 'laboratory', kind: 'service', name: 'Laboratory Testing', focus: 'Investigations to inform clinical decisions', illustration: 'laboratory', relatedServices: ['outpatients'],
    shortDesc: 'Laboratory investigations support clinical assessment, treatment decisions and monitoring. Confirm your requested test and preparation with reception.' },
];

export const ALL_CARE = [...DEPARTMENTS, ...CLINIC_SERVICES];
export const careHref = (entry: Department) => `#${entry.kind}-${entry.id}`;

const LEGACY_LINKS: Record<string, string> = {
  '#department-outpatients': '#service-outpatients',
  '#department-internal-medicine': '#department-general-medicine',
  '#department-laboratory': '#service-laboratory',
};

export function findCareEntry(hash: string) {
  const target = LEGACY_LINKS[hash] || hash;
  return ALL_CARE.find(entry => careHref(entry) === target);
}
