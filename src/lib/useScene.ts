"use client";

import { useRef } from "react";
import { gsap, useGSAP, loadST, MQ, scheduleRefresh } from "@/lib/gsap";

type ST = Awaited<ReturnType<typeof loadST>>;
const INTERACTIONS = ["pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;
export type SceneCtx = { ST: ST; section: HTMLElement; desktop: boolean; fine: boolean };

/**
 * One scroll scene per section. Loads ScrollTrigger lazily, runs `setup` inside gsap.matchMedia
 * (so breakpoint changes rebuild it) and only when motion is allowed: under reduced motion the
 * section's server-rendered final state is what people see.
 *
 * Scenes start when their section comes within a screen of view, or on the first interaction
 * (pointer, key, wheel, touch or scroll), whichever is first, with an 8s fallback. That keeps
 * their setup work out of the load window, and a nav click (pointerdown comes first) always
 * finds every pin in place before it scrolls.
 * Render the returned ref on a hidden anchor inside the section (or the footer):
 * <span ref={anchor} hidden />.
 */
export function useScene(setup: (ctx: SceneCtx) => void | (() => void)) {
  const anchor = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const section = anchor.current?.closest<HTMLElement>("section, footer");
      if (!section) return;
      let dead = false;
      let started = false;
      const mm = gsap.matchMedia();

      const start = () => {
        if (started || dead) return;
        started = true;
        io.disconnect();
        window.clearTimeout(fallback);
        INTERACTIONS.forEach((t) => window.removeEventListener(t, start));
        loadST().then((ST) => {
          if (dead) return;
          mm.add({ motion: MQ.motion, reduce: MQ.reduce, desktop: MQ.desktop, fine: MQ.fine }, (c) => {
            const { motion, desktop, fine } = c.conditions as Record<string, boolean>;
            if (!motion) return;
            section.dataset.scene = "on";
            const off = setup({ ST, section, desktop, fine });
            scheduleRefresh();
            return () => {
              if (typeof off === "function") off();
              delete section.dataset.scene;
            };
          });
        });
      };

      const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && start(), {
        rootMargin: "100% 0px 100% 0px",
      });
      io.observe(section);
      INTERACTIONS.forEach((t) => window.addEventListener(t, start, { once: true, passive: true }));
      const fallback = window.setTimeout(start, 8000);

      return () => {
        dead = true;
        io.disconnect();
        window.clearTimeout(fallback);
        INTERACTIONS.forEach((t) => window.removeEventListener(t, start));
        mm.revert();
      };
    },
    { scope: anchor },
  );
  return anchor;
}
