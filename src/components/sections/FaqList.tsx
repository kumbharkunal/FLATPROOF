"use client";

import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { EASE } from "@/lib/motion";

// Disclosure list: one answer open at a time; height and opacity only.
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const base = useId();
  return (
    <LazyMotion features={domAnimation}>
      <div className="faq-list">
        {items.map((it, i) => {
          const isOpen = open === i;
          const panel = `${base}-a${i}`;
          return (
            <div key={it.q} className="faq-item" data-open={isOpen ? "true" : "false"}>
              <h3>
                <button type="button" className="faq-q" aria-expanded={isOpen} aria-controls={panel} onClick={() => setOpen(isOpen ? null : i)}>
                  <span>{it.q}</span>
                  <span className="acc-icon" aria-hidden="true" data-open={isOpen ? "true" : "false"} />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    id={panel}
                    key="a"
                    className="faq-a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1, transition: { duration: reduce ? 0 : 0.42, ease: EASE.out } }}
                    exit={{ height: 0, opacity: 0, transition: { duration: reduce ? 0 : 0.27, ease: EASE.out } }}
                  >
                    <p>{it.a}</p>
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
