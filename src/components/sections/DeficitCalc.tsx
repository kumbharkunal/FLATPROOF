"use client";

import { useId, useState } from "react";
import { fill } from "@/lib/fill";

type Copy = { label: string; unit: string; placeholder: string; result: string; empty: string };

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

// What the missing carpet area is worth at the buyer's own agreement rate. No default rate,
// so the page never states a price of its own.
export function DeficitCalc({ deficit, copy }: { deficit: number; copy: Copy }) {
  const [rate, setRate] = useState("");
  const id = useId();
  const n = Number(rate);
  const value = n > 0 ? inr.format(Math.round(n * deficit)) : null;
  return (
    <div className="calc">
      <label htmlFor={id} className="calc-label">
        {copy.label} <span className="calc-unit">({copy.unit})</span>
      </label>
      <div className="calc-field">
        <span className="calc-prefix" aria-hidden="true">
          ₹
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder={copy.placeholder}
          value={rate}
          onChange={(e) => setRate(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
        />
      </div>
      <p className="calc-out num" aria-live="polite">
        {value ? fill(copy.result, { rupees: value }) : copy.empty}
      </p>
    </div>
  );
}
