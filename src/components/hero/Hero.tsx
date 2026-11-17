import { ArrowClockwiseIcon } from "@phosphor-icons/react/ssr";
import { preload } from "react-dom";
import { images } from "@/content/images.generated";
import { site, type Side } from "@/content/site";
import { cloudEllipse } from "@/lib/cloud";
import { avifAt, fallbackSrc, srcSets } from "@/lib/img";
import { Button, WhatsAppButton } from "@/components/ui/Button";
import { HERO_STACKED, HERO_WIDE } from "./layout";
import { HeroScan } from "./HeroScan";

// Hero: the flat as it looks on handover day, and an inspection scan over it (FP-D69). A scan line
// crosses the photo; each defect it reaches gets a numbered marker and a revision cloud, its name
// shows for a moment, and the snag report beside the photo fills in. Everything here is server
// HTML and CSS; HeroScan only starts the scan (and replays it).
// Below 1024px (and on portrait screens) the stage is a 4:5 crop, full width on phones and capped
// at 560px on tablets; wide screens get the full-bleed 16:9 stage (see ./layout).
const MOBILE_SIZES = "(max-width: 639.98px) 100vw, 560px";

// The scan line crosses this share of each photo (on desktop, from where the copy's scrim fades out)
// in this many seconds, at a constant speed like a real scanner, so a finding's time is its distance.
const SWEEP = { desktop: { from: 44, to: 100, s: 2.4 }, mobile: { from: 0, to: 100, s: 2.6 } } as const;
const hit = (x: number, k: keyof typeof SWEEP) => +(((x - SWEEP[k].from) / (SWEEP[k].to - SWEEP[k].from)) * SWEEP[k].s).toFixed(2);

// A label's offset from its marker (CSS `translate`; percentages are the label's own size).
const TAG: Record<Side, string> = { left: "calc(-100% - 22px) -50%", right: "22px -50%", top: "-50% calc(-100% - 22px)" };

// Before first paint: with motion allowed, hold the findings back for the scan ("ready"); otherwise
// show everything ("done"). Without script the section has no state and shows everything.
const STATE = `document.currentScript.parentElement.dataset.scan=matchMedia("(prefers-reduced-motion: reduce)").matches?"done":"ready"`;

export function Hero() {
  const d = images["hero-desktop"];
  const m = images["hero-mobile"];
  const copy = site.hero;
  const scan = copy.scan;
  const findings = copy.findings.map((f) => ({ ...f, td: hit(f.at.desktop.x, "desktop"), tm: hit(f.at.mobile.x, "mobile") }));

  // When a screen narrower than 16:9 (or wider) crops the desktop photo, the crop slides just far
  // enough to keep every finding and its whole cloud in frame (the switchboard sits at 95% across),
  // instead of cutting from both sides. Read by `.cover` in globals.css.
  const vars = {
    "--keep-x": Math.min(1, Math.max(...findings.map((f) => (f.at.desktop.x + f.cloud.desktop[0]) / 100)) + 0.004).toFixed(3),
    "--keep-y": Math.min(1, Math.max(...findings.map((f) => (f.at.desktop.y + f.cloud.desktop[1] * (16 / 9)) / 100)) + 0.01).toFixed(3),
    "--sweep-from-d": `${SWEEP.desktop.from}%`,
    "--sweep-dist-d": `${SWEEP.desktop.to - SWEEP.desktop.from}%`,
    "--sweep-s-d": `${SWEEP.desktop.s}s`,
    "--sweep-from-m": `${SWEEP.mobile.from}%`,
    "--sweep-dist-m": `${SWEEP.mobile.to - SWEEP.mobile.from}%`,
    "--sweep-s-m": `${SWEEP.mobile.s}s`,
  } as React.CSSProperties;

  let photo: React.ReactNode = null;
  if (d && m) {
    const ds = srcSets(d);
    const ms = srcSets(m);
    // Media-scoped preloads so the right hero photo starts before CSS and JS (LCP).
    preload(avifAt(m, 828), { as: "image", type: "image/avif", imageSrcSet: ms.avif, imageSizes: MOBILE_SIZES, media: HERO_STACKED, fetchPriority: "high" });
    preload(avifAt(d, 1600), { as: "image", type: "image/avif", imageSrcSet: ds.avif, imageSizes: "100vw", media: HERO_WIDE, fetchPriority: "high" });
    photo = (
      <picture>
        <source media={HERO_WIDE} type="image/avif" srcSet={ds.avif} sizes="100vw" />
        <source media={HERO_WIDE} type="image/webp" srcSet={ds.webp} sizes="100vw" />
        <source type="image/avif" srcSet={ms.avif} sizes={MOBILE_SIZES} />
        {/* The LCP element: eager, high priority, preloaded above. */}
        <img
          src={fallbackSrc(m)}
          srcSet={ms.webp}
          sizes={MOBILE_SIZES}
          alt={site.images["hero-mobile"].alt}
          width={m.width}
          height={m.height}
          loading="eager"
          fetchPriority="high"
        />
      </picture>
    );
  }

  const words = copy.title.split(" ");
  const t = (f: (typeof findings)[number]) => ({ "--td": `${f.td}s`, "--tm": `${f.tm}s` });

  return (
    <section
      id="top"
      className="hero"
      data-nav="light"
      aria-labelledby="hero-title"
      style={vars}
      data-sweep-d={SWEEP.desktop.s}
      data-sweep-m={SWEEP.mobile.s}
      suppressHydrationWarning
    >
      <script dangerouslySetInnerHTML={{ __html: STATE }} />
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 id="hero-title" className="type-h1 hero-title">
            {words.map((w, i) => (
              <span key={i}>
                <span className="rise-word">
                  <span style={{ "--i": i } as React.CSSProperties}>{w}</span>
                </span>
                {i < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          <p className="type-lead hero-lead rise-fade">{copy.lead}</p>
          <div className="hero-ctas rise-fade" style={{ "--d": "380ms" } as React.CSSProperties}>
            <WhatsAppButton wa={copy.primary.wa}>{copy.primary.label}</WhatsAppButton>
            <Button href={copy.secondary.href} variant="secondary" className="hero-secondary">
              {copy.secondary.label}
            </Button>
          </div>
        </div>

        <div className="hero-stage">
          <div className="cover stage-base">{photo}</div>
          <div className="cover scan-box" aria-hidden="true">
            <span className="scan-beam" />
          </div>
          <div className="cover hero-overlay" aria-hidden="true">
            {(["d", "m"] as const).map((k) => {
              const W = k === "d" ? 1600 : 800;
              const H = k === "d" ? 900 : 1000;
              return (
                <svg key={k} className={`clouds clouds-${k}`} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" focusable="false">
                  {findings.map((f) => {
                    const p = k === "d" ? f.at.desktop : f.at.mobile;
                    // Cloud radii come with the finding, per photo (site.ts `cloud`), in % of the width.
                    const [rx, ry] = k === "d" ? f.cloud.desktop : f.cloud.mobile;
                    return (
                      <path
                        key={f.id}
                        d={cloudEllipse((p.x / 100) * W, (p.y / 100) * H, (rx / 100) * W, (ry / 100) * W, f.id === "sill" ? 17 : 11)}
                        pathLength={1}
                        style={t(f) as React.CSSProperties}
                      />
                    );
                  })}
                </svg>
              );
            })}
            {findings.map((f, i) => (
              <span
                key={f.id}
                className="marker"
                data-id={f.id}
                style={
                  {
                    "--xd": `${f.at.desktop.x}%`,
                    "--yd": `${f.at.desktop.y}%`,
                    "--xm": `${f.at.mobile.x}%`,
                    "--ym": `${f.at.mobile.y}%`,
                    "--tag-d": TAG[f.tag.desktop],
                    "--tag-m": TAG[f.tag.mobile],
                    ...t(f),
                  } as React.CSSProperties
                }
              >
                <span className="marker-dot">{i + 1}</span>
                <span className="marker-tag">{f.title}</span>
              </span>
            ))}
          </div>
          <p className="hero-caption" aria-hidden="true">
            {scan.caption}
          </p>
        </div>

        <div className="scan-card">
          <div className="scan-head">
            <p className="scan-title">{scan.title}</p>
            <p className="scan-count">
              <span className="scan-odo" aria-hidden="true">
                <span className="scan-digits">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </span>
              </span>
              <span aria-hidden="true">{scan.found}</span>
              <span className="sr-only">
                {findings.length} {scan.found}
              </span>
            </p>
            <button type="button" className="scan-replay">
              <ArrowClockwiseIcon size={16} weight="bold" aria-hidden="true" />
              <span>{scan.replay}</span>
            </button>
          </div>
          <span className="scan-progress" aria-hidden="true">
            <span />
          </span>
          <ol className="scan-list" aria-label={scan.listLabel}>
            {findings.map((f, i) => (
              <li key={f.id} className="scan-item" data-id={f.id} data-td={f.td} data-tm={f.tm} style={t(f) as React.CSSProperties}>
                <a href={f.link.href} className="scan-row">
                  <span className="scan-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="scan-text">
                    <span className="scan-row-title">{f.title}</span>
                    <span className="sr-only">. Found with: </span>
                    <span className="scan-row-method">{f.method}</span>
                    <span className="sr-only">. {f.link.label}.</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <a href={scan.more.href} className="scan-more">
            {scan.more.label}
          </a>
          <p className="scan-caption">{scan.caption}</p>
        </div>
      </div>
      <HeroScan />
    </section>
  );
}
