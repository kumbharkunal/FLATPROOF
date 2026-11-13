import { site } from "@/content/site";
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
