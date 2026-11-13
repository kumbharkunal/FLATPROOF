import { ironbow } from "@/lib/ironbow";

// The hero room as an architectural line drawing, shown until the AI photos arrive.
// Same composition as the photo prompts (IMAGE_PROMPTS.md): calm left wall for the headline,
// sliding window over a black granite sill, switchboard on the right wall, skirting, tiled floor.
// `thermal` renders the same geometry as a thermal image for the lens and the Thermal view.

type V2 = readonly [number, number];
const lerp = (a: V2, b: V2, t: number): V2 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const pts = (...p: V2[]) => p.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ");

type Geo = {
  W: number;
  H: number;
  back: { x1: number; x2: number; y1: number; y2: number };
  vp: V2;
  win: { x1: number; x2: number; y1: number; y2: number };
  sillOver: number;
  plate: { u0: number; u1: number; v0: number; v1: number };
  rows: number[];
  cols: number;
  /** Thermal anomaly centres and radii, in drawing units. */
  damp: { cx: number; cy: number; rx: number; ry: number };
  socketRx: number;
  tile: { cx: number; cy: number; rx: number; ry: number };
};

const DESKTOP: Geo = {
  W: 1600,
  H: 900,
  back: { x1: 640, x2: 1240, y1: 75, y2: 675 },
  vp: [940, 375],
  win: { x1: 790, x2: 1210, y1: 150, y2: 398 },
  sillOver: 20,
  plate: { u0: 0.36, u1: 0.47, v0: 0.585, v1: 0.655 },
  rows: [700, 742, 806, 900],
  cols: 6,
  damp: { cx: 1150, cy: 640, rx: 120, ry: 62 },
  socketRx: 26,
  tile: { cx: 1290, cy: 812, rx: 120, ry: 34 },
};

const MOBILE: Geo = {
  W: 800,
  H: 1000,
  back: { x1: 160, x2: 640, y1: 120, y2: 760 },
  vp: [400, 440],
  win: { x1: 215, x2: 585, y1: 165, y2: 296 },
  sillOver: 16,
  plate: { u0: 0.27, u1: 0.43, v0: 0.585, v1: 0.655 },
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
  const plate = [R(g.plate.u0, g.plate.v0), R(g.plate.u1, g.plate.v0), R(g.plate.u1, g.plate.v1), R(g.plate.u0, g.plate.v1)] as const;
  const plateC = R((g.plate.u0 + g.plate.u1) / 2, (g.plate.v0 + g.plate.v1) / 2);
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
  return { BL, BR, TL, TR, R, L, plate, plateC, depth, rows, sk };
}

const PAPER = {
  plane: { left: "#f7f9fa", back: "#fbfcfc", right: "#f1f5f7", ceiling: "#fdfefe", floor: "#eef3f5" },
  line: "#29374d",
  faint: "#9fb0c0",
  glass: "#e6f1f6",
  sill: "#1c2533",
};

export function RoomLinework({
  layout,
  variant = "paper",
  idPrefix = "room",
  className,
}: {
  layout: "desktop" | "mobile";
  variant?: "paper" | "thermal";
  idPrefix?: string;
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

  const winInner = { x1: win.x1 + 10, x2: win.x2 - 10, y1: win.y1 + 10, y2: win.y2 - 8 };
  const mid = (win.x1 + win.x2) / 2;
  const glassW = winInner.x2 - winInner.x1;
  const towers = [
    { x: 0.04, w: 0.17, h: 0.74 },
    { x: 0.25, w: 0.12, h: 0.52 },
    { x: 0.41, w: 0.2, h: 0.86 },
    { x: 0.66, w: 0.13, h: 0.6 },
    { x: 0.83, w: 0.14, h: 0.7 },
  ];
  const glassH = winInner.y2 - winInner.y1;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={id("glass")}>
          <rect x={winInner.x1} y={winInner.y1} width={glassW} height={glassH} />
        </clipPath>
        {thermal && (
          <>
            <filter id={id("soft")} x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation={layout === "desktop" ? 9 : 7} />
            </filter>
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

      {/* Planes */}
      <g filter={thermal ? `url(#${id("soft")})` : undefined}>
        <polygon points={pts([0, 0], [W, 0], b.TR, b.TL)} fill={thermal ? `url(#${id("g-ceil")})` : PAPER.plane.ceiling} />
        <polygon points={pts([0, 0], b.TL, b.BL, [0, H])} fill={thermal ? `url(#${id("g-left")})` : PAPER.plane.left} />
        <rect x={back.x1} y={back.y1} width={back.x2 - back.x1} height={back.y2 - back.y1} fill={thermal ? `url(#${id("g-back")})` : PAPER.plane.back} />
        <polygon points={pts(b.TR, [W, 0], [W, H], b.BR)} fill={thermal ? `url(#${id("g-right")})` : PAPER.plane.right} />
        <polygon points={pts(b.BL, b.BR, [W, H], [0, H])} fill={thermal ? `url(#${id("g-floor")})` : PAPER.plane.floor} />
        <rect x={winInner.x1} y={winInner.y1} width={glassW} height={glassH} fill={thermal ? `url(#${id("g-glass")})` : PAPER.glass} />
        {thermal && (
          <>
            {/* Damp behind the skirting: a cold patch rising from the wall base */}
            <ellipse cx={g.damp.cx} cy={g.damp.cy} rx={g.damp.rx} ry={g.damp.ry} fill={`url(#${id("cold")})`} />
            {/* Unsealed sill joint: a cold streak where the frame meets the stone */}
            <ellipse cx={mid} cy={win.y2 - 2} rx={(win.x2 - win.x1) * 0.52} ry={layout === "desktop" ? 16 : 12} fill={`url(#${id("cold")})`} />
            {/* Hollow tile: a faint cool patch */}
            <ellipse cx={g.tile.cx} cy={g.tile.cy} rx={g.tile.rx} ry={g.tile.ry} fill={`url(#${id("cool")})`} />
            {/* Mis-wired socket: a warm spot */}
            <ellipse cx={b.plateC[0]} cy={b.plateC[1]} rx={g.socketRx} ry={g.socketRx * 1.3} fill={`url(#${id("hot")})`} />
          </>
        )}
      </g>

      {/* View through the window */}
      <g clipPath={`url(#${id("glass")})`} fill="none" stroke={faint} strokeWidth={sw * 0.8}>
        {towers.map((t, i) => {
          const x = winInner.x1 + glassW * t.x;
          const w = glassW * t.w;
          const y = winInner.y2 - glassH * t.h;
          const floors = Math.floor((winInner.y2 - y) / (layout === "desktop" ? 18 : 14));
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={winInner.y2 - y + 4} />
              {Array.from({ length: floors }, (_, k) => (
                <line key={k} x1={x + 4} x2={x + w - 4} y1={y + 10 + k * (layout === "desktop" ? 18 : 14)} y2={y + 10 + k * (layout === "desktop" ? 18 : 14)} strokeOpacity={0.5} />
              ))}
            </g>
          );
        })}
      </g>

      {/* Room edges */}
      <g fill="none" stroke={lineColor} strokeWidth={sw} strokeLinejoin="round" vectorEffect="non-scaling-stroke">
        <line x1={0} y1={0} x2={back.x1} y2={back.y1} />
        <line x1={W} y1={0} x2={back.x2} y2={back.y1} />
        <line x1={0} y1={H} x2={back.x1} y2={back.y2} />
        <line x1={W} y1={H} x2={back.x2} y2={back.y2} />
        <rect x={back.x1} y={back.y1} width={back.x2 - back.x1} height={back.y2 - back.y1} />
        {/* Skirting */}
        <line x1={back.x1} x2={back.x2} y1={back.y2 - (back.y2 - back.y1) * b.sk} y2={back.y2 - (back.y2 - back.y1) * b.sk} />
        <polyline points={pts(b.R(0, 1 - b.sk), b.R(1, 1 - b.sk))} />
        <polyline points={pts(b.L(0, 1 - b.sk), b.L(1, 1 - b.sk))} />
        {/* Window frame and sliding panes */}
        <rect x={win.x1} y={win.y1} width={win.x2 - win.x1} height={win.y2 - win.y1} rx={2} />
        <rect x={winInner.x1} y={winInner.y1} width={glassW} height={glassH} />
        <line x1={mid - 8} x2={mid - 8} y1={winInner.y1} y2={winInner.y2} />
        <line x1={mid + 8} x2={mid + 8} y1={winInner.y1} y2={winInner.y2} />
        {/* Switchboard plate */}
        <polygon points={pts(...b.plate)} />
      </g>

      {/* Granite sill */}
      <g stroke={lineColor} strokeWidth={sw} vectorEffect="non-scaling-stroke">
        <polygon
          points={pts([win.x1 - g.sillOver, win.y2], [win.x2 + g.sillOver, win.y2], [win.x2 + g.sillOver + 8, win.y2 + 9], [win.x1 - g.sillOver - 8, win.y2 + 9])}
          fill={thermal ? ironbow(0.62) : "#3a4659"}
        />
        <rect x={win.x1 - g.sillOver - 8} y={win.y2 + 9} width={win.x2 - win.x1 + (g.sillOver + 8) * 2} height={layout === "desktop" ? 14 : 12} fill={thermal ? ironbow(0.55) : PAPER.sill} />
      </g>

      {/* Switches and the 16A socket */}
      <g fill="none" stroke={lineColor} strokeWidth={sw * 0.8} vectorEffect="non-scaling-stroke">
        {[0.14, 0.3, 0.46, 0.62].map((u) => {
          const p = lerp(lerp(b.plate[0], b.plate[1], u), lerp(b.plate[3], b.plate[2], u), 0.5);
          return <rect key={u} x={p[0] - 4} y={p[1] - 9} width={8} height={18} rx={1.5} />;
        })}
        {(() => {
          const p = lerp(lerp(b.plate[0], b.plate[1], 0.83), lerp(b.plate[3], b.plate[2], 0.83), 0.5);
          return <circle cx={p[0]} cy={p[1]} r={layout === "desktop" ? 11 : 9} />;
        })()}
      </g>

      {/* Floor tiles */}
      <g stroke={faint} strokeWidth={sw * 0.8} vectorEffect="non-scaling-stroke">
        {b.depth.map(([a, z], i) => (
          <line key={`d${i}`} x1={a[0]} y1={a[1]} x2={z[0]} y2={z[1]} />
        ))}
        {b.rows.map(([a, z], i) => (
          <line key={`r${i}`} x1={a[0]} y1={a[1]} x2={z[0]} y2={z[1]} />
        ))}
      </g>

      {/* Recessed ceiling light */}
      <ellipse cx={(back.x1 + back.x2) / 2} cy={back.y1 * 0.5} rx={layout === "desktop" ? 34 : 26} ry={6} fill="none" stroke={faint} strokeWidth={sw} vectorEffect="non-scaling-stroke" />
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
