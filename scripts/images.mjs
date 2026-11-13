// npm run images [-- --debug]
//
// 1. Reads ChatGPT downloads from images-inbox/<slot>.png|.webp|.jpg (names in IMAGE_PROMPTS.md)
//    and the real case photo from assets/case/window-sill.png.
// 2. Writes high-quality masters to public/images/<slot>.jpg at the slot size (next/image then
//    serves AVIF/WebP at the sizes each layout needs).
// 3. For the two hero slots, builds a thermal twin (<slot>-thermal.jpg): luminance, a compressed
//    temperature range, the four defect anomalies from src/content/site.ts, an ironbow palette and a
//    low-resolution sensor feel. Also writes a coarse heat grid for the lens needle.
// 4. Writes src/content/images.generated.ts (availability, sizes, blur placeholders, grids).
//    Missing slots stay null, and the site shows a designed placeholder for them.
// --debug also writes images-inbox/debug/<slot>-markers.jpg with the hotspots drawn, for calibration.
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const { site } = await import('../src/content/site.ts');
const DEBUG = process.argv.includes('--debug');
const OUT = 'public/images';
await mkdir(OUT, { recursive: true });

// Ironbow palette (cold to hot), shared with the lens ring and the OG image.
const { ironbowRgb } = await import('../src/lib/ironbow.ts');
const LUT = Array.from({ length: 256 }, (_, i) => ironbowRgb(i / 255));

const findInbox = (name) =>
  ['png', 'webp', 'jpg', 'jpeg'].map((ext) => `images-inbox/${name}.${ext}`).find((p) => existsSync(p));

async function thermalTwin(slot, buf, which) {
  // Work at a sensor-like resolution, then scale back up: real thermal images are soft.
  const SW = 480, SH = Math.round((480 * slot.height) / slot.width);
  const { data } = await sharp(buf).resize(SW, SH).greyscale().blur(1.2).raw().toBuffer({ resolveWithObject: true });
  // Percentile stretch, then compress into a mid band so the room reads as one even temperature.
  const sorted = Float32Array.from(data).sort();
  const lo = sorted[Math.floor(sorted.length * 0.02)], hi = sorted[Math.floor(sorted.length * 0.98)];
  const temp = new Float32Array(SW * SH);
  for (let i = 0; i < temp.length; i++) {
    const l = Math.min(1, Math.max(0, (data[i] - lo) / Math.max(1, hi - lo)));
    temp[i] = 0.42 + (l - 0.5) * 0.34;
  }
  // Defect anomalies: Gaussian cold or warm patches at each finding's hotspot.
  for (const f of site.hero.findings) {
    const p = f.at[which];
    const cx = (p.x / 100) * SW, cy = (p.y / 100) * SH;
    const rx = (f.thermal.rx / 100) * SW, ry = (f.thermal.ry / 100) * SH;
    const sign = f.thermal.kind === 'cold' ? -1 : 1;
    for (let y = Math.max(0, Math.floor(cy - ry * 3)); y < Math.min(SH, cy + ry * 3); y++) {
      for (let x = Math.max(0, Math.floor(cx - rx * 3)); x < Math.min(SW, cx + rx * 3); x++) {
        const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
        temp[y * SW + x] += sign * 0.4 * f.thermal.strength * Math.exp(-d / 2);
      }
    }
  }
  // Mild sensor noise, then palette.
  const rgb = Buffer.alloc(SW * SH * 3);
  for (let i = 0; i < temp.length; i++) {
    const n = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const t = Math.min(1, Math.max(0, temp[i] + n * 0.012));
    const c = LUT[Math.round(t * 255)];
    rgb[i * 3] = c[0]; rgb[i * 3 + 1] = c[1]; rgb[i * 3 + 2] = c[2];
  }
  const outW = Math.min(slot.width, 1600), outH = Math.round((outW * slot.height) / slot.width);
  const jpg = await sharp(rgb, { raw: { width: SW, height: SH, channels: 3 } })
    .blur(0.8)
    .resize(outW, outH, { kernel: 'cubic' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await writeFile(`${OUT}/${slot.file}-thermal.jpg`, jpg);
  // Coarse heat grid (0-255) for the lens needle: GW x GH cells, base64.
  const GW = 48, GH = Math.round((48 * slot.height) / slot.width);
  const grid = Buffer.alloc(GW * GH);
  for (let gy = 0; gy < GH; gy++) {
    for (let gx = 0; gx < GW; gx++) {
      const x = Math.floor(((gx + 0.5) / GW) * SW), y = Math.floor(((gy + 0.5) / GH) * SH);
      grid[gy * GW + gx] = Math.round(Math.min(1, Math.max(0, temp[y * SW + x])) * 255);
    }
  }
  return { src: `/images/${slot.file}-thermal.jpg`, width: outW, height: outH, grid: { cols: GW, rows: GH, data: grid.toString('base64') }, kb: Math.round(jpg.length / 1024) };
}

const manifest = {};
const report = [];
for (const [key, slot] of Object.entries(site.images)) {
  const source = slot.real ? 'assets/case/window-sill.png' : findInbox(slot.file);
  if (!source || !existsSync(source)) {
    manifest[key] = null;
    report.push(`${key.padEnd(18)} placeholder (drop images-inbox/${slot.file}.png)`);
    continue;
  }
  const meta = await sharp(source).metadata();
  const want = slot.width / slot.height, got = meta.width / meta.height;
  const off = Math.abs(got - want) / want;
  const small = meta.width < slot.width * 0.6;
  const note = [off > 0.02 ? `ratio ${got.toFixed(3)} vs ${want.toFixed(3)}, centre-cropped` : '', small ? `small source ${meta.width}px` : '']
    .filter(Boolean)
    .join('; ');
  const position = slot.thermal ? 'centre' : 'attention';
  const master = await sharp(source)
    .resize(slot.width, slot.height, { fit: 'cover', position, withoutEnlargement: false })
    .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toBuffer();
  await writeFile(`${OUT}/${slot.file}.jpg`, master);
  const tiny = await sharp(master).resize(24).webp({ quality: 40 }).toBuffer();
  const entry = {
    src: `/images/${slot.file}.jpg`,
    width: slot.width,
    height: slot.height,
    blur: `data:image/webp;base64,${tiny.toString('base64')}`,
    thermal: null,
  };
  if (slot.thermal) {
    const which = key === 'hero-desktop' ? 'desktop' : 'mobile';
    const t = await thermalTwin(slot, master, which);
    entry.thermal = { src: t.src, width: t.width, height: t.height, grid: t.grid };
    report.push(`${key.padEnd(18)} ${meta.width}x${meta.height} -> ${slot.width}x${slot.height} (${Math.round(master.length / 1024)} KB) + thermal (${t.kb} KB)${note ? `  [${note}]` : ''}`);
    if (DEBUG) {
      await mkdir('images-inbox/debug', { recursive: true });
      const W = slot.width, H = slot.height;
      const marks = site.hero.findings
        .map((f) => {
          const p = f.at[which];
          const x = (p.x / 100) * W, y = (p.y / 100) * H;
          return `<circle cx="${x}" cy="${y}" r="${W * 0.012}" fill="none" stroke="#ff2d55" stroke-width="${W * 0.003}"/><text x="${x + W * 0.016}" y="${y + W * 0.006}" font-size="${W * 0.018}" font-family="Arial" fill="#ff2d55">${f.id} (${p.x}, ${p.y})</text>`;
        })
        .join('');
      await sharp(master).composite([{ input: Buffer.from(`<svg width="${W}" height="${H}">${marks}</svg>`) }]).jpeg().toFile(`images-inbox/debug/${key}-markers.jpg`);
    }
  } else {
    report.push(`${key.padEnd(18)} ${meta.width}x${meta.height} -> ${slot.width}x${slot.height} (${Math.round(master.length / 1024)} KB)${note ? `  [${note}]` : ''}`);
  }
  manifest[key] = entry;
}

const ts = `// Generated by scripts/images.mjs (npm run images). Do not edit.
// null = the slot has no image yet; the site renders a designed placeholder.
export type HeatGrid = { cols: number; rows: number; data: string };
export type ProcessedImage = {
  src: string;
  width: number;
  height: number;
  blur: string;
  thermal: { src: string; width: number; height: number; grid: HeatGrid } | null;
};

export const images: Record<string, ProcessedImage | null> = ${JSON.stringify(manifest, null, 2)};
`;
await writeFile('src/content/images.generated.ts', ts);
console.log(report.join('\n'));
if (DEBUG) console.log('marker overlays written to images-inbox/debug/');
