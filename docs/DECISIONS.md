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
