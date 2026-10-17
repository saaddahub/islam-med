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

## Deployment security

Deploy the contents of `dist` over HTTPS. The build includes a content security policy in the HTML and generates `dist/_headers` for static hosts that support that format. The preview server applies the full policy as HTTP response headers.

If the hosting service does not support `_headers`, configure the same response headers at the web server or CDN. In particular, framing protection requires HTTP headers; it cannot be enforced by a meta tag. Verify the deployed responses after publishing. Development permits Vite's inline HMR preamble; the production build permits scripts only from its own origin.

The policy allows the existing Google Fonts and Unsplash images. Inline styles remain permitted for the motion libraries. Environment and key files are ignored by Git and denied by the development server.
