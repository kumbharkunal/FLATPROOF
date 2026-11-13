ultrathink

# FlatProof Inspections — award-level demo homepage

You are the design lead and senior creative developer at a studio known for award-winning websites. I'm pitching a new client, FlatProof Inspections (Pune). If they love this homepage, I win the full project. Their current site (https://vpconstro.com) was AI-generated and they dislike its design. The goal: the best flat-inspection website in the world — Awwwards-level craft with the best UI/UX in the category, while staying the clearest, most trustworthy inspection site a Pune homebuyer has ever seen.

We are in PLAN MODE.
- Phase A (now): research with read-only tools, then present one complete plan for my approval. Don't create files yet.
- Phase B (after approval): build, QA, push to GitHub and deploy to Vercel end to end, without stopping except for the blockers in §14.

## 1. Verified facts — the content source of truth

./reference/ contains 8 images: six Instagram posts (pre-possession couple ad, hidden-defects ad, a real window-sill defect photo with its caption, "Understanding dampness", "Improper tile installation", "Window work"), the Instagram profile, and the logo. Open and study every one.

- FlatProof Inspections is "a product of VP Constructions" (parent firm: turnkey residential/commercial construction, infra projects, engineering consultancy). Serves Pune and PCMC.
- Instagram @flatproof.inspections — bio: "Certified pre-handover checks for new Home, consultancy and construction." Posts tagged Pune; booking CTA used in posts: DM "INSPECT".
- Core offer: pre-possession inspection against a 125+ point checklist, done on site by two civil/MEP engineers, 100% non-destructive, delivered as a digital snag report (PDF, photo evidence, severity-tagged, ready to send to the developer) within 24 hours.
- Checklist split: electrical & safety 28, plumbing & sanitary 32, masonry & finishes 38, doors/windows/balconies 27 (= 125).
- Real checkpoints: phase-neutral-earth polarity, MCB trip test, socket earthing, DB dressing; drain slope, trap seals, flush volume, diverter pressure, hot-water flow, hidden-leak tracing; hollow-tile tap test, wall plumb, plaster shrinkage vs structural cracks, paint uniformity, floor level; UPVC track weep holes, glass scratches, railing anchorage, weather-seal continuity.
- Tools: infrared thermal camera, pinless moisture meter, laser distance meter.
- Six services: (1) pre-possession inspection; (2) water-leak detection & waterproofing — thermal root-cause scan without breaking walls, warranty-backed rectification; (3) carpet-area measurement — laser, RERA carpet vs built-up, CAD dimension sheet; (4) rental flat inspection — move-in/move-out condition logs for tenants and owners; (5) consultancy — structural stability, crack diagnostics, society handover and redevelopment; (6) building construction & infra — by VP Constructions.
- Claims on their current site (use them, but list them for confirmation): 100+ properties inspected in Pune, 24-hour report, 125+ points, 100% non-destructive.
- Their sample report (reuse it, labelled as a sample): ref FP-PUNE-2026-088, Unit 804, Tower B, 3BHK, 1,480 sq ft, 18 snags. Critical — thermal moisture anomaly in the master-bedroom wall: 86% subsurface moisture behind the skirting, source an unsealed AC drain conduit → injection grouting + facade weatherproofing. Medium — kitchen 16A socket with reversed neutral-ground and inactive earthing → rewire at the DB. RERA audit — agreement carpet 1,120.00 sq ft vs measured 1,088.40 sq ft (deficit 31.60) → CAD sheet attached.
- Real Instagram case (photo in reference/): a granite window sill bedded on loose white cement and filler instead of compacted cement-sand mortar — hollow sub-base, no bond with the masonry, no waterproof seal where the window frame meets the sill.
- Instagram topics: pre-possession anxiety; hidden defects (cracks, seepage, uneven floors); dampness types (rising, penetrating, condensation); tile/grout faults (uneven or missing grout, inconsistent gaps, cracked grout); window checks (sealing, leakage in rain, operation, glass, frame alignment).
- Contact: WhatsApp and phone +91 96575 55588 (wa.me/919657555588 with a prefilled message per service, as their current site does), info@vpconstro.com, A-23 Gold Craft Society, Vishrantwadi, Pune 411015.
- Their own lines to reuse or adapt: "Don't take possession in the dark." / "Hand the builder a snag list, not your hard-earned money." / "What looks like a minor patch today becomes a major expense tomorrow."
- Brand: navy #29374D, teal #0192AB, white, plus a green-teal on the logo's roof. Logo = clipboard + roof + checkmark + magnifier; wordmark "flat" in navy, "proof" in teal, "INSPECTION SERVICES" below.
- I found no Facebook page, Google Business profile or JustDial listing. Look again; never link a profile you can't verify.

## 2. Phase A research — parallel subagents, each returning a ≤400-word digest with source links

- A1 Business: re-read every section of vpconstro.com. If Claude in Chrome is connected, browse instagram.com/flatproof.inspections (all 11 posts, including reels) and look for other platforms (Facebook, Google Maps, JustDial, LinkedIn, YouTube). Facts only, with URLs.
- A2 Category: find the best-designed inspection/snagging websites in the world — Indian (e.g. PropCheck, Prop Checkup, Meazurement, NoBroker's inspection service) and international new-build snagging and home-inspection firms (UK, UAE, Australia, US). What builds trust, what's cliché, where FlatProof can stand out. This site has to beat every one of them.
- A3 Skills (all on github.com; read README + SKILL.md + key reference files; extract concrete rules, techniques and anti-patterns):
  - taste and anti-slop: Leonxlnx/taste-skill, pbakaus/impeccable, hardikpandya/stop-slop (for all copy), anthropics/skills → skills/frontend-design, lucasmarkes/hairline, juliobsz/skills
  - systems and references: nextlevelbuilder/ui-ux-pro-max-skill, VoltAgent/awesome-design-md, MohtashamMurshid/getdesign (and getdesignmd.org/mcp), xiaopu-ai/web-design, 21st-dev/skill, 21st-dev/claude-code-plugin
  - motion: greensock/gsap-skills, emilkowalski/skills, nateherkai/scroll-craft
  - engineering and QA: addyosmani/agent-skills, garrytan/gstack, anthropics/skills (testing skills)
- A4 Inspiration: awwwards.com, siteinspire.com, recent.design, seesaw.website, unsection.com, screensdesign.com, motionsites.ai, annnimate.com, jitter.video, toolfolio.com, thinkingods.com, genjutsu.athevon.dev. Shortlist 6–8 references relevant to this brief (precision, engineering, architecture, real estate, measurement) and name the specific pattern to borrow from each. Never copy a look.
- MCP tools: if the awwwards, getdesignmd, thesvg, 21st or vercel tools are connected, use them (awwwards: search, design DNA and motion study of the shortlist; getdesignmd: relevant DESIGN.md systems). If one isn't connected, don't block — use web fetch or Chrome.
- Conflict rule: my brief > verified client facts > accessibility and performance > skill guidance > inspiration. When skills disagree, pick one and say why.

## 3. Creative direction — my starting hypothesis (pressure-test it; improve or replace it, with reasons)

Concept "Possession, in daylight": their line "don't take possession in the dark" becomes the scroll narrative. The page opens in deep ink (what's hidden) and progressively turns the lights on, ending in crisp white (the report, clarity, handover). Theme shifts carry the story; they aren't decoration.

Signature moment — spend the boldness here and keep everything else disciplined: the hero inspection lens. A pristine, aspirational new Pune flat. The cursor becomes a circular lens; inside it the room renders as a thermal scan, and pinned findings appear as the lens passes them (moisture behind skirting, hollow tile, reverse-polarity socket, unsealed window sill — from the sample report and the Instagram case).
- Build hint: two perfectly aligned layers — the photo, plus a thermal variant generated at build time from the same photo (sharp: luminance → ironbow LUT, slight blur, a deliberate cold spot for moisture and a hot spot for the faulty socket) — revealed by a CSS mask-image radial gradient driven by gsap.quickTo. Findings are positioned markers with %-coordinates in the content file. No WebGL needed.
- Touch: drag the lens; when idle it auto-sweeps through the findings; plus a visible "Thermal view" toggle. Reduced motion: a static before/after split.
- Alternative worth evaluating: an x-ray lens revealing concealed pipes and conduits as linework.
- Hero copy direction: headline "Don't take possession in the dark."; one line on what they do (125+ engineering checks, thermal leak scan, laser carpet-area audit, report in 24 hours); primary CTA "Book on WhatsApp", secondary "See a sample report".

Proposed tokens (verify every contrast pair yourself):
- ink #0E1726 — dark sections (brand teal on it ≈ 4.9:1, white ≈ 18:1)
- navy #29374D — brand; text on white ≈ 12:1
- teal #0192AB — brand; large type, icons, fills, focus rings. Only ≈ 3.7:1 on white, so never small text or small white-on-teal labels
- teal-ink ≈ #016E82 — AA-safe teal for small text, links and white-on-teal buttons (≈ 5.9:1 on white, ≈ 5.3:1 on mist); #017D93 passes on pure white only
- paper #FFFFFF and a cool mist ≈ #EEF4F6 — no warm cream
- signal: a thermal amber/red reserved for defect severity, nothing else
Typography: choose deliberately — not Inter, Roboto, Poppins, Montserrat, Space Grotesk or other defaults. Worth exploring: a variable grotesk with a width axis (e.g. Archivo) for an engineering spec-sheet voice — wide for display, normal for text, tabular figures for measurements — or a Fontshare grotesk with a free commercial licence (Switzer, General Sans). One family, two at most; it must sit well next to the logo's rounded wordmark. Self-host via next/font. Body measure ≤ 70ch.
Icons: one premium family (e.g. Phosphor light/regular) with consistent stroke. Brand/social logos come only from theSVG (§9).
Motion: one orchestrated load moment (hero) and one signature interaction (the lens). Every other section still moves, but its motion must explain its content — lines that measure, a count that lands on 125, report findings stacking, steps that connect. No generic fade-up on every block, no hover effect on everything. Define duration/easing tokens once. GSAP for scroll-linked timelines, Motion for UI state (nav, accordions, toggles) — never both on the same element.
Copy: plain, confident, engineer-honest; Indian homebuyer vocabulary (possession letter, builder, snag list, MahaRERA, 2BHK, PCMC); sentence case; run every line through stop-slop. Avoid the AI-page tells listed in frontend-design: an all-caps eyebrow on every heading, one-word italic or colour accents in headlines, "→" on every link, middot meta strings, identical rounded card grids.

## 4. Homepage sections — candidates (keep the ~9–11 that earn their place; justify cuts)

1. Floating nav (§5).
2. Hero — the inspection lens.
3. Stakes — life savings, and the leverage you have before signing the possession letter; what hides in new flats (hollow tiles, concealed leaks, reverse polarity, short carpet area). Scroll-scrubbed text reveal.
4. The 125-point check — measuring-tape motif; a segmented bar 28/32/38/27 counting to 125; each category opens to real checkpoints. Pinned on desktop, accordion/stack on mobile.
5. How it works — the real three steps (on-site inspection → thermal & laser verification → snag report in 24 hours). Numbered because it is a sequence; a line draws between steps; tools appear in context.
6. The report — an HTML-rendered excerpt of the sample report (ref, unit, 18 snags, severity-tagged findings) assembling on scroll; CTA to get the full sample on WhatsApp.
7. Carpet-area audit — floor-plan linework; laser dimension lines draw in; agreement vs measured (sample numbers) settles on the deficit.
8. Case file — the real window-sill photo (crop it from its reference screenshot, photo area only) annotated with the three faults.
9. Services — the six services as an editorial index, not a card grid; each row deep-links to WhatsApp with its own prefilled message; construction & infra credited to VP Constructions.
10. Engineers who build — the VP Constructions lineage (verified claims only).
11. Know the defects (optional) — a compact explainer from their Instagram topics.
12. FAQ — when to book, how long it takes, what you receive, whether you need to be present, rental and resale flats, areas served. Verified answers only; unknowns go to CLIENT_QUESTIONS.md. If you mention RERA Section 14(3) (five-year defect liability), verify the wording from an official source and keep it modest — no legal overreach.
13. Final CTA — book before you sign: WhatsApp, call, email, Instagram DM "INSPECT" (ig.me/m/flatproof.inspections — verify it opens a DM).
14. Footer — logo, services, contact, address, socials, "A product of VP Constructions".
Also: a floating WhatsApp button (official logo) that appears after the hero and hides while the final CTA is in view.
Never add fake testimonials, ratings, client logos, prices, certifications or stats. A section that needs data we don't have should hide gracefully until it exists.

## 5. Navigation — floating glassmorphism pill (must be flawless on mobile)

- Desktop: centred floating pill (safe-area aware) with logo mark + wordmark, 4–5 anchor links and the primary CTA. Glass = backdrop-filter blur + saturate, translucent fill, 1px inner highlight, soft shadow, solid fallback where backdrop-filter is unsupported. The pill adapts to the section beneath it (ink vs paper) via section data-theme + ScrollTrigger. Hides on scroll down and returns on scroll up (after the hero). Sliding active-link indicator (Motion layoutId). Anchor links scroll through Lenis with the correct offset.
- Mobile: the pill shows the logo, "Book" and a menu button. Opening morphs the pill into a full-screen glass sheet; links and socials stagger in. Close via button, ESC, backdrop tap or link tap (then smooth-scroll to the section). Lock scroll (lenis.stop + body lock), trap and restore focus, aria-expanded/aria-controls, targets ≥ 48px. Animate only transform, opacity and clip-path — never the blur radius (iOS Safari jank). It must survive rapid toggling, rotation and the iOS address-bar resize at 60fps.

## 6. Cursor, scrollbar, smooth scroll

- Custom cursor on fine pointers only: brand-coloured dot + lagging ring via gsap.quickTo, with states for links, CTAs (short label), the hero lens and section theme. Native cursor in inputs, on touch, and with reduced motion.
- Custom scrollbar: thin, teal thumb, never hidden (webkit pseudo-elements + scrollbar-color/scrollbar-width).
- Lenis ("lenis" package): drive it from gsap.ticker (autoRaf off, lagSmoothing(0)) and call ScrollTrigger.update on Lenis scroll; keep native touch scrolling on phones unless syncTouch is proven on real devices; disable smoothing for reduced motion.
- ScrollTrigger: ignoreMobileResize, refresh after fonts and images load, gsap.matchMedia for breakpoint-specific timelines, useGSAP cleanup (no leaks under React strict mode). Use svh/dvh for full-height sections.
- Mobile gets the same story and polish as desktop — adapted, never stripped.

## 7. Stack, architecture, performance

- Next.js latest stable (App Router, TypeScript strict, src/), Tailwind CSS latest, gsap + @gsap/react (all plugins incl. SplitText and DrawSVG are free now), motion (motion/react with LazyMotion + m), lenis. three.js/R3F only if a scene clearly earns its weight: lazy-loaded, paused off-screen, static fallback. npm, lockfile committed. Check current versions and APIs on npm and official docs at install time — don't rely on memory.
- Server Components by default; client components only for interactive or animated islands; next/dynamic for heavy below-the-fold pieces.
- One content file (e.g. src/content/site.ts) for all copy, services, WhatsApp messages, contacts, socials, the image manifest and lens hotspots, so content edits never touch components.
- next/font self-hosting; next/image with sizes, AVIF/WebP, priority on the hero only; no autoplay video.
- SEO isn't a priority, but set title, description and a generated OG image (next/og) — the link will be shared on WhatsApp. Favicon and app icons from the logo mark.
- Budget: Lighthouse mobile ≥ 90 performance and ≥ 95 accessibility/best practices; LCP < 2.5s; CLS < 0.05. No blocking preloader — an intro, if any, is ≤ 1s, first visit only, and never delays the hero image.
- Accessibility: landmarks, skip link, visible focus, full keyboard support, prefers-reduced-motion everywhere, alt text, AA contrast.
- Vercel-ready: zero-config Next.js, current Node LTS, no env vars needed.

## 8. Images and IMAGE_PROMPTS.md

- Logo: make a clean transparent version from reference/ (an SVG trace only if indistinguishable from the original). Never redesign it.
- Plan ~6–8 AI image slots, kept low for speed — likely: hero desktop 16:9, hero mobile portrait, engineer with a thermal camera, hollow-tile tap test close-up, laser measurement in an empty room, a relieved couple at handover, a VP Constructions structure. Plus the real window-sill crop.
- Every slot must look designed before its image exists: styled placeholder (ink/mist gradient, subtle grain, linework). Until hero photos arrive, the hero uses an SVG linework room so the lens still demos.
- Pipeline: I'll drop ChatGPT downloads (usually PNG, sometimes WebP) with exact filenames into one inbox folder; one command (npm run images) converts and resizes them into optimised files, regenerates the thermal hero variants, and the site picks them up. Document it in the README. After I add real images I'll ask you to calibrate the lens hotspots by looking at them.
- IMAGE_PROMPTS.md is the first file you create in Phase B — push it immediately so I can copy prompts from GitHub while you build. One section per image: above each code block, one line with filename, aspect ratio, pixel size and where it's used. Inside each fenced code block, a complete standalone prompt (each gets pasted into a fresh ChatGPT chat with zero context) containing: subject and composition (negative space where text sits; for hero images, exactly where the skirting, socket, floor tiles and window sill must be visible), the shared art direction (photoreal, natural daylight, cool clean whites, navy/teal accents in wardrobe or props, real Pune apartment details — vitrified tiles, UPVC sliding windows, granite sills, Indian modular switchboards, high-rises outside), real Indian people where relevant with natural skin texture, camera/lens/lighting, the exact aspect ratio and pixel size with "if this exact size isn't available, use the largest available size at this aspect ratio — no cropping, no letterboxing", output format PNG, and negatives (no text, logos, watermarks, distorted hands or AI gloss).

## 9. Brand logos

Instagram, WhatsApp and Facebook logos must be the official ones from theSVG (thesvg.org): CLI "npx @thesvg/cli add <slug>", or https://thesvg.org/icons/<slug>/default.svg, or the thesvg MCP. Commit them locally as SVG components (no runtime CDN), keep official colours and proportions, add accessible labels. Show Facebook only if a verified page URL exists in the content file.

## 10. QA loop (repeat until it's genuinely award-level)

- Production build locally; full-page and state screenshots at 360, 390, 430, 768, 1024, 1280, 1440 and 1920px wide (Playwright, or the awwwards MCP capture/verify tools). Look at every screenshot, critique hard, fix, re-shoot — at least two passes.
- If Claude in Chrome is connected, test real interactions: lens with mouse and touch emulation; menu open/close, rapid toggling, ESC, link tap, rotation; Lenis anchor scrolling; cursor states; pins after resize and orientation change; zero horizontal overflow down to 320px; reduced-motion mode; keyboard-only pass.
- Lighthouse (mobile) on the production build and on the live URL; report scores and fix regressions. Console clean — no hydration warnings, no GSAP missing-target warnings.
- Final self-critique per frontend-design: take one accessory off.

## 11. GitHub and Vercel

- GitHub: https://github.com/kumbharkunal/FLATPROOF — check with gh (it may be private or not exist yet). If it exists with content, inspect it and ask before overwriting anything; if it doesn't exist, create it as private. Small conventional commits per milestone, pushed to main. Gitignore reference/ and any cloned skill repos.
- Vercel: use the Vercel plugin/MCP if connected, otherwise the Vercel CLI. Create or link a project named "flatproof" on my account (ask if I have several teams), connect the GitHub repo so pushes auto-deploy from main, deploy, and confirm production is served at https://flatproof.vercel.app. If that name isn't available, stop and tell me the assigned URL and my options. Check build logs, then open the live URL and verify it renders correctly on mobile and desktop.

## 12. Deliverables — definition of done

Live https://flatproof.vercel.app; repo pushed; README (run, edit content, add images); IMAGE_PROMPTS.md; docs/DESIGN.md (final tokens and decisions, with reasons); CLIENT_QUESTIONS.md (everything to confirm: certifications/licences, the 100+ properties claim, pricing, warranty terms, areas served, team names and photos, testimonials, Facebook/Google listings); docs/PITCH.md (6–8 talking points for presenting the demo: what's different from their current site and why it will convert better).

## 13. Your plan must contain

1. Executive summary on one screen.
2. Research digest with source links.
3. Which skill/reference guidance you adopted or rejected, and why.
4. Final creative direction and token system (colours with measured contrast ratios, type scale, spacing, radii, motion tokens). Run the frontend-design two-pass review: if any part reads like the default you'd produce for any similar brief, revise it and say what changed.
5. Section-by-section spec: purpose, draft copy, ASCII wireframes for desktop and mobile, motion spec.
6. Nav, cursor, lens and scroll specs.
7. File/component tree.
8. Dependencies (version-checked at install).
9. Image slot list (filename, ratio, pixel size, purpose).
10. Risks and mitigations (iOS Safari backdrop-filter, Lenis + pinned sections on mobile, font-swap CLS, mask performance, etc.).
11. Milestones with commit points.
12. Blocking questions only.

## 14. Phase B working rules

- First save this brief verbatim to docs/BRIEF.md, create CLAUDE.md (project conventions) and docs/PROGRESS.md (milestone checklist). Re-read BRIEF and PROGRESS after any context compaction.
- Install the skills that support it project-locally (.claude/skills) or clone them into a gitignored .design-refs/ — and read the relevant SKILL.md directly before working on that area rather than relying on auto-activation.
- Lint, typecheck and next build must pass at every commit.
- Don't stop for confirmation except for: missing credentials or permissions, overwriting existing repo content, or the Vercel name being unavailable.
- Never invent business facts: anything unverified is marked TODO in the content file and listed in CLIENT_QUESTIONS.md.
