import { DropIcon, RulerIcon, ThermometerHotIcon } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { ProcessMotion } from "./ProcessMotion";

const TOOL_ICONS = { thermal: ThermometerHotIcon, moisture: DropIcon, laser: RulerIcon } as const;

// The real sequence, numbered because it is one: visit, instruments, report in 24 hours.
export function Process() {
  const p = site.process;
  return (
    <section id="process" className="process section-y" data-nav="light" aria-labelledby="process-title">
      <div className="container-x">
        <h2 id="process-title" className="type-h2 section-title">
          {p.title}
        </h2>
        <div className="steps-wrap">
        <span className="steps-line" aria-hidden="true">
          <span className="steps-line-fill" />
        </span>
        <ol className="steps">
          {p.steps.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step-num type-figure" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="type-h3 step-title">{s.title}</h3>
              <p className="step-body">{s.body}</p>
              {s.image ? (
                <Photo slot={s.image as "tap-test" | "engineer-thermal"} sizes="(max-width: 1023px) 100vw, 400px" className="step-photo" />
              ) : (
                <a href={p.reportLink.href} className="mini-report">
                  <span className="mini-head">
                    <span>Snag report</span>
                    <span className="mini-count num">18</span>
                  </span>
                  <span className="mini-row" data-sev="critical" />
                  <span className="mini-row" data-sev="medium" />
                  <span className="mini-row" data-sev="audit" />
                  <span className="mini-link">{p.reportLink.label}</span>
                </a>
              )}
              {i === 1 && (
                <ul className="tools" aria-label="Instruments">
                  {p.tools.map((t) => {
                    const Icon = TOOL_ICONS[t.id as keyof typeof TOOL_ICONS];
                    return (
                      <li key={t.id} className="tool">
                        <Icon size={22} weight="light" aria-hidden="true" />
                        <span>
                          <span className="tool-name">{t.name}</span>
                          <span className="tool-use">{t.use}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
        </ol>
        </div>
        <p className="lineage">
          {p.lineage} <span className="lineage-claim">{site.claims.properties.value} so far.</span>
        </p>
      </div>
      <ProcessMotion />
    </section>
  );
}
