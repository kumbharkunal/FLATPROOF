"use client";

import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { fill } from "@/lib/fill";
import { EASE } from "@/lib/motion";

type Category = { id: string; name: string; count: number; items: readonly { check: string; method: string }[] };

// Phones and tablets: one trade open at a time. Desktop shows all four as columns instead.
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
  const reduce = useReducedMotion();
  const base = useId();
  return (
    <LazyMotion features={domAnimation}>
      <div className="check-accordion">
        {categories.map((cat, i) => {
          const isOpen = open === cat.id;
          const panelId = `${base}-${cat.id}`;
          return (
            <div key={cat.id} className="acc-item" style={{ "--tone": tones[i] } as React.CSSProperties}>
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
              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    id={panelId}
                    key="panel"
                    className="acc-panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1, transition: { duration: reduce ? 0 : 0.42, ease: EASE.out } }}
                    exit={{ height: 0, opacity: 0, transition: { duration: reduce ? 0 : 0.27, ease: EASE.out } }}
                  >
                    <p className="sr-only">{fill(examplesLabel, { count: cat.count })}</p>
                    <ul className="check-list">
                      {cat.items.map((it) => (
                        <li key={it.check}>
                          <span className="check-name">{it.check}</span>
                          <span className="check-method">{it.method}</span>
                        </li>
                      ))}
                    </ul>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </LazyMotion>
  );
}
