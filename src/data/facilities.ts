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
  features: [
    {
      id: 'outpatient',
      title: 'Outpatient Reception',
      subtitle: 'A clear starting point for your visit.',
      tag: 'RECEPTION & OPD',
      description: 'Reception counters provide information and assistance, helping patients reach the appropriate clinic with attention to privacy, dignity and comfort.',
      image: '/directory-corridor.jpg',
      specs: ['Clinic Information', 'Patient Assistance', 'Medical & Surgical Referrals'],
    },
    {
      id: 'family-care',
      title: 'Women’s & Children’s Care',
      subtitle: 'Care through pregnancy, birth and childhood.',
      tag: 'MATERNITY & PEDIATRICS',
      description: 'Gynecology, obstetrics and pediatric services support women, newborns, children and families through outpatient and inpatient care.',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000',
      specs: ['Pregnancy & Delivery', 'Gynecological Procedures', 'Pediatric Consultations'],
    },
    {
      id: 'clinical-care',
      title: 'Consultations & Testing',
      subtitle: 'Clinical assessment supported by laboratory services.',
      tag: 'ADULT CARE & LABORATORY',
      description: 'Outpatient and internal medicine consultations work alongside laboratory testing to support assessment, treatment and ongoing care.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
      specs: ['Adult Medicine', 'Preventive Care', 'Laboratory Testing'],
    },
  ],
};
