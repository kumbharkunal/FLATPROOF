# FlatProof Inspections: homepage demo

A one-page pitch site for FlatProof Inspections (Pune and PCMC), a product of VP Constructions.
Live at https://flatproof.vercel.app. It is marked `noindex` while it is a demo, so it never competes with vpconstro.com in search.

## Run it

Needs Node 22 or later and npm.

```bash
npm install
npm run dev                      # http://localhost:3000
npm run build && npm run start   # the production build
```

## Edit the content

Every word, link and number on the page lives in `src/content/site.ts`. Components only read from it, so content changes never touch them.

| Block | What it holds |
|---|---|
| `waMessages` | The prefilled WhatsApp texts, copied from vpconstro.com. Every booking link uses one of them through `waHref(key)`. |
| `contact` | Phone, email, address, Instagram. `facebook.show` stays `false` until FlatProof has a Facebook Page. |
| `claims` | Business claims with `needsConfirm` and `source`. Everything unconfirmed is listed in `CLIENT_QUESTIONS.md`. |
| `hero` | Headline, lead, the scan and report-card copy, and the four findings with their marker points (`at`), clouds and label sides. |
| `stakes` to `footer` | One block per section, in page order. |
| `faq` | Items with `show: false` stay hidden until the client confirms the answer. |
| `testimonials` | Empty on purpose. The section renders nothing until real, permitted quotes exist. |
| `seo.noindex` | `true` while this is a demo. Set it to `false` when the client adopts the site. |

Copy rules: sentence case, no em or en dashes, no arrows on links or buttons. Keep a figure and its unit together with a non-breaking space written as `\u00a0` (for example `31.60\u00a0sq\u00a0ft`). `TODO(client)` marks anything waiting on the client.

## Add the photos

1. Generate the eight images with the prompts in `IMAGE_PROMPTS.md`.
2. Save them in `images-inbox/` with the exact file names given there (`hero-desktop.png`, `hero-mobile.png` and so on). PNG, WebP or JPG all work.
3. Run `npm run images`. It writes a master of each photo to `public/images/` (never larger than the source: upscaling only adds bytes), cuts it into AVIF and WebP files at fixed widths in `public/img/` (the site serves these as static files, cached for a year), and regenerates `src/content/images.generated.ts`. The site switches from placeholders to photos on the next build. A slot whose original is no longer in the inbox keeps its master.
4. Line up the four defect markers. Run `npm run images -- --debug` and open the two files in `images-inbox/debug/`: each hero photo with every marker and its revision cloud drawn on. In `site.ts`, for each `hero.findings[]` entry, move `at.desktop` and `at.mobile` (in percent of the image) until the marker sits on its defect, and size `cloud` so the cloud frames the object. The scan reaches them left to right, so keep the list in that order on the desktop photo.
5. If a photo is cropped into a box of another shape and loses its subject, set `focus` on its slot in `site.images` (a CSS object-position such as `"50% 78%"`).
6. Commit `public/images/`, `public/img/` and `src/content/images.generated.ts`. The originals in `images-inbox/` stay out of git.

Every slot shows a designed placeholder until its file exists; the construction row keeps its line drawing until `construction-site.png` is added.

## Check it

```bash
npm run lint && npm run typecheck   # ESLint and TypeScript
npm run build && npm run start:qa   # production server on :4410; the QA tools run against it
npm run test:e2e                    # Playwright: layout from 320 to 1920px, nav, menu, hero scan, keyboard, axe, photos, reduced motion
npm run shots -- --w=390 --touch    # a screenshot per section, saved to %LOCALAPPDATA%\flatproof-qa\shots
npm run size                        # first-load JS for / (budget: 200 KB gzip)
```

Targets: Lighthouse mobile performance 90 or more, accessibility and best practices 95 or more, LCP under 2.5 s, CLS under 0.05.

## Deploy

Vercel project `flatproof`, served at https://flatproof.vercel.app. Pushes to `main` deploy on their own through the Vercel GitHub app; `vercel deploy --prod` deploys from the CLI if you ever need to.

## Where things are

```
src/content/site.ts         all copy, links, findings and image slots
src/components/hero/        the hero and its inspection scan: Hero, HeroScan, layout
src/components/sections/    one server component per section, each with a small *Motion.tsx client island
src/components/nav/         the floating pill and the phone menu
src/lib/                    GSAP setup (lazy ScrollTrigger), in-page scrolling, revision clouds, photo srcsets, ironbow palette
scripts/                    images, logo, icons, screenshots, bundle size
tests/site.spec.ts          the Playwright suite
docs/                       brief, approved plan, decisions, progress, design system, pitch notes
```

The design system and the reasons behind it are in `docs/DESIGN.md`. Every conflict between the brief, the client's facts and the design skills, and how it was settled, is in `docs/DECISIONS.md`.
