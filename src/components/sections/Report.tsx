import { site } from "@/content/site";
import { ironbow } from "@/lib/ironbow";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppButton } from "@/components/ui/Button";
import { ReportMotion } from "./ReportMotion";

// The product itself: an excerpt of the client's sample report, rendered as HTML so it stays sharp,
// accessible and translatable. Labelled as a sample throughout.
export function Report() {
  const r = site.report;
  const s = r.sheet;
  return (
    <section id="report" className="report section-y" data-nav="light" aria-labelledby="report-title">
      <div className="container-x report-grid">
        <div className="report-copy">
          <h2 id="report-title" className="type-h2 section-title">
            {r.title}
          </h2>
          <p className="type-lead section-sub">{r.sub}</p>
          <div className="report-ctas">
            <WhatsAppButton wa={r.primary.wa}>{r.primary.label}</WhatsAppButton>
            <WhatsAppButton wa={r.secondary.wa} variant="secondary">
              {r.secondary.label}
            </WhatsAppButton>
          </div>
        </div>

        <article className="sheet" aria-labelledby="sheet-title">
          <header className="sheet-head">
            <Logo height={30} />
            <p id="sheet-title" className="sheet-heading">
              {s.heading}
            </p>
            <span className="sheet-stamp">{s.label}</span>
          </header>
          <dl className="sheet-meta">
            {s.meta.map((m) => (
              <div key={m.term}>
                <dt>{m.term}</dt>
                <dd className="num">{m.value}</dd>
              </div>
            ))}
          </dl>
          <ol className="sheet-findings">
            {s.findings.map((f) => (
              <li key={f.title} className="finding" data-sev={f.severity}>
                <span className="finding-thumb" data-kind={f.thumb} aria-hidden="true">
                  {f.thumb === "thermal" && (
                    // A thermal frame of the skirting: warm wall, the cold damp patch rising from
                    // the skirting line, and the camera's reticle on it.
                    <svg viewBox="0 0 48 48">
                      <defs>
                        <linearGradient id="thumb-wall" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor={ironbow(0.74)} />
                          <stop offset="1" stopColor={ironbow(0.54)} />
                        </linearGradient>
                        <radialGradient id="thumb-cold">
                          <stop offset="0" stopColor={ironbow(0.04)} />
                          <stop offset="0.55" stopColor={ironbow(0.2)} stopOpacity="0.85" />
                          <stop offset="1" stopColor={ironbow(0.4)} stopOpacity="0" />
                        </radialGradient>
                      </defs>
                      <rect width="48" height="48" fill="url(#thumb-wall)" />
                      <rect y="36" width="48" height="12" fill={ironbow(0.34)} />
                      <ellipse cx="27" cy="31" rx="16" ry="12" fill="url(#thumb-cold)" />
                      <path d="M0 33h48M0 36h48" stroke="rgb(255 255 255 / 0.4)" strokeWidth="1" />
                      <path d="M27 24.5v4M27 33.5v4M20.5 31h4M29.5 31h4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  )}
                  {f.thumb === "socket" && (
                    <svg viewBox="0 0 48 48">
                      <rect x="6" y="6" width="36" height="36" rx="6" />
                      <circle cx="24" cy="24" r="12" />
                      <rect x="22.5" y="13.5" width="3" height="6" rx="1" />
                      <rect x="16.5" y="27" width="3" height="5" rx="1" />
                      <rect x="28.5" y="27" width="3" height="5" rx="1" />
                    </svg>
                  )}
                  {f.thumb === "plan" && (
                    <svg viewBox="0 0 48 48">
                      <path d="M6 8h36v32H6zM6 22h18v18M24 8v14h18" />
                      <path d="M6 45h36M6 43v4M42 43v4" />
                    </svg>
                  )}
                </span>
                <div className="finding-body">
                  <span className="sev-tag">{f.tag}</span>
                  <h3 className="finding-title">{f.title}</h3>
                  <p className="finding-text">{f.body}</p>
                  <p className="finding-fix">{f.fix}</p>
                </div>
              </li>
            ))}
          </ol>
          <footer className="sheet-foot">{s.footer}</footer>
        </article>
      </div>
      <ReportMotion />
    </section>
  );
}
