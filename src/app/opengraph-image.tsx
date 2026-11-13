import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { polar, scaleSegments, scaleStart } from "@/lib/ironbow";

// The hero lens instrument ring, drawn as SVG (Satori has no conic gradients).
function ringSvg(size: number) {
  const c = size / 2;
  const r = c - 14;
  const segs = scaleSegments(c, c, r, 270, 60)
    .map((s) => `<path d="${s.d}" stroke="${s.color}" stroke-width="9" fill="none"/>`)
    .join("");
  const ticks = Array.from({ length: 19 }, (_, i) => {
    const a = scaleStart() + i * 15;
    const p0 = polar(c, c, r - 13, a);
    const p1 = polar(c, c, r - (i % 3 === 0 ? 30 : 22), a);
    return `<line x1="${p0.x}" y1="${p0.y}" x2="${p1.x}" y2="${p1.y}" stroke="#ffffff" stroke-opacity="${i % 3 === 0 ? 0.9 : 0.5}" stroke-width="2"/>`;
  }).join("");
  const needle = polar(c, c, r - 40, scaleStart() + 270 * 0.12);
  const needleBase = polar(c, c, r - 4, scaleStart() + 270 * 0.12);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${segs}${ticks}<line x1="${needleBase.x}" y1="${needleBase.y}" x2="${needle.x}" y2="${needle.y}" stroke="#3fc1d6" stroke-width="4" stroke-linecap="round"/></svg>`;
}

export const alt = "FlatProof Inspections: Don’t take possession in the dark.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read once at module scope (static inputs).
const display = readFile(join(process.cwd(), "src/fonts/og/zalando-display.woff"));
const text = readFile(join(process.cwd(), "src/fonts/og/zalando-text.woff"));
const logo = readFile(join(process.cwd(), "public/brand/logo.png"), "base64");

export default async function OpengraphImage() {
  const [displayFont, textFont, logoB64] = await Promise.all([display, text, logo]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#ffffff",
          fontFamily: "Zalando Text",
          color: "#0e1726",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 0 56px 72px", width: 700 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${logoB64}`} width={242} height={105} alt="" />
          <div
            style={{
              display: "flex",
              marginTop: 54,
              fontFamily: "Zalando Display",
              fontSize: 70,
              lineHeight: 1,
              letterSpacing: -2,
              color: "#29374d",
            }}
          >
            Don’t take possession in the dark.
          </div>
          <div style={{ display: "flex", marginTop: "auto", fontSize: 26, lineHeight: 1.35, color: "#55657a" }}>
            Pre-possession flat inspection in Pune and PCMC. Snag report within 24 hours.
          </div>
        </div>
        <div style={{ display: "flex", position: "absolute", right: 60, top: 100, width: 430, height: 430 }}>
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: 44,
              top: 44,
              width: 342,
              height: 342,
              borderRadius: 342,
              background:
                "radial-gradient(circle at 44% 60%, #06001a 0%, #240066 14%, #5c0092 28%, #98068f 42%, #cc2268 56%, #ec4c26 70%, #fa8806 84%, #ffcc2c 100%)",
              boxShadow: "0 0 0 6px #0e1726",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(ringSvg(430))}`}
            width={430}
            height={430}
            alt=""
            style={{ position: "absolute", left: 0, top: 0 }}
          />
          <div style={{ display: "flex", position: "absolute", left: 214, top: 175, width: 2, height: 80, background: "#ffffff" }} />
          <div style={{ display: "flex", position: "absolute", left: 175, top: 214, width: 80, height: 2, background: "#ffffff" }} />
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: 72,
            bottom: 58,
            fontSize: 22,
            color: "#016e82",
          }}
        >
          {site.seo.url.replace("https://", "")}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Zalando Display", data: displayFont, weight: 700, style: "normal" },
        { name: "Zalando Text", data: textFont, weight: 500, style: "normal" },
      ],
    },
  );
}
