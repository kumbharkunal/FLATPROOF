# Decisions
Conflicts between the brief, the client facts, the skills and the references, and how each was settled. Precedence: brief > verified client facts > accessibility and performance > skill guidance > inspiration. New decisions are appended with the next number.

## Settled with you (2026-11-13)
- **FP-D1. Daylight hero, not the ink hero.** PDI PRO INDIA (2026-11-12) already opens on a night photo with a cursor torch and a lights-on arc; AutoLens used a lens with pins. A dark hero with a thermal lens would read as the same device recoloured (scroll-craft's signature test). The hero is the flat as it looks on handover day; the dark arc starts below it.
- **FP-D2. Reversed logo on dark grounds** (navy parts to white, teal kept, no shape change). Flagged in CLIENT_QUESTIONS for the client's sign-off.

## Design system
- **FP-D3. Typeface: Zalando Sans Expanded + Zalando Sans.** The brief suggests Archivo or Switzer, but Archivo appears in three recent builds (PDI PRO INDIA, PRUVO, FIXCAR) and Switzer in PDI; Mona/Hubot (PAINTITRIGHT) and Instrument (ONCEINABLUEMOON, KC97ORG.IN) are also taken. Zalando Sans is OFL, variable, has a wide cut for the spec-sheet voice and round geometric bowls that sit with the logo. Gate: ₹ glyph, `tnum`, overflow at 360px; fallback Geologica.
- **FP-D4. Brand navy is the main dark ground; ink only for Stakes, the case file and the footer.** Avoids frontend-design's "near-black + one bright accent" tell and keeps the dark sections recognisably FlatProof.
- **FP-D5. No monospace; tabular figures in Zalando Sans.** frontend-design lists "a monospace face for small data labels" as a tell.
- **FP-D6. Lines only where they measure** (dimension lines, tape ticks, the plan, index rows). No decorative hairline rules (frontend-design's broadsheet tell).
- **FP-D7. No stat row.** Each number lives where it is proven: 125 on the tape, 24h in step 3, non-destructive in step 1 and the FAQ, 100+ in the lineage line (needs confirmation).
- **FP-D8. Revision clouds are the only marking device**, used for defects only, in amber.
- **FP-D9. Glass only on the nav pill and the phone menu sheet** (declared in DESIGN.md so impeccable's detector reads it as intentional).
- **FP-D10. Teal contrast.** Teal is never small text; teal-ink #016E82 for small teal text on light (the brief's #017D93 fails on mist at 4.34); teal-light #3FC1D6 on ink/navy; the teal CTA carries an ink label (4.88).

## Content and honesty
- **FP-D11. Sections cut:** "Engineers who build" as a standalone (too few verified facts; folded into Process, the construction service row and the footer) and "Know the defects" (overlaps the checklist and the case file).
- **FP-D12. Facebook hidden.** The profile found (profile.php?id=61595743364212) is theirs (logo matches) but it is a personal-type profile with no posts, not a Page. Stored with `show: false`.
- **FP-D13. Hero findings carry "how it's found", not severity.** Severity appears only where the sample report states it (Report section).
- **FP-D14. Thermal view labelled as a simulation; no temperatures.** The lens needle shows relative heat from a luminance grid.
- **FP-D15. RERA s.14(3) appears only if its wording is verified from an official source.** Their site's "MahaRERA Section 14(3)" tag is a client claim.
- **FP-D16. No AI images of "VP Constructions projects."** The construction row uses linework until real photos arrive.
- **FP-D17. `noindex` while the site is a pitch demo** (`site.seo.noindex`), so it never competes with vpconstro.com in search.
- **FP-D18. Unconfirmed wording removed:** "certified", "licensed", "foremost", "millimetre-accurate".

## Skills
- **FP-D19. taste-skill: scripts by path only.** Invoking it registers a blocking 600s Stop hook (PDI D27). Its house rules that clash with the brief (no Lenis on service pages, opaque nav, pointer light "tech only") are waived.
- **FP-D20. impeccable via `npx` with `DO_NOT_TRACK=1`, never with hooks** (PDI D26).
- **FP-D21. gstack: checklists only.** `/qa` and `/design-review` commit and write `.gstack/` into OneDrive (PDI D17).
- **FP-D22. scroll-craft: method only** (one peak, signature-move test, feeling curve, "a line drawing that builds itself"); not its engine or `data-sc-*` scaffolding.
- **FP-D23. hairline skipped.** A second pointer-reactive figure would compete with the lens; our drawings are orthographic plans.
- **FP-D24. Skills are already installed in `~/.claude/skills`.** I read each SKILL.md directly before its area instead of reinstalling (duplicates would double-trigger). Repo-only references go into gitignored `.design-refs/`.
- **FP-D25. web-design's L3 tier (WebGL + 6 signature motions) waived;** its DESIGN.md headings and five control states are kept.

## Engineering
- **FP-D26. Infra ported from PDIPROINDIA (same author) and adapted:** the transform-only reveal technique, Lenis/GSAP sync, lazy ScrollTrigger, the menu dialog, the image pipeline, the screenshot script and the Playwright suite. The look is not ported.
- **FP-D27. The lens is transform-only** (static feathered mask, counter-translated thermal layer). Per-frame `mask-position` would repaint every frame.
- **FP-D28. H1 entrance is CSS-only;** SplitText never touches the LCP element (PDI D9).
- **FP-D29. `scrub: true`, not a number,** to avoid double smoothing with Lenis (PDI D15).
- **FP-D30. Reduced motion means gentler, not zero:** crossfades stay; pins, scrubs, loops and the lens go (Emil; PDI D12).
- **FP-D31. `will-change` only while a tween runs** (Emil over gsap-performance; PDI D14).
- **FP-D32. The touch auto-tour has a visible pause control** (WCAG 2.2.2: motion longer than 5s).
- **FP-D33. Custom cursor (brief) over awwwards' "keep the native cursor";** hidden only after mount, restored under forced colours.
- **FP-D34. IMAGE_PROMPTS.md before BRIEF.md.** The brief's §8 and §14 both say "first"; the prompts went first so image generation can start.
- **FP-D35. Rupee sign from a 2.7 KB per-glyph fallback.** The font gate showed Zalando Sans has no ₹ (U+20B9), even in latin-ext. A Google Fonts `text=` subset of Hind SemiBold (Indian Type Foundry, OFL) holding only ₹ sits behind Zalando in the font stack via `unicode-range`; it loads only where ₹ appears. Zalando loads `latin` only (one preloaded 86 KB variable file with the width axis). Gate also confirmed: H1 fits at 360 and 390px; `tabular-nums` works.
- **FP-D36. Logo files are cut, never redrawn.** `scripts/logo.mjs` keys out the avatar's off-white disc by colour un-mixing (clean edges, no halo) and, for dark grounds, projects pixels onto the navy line to turn only navy strokes white. The roof/clip green-teal (#027D76) and the teal (#0992AC) stay untouched. Source copied to `assets/brand/logo-source.jpg` so the script runs without `reference/`.
- **FP-D37. Real case photo kept with the client's own watermark.** The crop is the photo area only (1280×957 from the Instagram screenshot); the FlatProof watermark is part of their photo and sits clear of the three annotation clouds.
- **FP-D38. The `/verify` gstack onboarding prompts (upgrade 1.97 → 1.99, routing rules in CLAUDE.md) were skipped:** the brief allows stops only for real blockers, and neither touches this build. Its checks (lint, typecheck, build) run before every code commit; the tests lane maps once the Playwright suite exists.
- **FP-D39. Proportional lining figures, not tabular.** Zalando Sans's tabular figures slash the zero and widen the space character (measured in the browser), so "1,120.00 sq ft" read as "1,12Ø.ØØ  sq  ft". Figures are proportional lining everywhere; the odometer stays steady because each digit has its own fixed column.
- **FP-D40. Full-bleed hero from 1024px, not 768px.** A 16:9 photo covering a portrait tablet (768×1024) crops the socket and skirting out of frame. Below 1024px the hero uses the 4:5 crop, full width on phones and capped at 560px on tablets.
- **FP-D41. Services are an unnumbered index.** They are not a sequence; numbers stay in How it works only (frontend-design).
- **FP-D42. Stakes marks are a CSS wavy underline**, not an SVG cloud: it wraps across lines with no measuring code and survives SplitText (which wraps words in inline-blocks, so the underline is applied to each split word too).
- **FP-D43. The readout panel sits under the hero copy on desktop** (same left column), so it can never cover a finding or the CTAs; the "simulated scan" caption moves to the top-right of the stage on desktop.
- **FP-D44. Motion only where it is lazy: the phone menu.** The brief asks for Motion on the nav indicator, accordions and toggles, and also for a first-load budget (measured 248 KB gzip with Motion in the always-rendered nav; budget 200 KB). Brief items conflict, so the measurable budget wins for implementation details: the sliding active-link indicator is a Web Animations FLIP (same behaviour, transform only), the accordions are CSS disclosures (grid rows 0fr to 1fr, `inert` when closed), and Motion (AnimatePresence, clip-path morph, staggered links) stays in the phone menu, which loads on first open and is prefetched when the browser is idle. Result: 187 KB gzip first-load JS for `/`.
- **FP-D45. Scroll scenes start near their section or on first interaction.** Initialising every scene at load put about 2.3 s of style and layout work on a throttled phone (Lighthouse performance 72). Each scene now starts when its section is within a screen, or on the first pointer, key, wheel, touch or scroll event (a nav click's pointerdown comes before its click, so pins exist before any anchor scroll), with an 8 s fallback. With the transform-only lead entrance and no SVG blur filter: performance 97 to 98, LCP 1.1 to 1.2 s, TBT 140 to 190 ms, CLS 0 to 0.004 (local, mobile).
- **FP-D46. Dimmed text never drops below its contrast floor.** Stakes words wait at 38% opacity (about 3.3:1, large text) instead of 16%, and the case-file notes never dim: their badges carry the emphasis. Found by axe in QA pass 1.

## QA pass 2 (2026-11-13)
- **FP-D47. The wide hero needs a wide screen.** The full-bleed 16:9 hero now applies at 1024px and up *and* at least 5:4 (`HERO_WIDE` in `components/hero/layout.ts`, mirrored in `globals.css`). A portrait iPad Pro (1024×1366) cropped two of the four findings out of frame; it now gets the stacked 4:5 layout. The drawn room was redrawn for the same reason: its back wall starts at 49.5% across (right of the headline column at every width from 1024 to 2560, so no line crosses the copy) and all four findings sit between 61% and 78% across, so they stay in frame down to 5:4 (at 1024×768 the socket had been off-screen). The switchboard moved to the back wall and is drawn in the plate's own perspective, with a three-pin socket.
- **FP-D48. No side stripes.** impeccable's detector flagged the 3px/4px inset stripes on the active service row and the report rows (its "side-tab" tell). Severity is carried by the tag alone; the mini report in How it works uses a small severity pill per row and fades out like a longer list; the active service row gets a teal measure tick and a transform-only slide (it was a padding transition, which also broke the transform/opacity-only motion rule).
- **FP-D49. Focus order: Thermal view switch, then the findings.** The readout panel now precedes the stage in the DOM (CSS `order` keeps the stage above the panel on stacked layouts). Before, turning the switch on and pressing Tab skipped all four findings and left the hero. The Playwright test now asserts focus lands on a finding.
- **FP-D50. Cursor labels never cover the button.** The brief asks for short labels on CTAs; the label was an 86px teal disc centred on the pointer that hid the button's own text. It is now a small tag below-right of the pointer, and the dot stays at the pointer.
- **FP-D51. The nav pill stays in view through in-page jumps.** `goTo` announces the jump (`fp:anchor`) and the pill ignores scroll direction for 1.6s, so a reader who used the nav arrives with it visible; it still hides on the next scroll down.
- **FP-D52. The report is complete wherever a jump lands.** Its desktop scrub ends when the section's top reaches 20% of the screen (it ended with the sheet's bottom at 75%, so a nav or "See a sample report" jump showed one finding of three).
- **FP-D53. Figures never break from their units.** Non-breaking spaces (` `, explicit in `site.ts`) glue "31.60 sq ft", "24 hours" and "125+ points"; the report meta values never wrap inside themselves and wrap as whole items. The approved WhatsApp texts are untouched.
- **FP-D54. Detector and checker findings kept on purpose.** impeccable: the ironbow purples are thermal imagery, which the brief asks for (the report thumbnail is now a drawn thermal frame, not a CSS gradient); teal-light on navy is the brand's AA tint for dark grounds; the lock pulse's single overshoot (`back.out`) is the instrument locking on; the placeholder room is flagged as shape-assembled until the hero photos replace it. taste-skill copy-lint: the 28/32/38/27 "stat strip" is the brief's own checklist split, drawn as the tape. taste-skill consistency: its house rules (one section per screen, nav as wide as the content column, no pins or scroll-linked scenes) yield to the brief; its real finds (orphaned "ft", misaligned deficit row, empty readout panel) were fixed.
- **FP-D55. One accessory off: the idle "Scanning" chip.** frontend-design's last pass asks to remove one decorative element before shipping. The black "Scanning" pill rode beside the lens all the time on desktop and said nothing the ring and needle don't; it now appears only on lock, in amber, naming the finding.
