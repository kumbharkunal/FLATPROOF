"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// Dot + lagging ring on fine pointers only. Transforms and opacity only.
// States: links grow the ring; [data-cursor] shows a short label; [data-cursor-hide] (the hero
// stage, where the lens takes over) hides it; inputs keep the native cursor.
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ok = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const forced = matchMedia("(forced-colors: active)");
    if (!ok.matches || forced.matches) return;

    const dot = el.querySelector<HTMLElement>(".cursor-dot")!;
    const ring = el.querySelector<HTMLElement>(".cursor-ring")!;
    const label = el.querySelector<HTMLElement>(".cursor-label")!;
    const html = document.documentElement;
    html.classList.add("cursor-on");

    const dx = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });
    const lx = gsap.quickTo(label, "x", { duration: 0.35, ease: "power3.out" });
    const ly = gsap.quickTo(label, "y", { duration: 0.35, ease: "power3.out" });

    let shown = false;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        shown = true;
        gsap.set([dot, ring, label], { x: e.clientX, y: e.clientY });
        el.dataset.visible = "true";
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      lx(e.clientX);
      ly(e.clientY);
    };

    const setState = (s: string) => {
      el.dataset.state = s;
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element;
      const dark = t.closest('[role="dialog"]') || t.closest("[data-nav]")?.getAttribute("data-nav") === "dark";
      el.dataset.theme = dark ? "dark" : "light";
      if (t.closest('input, textarea, select, [contenteditable="true"]')) return setState("native");
      if (t.closest("[data-cursor-hide]")) return setState("hidden");
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      if (labelled?.dataset.cursor) {
        label.textContent = labelled.dataset.cursor;
        return setState("label");
      }
      if (t.closest('a, button, [role="button"], summary, label')) return setState("link");
      setState("default");
    };
    const onDown = () => {
      el.dataset.pressed = "true";
    };
    const onUp = () => {
      el.dataset.pressed = "false";
    };
    const onLeave = () => {
      shown = false;
      el.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    html.addEventListener("pointerleave", onLeave);
    return () => {
      html.classList.remove("cursor-on");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      html.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={root} className="cursor" aria-hidden="true" data-visible="false" data-state="default" data-theme="light">
      <div className="cursor-ring" />
      <div className="cursor-dot" />
      <div className="cursor-label" />
    </div>
  );
}
