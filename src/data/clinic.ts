export const CLINIC = {
  name: 'Islam Medical Complex',
  area: 'Sabzazar',
  city: 'Lahore',
  location: 'Sabzazar, Lahore',
  address: '154 P Block Rd, Sabzazar Block P, Sabzazar Housing Scheme Phase 1 & 2, Lahore, 54000, Pakistan',
  shortAddress: '154 P Block Rd, Sabzazar, Lahore',
  phone: '+92 321 8410643',
  phoneHref: 'tel:+923218410643',
  email: 'imc.sbz2@gmail.com',
  emailHref: 'mailto:imc.sbz2@gmail.com',
  clinicHours: 'Consultant clinics run from morning to late evening. Call reception to confirm your visit.',
  emergencyCare: '24/7 gynecological emergency care',
} as const;

export const CLINIC_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC.address)}`;
