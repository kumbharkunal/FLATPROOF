export type LensPoint = { x: number; y: number };

export type LensFinding = {
  id: "damp" | "socket" | "tile" | "sill";
  title: string;
  body: string;
  method: string;
  link: { label: string; href: string };
  /** Anomaly spread per image (Gaussian sigma, % of width and height). */
  thermal: { kind: "cold" | "warm"; strength: number; desktop: { rx: number; ry: number }; mobile: { rx: number; ry: number } };
  /** Hotspot for the desktop layout and the phone layout, in % of the image. */
  d: LensPoint;
  m: LensPoint;
  /** Revision-cloud radii for each layout, both in % of the image width. */
  cd: readonly [number, number];
  cm: readonly [number, number];
};

export type LensGrid = { cols: number; rows: number; data: string };

export type LensCopy = {
  hintPointer: string;
  hintTouch: string;
  hintMore: string;
  toggle: string;
  pause: string;
  play: string;
  scanning: string;
  found: string;
  complete: string;
  completeLink: { label: string; href: string };
  caption: string;
  stageLabel: string;
};
