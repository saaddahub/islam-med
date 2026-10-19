import type { Department } from './departments';

export interface DepartmentSection { title: string; paragraphs?: string[]; items?: string[]; }

// Availability: owner's October 2026 department/service list; established IMC
// details retained where relevant. New copy describes specialty scope, not
// unconfirmed equipment, qualifications, procedures or results.
// Terminology references:
// https://www.nhs.uk/tests-and-treatments/electrocardiogram/
// https://www.nhs.uk/tests-and-treatments/physiotherapy/
// https://www.nhs.uk/pregnancy/your-pregnancy-care/ultrasound-scans/
// https://www.hdft.nhs.uk/listening-to-your-babys-heartbeat/
const CARE_DETAILS: Record<string, DepartmentSection[]> = {
  "department-gynecology": [
    {
      "title": "Women’s health, with personal attention",
      "paragraphs": [
        "Gynecology focuses on reproductive health outside pregnancy. A private consultation provides time to discuss symptoms, medical history and the assessment or care appropriate for you."
      ]
    },
    {
      "title": "Concerns you can discuss",
      "items": [
        "Irregular, heavy or painful menstrual periods",
        "Pelvic pain and discomfort",
        "Polycystic ovary syndrome, fibroids and ovarian cysts",
        "Fertility and reproductive-health questions",
        "Hormonal changes and menopausal symptoms"
      ]
    },
    {
      "title": "Reproductive health & conditions",
      "paragraphs": [
        "The department assesses and treats a range of gynecological and reproductive-health concerns."
      ],
      "items": [
        "Menstrual disorders, including heavy bleeding, irregular periods and painful cycles",
        "Polycystic ovary syndrome (PCOS)",
        "Uterine fibroids, polyps and ovarian cysts",
        "Endometriosis and pelvic pain",
        "Infections and pelvic inflammatory disease (PID)",
        "Infertility, reproductive challenges and recurrent miscarriage",
        "Hormonal disorders affecting menstruation or menopause",
        "Uterine, cervical and ovarian cancers"
      ]
    },
    {
      "title": "Planning your visit",
      "paragraphs": [
        "The original IMC department information also includes infertility treatment and gynecological procedures. Ask reception to confirm the appropriate consultation."
      ]
    }
  ],
  "department-obstetrics": [
    {
      "title": "Care through your pregnancy",
      "paragraphs": [
        "Obstetrics focuses on pregnancy, childbirth and the period after birth. Antenatal consultations bring your medical history, pregnancy progress and questions together to help plan your care."
      ]
    },
    {
      "title": "Pregnancy, childbirth & beyond",
      "paragraphs": [
        "The health of mother and baby is central to the department. Services include antenatal care, genetic carrier testing, diagnosis and comprehensive management of high-risk pregnancies.",
        "Counselling is available for pregnancies complicated by fetal abnormalities, including growth disorders, inherited diseases and structural malformations."
      ]
    },
    {
      "title": "Maternity consultations",
      "items": [
        "Antenatal assessment and pregnancy follow-up",
        "High-risk pregnancy assessment and care planning",
        "Discussion of requested scans and prenatal screening",
        "Birth planning and coordination with Labour & Delivery",
        "Postnatal follow-up and maternal recovery"
      ]
    },
    {
      "title": "Planning your visit",
      "paragraphs": [
        "Bring your maternity records and previous scan reports. The maternity team will discuss the assessment, screening or monitoring relevant to your pregnancy."
      ]
    }
  ],
  "department-pediatrics": [
    {
      "title": "Care for children & their families",
      "paragraphs": [
        "The Pediatrics Department provides care for newborns, children and adolescents. Clear communication with parents and caregivers helps the clinician understand a child’s symptoms and plan the next step."
      ]
    },
    {
      "title": "Areas of consultation",
      "items": [
        "Newborn and infant health concerns",
        "Childhood symptoms and recurring illnesses",
        "Growth, nutrition and developmental questions",
        "Adolescent health and ongoing care",
        "Follow-up and referral when another specialty is needed"
      ]
    },
    {
      "title": "Areas of pediatric care",
      "items": [
        "Newborn, infant, child and adolescent health",
        "Heart and lung conditions (cardiopulmonary medicine)",
        "Brain, spinal cord and nerve conditions (neuroscience)",
        "Nutrition and healthy diet",
        "Endocrine glands and metabolism",
        "Immune-system conditions",
        "Kidney conditions"
      ]
    },
    {
      "title": "A family-centred approach",
      "paragraphs": [
        "The department brings together pediatric and adolescent medicine, patient care, clinical technology and advocacy for children. Both inpatient and outpatient care are available, with attention to the needs of children, families and the wider community."
      ]
    },
    {
      "title": "Planning your visit",
      "paragraphs": [
        "Bring previous reports, your child’s health or immunisation record, and details of current medicines."
      ]
    }
  ],
  "department-dermatology": [
    {
      "title": "Understanding your skin concerns",
      "paragraphs": [
        "Dermatology focuses on conditions affecting the skin, hair and nails. A consultation allows your clinician to examine the concern, review its history and explain possible next steps."
      ]
    },
    {
      "title": "What to discuss",
      "items": [
        "Acne and persistent skin changes",
        "Rashes, itching and irritation",
        "Eczema and other ongoing skin concerns",
        "Hair and scalp concerns",
        "Nail changes and follow-up questions"
      ]
    }
  ],
  "department-orthopedics": [
    {
      "title": "Support for musculoskeletal health",
      "paragraphs": [
        "Orthopedics focuses on bones, joints and the surrounding muscles, tendons and ligaments. Assessment looks at how symptoms affect movement and daily activities."
      ]
    },
    {
      "title": "Areas of assessment",
      "items": [
        "Joint pain, stiffness and reduced movement",
        "Bone and soft-tissue injuries",
        "Back, neck and limb concerns",
        "Persistent muscle or tendon symptoms",
        "Recovery planning and rehabilitation needs"
      ]
    }
  ],
  "department-gastroenterology": [
    {
      "title": "Care for digestive health",
      "paragraphs": [
        "Gastroenterology focuses on the digestive system, including the stomach, intestines and associated organs. Consultations consider symptoms, medical history and previous investigations."
      ]
    },
    {
      "title": "Concerns you can discuss",
      "items": [
        "Ongoing abdominal discomfort",
        "Acid reflux and indigestion",
        "Changes in bowel habits",
        "Persistent bloating and digestive symptoms",
        "Questions about existing digestive or liver conditions"
      ]
    }
  ],
  "department-ultrasound": [
    {
      "title": "Imaging guided by your clinical needs",
      "paragraphs": [
        "Diagnostic ultrasound uses sound waves to create images inside the body. It can support maternity assessment and other investigations requested by your clinician."
      ]
    },
    {
      "title": "Planning your scan",
      "items": [
        "Confirm the scan requested on your referral",
        "Ask reception about availability and any preparation",
        "Bring your referral and earlier scan reports",
        "Discuss how the report will reach your treating clinician"
      ]
    },
    {
      "title": "Ultrasound & prenatal testing",
      "items": [
        "Antepartum scans in the first, second and third trimesters",
        "Down syndrome screening and Harmony testing",
        "Chorionic villus sampling (CVS) and amniocentesis",
        "Intrauterine blood transfusion",
        "Fetal echocardiography (Fetal ECHO)",
        "3D/4D ultrasound",
        "Ultrasound-guided procedures"
      ]
    }
  ],
  "department-labour-delivery": [
    {
      "title": "Care through labour & birth",
      "paragraphs": [
        "The Labour & Delivery team supports maternity care during birth and early recovery, working with obstetric care to respond to the needs of mother and baby."
      ]
    },
    {
      "title": "Your maternity journey",
      "items": [
        "Assessment on arrival and review of maternity records",
        "Maternal and fetal monitoring as clinically indicated",
        "Care during labour and delivery",
        "Coordination with the obstetric team",
        "Early postnatal care and follow-up planning"
      ]
    },
    {
      "title": "Planning your visit",
      "paragraphs": [
        "Discuss birth planning and admission arrangements with the maternity team. The original IMC information includes normal, assisted and caesarean delivery; the clinical team advises on appropriate care."
      ]
    }
  ],
  "department-general-medicine": [
    {
      "title": "A starting point for your health concerns",
      "paragraphs": [
        "A general physician assesses everyday symptoms, ongoing health questions and conditions that may need further investigation. Care can be coordinated with other specialties when needed."
      ]
    },
    {
      "title": "General physician consultations",
      "items": [
        "New or recurring symptoms",
        "General health and preventive-care questions",
        "Follow-up for ongoing medical conditions",
        "Review of existing reports and medicines",
        "Coordination of tests or specialist referrals"
      ]
    },
    {
      "title": "Respiratory & cardiac conditions",
      "items": [
        "Asthma, pneumonia and chronic obstructive pulmonary disease (COPD)",
        "Upper respiratory complications",
        "Heart failure and ischemic heart disease (IHD)",
        "Acute coronary syndrome",
        "Valvular heart disease and heart-rhythm abnormalities"
      ]
    },
    {
      "title": "Chronic & multi-system health concerns",
      "items": [
        "Hypertension and its complications",
        "Diabetes and its complications",
        "Fatigue and endocrine disorders",
        "Stroke, headache, central nervous system (CNS) infections and neurological disorders",
        "Degenerative bone disease, arthritis, joint and rheumatic disorders",
        "Acute and chronic kidney infections",
        "Renal disease affecting the kidneys and urinary tract",
        "Gastrointestinal conditions, including Crohn’s disease, GERD and irritable bowel syndrome"
      ]
    }
  ],
  "department-physiotherapy": [
    {
      "title": "Movement with a clear purpose",
      "paragraphs": [
        "Physiotherapy supports movement and daily function following injury, illness or persistent symptoms. Assessment considers how you move, the activities that matter to you and your recovery goals."
      ]
    },
    {
      "title": "Rehabilitation planning",
      "items": [
        "Assessment of movement, strength and function",
        "Discussion of pain and activity limitations",
        "An individual exercise and rehabilitation plan",
        "Guidance on daily activities and recovery goals",
        "Progress reviews and coordination with your clinician"
      ]
    },
    {
      "title": "Planning your visit",
      "paragraphs": [
        "Bring relevant medical reports and details of previous treatment. Wear clothing that allows comfortable movement; your physiotherapist will explain the assessment."
      ]
    }
  ],
  "service-ultrasound": [
    {
      "title": "About ultrasound",
      "paragraphs": [
        "Ultrasound uses high-frequency sound waves to create images inside the body. The examination depends on the reason your clinician has requested it."
      ]
    },
    {
      "title": "Before your appointment",
      "items": [
        "Confirm the scan type and availability with reception",
        "Ask whether your particular scan requires preparation",
        "Bring your referral and previous reports",
        "Ask how and when your report will be provided"
      ]
    }
  ],
  "service-outpatients": [
    {
      "title": "Your starting point for care",
      "paragraphs": [
        "The Outpatient Department (OPD) supports consultations and assessment without an overnight admission. Reception helps you find the relevant clinic and confirm your consultant’s availability."
      ]
    },
    {
      "title": "During your visit",
      "items": [
        "Reception and clinic guidance",
        "Medical history and clinical assessment",
        "Discussion of requested tests or treatment",
        "Referral or follow-up arrangements when needed"
      ]
    },
    {
      "title": "Planning your visit",
      "paragraphs": [
        "IMC consultant clinics run from morning to late evening. Call reception to confirm your consultant’s clinic time before visiting."
      ]
    }
  ],
  "service-ctg": [
    {
      "title": "What cardiotocography records",
      "paragraphs": [
        "Cardiotocography (CTG) records the baby’s heart rate and uterine contractions. The maternity team may recommend it during pregnancy or labour based on the clinical situation."
      ]
    },
    {
      "title": "Your appointment",
      "items": [
        "The maternity team explains why monitoring is recommended",
        "Sensors are used to obtain the recordings",
        "The trace is reviewed alongside the wider clinical assessment",
        "Monitoring arrangements are individual to your care"
      ]
    }
  ],
  "service-ecg": [
    {
      "title": "What an ECG records",
      "paragraphs": [
        "Electrocardiography produces an electrocardiogram (ECG): a recording of the heart’s electrical activity, including its rate and rhythm. A clinician may request it as part of an assessment."
      ]
    },
    {
      "title": "About the test",
      "items": [
        "Sensors placed on the skin record the electrical signals",
        "The recording is reviewed by a clinician",
        "Results are considered alongside symptoms and medical history"
      ]
    }
  ],
  "service-emergency": [
    {
      "title": "Urgent assessment & coordination",
      "paragraphs": [
        "Emergency care provides a point of contact for urgent assessment and coordination with the relevant team. IMC’s supplied information confirms 24/7 gynecological emergency care."
      ]
    },
    {
      "title": "When you arrive",
      "items": [
        "Tell reception or clinical staff that your concern is urgent",
        "Share symptoms and relevant medical or maternity history",
        "Bring existing records if they are readily available",
        "The team advises on assessment, further care or referral"
      ]
    },
    {
      "title": "Planning your visit",
      "paragraphs": [
        "For emergency availability outside gynecological care, ask reception about the team and service relevant to your concern."
      ]
    }
  ],
  "service-pharmacy": [
    {
      "title": "Prescription & medicine support",
      "paragraphs": [
        "The on-site pharmacy supports patients with prescribed medicines and the information supplied with them. Confirm availability of your required medicine with the pharmacy team."
      ]
    },
    {
      "title": "At the pharmacy",
      "items": [
        "Bring your current prescription",
        "Ask about medicine availability",
        "Check the instructions provided with your medicine",
        "Raise prescription questions with the pharmacist or prescribing clinician"
      ]
    }
  ],
  "service-laboratory": [
    {
      "title": "Testing to support your care",
      "paragraphs": [
        "Laboratory investigations help clinicians assess symptoms, plan treatment and monitor ongoing conditions. The tests requested depend on the individual clinical assessment."
      ]
    },
    {
      "title": "Arranging a test",
      "items": [
        "Confirm the requested test is available",
        "Ask whether preparation is required for your specific test",
        "Bring the request and relevant previous reports",
        "Confirm how and when results will be provided"
      ]
    }
  ]
};

export const getCareDetails = (entry: Department) => CARE_DETAILS[`${entry.kind}-${entry.id}`] || [];
