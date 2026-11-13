// Gzipped first-load JS per route, from .next/diagnostics/route-bundle-stats.json (Next 16).
// Budget: 200 KB gzip for "/" (CLAUDE.md). Exits 1 when over budget. Ported from PDIPROINDIA.
import { readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";

const BUDGET_KB = 200;
const stats = JSON.parse(await readFile(".next/diagnostics/route-bundle-stats.json", "utf8"));
let failed = false;

for (const route of stats) {
  let gz = 0;
  const rows = [];
  for (const p of route.firstLoadChunkPaths) {
    const buf = await readFile(p.replaceAll("\\", "/"));
    const size = gzipSync(buf, { level: 9 }).length;
    gz += size;
    rows.push([p.split(/[\\/]/).pop(), buf.length, size]);
  }
  const kb = gz / 1024;
  console.log(`\n${route.route}  first-load JS: ${(route.firstLoadUncompressedJsBytes / 1024).toFixed(1)} KB raw, ${kb.toFixed(1)} KB gzip`);
  for (const [name, raw, size] of rows.sort((a, b) => b[2] - a[2])) {
    console.log(`  ${name.padEnd(34)} ${(raw / 1024).toFixed(1).padStart(7)} KB  ${(size / 1024).toFixed(1).padStart(6)} KB gz`);
  }
  if (route.route === "/" && kb > BUDGET_KB) failed = true;
}
console.log(failed ? `\nOVER BUDGET (${BUDGET_KB} KB gzip for /)` : `\nWithin budget (${BUDGET_KB} KB gzip for /)`);
process.exit(failed ? 1 : 0);
