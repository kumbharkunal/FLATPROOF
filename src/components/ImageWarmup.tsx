"use client";

import { useEffect } from "react";

type Connection = { saveData?: boolean; effectiveType?: string };

// Once the page has loaded and the browser is idle, fetch every lazy photo further down the page,
// so each one is already there when you scroll to it or jump to it from the menu. Skipped with
// Save-Data or on 2G/3G, where only the photos you reach are fetched.
export function ImageWarmup() {
  useEffect(() => {
    const c = (navigator as Navigator & { connection?: Connection }).connection;
    if (c?.saveData || /2g|3g/.test(c?.effectiveType ?? "")) return;
    // Safari has no requestIdleCallback: a short timeout after load stands in for it.
    const hasIdle = typeof window.requestIdleCallback === "function";
    let handle = 0;
    const warm = () => {
      document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
        // Not rendered on this layout (the services previews on phones): leave it alone.
        if (img.getClientRects().length) img.loading = "eager";
      });
    };
    const schedule = () => {
      handle = hasIdle ? window.requestIdleCallback(warm, { timeout: 2500 }) : window.setTimeout(warm, 1200);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);
  return null;
}
