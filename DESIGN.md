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

The opening hero keeps its headline and appointment actions anchored on ivory. Scroll reveals successive photographs inside the right-hand frame, with counter-moving image crops and a restrained perspective that settles toward the viewer. Keep the photograph contained and the sequence within approximately 0.85 viewport heights of scrolling, then let the page continue naturally. Avoid the previous giant “closer” title, forward camera rush and passing doorway frames. Other section sequences remain independent.

Run the photographic hero sequence only on full-motion desktop layouts at least 1024px wide and 650px tall. Phones, compact windows, lower-performance tiers and reduced-motion preferences retain the ordinary hero, its readable heading and appointment controls. GSAP owns scroll transforms and masks directly; do not drive frame-by-frame motion through React state. Supplementary photographic layers remain hidden from assistive technology. Slideshow changes overlap as a crossfade, avoiding an empty frame between photographs.

Keep native dialog semantics, keyboard focus indicators, internal dialog scrolling, Escape dismissal, reception handoff, and Lenis scroll restoration. The logo and footer return-to-top link target the stable `#top` wrapper rather than the pinned hero.

## Responsive verification

Inspect desktop and phone together when changing surfaces or type. Check intermediate widths when layout structure changes. Keep navigation targets usable at narrow widths and avoid horizontal overflow. Browser viewport emulation is not a substitute for physical-device touch or cross-browser testing.
