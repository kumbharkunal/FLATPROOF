// npm run images [-- --debug]
//
// 1. Masters: reads ChatGPT downloads from images-inbox/<slot>.png|.webp|.jpg (names in
//    IMAGE_PROMPTS.md) and the real case photo from assets/case/window-sill.png, and writes
//    public/images/<slot>.jpg at the slot's ratio, at most the slot size and never larger than the
//    source (upscaling only adds bytes). A slot whose source is not in the inbox keeps its master.
// 2. Variants: every master becomes AVIF and WebP files at fixed widths,
//    public/img/<slot>-<hash>-<width>.avif|webp. The site serves these as plain static files from
//    the CDN: nothing is resized on request, so no visitor waits for a resize, and the hash in the
//    name lets browsers keep them for a year (next.config.ts sets the header).
// 3. Writes src/content/images.generated.ts (availability, sizes, widths, blur placeholders).
//    Missing slots stay null, and the site shows a designed placeholder for them.
// --debug also writes images-inbox/debug/<slot>-markers.jpg with the hero findings and their clouds
// drawn on each hero photo, for calibration.
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, unlinkSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const { site } = await import('../src/content/site.ts');
const DEBUG = process.argv.includes('--debug');
const MASTERS = 'public/images';
const VARIANTS = 'public/img';
await mkdir(MASTERS, { recursive: true });
await mkdir(VARIANTS, { recursive: true });

// Candidate widths; each image also gets one at its own width, and none above it.
const WIDTHS = [320, 480, 640, 828, 1080, 1280, 1600, 1920, 2560];
// The phone hero is the phone LCP image: lighter settings, no visible difference at phone size.
const QUALITY = { default: { avif: 55, webp: 76 }, 'hero-mobile': { avif: 46, webp: 66 } };

const findInbox = (name) =>
  ['png', 'webp', 'jpg', 'jpeg'].map((ext) => `images-inbox/${name}.${ext}`).find((p) => existsSync(p));

const manifest = {};
const report = [];
let written = 0;
for (const [key, slot] of Object.entries(site.images)) {
  const source = slot.real ? 'assets/case/window-sill.png' : findInbox(slot.file);
  const masterPath = `${MASTERS}/${slot.file}.jpg`;
  let master;
  let note = '';
  if (source && existsSync(source)) {
    const meta = await sharp(source).metadata();
    const want = slot.width / slot.height, got = meta.width / meta.height;
    const off = Math.abs(got - want) / want;
    // The largest box at the slot's ratio inside the source, capped at the slot size: never upscaled.
    const outW = Math.min(slot.width, meta.width, Math.floor(meta.height * want));
    const outH = Math.round(outW / want);
    note = [off > 0.02 ? `ratio ${got.toFixed(3)} vs ${want.toFixed(3)}, centre-cropped` : '', outW < slot.width ? `source smaller than the ${slot.width}px slot, kept at ${outW}px` : '']
      .filter(Boolean)
      .join('; ');
    master = await sharp(source)
      .resize(outW, outH, { fit: 'cover', position: slot.hero ? 'centre' : 'attention' })
      .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: '4:4:4' })
      .toBuffer();
    await writeFile(masterPath, master);
  } else if (existsSync(masterPath)) {
    master = await readFile(masterPath);
    note = 'no new source, kept the existing master';
  } else {
    manifest[key] = null;
    report.push(`${key.padEnd(18)} placeholder (drop images-inbox/${slot.file}.png)`);
    continue;
  }

  const { width, height } = await sharp(master).metadata();
  const q = QUALITY[key] ?? QUALITY.default;
  const hash = createHash('sha1').update(master).update(JSON.stringify(q)).digest('hex').slice(0, 8);
  const base = `${slot.file}-${hash}`;
  // Drop this slot's variants from earlier masters or settings.
  const mine = new RegExp(`^${slot.file}-[0-9a-f]{8}-\\d+\\.(avif|webp)$`);
  for (const f of readdirSync(VARIANTS)) if (mine.test(f) && !f.startsWith(`${base}-`)) unlinkSync(`${VARIANTS}/${f}`);

  const widths = [...WIDTHS.filter((w) => w < width), width];
  let kb = 0;
  for (const w of widths) {
    const out = `${VARIANTS}/${base}-${w}`;
    const resized = () => sharp(master).resize(w, Math.round((w * height) / width), { kernel: 'lanczos3' });
    if (!existsSync(`${out}.avif`)) {
      await resized().avif({ quality: q.avif, effort: 6 }).toFile(`${out}.avif`);
      written++;
    }
    if (!existsSync(`${out}.webp`)) {
      await resized().webp({ quality: q.webp, effort: 6, smartSubsample: true }).toFile(`${out}.webp`);
      written++;
    }
    kb += (await readFile(`${out}.avif`)).length / 1024;
  }

  const tiny = await sharp(master).resize(24).webp({ quality: 40 }).toBuffer();
  manifest[key] = {
    src: `/images/${slot.file}.jpg`,
    width,
    height,
    blur: `data:image/webp;base64,${tiny.toString('base64')}`,
    base: `/img/${base}`,
    widths,
  };
  report.push(`${key.padEnd(18)} ${width}x${height}, ${widths.length} widths, AVIF ${Math.round(kb)} KB in all${note ? `  [${note}]` : ''}`);

  if (DEBUG && slot.hero) {
    // The findings and their revision clouds (radii in % of the width) on the photo.
    const which = key === 'hero-desktop' ? 'desktop' : 'mobile';
    await mkdir('images-inbox/debug', { recursive: true });
    const marks = site.hero.findings
      .map((f) => {
        const p = f.at[which];
        const [crx, cry] = f.cloud[which];
        const x = (p.x / 100) * width, y = (p.y / 100) * height;
        return `<ellipse cx="${x}" cy="${y}" rx="${(crx / 100) * width}" ry="${(cry / 100) * width}" fill="none" stroke="#f59e0b" stroke-width="${width * 0.002}"/><circle cx="${x}" cy="${y}" r="${width * 0.008}" fill="none" stroke="#ff2d55" stroke-width="${width * 0.003}"/><text x="${x + width * 0.012}" y="${y - width * 0.01}" font-size="${width * 0.016}" font-family="Arial" fill="#ff2d55">${f.id} (${p.x}, ${p.y})</text>`;
      })
      .join('');
    await sharp(master).composite([{ input: Buffer.from(`<svg width="${width}" height="${height}">${marks}</svg>`) }]).jpeg().toFile(`images-inbox/debug/${key}-markers.jpg`);
  }
}

const ts = `// Generated by scripts/images.mjs (npm run images). Do not edit.
// null = the slot has no image yet; the site renders a designed placeholder.
// Files: \`\${base}-\${width}.avif\` and \`.webp\` for each width (src/lib/img.ts builds the srcsets).
export type ProcessedImage = {
  src: string;
  width: number;
  height: number;
  blur: string;
  base: string;
  widths: number[];
};

export const images: Record<string, ProcessedImage | null> = ${JSON.stringify(manifest, null, 2)};
`;
await writeFile('src/content/images.generated.ts', ts);
console.log(report.join('\n'));
console.log(`${written} variant files written to ${VARIANTS}/`);
if (DEBUG) console.log('marker overlays written to images-inbox/debug/');
