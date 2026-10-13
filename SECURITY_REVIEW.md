# Code and security review

Reviewed on 13 October 2026.

## Scope

Reviewed the React entry point, rendered components, data, motion helpers, HTML, CSS, Vite configuration, and dependency graph. This repository is a static frontend: there is no booking API, authentication system, database, or patient-data storage to test.

The review used source inspection, npm's advisory database, local production and development HTTP checks, a timeout-limited dependency regression payload, and desktop/mobile browser checks. Strix is not installed, so this was not a Strix pentest. The deployed website and hosting configuration were not available for verification.

## Findings and fixes

| Finding | Change | Evidence |
| --- | --- | --- |
| High-severity dependency advisory in source-map-js 1.2.1 | Updated the locked dependency to 1.2.2 | npm audit reports zero known vulnerabilities; the oversized indexed-map offset payload is rejected in an isolated process |
| Production had no content security policy or configured framing protection | Restricted scripts to the site origin, blocked embedded objects and form submission, restricted resource origins, added framing and MIME protections | Production response-header regression check passes; browser reported no policy errors |
| Email notification form displayed a success message without submitting or saving data | Removed the form and its retained email state; booking now explains that online booking is unavailable and provides reception contact options | Browser checks confirm the contact dialog and absence of an email input |
| Sensitive local files needed explicit protection | Added Git ignore rules for environment/key files and denied environment, key, and Git files in the Vite server | A disposable environment fixture and the Git config request both return denial responses |

The source-map advisory concerns tooling that processes malicious maps. This frontend exposes no such processing endpoint; its exploitation by a public visitor was not established. Advisory: [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q).

No attacker-controlled HTML rendering, dynamic code execution, exposed credentials, or patient-data transmission was identified in the reviewed application source. This is a scoped finding, not a guarantee that every possible vulnerability is absent.

## Simplification

- Removed unused DoctorSpotlight and PhotoMosaicTransition components, template assets, and unused CSS/data fields.
- Removed four unused direct libraries and 62 installed packages from their dependency graph.
- Replaced repeated resize/media preference effects with a shared media-query subscription.
- Removed unused booking-selection state and props, consolidated appointment callbacks, and prevented overlapping dialogs.
- Used native dialogs for focus handling, Escape dismissal, and inert background content; paused smooth scrolling while dialogs are open.
- Moved inline scripts into a React effect that runs after content mounts, fixing fallback reveals that previously queried an empty page.
- Corrected the department anchor and reception telephone URI; made doctor profiles and department selection keyboard-accessible.
- Preserved the rendered site sections and existing visual design.

## Validation

- Production TypeScript/Vite build passes.
- Application lint passes without warnings.
- Four security regression tests pass via `npm run test:security`.
- npm audit reports zero known vulnerabilities across the remaining dependency graph.
- Browser checks passed for appointment dismissal, keyboard doctor selection, profile-to-booking transition, and a 390px mobile dialog.
- Git diff whitespace check passes.

Vite still reports the existing large JavaScript bundle warning (approximately 556 kB before gzip). The motion libraries remain because the visible site uses them.

## Deployment requirement

The build writes `dist/_headers`; the hosting service must support this format or apply the same HTTP headers through its server/CDN configuration. The HTML meta policy protects supported directives even without this file, but framing protection requires an HTTP response header. See [MDN frame-ancestors documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors).

Deploy over HTTPS and verify response headers on the actual public origin. The development server allows Vite's inline HMR preamble; the production policy does not allow inline scripts. Inline styles remain permitted for the existing motion libraries.
