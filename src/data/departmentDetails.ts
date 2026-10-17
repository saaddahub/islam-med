export interface DepartmentSection {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

// Edited from the supplied IMC Department details.docx. Repetition, promotional
// rankings and passages explicitly describing another hospital are omitted.
export const DEPARTMENT_DETAILS: Record<string, DepartmentSection[]> = {
  gynecology: [
    { title: 'Pregnancy, childbirth & beyond', paragraphs: [
      'The health of mother and baby is central to the department. Services include antenatal care, genetic carrier testing, diagnosis and comprehensive management of high-risk pregnancies.',
      'Counselling is available for pregnancies complicated by fetal abnormalities, including growth disorders, inherited diseases and structural malformations.',
    ] },
    { title: 'Obstetric & gynecological services', items: [
      'Minor and major obstetric and gynecological procedures', 'Normal delivery', 'Forceps delivery', 'Caesarean section (C-section)',
      'Minimally invasive gynecological laparoscopic surgery', 'Infertility treatment', 'Neonatal care', '24/7 gynecological emergency care',
    ] },
    { title: 'Ultrasound & prenatal testing', items: [
      'Antepartum scans in the first, second and third trimesters', 'Down syndrome screening and Harmony testing',
      'Chorionic villus sampling (CVS) and amniocentesis', 'Intrauterine blood transfusion', 'Fetal echocardiography (Fetal ECHO)',
      '3D/4D ultrasound', 'Ultrasound-guided procedures',
    ] },
    { title: 'Reproductive health & conditions', paragraphs: ['The department assesses and treats a range of gynecological and reproductive-health concerns.'], items: [
      'Menstrual disorders, including heavy bleeding, irregular periods and painful cycles', 'Polycystic ovary syndrome (PCOS)',
      'Uterine fibroids, polyps and ovarian cysts', 'Endometriosis and pelvic pain', 'Infections and pelvic inflammatory disease (PID)',
      'Infertility, reproductive challenges and recurrent miscarriage', 'Hormonal disorders affecting menstruation or menopause',
      'Uterine, cervical and ovarian cancers',
    ] },
    { title: 'Understanding obstetrics & gynecology', paragraphs: [
      'Obstetrics focuses on pregnancy, childbirth and postpartum care. Gynecology focuses on reproductive health outside pregnancy, including menstrual and hormonal conditions and diseases of the uterus and ovaries.',
      'Together, these specialties provide care across the different stages of women’s reproductive health.',
    ] },
    { title: 'When to arrange a consultation', items: [
      'Irregular or painful menstrual cycles', 'Unexplained pelvic pain or discomfort', 'Questions about fertility or conception',
      'High-risk pregnancy or complications during pregnancy', 'Menopausal symptoms',
    ] },
  ],
  pediatrics: [
    { title: 'Care for children & their families', paragraphs: [
      'The Pediatrics Department provides primary and subspecialty care for newborns, children and adolescents. Family-centred inpatient and outpatient services support children’s health and well-being, involving families in their care.',
      'Pediatric specialists assess, diagnose and manage infant and childhood health concerns, with attention to timely diagnosis and treatment.',
    ] },
    { title: 'Areas of pediatric care', items: [
      'Newborn, infant, child and adolescent health', 'Heart and lung conditions (cardiopulmonary medicine)',
      'Brain, spinal cord and nerve conditions (neuroscience)', 'Nutrition and healthy diet',
      'Endocrine glands and metabolism', 'Immune-system conditions', 'Kidney conditions',
    ] },
    { title: 'A family-centred approach', paragraphs: [
      'The department brings together pediatric and adolescent medicine, patient care, clinical technology and advocacy for children. Both inpatient and outpatient care are available, with attention to the needs of children, families and the wider community.',
    ] },
    { title: 'Training & education', paragraphs: [
      'The facility is recognised by the College of Physicians and Surgeons of Pakistan. The department supports training, education and opportunities for the next generation of pediatric healthcare professionals.',
    ] },
  ],
  outpatients: [
    { title: 'Your starting point for care', paragraphs: [
      'The Outpatient Department (OPD) welcomes patients seeking medical advice and assessment. Patients are screened, examined and treated, or referred to the appropriate medical or surgical specialist.',
    ] },
    { title: 'Reception & assistance', paragraphs: [
      'Multiple service counters provide information and assistance. Reception staff help answer questions and guide visitors to the appropriate clinic, with counters arranged for easy access.',
      'Privacy and dignity, clear communication, cleanliness, comfort and personal attention guide the patient experience from arrival through treatment.',
    ] },
    { title: 'Consultant clinics', paragraphs: [
      'Consultant clinics run from morning until late evening and cover medical and surgical specialties for adults and pediatric patients. The department offers clinical expertise at affordable rates.',
      'Contact reception to confirm your consultant’s availability and clinic timings before visiting.',
    ] },
  ],
  'internal-medicine': [
    { title: 'Primary & preventive care for adults', paragraphs: [
      'Internal medicine focuses on preventing, diagnosing and treating conditions affecting the internal organs. It includes the heart, lungs, liver, gastrointestinal tract, kidneys, urinary tract, brain, spinal column, nerves, muscles and joints.',
      'An internal medicine specialist is trained to manage adult health concerns, long-term conditions and complex diagnostic problems. When several illnesses occur together, specialists coordinate care with other medical disciplines.',
    ] },
    { title: 'Respiratory & cardiac conditions', items: [
      'Asthma, pneumonia and chronic obstructive pulmonary disease (COPD)', 'Upper respiratory complications',
      'Heart failure and ischemic heart disease (IHD)', 'Acute coronary syndrome', 'Valvular heart disease and heart-rhythm abnormalities',
    ] },
    { title: 'Chronic & multi-system health concerns', items: [
      'Hypertension and its complications', 'Diabetes and its complications', 'Fatigue and endocrine disorders',
      'Stroke, headache, central nervous system (CNS) infections and neurological disorders',
      'Degenerative bone disease, arthritis, joint and rheumatic disorders', 'Acute and chronic kidney infections',
      'Renal disease affecting the kidneys and urinary tract', 'Gastrointestinal conditions, including Crohn’s disease, GERD and irritable bowel syndrome',
    ] },
    { title: 'What an internal medicine specialist does', paragraphs: [
      'Internists have broad training in adult diseases and complex or multi-system illness. They manage long-term conditions such as diabetes, hypertension, asthma and heart disease, and work alongside other specialists to provide coordinated care.',
      'Their work includes resolving difficult diagnostic questions, managing severe chronic illness and caring for patients with several simultaneous health concerns.',
    ] },
    { title: 'When to arrange a consultation', paragraphs: [
      'Internal medicine consultations can help with chronic or recurring health concerns, complex diagnoses or several ongoing conditions that need coordinated management. Specialists also provide preventive care and assessment of age-related health concerns.',
    ] },
  ],
  laboratory: [
    { title: 'Testing that informs your care', paragraphs: [
      'Diagnostic and laboratory testing provides information about a patient’s condition and supports diagnosis, treatment and disease management.',
      'Reliable, accurate results help clinicians make treatment decisions and monitor ongoing care. Contact reception for information about a required investigation, preparation instructions and arrangements for your visit.',
    ] },
  ],
};
