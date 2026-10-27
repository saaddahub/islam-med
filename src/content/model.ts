import { CLINIC } from '../data/clinic.ts';
import { DOCTORS } from '../data/doctors.ts';
import { DEPARTMENTS, CLINIC_SERVICES } from '../data/departments.ts';
import { CARE_DETAILS } from '../data/departmentDetails.ts';
import { FACILITIES_DATA } from '../data/facilities.ts';
import { PROCESS_STEPS } from '../data/processSteps.ts';
import { COPY_SCHEMA } from './copy.ts';

export interface GalleryPhoto {
  id: string;
  heading: string;
  image: string;
  thumbnail: string;
  label: string;
  description: string;
}

export const DEFAULT_CONTENT = {
  clinic: { ...CLINIC } as Record<keyof typeof CLINIC, string>,
  doctors: DOCTORS,
  departments: DEPARTMENTS,
  services: CLINIC_SERVICES,
  details: CARE_DETAILS,
  facilities: FACILITIES_DATA.features,
  steps: PROCESS_STEPS,
  gallery: [
    { id: 'reception', heading: '01 / Reception & Wayfinding', image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=90&w=2400', thumbnail: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=90&w=800', label: 'A Clear Start to Your Visit', description: 'Reception staff provide clinic information and help patients reach the appropriate medical or surgical service.' },
    { id: 'womens-health', heading: '02 / Women’s Health', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=90&w=2400', thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=90&w=800', label: 'Gynecological & Obstetric Care', description: 'Pregnancy care, delivery services, gynecological procedures and minimally invasive laparoscopic surgery.' },
    { id: 'clinical-care', heading: '03 / Clinical Care', image: 'https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?auto=format&fit=crop&q=90&w=2400', thumbnail: 'https://images.unsplash.com/photo-1576085898477-1af31ada606a?auto=format&fit=crop&q=90&w=800', label: 'Assessment & Treatment', description: 'Outpatient and internal medicine consultations support assessment, treatment and referral, with laboratory testing when required.' },
    { id: 'patient-comfort', heading: '04 / Patient Comfort', image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=90&w=2400', thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=90&w=800', label: 'Personal Attention & Dignity', description: 'Privacy, clear communication, cleanliness and comfort are central to your visit.' },
  ] as GalleryPhoto[],
  copy: Object.fromEntries(Object.entries(COPY_SCHEMA).map(([section, schema]) => [section,
    Object.fromEntries(Object.entries(schema.fields).map(([key, field]) => [key, field.value])),
  ])) as Record<keyof typeof COPY_SCHEMA, Record<string, string>>,
};

export type SiteContent = typeof DEFAULT_CONTENT;
export interface ContentRecord { content: SiteContent; version: number; updated_at: string | null; }
export const emptyRecord = (): ContentRecord => ({ content: structuredClone(DEFAULT_CONTENT), version: 0, updated_at: null });

export function isImageUrl(value: string) {
  if (/^\/(?!\/)[^\s\\]*$/.test(value)) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password;
  } catch { return false; }
}

// Validate remote content before it reaches links, image sources or public components.
export function validateContent(input: unknown): asserts input is SiteContent {
  if (JSON.stringify(input)?.length > 2_000_000) throw new Error('The draft is too large. Reduce the amount of text.');
  function check(value: unknown, template: unknown, path: string) {
    if (typeof template === 'string') {
      if (typeof value !== 'string' || value.length > 12000) throw new Error(`Check the text in ${path}.`);
      const key = path.split('.').at(-1)!;
      if ((['image', 'thumbnail'].includes(key) || key.startsWith('photograph_')) && !isImageUrl(value)) throw new Error(`Choose an image or use a complete https:// image address in ${path}.`);
      return;
    }
    if (Array.isArray(template)) {
      if (!Array.isArray(value) || value.length > 100) throw new Error(`Check the list in ${path}.`);
      value.forEach((item, index) => check(item, template[0] ?? '', `${path}.${index}`));
      return;
    }
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Check ${path}.`);
    for (const [key, field] of Object.entries(template as object)) {
      // Department prose can use paragraphs, bullet points, or both.
      if ((key === 'paragraphs' || key === 'items') && path.startsWith('content.details.')) continue;
      check((value as Record<string, unknown>)[key], field, `${path}.${key}`);
    }
    if (path.startsWith('content.details.') && !Array.isArray(template)) {
      const section = value as { paragraphs?: unknown; items?: unknown };
      for (const key of ['paragraphs', 'items'] as const) if (section[key] !== undefined) check(section[key], [''], `${path}.${key}`);
      if (!Array.isArray(section.paragraphs) && !Array.isArray(section.items)) throw new Error('Each department section needs text or bullet points.');
    }
  }
  check(input, DEFAULT_CONTENT, 'content');
  const content = input as SiteContent;
  for (const key of ['departments', 'services'] as const) {
    if (content[key].length !== DEFAULT_CONTENT[key].length || content[key].some((entry, i) => entry.id !== DEFAULT_CONTENT[key][i].id || entry.kind !== DEFAULT_CONTENT[key][i].kind || entry.illustration !== DEFAULT_CONTENT[key][i].illustration || entry.relatedServices.some(id => !content.services.some(service => service.id === id)))) throw new Error('Department links must stay connected to the existing website.');
  }
  if (!content.facilities.length || content.facilities.length > 3 || content.steps.length !== 4 || !content.gallery.length || content.gallery.length > 20) throw new Error('Keep 1–3 facilities, four visit steps and 1–20 gallery photographs.');
  for (const list of [content.doctors, content.facilities, content.gallery]) {
    const ids = list.map(item => item.id);
    if (new Set(ids).size !== ids.length || ids.some(id => !/^[a-z0-9-]{1,100}$/.test(id))) throw new Error('Each entry needs a unique identifier.');
  }
  if (content.doctors.some(doctor => !doctor.name.trim() || !doctor.role.trim() || !doctor.department.trim())) throw new Error('Every doctor needs a name, specialty and role.');
  if (!content.clinic.name.trim() || !/^[+\d\s().-]{5,40}$/.test(content.clinic.phone) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.clinic.email)) throw new Error('Enter a clinic name, valid reception phone number and email address.');
}

export function clinicLinks(clinic: SiteContent['clinic']) {
  return { ...clinic, phoneHref: `tel:${clinic.phone.replace(/[^+\d]/g, '')}`, emailHref: `mailto:${clinic.email}` };
}

export function validateImageFile(file: Pick<File, 'type' | 'size'>) {
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type)) throw new Error('Choose a JPG, PNG, WebP or AVIF photograph.');
  if (file.size <= 0 || file.size > 8 * 1024 * 1024) throw new Error('Choose a photograph smaller than 8 MB.');
}
