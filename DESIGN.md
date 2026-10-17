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

The opening hero uses the restored Three.js sculpture: fifteen satin ink-blue ribs form a dimensional medical cross beside the editorial heading and appointment actions. Scrolling clears the copy, brings the sculpture to the centre and unfolds it into one continuous, aspect-correct reception/pharmacy photograph. The image settles inside the original cream perimeter. The sequence lasts 1.25 viewport heights. No hero slideshow runs.

“Spaces designed for healing” retains its original photographic wings: the side images hinge outwards while the central photograph expands to the full viewport, followed by its caption. Its original 1.45-viewport scroll timing, imagery and feature selector are restored. The experimental swap between these sections was rejected by the user.

Both cinematic sequences run only on full-motion desktop layouts at least 1024px wide and 650px tall. Smaller windows, reduced motion and lower-performance tiers retain ordinary photographs and usable content. WebGL failure restores the hero's HTML photograph. The canvas and duplicate imagery are decorative; the semantic H1 and native appointment controls remain accessible.

The hero renderer loads separately, shares the GSAP clock, caps DPR at 1.5 and draws only when its pose changes. It pauses offscreen, in hidden tabs and behind dialogs. It uses one shared local texture, a studio environment and baked contact shadow, with no live shadow or postprocessing passes. Initialization is abortable; scene resources and listeners are disposed on responsive exits. Lenis supplies scroll smoothing, with direct scrubbing for the hero.

Keep native dialog semantics, keyboard focus indicators, internal dialog scrolling, Escape dismissal, reception handoff, and Lenis scroll restoration. The logo and footer return-to-top link target the stable `#top` wrapper rather than the pinned hero.

## Responsive verification

The initial HTML includes a cream loading screen before the React bundle runs. Three thin ink-blue stick-figure scenes show maternity ultrasound, a pediatric consultation and laboratory preparation, as explicitly requested by the user. Small arm movements and an indeterminate hairline use CSS transforms and opacity; reduced motion keeps the scenes still. No artificial minimum duration is added. Opening images, fonts, the desktop sculpture's first render and scroll layout settle before the 240ms fade. The rest of the page is inert during startup. A slow asset can fall back to the HTML hero, a delayed startup offers a continue action, and a bundle failure offers reload rather than an empty screen. Below-fold photographs remain lazy loaded.

Inspect desktop and phone together when changing surfaces or type. Check intermediate widths when layout structure changes. Keep navigation targets usable at narrow widths and avoid horizontal overflow. Browser viewport emulation is not a substitute for physical-device touch or cross-browser testing.

## Care journey and department navigation

The user requested open, minimal process steps instead of cards. How It Works uses a narrow vertical S-shaped SVG route with four small numbered stops, following the user’s sketch. Single-paragraph steps alternate beside the central curve on desktop, with a 960px route, larger step headings and 156px intervals to give the layout room without broad horizontal loops or secondary notes. Each segment is driven by the scroll distance between its two steps; copy reveals with a small translation and opacity change. There is no section pin. At phone widths the route moves to the left gutter and the copy stays in one column. Reduced motion shows the complete line and all content.

Desktop navigation has plain section links and a native Departments disclosure that opens on mouse hover or keyboard/click. The menu button is reserved for widths below 1024px. All five departments from the supplied document are independent: Gynecology & Obstetrics, Pediatrics, Outpatient Department, Internal Medicine and Laboratory Testing. Each has a shareable hash reading view with service lists, explanations and reception actions. Summaries remain in the scroll-driven landing chapters. The How We Care for You section has been removed by request.

The founder is Imran Islam, Founder, with no clinical title. The old stock doctor portrait was replaced by existing IMC interior photography, accurately captioned as the complex rather than a portrait. Full department copy is edited from IMC Department details.docx; repetitions, unsubstantiated best-in-city rankings and paragraphs explicitly about another hospital are omitted. Clinical service descriptions are retained without adding new claims.
