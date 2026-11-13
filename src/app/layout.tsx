import type { Metadata, Viewport } from "next";
import { Zalando_Sans } from "next/font/google";
import localFont from "next/font/local";
import { site, waHref } from "@/content/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Nav } from "@/components/nav/Nav";
import { Cursor } from "@/components/cursor/Cursor";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/sections/Footer";
import "./globals.css";
import "./sections.css";

// One variable family: width 125 for display, 100 for text (FP-D3).
const zalando = Zalando_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-zalando",
});

// Zalando Sans has no ₹. This 2.7 KB file holds only U+20B9 (Hind SemiBold, OFL), so the
// browser falls back to it for the rupee sign alone (FP-D35).
const rupee = localFont({
  src: "../fonts/rupee-hind-600.woff2",
  weight: "600",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  variable: "--font-rupee",
  declarations: [{ prop: "unicode-range", value: "U+20B9" }],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  applicationName: site.brand.name,
  robots: site.seo.noindex ? { index: false, follow: false } : undefined,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.seo.url,
    siteName: site.brand.name,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${zalando.variable} ${rupee.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          {site.nav.skip}
        </a>
        <SmoothScroll />
        <Nav />
        {children}
        <Footer />
        <FloatingWhatsApp href={waHref("book")} label={site.floatingWa.label} />
        <Cursor />
      </body>
    </html>
  );
}
