"use client";

import { fill } from "@/lib/fill";
import type { LensCopy, LensFinding } from "./types";

type Props = {
  copy: LensCopy;
  findings: LensFinding[];
  found: string[];
  current: string | null;
  touch: boolean;
  mode: "off" | "lens" | "static";
  thermal: boolean;
  paused: boolean;
  onThermal: () => void;
  onPause: () => void;
};

// The instrument readout: what the camera has found so far, the Thermal view switch, the pause
// control for the touch tour, and the selected finding's details.
export function LensPanel({ copy, findings, found, current, touch, mode, thermal, paused, onThermal, onPause }: Props) {
  const total = findings.length;
  const f = findings.find((x) => x.id === current);
  const complete = found.length === total;
  return (
    <div className="hero-panel" data-lens-off>
      <div className="panel-head">
        <div className="tally">
          <span aria-live="polite">{fill(copy.found, { n: found.length, total })}</span>
          {complete && mode !== "off" ? (
            <a href={copy.completeLink.href} className="panel-link tally-link" title={copy.complete}>
              {copy.completeLink.label}
            </a>
          ) : (
            <span className="tally-ticks" aria-hidden="true">
              {findings.map((x) => (
                <i key={x.id} data-on={found.includes(x.id) ? "true" : "false"} />
              ))}
            </span>
          )}
        </div>
        <div className="panel-controls">
          {touch && mode === "lens" && !thermal && (
            <button type="button" className="panel-btn" aria-pressed={paused} onClick={onPause}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                {paused ? <path d="M4 2.5v11l9-5.5z" fill="currentColor" /> : <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor" />}
              </svg>
              <span>{paused ? copy.play : copy.pause}</span>
            </button>
          )}
          <button type="button" role="switch" aria-checked={thermal} className="switch" onClick={onThermal}>
            <span className="switch-track" aria-hidden="true">
              <span className="switch-thumb" />
            </span>
            <span>{copy.toggle}</span>
          </button>
        </div>
      </div>

      <div className="panel-body">
        {f ? (
          <div key={f.id} className="panel-finding">
            <p className="panel-title">{f.title}</p>
            <p className="panel-text">{f.body}</p>
            <p className="panel-method">
              <span className="sr-only">How it is found: </span>
              {f.method}
            </p>
            <a href={f.link.href} className="panel-link">
              {f.link.label}
            </a>
          </div>
        ) : (
          <div className="panel-hint">
            <p>{touch ? copy.hintTouch : copy.hintPointer}</p>
            <p className="panel-hint-more">{copy.hintMore}</p>
          </div>
        )}
      </div>
      <p className="panel-caption">{copy.caption}</p>
    </div>
  );
}
