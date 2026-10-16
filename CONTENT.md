# IMC website content sources

## Authoritative material for this update

- `IMC Department details.docx`, supplied by the user on 15 October 2026. The file is a Word document, despite being referred to as a PDF in the request.
- The user's follow-up supplied the Lahore street address, reception number and email address.

The original document remains unchanged. The website uses concise summaries of its IMC-specific content rather than reproducing its repeated marketing paragraphs.

## Services represented

The document describes gynecology and obstetrics, pediatrics, outpatient services, internal medicine and laboratory testing. OPD and internal medicine are grouped into one website chapter to retain the established four-stage cinematic department sequence.

Gynecology and obstetrics include pregnancy care, delivery, gynecological procedures, minimally invasive laparoscopic surgery, infertility care, ultrasound and prenatal assessment, and 24/7 gynecological emergency care. Pediatrics includes newborn, child and adolescent care, inpatient/outpatient services and family-centered support. OPD supports assessment, treatment and referral. Internal medicine focuses on adult, preventive, chronic and multi-system care. The laboratory section establishes testing availability without specifying equipment, turnaround times or performance figures.

Do not broaden the gynecological emergency statement into a general 24/7 trauma service. The document does not establish 24/7 pharmacy or laboratory opening hours.

## Contact details supplied by the user

- Address: 154 P Block Rd, Sabzazar Block P Sabzazar Housing Scheme Phase 1 & 2 Lahore, 54000, Pakistan.
- Reception: +92 321 8410643.
- Email: imc.sbz2@gmail.com.

The shared implementation source is `src/data/clinic.ts`. Phone, email, location and directions links should consume that source rather than repeat literals in components. The document says consultant clinics run from morning to late evening; it does not give exact opening hours or days.

## Exclusions and existing material

The internal medicine section contains passages naming Hameed Latif Hospital. These passages were not published as claims about IMC. Repeated rankings such as 'best' were omitted.

The source does not establish robotic surgery, 3T MRI, 128-slice CT, catheterization facilities, ISO/HEPA/circadian room specifications, patient portals, telemonitoring, guaranteed waits, procedure counts, satisfaction/accuracy percentages, or JCI/IHC accreditation. Those claims were removed from the rendered website.

The department document does not contain doctor names, qualifications, consultation schedules, a founder biography or clinician portraits. The current doctor roster and consultation hours remain incumbent content pending a response to the roster question. Consultant ratings and patient counts were removed because no source supported them. The founder layout and existing name/role remain; its unsupported quotation and robotic-surgery copy were replaced with unattributed IMC care principles drawn from the document.

Existing photographs were retained; stock healthcare imagery is identified as illustrative in the gallery. They are not evidence of equipment, facilities or a clinician's identity. Unused legacy package/carousel source files are outside the rendered landing page and were not reintroduced by this update.

## Presentation constraints

Preserve the cream/ink-blue visual system in `DESIGN.md` and the current scroll choreography. Content edits must remain readable in the pinned desktop department panel, in the mobile accordion, and in the scrollable appointment/profile dialogs.
