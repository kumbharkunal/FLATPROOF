/**
 * The ironbow palette used by handheld thermal cameras, cold (0) to hot (1).
 * One definition for the image pipeline (thermal twins), the lens scale ring and the OG image.
 */
export const IRONBOW_STOPS: ReadonlyArray<readonly [number, readonly [number, number, number]]> = [
  [0.0, [6, 0, 26]],
  [0.12, [36, 0, 102]],
  [0.25, [92, 0, 146]],
  [0.38, [152, 6, 146]],
  [0.5, [204, 34, 104]],
  [0.62, [236, 76, 38]],
  [0.75, [250, 136, 6]],
  [0.88, [255, 204, 44]],
  [1.0, [255, 250, 222]],
];

export function ironbowRgb(t: number): [number, number, number] {
  const x = Math.min(1, Math.max(0, t));
  let k = 0;
  while (k < IRONBOW_STOPS.length - 2 && x > IRONBOW_STOPS[k + 1][0]) k++;
  const [t0, c0] = IRONBOW_STOPS[k];
  const [t1, c1] = IRONBOW_STOPS[k + 1];
  const f = (x - t0) / (t1 - t0);
  return [0, 1, 2].map((j) => Math.round(c0[j] + (c1[j] - c0[j]) * f)) as [number, number, number];
}

export const ironbow = (t: number) => {
  const [r, g, b] = ironbowRgb(t);
  return `rgb(${r} ${g} ${b})`;
};

/** Polar helper: angle 0 points up, clockwise. */
export const polar = (cx: number, cy: number, r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};

/**
 * The scale arc as short SVG path segments (SVG has no conic gradient): `sweep` degrees,
 * centred on the bottom gap, cold at the start, hot at the end.
 */
export function scaleSegments(cx: number, cy: number, r: number, sweep = 270, count = 54) {
  const start = 180 + (360 - sweep) / 2; // gap centred at the bottom
  const step = sweep / count;
  return Array.from({ length: count }, (_, i) => {
    const a0 = start + i * step;
    const a1 = a0 + step + 0.6; // slight overlap hides seams
    const p0 = polar(cx, cy, r, a0);
    const p1 = polar(cx, cy, r, a1);
    return {
      d: `M${p0.x.toFixed(2)} ${p0.y.toFixed(2)}A${r} ${r} 0 0 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`,
      color: ironbow(i / (count - 1)),
    };
  });
}

export const scaleStart = (sweep = 270) => 180 + (360 - sweep) / 2;
