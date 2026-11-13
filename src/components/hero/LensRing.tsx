import { polar, scaleSegments, scaleStart } from "@/lib/ironbow";

// The thermal camera's scale ring: a 270° ironbow arc (cold to hot, gap at the bottom) with ticks.
// Static SVG, so it rasterises once and only ever moves by transform; the needle is a separate
// element rotated by the lens (composited).
const S = 200; // drawing units; the SVG scales to the lens size
const C = S / 2;
const R = C - 5;

const SEGMENTS = scaleSegments(C, C, R, 270, 48);
const TICKS = Array.from({ length: 19 }, (_, i) => {
  const a = scaleStart() + i * 15;
  const major = i % 3 === 0;
  const p0 = polar(C, C, R - 4.5, a);
  const p1 = polar(C, C, R - (major ? 12 : 9), a);
  return { p0, p1, major };
});

export function LensRing() {
  return (
    <svg className="lens-ring" viewBox={`0 0 ${S} ${S}`} aria-hidden="true" focusable="false">
      <circle cx={C} cy={C} r={R - 2.5} fill="none" stroke="rgb(14 23 38 / 0.55)" strokeWidth={5} />
      <circle cx={C} cy={C} r={R + 2.6} fill="none" stroke="rgb(255 255 255 / 0.55)" strokeWidth={0.7} />
      {SEGMENTS.map((s, i) => (
        <path key={i} d={s.d} stroke={s.color} strokeWidth={4} fill="none" strokeLinecap="butt" />
      ))}
      {TICKS.map((t, i) => (
        <line
          key={i}
          x1={t.p0.x}
          y1={t.p0.y}
          x2={t.p1.x}
          y2={t.p1.y}
          stroke="#ffffff"
          strokeOpacity={t.major ? 0.9 : 0.55}
          strokeWidth={t.major ? 1.2 : 0.8}
        />
      ))}
      {/* Crosshair */}
      <g stroke="#ffffff" strokeOpacity={0.9} strokeWidth={1} strokeLinecap="round">
        <line x1={C} y1={C - 11} x2={C} y2={C - 4} />
        <line x1={C} y1={C + 4} x2={C} y2={C + 11} />
        <line x1={C - 11} y1={C} x2={C - 4} y2={C} />
        <line x1={C + 4} y1={C} x2={C + 11} y2={C} />
      </g>
    </svg>
  );
}
