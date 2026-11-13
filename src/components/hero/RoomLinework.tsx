import { ironbow } from "@/lib/ironbow";

// The hero room as an architectural line drawing, shown until the AI photos arrive.
// Same elements as the photo prompts (IMAGE_PROMPTS.md): calm left wall for the headline,
// sliding window over a black granite sill, a switchboard, skirting, tiled floor.
// `thermal` renders the same geometry as a thermal image for the lens and the Thermal view.

type V2 = readonly [number, number];
const lerp = (a: V2, b: V2, t: number): V2 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

type Geo = {
  W: number;
  H: number;
  back: { x1: number; x2: number; y1: number; y2: number };
  vp: V2;
  win: { x1: number; x2: number; y1: number; y2: number };
  sillOver: number;
  /** Switchboard plate: frontal on the back wall (drawing units) or on the right wall (u, v). */
  plate: { wall: "back"; x: number; y: number; w: number; h: number } | { wall: "right"; u0: number; u1: number; v0: number; v1: number };
  rows: number[];
  cols: number;
  /** Thermal anomaly centres and radii, in drawing units. */
  damp: { cx: number; cy: number; rx: number; ry: number };
  socketRx: number;
  tile: { cx: number; cy: number; rx: number; ry: number };
};

// Desktop: the back wall starts right of the headline column (49.5% across) and every finding
// sits between 61% and 78% across, so all four stay in frame on screens as narrow as 5:4.
const DESKTOP: Geo = {
  W: 1600,
  H: 900,
  back: { x1: 792, x2: 1312, y1: 95, y2: 655 },
  vp: [1052, 375],
  win: { x1: 832, x2: 1120, y1: 165, y2: 395 },
  sillOver: 18,
  plate: { wall: "back", x: 1180, y: 472, w: 86, h: 46 },
  rows: [692, 741, 808, 900],
  cols: 6,
  damp: { cx: 1110, cy: 622, rx: 110, ry: 58 },
  socketRx: 24,
  tile: { cx: 1237, cy: 773, rx: 78, ry: 28 },
};

const MOBILE: Geo = {
  W: 800,
  H: 1000,
  back: { x1: 160, x2: 640, y1: 120, y2: 760 },
  vp: [400, 440],
  win: { x1: 215, x2: 585, y1: 165, y2: 296 },
  sillOver: 16,
  plate: { wall: "right", u0: 0.27, u1: 0.43, v0: 0.585, v1: 0.655 },
  rows: [790, 835, 905, 1000],
  cols: 6,
  damp: { cx: 548, cy: 728, rx: 96, ry: 52 },
  socketRx: 20,
  tile: { cx: 400, cy: 905, rx: 110, ry: 34 },
};

function build(g: Geo) {
  const { W, H, back } = g;
  const BL: V2 = [back.x1, back.y2];
  const BR: V2 = [back.x2, back.y2];
  const TL: V2 = [back.x1, back.y1];
  const TR: V2 = [back.x2, back.y1];
  // Right wall: u = 0 at the back corner, 1 at the frame edge; v = 0 ceiling, 1 floor.
  const rTop = (u: number) => lerp(TR, [W, 0], u);
  const rBot = (u: number) => lerp(BR, [W, H], u);
  const R = (u: number, v: number) => lerp(rTop(u), rBot(u), v);
  const lTop = (u: number) => lerp(TL, [0, 0], u);
  const lBot = (u: number) => lerp(BL, [0, H], u);
  const L = (u: number, v: number) => lerp(lTop(u), lBot(u), v);
  const gp = g.plate;
  const plate: readonly [V2, V2, V2, V2] =
    gp.wall === "right"
      ? [R(gp.u0, gp.v0), R(gp.u1, gp.v0), R(gp.u1, gp.v1), R(gp.u0, gp.v1)]
      : [
          [gp.x, gp.y],
          [gp.x + gp.w, gp.y],
          [gp.x + gp.w, gp.y + gp.h],
          [gp.x, gp.y + gp.h],
        ];
  // A point on the plate, u across and v down (bilinear, so it follows the wall's perspective).
  const P = (u: number, v: number) => lerp(lerp(plate[0], plate[1], u), lerp(plate[3], plate[2], u), v);
  const plateC = P(0.5, 0.5);
  // Floor: depth lines from the back floor line toward the viewer.
  const toFront = (p: V2): V2 => {
    const t = (H - g.vp[1]) / (p[1] - g.vp[1]);
    return [g.vp[0] + (p[0] - g.vp[0]) * t, H];
  };
  const depth = Array.from({ length: g.cols + 1 }, (_, k) => {
    const p: V2 = [back.x1 + ((back.x2 - back.x1) * k) / g.cols, back.y2];
    return [p, toFront(p)] as const;
  });
  // Floor rows: across the floor between the two floor edges at height y.
  const floorEdgeL = (y: number): V2 => lerp(BL, [0, H], (y - back.y2) / (H - back.y2));
  const floorEdgeR = (y: number): V2 => lerp(BR, [W, H], (y - back.y2) / (H - back.y2));
  const rows = g.rows.map((y) => [floorEdgeL(y), floorEdgeR(y)] as const);
  const sk = 0.032; // skirting height as a share of wall height
  return { BL, BR, TL, TR, R, L, plate, P, plateC, depth, rows, sk };
}

const PAPER = {
  plane: { left: "#f7f9fa", back: "#fbfcfc", right: "#f1f5f7", ceiling: "#fdfefe", floor: "#eef3f5" },
  line: "#29374d",
  faint: "#9fb0c0",
  glass: "#e6f1f6",
  sill: "#1c2533",
};

// Path helpers: one <path> per stroke style keeps the drawing to a few dozen nodes (DOM size and
// the hydration payload both scale with node count). Coordinates are rounded to 0.1 units.
const n1 = (v: number) => String(Math.round(v * 10) / 10);
const at = (p: V2) => `${n1(p[0])} ${n1(p[1])}`;
const seg = (a: V2, z: V2) => `M${at(a)}L${at(z)}`;
const closed = (...p: V2[]) => p.map((q, i) => `${i ? "L" : "M"}${at(q)}`).join("") + "Z";
const box = (x: number, y: number, w: number, h: number) => closed([x, y], [x + w, y], [x + w, y + h], [x, y + h]);
const oval = (c: V2, rx: number, ry: number) =>
  `M${at([c[0] - rx, c[1]])}a${n1(rx)} ${n1(ry)} 0 1 0 ${n1(rx * 2)} 0a${n1(rx)} ${n1(ry)} 0 1 0 ${n1(-rx * 2)} 0Z`;

export function RoomLinework({
  layout,
  variant = "paper",
  idPrefix = "room",
  artId,
  className,
}: {
  layout: "desktop" | "mobile";
  variant?: "paper" | "thermal";
  idPrefix?: string;
  /** Id on the drawing's root group, so a lens can reuse it with <use> instead of a second copy. */
  artId?: string;
  className?: string;
}) {
  const g = layout === "desktop" ? DESKTOP : MOBILE;
  const b = build(g);
  const { W, H, back, win } = g;
  const thermal = variant === "thermal";
  const lineColor = thermal ? "rgb(255 255 255 / 0.32)" : PAPER.line;
  const faint = thermal ? "rgb(255 255 255 / 0.18)" : PAPER.faint;
  const id = (s: string) => `${idPrefix}-${s}`;
  const sw = layout === "desktop" ? 1.4 : 1.6;
  const floorStep = layout === "desktop" ? 18 : 14;

  const winInner = { x1: win.x1 + 10, x2: win.x2 - 10, y1: win.y1 + 10, y2: win.y2 - 8 };
  const mid = (win.x1 + win.x2) / 2;
  const glassW = winInner.x2 - winInner.x1;
  const glassH = winInner.y2 - winInner.y1;
  const towers = [
    { x: 0.04, w: 0.17, h: 0.74 },
    { x: 0.25, w: 0.12, h: 0.52 },
    { x: 0.41, w: 0.2, h: 0.86 },
    { x: 0.66, w: 0.13, h: 0.6 },
    { x: 0.83, w: 0.14, h: 0.7 },
  ].map((t) => {
    const x = winInner.x1 + glassW * t.x;
    const w = glassW * t.w;
    const y = winInner.y2 - glassH * t.h;
    return { x, w, y };
  });
  const towerOutlines = towers.map((t) => box(t.x, t.y, t.w, winInner.y2 - t.y + 4)).join("");
  const towerFloors = towers
    .map((t) => {
      const count = Math.floor((winInner.y2 - t.y) / floorStep);
      return Array.from({ length: count }, (_, k) => seg([t.x + 4, t.y + 10 + k * floorStep], [t.x + t.w - 4, t.y + 10 + k * floorStep])).join("");
    })
    .join("");

  const skY = back.y2 - (back.y2 - back.y1) * b.sk;
  const edges = [
    seg([0, 0], [back.x1, back.y1]),
    seg([W, 0], [back.x2, back.y1]),
    seg([0, H], [back.x1, back.y2]),
    seg([W, H], [back.x2, back.y2]),
    box(back.x1, back.y1, back.x2 - back.x1, back.y2 - back.y1),
    // Skirting on the back, right and left walls
    seg([back.x1, skY], [back.x2, skY]),
    seg(b.R(0, 1 - b.sk), b.R(1, 1 - b.sk)),
    seg(b.L(0, 1 - b.sk), b.L(1, 1 - b.sk)),
    // Window frame, glass and the two sliding sashes
    box(win.x1, win.y1, win.x2 - win.x1, win.y2 - win.y1),
    box(winInner.x1, winInner.y1, glassW, glassH),
    seg([mid - 8, winInner.y1], [mid - 8, winInner.y2]),
    seg([mid + 8, winInner.y1], [mid + 8, winInner.y2]),
    // Switchboard plate
    closed(...b.plate),
  ].join("");

  // Four rocker switches and the round 16A socket, in the plate's own perspective. The plate is about
  // twice as wide as it is tall, so 0.13 across matches 0.26 down.
  const half = (a: V2, z: V2) => Math.hypot(z[0] - a[0], z[1] - a[1]) / 2;
  const switches =
    [0.07, 0.21, 0.35, 0.49].map((u) => closed(b.P(u, 0.24), b.P(u + 0.1, 0.24), b.P(u + 0.1, 0.76), b.P(u, 0.76))).join("") +
    oval(b.P(0.8, 0.5), half(b.P(0.67, 0.5), b.P(0.93, 0.5)), half(b.P(0.8, 0.24), b.P(0.8, 0.76)));
  const pinR = layout === "desktop" ? 1.9 : 1.2;
  const pins = (
    [
      [0.8, 0.37],
      [0.765, 0.62],
      [0.835, 0.62],
    ] as const
  )
    .map(([u, v]) => oval(b.P(u, v), pinR, pinR))
    .join("");
  const tiles = [...b.depth, ...b.rows].map(([a, z]) => seg(a, z)).join("");

  const fill = (k: string, paper: string) => (thermal ? `url(#${id(k)})` : paper);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={id("glass")}>
          <rect x={winInner.x1} y={winInner.y1} width={glassW} height={glassH} />
        </clipPath>
        {thermal && (
          <>
            {(
              [
                ["g-ceil", 0.71, 0.63],
                ["g-left", 0.63, 0.44],
                ["g-back", 0.67, 0.5],
                ["g-right", 0.58, 0.41],
                ["g-floor", 0.42, 0.26],
                ["g-glass", 0.88, 0.74],
              ] as const
            ).map(([k, a, z]) => (
              <linearGradient key={k} id={id(k)} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={ironbow(a)} />
                <stop offset="1" stopColor={ironbow(z)} />
              </linearGradient>
            ))}
            <radialGradient id={id("cold")}>
              <stop offset="0" stopColor={ironbow(0.06)} />
              <stop offset="0.55" stopColor={ironbow(0.2)} stopOpacity="0.85" />
              <stop offset="1" stopColor={ironbow(0.3)} stopOpacity="0" />
            </radialGradient>
            <radialGradient id={id("cool")}>
              <stop offset="0" stopColor={ironbow(0.22)} stopOpacity="0.9" />
              <stop offset="1" stopColor={ironbow(0.3)} stopOpacity="0" />
            </radialGradient>
            <radialGradient id={id("hot")}>
              <stop offset="0" stopColor={ironbow(1)} />
              <stop offset="0.35" stopColor={ironbow(0.9)} />
              <stop offset="1" stopColor={ironbow(0.6)} stopOpacity="0" />
            </radialGradient>
          </>
        )}
      </defs>

      <g id={artId}>
        {/* Planes */}
        <path d={closed([0, 0], [W, 0], b.TR, b.TL)} fill={fill("g-ceil", PAPER.plane.ceiling)} />
        <path d={closed([0, 0], b.TL, b.BL, [0, H])} fill={fill("g-left", PAPER.plane.left)} />
        <path d={box(back.x1, back.y1, back.x2 - back.x1, back.y2 - back.y1)} fill={fill("g-back", PAPER.plane.back)} />
        <path d={closed(b.TR, [W, 0], [W, H], b.BR)} fill={fill("g-right", PAPER.plane.right)} />
        <path d={closed(b.BL, b.BR, [W, H], [0, H])} fill={fill("g-floor", PAPER.plane.floor)} />
        <path d={box(winInner.x1, winInner.y1, glassW, glassH)} fill={fill("g-glass", PAPER.glass)} />
        {thermal && (
          <>
            {/* Damp behind the skirting: a cold patch rising from the wall base */}
            <ellipse cx={g.damp.cx} cy={g.damp.cy} rx={g.damp.rx} ry={g.damp.ry} fill={`url(#${id("cold")})`} />
            {/* Unsealed sill joint: a cold streak where the frame meets the stone */}
            <ellipse cx={mid} cy={win.y2 - 2} rx={n1((win.x2 - win.x1) * 0.52)} ry={layout === "desktop" ? 16 : 12} fill={`url(#${id("cold")})`} />
            {/* Hollow tile: a faint cool patch */}
            <ellipse cx={g.tile.cx} cy={g.tile.cy} rx={g.tile.rx} ry={g.tile.ry} fill={`url(#${id("cool")})`} />
            {/* Mis-wired socket: a warm spot */}
            <ellipse cx={n1(b.plateC[0])} cy={n1(b.plateC[1])} rx={g.socketRx} ry={n1(g.socketRx * 1.3)} fill={`url(#${id("hot")})`} />
          </>
        )}

        {/* The view through the window: towers, then their floor lines */}
        <g clipPath={`url(#${id("glass")})`} fill="none" stroke={faint} strokeWidth={sw * 0.8}>
          <path d={towerOutlines} />
          <path d={towerFloors} strokeOpacity={0.5} />
        </g>

        {/* Room edges, skirting, window and switchboard plate */}
        <path d={edges} fill="none" stroke={lineColor} strokeWidth={sw} strokeLinejoin="round" />

        {/* Granite sill */}
        <g stroke={lineColor} strokeWidth={sw}>
          <path
            d={closed([win.x1 - g.sillOver, win.y2], [win.x2 + g.sillOver, win.y2], [win.x2 + g.sillOver + 8, win.y2 + 9], [win.x1 - g.sillOver - 8, win.y2 + 9])}
            fill={thermal ? ironbow(0.62) : "#3a4659"}
          />
          <path d={box(win.x1 - g.sillOver - 8, win.y2 + 9, win.x2 - win.x1 + (g.sillOver + 8) * 2, layout === "desktop" ? 14 : 12)} fill={thermal ? ironbow(0.55) : PAPER.sill} />
        </g>

        <path d={switches} fill="none" stroke={lineColor} strokeWidth={sw * 0.8} strokeLinejoin="round" />
        <path d={pins} fill={lineColor} />

        {/* Floor tiles */}
        <path d={tiles} fill="none" stroke={faint} strokeWidth={sw * 0.8} />

        {/* Recessed ceiling light (phone crop only: on desktop the nav pill sits over the ceiling) */}
        {layout === "mobile" && (
          <ellipse cx={(back.x1 + back.x2) / 2} cy={back.y1 * 0.5} rx={26} ry={6} fill="none" stroke={faint} strokeWidth={sw} vectorEffect="non-scaling-stroke" />
        )}
      </g>
    </svg>
  );
}

/** The same drawing again, by reference: the lens shows the thermal drawing without a second copy. */
export function RoomLineworkRef({ layout, href, className }: { layout: "desktop" | "mobile"; href: string; className?: string }) {
  const g = layout === "desktop" ? DESKTOP : MOBILE;
  return (
    <svg viewBox={`0 0 ${g.W} ${g.H}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" focusable="false">
      <use href={`#${href}`} />
    </svg>
  );
}

/** Hotspots of the drawing in % (kept in sync with site.ts `lineworkDesktop` / `lineworkMobile`). */
export function lineworkHotspots(layout: "desktop" | "mobile") {
  const g = layout === "desktop" ? DESKTOP : MOBILE;
  const b = build(g);
  const pct = (p: V2) => ({ x: +((p[0] / g.W) * 100).toFixed(1), y: +((p[1] / g.H) * 100).toFixed(1) });
  return {
    damp: pct([g.damp.cx, g.damp.cy + g.damp.ry * 0.3]),
    socket: pct(b.plateC),
    tile: pct([g.tile.cx, g.tile.cy]),
    sill: pct([(g.win.x1 + g.win.x2) / 2, g.win.y2 + 6]),
  };
}
