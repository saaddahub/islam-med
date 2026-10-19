# Islam Medical Complex

React and TypeScript frontend built with Vite, Tailwind CSS, Framer Motion, GSAP, and Lenis.

## Local development

Use Node.js 24 and `npm ci`, then:

- `npm run dev`: local development server on 127.0.0.1:5173.
- `npm run build`: type checking and production output in `dist`.
- `npm run preview`: local production preview.
- `npm run lint`: application lint checks.
- `npm run test:security`: production build and security regression checks.
- `npm audit`: current dependency advisory check.

The site has no backend, authentication, appointment submission, or email subscription service. Booking buttons show reception contact options. The site does not collect or persist patient details.

## Departments and services

The landing page and navigation share ten departments: Gynecology, Obstetrics, Pediatrics, Dermatology, Orthopedics, Gastroenterology, Diagnostic Ultrasound, Labour & Delivery, General Medicine, and Physiotherapy & Rehabilitation. Seven services cover Ultrasound, Outpatient Department (OPD), Cardiotocography (CTG), Electrocardiography (ECG), Emergency Care, Pharmacy, and Laboratory Testing. “Labor” is interpreted as Labour & Delivery because laboratory was listed separately by the owner.

Each overview link opens the same shareable hash view used by the navigation, with clinical information, an animated SVG scene, related services, and reception contact options. The overview uses an open department index with a preview on pointer hover or keyboard focus, followed by the service links. Scroll entrances and clinical character movements respect reduced motion; decorative loops pause outside the viewport and in hidden tabs. Hero and facilities sequences are preserved. Older internal-medicine, outpatient and laboratory department links still resolve.

Availability follows the owner's supplied list; established department information is retained where relevant. New descriptions explain the scope of the specialties without inventing equipment, named clinicians, prices or treatment guarantees. Terminology references include the NHS guides to [ECG](https://www.nhs.uk/tests-and-treatments/electrocardiogram/), [physiotherapy](https://www.nhs.uk/tests-and-treatments/physiotherapy/), [pregnancy ultrasound](https://www.nhs.uk/pregnancy/your-pregnancy-care/ultrasound-scans/) and [fetal monitoring](https://www.hdft.nhs.uk/listening-to-your-babys-heartbeat/).

Run `node --test tests/departments.test.mjs tests/startup.test.mjs` with Node.js 24 for route/content coverage and loading recovery checks.

## Deployment security

Deploy the contents of `dist` over HTTPS. The build includes a content security policy in the HTML and generates `dist/_headers` for static hosts that support that format. The preview server applies the full policy as HTTP response headers.

If the hosting service does not support `_headers`, configure the same response headers at the web server or CDN. In particular, framing protection requires HTTP headers; it cannot be enforced by a meta tag. Verify the deployed responses after publishing. Development permits Vite's inline HMR preamble; the production build permits scripts only from its own origin.

The policy allows the existing Google Fonts and Unsplash images. Inline styles remain permitted for the motion libraries. Environment and key files are ignored by Git and denied by the development server.
