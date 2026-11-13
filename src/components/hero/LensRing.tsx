import { IRONBOW_STOPS, polar, scaleStart } from "@/lib/ironbow";

// The thermal camera's scale ring: a 270° ironbow arc (cold to hot, gap at the bottom) with ticks.
// The arc is one CSS conic gradient masked to a band (SVG has no conic gradient, and 48 coloured
// segments cost 48 DOM nodes); ticks and crosshair are three paths. All static, so it rasterises
// once and only ever moves by transform; the needle is a separate element rotated by the lens.
const S = 200; // drawing units; the SVG scales to the lens size
const C = S / 2;
const R = C - 5;
const SWEEP = 270;

const n2 = (v: number) => v.toFixed(2);
const ticks = (major: boolean) =>
  Array.from({ length: 19 }, (_, i) => i)
    .filter((i) => (i % 3 === 0) === major)
    .map((i) => {
      const a = scaleStart(SWEEP) + i * 15;
      const p0 = polar(C, C, R - 4.5, a);
      const p1 = polar(C, C, R - (major ? 12 : 9), a);
      return `M${n2(p0.x)} ${n2(p0.y)}L${n2(p1.x)} ${n2(p1.y)}`;
    })
    .join("");
const MAJOR = ticks(true);
const MINOR = ticks(false);
const CROSSHAIR = `M${C} ${C - 11}V${C - 4}M${C} ${C + 4}V${C + 11}M${C - 11} ${C}H${C - 4}M${C + 4} ${C}H${C + 11}`;

// Cold at the start of the sweep (bottom left), hot at the end (bottom right); same angle convention
// as `polar` (0° up, clockwise), which is also CSS's.
const SCALE = `conic-gradient(from ${scaleStart(SWEEP)}deg, ${IRONBOW_STOPS.map(([t, [r, g, b]]) => `rgb(${r} ${g} ${b}) ${(t * SWEEP).toFixed(1)}deg`).join(", ")}, transparent ${SWEEP}deg)`;

export function LensRing() {
  return (
    <>
      <svg className="lens-ring" viewBox={`0 0 ${S} ${S}`} aria-hidden="true" focusable="false">
        <circle cx={C} cy={C} r={R - 2.5} fill="none" stroke="rgb(14 23 38 / 0.55)" strokeWidth={5} />
        <circle cx={C} cy={C} r={R + 2.6} fill="none" stroke="rgb(255 255 255 / 0.55)" strokeWidth={0.7} />
        <path d={MAJOR} stroke="#ffffff" strokeOpacity={0.9} strokeWidth={1.2} />
        <path d={MINOR} stroke="#ffffff" strokeOpacity={0.55} strokeWidth={0.8} />
        <path d={CROSSHAIR} stroke="#ffffff" strokeOpacity={0.9} strokeWidth={1} strokeLinecap="round" fill="none" />
      </svg>
      <span className="lens-scale" style={{ background: SCALE }} aria-hidden="true" />
    </>
  );
}
