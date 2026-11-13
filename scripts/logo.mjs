// Cuts clean, transparent logo files from the client's logo. The logo is never redrawn.
// Source: assets/brand/logo-source.jpg (their Instagram avatar, 1080x1080: off-white disc on black corners).
// Output (public/brand/):
//   logo.png            full lockup (mark + wordmark), transparent background
//   logo-reversed.png   same, navy parts turned white for dark grounds (needs client sign-off, FP-D2)
//   mark.png            the mark only (clipboard, roof, tick, magnifier), square, transparent
//   mark-reversed.png   the mark for dark grounds
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SRC = 'assets/brand/logo-source.jpg';
const BG = [254, 254, 252]; // sampled disc colour
const LOCKUP = { left: 62, top: 336, width: 1018 - 62, height: 744 - 336 }; // measured content bounds
const MARK_RIGHT = 415; // one-pixel gap between the magnifier handle and the wordmark's "I"
const PAD = 6;
const NAVY = [41, 55, 77]; // sampled "flat" navy (#29374D)
const NV = NAVY.map((v, k) => v - BG[k]);
const NN = NV[0] ** 2 + NV[1] ** 2 + NV[2] ** 2;

const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
if (info.width !== 1080 || info.height !== 1080) throw new Error(`unexpected source size ${info.width}x${info.height}`);

// Background removal by colour un-mixing: alpha from the distance to the disc colour,
// colour recovered as (P - (1 - a) * BG) / a so anti-aliased edges keep no white halo.
function cut({ left, top, width, height }, { reversed = false } = {}) {
  const W = width + PAD * 2, H = height + PAD * 2;
  const out = Buffer.alloc(W * H * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const si = ((top + y) * info.width + (left + x)) * 3;
      const p = [data[si], data[si + 1], data[si + 2]];
      const d = Math.hypot(p[0] - BG[0], p[1] - BG[1], p[2] - BG[2]);
      let a = Math.min(1, Math.max(0, (d - 12) / 118));
      const oi = ((y + PAD) * W + (x + PAD)) * 4;
      if (a < 0.03) continue;
      let c = p.map((v, k) => Math.min(255, Math.max(0, Math.round((v - (1 - a) * BG[k]) / a))));
      if (reversed) {
        // Pixels on the line between the disc colour and navy are navy strokes or their
        // anti-aliased edges: project onto that line for an exact alpha, then paint them white.
        const w = [p[0] - BG[0], p[1] - BG[1], p[2] - BG[2]];
        const t = Math.min(1, Math.max(0, (w[0] * NV[0] + w[1] * NV[1] + w[2] * NV[2]) / NN));
        const off = Math.hypot(w[0] - t * NV[0], w[1] - t * NV[1], w[2] - t * NV[2]);
        if (off < 34 && t > 0.03) {
          c = [255, 255, 255];
          a = Math.min(1, t * 1.08);
        }
      }
      out[oi] = c[0]; out[oi + 1] = c[1]; out[oi + 2] = c[2]; out[oi + 3] = Math.round(a * 255);
    }
  }
  return sharp(out, { raw: { width: W, height: H, channels: 4 } });
}

const squareOf = async (img) => {
  const buf = await img.png().toBuffer();
  const m = await sharp(buf).metadata();
  const S = Math.max(m.width, m.height);
  return sharp(buf).extend({
    top: Math.floor((S - m.height) / 2), bottom: Math.ceil((S - m.height) / 2),
    left: Math.floor((S - m.width) / 2), right: Math.ceil((S - m.width) / 2),
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
};

await mkdir('public/brand', { recursive: true });
const MARK = { left: LOCKUP.left, top: LOCKUP.top, width: MARK_RIGHT - LOCKUP.left, height: LOCKUP.height };
const png = { compressionLevel: 9, adaptiveFiltering: true };
await cut(LOCKUP).png(png).toFile('public/brand/logo.png');
await cut(LOCKUP, { reversed: true }).png(png).toFile('public/brand/logo-reversed.png');
await (await squareOf(cut(MARK))).png(png).toFile('public/brand/mark.png');
await (await squareOf(cut(MARK, { reversed: true }))).png(png).toFile('public/brand/mark-reversed.png');

for (const f of ['logo', 'logo-reversed', 'mark', 'mark-reversed']) {
  const m = await sharp(`public/brand/${f}.png`).metadata();
  console.log(`public/brand/${f}.png  ${m.width}x${m.height}`);
}
