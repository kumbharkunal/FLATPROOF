"use client";

// GSAP core and useGSAP are first-load (the hero needs them at once). ScrollTrigger, DrawSVG and
// SplitText load lazily so first-load JS for "/" stays under budget (CLAUDE.md, FP-D26).
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 0.7 });
}

type ScrollTriggerType = typeof import("gsap/ScrollTrigger").ScrollTrigger;
let stPromise: Promise<ScrollTriggerType> | null = null;
export function loadST(): Promise<ScrollTriggerType> {
  if (!stPromise) stPromise = import("./st").then((m) => m.ScrollTrigger);
  return stPromise;
}

type DrawType = typeof import("gsap/DrawSVGPlugin").DrawSVGPlugin;
let drawPromise: Promise<DrawType> | null = null;
export function loadDraw(): Promise<DrawType> {
  if (!drawPromise)
    drawPromise = import("gsap/DrawSVGPlugin").then((m) => {
      gsap.registerPlugin(m.DrawSVGPlugin);
      return m.DrawSVGPlugin;
    });
  return drawPromise;
}

type SplitType = typeof import("gsap/SplitText").SplitText;
let splitPromise: Promise<SplitType> | null = null;
export function loadSplit(): Promise<SplitType> {
  if (!splitPromise)
    splitPromise = import("gsap/SplitText").then((m) => {
      gsap.registerPlugin(m.SplitText);
      return m.SplitText;
    });
  return splitPromise;
}

/**
 * Re-measure every trigger once scenes have been built (a pin adds scroll distance, which moves
 * the triggers below it). Debounced so many scenes cause one refresh; sort() orders by position.
 */
let refreshTimer: ReturnType<typeof setTimeout> | null = null;
export function scheduleRefresh() {
  if (refreshTimer) clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    refreshTimer = null;
    loadST().then((ST) => {
      ST.sort();
      ST.refresh();
    });
  }, 60);
}

/** Media conditions shared by every gsap.matchMedia() call. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023.98px)",
  fine: "(hover: hover) and (pointer: fine)",
} as const;

export { gsap, useGSAP };
