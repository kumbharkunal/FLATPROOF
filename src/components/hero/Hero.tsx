import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { images } from "@/content/images.generated";
import { site } from "@/content/site";
import { Button, WhatsAppButton } from "@/components/ui/Button";
import { HERO_STACKED, HERO_WIDE } from "./layout";
import { RoomLinework, RoomLineworkRef } from "./RoomLinework";
import { ThermalLens } from "./ThermalLens";
import type { LensFinding } from "./types";

// Hero: the flat as it looks on handover day, and a thermal camera that shows what the paint hides.
// Photos come from `npm run images`; until both hero photos exist, an architectural line drawing of
// the same room stands in so the lens still works.
// Below 1024px (and on portrait screens) the stage is a 4:5 crop, full width on phones and capped
// at 560px on tablets; wide screens get the full-bleed 16:9 stage (see ./layout).
const MOBILE_SIZES = "(max-width: 639.98px) 100vw, 560px";

export function Hero() {
  const d = images["hero-desktop"];
  const m = images["hero-mobile"];
  const photo = Boolean(d?.thermal && m?.thermal);
  const copy = site.hero;

  const findings: LensFinding[] = copy.findings.map((f) => ({
    id: f.id,
    title: f.title,
    body: f.body,
    method: f.method,
    link: f.link,
    thermal: f.thermal,
    d: photo ? f.at.desktop : f.at.lineworkDesktop,
    m: photo ? f.at.mobile : f.at.lineworkMobile,
  }));

  let base: React.ReactNode;
  let full: React.ReactNode;
  let lens: React.ReactNode;
  let grids = {};

  if (photo && d?.thermal && m?.thermal) {
    const alt = site.images["hero-desktop"].alt;
    const common = { quality: 75 } as const;
    const { props: dp } = getImageProps({ ...common, sizes: "100vw", src: d.src, width: d.width, height: d.height, alt });
    const { props: mp } = getImageProps({ ...common, sizes: MOBILE_SIZES, src: m.src, width: m.width, height: m.height, alt: site.images["hero-mobile"].alt });
    // Media-scoped preloads so the right hero image starts before CSS and JS (LCP).
    preload(mp.src, { as: "image", imageSrcSet: mp.srcSet, imageSizes: MOBILE_SIZES, media: HERO_STACKED, fetchPriority: "high" });
    preload(dp.src, { as: "image", imageSrcSet: dp.srcSet, imageSizes: "100vw", media: HERO_WIDE, fetchPriority: "high" });
    base = (
      <picture>
        <source media={HERO_WIDE} srcSet={dp.srcSet} sizes="100vw" />
        <img {...mp} alt={mp.alt} fetchPriority="high" decoding="async" />
      </picture>
    );
    const t = { quality: 70, alt: "" } as const;
    const { props: dt } = getImageProps({ ...t, sizes: "100vw", src: d.thermal.src, width: d.thermal.width, height: d.thermal.height });
    const { props: mt } = getImageProps({ ...t, sizes: MOBILE_SIZES, src: m.thermal.src, width: m.thermal.width, height: m.thermal.height });
    const thermalPicture = (
      <picture>
        <source media={HERO_WIDE} srcSet={dt.srcSet} sizes="100vw" />
        <img {...mt} alt="" fetchPriority="low" decoding="async" />
      </picture>
    );
    full = thermalPicture;
    lens = thermalPicture;
    grids = { desktop: d.thermal.grid, mobile: m.thermal.grid };
  } else {
    base = (
      <>
        <RoomLinework layout="desktop" className="only-d" idPrefix="base-d" />
        <RoomLinework layout="mobile" className="only-m" idPrefix="base-m" />
      </>
    );
    full = (
      <>
        <RoomLinework layout="desktop" variant="thermal" className="only-d" idPrefix="full-d" artId="thermal-art-d" />
        <RoomLinework layout="mobile" variant="thermal" className="only-m" idPrefix="full-m" artId="thermal-art-m" />
      </>
    );
    // The lens shows the same thermal drawing by reference (<use>), not a second copy.
    lens = (
      <>
        <RoomLineworkRef layout="desktop" href="thermal-art-d" className="only-d" />
        <RoomLineworkRef layout="mobile" href="thermal-art-m" className="only-m" />
      </>
    );
  }

  const words = copy.title.split(" ");

  const intro = (
    <div className="hero-copy" data-lens-off>
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
  );

  return (
    <section id="top" className="hero" data-nav="light" aria-labelledby="hero-title" data-photo={photo ? "true" : "false"}>
      <ThermalLens findings={findings} grids={grids} copy={copy.lens} intro={intro} base={base} full={full} lens={lens} />

      <div className="sr-only">
        <p>{copy.lens.stageLabel}</p>
        <ul aria-label={copy.lens.srIntro}>
          {copy.findings.map((f) => (
            <li key={f.id}>
              {f.title}. {f.body} Found with: {f.method}.
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
