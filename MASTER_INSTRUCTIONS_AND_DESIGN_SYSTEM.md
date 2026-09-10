# UNIVERSAL SYSTEM INSTRUCTIONS & DESIGN-SECURITY PLAYBOOK
## The Unified Master Standard for Frontend, Motion, Security, Architecture & Craft

> **Document Status**: Production Master Standard  
> **Scope**: Universal (Cross-Project Baseline for All Web Applications, Portfolios, Platforms, and Dashboards)  
> **Philosophy**: *Every visible property and backend constraint must be deliberate, derived from the brief, mathematically sound, and uncompromisingly secure.*

---

# TABLE OF CONTENTS
1. [Core Architectural North Star & The Deliberate Axiom](#1-core-architectural-north-star--the-deliberate-axiom)
2. [Universal Motion, Transition & Animation System](#2-universal-motion-transition--animation-system)
3. [The "Anti-Slop" Visual & Aesthetic Design System](#3-the-anti-slop-visual--aesthetic-design-system)
4. [Component & Interaction State Engine (States > Appearance)](#4-component--interaction-state-engine-states--appearance)
5. [Layout Architecture, Rhythm & Responsive Engineering](#5-layout-architecture-rhythm--responsive-engineering)
6. [Defense-in-Depth Security, Auth & Data Integrity Architecture](#6-defense-in-depth-security-auth--data-integrity-architecture)
7. [Production Code Craft & Framework Guidelines (Next.js / React)](#7-production-code-craft--framework-guidelines-nextjs--react)
8. [Comprehensive Anti-Patterns & Banned AI Tells Master List](#8-comprehensive-anti-patterns--banned-ai-tells-master-list)

---

# 1. CORE ARCHITECTURAL NORTH STAR & THE DELIBERATE AXIOM

### 1.1 The Deliberate Principle
A tell is not ugliness, and not popularity. **A tell is a choice whose frequency is invariant to the brief**—the choice that appears at the same rate whether building a fintech dashboard, a student welfare platform, an experimental WebGL gallery, or a SaaS marketing landing page.

Design and engineering are sequences of decisions:
- Wherever a brief is silent, a generic generator *inherits a default*, while a master engineer *makes a deliberate call*.
- Untouched defaults are damning because a real human engineer would have touched them.
- **The Golden Rule**: Every visible property and architectural layer must be derivable from the specific problem domain. A product passes when you can point at any value on screen or any server action and explain *why* it exists here and *how* it would differ elsewhere.

### 1.2 The 8-Axis Decision Sheet Protocol
Before writing any component or markup, establish the concrete parameters for the task:

```
┌─────────────┬────────────────────────────────────────────────────────────────────────┐
│ AXIS        │ MANDATORY SPECIFICATION                                                │
├─────────────┼────────────────────────────────────────────────────────────────────────┤
│ 1. SUBJECT  │ One crisp sentence: what this is, who it is for, its single core job.  │
│ 2. GROUND   │ The environment/vernacular: materials, density, mood, and context.     │
│ 3. PALETTE  │ 4–6 named hex values with defined roles; 1 accent (<80% sat); hue bias.│
│ 4. TYPE     │ 2+ roles (Display / Text / Mono), named faces, size ratios, tracking.  │
│ 5. SPACE    │ Two distinct spacing registers (Intra-component vs Section Rhythm).    │
│ 6. SHAPE    │ Explicit radius policy; 1 elevation method (Tonal step OR shadow).     │
│ 7. MOTION   │ Physics params (stiffness/damping), duration band, interruptibility.   │
│ 8. SECURITY │ Auth role boundaries, Zod schemas, RLS rules, sanitize storage paths.  │
└─────────────┴────────────────────────────────────────────────────────────────────────┘
```

---

# 2. UNIVERSAL MOTION, TRANSITION & ANIMATION SYSTEM

Motion is not decoration—it is visual communication, spatial orientation, and proof of life. A section is never done until it moves with physical credibility.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                             MOTION SYSTEM ARCHITECTURE                                   │
├──────────────────────────┬─────────────────────────────┬─────────────────────────────────┤
│  INTERACTION CATEGORY    │  DURATION / PHYSICS         │  CURVE / BEHAVIOR               │
├──────────────────────────┼─────────────────────────────┼─────────────────────────────────┤
│  Button Press / Click    │  100ms – 160ms              │  scale(0.97) / ease-out         │
│  Tooltip / Micro-popover │  125ms – 200ms              │  cubic-bezier(0.16, 1, 0.3, 1)  │
│  Dropdown / Context Menu │  150ms – 250ms              │  cubic-bezier(0.23, 1, 0.32, 1) │
│  Modal / Drawer / Sheet  │  200ms – 400ms              │  Spring (damping: 1.0, resp:0.3)│
│  Page / Route Morph      │  300ms – 500ms              │  Shared Layout / Cross-fade     │
│  Waterfall Stagger       │  60ms – 100ms per index     │  Cascaded reveals               │
└──────────────────────────┴─────────────────────────────┴─────────────────────────────────┘
```

### 2.1 The Non-Negotiable Rules of UI Motion
1. **Never `ease-in` on interactive UI**: An ease-in delays movement at the exact moment the user is looking. Always use strong ease-outs (`cubic-bezier(0.16, 1, 0.3, 1)` or `cubic-bezier(0.23, 1, 0.32, 1)`). Motion must start immediately and settle smoothly.
2. **Never animate layout-driving properties**:
   - ❌ BANNED: Animating `width`, `height`, `top`, `left`, `margin`, `padding`, `min-*`, `max-*` (triggers CPU layout recalculation on every single frame).
   - ✅ COMPOSITOR-ONLY: Animate `transform` (`translateX`, `translateY`, `scale`, `rotate`) and `opacity` (GPU-handled).
   - ✅ ACCORDIONS / HEIGHT COLLAPSE: Animate `grid-template-rows: 0fr` to `1fr` with an inner `min-h-0` wrapper instead of animating height.
3. **Never `transition: all`**: Always specify explicit properties (`transition: transform 150ms ease-out, opacity 150ms ease-out`). `transition: all` animates unintended properties (including layout bugs) and exposes a lack of craftsmanship.
4. **Mandatory `prefers-reduced-motion` with Graceful Degradation**:
   - Never use a blunt kill switch that makes UI snap invisibly without feedback.
   - Replace physical slides and springs with quick opacity cross-fades (`150ms`) so state changes remain crystal clear.
5. **Interruptibility & Velocity Transfer**:
   - Never lock user input during an animation.
   - Animate from the **current presentation value** (where the element is right now on screen), never the logical target. Starting from the target causes violent visual jumps when interrupted.
   - Symmetrical paths: An element entering from the right must dismiss to the right.
   - Anchor `transform-origin` to the trigger element (e.g. popover scales from the button that spawned it, not from the center).

### 2.2 Spring Physics Engine Standards
When using Framer Motion or physics-based engines:
- **Default Spring**: `type: "spring", stiffness: 100, damping: 20` (or `damping: 15` for snappier components).
- **Critically Damped (`damping: 1.0`)**: Use for programmatic transitions and layout shifts where bouncing feels gimmicky.
- **Underdamped (`damping: 0.8`)**: Reserve bounce *only* for physical gestures that carry human momentum (swiping, throwing cards, pulling sheets).
- **Momentum Projection**:
  ```javascript
  // Deceleration projection for drag releases
  const project = (velocity, decay = 0.998) => (velocity / 1000) * decay / (1 - decay);
  const target = nearestSnapPoint(currentPosition + project(releaseVelocity));
  ```

### 2.3 Scroll Reveals & Entrance Orchestration
- **Standard Entrance**: `opacity: 0, y: 20` $\rightarrow$ `opacity: 1, y: 0`.
- **Stagger Delays**: Cascade child items using `calc(var(--index) * 80ms)`.
- **Content-Safety Guarantee**: Content must remain `opacity: 1` by default in HTML/CSS. JavaScript enhances the reveal with scroll observers. Never make elements invisible by default in static CSS, preventing catastrophic blank pages if JS fails or search engine crawlers index the page.

### 2.4 Sandboxed / Vanilla Fallback Protocol
If operating in an environment where Framer Motion, GSAP, or Lenis cannot be installed:
- Scroll reveals $\rightarrow$ `IntersectionObserver` + CSS `@keyframes` / transitions.
- Spring approximation $\rightarrow$ `cubic-bezier(0.34, 1.56, 0.64, 1)`.
- Magnetic buttons $\rightarrow$ Pointermove event listener with `requestAnimationFrame` linear interpolation (`lerp`).
- Smooth scrolling $\rightarrow$ Native CSS `scroll-behavior: smooth` + `scroll-snap-type`.

---

# 3. THE "ANTI-SLOP" VISUAL & AESTHETIC DESIGN SYSTEM

Visual excellence is achieved by stripping away generic clichés, tuning typography, creating structured color ramps, and building deliberate surfaces.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                COLOR SYSTEM ARCHITECTURE                                 │
├───────────────────┬──────────────────────────────────┬───────────────────────────────────┤
│ ROLE              │ TOKEN / VALUE                    │ FUNCTIONAL PURPOSE                │
├───────────────────┼──────────────────────────────────┼───────────────────────────────────┤
│ Canvas / Ground   │ #F9FAFB (Light) / #09090B (Dark) │ Primary background surface        │
│ Container Surface │ #FFFFFF (Light) / #121215 (Dark) │ Elevated cards & containment      │
│ Primary Ink       │ #18181B (Zinc-950) / #F4F4F5     │ Highest contrast body & headers   │
│ Muted Ink         │ #71717A (Zinc-500) / #A1A1AA     │ Metadata, descriptions, captions  │
│ Subtle Border     │ rgba(226, 232, 240, 0.6)         │ 1px architectural boundary lines  │
│ Curated Accent    │ Single distinct hue (<80% sat)   │ Focus rings, primary CTAs, alerts │
└───────────────────┴──────────────────────────────────┴───────────────────────────────────┘
```

### 3.1 Color Palette Engineering
1. **Saturation Gate & Hue Restraint**:
   - Maximum **1 accent color** per interface. Keep accent saturation under 80%.
   - **Banned Clichés**: The ubiquitous AI neon purple/violet (`#7c3aed`, `#8b5cf6`, `#6366f1`) and cyan (`#06b6d4`) gradient glow is strictly forbidden unless specifically dictated by brand identity.
2. **Never Pure `#000000` or Clinical `#FFFFFF`**:
   - In dark mode, pure black dead-ends elevation. Use Zinc-950 (`#09090B`), Charcoal (`#121215`), or deep slate.
   - In light mode, use warm canvas whites (`#F9FAFB` or `#F8F9FA`).
3. **Contrast Standards (WCAG 2.1 AA Compliance)**:
   - Body text ($<24\text{px}$ or $<18.67\text{px}$ bold) **must** maintain a minimum contrast ratio of **4.5:1** against the background.
   - Large headings ($\ge 24\text{px}$ or $\ge 18.67\text{px}$ bold) must achieve at least **3:1**.
   - Interactive UI boundaries (input borders, active focus indicators, checkbox boxes) require at least **3:1**. Note: Tailwind `-500` shades on white text frequently fail (e.g. `indigo-500` is 4.47:1, `violet-500` is 4.23:1); always step to `-600` or `-700`.
4. **Physical Shadows vs Emission**:
   - Shadows represent the *occlusion* of light, not the emission of colored fog. Banned: colored neon glow halos behind dark cards.
   - A crafted shadow uses a dual-layer stack: a tight, crisp ambient occlusion layer plus a wide, low-opacity diffuse layer tinted slightly toward the ground hue.

### 3.2 Typographic Architecture
- **Font Stack Hierarchy**:
  - *Display / Headlines*: `Geist`, `Cabinet Grotesk`, `Satoshi`, `Outfit`, or curated modern serifs (`Fraunces`, `Instrument Serif`, `Gambarino`) when editorial tone is required.
  - *Body / UI*: Clean grotesque (`Geist`, `General Sans`, `Inter` only for system UI, system-ui fallback).
  - *Monospace / High-Density Data*: `Geist Mono` or `JetBrains Mono` for code, IDs, CNICs, tabular numbers, and financial figures.
- **Scale & Contrast**:
  - Modular scale ratio $\ge 1.25$ (Major Third) or $1.333$ (Perfect Fourth).
  - Tracking rules:
    - Display ($40\text{px}+$): Tighten to `-0.02em` to `-0.025em`.
    - Body ($14\text{px} - 18\text{px}$): Neutral tracking (`0em`).
    - Captions / Small ($<12\text{px}$): Slightly positive (`+0.01em`).
    - Uppercase Labels / Eyebrows: Must always be tracked (`+0.05em` to `+0.12em`).
- **Leading & Measure**:
  - Display leading: `1.05` to `1.2`.
  - Body leading: `1.5` to `1.7`.
  - Max line measure: Constrain running text containers with `max-width: 65ch` (never let paragraphs stretch 100% across wide desktop monitors).
  - Line balancing: Always apply `text-wrap: balance` on headers to prevent awkward typographic orphans.

### 3.3 The 6 "Unthemed Surfaces" Rule
These six browser surfaces are the clearest marker of whether a site was carefully built by an artisan or spit out by a generic template:

```css
/* 1. Curated text selection */
::selection {
  background: var(--accent-soft);
  color: var(--ink-primary);
}

/* 2. Theme-matched text input caret */
:root {
  caret-color: var(--accent);
}

/* 3. Custom tactile scrollbars */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: var(--ground);
}
::-webkit-scrollbar-thumb {
  background: var(--border-subtle);
  border-radius: 9999px;
}

/* 4. High-visibility keyboard focus indicators */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* 5. Refined hyperlink underlines */
a {
  text-underline-offset: 4px;
  text-decoration-thickness: 1px;
}

/* 6. Numeric alignment stabilization */
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
```

---

# 4. COMPONENT & INTERACTION STATE ENGINE (STATES > APPEARANCE)

An interface reveals its quality the millisecond a user touches it. Static screenshots mean nothing if the interaction states are dead.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                            STATE LIFECYCLE SPECIFICATION                                 │
├────────────────┬─────────────────────────────────────────────────────────────────────────┤
│ STATE          │ MANDATORY IMPLEMENTATION BEHAVIOR                                       │
├────────────────┼─────────────────────────────────────────────────────────────────────────┤
│ 1. :active     │ Immediate pointer-down tactile receipt: scale(0.97) or translateY(1px). │
│ 2. :focus-vis  │ 2px offset ring; triggered on keyboard tab, omitted on mouse click.     │
│ 3. Hover       │ Tonal surface shift or border highlight; no wild scale(1.05) jumps.    │
│ 4. Loading     │ Geometric skeleton shimmer matching final UI dimensions; no spinners.   │
│ 5. Disabled    │ Reduced contrast, cursor: not-allowed, tooltip explaining WHY disabled. │
│ 6. Empty       │ Illustrated vector/icon composition with direct CTA to create data.     │
│ 7. Error       │ Inline contextual message, aria-live="polite", focus moved on submit.   │
└────────────────┴─────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Form Engineering & Input Craft
- **Mobile Zoom Prevention**: All form `<input>`, `<select>`, and `<textarea>` font sizes must be at least `16px` on mobile screens to prevent iOS Safari from aggressively zooming the viewport on focus.
- **Input Autocomplete & Modes**: Every input must declare explicit `autocomplete` (e.g. `email`, `tel`, `current-password`, `postal-code`) and correct `inputmode` (`numeric`, `email`, `tel`) to trigger the proper mobile keyboard.
- **Zero Paste-Blocking**: Never disable paste on password, PIN, or verification fields. Blocking paste breaks password managers and degrades accessibility.
- **Multi-Modal Uploaders (Drag, Drop, Browse, Clipboard `Ctrl+V`)**: File inputs should support direct clipboard image paste (`onPaste` reading `items` from `ClipboardEvent`), displaying live previews immediately.
- **Form Semantics**: Use native `<label>` tags with `htmlFor` matching input IDs. Checkboxes and radio buttons must share a continuous, generous hit target with their labels.

### 4.2 Tabular Data & Dashboard Views
- **Alignment Standards**: Right-align numeric columns, left-align text, center status tags.
- **Tabular Figures**: Always apply `tabular-nums` on financial columns, timestamps, metrics, and progress percentages to prevent column jitter as data changes.
- **Table Density**: Use single subtle horizontal dividers (`border-b border-border/40`); avoid heavy boxed gridlines. Include sticky headers on tall tables.

---

# 5. LAYOUT ARCHITECTURE, RHYTHM & RESPONSIVE ENGINEERING

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                SPACING REGISTER MATRIX                                   │
├────────────────────┬────────────────────┬────────────────────────────────────────────────┤
│ REGISTER           │ VALUE RANGE        │ APPLICATION AREA                               │
├────────────────────┼────────────────────┼────────────────────────────────────────────────┤
│ Intra-component    │ 4px – 16px         │ Icon-to-text, label-to-input, badge padding    │
│ Inter-component    │ 16px – 32px        │ Card internal padding, gap between cards       │
│ Section Rhythm     │ 64px – 140px       │ Vertical breathing room between major sections │
└────────────────────┴────────────────────┴────────────────────────────────────────────────┘
```

### 5.1 Spacing & Downward Binding
- **Downward Heading Binding**: A heading belongs semantically to the content *following* it. Therefore, margin-top (space above heading) must always be $\ge 2\times$ margin-bottom (space below heading).
- **Rhythmic Variation**: Avoid repeating `py-24` down the entire page. Vary section spacing based on density: an airy hero followed by a compact interactive playground, followed by a dense data matrix.

### 5.2 Layout Patterns (Killing the "3-Card Cliché")
- ❌ **Banned**: The generic 3 identical equal-width cards in a row.
- ✅ **Asymmetric Bento Grids**: Multi-span arrangements (e.g., Row 1: 2fr + 1fr; Row 2: 1fr + 1fr + 1fr; Row 3: 70/30 split).
- ✅ **Zig-Zag Two-Column**: Alternating text and live product UI fragments.
- ✅ **Hero Variations**: Split-screen (50/50), Left-aligned headline with right-aligned interactive sandbox, or full-width editorial layout with inline typography images.

### 5.3 Mobile-First Responsive Standards
1. **The `100dvh` Rule**: Full-height sections must use `min-h-[100dvh]`, never `h-screen` or `100vh` (which triggers jarring layout jumps on mobile browsers as URL bars collapse).
2. **Zero Horizontal Overflow**: Test layouts at `320px`, `375px`, `768px`, `1024px`, and `1440px`. `overflow-x: hidden` on the root body is a band-aid; fix the offending fixed-width child element.
3. **Minimum Tap Targets**: All interactive elements on mobile must have a touch target of at least $44\text{px} \times 44\text{px}$.
4. **Mobile Navigation**: Desktop horizontal navigation must collapse into an accessible drawer/sheet menu with generous tap targets and background blur.

---

# 6. DEFENSE-IN-DEPTH SECURITY, AUTH & DATA INTEGRITY ARCHITECTURE

Security is built from zero-trust principles: never trust client input, enforce strict server verification, isolate permissions at the database engine level, and sanitize file storage.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                DEFENSE-IN-DEPTH PIPELINE                                 │
└─────────────────────────────────────────────┬────────────────────────────────────────────┘
                                              │
                                              ▼
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ 1. EDGE PROXY / MIDDLEWARE: Route Guards (/student/*, /admin/*) via secure HttpOnly JWTs │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. SERVER ACTIONS: Strict Zod parsing, regex formatting, authorization session checks    │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. STORAGE LAYER: UUID-scoped buckets, MIME-type inspection, random filename hashing     │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. DATABASE ENGINE: PostgreSQL Row-Level Security (RLS) on 100% of tables                │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│ 5. SECURITY DEFINER: Pinned search_path functions to prevent SQL spoofing                │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

### 6.1 Server-Side Input Validation (Zod Schema Standards)
Every single Server Action must validate inputs with strict schemas before database interaction:
- **Pakistani CNIC / National ID**: Strict 13-digit format validation: `/^\d{5}-\d{7}-\d{1}$/` (with normalization helper stripping dashes).
- **Passwords**: Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 numeric digit.
- **Emails**: RFC 5322 compliance via `z.string().email().trim().toLowerCase()`.
- **Phone Numbers**: International/national E.164 compliance via `/^[0-9+\-\s]{10,15}$/`.

### 6.2 PostgreSQL Row-Level Security (RLS) Policies
Every database table must have RLS explicitly enabled (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`):
1. **Student / User Records**:
   - `SELECT`: Users read their own record (`id = auth.uid()`); Admins view all records (`public.is_admin()`).
   - `INSERT`: Enforced matching `id = auth.uid()`.
   - `UPDATE`: Users can update non-privileged fields; locked columns (e.g. `is_admin`, `cnic`) are guarded.
2. **Applications & Approvals**:
   - `SELECT`: Students read only their own submissions; Admins read nationwide queues.
   - `INSERT`: Students submit with `student_id = auth.uid()`.
   - `UPDATE`: Status transitions (`pending`, `approved`, `rejected`) and reviewer notes are strictly restricted to Admins.
3. **Public Directories**:
   - `SELECT`: Unauthenticated public read access.
   - `INSERT / UPDATE / DELETE`: Strictly restricted to Admins.

### 6.3 Secure `is_admin()` Security Definer Function
Prevent SQL injection and authorization spoofing using a pinned search-path database function:

```sql
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.students WHERE id = auth.uid()),
    false
  );
$$;
```

### 6.4 Anti-Tamper Auto-Profile Trigger
When a user registers via Auth, a database trigger creates their profile row. Privileged flags default to `false` and ignore client metadata:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.students (id, full_name, email, phone, home_city, current_city, institute, is_admin)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'Student Member'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'phone', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'home_city', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'current_city', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'institute', ''),
    false -- Hardcoded to false to prevent privilege escalation
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    email     = EXCLUDED.email;
  RETURN NEW;
END;
$$;
```

### 6.5 Secure Object Storage Architecture
- **Isolated Storage Buckets**: Separate buckets for public assets (`profile-photos`) vs private/sensitive documents (`cnic-photos`, `documents`).
- **Sanitized Pathing**: Never trust client file names. Generate deterministic, collision-proof storage paths:
  ```typescript
  const storagePath = `${userId}/${docType}_${Date.now()}.${fileExtension}`;
  ```
- **Base64 Buffer Streaming**: For clipboard pastes, validate MIME headers (`image/png`, `image/jpeg`, `image/webp`), decode into binary `Buffer`, and stream directly to cloud storage.

---

# 7. PRODUCTION CODE CRAFT & FRAMEWORK GUIDELINES (NEXT.JS / REACT)

### 7.1 Next.js 15+ / React 19 App Router Discipline
- **Server Components by Default**: Keep all data fetching, database access, and heavy business logic inside React Server Components (`RSC`).
- **Leaf-Level `"use client"`**: Push the `"use client"` directive down to the smallest possible leaf components (e.g. an interactive button, modal wrapper, or animated badge) to maximize static rendering and minimize client JS bundle size.
- **Server Action Form Mutations**: Use Next.js Server Actions with `useActionState` and `useFormStatus` for pending state feedback without unnecessary manual `useEffect` loops.
- **Route Cache Invalidation**: Call `revalidatePath("/route")` or `revalidateTag("tag")` inside server actions immediately after successful database mutations.

### 7.2 Semantic HTML & Accessibility Requirements
- **Buttons vs Links**:
  - Use `<button>` for actions that trigger state changes, modals, or form submissions.
  - Use `<Link>` / `<a>` for navigation between pages and URLs. Never use `<div onClick>` for navigation.
- **Interactive Affordances**:
  - Decorative icons must have `aria-hidden="true"`.
  - Icon-only buttons must declare `aria-label="Action description"`.
  - Status messages and error alerts must use `role="status"` or `aria-live="polite"`.

---

# 8. COMPREHENSIVE ANTI-PATTERNS & BANNED AI TELLS MASTER LIST

Keep this checklist active before finalizing any design, UI component, or codebase:

| CATEGORY | ❌ BANNED ANTI-PATTERN (AI TELL) | ✅ APPROVED MASTER STANDARD |
| :--- | :--- | :--- |
| **Color** | AI purple/neon gradients (`#667eea` $\rightarrow$ `#764ba2`) | Curated single accent (<80% sat) with neutral hue bias |
| **Color** | Colored glow shadows behind dark cards | Physics-accurate dual-layer ambient occlusion shadows |
| **Color** | Pure `#000000` dark mode backgrounds | Layered Zinc-950 (`#09090B`) / Charcoal with tonal elevation |
| **Typography** | Default untouched Inter on creative display headers | Curated pairs: Geist, Cabinet Grotesk, Fraunces, Satoshi |
| **Typography** | Flat type hierarchy (tiny size differences) | Modular scale ratio $\ge 1.25$ with weight & color contrast |
| **Typography** | Monospace numbers jittering in tables | `font-variant-numeric: tabular-nums` enabled |
| **Typography** | Long 140ch text running edge-to-edge | Strict readability constraint `max-width: 65ch` |
| **Motion** | `transition: all` on elements | Explicit property declarations (`transform, opacity`) |
| **Motion** | `ease-in` on interactive UI elements | Fast ease-outs (`cubic-bezier(0.16, 1, 0.3, 1)`) & springs |
| **Motion** | Animating `height`, `width`, `top`, `left` | Compositor-only `transform`, `opacity`, `grid-template-rows` |
| **Layout** | 3 identical cards in a row feature section | Asymmetric Bento grids, 2-col zig-zag, horizontal sliders |
| **Layout** | Fixed `h-screen` causing mobile jump | Dynamic mobile viewport `min-h-[100dvh]` |
| **Layout** | Equal spacing above and below headers | Downward binding: space above heading $\ge 2\times$ space below |
| **Copywriting** | AI clichés ("Elevate", "Seamless", "Next-Gen") | Direct, outcome-focused, factual human language |
| **Copywriting** | Fabricated metrics ("99.98% SLA", "124ms response") | Real domain data or honest placeholders (`[metric]`) |
| **Form UX** | Generic spinning circular loaders | Layout-matching geometric skeletal shimmer |
| **Form UX** | Form fields $<16\text{px}$ zooming mobile Safari | Strict $\ge 16\text{px}$ input sizing on mobile viewports |
| **Security** | Relying solely on client-side validation | Dual-layer: Client UX hints + Strict Server Zod parsing |
| **Security** | Storing files with raw user-supplied names | Hashed collision-proof paths (`userId/doc_timestamp.ext`) |
| **Security** | Unprotected tables without PostgreSQL RLS | 100% RLS enforcement with Security Definer functions |

---
*Universal Master Standard maintained for all future application development.*
