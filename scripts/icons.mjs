// App icons from the logo mark (public/brand/mark.png, made by scripts/logo.mjs).
// The mark sits on a white rounded tile so its navy strokes read on dark browser chrome.
// Output: src/app/icon.png (512), src/app/apple-icon.png (180, opaque), src/app/favicon.ico (48, 32, 16).
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const tile = async (size, { radius = 0.22, inset = 0.12, opaque = false } = {}) => {
  const r = Math.round(size * radius);
  const pad = Math.round(size * inset);
  const mark = await sharp('public/brand/mark.png').resize(size - pad * 2, size - pad * 2).toBuffer();
  const bg = Buffer.from(
    opaque
      ? `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="#ffffff"/></svg>`
      : `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="#ffffff"/></svg>`,
  );
  return sharp(bg).composite([{ input: mark, left: pad, top: pad }]).png({ compressionLevel: 9 });
};

await (await tile(512)).toFile('src/app/icon.png');
await (await tile(180, { opaque: true, inset: 0.1 })).toFile('src/app/apple-icon.png');

const sizes = [48, 32, 16];
const pngs = await Promise.all(sizes.map(async (s) => (await tile(s, { inset: s <= 16 ? 0.04 : 0.08 })).toBuffer()));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
let offset = 6 + 16 * pngs.length;
const entries = pngs.map((png, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0);
  e.writeUInt8(sizes[i], 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(png.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += png.length;
  return e;
});
await writeFile('src/app/favicon.ico', Buffer.concat([header, ...entries, ...pngs]));
console.log('icons written: src/app/icon.png (512), src/app/apple-icon.png (180), src/app/favicon.ico (48/32/16)');
