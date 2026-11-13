import { site, waHref } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { InstagramIcon } from "@/components/brand-icons/instagram";
import { FacebookIcon } from "@/components/brand-icons/facebook";
import { FooterMarkMotion } from "./FooterMarkMotion";

// The wordmark is set in a 1000 x 100 box so its ink runs edge to edge. Measured in the site font
// (Zalando Sans, width 125, weight 800) at 100px: ink 765 units wide starting 5 in, advance 772,
// cap height 73, overshoot 2. Re-measure if the font changes.
const K = 1000 / 765.01;
const MARK = {
  x: -5 * K,
  y: 1.5 + 73 * K,
  fontSize: 100 * K,
  textLength: 772.21 * K,
} as const;
const markText = {
  x: MARK.x.toFixed(2),
  y: MARK.y.toFixed(2),
  fontSize: MARK.fontSize.toFixed(2),
  textLength: MARK.textLength.toFixed(2),
  lengthAdjust: "spacingAndGlyphs",
  fontWeight: 800,
  style: { fontVariationSettings: '"wdth" 125' },
} as const;

export function Footer() {
  const ct = site.contact;
  const f = site.footer;
  return (
    <footer className="footer" data-nav="dark">
      <div className="container-x footer-grid">
        <div className="footer-brand">
          <Logo height={46} dark />
          <p>{site.brand.productOf}</p>
        </div>
        <nav aria-label="Services" className="footer-col">
          <p className="footer-h">{f.services}</p>
          <ul>
            {site.services.items.map((s) => (
              <li key={s.id}>
                <a href="#services">{s.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-col">
          <p className="footer-h">{f.contact}</p>
          <ul>
            <li>
              <a href={waHref("general")} target="_blank" rel="noopener noreferrer">
                WhatsApp {ct.phone.display}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={ct.phone.href}>Call {ct.phone.display}</a>
            </li>
            <li>
              <a href={ct.email.href}>{ct.email.display}</a>
            </li>
            <li>
              <address>
                {ct.address.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <p className="footer-h">{f.follow}</p>
          <ul>
            <li>
              <a href={ct.instagram.href} target="_blank" rel="noopener noreferrer" className="footer-social">
                <InstagramIcon className="size-5" idPrefix="ig-foot" />
                <span>{ct.instagram.handle}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            {ct.facebook.show && (
              <li>
                <a href={ct.facebook.href} target="_blank" rel="noopener noreferrer" className="footer-social">
                  <FacebookIcon className="size-5" idPrefix="fb-foot" />
                  <span>Facebook</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="container-x footer-base">
        <p>
          © {f.year} {site.brand.name}. {site.brand.productOf}.
        </p>
      </div>
      {/* Decorative: the name is already in the logo's alt text above. */}
      <div className="container-x footer-mark-wrap" aria-hidden="true">
        <div className="footer-mark">
          <svg className="mark-layer mark-base" viewBox="0 0 1000 100" focusable="false">
            <text {...markText}>{f.wordmark.join("")}</text>
          </svg>
          <svg className="mark-layer mark-lit" viewBox="0 0 1000 100" focusable="false">
            <defs>
              <linearGradient id="mark-flat" gradientUnits="userSpaceOnUse" x1="0" y1="1.5" x2="0" y2={MARK.y.toFixed(2)}>
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.45" stopColor="#e7eef2" />
                <stop offset="0.52" stopColor="#9fb0c0" />
                <stop offset="0.62" stopColor="#d4dee5" />
                <stop offset="1" stopColor="#f6f9fb" />
              </linearGradient>
              <linearGradient id="mark-proof" gradientUnits="userSpaceOnUse" x1="0" y1="1.5" x2="0" y2={MARK.y.toFixed(2)}>
                <stop offset="0" stopColor="#7fdcea" />
                <stop offset="0.45" stopColor="#3fc1d6" />
                <stop offset="0.52" stopColor="#0192ab" />
                <stop offset="0.62" stopColor="#2db0c6" />
                <stop offset="1" stopColor="#6ad3e3" />
              </linearGradient>
            </defs>
            <text {...markText}>
              <tspan fill="url(#mark-flat)">{f.wordmark[0]}</tspan>
              <tspan fill="url(#mark-proof)">{f.wordmark[1]}</tspan>
            </text>
          </svg>
          <span className="mark-scan">
            <i />
          </span>
        </div>
        <FooterMarkMotion />
      </div>
    </footer>
  );
}
