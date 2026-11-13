/* eslint-disable @next/next/no-img-element -- pre-sized static brand files with srcset; going through the
   image optimiser made the logo wait one to two seconds after every deploy (FP-D57). */

// The client's logo, cut from their own artwork by scripts/logo.mjs (never redrawn), served as
// static WebP files: 192px wide for 1x and 2x screens, 320px for 3x.
// With `both`, the light and reversed files both render and CSS shows the one that suits the
// ground (`.logo-on-light` / `.logo-on-dark`), so a theme change never waits on the network.
const files = (name: "logo" | "logo-reversed") => ({
  src: `/brand/${name}-192.webp`,
  srcSet: `/brand/${name}-192.webp 192w, /brand/${name}-320.webp 320w`,
});

export function Logo({
  height = 38,
  both = false,
  dark = false,
  eager = false,
}: {
  height?: number;
  both?: boolean;
  dark?: boolean;
  eager?: boolean;
}) {
  const width = Math.round((height * 968) / 420);
  const common = {
    width,
    height,
    sizes: `${width}px`,
    loading: eager ? ("eager" as const) : ("lazy" as const),
    decoding: "async" as const,
  };
  if (both) {
    return (
      <span className="logo-swap" style={{ width, height }}>
        <img {...files("logo")} className="logo-on-light" alt="FlatProof Inspection Services" {...common} />
        <img {...files("logo-reversed")} className="logo-on-dark" alt="" aria-hidden="true" {...common} />
      </span>
    );
  }
  return <img {...files(dark ? "logo-reversed" : "logo")} alt="FlatProof Inspection Services" {...common} />;
}
