# Progress
Resume point for any new session or after compaction: read `docs/BRIEF.md`, then this file, then `docs/PLAN.md` (approved plan) and `docs/DECISIONS.md`.

## Milestones
| M | Work | Status | Notes |
|---|---|---|---|
| 0 | Git, IMAGE_PROMPTS.md (pushed first), BRIEF, CLAUDE, PLAN, PROGRESS, DECISIONS | done | Repo existed, private and empty |
| 1 | Scaffold Next 16.4.6, deps, Vercel project `flatproof`, claim URL, Git link | done | flatproof.vercel.app is ours. Git link done 2026-11-17, once the Vercel GitHub App was given the repo; CLI deploys until then |
| 2 | Tokens, fonts (gate), content model, logo, theSVG icons, favicons, OG | done | Zalando Sans + rupee-only Hind fallback (FP-D35) |
| 3 | Image pipeline, placeholders, thermal twins, room linework | done | `npm run images`; thermal path tested with a synthetic room |
| 4 | Smooth scroll, nav pill, phone menu, cursor, scrollbar, floating WhatsApp | done | |
| 5 | Hero and thermal lens (desktop, touch, keyboard, reduced motion) | done | |
| 6 | Stakes, Checks, Process | done | |
| 7 | Report, Carpet area, Case file | done | |
| 8 | Services, FAQ, final CTA, footer, 404 | done | |
| 9 | QA pass 1 and fixes | done | 17/17 Playwright; local Lighthouse mobile 97-98 / 100 / 100; 187 KB gz first-load JS |
| 10 | QA pass 2, impeccable audit/polish, taste gate, remove one accessory | done | FP-D47 to FP-D55. impeccable detect: 0 at 1280 and 390. Real Chrome: keyboard path, anchors, cursor, console clean. 17/17 Playwright; Lighthouse mobile local 98-99 / 100 / 100 (SEO 63 = noindex only); 187.6 KB gz. The jury pass was not run: it needs a separate critic agent, offered to the user instead |
| 11 | README, DESIGN, CLIENT_QUESTIONS, PITCH; prod deploy; live checks | done | Live at https://flatproof.vercel.app from main `162439a` (CLI deploy). Launch fixes FP-D56 to FP-D59 (DOM 2,014 to 1,225, static logo, two fonts instead of three). Playwright 17/17 against the live URL; real Chrome desktop pass clean; phone screenshots per section. Lighthouse mobile live, quiet link: 100 / 100 / 100 in four of five runs (one 85), LCP 1.2 to 1.4 s, TBT 30 to 60 ms, CLS 0 to 0.004; runs on a busy link dropped to 73 to 93 (FP-D58) |

## Log
- 2026-11-13: Phase A plan approved (daylight hero, reversed logo on dark, references studied). Phase B: M0 to M9 done and pushed; production deployed by CLI.
- 2026-11-13: QA pass 2 done. Hero recomposed for 5:4 screens and portrait iPads, keyboard order fixed (switch then findings), side stripes and cursor overlap removed, nav kept through jumps, report complete on landing, units glued. The taste consistency checker ran past 10 minutes without printing its table; its saved crops were reviewed one by one instead.
- 2026-11-13: M11 done. Handover docs written; production deployed four times by CLI (docs, then the three launch fixes). `vercel git connect` retried after the last deploy: still refused (no GitHub App access to the private repo).
- 2026-11-14: Photos added (all seven, at ChatGPT's sizes: 1122 to 1672px). Hotspots, clouds and thermal patches calibrated on both hero photos; desktop crop keeps every finding in frame; landscape tablets get a two-column hero; photos no longer upscaled; crop focus per slot; hero photo eager. FP-D60 to FP-D65. QA moved to port 4410 (4400 is PDI PRO INDIA). Phone hero at quality 60. Live (main `2f34669`): Playwright 17/17 against the live URL; Lighthouse mobile 93 to 98 (median 96) / 100 / 100, TBT 40 to 120 ms, CLS 0 to 0.004, simulated LCP 2.3 to 3.1 s with the photo really painted at 0.54 to 0.81 s. Vercel keeps optimised images across deployments (HIT straight after a redeploy), so the one-time warm-up of the hero variants holds.
- 2026-11-14: FLATPROOF wordmark across the foot of the page, lit by a teal scan line with a reflection; the floating WhatsApp button now stays hidden over the footer (FP-D66, FP-D67). The dot-and-ring cursor replaced by the normal arrow and hand in brand teal, CSS only (FP-D68). Both deployed; the suite passes on the live URL (21 passed, 3 skipped by design).
- 2026-11-17: Repo made public by the user and the Vercel GitHub App given access to it; `vercel git connect` linked the project (production branch `main`). Pushes to `main` now deploy on their own.
- 2026-11-17: Review round. The hero's thermal lens is replaced by an inspection scan with a snag report card (FP-D69). Photos are now pre-built static AVIF/WebP files with a one-year cache, fetched after load (FP-D70). The process line and the case clouds finish while in view (FP-D71). The report header fits on phones (FP-D72). Prompt 8 is ready for a construction illustration (FP-D73). First-load JS is 179.3 KB gzip.

## Open items for the user
- Optional: regenerate the two hero photos at a larger size if a tool can (the desktop one is 1672px wide and looks soft on 2560px screens).
- Generate `construction-site.png` with prompt 8 in `IMAGE_PROMPTS.md`, drop it in `images-inbox/` and run `npm run images` (or send it over).
- Client questions: `CLIENT_QUESTIONS.md` (30 questions).
- Optional: a jury-style scored review of the live URL (needs a separate critic agent).
