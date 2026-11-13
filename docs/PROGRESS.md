# Progress
Resume point for any new session or after compaction: read `docs/BRIEF.md`, then this file, then `docs/PLAN.md` (approved plan) and `docs/DECISIONS.md`.

## Milestones
| M | Work | Status | Notes |
|---|---|---|---|
| 0 | Git, IMAGE_PROMPTS.md (pushed first), BRIEF, CLAUDE, PLAN, PROGRESS, DECISIONS | done | Repo existed, private and empty |
| 1 | Scaffold Next 16.4.6, deps, Vercel project `flatproof`, claim URL, Git link | done, one blocker | flatproof.vercel.app is ours. `vercel git connect` refused: the Vercel GitHub App has no access to the private repo (needs the user). CLI deploys meanwhile |
| 2 | Tokens, fonts (gate), content model, logo, theSVG icons, favicons, OG | done | Zalando Sans + rupee-only Hind fallback (FP-D35) |
| 3 | Image pipeline, placeholders, thermal twins, room linework | done | `npm run images`; thermal path tested with a synthetic room |
| 4 | Smooth scroll, nav pill, phone menu, cursor, scrollbar, floating WhatsApp | done | |
| 5 | Hero and thermal lens (desktop, touch, keyboard, reduced motion) | done | |
| 6 | Stakes, Checks, Process | done | |
| 7 | Report, Carpet area, Case file | done | |
| 8 | Services, FAQ, final CTA, footer, 404 | done | |
| 9 | QA pass 1 and fixes | done | 17/17 Playwright; local Lighthouse mobile 97-98 / 100 / 100; 187 KB gz first-load JS |
| 10 | QA pass 2, impeccable audit/polish, taste gate, jury, remove one accessory | done (jury runs on the live URL in M11) | FP-D47 to FP-D55. impeccable detect: 0 at 1280 and 390. Real Chrome: keyboard path, anchors, cursor, console clean. 17/17 Playwright; Lighthouse mobile local 98-99 / 100 / 100 (SEO 63 = noindex only); 187.6 KB gz |
| 11 | README, DESIGN, CLIENT_QUESTIONS, PITCH; prod deploy; live checks | todo | |

## Log
- 2026-11-13: Phase A plan approved (daylight hero, reversed logo on dark, references studied). Phase B: M0 to M9 done and pushed; production deployed by CLI.
- 2026-11-13: QA pass 2 done. Hero recomposed for 5:4 screens and portrait iPads, keyboard order fixed (switch then findings), side stripes and cursor overlap removed, nav kept through jumps, report complete on landing, units glued. The taste consistency checker ran past 10 minutes without printing its table; its saved crops were reviewed one by one instead.

## Open items for the user
- Give the Vercel GitHub App access to `kumbharkunal/FLATPROOF` (then `vercel git connect` turns on deploys from main).
- Generate the seven images from IMAGE_PROMPTS.md into `images-inbox/`, then say "images added" (hotspot calibration follows).
- Client questions: `CLIENT_QUESTIONS.md` (written at M11).
