"use client";

import { useId, useState } from "react";

// Disclosure list: one answer open at a time. CSS height transition; closed answers are inert.
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
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
            <div id={panel} className="disclose" inert={!isOpen}>
              <div className="disclose-inner faq-a">
                <p>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
