import Image from "next/image";

// The client's logo, cut from their own artwork by scripts/logo.mjs (never redrawn).
// With `both`, the light and reversed files both render and CSS shows the one that suits the
// ground (`.logo-on-light` / `.logo-on-dark`), so a theme change never waits on the network.
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
    quality: 85,
    loading: eager ? ("eager" as const) : ("lazy" as const),
  };
  if (both) {
    return (
      <span className="logo-swap" style={{ width, height }}>
        <Image src="/brand/logo.png" className="logo-on-light" alt="FlatProof Inspection Services" {...common} />
        <Image src="/brand/logo-reversed.png" className="logo-on-dark" alt="" aria-hidden="true" {...common} />
      </span>
    );
  }
  return (
    <Image
      src={dark ? "/brand/logo-reversed.png" : "/brand/logo.png"}
      alt="FlatProof Inspection Services"
      {...common}
    />
  );
}
