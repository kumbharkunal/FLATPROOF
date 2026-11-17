import type { ProcessedImage } from "@/content/images.generated";

// Photos are served as pre-built static files (scripts/images.mjs writes `${base}-${width}.avif`
// and `.webp`), never resized on request, so no visitor waits on a resize.

/** srcset strings for an image's AVIF and WebP files. */
export function srcSets(img: ProcessedImage) {
  const set = (ext: "avif" | "webp") => img.widths.map((w) => `${img.base}-${w}.${ext} ${w}w`).join(", ");
  return { avif: set("avif"), webp: set("webp") };
}

/** The `src` for browsers without srcset: the widest WebP up to 1280px. */
export function fallbackSrc(img: ProcessedImage) {
  const w = [...img.widths].reverse().find((x) => x <= 1280) ?? img.widths[0];
  return `${img.base}-${w}.webp`;
}

/** The AVIF file closest to a width, for preload hints. */
export function avifAt(img: ProcessedImage, width: number) {
  const w = img.widths.find((x) => x >= width) ?? img.widths[img.widths.length - 1];
  return `${img.base}-${w}.avif`;
}
