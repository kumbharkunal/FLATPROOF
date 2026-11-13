import { EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { fill } from "@/lib/fill";
import { Photo } from "@/components/ui/Photo";
import { Button, WhatsAppButton } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/brand-icons/instagram";

// Book before you sign: every way to reach them, with WhatsApp first.
export function FinalCta() {
  const c = site.cta;
  const ct = site.contact;
  return (
    <section id="book" className="cta section-y" data-nav="dark" aria-labelledby="cta-title">
      <div className="container-x cta-grid">
        <div className="cta-copy">
          <h2 id="cta-title" className="type-h1 cta-title">
            {c.title}
          </h2>
          <p className="type-lead cta-body">{c.body}</p>
          <div className="cta-actions">
            <WhatsAppButton wa={c.primary.wa}>{c.primary.label}</WhatsAppButton>
            <Button href={ct.phone.href} variant="secondary-dark" icon={<PhoneIcon size={20} weight="regular" aria-hidden="true" />}>
              {c.call} {ct.phone.display}
            </Button>
          </div>
          <ul className="cta-more">
            <li>
              <a href={ct.email.href} className="cta-link">
                <EnvelopeSimpleIcon size={20} weight="regular" aria-hidden="true" />
                <span>{ct.email.display}</span>
              </a>
            </li>
            <li>
              <a href={ct.instagram.dmHref} className="cta-link" target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="size-5" idPrefix="ig-cta" />
                <span>{fill(c.dm, { keyword: ct.instagram.dmKeyword })}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
          <address className="cta-address">
            {ct.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
        </div>
        <Photo slot="handover-couple" sizes="(max-width: 1023px) 100vw, 40vw" tone="ink" className="cta-photo" />
      </div>
    </section>
  );
}
