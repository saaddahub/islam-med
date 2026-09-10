export interface Doctor {
  id: string;
  name: string;
  department: string;
  yearMeta: string;
  role: string;
  experience: string;
  qualifications: string[];
  bio: string;
  image: string;
  consultationFee: string;
  availability: string[];
  rating: number;
  patientsTreated: string;
}

export const DOCTORS: Doctor[] = [
  {
    id: "dr-alice-toschi",
    name: "DR. ALICE TOSCHI",
    department: "CARDIOLOGY",
    yearMeta: "2026, CARDIOLOGY",
    role: "Chief Interventional Cardiologist",
    experience: "16+ Years Experience",
    qualifications: ["MD, Harvard Medical School", "FACC, Fellow American College of Cardiology", "Fellowship in Transcatheter Valve Therapies"],
    bio: "Pioneering structural heart interventions and minimally invasive transcatheter valve replacements with over a decade of clinical leadership.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
    consultationFee: "$180",
    availability: ["Monday 09:00 AM", "Wednesday 02:00 PM", "Friday 10:30 AM"],
    rating: 4.98,
    patientsTreated: "4,800+",
  },
  {
    id: "dr-marcus-vance",
    name: "DR. MARCUS VANCE",
    department: "NEUROSURGERY",
    yearMeta: "2026, NEUROSURGERY",
    role: "Director of Cranial & Spinal Surgery",
    experience: "19+ Years Experience",
    qualifications: ["MD, Johns Hopkins University", "FRCS (Neurosurgery)", "Specialist in Intraoperative Image-Guided Navigation"],
    bio: "Specializing in complex skull-base tumors, cerebrovascular bypass, and computer-navigated minimally invasive spinal reconstructions.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    consultationFee: "$220",
    availability: ["Tuesday 08:30 AM", "Thursday 01:00 PM", "Saturday 11:00 AM"],
    rating: 4.96,
    patientsTreated: "3,200+",
  },
  {
    id: "dr-elena-rostova",
    name: "DR. ELENA ROSTOVA",
    department: "ORTHOPEDICS",
    yearMeta: "2026, ORTHOPEDICS",
    role: "Senior Consultant Orthopedic Surgeon",
    experience: "14+ Years Experience",
    qualifications: ["MD, Oxford University Clinical School", "Board Certified Orthopedic Surgery", "Sub-specialty in Robotic Joint Arthroplasty"],
    bio: "Internationally renowned for kinematics-aligned robotic knee and hip replacements that restore rapid, pain-free athletic mobility.",
    image: "https://images.unsplash.com/photo-1594824813590-4824d56417fa?auto=format&fit=crop&q=80&w=800",
    consultationFee: "$195",
    availability: ["Monday 01:00 PM", "Wednesday 09:30 AM", "Thursday 03:00 PM"],
    rating: 4.99,
    patientsTreated: "5,100+",
  },
  {
    id: "dr-hamza-malik",
    name: "DR. HAMZA MALIK",
    department: "DIAGNOSTIC RADIOLOGY",
    yearMeta: "2026, RADIOLOGY",
    role: "Head of Advanced Imaging & MRI",
    experience: "15+ Years Experience",
    qualifications: ["MD, Karolinska Institute", "Fellowship in Musculoskeletal & Neuro-Radiology", "AI-Diagnostic Research Lead"],
    bio: "Spearheading early multi-parametric oncological screening, high-field MRI interpretation, and ultra-low-dose computed tomography protocols.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800",
    consultationFee: "$160",
    availability: ["Monday 11:00 AM", "Tuesday 02:30 PM", "Friday 09:00 AM"],
    rating: 4.95,
    patientsTreated: "8,900+",
  },
  {
    id: "dr-sophia-chen",
    name: "DR. SOPHIA CHEN",
    department: "ONCOLOGY & GENOMICS",
    yearMeta: "2026, ONCOLOGY",
    role: "Lead Precision Medical Oncologist",
    experience: "12+ Years Experience",
    qualifications: ["MD, Stanford School of Medicine", "PhD in Cancer Genomics", "ESMO Certified Clinical Oncologist"],
    bio: "Focusing on targeted molecular therapies, immunotherapy combinations, and comprehensive genomic profiling for personalized cancer treatment.",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=800",
    consultationFee: "$210",
    availability: ["Wednesday 10:00 AM", "Thursday 02:00 PM", "Friday 01:30 PM"],
    rating: 4.97,
    patientsTreated: "2,600+",
  },
];
