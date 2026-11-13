"use client";

import type Lenis from "lenis";

// The nav offset lives in CSS (html { scroll-padding-top }). Lenis 1.3 subtracts scroll-padding
// itself and native scrollIntoView honours it, so no extra offset is applied here.

/** Fired on window before an in-page jump, so the nav pill can stay in view through it. */
export const ANCHOR_EVENT = "fp:anchor";

/** Scrolls to an in-page target and moves keyboard focus there, with or without Lenis. */
export function goTo(hash: string, lenis?: Lenis | null) {
  const id = hash.replace(/^.*#/, "");
  const target = id === "top" || id === "" ? document.body : document.getElementById(id);
  if (!target) return;
  window.dispatchEvent(new Event(ANCHOR_EVENT));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (lenis && !reduce) {
    lenis.scrollTo(id === "top" ? 0 : target, { duration: 1.1 });
  } else if (id === "top") {
    window.scrollTo({ top: 0 });
  } else {
    target.scrollIntoView({ block: "start" });
  }
  const focusEl = id === "top" ? document.getElementById("main") : target;
  if (focusEl) {
    if (!focusEl.hasAttribute("tabindex")) focusEl.setAttribute("tabindex", "-1");
    focusEl.focus({ preventScroll: true });
  }
  history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
}
