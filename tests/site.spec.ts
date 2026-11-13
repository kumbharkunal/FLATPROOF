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

test("hero lens: sweeping the camera finds all four defects", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "pointer lens");
  await page.goto("/");
  await settle(page, 1600);
  const box = await page.evaluate(() => {
    const r = document.querySelector(".hero-overlay")!.getBoundingClientRect();
    return { l: r.left, t: r.top, w: r.width, h: r.height };
  });
  const spots = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>(".marker")].map((m) => {
      const cs = getComputedStyle(m);
      return [parseFloat(cs.getPropertyValue("--xd")), parseFloat(cs.getPropertyValue("--yd"))];
    }),
  );
  for (const [x, y] of spots) {
    await page.mouse.move(box.l + (box.w * x) / 100, box.t + (box.h * y) / 100, { steps: 12 });
    await page.waitForTimeout(700);
  }
  await expect(page.locator(".tally")).toContainText("Found 4 of 4");
  await expect(page.locator(".marker[data-shown='true']")).toHaveCount(4);
});

test("thermal view switch works from the keyboard", async ({ page }) => {
  await page.goto("/");
  await settle(page);
  const sw = page.getByRole("switch", { name: "Thermal view" });
  await sw.focus();
  await page.keyboard.press("Space");
  await expect(sw).toHaveAttribute("aria-checked", "true");
  await expect(page.locator(".tally")).toContainText("Found 4 of 4");
  await expect(page.locator(".hero-lens")).toHaveAttribute("data-thermal", "on");
  // Focus goes from the switch into the findings (past the selected finding's link, if one is open).
  await page.keyboard.press("Tab");
  if (await page.evaluate(() => !!document.activeElement?.closest(".hero-panel"))) await page.keyboard.press("Tab");
  await expect(page.locator(".marker").first()).toBeFocused();
  await expect(page.locator(".marker").first()).toBeVisible();
});

test("reduced motion: static thermal split, no pins, everything readable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await settle(page);
  await expect(page.locator(".hero-lens")).toHaveAttribute("data-mode", "static");
  await expect(page.locator(".marker[data-shown='true']")).toHaveCount(4);
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
