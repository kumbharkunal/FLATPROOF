import { images } from "@/content/images.generated";
import { site, type ImageKey } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { WhatsAppButton } from "@/components/ui/Button";
import { ServicesHover } from "./ServicesHover";

// An editorial index, not a card grid (research A4: Shed's index). Every row opens WhatsApp with
// that service's message. The construction row credits VP Constructions.
export function Services() {
  const s = site.services;
  return (
    <section id="services" className="services section-y" data-nav="light" aria-labelledby="services-title">
      <div className="container-x">
        <div className="section-head">
          <h2 id="services-title" className="type-h2 section-title">
            {s.title}
          </h2>
          <p className="type-lead section-sub">{s.sub}</p>
        </div>
        <div className="svc-grid">
          <ul className="svc-index">
            {s.items.map((it, i) => (
              <li key={it.id} className="svc-row" data-id={it.id} data-active={i === 0 ? "true" : "false"}>
                <div className="svc-main">
                  <h3 className="svc-name">{it.name}</h3>
                  {"byline" in it && it.byline ? <p className="svc-by">{it.byline}</p> : null}
                  <p className="svc-sum">{it.summary}</p>
                </div>
                <WhatsAppButton wa={it.wa} variant="secondary" className="svc-cta">
                  {s.action}
                  <span className="sr-only">: {it.name}</span>
                </WhatsAppButton>
              </li>
            ))}
          </ul>
          <div className="svc-preview" aria-hidden="true">
            {s.items.map((it, i) => (
              <div key={it.id} className="svc-frame" data-id={it.id} data-active={i === 0 ? "true" : "false"}>
                {/* Until its photo arrives (IMAGE_PROMPTS.md), a row keeps a line drawing of its work. */}
                {it.image && images[it.image] ? (
                  <Photo slot={it.image as ImageKey} sizes="(min-width: 1024px) 34vw, 0px" />
                ) : (
                  <div className="photo placeholder placeholder-mist">
                    <svg className="frame-lines" viewBox="0 0 200 200" aria-hidden="true">
                      <path d="M30 175V60M80 175V40M130 175V40M180 175V60M30 60L80 40H130L180 60M30 100H180M30 140H180M80 40V175M130 40V175" />
                      <path d="M20 175H190" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <ServicesHover />
    </section>
  );
}
