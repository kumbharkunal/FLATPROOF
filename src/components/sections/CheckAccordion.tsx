"use client";

import { useId, useState } from "react";
import { fill } from "@/lib/fill";

type Category = { id: string; name: string; count: number; items: readonly { check: string; method: string }[] };

// Phones and tablets: one trade open at a time. Desktop shows all four as columns instead.
// CSS disclosure (grid-template-rows 0fr to 1fr); closed panels are inert (FP-D44).
export function CheckAccordion({
  categories,
  tones,
  examplesLabel,
}: {
  categories: readonly Category[];
  tones: string[];
  examplesLabel: string;
}) {
  const [open, setOpen] = useState<string | null>(categories[0]?.id ?? null);
  const base = useId();
  return (
    <div className="check-accordion">
      {categories.map((cat, i) => {
        const isOpen = open === cat.id;
        const panelId = `${base}-${cat.id}`;
        return (
          <div key={cat.id} className="acc-item" data-open={isOpen ? "true" : "false"} style={{ "--tone": tones[i] } as React.CSSProperties}>
            <h3>
              <button
                type="button"
                className="acc-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : cat.id)}
              >
                <span className="check-col-count type-figure">{cat.count}</span>
                <span className="acc-name">{cat.name}</span>
                <span className="acc-icon" aria-hidden="true" data-open={isOpen ? "true" : "false"} />
              </button>
            </h3>
            <div id={panelId} className="disclose" inert={!isOpen}>
              <div className="disclose-inner">
                <p className="sr-only">{fill(examplesLabel, { count: cat.count })}</p>
                <ul className="check-list">
                  {cat.items.map((it) => (
                    <li key={it.check}>
                      <span className="check-name">{it.check}</span>
                      <span className="check-method">{it.method}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
