import { site } from "@/content/site";
import { cloudRect } from "@/lib/cloud";
import { Photo } from "@/components/ui/Photo";
import { InstagramIcon } from "@/components/brand-icons/instagram";
import { CaseMotion } from "./CaseMotion";

const VW = 1200;
const VH = 900;

// Real evidence from a real visit: the client's own window-sill photo, marked up like a drawing.
export function CaseFile() {
  const k = site.caseFile;
  return (
    <section id="case" className="case section-y" data-nav="dark" aria-labelledby="case-title">
      <div className="container-x case-grid">
        <figure className="case-figure">
          <div className="case-photo">
            <Photo slot="case-window-sill" sizes="(max-width: 1023px) 100vw, 56vw" tone="ink" className="case-img" />
            <svg className="case-clouds" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="none" aria-hidden="true">
              {k.notes.map((n) => {
                const x = (n.box.x / 100) * VW;
                const y = (n.box.y / 100) * VH;
                const w = (n.box.w / 100) * VW;
                const h = (n.box.h / 100) * VH;
                return <path key={n.key} d={cloudRect(x, y, w, h, 34)} pathLength={1} data-key={n.key} />;
              })}
            </svg>
            {k.notes.map((n) => (
              <span key={n.key} className="case-key" style={{ left: `${n.box.x}%`, top: `${n.box.y}%` }} aria-hidden="true">
                {n.key}
              </span>
            ))}
          </div>
          <figcaption className="sr-only">{k.photoAlt}</figcaption>
        </figure>

        <div className="case-copy">
          <h2 id="case-title" className="type-h2 case-title">
            {k.title}
          </h2>
          <p className="case-body">{k.body}</p>
          <ol className="case-notes">
            {k.notes.map((n) => (
              <li key={n.key} className="case-note" data-key={n.key}>
                <span className="case-key static" aria-hidden="true">
                  {n.key}
                </span>
                <span>
                  <span className="case-note-label">{n.label}</span>
                  <span className="case-note-text">{n.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <a href={site.contact.instagram.href} className="btn btn-secondary-dark case-ig" target="_blank" rel="noopener noreferrer">
            <InstagramIcon className="size-5" idPrefix="ig-case" />
            <span>{k.instagram.label}</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
      <CaseMotion />
    </section>
  );
}
