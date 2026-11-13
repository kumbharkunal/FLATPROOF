import { site, waHref } from "@/content/site";
import { NavClient, type NavData } from "./NavClient";

// Server wrapper: hands the client nav only the strings it needs (keeps site.ts out of client JS).
export function Nav() {
  const data: NavData = {
    links: site.nav.links.map((l) => ({ ...l })),
    cta: site.nav.cta,
    ctaShort: site.nav.ctaShort,
    open: site.nav.open,
    close: site.nav.close,
    home: site.nav.home,
    bookHref: waHref("book"),
    phone: { ...site.contact.phone },
    instagram: site.contact.instagram.href,
  };
  return <NavClient data={data} />;
}
