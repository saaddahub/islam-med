export interface CarePackage {
  id: string;
  badge: string;
  isFeatured: boolean;
  image: string;
  title: string;
  description: string;
  price: string;
  period: string;
  stats: {
    icon: "slot" | "clock" | "shield";
    label: string;
  }[];
  department: string;
}

export const CARE_PACKAGES: CarePackage[] = [
  {
    id: "executive-health",
    badge: "Available Today",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    title: "Executive Preventive Audit",
    description: "Multi-system biochemical, cardiac stress, and 3T MRI whole-body assessment completed in a single afternoon.",
    price: "$450",
    period: "full comprehensive assessment",
    stats: [
      { icon: "slot", label: "Same-day slots" },
      { icon: "clock", label: "3.5 hrs duration" },
      { icon: "shield", label: "Insurance accepted" },
    ],
    department: "Diagnostics",
  },
  {
    id: "comprehensive-cardiology",
    badge: "Most Requested",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    title: "Cardiovascular Care Suite",
    description: "Direct access to top interventional cardiologists, advanced echocardiography, calcium scoring, and continuous tele-triage.",
    price: "$280",
    period: "initial consultation & diagnostics",
    stats: [
      { icon: "slot", label: "Priority booking" },
      { icon: "clock", label: "45 min consultation" },
      { icon: "shield", label: "Full coverage eligible" },
    ],
    department: "Cardiology",
  },
  {
    id: "ortho-joint-recovery",
    badge: "Available Today",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    title: "Robotic Joint & Spine Clinic",
    description: "Specialized kinematic mobility diagnosis, robotic surgery planning, and structured rapid-recovery rehabilitation.",
    price: "$320",
    period: "evaluation & kinematic scan",
    stats: [
      { icon: "slot", label: "Same-day consults" },
      { icon: "clock", label: "40 min visit" },
      { icon: "shield", label: "Major plans honored" },
    ],
    department: "Orthopedics",
  },
];
