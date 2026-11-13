export type LensPoint = { x: number; y: number };

export type LensFinding = {
  id: "damp" | "socket" | "tile" | "sill";
  title: string;
  body: string;
  method: string;
  link: { label: string; href: string };
  thermal: { kind: "cold" | "warm"; strength: number; rx: number; ry: number };
  /** Hotspot for the desktop layout and the phone layout, in % of the image. */
  d: LensPoint;
  m: LensPoint;
};

export type LensGrid = { cols: number; rows: number; data: string };

export type LensCopy = {
  hintPointer: string;
  hintTouch: string;
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
