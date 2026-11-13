// QA screenshots and layout checks with Playwright (run against a production build on :4400).
// Usage: node scripts/shots.mjs [url] [--w=390] [--h=844] [--touch] [--reduce] [--tag=name]
// Writes PNGs to %LOCALAPPDATA%\flatproof-qa\shots\<tag>\ (outside OneDrive) and prints horizontal
// overflow, tap targets under 44px, and console errors.
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const [k, v] = a.slice(2).split("=");
      return [k, v ?? true];
    }),
);
const url = process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "http://localhost:4400/";
const W = Number(args.w ?? 390);
const H = Number(args.h ?? 844);
const touch = !!args.touch;
const tag = String(args.tag ?? `${W}x${H}${touch ? "-touch" : ""}${args.reduce ? "-reduce" : ""}`);
const out = join(process.env.LOCALAPPDATA ?? ".", "flatproof-qa", "shots", tag);
await mkdir(out, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: touch ? 2 : 1,
  isMobile: touch,
  hasTouch: touch,
  reducedMotion: args.reduce ? "reduce" : "no-preference",
});
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
await page.screenshot({ path: join(out, "00-top.png") });

const ids = ["stakes", "checks", "process", "report", "carpet-area", "case", "services", "faq", "book"];
let n = 1;
for (const id of ids) {
  // Scroll in steps so scrubbed scenes and pins see every position, as a reader would.
  const top = await page.evaluate((i) => document.getElementById(i).getBoundingClientRect().top + window.scrollY, id);
  const from = await page.evaluate(() => window.scrollY);
  const steps = 6;
  for (let s = 1; s <= steps; s++) {
    await page.evaluate((y) => window.scrollTo(0, y), from + ((top - from) * s) / steps);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(900);
  await page.screenshot({ path: join(out, `${String(n).padStart(2, "0")}-${id}.png`) });
  if (["checks", "process", "report", "carpet-area", "case"].includes(id)) {
    for (const k of [0.5, 1]) {
      await page.evaluate((dy) => window.scrollBy(0, dy), H * k * 0.9);
      await page.waitForTimeout(900);
      await page.screenshot({ path: join(out, `${String(n).padStart(2, "0")}-${id}-${k}.png`) });
    }
  }
  n++;
}
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await page.waitForTimeout(1200);
await page.screenshot({ path: join(out, `${String(n).padStart(2, "0")}-footer.png`) });

const report = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const overflow = document.documentElement.scrollWidth - vw;
  const wide = [...document.querySelectorAll("body *")]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > vw + 1 || r.left < -1) && getComputedStyle(el).position !== "fixed" && !el.closest(".hero-stage, .cover, .lens, .tape");
    })
    .slice(0, 8)
    .map((el) => `${el.tagName.toLowerCase()}.${String(el.className.baseVal ?? el.className).split(" ")[0]} right=${Math.round(el.getBoundingClientRect().right)}`);
  const small = [...document.querySelectorAll("a[href], button, summary, input")]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      const visible = r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden" && getComputedStyle(el).opacity !== "0";
      return visible && (r.width < 44 || r.height < 44) && !el.classList.contains("skip-link");
    })
    .map((el) => `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)}" ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`);
  return { vw, overflow, wide, small };
});
console.log(JSON.stringify({ tag, out, ...report, errors }, null, 2));
await browser.close();
