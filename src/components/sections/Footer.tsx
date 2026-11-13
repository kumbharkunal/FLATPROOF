import { site, waHref } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { InstagramIcon } from "@/components/brand-icons/instagram";
import { FacebookIcon } from "@/components/brand-icons/facebook";

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
    </footer>
  );
}
