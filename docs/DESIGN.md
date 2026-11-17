# FlatProof design system

The tokens and rules the homepage ships with, and why. Source of truth for values: `src/app/globals.css` (`@theme` and `:root`). Every trade-off is logged in `docs/DECISIONS.md` as FP-D#.

## 1. Concept

**Beneath the finish.** Every new flat looks finished on handover day. The hero is that bright, perfect flat; an inspection scan marks what the paint hides; the page then goes beneath the surface (ink and navy grounds) and comes back up as proof (a white report).

- **Signature, spent once:** the hero scan (FP-D69). A teal scan line crosses the photo of the room; each defect it reaches gets a numbered marker and a revision cloud, and its name shows for a moment; beside the photo the snag report fills in, row by row, each row linking to its evidence further down.
- **Marking device:** the revision cloud, the scalloped outline engineers draw on drawings to flag an issue. Amber, and used for defects only.
- **Motion verb:** measure. Lines extend, counters land, clouds get drawn, findings are marked.
- **Feeling curve:** curiosity (hero), doubt (stakes), confidence (checks), ease (process), control (report), leverage (carpet area), trust (case file), breadth (services), reassurance (FAQ), resolve (book).

## 2. Colour

| Token | Hex | Role | Measured contrast (WCAG 2.x) |
|---|---|---|---|
| `paper` | #FFFFFF | Light grounds, the report | ink 17.96, navy 12.01, slate 5.95, teal-ink 5.91 |
| `mist` | #EEF4F6 | Process, carpet area, FAQ | navy 10.82, slate 5.36, teal-ink 5.32, critical 4.95 |
| `ink` | #0E1726 | Stakes, case file, footer; body text on light | white 17.96, teal 4.88, teal-light 8.39, steel 8.68 |
| `ink-raised` | #172338 | Raised surfaces on ink | |
| `navy` | #29374D | Brand; checks and booking grounds; headings on light | white 12.01, teal-light 5.61, steel 5.81, teal 3.26 (large only) |
| `navy-raised` | #33445E | Raised surfaces on navy | |
| `teal` | #0192AB | CTA fill (with an **ink** label, 4.88), lines, icons, big numerals, focus on light | 3.68 on white: never small text |
| `teal-ink` | #016E82 | Small teal text and links on light | 5.91 on white, 5.32 on mist |
| `teal-light` | #3FC1D6 | Teal text, links and focus on ink and navy | 8.39 on ink, 5.61 on navy |
| `slate` | #55657A | Secondary text on light | 5.95 on white, 5.36 on mist |
| `steel` | #A7B6C6 | Secondary text on dark | 8.68 on ink, 5.81 on navy |
| `line` | #D5DFE5 | Rules and ticks only, never text | |
| `critical` | #C4321C | Severity "Critical" | white on it 5.50 |
| `amber` / `amber-ink` | #F59E0B / #A1530A | Severity "Medium" fill (ink label 8.36); revision clouds / amber text on light (5.59) | |
| `wa` | #25D366 | The WhatsApp glyph only | |

Tailwind's default palette is removed (`--color-*: initial`), so only these colours exist.

**Rules.** Teal is never small text: use teal-ink on light and teal-light on dark. Red and amber appear only for defect severity and revision clouds. The ironbow palette (black, indigo, magenta, orange, yellow, white) appears only in thermal imagery (the report's thermal thumbnail and the link-preview image). The brief's #017D93 passes on white (4.82) but fails on mist (4.34), so teal-ink is the single small-text teal (FP-D10).

**Section grounds** (the nav pill reads each section's `data-nav`): hero paper, stakes ink, checks navy, process mist, report paper, carpet area mist, case file ink, services paper, FAQ mist, booking navy, footer ink. Brand navy is the main dark ground, so the page never reads as near-black plus one bright accent (FP-D4).

## 3. Typography

**Zalando Sans**, one variable family (OFL), self-hosted through `next/font`, latin subset, one preloaded file. Width is the voice: `wdth` 125 for display, 100 for text. Its round geometric bowls sit with the logo's wordmark without copying it; the wide cut gives the spec-sheet tone. It replaced Archivo and Switzer, which three recent builds already use (FP-D3).

- **Rupee sign:** Zalando has no ₹, so a 2.7 KB subset of Hind SemiBold holding only U+20B9 sits behind it in the stack and loads only where ₹ appears (FP-D35).
- **Figures:** proportional lining everywhere. Zalando's tabular figures slash the zero and widen the space ("1,12Ø.ØØ  sq  ft"); the odometer stays steady because each digit has its own column (FP-D39).
- **No monospace**, no all-caps labels, no eyebrows, sentence case throughout.

| Utility | Size | Line height | Tracking | Weight | Width |
|---|---|---|---|---|---|
| `type-h1` | clamp(2.375rem, 1.5rem + 3.9vw, 5.25rem) | 0.98 | -0.03em | 720 | 125 |
| `type-h2` | clamp(1.875rem, 1.3rem + 2.4vw, 3.5rem) | 1.04 | -0.02em | 680 | 125 |
| `type-h3` | clamp(1.375rem, 1.15rem + 1vw, 2rem) | 1.12 | -0.01em | 640 | 118 |
| `type-statement` | clamp(1.5rem, 1.05rem + 2.1vw, 2.875rem) | 1.22 | -0.015em | 560 | 112 |
| `type-lead` | clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem) | 1.5 | | 400 | 100 |
| body | 17px (16px under 400px) | 1.6 | | 400 | 100 |
| `type-ui` | 15px | 1.2 | | 560 | 100 |
| `type-small` | 14px | 1.45 | | 450 | 100 |
| `type-micro` | 13px | 1.35 | 0.01em | 600 | 100 |
| `type-figure` | per use | | -0.02em | 660 | 125 |

Headings use `text-wrap: balance`, paragraphs `pretty`. Body measure is 68ch at most. A figure and its unit never break apart (`\u00a0`, FP-D53).

## 4. Space and layout

- 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Container: 1280px of content plus gutters; gutter `clamp(16px, 4.5vw, 56px)`.
- Section padding: `clamp(88px, 11vw, 168px)` top and bottom. Sections separate by ground change, not by rules.
- Lines appear only where they measure: dimension lines, tape ticks, the floor plan, index rows (FP-D6).
- `scroll-padding-top` is the nav height plus 32px, so anchors and keyboard focus land under the pill.
- Hero, three layouts by screen shape: full-bleed 16:9 photo at 1024px and up and at least 3:2 (`HERO_WIDE`), with the crop sliding to keep every finding in frame; two columns on landscape tablets (5:4 to 3:2), copy and panel left, the 4:5 photo framed right; stacked everywhere else, copy, a 4:5 stage (560px wide at most) and the panel (FP-D40, FP-D47, FP-D61, FP-D62).

## 5. Shape and depth

- **Radii by role:** pill 999px (nav, buttons, tags, markers), panel 24px (report sheet, menu sheet), media 16px, input 12px, chip 8px.
- **Shadows, navy-tinted, only on floating things:** `--shadow-float` (nav pill, floating WhatsApp) and `--shadow-sheet` (report sheet, mini report).
- **Glass** only on the nav pill and the phone menu sheet: blur plus saturate, a 1px inner highlight, an opaque fallback without `backdrop-filter`. The blur never animates (FP-D9).
- **Layers:** content 0, floating WhatsApp 40, nav 50, menu 70 to 80, skip link 90.

## 6. Motion

| Token | Value | Use |
|---|---|---|
| press | 120ms, scale 0.97 | Buttons |
| ui | 220ms, `cubic-bezier(.25,1,.5,1)` | Hovers, toggles, the service row tick |
| open | 420ms, `cubic-bezier(.16,1,.3,1)` | Menu sheet, disclosures, nav indicator |
| reveal | 700ms, the same expo out | Hero entrance |
| draw | 900ms, `cubic-bezier(.65,0,.35,1)` | Revision clouds, dimension lines |
| mark | 420ms, one overshoot (`back.out`) | A hero marker landing on a finding |
| sweep | linear, 2.4s desktop and 2.6s phone | The hero scan line; a finding is marked when the line reaches it |

**Rules.**
- Animate only transform, opacity, clip-path and SVG stroke. `will-change` only while a tween runs. Never set a CSS variable on a parent to move children.
- One orchestrated load: the hero (CSS line-mask rise for the H1, a transform-only lift for the lead and CTAs; no SplitText on the LCP element, FP-D28).
- Every other section moves only to explain its content: Stakes words light up as you read, with amber underlines on the hidden defects; the tape fills to 125 and the odometer rolls (pinned on desktop screens 860px tall or more); the process line connects the steps; the report findings settle onto the sheet (complete wherever a jump lands, FP-D52); the floor plan draws itself and the deficit gets its cloud; the case photo opens and its clouds draw in turn; the services preview crossfades.
- GSAP and ScrollTrigger drive scroll; Motion drives only the phone menu (FP-D44). Never both on one element. `scrub: true` (FP-D29). Scenes start near their section or on first interaction (FP-D45).
- **Reduced motion is gentler, not zero:** crossfades stay; pins, scrubs, loops and the scan go. The hero shows the finished scan: all four markers, clouds and report rows (FP-D69).

## 7. Components

- **Nav pill:** floating glass, centred, safe-area aware. Theme follows the section under it; hides on scroll down after the hero and returns on scroll up; stays through in-page jumps (FP-D51). Sliding active-link indicator (Web Animations FLIP). Phones: logo, "Book" and a 48px menu button that morphs into a full-screen sheet (clip-path), with a focus trap, Esc and scroll lock.
- **Buttons:** primary is a teal fill with an ink label; secondary is an outline; `secondary-dark` sits on navy and ink. 52px tall (48px for the text-style secondary in the stacked hero). WhatsApp buttons carry the official glyph and say they open a new tab.
- **Hero scan:** a 2px teal-light line with a soft band behind it crosses the photo at a constant speed (transform only). Each finding's time is its distance from the start, so the line marks it as it passes: an amber marker pops in, its revision cloud draws, and an ink label names it for 1.8 s (on desktop the label comes back on hover). CSS keyframes on `section[data-scan]`; `HeroScan` only starts it (photo decoded and half on screen), keeps the count in step and replays it (FP-D69).
- **Snag report card:** a "found" counter that rolls 0 to 4, a progress bar tied to the scan, and one row per finding (number, name, how it is found) linking to its evidence; rows are grey placeholders until the scan reaches them. "Scan again" replays it. Wide screens show a compact two-column card under the calls to action; phones and tablets the full list, with the "simulated scan" caption. A row and its marker light up together.
- **Revision cloud:** generated paths (`src/lib/cloud.ts`), drawn with stroke dash; amber; defects only.
- **Tape and odometer:** 125 ticks, labels every 25, four segments by trade (28, 32, 38, 27).
- **Report sheet:** an HTML excerpt of sample report FP-PUNE-2026-088 with meta, three findings, severity tags and the recommended fix. Severity lives in the tag, with no side stripes (FP-D48).
- **Carpet readout and calculator:** agreement, measured, short (clouded); the buyer's own rate gives the rupee value. There is no default rate, so no price is invented.
- **Services index:** ruled rows, each with its own prefilled WhatsApp message; on desktop a docked preview and a teal measure tick on the active row.
- **FAQ:** CSS disclosures (grid rows 0fr to 1fr, `inert` when closed).
- **Floating WhatsApp:** 56px, appears after the hero, hides from the booking section to the end of the page (FP-D67).
- **Footer wordmark:** FLATPROOF edge to edge of the content column, a dim navy silhouette lit by a sweeping teal scan line (FLAT silver, PROOF teal), with a reflection below (FP-D66).
- **Cursor:** the normal arrow and hand, drawn in teal with a white edge and a soft shadow, so they read on paper, navy, ink, a teal button and the thermal image alike. CSS only (no script), mouse and trackpad only; text fields keep the system caret; high-contrast mode keeps the system cursors. A 2x drawing keeps them sharp on high-density screens (FP-D68).

## 8. Imagery

Eight AI image slots and one real photo (the window-sill case); prompts in `IMAGE_PROMPTS.md`. Shared direction: photoreal, natural daylight, cool clean whites, navy and teal in wardrobe and props, real Pune apartment details. Every slot shows a designed placeholder until its file exists. Photos are pre-built AVIF and WebP files at fixed widths, served as static files and cached for a year; the rest of the page's photos are fetched once it has loaded (FP-D70). The construction service uses an illustration of site work, never presented as a VP Constructions project (FP-D73).

## 9. Accessibility

Landmarks, one H1, a skip link, `lang="en-IN"`. Focus ring 2px with a 3px offset: teal on light, teal-light on dark. Tap targets 44px at least (menu 48px). The full keyboard path runs from the calls to action through Scan again and the four report rows, which are real links in a labelled list (the photo's markers are decorative). Every animation has a reduced-motion path. Dimmed text never drops below its contrast floor (FP-D46).

## 10. Left out on purpose

A stat row, monospace data labels, eyebrows and all-caps labels, numbered cards outside the real sequence, side-stripe accents, glows behind images, pulsing dots, gradient text, and any fake proof: no invented reviews, ratings, prices, certifications, team names or logos.
