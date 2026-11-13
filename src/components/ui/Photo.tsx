import Image from "next/image";
import { images } from "@/content/images.generated";
import { site, type ImageKey, type ImageSlot } from "@/content/site";

type Props = {
  slot: ImageKey;
  sizes: string;
  className?: string;
  /** Ground for the placeholder until the image exists. */
  tone?: "mist" | "ink";
  priority?: boolean;
};

// A slot image (from `npm run images`), or a designed placeholder until the file arrives:
// a soft gradient, light grain and viewfinder linework, so the layout never looks broken.
export function Photo({ slot, sizes, className = "", tone = "mist" }: Props) {
  const img = images[slot];
  const meta: ImageSlot = site.images[slot];
  if (img) {
    return (
      <div className={`photo ${className}`}>
        <Image
          src={img.src}
          alt={meta.alt}
          fill
          sizes={sizes}
          quality={75}
          placeholder="blur"
          blurDataURL={img.blur}
          style={{ objectFit: "cover", objectPosition: meta.focus }}
        />
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
