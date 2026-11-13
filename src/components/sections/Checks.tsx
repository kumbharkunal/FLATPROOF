import { site } from "@/content/site";
import { fill } from "@/lib/fill";
import { WhatsAppButton } from "@/components/ui/Button";
import { ChecksMotion } from "./ChecksMotion";
import { CheckAccordion } from "./CheckAccordion";

const TONES = ["var(--color-teal-light)", "var(--color-teal)", "var(--color-steel)", "#e3eaf0"];
const TICKS = Array.from({ length: 126 }, (_, i) => `M${i * 10} ${40 - (i % 25 === 0 ? 40 : i % 5 === 0 ? 22 : 11)}V40`).join("");

// The 125-point check: a measuring tape that fills to 125, split by trade, with the named checks
// and how each one is tested. Method over a points race (research A2).
export function Checks() {
  const c = site.checks;
  const digits = String(c.total).split("");
  return (
    <section id="checks" className="checks section-y" data-nav="dark" aria-labelledby="checks-title">
      <div className="container-x checks-pin">
        <div className="checks-head">
          <div>
            <h2 id="checks-title" className="type-h2 checks-title">
              {c.title}
            </h2>
            <p className="type-lead checks-intro">{c.intro}</p>
          </div>
          <div className="checks-count">
            <p className="odometer type-figure">
              <span className="sr-only">{`${c.total}+ ${c.unit}`}</span>
              {digits.map((d, i) => (
                <span key={i} className="odo-col" aria-hidden="true">
                  <span className="odo-strip" style={{ "--d": Number(d) } as React.CSSProperties}>
                    {Array.from({ length: 10 }, (_, k) => (
                      <span key={k}>{k}</span>
                    ))}
                  </span>
                </span>
              ))}
              <span className="odo-plus" aria-hidden="true">
                +
              </span>
            </p>
            <WhatsAppButton wa={c.cta.wa} variant="secondary-dark" className="checks-cta">
              {c.cta.label}
            </WhatsAppButton>
          </div>
        </div>

        <div className="tape" aria-hidden="true">
          <div className="tape-ticks">
            <svg viewBox="0 0 1250 40" preserveAspectRatio="none">
              {/* 126 ticks in one path (long every 25, medium every 5) */}
              <path d={TICKS} fill="none" vectorEffect="non-scaling-stroke" />
            </svg>
            {[0, 25, 50, 75, 100, 125].map((n) => (
              <span key={n} className="tape-num" style={{ left: `${(n / 125) * 100}%` }}>
                {n}
              </span>
            ))}
          </div>
          <div className="tape-bar">
            {c.categories.map((cat, i) => (
              <span key={cat.id} className="tape-seg" style={{ flexGrow: cat.count, background: TONES[i] }} />
            ))}
          </div>
        </div>

        <div className="check-cols">
          {c.categories.map((cat, i) => (
            <div key={cat.id} className="check-col" style={{ "--tone": TONES[i] } as React.CSSProperties}>
              <p className="check-col-head">
                <span className="check-col-count type-figure">{cat.count}</span>
                <span className="check-col-name">{cat.name}</span>
              </p>
              <p className="sr-only">{fill(c.examplesLabel, { count: cat.count })}</p>
              <ul className="check-list">
                {cat.items.map((it) => (
                  <li key={it.check}>
                    <span className="check-name">{it.check}</span>
                    <span className="check-method">{it.method}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <CheckAccordion categories={c.categories} tones={TONES} examplesLabel={c.examplesLabel} />
      </div>
      <ChecksMotion />
    </section>
  );
}
