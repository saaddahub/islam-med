# Islam Medical Complex — visual system

## Direction

Warm ivory and desaturated ink blue. The interface should feel calm, precise, editorial, and minimal. Use the existing photography and large serif typography for character. The user explicitly requested a premium cream/blue relationship without bright, generic blue styling.

The palette values below were selected during implementation. Keep them coherent across the landing page, navigation, consultant profiles, appointment dialog, and leadership section.

## Colour roles

| Role | Token / utility | Value | Use |
| --- | --- | --- | --- |
| Ivory paper | `imc-paper` | `#F4EFE6` | Main canvas, navigation, text on dark sections |
| Linen | `imc-linen` | `#EAE2D6` | Leadership spread, profile portrait column, quiet panels |
| Sand | `imc-sand` | `#D8CCBA` | Subtle boundaries, placeholder grounds, hover surfaces |
| Ink | `imc-ink` | `#233F4D` | Headings and primary text on light surfaces |
| Body | `imc-body` | `#3B525E` | Supporting paragraphs |
| Muted | `imc-muted` | `#53666E` | Secondary text on light surfaces |
| Blue | `imc-blue` | `#2C4B5A` | Primary actions, portrait outlines, selection and focus |
| Blue hover | `imc-blue-hover` | `#203B49` | Primary action hover |
| Night | `imc-night` | `#1C303B` | Care chapters, doctor roster, footer |
| Mist | `imc-mist` | `#B5C6CC` | Secondary text and focus on night surfaces |
| Soft blue | `imc-blue-soft` | `#6F8995` | Existing headline linework and restrained decorative strokes |

Values are defined in `src/index.css`. Tailwind's existing white, black, and slate utility roles are mapped to this family for compatibility. Legacy `accent-teal` tokens are aliases to the blue role; they do not introduce another accent.

The institution's existing emblem retains its supplied blue/red artwork. Red elsewhere is limited to brand lettering and emergency/hotline signals. Decorative icons and headline linework use the blue family.

Do not introduce cobalt, electric blue, violet, gradient fills, blue glows, or pure-white glass panels. A photograph may retain its original colours. Dialog scrims remain functional overlays.

## Contrast

Reference solid-surface pairs, calculated with WCAG relative luminance:

- Ink on paper: 9.70:1.
- Muted body text on paper: 5.25:1.
- Small slate-500 labels on paper: 4.60:1.
- Paper on blue actions: 8.11:1.
- Paper on night: 11.94:1.
- Mist on night: 7.76:1.
- Soft blue strokes on paper: 3.22:1; use for graphics, not small running text.

Check the actual background when changing opacity or moving a text role between surfaces. Use mist on night surfaces, not neutral grey.

## Typography and surfaces

Newsreader remains the display face; Inter remains the interface/body face. Anton and Barlow Condensed are incumbent brand and compact-label treatments. Do not replace the type system during colour refinements.

Prefer flat fields, spacing, and clear scale changes over nested containers and ornamental badges. Keep resting action buttons free of glows. Navigation uses a solid ivory surface and plain links. Use the existing outlined oval portraits and circular controls consistently.

## Motion and behaviour

Preserve the established GSAP/ScrollTrigger cinematic sequences, their timings, and their reduced-motion alternatives. Palette work must not change pin durations, perspective, reveal distances, or scroll transitions.

The opening hero now owns the photographic hinge transition originally used in the facilities section, by user request. Its opening photograph sits alongside the readable heading and appointment controls. On scroll, two photographic wings assemble around the central photograph, then hinge away as that photograph expands to cover the full viewport, with no cream perimeter. The sequence lasts 1.45 viewport heights and reverses continuously. The hero no longer runs a slideshow or WebGL sculpture.

“Spaces designed for healing” has a separate Three.js sequence: fifteen photographic ribs open through depth and straighten into an edge-to-edge image. Its heading clears before the image expands. The existing native facility selector changes the photograph and its caption together. At the end, the WebGL image hands over to the ordinary HTML image and accessible caption. The sequence lasts 1.25 viewport heights.

Both enhanced sequences run only at full-motion desktop layouts at least 1024px wide and 650px tall. Reduced motion, smaller viewports and lower-performance tiers retain readable content and ordinary photographs. WebGL failure or context loss retains the facilities photograph. The decorative canvas and duplicate photographs are hidden from assistive technology; the original H1 remains accessible. Hidden hero actions use visibility to avoid invisible focus targets.

The facilities renderer loads in a separate chunk, shares the existing GSAP clock, and renders only when its pose changes. Rendering pauses offscreen, in hidden tabs and behind dialogs. DPR is capped at 1.5; each scene shares one texture and a precomputed studio environment, with no shadow or postprocessing passes. Geometry, materials, textures, listeners and renderer are disposed on responsive exits and selection changes, with abortable initialization. Lenis supplies scroll smoothing; facilities use direct scrubbing and the photographic hero retains its original short scrub.

Implementation references: [Three.js renderer](https://threejs.org/docs/pages/WebGLRenderer.html), [physical materials](https://threejs.org/docs/pages/MeshPhysicalMaterial.html) and [rounded geometry](https://threejs.org/docs/pages/RoundedBoxGeometry.html). No reference-site imagery is introduced.

Keep native dialog semantics, keyboard focus indicators, internal dialog scrolling, Escape dismissal, reception handoff, and Lenis scroll restoration. The logo and footer return-to-top link target the stable `#top` wrapper rather than the pinned hero.

## Responsive verification

Inspect desktop and phone together when changing surfaces or type. Check intermediate widths when layout structure changes. Keep navigation targets usable at narrow widths and avoid horizontal overflow. Browser viewport emulation is not a substitute for physical-device touch or cross-browser testing.
