"use client";

import { useRef } from "react";
import { gsap, useGSAP, loadST, MQ } from "@/lib/gsap";

type ST = Awaited<ReturnType<typeof loadST>>;
export type SceneCtx = { ST: ST; section: HTMLElement; desktop: boolean; fine: boolean };

/**
 * One scroll scene per section. Loads ScrollTrigger lazily, runs `setup` inside gsap.matchMedia
 * (so breakpoint changes rebuild it) and only when motion is allowed: under reduced motion the
 * section's server-rendered final state is what people see. Render the returned ref on a hidden
 * anchor inside the section: <span ref={anchor} hidden />.
 */
export function useScene(setup: (ctx: SceneCtx) => void | (() => void)) {
  const anchor = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const section = anchor.current?.closest("section");
      if (!section) return;
      let dead = false;
      const mm = gsap.matchMedia();
      loadST().then((ST) => {
        if (dead) return;
        mm.add({ motion: MQ.motion, desktop: MQ.desktop, fine: MQ.fine }, (c) => {
          const { motion, desktop, fine } = c.conditions as Record<string, boolean>;
          if (!motion) return;
          section.dataset.scene = "on";
          const off = setup({ ST, section, desktop, fine });
          return () => {
            if (typeof off === "function") off();
            delete section.dataset.scene;
          };
        });
      });
      return () => {
        dead = true;
        mm.revert();
      };
    },
    { scope: anchor },
  );
  return anchor;
}
