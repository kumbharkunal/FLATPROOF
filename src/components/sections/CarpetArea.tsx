import { site } from "@/content/site";
import { cloudRect } from "@/lib/cloud";
import { WhatsAppButton } from "@/components/ui/Button";
import { DeficitCalc } from "./DeficitCalc";
import { CarpetMotion } from "./CarpetMotion";

const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Illustrative 3BHK plan (drawing units). The readout figures come from the sample report.
const WALLS = [
  "M40 40H600V460H40Z",
  "M330 40V290",
  "M330 170H600",
  "M470 40V170",
  "M40 290H600",
  "M210 290V460",
  "M390 290V460",
  "M480 290V460",
];
const DOORS = [
  { x: 120, y: 290, r: 34, a: "M120 290h34M120 290a34 34 0 0 0 34 -34" },
  { x: 300, y: 290, r: 32, a: "M300 290h32M300 290a32 32 0 0 0 32 -32" },
  { x: 420, y: 290, r: 26, a: "M420 290h26M420 290a26 26 0 0 0 26 -26" },
  { x: 360, y: 170, r: 34, a: "M360 170h34M360 170a34 34 0 0 1 34 34" },
  { x: 485, y: 170, r: 28, a: "M485 170h28M485 170a28 28 0 0 0 28 -28" },
];
const ROOMS = [
  { name: "Living", x: 185, y: 170 },
  { name: "Kitchen", x: 400, y: 110 },
  { name: "Bath", x: 535, y: 110 },
  { name: "Bed 1", x: 465, y: 236 },
  { name: "Bed 2", x: 125, y: 380 },
  { name: "Bed 3", x: 300, y: 380 },
  { name: "Bath", x: 435, y: 380 },
  { name: "Balcony", x: 540, y: 380 },
];

export function CarpetArea() {
  const c = site.carpet;
  const deficit = c.readout.find((r) => "deficit" in r && r.deficit)?.value ?? 31.6;
  return (
    <section id="carpet-area" className="carpet section-y" data-nav="light" aria-labelledby="carpet-title">
      <div className="container-x carpet-grid">
        <div className="carpet-copy">
          <h2 id="carpet-title" className="type-h2 section-title">
            {c.title}
          </h2>
          <p className="type-lead section-sub">{c.body}</p>
          <dl className="readout">
            {c.readout.map((r) => {
              const isDeficit = "deficit" in r && r.deficit;
              return (
                <div key={r.label} className={isDeficit ? "readout-row deficit" : "readout-row"}>
                  <dt>{r.label}</dt>
                  <dd className="type-figure num" data-value={r.value}>
                    {fmt(r.value)} <span className="readout-unit">{c.unit}</span>
                  </dd>
                  {isDeficit && (
                    <svg className="deficit-cloud" viewBox="0 0 400 64" preserveAspectRatio="none" aria-hidden="true">
                      <path d={cloudRect(6, 6, 388, 52, 26)} pathLength={1} />
                    </svg>
                  )}
                </div>
              );
            })}
          </dl>
          <DeficitCalc deficit={deficit} copy={c.calc} />
          <div className="carpet-cta">
            <WhatsAppButton wa={c.cta.wa} variant="secondary">
              {c.cta.label}
            </WhatsAppButton>
          </div>
          <p className="carpet-note">{c.note}</p>
        </div>

        <figure className="plan" aria-hidden="true">
          <svg viewBox="0 0 640 500" className="plan-svg">
            <g className="plan-walls">
              {WALLS.map((d, i) => (
                <path key={i} d={d} pathLength={1} className={i === 0 ? "wall-outer" : "wall"} />
              ))}
            </g>
            <g className="plan-doors">
              {DOORS.map((d) => (
                <path key={`${d.x}-${d.y}`} d={d.a} />
              ))}
            </g>
            <g className="plan-labels">
              {ROOMS.map((r, i) => (
                <text key={i} x={r.x} y={r.y} textAnchor="middle">
                  {r.name}
                </text>
              ))}
            </g>
            <g className="dim" data-axis="x">
              <path d="M40 16H600M40 10V22M600 10V22" />
              <rect x="285" y="6" width="70" height="20" rx="4" />
              <text x="320" y="20" textAnchor="middle">
                11.20 m
              </text>
            </g>
            <g className="dim" data-axis="y">
              <path d="M16 40V460M10 40H22M10 460H22" />
              <rect x="4" y="238" width="24" height="44" rx="4" />
              <text x="16" y="260" textAnchor="middle" transform="rotate(-90 16 260)">
                8.40 m
              </text>
            </g>
            <g className="dim" data-axis="x">
              <path d="M340 274H590M340 268V280M590 268V280" />
              <rect x="420" y="264" width="90" height="20" rx="4" />
              <text x="465" y="278" textAnchor="middle">
                4.20 × 3.00 m
              </text>
            </g>
          </svg>
        </figure>
      </div>
      <CarpetMotion />
    </section>
  );
}
