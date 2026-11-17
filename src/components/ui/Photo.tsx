import { images } from "@/content/images.generated";
import { site, type ImageKey, type ImageSlot } from "@/content/site";
import { fallbackSrc, srcSets } from "@/lib/img";

type Props = {
  slot: ImageKey;
  sizes: string;
  className?: string;
  /** Ground for the placeholder until the image exists. */
  tone?: "mist" | "ink";
};

// A slot image as static AVIF/WebP files (from `npm run images`), or a designed placeholder until the
// file arrives: a soft gradient, light grain and viewfinder linework, so the layout never looks broken.
// Lazy, with a blurred copy behind it; ImageWarmup fetches the rest of the page's photos once the
// page has loaded, so they are ready before you scroll to them.
export function Photo({ slot, sizes, className = "", tone = "mist" }: Props) {
  const img = images[slot];
  const meta: ImageSlot = site.images[slot];
  if (img) {
    const set = srcSets(img);
    return (
      <div className={`photo ${className}`}>
        <picture>
          <source type="image/avif" srcSet={set.avif} sizes={sizes} />
          <img
            src={fallbackSrc(img)}
            srcSet={set.webp}
            sizes={sizes}
            alt={meta.alt}
            width={img.width}
            height={img.height}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: meta.focus, backgroundImage: `url("${img.blur}")` }}
          />
        </picture>
      </div>
    );
  }
  return (
    <div className={`photo placeholder placeholder-${tone} ${className}`} role="img" aria-label={meta.alt}>
      <svg className="placeholder-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M6 18V6h12M82 6h12v12M94 82v12H82M18 94H6V82" vectorEffect="non-scaling-stroke" />
        <path d="M50 44v12M44 50h12" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
