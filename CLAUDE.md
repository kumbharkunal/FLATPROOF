# FlatProof Inspections: pitch homepage

One-page demo for FlatProof Inspections (Pune and PCMC, "a product of VP Constructions"), a pre-possession flat inspection service. Concept: **"Beneath the finish."**
- **Repo:** github.com/kumbharkunal/FLATPROOF. Remote URL includes the username (`https://kumbharkunal@github.com/...`) so Git Credential Manager picks the right account.
- **Host:** flatproof.vercel.app (Vercel project `flatproof`, team "Kunal's projects").
- **Resume after any compaction:** read `docs/BRIEF.md`, then `docs/PROGRESS.md`, then `docs/PLAN.md` (the approved plan) and `docs/DECISIONS.md`.

## Precedence
1. The brief (`docs/BRIEF.md`).
2. Verified client facts (`src/content/site.ts`, each claim `{ value, needsConfirm, source }`).
3. Accessibility and performance targets.
4. Skill guidance.
5. Inspiration.
Every conflict is logged in `docs/DECISIONS.md` as FP-D#.

## Hard rules
**Stack:** Next.js 16 App Router + TypeScript strict (`src/`), Tailwind v4 tokens in `@theme` (`src/app/globals.css`), GSAP + ScrollTrigger/DrawSVG/SplitText via `@gsap/react` `useGSAP`, Lenis via `lenis/react`, Motion (`motion/react`, `LazyMotion` + `m`) for UI state only. Never two libraries on one element. No WebGL.

**Palette:** paper #FFFFFF, mist #EEF4F6, ink #0E1726, navy #29374D, teal #0192AB, teal-ink #016E82, teal-light #3FC1D6, slate #55657A, steel #A7B6C6, line #D5DFE5, critical #C4321C, amber #F59E0B, amber-ink #A1530A. Ironbow only in thermal imagery and the lens ring. Red/amber only for defect severity.

**Contrast:** teal is never small text (3.68 on white, 3.32 on mist, 3.26 on navy). Small teal text on light = teal-ink; on ink/navy = teal-light. Teal buttons carry **ink** labels (4.88). Focus ring 2px + 3px offset: teal on light, teal-light on dark.

**Navbar:** floating glass pill; theme from each section's `data-nav`; hides on scroll down after the hero, returns on scroll up; phone menu is a modal dialog with focus trap, Esc, scroll lock (`lenis.stop()`), clip-path morph. Never animate blur.

**Performance:** Lighthouse mobile perf ≥ 90, a11y and best practices ≥ 95; LCP < 2.5s; CLS < 0.05; first-load JS for `/` ≤ 200 KB gzip; no third-party scripts; no preloader.

**Accessibility:** landmarks, one H1, skip link, `lang="en-IN"`, visible focus, full keyboard path (Thermal view switch), SR-only list of lens findings, reduced-motion path for every animation, tap targets ≥ 44px (menu ≥ 48px).

**Honesty:** never invent reviews, ratings, counts, prices, years, certifications, team names or logos. Unverified business values carry `needsConfirm: true` and appear in `CLIENT_QUESTIONS.md`. The thermal view is labelled simulated; no fake temperatures.

**Git:** small conventional commits per milestone, pushed to `main`. Lint, typecheck and `next build` pass at every code commit. Never force-push or rewrite history. No secrets in the repo. Commit messages end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Conventions
- **Content:** all copy, links, WhatsApp messages, FAQ, hotspots and image slots live in `src/content/site.ts`. Components only read from it. `src/content/images.generated.ts` is written by `npm run images`.
- **Components:** sections are Server Components; each animated part is a small `"use client"` island (≤ 200 lines), dynamically imported when below the fold.
- **GSAP:** plugins registered once in `src/lib/gsap.ts`; ScrollTrigger loaded lazily via `loadST()`; always `useGSAP({ scope })` + `gsap.matchMedia()`; ScrollTrigger only on top-level timelines; pin a wrapper, animate its children; `scrub: true`; refresh after `document.fonts.ready` and image loads; `ScrollTrigger.config({ ignoreMobileResize: true })`.
- **Motion rules:** animate only transform, opacity, clip-path and SVG stroke; never set a CSS variable on a parent to move children; `will-change` only while a tween runs; the lens is transform-only (static mask, counter-translated inner layer).
- **Units:** `svh` for full-height stages, never `100vh`.
- **Copy:** sentence case; no em or en dashes; no "→" on links or buttons; no all-caps labels or eyebrows; no middot meta strings; run stop-slop on every change (score ≥ 35/50). The client's own lines are kept as written.
- **Type:** Zalando Sans Expanded (display) + Zalando Sans (text) via `next/font/google`; tabular figures on every number; no monospace.

## Commands
```bash
npm run dev                              # local dev
npm run lint && npm run typecheck        # ESLint + tsc --noEmit
npm run build && npx next start -p 4410  # production check (QA runs against :4410; :4400 is the PDI PRO INDIA project)
npm run images                           # images-inbox -> public/images, thermal twins, manifest (--debug for marker overlays)
npm run icons                            # favicon and app icons from the logo mark
npm run test:e2e                         # Playwright: layout, nav, menu, lens, a11y (axe), links, reduced motion
npm run shots -- --w=390 --touch         # screenshots to %LOCALAPPDATA%\flatproof-qa\shots
npm run size                             # gzipped first-load JS for /
```
QA output always goes to `%LOCALAPPDATA%\flatproof-qa\` (outside OneDrive).

**Deploy:** pushes to `main` deploy through the Vercel Git integration (connected 2026-11-17). `vercel deploy --prod` is the manual fallback.
