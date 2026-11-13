"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cloudEllipse } from "@/lib/cloud";
import { LensRing } from "./LensRing";
import { LensPanel } from "./LensPanel";
import { useLensEngine } from "./useLensEngine";
import type { LensCopy, LensFinding, LensGrid } from "./types";

// Cloud radii per finding, in % of the image width: [rx, ry] for desktop (d) and phone (m) crops.
const CLOUD: Record<LensFinding["id"], { d: [number, number]; m: [number, number] }> = {
  damp: { d: [7.5, 3.8], m: [14, 6.5] },
  socket: { d: [3.7, 2.4], m: [6, 5] },
  tile: { d: [5.2, 2.5], m: [15, 4.6] },
  sill: { d: [12.6, 2], m: [28, 3.6] },
};

type Props = {
  findings: LensFinding[];
  grids: { desktop?: LensGrid; mobile?: LensGrid };
  copy: LensCopy;
  /** Server-rendered headline block, placed first so it reads first. */
  intro: ReactNode;
  /** Server-rendered layers: the daylight image, the full thermal layer and the lens's copy of it. */
  base: ReactNode;
  full: ReactNode;
  lens: ReactNode;
};

export function ThermalLens({ findings, grids, copy, intro, base, full, lens }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"off" | "lens" | "static">("off");
  const [touch, setTouch] = useState(false);
  const [found, setFound] = useState<string[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [chip, setChip] = useState<string | null>(null);
  const [thermal, setThermal] = useState(false);
  const [paused, setPaused] = useState(false);

  const onMode = useCallback(
    (m: "lens" | "static", isTouch: boolean) => {
      setMode(m);
      setTouch(isTouch);
      if (m === "static") {
        setFound(findings.map((f) => f.id));
        setCurrent((c) => c ?? findings[0].id);
      }
    },
    [findings],
  );
  const onLock = useCallback((id: string | null) => {
    setChip(id);
    if (!id) return;
    setCurrent(id);
    setFound((f) => (f.includes(id) ? f : [...f, id]));
  }, []);

  const engine = useLensEngine(root, findings, grids, { onMode, onLock });

  useEffect(() => engine.current?.setPaused(paused), [paused, engine]);
  useEffect(() => engine.current?.setThermal(thermal), [thermal, engine]);

  const toggleThermal = () => {
    const next = !thermal;
    setThermal(next);
    if (next) setFound(findings.map((f) => f.id));
  };

  const select = (id: string) => {
    setCurrent(id);
    engine.current?.focus(id);
  };

  // While the chip fades out after a lock, it keeps naming the last finding.
  const chipFinding = findings.find((f) => f.id === (chip ?? current));
  const showAll = thermal || mode === "static";

  return (
    <div
      ref={root}
      className="hero-lens"
      data-mode={mode}
      data-touch={touch ? "true" : "false"}
      data-thermal={thermal ? "on" : "off"}
    >
      {intro}
      {/* The panel comes before the stage in the DOM so keyboard focus runs: switch on Thermal
          view, then straight into the four findings. On stacked layouts CSS `order` still shows
          the stage first. */}
      <LensPanel
        copy={copy}
        findings={findings}
        found={found}
        current={current}
        touch={touch}
        mode={mode}
        thermal={thermal}
        paused={paused}
        onThermal={toggleThermal}
        onPause={() => setPaused((v) => !v)}
      />
      <div className="hero-stage" data-cursor-hide>
        <div className="cover stage-base">{base}</div>
        <div className="stage-thermal" aria-hidden="true">
          <div className="cover">{full}</div>
        </div>

        <div className="cover hero-overlay">
          {(["d", "m"] as const).map((k) => {
            const W = k === "d" ? 1600 : 800;
            const H = k === "d" ? 900 : 1000;
            return (
              <svg
                key={k}
                className={`clouds clouds-${k}`}
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                {findings.map((f) => {
                  const p = f[k];
                  const [rx, ry] = CLOUD[f.id][k];
                  return (
                    <path
                      key={f.id}
                      d={cloudEllipse((p.x / 100) * W, (p.y / 100) * H, (rx / 100) * W, (ry / 100) * W, f.id === "sill" ? 17 : 11)}
                      pathLength={1}
                      data-found={showAll || found.includes(f.id) ? "true" : "false"}
                    />
                  );
                })}
              </svg>
            );
          })}
          {findings.map((f, i) => {
            const shown = showAll || found.includes(f.id);
            return (
              <button
                key={f.id}
                type="button"
                className="marker"
                data-shown={shown ? "true" : "false"}
                aria-pressed={current === f.id}
                tabIndex={shown ? 0 : -1}
                aria-hidden={shown ? undefined : true}
                style={{ "--xd": `${f.d.x}%`, "--yd": `${f.d.y}%`, "--xm": `${f.m.x}%`, "--ym": `${f.m.y}%` } as CSSProperties}
                onClick={() => select(f.id)}
                onFocus={() => select(f.id)}
              >
                <span aria-hidden="true">{i + 1}</span>
                <span className="sr-only">{f.title}</span>
              </button>
            );
          })}
        </div>

        <div className="lens" data-visible="false" data-locked="false" aria-hidden="true">
          <div className="lens-glass">
            <div className="lens-inner">
              <div className="cover">{lens}</div>
            </div>
          </div>
          <LensRing />
          <span className="lens-needle" />
          <span className="lens-chip">{chipFinding ? chipFinding.title : copy.scanning}</span>
        </div>
        <p className="hero-caption" aria-hidden="true">
          {copy.caption}
        </p>
      </div>
    </div>
  );
}
