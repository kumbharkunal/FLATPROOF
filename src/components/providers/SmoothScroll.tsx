"use client";

import "lenis/dist/lenis.css";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { gsap, loadST } from "@/lib/gsap";
import { goTo } from "@/lib/scroll";

type ST = Awaited<ReturnType<typeof loadST>>;

// One clock: gsap.ticker drives Lenis, and ScrollTrigger updates on every Lenis scroll.
function Sync() {
  const st = useRef<ST | null>(null);
  const lenis = useLenis(() => st.current?.update());
  useEffect(() => {
    let alive = true;
    loadST().then((s) => {
      if (alive) st.current = s;
    });
    return () => {
      alive = false;
    };
  }, []);
  useEffect(() => {
    if (!lenis) return;
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(tick);
  }, [lenis]);
  return null;
}

// In-page links: smooth scroll (or jump under reduced motion) and move focus to the target.
function AnchorHandler() {
  const lenis = useLenis();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash || a.target === "_blank") return;
      e.preventDefault();
      goTo(url.hash, lenis);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);
  return null;
}

export function SmoothScroll() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!mq.matches);
    update();
    mq.addEventListener("change", update);
    // Load ScrollTrigger now; refresh once fonts and images are in (they change trigger positions).
    const refresh = () => loadST().then((s) => s.refresh());
    loadST();
    document.fonts?.ready.then(refresh);
    if (document.readyState !== "complete") window.addEventListener("load", refresh, { once: true });
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <>
      {enabled && (
        <>
          {/* Root instance rendered beside the page, so toggling never remounts content. */}
          <ReactLenis root options={{ autoRaf: false, syncTouch: false, lerp: 0.1 }} />
          <Sync />
        </>
      )}
      <AnchorHandler />
    </>
  );
}
