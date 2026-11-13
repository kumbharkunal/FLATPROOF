# FlatProof Inspections: award-level demo homepage (Phase A plan)

## Context
FlatProof Inspections (Pune and PCMC, "a product of VP Constructions") sells pre-possession flat inspections. Their site, vpconstro.com, is a generic AI template (Tailwind CDN, pill eyebrows, "Book Now →" cards, an SVG re-drawing of the logo). You are pitching a redesign; this homepage is the pitch. Phase B builds it in this folder, QAs it, pushes to github.com/kumbharkunal/FLATPROOF and deploys to flatproof.vercel.app.

Settled with you in this session: (1) references added and studied (§2), (2) **daylight hero** instead of the ink hero, (3) a **reversed logo** (navy parts to white, teal kept) is allowed on dark grounds, flagged for client sign-off.

---

## 1. Executive summary
- **Concept: "Beneath the finish."** Every new flat looks finished on handover day. The hero is that bright, perfect flat; a thermal camera shows what paint hides; the rest of the page goes beneath the surface (ink, navy) and comes back up as proof (a white report). Your arc survives below the hero: ink → navy → mist → white.
- **Signature (the one place we spend boldness):** the hero inspection lens, built as an *instrument*, not a spotlight. An ironbow scale ring with a live needle, lock-on to hidden defects, a "Found 2 of 4" tally, and each finding deep-links to its evidence further down. This passes scroll-craft's signature test that a recoloured torch (PDI PRO INDIA) or a pinned lens (AutoLens) would fail.
- **Positioning from research:** rivals shout 200 to 400 points; FlatProof shows *method and evidence*: every check names how it's tested, the builder-ready report is the product, the carpet-area deficit is shown in sq ft (and in ₹ at the buyer's own rate), the real window-sill case is annotated like an engineer's drawing, and every service books on WhatsApp with a prefilled message.
- **System:** Zalando Sans Expanded + Zalando Sans (new to your studio; round geometric bowls sit with the logo), brand navy/teal with ink and mist, thermal red/amber reserved for severity, revision clouds as the marking device, tabular figures, no monospace.
- **Stack:** Next 16.4.6, React 19.3.1, Tailwind 4.3.5, GSAP 3.15.1 (ScrollTrigger, DrawSVG, SplitText), Motion 14.13.0, Lenis 1.3.27. Proven infra ported from your PDIPROINDIA build (composite-only reveal, Lenis sync, menu dialog, image pipeline, Playwright QA).
- **Assets:** 7 AI image slots + 1 real photo (window sill), each with a designed placeholder; `npm run images` converts the inbox and generates thermal twins.
- **Ready to ship:** repo exists (private, empty), Vercel CLI logged in (one hobby team, no `flatproof` project yet), `flatproof.vercel.app` currently unassigned. Possible blocker: the Vercel GitHub App may need access to the private repo for auto-deploys.

---

## 2. Research digest (with sources)

**Tool limits hit (honest note).** WebFetch and WebSearch failed on a backend model error for me and for the agents, so pages were read in Chrome or with read-only curl. Chrome's extension blocks instagram.com, youtube.com and indiacode.nic.in. The Vercel MCP disconnected after the account switch (CLI works). The skills agent hit the rate limit, so A3 below comes from my direct reads plus your PDIPROINDIA decision log of 2026-11-12.

### A1 Business (facts checked 2026-11-13)
- **vpconstro.com** (read in Chrome): every §1 fact confirmed: 125+ (28/32/38/27), the named checkpoints, tools, six services and their bullets, three steps, stats (125+, 100+ properties, 100% non-destructive, 24 hours), contact. Sample-report modal confirmed verbatim, plus one extra line: *"Danger of appliance damage."*
- **Extra lines on their site:** "Builders have marketing teams; you deserve licensed civil engineers." Also "certified engineering reports", "licensed engineers", "Pune's foremost…", "Millimeter-accurate laser", and a "MahaRERA Section 14(3)" tag. All of these are claims to confirm; none appear on the new site unconfirmed.
- **14 wa.me links** captured with prefilled text (one per service plus booking, checklist and sample-report variants). Reused verbatim in the content file. **The current site links no social profiles.**
- **Logo:** the site's header logo is an SVG re-drawing set in Plus Jakarta Sans 900, not the master. The master is `reference/logo.jpg` (1080², IG avatar crop on black). Navy clipboard and magnifier, teal-to-green gradient roof and tick, heavy geometric wordmark. Gradients mean it stays raster (an SVG trace would not be indistinguishable).
- **Instagram** (from the 8 reference screenshots): @flatproof.inspections; name line "inspection, consultation and construction"; bio "Certified pre-handover checks for new Home, consultancy and construction."; links vpconstro.com; 11 posts, 14 followers (never shown). Posts dated 30 Oct to about 7 Nov 2026, tagged Pune City / Pune, Maharashtra; CTA "DM us 'INSPECT'". Two posts carry Instagram's "AI content" label. **Only the window-sill photo is a real site photo**; its caption names three faults (hollow sub-base of loose white cement and filler, no bond with the masonry, no waterproof seal at the frame-to-sill joint). The posts already use magnifier circles to reveal defects, so a lens is brand-native. Reels (logo reel, presenter reel) could not be viewed.
- **Facebook:** https://www.facebook.com/profile.php?id=61595743364212, "Flatproof Inspections". Its picture is the FlatProof logo, so it is theirs, but it is a personal-type profile (Add friend) with no posts. It is not a Page, so per your rule it is **not shown**; it is stored with `show: false`.
- **Not found:** Google Business Profile (Maps returns unrelated shops), JustDial, LinkedIn, YouTube (Bing: phone number, handle, brand name).
- **Unrelated "VP Constructions" hits:** vpconstructionsllp.com (a Pune developer) and IG @vp_constructions_and_interiors. Neither can be tied to FlatProof's parent: never linked, asked in CLIENT_QUESTIONS.

### A2 Category (agent, curl-read pages)
- **Pune rivals:** SureChk (surechk.com), the closest: engineers, thermal/moisture/laser, health-score report, 24h, WhatsApp quote, generic Bootstrap. SnagEasy (snageasy.in/home-inspection-pune): 200+ points, from ₹6k/8k/10k by BHK, builder email template. PropChk (propcheck.in): 400+ points. Prop Checkup (propcheckup.com): award walls, contradictory counters. Magicbricks partner: ₹11,032–19,469. NoBroker: generic, defaults to Bangalore. Meazurement: no live site.
- **International best:** HomeSnag UK (homesnag.co.uk: public prices, report deadline, deposit, RICS); Spectora and HomeGauge (spectora.com/sample-reports, homegauge.com/one/create-request-list: web reports, repair-request lists); Inspectify (inspectify.com: most polished); Jim's AU (live reviews); Property Snagging UAE (propertysnagging.ae). None is design-led.
- **Trust patterns that work:** public deadline; real findings instead of stock photos; a list you can hand to the other side; verifiable credentials; specific reviews.
- **Clichés:** points races and stale counters, template grids with emoji icons, copied copy, press-logo walls, the same lead form repeated.
- **Openings FlatProof can own:** method over points count; the builder-ready report as hero; carpet-area shortfall in money; WhatsApp-first booking; inspect-to-fix through VP Constructions (warranty-backed waterproofing).

### A3 Skills (summary; full table in §3)
frontend-design (two-pass review, the tell list), stop-slop (copy rules, ≥35/50), scroll-craft (one peak; the signature-move test: "a recoloured spotlight… is not one"; "a line drawing that builds itself"), taste-skill and impeccable (gates and detectors, run by path), gsap-skills and emil (technique), ui-ux-pro-max and web-design (UX checks, DESIGN.md format), awwwards/jury (method plus final scoring). getdesignmd library: searched engineering, architecture, real estate, industrial, technical: only AI/dev-tool systems, so used for format only. juliobsz/skills = the /awwwards + /jury pair (README read).

### A4 Inspiration (agent; awwwards MCP + galleries)
| Reference | Pattern to borrow | Leave behind |
|---|---|---|
| Heron AI, SOTD 12 Oct 2026, heronaiapp.com | Dimension lines that grow outward from a midpoint label (clip-path on a CSS var) → carpet-area plan | cream halftone collage |
| AI in Design Report 2026, SOTD, stateofaidesign.com | Feathered lens rim from a radial mask → lens edge | grain blobs |
| Shed, SOTD, shed.design | "The Index": ruled rows plus a docked preview column → services index | colour floods, giant caps |
| Meter, seesaw.website/websites/meter | `data-theme` per section read by fixed UI → nav pill theme | SaaS layout |
| Huey Lightshop, HM, hueylightshop.com | Labelled two-state toggle → "Thermal view" switch | parchment style |
| annnimate rising-stats / floating-navbar | Odometer that rolls back when you scroll up → 125 counter | card-rise choreography |
| Aceternity Lens, ui.aceternity.com/components/lens | Static mode as the touch/reduced-motion fallback | React state per mousemove |

Motion DNA (from shipped JS): Heron uses durations of 0.8 and 1.0s, expo.out and power2.out, mostly scrubbed; Shed uses 1.0s, expoInOut and power4.out.

**Fingerprint check against your recent builds** (their DESIGN.md files): Archivo appears in PDI PRO INDIA, PRUVO and FIXCAR; Switzer in PDI; Mona/Hubot in PAINTITRIGHT; Instrument Sans/Serif in ONCEINABLUEMOON and KC97ORG.IN. PDI = night + torch + lights-on; AutoLens = lens with pins. FlatProof avoids all of these.

---

## 3. Skills and references: adopted or rejected
Precedence (yours): brief > verified client facts > a11y and performance > skill guidance > inspiration. Decisions get logged as FP-D# in `docs/DECISIONS.md`.

| Source | Adopted | Rejected / limited, and why |
|---|---|---|
| frontend-design (anthropics) | Two-pass review (§4); tell list: no single-word accents, no all-caps labels, no eyebrows, no mono data labels, no "→", no middots, no identical card grids, no near-black + single bright accent; one memorable element; "remove one accessory" | none |
| stop-slop (hardikpandya) | No em/en dashes, active voice, specifics, every copy block scored ≥35/50 | The client's own contrast line ("…a snag list, not your hard-earned money") stays (brief > skill), used once |
| scroll-craft (nateherkai) | One peak (hero); signature-move test; feeling curve; "line drawing that builds itself" for the floor plan | Its engine and `data-sc-*` scaffolding (test-only attributes, PDI D19); our own shots.mjs instead |
| taste-skill (Leonxlnx) | Its gate and copy-lint scripts, run by path | Never invoked as a skill: it registers a blocking 600s Stop hook (PDI D27). House rules that clash with the brief (no Lenis on service pages, opaque nav, pointer light "tech only") are waived and logged |
| impeccable (pbakaus) | Detector plus audit/polish on `src/` and the live URL | CLI via `npx impeccable` with `DO_NOT_TRACK=1`, never with hooks (PDI D26). Its bans kept: glass only on the nav (declared in DESIGN.md), no glow behind the lens, no pulsing dots, no gradient text |
| ui-ux-pro-max | Focus never obscured (scroll-padding), safe areas, one z-index scale, exits at 60–70% of enter time, no CSS `scroll-behavior` with Lenis | Palette/font search results (generic) |
| web-design (xiaopu-ai) | DESIGN.md headings; five states per control | Its L3 tier (WebGL + 6 signature motions) waived: no WebGL is earned here |
| awwwards + jury (juliobsz) | Method, Concept Card, jury score on the live URL at the end | Its engine/scaffold (loader, OGL, curtain), PDI D36 |
| gsap-skills (greensock) | Register once; `useGSAP({scope})` + `gsap.matchMedia`; ScrollTrigger on top-level timelines; pin a wrapper; refresh after fonts/images; `quickTo` for followers; `ignoreMobileResize` | SplitText only on the Stakes paragraph, never on the H1 (LCP, PDI D9) |
| emil skills | Press scale .97; interruptible, asymmetric exits; never a CSS var on a parent to move children; will-change only during tweens; reduced motion = gentler, not zero | His default ease loses to our tokens (brief) |
| apple-design / gestures | 1:1 lens drag, interruptible menu morph, feedback on pointer-down | none |
| addyosmani agent-skills | Perf budget, launch checklist, DevTools console pass | none |
| gstack (garrytan) | Its QA checklists, folded into Playwright/Lighthouse | `/qa` and `/design-review` runtimes: they commit and write `.gstack/` into OneDrive (PDI D17) |
| anthropics webapp-testing | Method via Node `@playwright/test` | Python Playwright (PDI D34) |
| awesome-design-md / getdesignmd | DESIGN.md format (Stitch layout, PDI D38) | No relevant systems in the library |
| 21st (skill + MCP) | MCP search for reference only (glass pill, odometer) | Generation is metered (PDI D37) |
| hairline (lucasmarkes) | none | A second pointer-reactive figure competes with the lens; our drawings are orthographic plans, not isometric |
| getdesign CLI | none | Needs third-party API keys |
| PDIPROINDIA (your build) | Port and adapt: `HeroMotion.tsx` technique, `SmoothScroll.tsx`, `lib/gsap.ts` (lazy ScrollTrigger), `MobileMenu.tsx`, `scripts/process-images.mjs`, `scripts/shots.mjs`, `tests/site.spec.ts` | Its look: night palette, orange, Archivo/Switzer, torch, price tag |

**Skills install (Phase B):** every listed skill is already installed in `~/.claude/skills` (verified). I'll read each SKILL.md directly before its area rather than reinstalling; repo-only references (awesome-design-md) are cloned into gitignored `.design-refs/`.

---

## 4. Creative direction and tokens

### Concept card
| Field | Value |
|---|---|
| Idea | The finish hides the faults; instruments find them; a report proves them |
| Metaphor | The inspector's instruments (thermal camera, laser, tap test) plus the engineer's markup |
| Signature | Thermal lens with scale ring, lock-on, tally and evidence links (hero only) |
| Marking device | **Revision cloud**: the scalloped outline engineers draw on drawings to flag an issue. Used for defects only |
| Emotion | Delight → doubt → control → relief |
| Motion verb | Measure: lines extend, counters land, clouds get drawn, findings lock |
| Peak sentence | "It's the site where you sweep a thermal camera over a sunny new flat and watch it lock onto damp, bad wiring and hollow tiles nobody can see." |

**Feeling curve:** Hero curiosity ("I can see what they see") → Stakes doubt ("mine could hide this") → Checks confidence ("they test everything, with a method") → Process ease ("one visit, 24 hours") → Report control ("proof for the builder") → Carpet area leverage ("I might be short") → Case file trust ("they find real things") → Services breadth → FAQ reassurance → CTA resolve.

### Two-pass review (frontend-design)
**Pass 1, my honest first instinct:** ink hero with a cursor lens; Archivo Expanded + Switzer; teal on near-black; monospace readouts; hairline spec-sheet rules everywhere; 01/02/03 on every block; a stat row (125+ · 100+ · 24h · 100%); fade-up on every section.

**Review against the brief and your last builds, and what changed:**
1. Ink hero + lens = PDI's torch recoloured → **daylight hero, instrument lens** (lock-on, ring, tally, evidence links).
2. Archivo/Switzer = in three of your recent builds → **Zalando Sans Expanded / Zalando Sans**.
3. Teal on near-black = the "near-black + bright accent" tell → **brand navy is the main dark ground**; ink only for two deep bands; teal used for function (measure lines, CTA, focus).
4. Mono readouts (tell) → **tabular figures** in Zalando Sans.
5. Hairline broadsheet (tell) → **lines appear only where they measure** (dimension lines, tape ticks, plan, index rows); sections separate by ground change.
6. Stat row ("big number, small label" default) → **each number lives where it is proven**: 125 on the tape, 24h in step 3, non-destructive in step 1 and the FAQ, 100+ in the lineage line (pending confirmation).
7. Numbering only in How it works (a real sequence). No eyebrows. One motion per section that explains its content.

### Differentiation from PDI PRO INDIA
| | PDI PRO INDIA | FlatProof |
|---|---|---|
| Hero | Night photo, torch beam | Daylight photo, thermal instrument |
| Arc | Night → lit | Bright surface → beneath → white proof |
| Type | Archivo Expanded + Switzer | Zalando Sans Expanded + Zalando Sans |
| Palette | Night + orange | Navy/teal + mist; red/amber only for severity |
| Devices | Price tag, stamp, pinned inspection | Revision cloud, laser dimension line, measuring tape |

### Colour tokens (contrast measured this session, WCAG 2.x)
| Token | Hex | Role | Measured |
|---|---|---|---|
| paper | #FFFFFF | report, light grounds | ink 17.96 · navy 12.01 · slate 5.95 · teal-ink 5.91 |
| mist | #EEF4F6 | process, carpet area, FAQ | navy 10.82 · slate 5.36 · teal-ink 5.32 · critical 4.95 |
| ink | #0E1726 | Stakes, case file, footer; body text on light | white 17.96 · teal 4.88 · teal-light 8.39 · steel 8.68 |
| navy | #29374D | brand; Checks and CTA grounds; headings on light | white 12.01 · teal-light 5.61 · steel 5.81 · **teal 3.26: large only** |
| teal | #0192AB | CTA fill with **ink** label (4.88), lines, icons, big numerals, focus on light (3.68 ≥ 3:1 UI) | 3.68 on white: never small text; white-on-teal fails |
| teal-ink | #016E82 | links and small teal text on light; white-on-teal-ink buttons | 5.91 white · 5.32 mist |
| teal-light | #3FC1D6 | teal text, links and focus on ink/navy | 8.39 ink · 5.61 navy |
| slate | #55657A | secondary text on light | 5.95 · 5.36 |
| steel | #A7B6C6 | secondary text on dark | 8.68 ink · 5.81 navy |
| line | #D5DFE5 | rules and ticks only, never text | 1.35 |
| critical | #C4321C | severity "Critical" | white on it 5.50 · on mist 4.95 |
| amber / amber-ink | #F59E0B / #A1530A | "Medium" fill (ink label 8.36) / amber text on light (5.59) | |
| ironbow LUT | black → indigo → magenta → orange → yellow → white | thermal imagery and the lens ring only | |
| roof-green | sampled from logo | inside the logo only | |

The brief's #017D93 passes on white (4.82) but fails on mist (4.34), so teal-ink #016E82 is the single small-text teal.

### Typography
- **Zalando Sans Expanded** (display: H1, H2, big figures) + **Zalando Sans** (text and UI). One superfamily by Jakob Ekelund / KH Type, OFL, variable wght 200–900, via `next/font/google` (self-hosted, `adjustFontFallback`). Confirmed on Google Fonts today. Round geometric bowls echo the logo's wordmark without copying it; the wide cut gives the spec-sheet voice.
- **Phase B gate (30 min):** render the H1 and nav next to the logo at 360/390/1440; check ₹ (U+20B9) and `tnum`; overflow at 360. If it fails: **Geologica** (Monokrom, OFL; its sharpness axis tunes softness).
- Scale: H1 `clamp(2.375rem, 1.5rem + 3.9vw, 5.25rem)`/0.98/−0.03em/720 · H2 `clamp(1.875rem, 1.3rem + 2.4vw, 3.5rem)`/1.04/−0.02em/680 · H3 and figures `clamp(1.375rem, 1.15rem + 1vw, 2rem)`/1.12/640 · lead `clamp(1.125rem, 1.05rem + .35vw, 1.3125rem)`/1.5 · body 17px/1.6 (16px under 400px) · UI 15px/560 · micro 13px/600/+0.01em. Sentence case everywhere. `tabular-nums lining-nums` on every figure. Body measure ≤ 68ch.

### Space, shape, depth, icons
- 4px base (4·8·12·16·24·32·48·64·96·128). Sections `clamp(88px, 11vw, 168px)` vertical. Container 1280px; gutter `clamp(16px, 4.5vw, 56px)`. Grid 12/6/4.
- Radii by role: pill 999 (nav, buttons, tags) · lens 50% · panel 24 (report sheet, menu sheet) · media 16 · input 12 · chip 8.
- Shadows only on floating things, navy-tinted: nav `inset 0 1px 0 rgb(255 255 255/.5), 0 8px 24px -8px rgb(14 23 38/.18)`; report sheet `0 2px 4px rgb(14 23 38/.04), 0 24px 48px -16px rgb(14 23 38/.18)`.
- z-index: content 0 · sticky 20 · floating WA 40 · nav 50 · cursor 60 · menu overlay 70 · sheet 80 · skip link 90.
- Icons: Phosphor, Light for tool illustrations and Regular for UI. Brand logos from theSVG only.

### Motion tokens (defined once in CSS and `lib/motion.ts`)
| Token | Value | Use |
|---|---|---|
| press | 120ms, scale .97 | buttons |
| ui | 220ms, `cubic-bezier(.25,1,.5,1)` (power3.out) | hovers, toggles |
| open | 420ms, `cubic-bezier(.16,1,.3,1)` (expo.out) | menu sheet, accordions |
| reveal | 700ms, expo.out | section reveals |
| draw | 900ms, `cubic-bezier(.65,0,.35,1)` (power2.inOut) | clouds, dimension lines |
| lock | 380ms, back.out(1.6), one overshoot | lens lock-on |
| follow | `quickTo` 0.35s power3.out | lens and cursor ring |
| stagger | 0.04s words / 0.08s items | |
| exit | 65% of enter | |
| scrub | `true` (no double smoothing with Lenis, PDI D15) | |
GSAP drives scroll-linked work; Motion drives UI state (nav indicator, menu, tabs, FAQ). Never both on one element.

---

## 5. Sections (10 content sections + nav + footer)
Cut, with reasons: **"Engineers who build"** as a standalone (few verified facts; folded into Process, the construction service row and the footer). **"Know the defects"** (overlaps Checks and the case file; the Instagram link covers education). Testimonials, pricing and team are content slots that render nothing until data exists.

Themes (nav reads `data-nav`): hero light (photo) · stakes **ink** · checks **navy** · process mist · report paper · carpet mist · case **ink** · services paper · FAQ mist · CTA **navy** · footer ink.

### S1 Hero `#top`
Purpose: show the problem and the service in one gesture; book.
- **H1:** Don’t take possession in the dark.
- **Lead:** Two engineers check your new flat against 125+ points, scan the walls with a thermal camera and measure the carpet area by laser. You get a snag report for your builder within 24 hours.
- **CTAs:** [Book on WhatsApp] (pre-possession message) · See a sample report (#report)
- **Lens UI:** hint "Move the camera over the room" (touch: "Drag the camera or tap the photo"); tally "Found 0 of 4", completing as "Found 4 of 4. Your inspection covers 125+ points." with a link to #checks; switch "Thermal view"; caption "Simulated scan for illustration. The defects are real ones from our checklist and site visits."
- **Findings** (finding + how it's found; severity lives in the report):
  1. Damp behind the skirting: "Cold patch on the thermal image: water inside the wall. Our sample report measured 86% moisture." Found with thermal camera and moisture meter. Links to #report.
  2. Socket wired the wrong way: "Neutral and earth reversed, earthing inactive. Appliances can get damaged." Polarity test. Links to #checks.
  3. Hollow under the tile: "A tap sounds hollow where the mortar bed has gaps. Hollow tiles can crack and come loose." Tap test. Links to #checks.
  4. Sill on loose filler: "Loose white cement under the granite and no seal at the frame. Rain can get in at that joint." Tap test and visual. Links to #case.
```
DESKTOP                                                        MOBILE (390)
+--------------------------------------------------------------+ +------------------------+
|        ( mark flatproof  Checks  How it works  Report         | | ( mark  [Book]  menu ) |
|          Services  FAQ   [Book on WhatsApp] )   light glass   | | Don't take             |
| Don't take possession      [full-bleed daylight photo]        | | possession in          |
| in the dark.                window + granite sill    .----.   | | the dark.              |
|                                                    | ring |  | | Two engineers... 24h.  |
| Two engineers check... 24 hours.   socket (cloud)  | +    |  | | [Book on WhatsApp]     |
| [Book on WhatsApp]  See a sample report             '----'   | | See a sample report    |
|                              skirting      floor tiles        | | +--------------------+ |
| Found 2 of 4   (o) Thermal view    Simulated scan...          | | | photo 4:5, lens    | |
+--------------------------------------------------------------+ | | sweeping 1..4      | |
  copy sits on a calm wall plus a paper scrim                    | +--------------------+ |
                                                                 | Found 1 of 4 [||] [TV] |
                                                                 +------------------------+
```
- **Motion:** the one orchestrated load: CSS-only H1 line-mask rise (600ms, 80ms stagger, starts at first paint, no SplitText on the LCP), lead and CTAs follow by 200ms. The lens powers on after the thermal twin decodes (ring arc draws 500ms, needle settles). Scrolling out, an ink overlay rises from the bottom of the photo (opacity only), handing over to Stakes ("going beneath"). Lens spec in §6.

### S2 Stakes `#stakes` (ink)
Purpose: why now, and what hides.
- **H2:** Every new flat looks perfect on handover day.
- **Body (display-m):** Fresh paint and putty hide hollow tiles, damp inside the walls, sockets wired the wrong way and a carpet area smaller than your agreement. You’ve put your savings into this flat, and the builder still needs your signature on the possession letter. That’s your best chance to get defects fixed.
```
DESKTOP                                         MOBILE
+-------------------------------------------+   +----------------------+
| Every new flat looks perfect on handover  |   | Every new flat looks |
| day.                                      |   | perfect on handover  |
|                                           |   | day.                 |
| Fresh paint and putty hide ~hollow tiles~,|   | Fresh paint and putty|
| ~damp inside the walls~, ~sockets wired   |   | hide ~hollow tiles~, |
| the wrong way~ and ~a carpet area smaller |   | ~damp inside...~     |
| than your agreement~. Until you sign...   |   | ...                  |
+-------------------------------------------+   +----------------------+
  ~ = amber cloud underline drawn as the phrase lights up
```
- **Motion:** SplitText words scrub from 16% to 100% (steel to white) while the paragraph travels from 70% to 30% of the viewport. Each defect phrase gets an amber scalloped "cloud underline" drawn once it is lit (built from `getClientRects()`, so it follows line wraps). Same on phones, no pin. Reduced motion: full text with clouds drawn.

### S3 The 125-point check `#checks` (navy)
Purpose: method, not a points race.
- **H2:** 125+ checks. Each one has a method.
- **Intro:** Four trades, checked room by room. Here are some of the points on each list; your report covers all of them.
- **Tape:** a measuring tape with 125 ticks (major every 5, labels every 25), four segments: Electrical and safety 28 · Plumbing and sanitary 32 · Masonry and finishes 38 · Doors, windows and balconies 27. The counter is an odometer that lands on 125 and rolls back if you scroll up.
- **Category panels** (examples from their site, each with how it's tested): polarity of phase, neutral and earth (tested at each socket) · MCB trip test · socket earthing · DB dressing (visual) | drain slope · trap seals · flush volume · diverter pressure · hot-water flow · hidden leaks (thermal camera and moisture meter) | hollow tiles (tap test) · wall plumb · plaster shrinkage vs structural cracks · paint uniformity · floor level | UPVC track weep holes · glass scratches · railing anchorage · weather-seal continuity.
- **CTA:** Get the full 125+ checklist on WhatsApp (their existing message).
```
DESKTOP (pinned ~120vh)                                MOBILE (no pin)
+------------------------------------------------+    +----------------------+
| 125+ checks. Each one has a method.        125  |    | 125+ checks. Each... |
| |''''|''''|''''|''''|''''|''''|''''|''''|''''|  |    | [tape, wraps 2 rows] |
| [ 28 elec ][ 32 plumb ][ 38 masonry ][ 27 doors]|    | 125                  |
| ( Electrical )( Plumbing )( Masonry )( Doors )  |    | > Electrical 28      |
|  Polarity: phase, neutral, earth   tested at    |    | > Plumbing 32        |
|  each socket   MCB trip test ...                |    | > Masonry 38         |
|  [Get the full 125+ checklist on WhatsApp]      |    | > Doors... 27        |
+------------------------------------------------+    +----------------------+
```
- **Motion:** desktop (≥1024, fine pointer, motion OK): pin a wrapper; scrub the tape from 0 to 125, filling segments in order, labels arriving at each segment end, odometer rolling. After release the tabs are live (Motion `layoutId` indicator). Phones: the tape fills once on enter (1.2s); categories are an accordion. Reduced motion: static tape at 125.

### S4 How it works `#process` (mist)
Purpose: ease; the real sequence.
- **H2:** One visit, one report.
- **1 Inspection on site:** Two civil and MEP engineers check the flat against the 125+ point list. Nothing gets drilled or broken. [tap-test photo]
- **2 Thermal and laser checks:** A thermal camera and a pinless moisture meter find damp inside walls. A laser meter measures every room for the carpet-area audit. [engineer-thermal photo; the three tools as line drawings]
- **3 Snag report within 24 hours:** A PDF with photos, every defect tagged by severity, ready to send to your builder. [mini report links to #report]
- **Lineage line:** FlatProof is a product of VP Constructions, a Pune firm that builds homes, commercial projects and roads. 100+ properties inspected in Pune so far. (Second sentence carries `needsConfirm`.)
```
DESKTOP                                         MOBILE
| One visit, one report.                    |   | One visit, one report.|
| (1)---------------(2)---------------(3)   |   | (1) Inspection on site|
| Inspection        Thermal and       Report|   |  |  [photo]           |
| on site           laser checks      in 24h|   | (2) Thermal and laser |
| [photo]           [photo] [3 tools] [mini]|   |  |  [photo] [tools]   |
| FlatProof is a product of VP Constructions|   | (3) Report in 24h     |
```
- **Motion:** a connector line draws between the steps on scroll (scaleX on desktop, scaleY down the left on phones); each number ticks as the line reaches it; tools slide 8px into step 2 as the line passes. Reduced motion: static.

### S5 The report `#report` (paper)
Purpose: show the product.
- **H2:** This is what you hand your builder.
- **Sub:** A sample report: every snag with a photo, a severity tag and the fix we recommend.
- **Report sheet** (HTML, labelled "Sample"): Ref FP-PUNE-2026-088 | Unit 804, Tower B | 3BHK | 1,480 sq ft | 18 snags tagged (a definition grid, no middot strings).
  - **Critical.** Thermal moisture anomaly, master bedroom wall. Infrared scan shows 86% subsurface moisture behind the skirting. Source: an unsealed AC drain conduit on the outer wall. Fix: high-pressure injection grouting and facade weatherproofing. *(Thumbnail: crop of the hero's thermal twin.)*
  - **Medium.** Kitchen 16A socket, neutral and earth reversed, earthing inactive. Risk of appliance damage. Fix: rewire at the DB before kitchen appliances go in.
  - **RERA audit.** Carpet area: agreement 1,120.00 sq ft, measured 1,088.40 sq ft, short by 31.60 sq ft. CAD dimension sheet attached for the builder.
  - Footer: Showing 3 of 18 snags. [Get the full sample on WhatsApp] [Book an inspection]
```
DESKTOP                                          MOBILE
| This is what you hand   +-------------------+ |  | This is what you...  |
| your builder.           | flatproof  Sample | |  | +------------------+ |
| A sample report...      | Ref  Unit  Area   | |  | | sheet, full width| |
|                         |#|Critical ...     | |  | | findings stack   | |
| [Get the full sample]   |#|Medium ...       | |  | +------------------+ |
|                         |#|RERA audit ...   | |  | [Get the full sample]|
|                         | 3 of 18 snags     | |  |                      |
```
- **Motion:** the sheet rises once; findings stack onto it one by one as you scroll (desktop scrub over about 40vh; phones triggered); each severity bar grows from the left edge and its tag settles (1.04 to 1). Reduced motion: static.

### S6 Carpet-area audit `#carpet-area` (mist)
Purpose: turn a technical check into money.
- **H2:** Measured: 31.60 sq ft short.
- **Body:** You pay for carpet area under RERA. We measure every room with a laser meter, compare it with your agreement and give you a CAD dimension sheet for the builder.
- **Readout (tnum):** Agreement 1,120.00 sq ft · Measured 1,088.40 sq ft · Short 31.60 sq ft (clouded).
- **Calculator:** "Your agreement rate (₹ per sq ft)" input; empty by default, result `Intl.NumberFormat('en-IN')`: "31.60 sq ft × ₹9,000 = ₹2,84,400 you paid for and didn't get." No default rate, so no invented price.
- **Note:** Plan is illustrative. Figures from sample report FP-PUNE-2026-088. [laser-measure photo inset]
```
DESKTOP                                         MOBILE
| Measured: 31.60 sq ft short.               |  | Measured: 31.60 sq ft|
| +---------------------+  Agreement 1,120.00|  | short.               |
| | 3BHK plan linework  |  Measured  1,088.40|  | [plan, full width]   |
| | |<--- 3.62 m --->|  |  Short (31.60)     |  | Agreement / Measured |
| +---------------------+  [rate input] = ₹  |  | Short (cloud)        |
```
- **Motion:** "a line drawing that builds itself": the plan's walls draw with scroll (stroke-dashoffset scrub), then dimension lines grow outward from midpoint labels (Heron pattern), then the figures count (0.9s, tnum) and the deficit gets its cloud. Reduced motion: the finished drawing.

### S7 Case file `#case` (ink)
Purpose: real evidence from a real visit.
- **H2 (their line):** What looks like a minor patch today becomes a major expense tomorrow.
- **Body:** On a recent pre-possession inspection in Pune, our engineers flagged this under a window sill. The granite slab sat on loose white cement and filler instead of compacted cement-sand mortar.
- **Annotations on the real photo** (clouds + leaders): Hollow sub-base: white cement can't carry the slab in thick gaps. · No bond: dry filler keeps the granite from bonding with the wall below. · No seal: nothing waterproofs the joint where the window frame meets the stone.
- Link: More from our site visits on Instagram.
```
DESKTOP                                          MOBILE
| What looks like a minor patch today...     |  | What looks like a ...|
| +--------------------------+  (a) Hollow   |  | +------------------+ |
| | real sill photo          |  sub-base ... |  | | photo, 3 clouds  | |
| |  cloud a  cloud b        |  (b) No bond  |  | +------------------+ |
| |        cloud c (frame)   |  (c) No seal  |  | (a) ... (b) ... (c)  |
| +--------------------------+  Instagram    |  | More on Instagram    |
```
- **Motion:** the photo reveals with a short clip-path wipe; clouds draw in sequence as you scroll and each label slides out along its leader (DrawSVG). Phones: clouds on the photo, keyed (a)(b)(c) to the list below. Reduced motion: static.

### S8 Services `#services` (paper)
Purpose: breadth; every row books.
- **H2:** Every service books on WhatsApp.
- **Sub:** Pick one and we’ll open a chat with the details filled in.
- **Rows** (name · what it covers · how · [Ask on WhatsApp] with their prefilled message):
  1. Pre-possession inspection: 125+ points, thermal scan and carpet area, report in 24 hours.
  2. Water-leak detection and waterproofing: a thermal scan finds the source without breaking walls; warranty-backed waterproofing fixes it.
  3. Carpet-area measurement: laser, RERA carpet vs built-up area, CAD dimension sheet.
  4. Rental flat inspection: move-in and move-out logs with photos, for tenants and owners.
  5. Consultancy: structural stability, crack diagnosis, society handover and redevelopment.
  6. Building construction and infrastructure, by VP Constructions: turnkey homes, commercial buildings, roads and civic projects.
```
DESKTOP (index + docked preview)                 MOBILE (accordion rows)
| Every service books on WhatsApp.           |  | Every service books..|
| Pre-possession inspection   125+ ... [Ask] |  | Pre-possession   [+] |
| Water-leak detection ...         [Ask]  [photo]| Water-leak ...   [+] |
| Carpet-area measurement ...      [Ask]  [docked]|  (open: text, method,|
| Rental flat inspection ...       [Ask]  [preview]| [Ask on WhatsApp])  |
| Consultancy ...                  [Ask]     |  | ...                  |
| Building construction, by VP ... [Ask]     |  |                      |
```
- **Motion:** quiet. The docked preview crossfades on row hover/focus (220ms). No entrance animation.

### S9 FAQ `#faq` (mist)
**H2:** Before you book. Verified answers only; unknowns are hidden (`show: false`) and listed in CLIENT_QUESTIONS.
- When should I book? Once the builder gives you a possession date, before you sign the possession letter. Already have the keys? Message us and we’ll tell you what we can still check.
- What do I get? A PDF snag report within 24 hours: every defect with a photo, a severity tag and a recommended fix, ready for your builder. Carpet-area audits add a CAD dimension sheet.
- Will you break walls or tiles? No. Every check is non-destructive: thermal camera, pinless moisture meter, laser meter and tap tests.
- Who inspects? Two civil and MEP engineers from FlatProof, a product of VP Constructions.
- Do you inspect rental flats? Yes. We log the flat’s condition at move-in and move-out with photos, for tenants and owners.
- Which areas do you cover? Pune and PCMC.
- What can I do with the report? Send it to your builder and ask for fixes before you take possession. (RERA s.14(3) sentence added only if verified from an official source.)
- How do I book? WhatsApp or call +91 96575 55588, or DM “INSPECT” on Instagram.
- Hidden until confirmed: duration, whether the buyer must be present, price, resale flats.
- **Motion:** Motion height plus opacity accordion (open 420ms, close 270ms); one open at a time; buttons with `aria-expanded`/`aria-controls`.

### S10 Final CTA `#book` (navy)
- **H2:** Book before you sign.
- **Body:** Hand the builder a snag list, not your hard-earned money.
- **Actions:** [Book on WhatsApp] · Call +91 96575 55588 · info@vpconstro.com · DM “INSPECT” on Instagram (ig.me/m/flatproof.inspections, verified in Phase B). Address: A-23 Gold Craft Society, Vishrantwadi, Pune 411015. [handover-couple photo]
- **Motion:** the photo reveals with a clip wipe; nothing else moves.

### S11 Footer (ink)
Reversed logo · services (anchors) · contact and address · Instagram (Facebook hidden) · "A product of VP Constructions" · © 2026 FlatProof Inspections.

**Floating WhatsApp:** official glyph (theSVG) in a 56px button; appears after the hero, hides while #book is in view; `aria-label="Book on WhatsApp"`; desktop tooltip.

---

## 6. Nav, cursor, lens and scroll specs

### Nav (floating glass pill)
- Fixed, centred, `top: max(12px, env(safe-area-inset-top))`, `max-width: calc(100vw - 32px)`. Desktop: logo (32px), links Checks · How it works · Report · Services · FAQ, CTA [Book on WhatsApp].
- Glass: light `rgb(255 255 255/.66)` / dark `rgb(14 23 38/.56)`, `backdrop-filter` and `-webkit-backdrop-filter: blur(16px) saturate(160%)`, 1px inner highlight, navy-tinted shadow. `@supports not (backdrop-filter…)` gives an opaque fill. The blur never animates.
- Theme: each section has `data-nav`; one ScrollTrigger per section at the pill's centre line sets `header[data-theme]`; colours cross-fade in 220ms; logo swaps to the reversed version on dark.
- Hides on scroll down after the hero (translateY, 300ms), returns on scroll up; stays while focus is inside or the menu is open.
- Active link: Motion `layoutId` indicator; active section from ScrollTrigger callbacks. GSAP never touches nav nodes.
- Anchors: Lenis `scrollTo` with offset −(pill height + 16px), then focus the target (`tabindex=-1`); reduced motion jumps. `scroll-padding-top` matches for native and keyboard scrolling.
```
PHONE, CLOSED                      PHONE, OPEN (pill morphs into the sheet)
+------------------------+         +------------------------+
| ( mark  [Book]  menu ) |         | ( mark          close )|
|                        |   -->   |  Checks                |
|                        |         |  How it works          |
|                        |         |  Report                |
|                        |         |  Services              |
|                        |         |  FAQ                   |
|                        |         |  [Book on WhatsApp]    |
|                        |         |  Call  Instagram       |
+------------------------+         +------------------------+
```
- **Phones (<1024):** pill = mark + [Book] + menu button (48×48). Opening morphs the pill into a full-screen glass sheet via `clip-path` (port of PDI's `MobileMenu`); links stagger in (Motion springs), then contact and Instagram. Close via button, Esc, backdrop or link (link closes, then smooth-scrolls). `lenis.stop()` plus html overflow lock plus `overscroll-behavior: contain`; focus trap and restore; `aria-expanded`/`aria-controls`; targets ≥48px; only transform, opacity and clip-path animate; sheet blur is static (12px, fill .86). Survives 10 rapid toggles, rotation and the iOS bar resize (svh units, `ignoreMobileResize`).

### Cursor
Fine pointers only, motion allowed, not forced-colors. Dot 6px plus ring 36px (1.5px teal), via `quickTo` (dot 0.08s, ring 0.35s), transforms only, one fixed layer. States: link (ring 52px, dot hides), CTA (ring becomes a pill with a short label: "Book", "Open"), hero stage (cursor hides, the lens takes over), inputs (native caret), dark sections (colours invert from the nav theme), pressed (.9). The native cursor is hidden only after mount.

### Scrollbar
`scrollbar-width: thin; scrollbar-color: var(--teal) transparent` plus `::-webkit-scrollbar` 10px with a teal thumb (3px transparent border, `background-clip: content-box`). Always visible.

### The lens (signature)
- **Layers:** daylight photo (LCP, `priority`) plus a thermal twin of the same image. Lens = a circle (Ø `clamp(220px, 24vw, 360px)`; phones 180px) with a *static* feathered radial mask (AI-in-Design rim), holding the thermal twin counter-translated. Moved by transform only (PDI D4 technique, so composite-only); `will-change` only while moving.
- **Instrument ring (SVG, follows the lens):** a 270° ironbow arc with ticks every 15°, and a needle showing relative heat under the crosshair, read from a 48×27 luminance grid the pipeline writes (no fake °C anywhere). A readout chip under the ring: "Scanning", or the finding title plus how it's found.
- **Lock-on:** within 0.28 Ø of a hotspot the finding locks: a single back.out pulse, a revision cloud draws around it on the photo, its label stays, the tally ticks. Distance checks run in `gsap.ticker` math; DOM and React state change only when the locked finding changes.
- **Desktop:** follows the pointer (`quickTo` 0.35s); fades to the normal cursor over the copy block and CTAs; idle for 4s → a slow sweep to the next unfound finding.
- **Touch:** an auto-tour visits 1→2→3→4 (glide 1.2s, lock, hold 1.4s), looping, with a visible 44px pause control (WCAG 2.2.2). Drag starts only on the lens (`touch-action: none` there; the photo keeps `pan-y`); tapping the photo glides the lens there and holds 3.5s; the tour pauses off-screen.
- **Keyboard and screen readers:** the "Thermal view" switch (`aria-pressed`) cross-fades the full thermal twin and shows all four findings as focusable buttons (focus moves the lens and opens the detail). An SR-only list names all four.
- **Reduced motion:** a static split, left daylight and right thermal, all four findings and clouds shown.
- **Before photos exist:** an SVG line drawing of the room (navy strokes on paper) plus a matching thermal SVG, so the lens demos from day one.
- **Load:** the thermal twin and grid load after LCP (`requestIdleCallback`, `img.decode()`); the lens stays hidden until ready; low-end or Save-Data devices get the static split.

### Smooth scroll and ScrollTrigger
Port PDI's `SmoothScroll.tsx`: `ReactLenis root`, `autoRaf: false`, `gsap.ticker` drives `lenis.raf`, `lagSmoothing(0)`, `ScrollTrigger.update` on Lenis scroll, `syncTouch: false` (native touch on phones), lerp .1, disabled under reduced motion. ScrollTrigger lazy-loaded after hydration (`loadST`, keeps first-load JS ≤200 KB gz); `ignoreMobileResize`; refresh after `document.fonts.ready`, window load and hero image load; breakpoints via `gsap.matchMedia`; `useGSAP` cleanup (strict-mode safe). Pins on desktop only (Checks). Full-height stages use `svh`.

---

## 7. File and component tree
```
FLATPROOF/
  CLAUDE.md  README.md  IMAGE_PROMPTS.md  CLIENT_QUESTIONS.md
  docs/  BRIEF.md (verbatim)  PLAN.md (this)  PROGRESS.md  DECISIONS.md  DESIGN.md  PITCH.md
  images-inbox/            # you drop ChatGPT PNG/WebP here (originals gitignored, README kept)
  reference/               # gitignored
  scripts/  images.mjs  icons.mjs  logo.mjs  shots.mjs  bundle-size.mjs
  tests/site.spec.ts       playwright.config.ts
  public/  images/  brand/ (logo.png, logo-reversed.png, mark.png @2x/@3x)
  src/
    app/  layout.tsx  page.tsx  globals.css (@theme tokens)  opengraph-image.tsx  icon.png
          apple-icon.png  favicon.ico  robots.ts (noindex while a demo)  not-found.tsx
    content/  site.ts (ALL copy, services, wa messages, contacts, socials, FAQ, claims
              {value, needsConfirm, source}, hotspots, image slots)  images.generated.ts
    lib/  gsap.ts (register, loadST, MQ)  st.ts  motion.ts (tokens)  scroll.ts (goTo)
          wa.ts (wa.me builder)  cloud.ts (revision-cloud path generator)
    components/
      providers/SmoothScroll.tsx  nav/{Nav,NavPill,MobileMenu}.tsx  cursor/Cursor.tsx
      hero/{Hero,ThermalLens,LensRing,Findings,RoomLinework}.tsx
      sections/{Stakes,Checks,Process,Report,CarpetArea,CaseFile,Services,Faq,FinalCta,Footer}.tsx
               plus a *Motion.tsx client island per animated section
      ui/{Button,WhatsAppLink,RevisionCloud,DimensionLine,SeverityTag,Placeholder,Odometer}.tsx
      brand/Logo.tsx  brand-icons/{whatsapp,instagram,facebook}.tsx (theSVG)  FloatingWhatsApp.tsx
```
Sections are Server Components; each animated part is a small `"use client"` island (≤200 lines), loaded with `next/dynamic` when below the fold.

**Metadata:** title "FlatProof Inspections | Pre-possession flat inspection in Pune"; description "Two engineers check your new flat against 125+ points, scan the walls with a thermal camera, measure carpet area by laser and send a snag report within 24 hours. Pune and PCMC."; a generated 1200×630 OG image (logo, H1, lens ring motif) for WhatsApp previews; favicon and app icons from the logo mark. **`noindex` while it is a pitch demo** (one flag, `site.seo.noindex`, flipped when the client adopts it), so an unofficial copy never competes with vpconstro.com in search.

## 8. Dependencies (npm latest, checked 2026-11-13; re-checked at install)
next 16.4.6 · react / react-dom 19.3.1 · tailwindcss 4.3.5 with whichever integration create-next-app 16.4.6 scaffolds (@tailwindcss/postcss or @tailwindcss/turbopack, both 4.3.5) · gsap 3.15.1 · @gsap/react 2.1.2 · lenis 1.3.27 · motion 14.13.0 (LazyMotion + m; API checked against v14 docs) · @phosphor-icons/react 2.1.10 · typescript: whatever create-next-app pins (latest is 7.0.2; fall back to ^5 if the build breaks) · dev: sharp 0.35.5, @playwright/test 1.65.0, axe-core 4.14.0, eslint-config-next 16.4.6 · via npx: @thesvg/cli 0.8.1, lighthouse 13.6.0, impeccable 4.9.0. No three.js (nothing earns it). Vercel Node 26.x (current LTS); local Node 22.19 is compatible (Next needs ≥20.9). npm, lockfile committed.

## 9. Image slots (exact prompts go in IMAGE_PROMPTS.md, the first Phase B file)
| # | File | Ratio | Pixels | Use |
|---|---|---|---|---|
| 1 | hero-desktop.png | 16:9 | 2560×1440 | Hero ≥768px, plus thermal twin. Calm off-white left wall (copy zone); back wall with a UPVC sliding window and granite sill at about 45% height; right wall with an Indian modular switchboard at about 55%; skirting along the right and back walls; large light vitrified tiles in the foreground; high-rises outside; no people |
| 2 | hero-mobile.png | 4:5 | 1600×2000 | Hero <768px, plus thermal twin. Same elements stacked: sill top, switchboard middle, skirting lower, tiles bottom |
| 3 | engineer-thermal.png | 3:2 | 2400×1600 | Process step 2; services (leak). Indian engineer, navy/teal workwear, thermal camera aimed at a skirting |
| 4 | tap-test.png | 4:5 | 1600×2000 | Process step 1; services (pre-possession). Hand tapping a vitrified tile |
| 5 | laser-measure.png | 3:2 | 2400×1600 | Carpet-area inset; services (carpet). Laser meter, red dot on a wall, empty room |
| 6 | handover-couple.png | 4:5 | 1600×2000 | Final CTA; services (rental). Relieved Indian couple with keys and a report on a phone |
| 7 | crack-diagnosis.png | 1:1 | 2000×2000 | Services (consultancy). Crack-width gauge on a plaster crack |
| 8 | case-window-sill (real) | about 4:3 | about 1276×950 | Case file: photo area cropped from `reference/Screenshot 2026-11-10 224523.png` (two crop options: with or without their watermark) |
The construction row stays linework until real VP Constructions photos arrive (an AI "VP project" would misrepresent them). Every slot renders a designed placeholder (ink/mist gradient, grain, linework, slot label) until its file exists. Shared art direction in every prompt: photoreal, natural daylight, cool clean whites, navy/teal in wardrobe and props, real Pune apartment details, natural Indian skin texture, camera/lens/lighting, exact size with the "largest available at this ratio, no cropping, no letterboxing" fallback, PNG, negatives (no text, logos, watermarks, distorted hands or AI gloss).

**Pipeline (`npm run images`):** inbox PNG/WebP → resize to slot spec (ratio tolerance 8%; else crop with `attention`) → high-quality masters in `public/images` → blur placeholders → for the hero slots, a thermal twin (greyscale, normalise, hotspot anomalies from `site.ts` (cold at skirting and sill joint, warm at the socket), soft blur and low-res feel, ironbow LUT) plus the 48×27 grid → `src/content/images.generated.ts` (availability, dimensions, blur). `--debug` writes marker overlays so I can calibrate hotspots by eye when you add the photos. next/image serves AVIF/WebP with `sizes`; `priority` on the hero only (art-directed `<picture>` via `getImageProps`).

## 10. Risks and mitigations
| Risk | Mitigation |
|---|---|
| iOS Safari backdrop-filter jank | Small blur areas, `-webkit-` prefix, never animate blur, static sheet blur with a high-opacity fill, `@supports` fallback |
| Lenis plus pins on phones | No pins under 1024px, `syncTouch: false`, `ignoreMobileResize`, svh, refresh after fonts/images |
| Font swap CLS (wide display face vs fallback) | `next/font` `adjustFontFallback`, preload the display face only, measure CLS < 0.05; Geologica fallback if needed |
| Lens performance | Transform-only, static mask, thermal twin sized to viewport and decoded off the critical path, no React state per frame, low-end gets the static split |
| LCP | Hero photo priority plus fetchPriority high, AVIF; H1 entrance in CSS; no preloader; thermal twin deferred |
| First-load JS | Lazy ScrollTrigger, SplitText and DrawSVG only in their islands, LazyMotion `domAnimation`; budget ≤200 KB gz checked by `bundle-size.mjs` |
| AI hero images differ desktop vs mobile | Separate hotspot sets per image; calibrate with `--debug` overlays |
| Zalando: ₹ glyph or width at 360px | Phase B gate; per-glyph fallback or Geologica |
| Logo is an AI raster JPEG | Clean transparent PNG at 2× and 3× (background keyed out, edges checked on navy and paper); reversed variant flagged |
| Legal and claims | No "certified/licensed/foremost/millimetre-accurate" until confirmed; RERA line only if verified officially |
| Vercel ↔ GitHub link | Try `vercel git connect`; if the GitHub App lacks access, stop and send you the one-click grant link; CLI deploys keep the URL live meanwhile |
| `flatproof.vercel.app` taken | Claim it right after scaffolding (M1); if taken, stop and report the assigned URL and options |
| OneDrive file locks and sync churn | QA output to `%LOCALAPPDATA%\flatproof-qa`; retry builds on EBUSY |
| Two GitHub credentials stored | Remote URL `https://kumbharkunal@github.com/kumbharkunal/FLATPROOF.git` so GCM picks the right account |

## 11. Milestones and commits (lint, typecheck and `next build` pass at every commit from M1)
| M | Work | Commit |
|---|---|---|
| 0 | `git init`, `.gitignore` (reference/, .design-refs/, inbox originals, QA output), **IMAGE_PROMPTS.md**, push to main within minutes; then docs/BRIEF.md (verbatim), CLAUDE.md, docs/PLAN.md, PROGRESS.md, DECISIONS.md | `docs: image prompts` / `docs: brief, plan and conventions` |
| 1 | Scaffold Next 16.4.6 in a temp folder and move it in; deps; Vercel project `flatproof` + first deploy to claim the URL; try the Git link | `chore: scaffold Next.js app` |
| 2 | Tokens and fonts (font gate), content model, logo processing, theSVG icons, favicons, OG image | `feat: design tokens, content model and brand assets` |
| 3 | Image pipeline, placeholders, thermal twins, room linework | `feat: image pipeline with thermal twins` |
| 4 | Smooth scroll, nav pill and menu, cursor, scrollbar, floating WhatsApp | `feat: navigation, cursor and smooth scroll` |
| 5 | Hero and lens (desktop, touch, keyboard, reduced) | `feat: hero inspection lens` |
| 6 | Stakes, Checks, Process | `feat: stakes, checklist and process` |
| 7 | Report, Carpet area, Case file | `feat: report, carpet-area audit and case file` |
| 8 | Services, FAQ, CTA, footer, 404 | `feat: services, FAQ and closing sections` |
| 9 | QA pass 1 and fixes | `fix: QA pass 1` |
| 10 | QA pass 2, impeccable audit/polish, taste gate, jury, "remove one accessory" | `polish: QA pass 2` |
| 11 | README, docs/DESIGN.md, CLIENT_QUESTIONS.md, docs/PITCH.md; prod deploy; live checks | `docs: handover` |
PROGRESS.md is updated at every milestone; after any compaction I re-read BRIEF.md and PROGRESS.md first. Ordering note: the brief's §8 says IMAGE_PROMPTS.md comes first and §14 says BRIEF.md does. IMAGE_PROMPTS.md goes first so you can start generating images; the docs follow in the next commit a few minutes later.

**CLIENT_QUESTIONS.md will cover:** what "certified" and "licensed" refer to; the 100+ properties claim; prices; waterproofing warranty terms; exact areas served; team names and photos; testimonials; Facebook Page (the current profile is personal); Google Business Profile; the full 125-point list; inspection duration; whether the buyer must attend; resale flats; a full sample PDF; VP Constructions details (years, projects, real photos, relation to vpconstructionsllp.com); reversed logo approval and a vector logo; RERA wording; the "millimetre-accurate" claim.

**docs/PITCH.md will cover (6–8 points):** opens with their own instrument, not a template; sells the report, not a points count; carpet area turned into rupees; WhatsApp booking with the right message prefilled; real evidence annotated like an engineer's drawing; VP Constructions lineage and inspect-to-fix; fast and accessible on a mid-range Android; every claim verified or flagged.

## 12. Blocking questions
None left for planning (references, hero direction and logo use are answered). Phase B stops only for: the Vercel GitHub App grant if `vercel git connect` is refused, or `flatproof.vercel.app` being unavailable.

---

## Verification (definition of done)
- `npm run lint`, `npx tsc --noEmit`, `npm run build` green; `node scripts/bundle-size.mjs` ≤200 KB gz first-load JS.
- **Playwright** (`tests/site.spec.ts`, ported from PDI and extended): one H1, landmarks, skip link, `lang="en-IN"`; every wa.me link decodes to its exact prefilled text; no horizontal overflow at 320/360/390/430/768/1024/1280/1440/1920; tap targets ≥44px (menu ≥48px); axe serious/critical = 0; menu opens and closes 10× (button and Esc), traps focus, restores focus, link tap lands under the pill; nav `data-theme` matches each section; lens locks all four findings under synthetic pointer moves; the Thermal view switch works by keyboard; reduced motion shows the static split, no pin spacers, all content visible; floating WhatsApp hides at #book.
- **Screenshots** (`scripts/shots.mjs`, output in `%LOCALAPPDATA%\flatproof-qa`): full page and states at 360, 390, 430, 768, 1024, 1280, 1440, 1920, plus touch and reduced-motion runs. I look at every frame, critique, fix and re-shoot: at least two passes.
- **Claude in Chrome** (if localhost is allowed): lens by mouse and touch emulation, menu rapid toggling and rotation, Lenis anchors, cursor states, pins after resize, keyboard-only pass, console clean (no hydration or GSAP target warnings).
- **Lighthouse mobile** on the production build and on the live URL: performance ≥90, accessibility and best practices ≥95, LCP <2.5s, CLS <0.05.
- **Live:** https://flatproof.vercel.app serves the latest main; build logs clean; checked in Chrome at phone and desktop widths; jury score recorded in PROGRESS.md.
