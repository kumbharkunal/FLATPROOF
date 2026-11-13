"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { HERO_WIDE } from "./layout";
import type { LensFinding, LensGrid } from "./types";

export type Engine = {
  setPaused: (p: boolean) => void;
  setThermal: (on: boolean) => void;
  focus: (id: string) => void;
};

type Callbacks = {
  onMode: (mode: "lens" | "static", touch: boolean) => void;
  onLock: (id: string | null) => void;
};

const TOUR = ["sill", "socket", "damp", "tile"];

/**
 * The lens: a circle moved only by transform, holding a thermal layer counter-translated so it
 * stays registered with the photo underneath (FP-D27). Pointer on desktop; an auto-tour with drag,
 * tap-to-aim and a pause control on touch (FP-D32). No React state per frame: only lock changes
 * reach React.
 */
export function useLensEngine(
  root: RefObject<HTMLDivElement | null>,
  findings: LensFinding[],
  grids: { desktop?: LensGrid; mobile?: LensGrid },
  cb: Callbacks,
) {
  const engine = useRef<Engine | null>(null);
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // `reduce` is listed so the callback always runs (matchMedia skips it when nothing matches).
      mm.add({ motion: MQ.motion, reduce: MQ.reduce, fine: MQ.fine, desk: HERO_WIDE }, (ctx) => {
        const { motion, fine, desk } = ctx.conditions as Record<string, boolean>;
        if (!motion) {
          cbRef.current.onMode("static", !fine);
          engine.current = { setPaused: () => {}, setThermal: () => {}, focus: () => {} };
          return;
        }
        cbRef.current.onMode("lens", !fine);
        const layout = desk ? "desktop" : "mobile";
        const wrap = root.current!;
        const stage = wrap.querySelector<HTMLElement>(".hero-stage")!;
        const lens = stage.querySelector<HTMLElement>(".lens")!;
        const inner = stage.querySelector<HTMLElement>(".lens-inner")!;
        const needle = stage.querySelector<HTMLElement>(".lens-needle")!;
        const coverEl = stage.querySelector<HTMLElement>(".hero-overlay")!;
        const grid = grids[layout];
        const gridData = grid ? Uint8Array.from(atob(grid.data), (c) => c.charCodeAt(0)) : null;

        let W = 0, H = 0, R = 0;
        const cover = { left: 0, top: 0, w: 1, h: 1 };
        let spots: { id: string; x: number; y: number }[] = [];
        const measure = () => {
          const sr = stage.getBoundingClientRect();
          W = sr.width;
          H = sr.height;
          R = lens.offsetWidth / 2;
          const cr = coverEl.getBoundingClientRect();
          cover.left = cr.left - sr.left;
          cover.top = cr.top - sr.top;
          cover.w = cr.width;
          cover.h = cr.height;
          spots = findings.map((f) => {
            const p = layout === "desktop" ? f.d : f.m;
            return { id: f.id, x: cover.left + (p.x / 100) * cover.w, y: cover.top + (p.y / 100) * cover.h };
          });
        };

        // Relative heat (0 cold, 1 hot) under the crosshair: from the pipeline's grid, or an
        // analytic field built from the same anomalies for the line-drawing placeholder.
        const heatAt = (x: number, y: number) => {
          const px = ((x - cover.left) / cover.w) * 100;
          const py = ((y - cover.top) / cover.h) * 100;
          if (grid && gridData) {
            const gx = Math.min(grid.cols - 1, Math.max(0, Math.floor((px / 100) * grid.cols)));
            const gy = Math.min(grid.rows - 1, Math.max(0, Math.floor((py / 100) * grid.rows)));
            return gridData[gy * grid.cols + gx] / 255;
          }
          let t = 0.5;
          for (const f of findings) {
            const p = layout === "desktop" ? f.d : f.m;
            const s = f.thermal[layout];
            const d = ((px - p.x) / s.rx) ** 2 + ((py - p.y) / s.ry) ** 2;
            t += (f.thermal.kind === "cold" ? -1 : 1) * 0.42 * f.thermal.strength * Math.exp(-d / 2);
          }
          return Math.min(1, Math.max(0, t));
        };

        const pos = { x: 0, y: 0 };
        let last = { x: NaN, y: NaN };
        let locked: string | null = null;
        const apply = () => {
          if (pos.x === last.x && pos.y === last.y) return;
          last = { x: pos.x, y: pos.y };
          lens.style.transform = `translate3d(${pos.x - R}px, ${pos.y - R}px, 0)`;
          inner.style.transform = `translate3d(${R - pos.x}px, ${R - pos.y}px, 0)`;
          const side = pos.x > W * 0.62 ? "left" : "right";
          if (lens.dataset.side !== side) lens.dataset.side = side;
          // The needle hangs from the centre, so 0° points down; the scale runs 7:30 (cold) to 4:30 (hot).
          needle.style.transform = `rotate(${45 + 270 * heatAt(pos.x, pos.y)}deg)`;
          let best: (typeof spots)[number] | null = null;
          let bd = Infinity;
          for (const s of spots) {
            const d = Math.hypot(s.x - pos.x, s.y - pos.y);
            if (d < bd) {
              bd = d;
              best = s;
            }
          }
          const lockR = R * 0.45;
          const next = best && bd < lockR ? best.id : locked && bd < lockR * 1.5 ? locked : null;
          if (next !== locked) {
            locked = next;
            lens.dataset.locked = next ? "true" : "false";
            cbRef.current.onLock(next);
          }
        };

        measure();
        const rest = desk ? { x: W * 0.6, y: H * 0.58 } : { x: W * 0.5, y: H * 0.46 };
        pos.x = rest.x;
        pos.y = rest.y;
        apply();
        gsap.ticker.add(apply);

        const show = (v: boolean) => (lens.dataset.visible = v ? "true" : "false");
        let thermalOn = false;
        let paused = false;
        let offscreen = false;
        let dragging = false;
        let tour: gsap.core.Tween | gsap.core.Tween[] | null = null;
        let wait: gsap.core.Tween | null = null;
        let tourIndex = 0;
        const stopTour = () => {
          (Array.isArray(tour) ? tour : tour ? [tour] : []).forEach((t) => t.kill());
          wait?.kill();
          tour = null;
          wait = null;
        };
        const glide = (x: number, y: number, d = 1.1) => gsap.to(pos, { x, y, duration: d, ease: "power2.inOut", overwrite: true });

        // Lens appears once its thermal layer has decoded (never blocks the hero image).
        const img = inner.querySelector("img");
        const ready = img && !img.complete ? img.decode().catch(() => undefined) : Promise.resolve();
        let alive = true;
        const cleanups: (() => void)[] = [];

        const step = () => {
          if (!alive || paused || offscreen || dragging || thermalOn || fine) return;
          const s = spots.find((p) => p.id === TOUR[tourIndex % TOUR.length]);
          tourIndex++;
          if (!s) return;
          tour = glide(s.x, s.y);
          tour.then(() => {
            if (alive) wait = gsap.delayedCall(1.7, step);
          });
        };
        const resumeLater = (delay: number) => {
          stopTour();
          wait = gsap.delayedCall(delay, step);
        };

        ready.then(() => {
          if (!alive) return;
          show(true);
          if (!fine) wait = gsap.delayedCall(0.8, step);
        });

        if (fine) {
          const qx = gsap.quickTo(pos, "x", { duration: 0.35, ease: "power3.out" });
          const qy = gsap.quickTo(pos, "y", { duration: 0.35, ease: "power3.out" });
          const onMove = (e: PointerEvent) => {
            if (e.pointerType !== "mouse" || thermalOn) return;
            const off = (e.target as Element).closest("[data-lens-off]");
            show(!off);
            const sr = stage.getBoundingClientRect();
            qx(Math.min(W, Math.max(0, e.clientX - sr.left)));
            qy(Math.min(H, Math.max(0, e.clientY - sr.top)));
          };
          wrap.addEventListener("pointermove", onMove, { passive: true });
          cleanups.push(() => wrap.removeEventListener("pointermove", onMove));
        } else {
          // Drag starts on the lens; vertical pans still scroll the page (touch-action: pan-y).
          let start: { x: number; y: number; px: number; py: number; t: number } | null = null;
          const onDown = (e: PointerEvent) => {
            if ((e.target as Element).closest("a, button")) return;
            const onLens = !!(e.target as Element).closest(".lens");
            start = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y, t: performance.now() };
            if (onLens) {
              dragging = true;
              stopTour();
            }
          };
          const onMove = (e: PointerEvent) => {
            if (!start || !dragging) return;
            pos.x = Math.min(W, Math.max(0, start.px + e.clientX - start.x));
            pos.y = Math.min(H, Math.max(0, start.py + e.clientY - start.y));
          };
          const onUp = (e: PointerEvent) => {
            if (!start) return;
            const moved = Math.hypot(e.clientX - start.x, e.clientY - start.y);
            const quick = performance.now() - start.t < 450;
            const wasDrag = dragging;
            start = null;
            dragging = false;
            if (e.type === "pointercancel") return void (!paused && resumeLater(3));
            if (!wasDrag && moved < 10 && quick && !thermalOn) {
              const sr = stage.getBoundingClientRect();
              stopTour();
              tour = glide(e.clientX - sr.left, e.clientY - sr.top, 0.5);
              if (!paused) wait = gsap.delayedCall(3.5, step);
            } else if (!paused) resumeLater(4);
          };
          stage.addEventListener("pointerdown", onDown, { passive: true });
          window.addEventListener("pointermove", onMove, { passive: true });
          window.addEventListener("pointerup", onUp, { passive: true });
          window.addEventListener("pointercancel", onUp, { passive: true });
          cleanups.push(() => {
            stage.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
            window.removeEventListener("pointercancel", onUp);
          });
          const io = new IntersectionObserver(([en]) => {
            offscreen = !en.isIntersecting;
            if (offscreen) stopTour();
            else if (!paused && !thermalOn && !tour && !wait) wait = gsap.delayedCall(0.4, step);
          });
          io.observe(stage);
          cleanups.push(() => io.disconnect());
        }

        const ro = new ResizeObserver(() => {
          const fx = W ? pos.x / W : 0.5;
          const fy = H ? pos.y / H : 0.5;
          measure();
          pos.x = fx * W;
          pos.y = fy * H;
          last = { x: NaN, y: NaN };
          apply();
        });
        ro.observe(stage);
        cleanups.push(() => ro.disconnect());

        engine.current = {
          setPaused: (p) => {
            paused = p;
            if (p) stopTour();
            else if (!thermalOn && !fine) wait = gsap.delayedCall(0.3, step);
          },
          setThermal: (on) => {
            thermalOn = on;
            show(!on);
            if (on) stopTour();
            else if (!paused && !fine) wait = gsap.delayedCall(0.6, step);
          },
          focus: (id) => {
            const s = spots.find((p) => p.id === id);
            if (!s || thermalOn) return;
            stopTour();
            show(true);
            tour = glide(s.x, s.y, 0.7);
            if (!fine && !paused) tour.then(() => alive && (wait = gsap.delayedCall(3, step)));
          },
        };

        return () => {
          alive = false;
          stopTour();
          gsap.ticker.remove(apply);
          cleanups.forEach((f) => f());
          lens.style.transform = "";
          inner.style.transform = "";
          lens.dataset.visible = "false";
          lens.dataset.locked = "false";
          engine.current = null;
        };
      });
    },
    { scope: root },
  );

  return engine;
}
