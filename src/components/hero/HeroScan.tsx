"use client";

import { useEffect, useRef } from "react";
import { HERO_WIDE } from "./layout";

// Starts the hero scan once the photo is decoded and at least half of it is on screen, keeps the
// "found" count in step with the markers, offers "Scan again", and links each report row with its
// marker on hover and focus. The scan itself is CSS (globals.css, section[data-scan="run"]), timed
// by each finding's distance from the start of the sweep (Hero.tsx).
const START = 0.3; // --scan-start
const TAG_END = 1.9; // a label shows from its hit until 0.1 + 1.8 s later (tag-flash)
const STEP = 1.25; // one digit of the odometer, in em

export function HeroScan() {
  const anchor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = anchor.current?.closest<HTMLElement>("section");
    // "done" = reduced motion (everything shown at once); no state = the inline script did not run.
    if (!hero || hero.dataset.scan !== "ready") return;
    const stage = hero.querySelector<HTMLElement>(".hero-stage")!;
    const img = stage.querySelector("img");
    const digits = hero.querySelector<HTMLElement>(".scan-digits");
    const replay = hero.querySelector<HTMLButtonElement>(".scan-replay");
    const items = Array.from(hero.querySelectorAll<HTMLElement>(".scan-item"));
    const markers = Array.from(hero.querySelectorAll<HTMLElement>(".marker"));
    const timers: number[] = [];
    const clear = () => timers.splice(0).forEach((id) => clearTimeout(id));
    const count = (n: number) => {
      if (digits) digits.style.transform = `translateY(${-n * STEP}em)`;
    };

    const run = () => {
      clear();
      delete hero.dataset.replay;
      // Back to the start (the counter snaps to 0 rather than counting down), then run: re-adding
      // "run" restarts every CSS animation.
      hero.dataset.scan = "ready";
      if (digits) digits.style.transition = "none";
      count(0);
      void hero.offsetWidth;
      if (digits) digits.style.transition = "";
      hero.dataset.scan = "run";
      const wide = matchMedia(HERO_WIDE).matches;
      const sweep = Number(wide ? hero.dataset.sweepD : hero.dataset.sweepM);
      const hits = items.map((li) => Number(wide ? li.dataset.td : li.dataset.tm)).sort((a, b) => a - b);
      hits.forEach((at, k) => timers.push(window.setTimeout(() => count(k + 1), (START + at) * 1000)));
      const end = START + Math.max(sweep, hits[hits.length - 1] + TAG_END) + 0.1;
      timers.push(
        window.setTimeout(() => {
          hero.dataset.scan = "done";
          if (digits) digits.style.transform = "";
          hero.dataset.replay = "on";
        }, end * 1000),
      );
    };

    // The photo is the LCP image: wait until it is decoded, so the scan never crosses an empty frame.
    const ready = new Promise<void>((resolve) => {
      if (!img || (img.complete && img.naturalWidth)) return resolve();
      img.addEventListener("load", () => resolve(), { once: true });
      img.addEventListener("error", () => resolve(), { once: true });
    }).then(() => img?.decode().catch(() => undefined));

    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (started || !entries.some((e) => e.isIntersecting)) return;
        started = true;
        io.disconnect();
        ready.then(run);
      },
      { threshold: 0.55 },
    );
    io.observe(stage);

    // A report row and its marker light up together.
    const hot = (id: string | null) => {
      markers.forEach((m) => m.toggleAttribute("data-hot", m.dataset.id === id));
      items.forEach((li) => li.toggleAttribute("data-hot", li.dataset.id === id));
    };
    const off: (() => void)[] = [];
    const on = (el: HTMLElement, type: string, fn: () => void) => {
      el.addEventListener(type, fn);
      off.push(() => el.removeEventListener(type, fn));
    };
    for (const el of [...items, ...markers.map((m) => m.querySelector<HTMLElement>(".marker-dot")!)]) {
      const id = (el.closest("[data-id]") as HTMLElement).dataset.id!;
      on(el, "pointerenter", () => hot(id));
      on(el, "pointerleave", () => hot(null));
      on(el, "focusin", () => hot(id));
      on(el, "focusout", () => hot(null));
    }
    if (replay) on(replay, "click", run);

    return () => {
      io.disconnect();
      clear();
      off.forEach((fn) => fn());
    };
  }, []);

  return <span ref={anchor} hidden />;
}
