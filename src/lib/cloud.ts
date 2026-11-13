// Revision clouds: the scalloped outline engineers draw on drawings to flag an issue.
// Pure path generators, so the same shapes render on the server and animate with DrawSVG.

/** Closed cloud around a rectangle. `bump` is the scallop width in user units. */
export function cloudRect(x: number, y: number, w: number, h: number, bump = 16): string {
  const pts: [number, number][] = [];
  const nx = Math.max(2, Math.round(w / bump));
  const ny = Math.max(2, Math.round(h / bump));
  for (let i = 0; i < nx; i++) pts.push([x + (w * i) / nx, y]);
  for (let i = 0; i < ny; i++) pts.push([x + w, y + (h * i) / ny]);
  for (let i = 0; i < nx; i++) pts.push([x + w - (w * i) / nx, y + h]);
  for (let i = 0; i < ny; i++) pts.push([x, y + h - (h * i) / ny]);
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i <= pts.length; i++) {
    const [px, py] = pts[i % pts.length];
    const [ax, ay] = pts[i - 1];
    const r = Math.hypot(px - ax, py - ay) * 0.62;
    d += `A${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${px.toFixed(1)} ${py.toFixed(1)}`;
  }
  return d + "Z";
}

/** Closed cloud around an ellipse (for markers on photos). */
export function cloudEllipse(cx: number, cy: number, rx: number, ry: number, lobes = 11): string {
  const pts = Array.from({ length: lobes }, (_, i) => {
    const a = (i / lobes) * Math.PI * 2 - Math.PI / 2;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)] as const;
  });
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i <= lobes; i++) {
    const [px, py] = pts[i % lobes];
    const [ax, ay] = pts[i - 1];
    const r = Math.hypot(px - ax, py - ay) * 0.6;
    d += `A${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${px.toFixed(1)} ${py.toFixed(1)}`;
  }
  return d + "Z";
}

/** Open scalloped underline from (x, y) to (x + w, y). */
export function cloudUnderline(x: number, y: number, w: number, bump = 10): string {
  const n = Math.max(1, Math.round(w / bump));
  const step = w / n;
  let d = `M${x.toFixed(1)} ${y.toFixed(1)}`;
  for (let i = 1; i <= n; i++) {
    const px = x + step * i;
    d += `A${(step * 0.56).toFixed(1)} ${(step * 0.56).toFixed(1)} 0 0 0 ${px.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}
