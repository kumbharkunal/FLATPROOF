import { test, expect, type Page } from "@playwright/test";
const AXE: string = require.resolve("axe-core/axe.min.js");

// Prefilled WhatsApp texts allowed on the page (src/content/site.ts waMessages).
const WA = [
  "Hello FlatProof, I want to book a Pre-Possession Inspection (125+ points check).",
  "Hello FlatProof, I would like to book an inspection service.",
  "Hello FlatProof, please share the complete 125+ points inspection checklist.",
  "Hello FlatProof, please share the full sample report.",
  "Hello FlatProof, I want to book Water Leakage Rectification and Waterproofing.",
  "Hello FlatProof, I want to book a Carpet Area Measurement audit.",
  "Hello FlatProof, I want to book a Rental Flat Inspection.",
  "Hello FlatProof, I would like to consult with your Engineering team.",
  "Hello FlatProof, I want to discuss a Building Construction or Infra Project.",
];

async function settle(page: Page, ms = 1200) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(ms);
}

async function scrollToId(page: Page, id: string, offset = 120) {
  await page.evaluate(
    ([i, o]) => {
      const el = document.getElementById(i as string)!;
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + (o as number));
    },
    [id, offset],
  );
  await page.waitForTimeout(900);
}

test("structure: one h1, landmarks, lang, noindex, skip link", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("html")).toHaveAttribute("lang", "en-IN");
  await expect(page.locator("header.nav")).toHaveCount(1);
  await expect(page.locator("main#main")).toHaveCount(1);
  await expect(page.locator("footer.footer")).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator("a.skip-link")).toHaveAttribute("href", "#main");
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
});

test("booking links: every WhatsApp link carries an approved prefilled message", async ({ page }) => {
  await page.goto("/");
  const hrefs = await page.locator('a[href^="https://wa.me/"]').evaluateAll((els) => els.map((e) => e.getAttribute("href")!));
  expect(hrefs.length).toBeGreaterThan(8);
  for (const h of hrefs) {
    expect(h.startsWith("https://wa.me/919657555588?text=")).toBe(true);
    expect(WA).toContain(decodeURIComponent(h.split("?text=")[1]));
  }
  const hero = page.locator(".hero-ctas a").first();
  expect(decodeURIComponent((await hero.getAttribute("href"))!.split("?text=")[1])).toBe(WA[0]);
  await expect(page.locator('a[href="tel:+919657555588"]').first()).toBeAttached();
  await expect(page.locator('a[href="https://ig.me/m/flatproof.inspections"]')).toHaveCount(1);
  // Facebook stays hidden until the client has a Page (FP-D12).
  await expect(page.locator('a[href*="facebook.com"]')).toHaveCount(0);
});

test("layout: no sideways scroll and 44px tap targets from 320 to 1920", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "viewport sweep runs once");
  for (const [w, h] of [[320, 640], [360, 740], [390, 844], [430, 932], [768, 1024], [1024, 768], [1280, 800], [1440, 900], [1920, 1080]]) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("/");
    await settle(page, 800);
    const r = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const small = [...document.querySelectorAll<HTMLElement>("a[href], button, summary, input")]
        .filter((el) => {
          const b = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          return b.width > 0 && b.height > 0 && cs.visibility !== "hidden" && cs.opacity !== "0" && !el.closest("[inert]") && !el.classList.contains("skip-link") && (b.width < 44 || b.height < 44);
        })
        .map((el) => `${el.tagName} ${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 24)}`);
      return { overflow: document.documentElement.scrollWidth - vw, small };
    });
    expect(r.overflow, `overflow at ${w}`).toBe(0);
    expect(r.small, `small targets at ${w}`).toEqual([]);
  }
});

test("accessibility: no serious or critical axe violations", async ({ page }) => {
  await page.goto("/");
  await settle(page);
  // Measured at rest: mid-scan, a row or label that is still fading in has partial contrast.
  await expect(page.locator("section.hero")).toHaveAttribute("data-scan", "done", { timeout: 12_000 });
  await page.addScriptTag({ path: AXE });
  const violations = await page.evaluate(async () => {
    // @ts-expect-error axe is injected above
    const res = await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"] });
    return res.violations
      .filter((v: { impact: string }) => v.impact === "serious" || v.impact === "critical")
      .map((v: { id: string; nodes: { target: string[] }[] }) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
  });
  expect(violations).toEqual([]);
});

test("phone menu: 10 open/close cycles, focus trap, Esc, link lands under the pill", async ({ page }, info) => {
  test.skip(info.project.name !== "phone", "phone only");
  await page.goto("/");
  await settle(page);
  const btn = page.getByRole("button", { name: "Menu", exact: true });
  for (let i = 0; i < 10; i++) {
    await btn.click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    await expect(btn).toHaveAttribute("aria-expanded", "true");
    if (i === 0) {
      for (let t = 0; t < 14; t++) await page.keyboard.press("Tab");
      expect(await page.evaluate(() => !!document.activeElement?.closest("#mobile-menu"))).toBe(true);
    }
    if (i % 2) await page.keyboard.press("Escape");
    else await page.getByRole("button", { name: "Close menu" }).click();
    await expect(dialog).toBeHidden();
    await expect(btn).toBeFocused();
  }
  await btn.click();
  await page.getByRole("dialog").getByRole("link", { name: "Report" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
  await page.waitForTimeout(1600);
  const top = await page.evaluate(() => Math.round(document.getElementById("report")!.getBoundingClientRect().top));
  expect(top).toBeGreaterThan(40);
  expect(top).toBeLessThan(140);
});

test("nav theme follows the section under the pill", async ({ page }) => {
  await page.goto("/");
  await settle(page);
  for (const [id, theme] of [
    ["stakes", "dark"],
    ["process", "light"],
    ["report", "light"],
    ["case", "dark"],
    ["services", "light"],
    ["book", "dark"],
  ]) {
    await scrollToId(page, id, 200);
    await expect(page.locator("header.nav"), id).toHaveAttribute("data-theme", theme);
  }
});

// How many digits the "found" odometer shows (each digit is 1.25em tall).
async function foundCount(page: Page) {
  return page.locator(".scan-digits").evaluate((d) => {
    const ty = new DOMMatrix(getComputedStyle(d).transform).m42;
    return Math.round(-ty / (parseFloat(getComputedStyle(d).fontSize) * 1.25));
  });
}

test("hero scan: marks all four defects, the report links each to its evidence, Scan again replays", async ({ page }, info) => {
  await page.goto("/");
  const hero = page.locator("section.hero");
  // Phones: bring the photo into view, as a first scroll would.
  if (info.project.name === "phone") await page.evaluate(() => window.scrollTo(0, 300));
  await expect(hero).toHaveAttribute("data-scan", "done", { timeout: 12_000 });
  expect(await foundCount(page)).toBe(4);
  const rows = page.locator(".scan-row");
  await expect(rows).toHaveCount(4);
  for (const r of await rows.all()) await expect(r).toHaveCSS("opacity", "1");
  expect(await rows.evaluateAll((els) => els.map((e) => e.getAttribute("href")))).toEqual(["#case", "#report", "#checks", "#checks"]);
  for (const m of await page.locator(".marker").all()) await expect(m).toHaveCSS("opacity", "1");
  await page.locator(".scan-replay").click();
  await expect(hero).toHaveAttribute("data-scan", "run");
  expect(await foundCount(page)).toBeLessThan(4);
  await expect(hero).toHaveAttribute("data-scan", "done", { timeout: 12_000 });
  expect(await foundCount(page)).toBe(4);
});

test("hero: the report rows follow the calls to action in keyboard order and light their marker", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("section.hero")).toHaveAttribute("data-scan", "done", { timeout: 12_000 });
  await page.locator(".hero-ctas .hero-secondary").focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Scan again" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.locator(".scan-row").first()).toBeFocused();
  await expect(page.locator(".marker").first()).toHaveAttribute("data-hot", "");
});

test("reduced motion: findings shown at once, no pins, everything readable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await settle(page);
  await expect(page.locator("section.hero")).toHaveAttribute("data-scan", "done");
  for (const m of await page.locator(".marker").all()) await expect(m).toHaveCSS("opacity", "1");
  for (const r of await page.locator(".scan-row").all()) await expect(r).toHaveCSS("opacity", "1");
  await expect(page.locator(".scan-replay")).toBeHidden();
  expect(await page.locator(".pin-spacer").count()).toBe(0);
  const stakesOpacity = await page.locator(".stakes-body").evaluate((el) => getComputedStyle(el).opacity);
  expect(Number(stakesOpacity)).toBe(1);
  await scrollToId(page, "checks", 0);
  await expect(page.locator(".odometer .sr-only")).toHaveText(/125\+/);
  // The footer wordmark is simply lit: no clip, no scan line.
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(600);
  expect(await page.locator(".mark-lit").evaluate((el) => getComputedStyle(el).clipPath)).toBe("none");
});

test("footer wordmark: decorative, and fully lit by the time the page ends", async ({ page }) => {
  await page.goto("/");
  await settle(page);
  await expect(page.locator(".footer-mark-wrap")).toHaveAttribute("aria-hidden", "true");
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(2600);
  const clip = await page.locator(".mark-lit").evaluate((el) => getComputedStyle(el).clipPath);
  expect(["none", "inset(0px 0% 0px 0px)", "inset(0px)"]).toContain(clip);
});

test("cursor: the normal arrow and hand in brand teal, the system caret in text fields", async ({ page }, info) => {
  await page.goto("/");
  const r = await page.evaluate(() => {
    const c = (sel: string) => getComputedStyle(document.querySelector(sel)!).cursor;
    return {
      page: getComputedStyle(document.documentElement).cursor,
      text: c(".hero-lead"),
      stage: c(".hero-stage"),
      link: c("a[href]"),
      button: c("button"),
      field: c("#carpet-area input"),
      follower: document.querySelectorAll(".cursor").length,
    };
  });
  expect(r.follower).toBe(0);
  if (info.project.name === "phone") {
    // Touch screens have no pointer to draw.
    expect(r.page).toBe("auto");
    return;
  }
  expect(r.page).toMatch(/^(-webkit-)?image-set\(.*svg.*\) 4 3, auto$/);
  expect(r.text).toBe(r.page);
  expect(r.stage).toBe(r.page);
  expect(r.link).toMatch(/^(-webkit-)?image-set\(.*svg.*\) 12 3, pointer$/);
  expect(r.button).toBe(r.link);
  expect(r.field).toBe("text");
  // Every drawing decodes at its stated size (32 for 1x, 64 for 2x).
  const sizes = await page.evaluate(async (values) => {
    const urls = values.flatMap((v) => [...v.matchAll(/url\("([^"]+)"\)/g)].map((m) => m[1]));
    return Promise.all(
      urls.map(
        (u) =>
          new Promise<number>((done) => {
            const img = new Image();
            img.onload = () => done(img.naturalWidth);
            img.onerror = () => done(0);
            img.src = u;
          }),
      ),
    );
  }, [r.page, r.link]);
  expect(sizes).toEqual([32, 64, 32, 64]);
});

// Scroll so an element's top (or centre) sits at a share of the screen's height.
async function placeAt(page: Page, sel: string, share: number, edge: "top" | "center" = "top") {
  await page.evaluate(
    ([s, f, e]) => {
      const r = document.querySelector(s)!.getBoundingClientRect();
      window.scrollTo(0, (e === "center" ? r.top + r.height / 2 : r.top) + window.scrollY - window.innerHeight * Number(f));
    },
    [sel, String(share), edge] as const,
  );
}

test("process: the line reaches step 3 while the numbers are still on screen", async ({ page }, info) => {
  await page.goto("/");
  await settle(page, 600);
  // Desktop: the number row at 40% of the screen. Phones: the third number at half height.
  if (info.project.name === "desktop") await placeAt(page, ".steps-line", 0.4);
  else await placeAt(page, ".step:nth-child(3) .step-num", 0.5);
  await expect(page.locator(".step-num.on")).toHaveCount(3, { timeout: 5000 });
  const top = await page.locator(".step-num").nth(2).evaluate((n) => n.getBoundingClientRect().top);
  expect(top).toBeGreaterThan(0);
  expect(top).toBeLessThan(await page.evaluate(() => innerHeight));
});

test("case file: clouds a, b and c are all drawn while the whole photo is on screen", async ({ page }) => {
  await page.goto("/");
  await settle(page, 600);
  await placeAt(page, ".case-photo", 0.95);
  await page.waitForTimeout(500);
  await placeAt(page, ".case-photo", 0.66, "center");
  await expect
    .poll(() => page.locator(".case-clouds path").evaluateAll((ps) => ps.map((p) => Math.round(parseFloat(getComputedStyle(p).strokeDashoffset) * 100))), { timeout: 5000 })
    .toEqual([0, 0, 0]);
  const box = (await page.locator(".case-photo").boundingBox())!;
  expect(box.y).toBeGreaterThanOrEqual(0);
  expect(box.y + box.height).toBeLessThanOrEqual(await page.evaluate(() => innerHeight + 1));
});

test("report: on a 320px phone the sample stamp and the sheet title each stay on one line", async ({ page }, info) => {
  test.skip(info.project.name !== "phone", "phone layout");
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");
  for (const sel of [".sheet-stamp", ".sheet-heading"]) {
    const lines = await page.locator(sel).evaluate((el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      return new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size;
    });
    expect(lines, sel).toBe(1);
  }
});

test("photos: pre-built static files, never resized on request, fetched before you reach them", async ({ page, request }) => {
  await page.goto("/");
  const refs = await page.evaluate(() =>
    [...document.querySelectorAll("img, source")].flatMap((el) => [el.getAttribute("src") ?? "", el.getAttribute("srcset") ?? ""]).join(" "),
  );
  expect(refs).not.toContain("/_next/image");
  const avif = await page.locator('picture source[type="image/avif"]').first().getAttribute("srcset");
  const first = avif!.split(",")[0].trim().split(" ")[0];
  expect(first).toMatch(/^\/img\/.+-[0-9a-f]{8}-\d+\.avif$/);
  const res = await request.get(first);
  expect(res.status()).toBe(200);
  expect(res.headers()["cache-control"]).toContain("immutable");
  // Once the page has loaded, every lazy photo further down has been asked for already.
  await expect.poll(() => page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').length), { timeout: 8000 }).toBe(0);
});

test("floating WhatsApp: hidden on the hero and from the close to the end, shown in between", async ({ page }) => {
  await page.goto("/");
  await settle(page);
  const fab = page.locator(".float-wa");
  await expect(fab).toHaveAttribute("data-visible", "false");
  await scrollToId(page, "report", 0);
  await expect(fab).toHaveAttribute("data-visible", "true");
  await scrollToId(page, "book", 0);
  await expect(fab).toHaveAttribute("data-visible", "false");
  // Over the footer too, where the wordmark sits.
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(900);
  await expect(fab).toHaveAttribute("data-visible", "false");
});
