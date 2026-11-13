import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlatProof Inspections",
  description: "Pre-possession flat inspection in Pune and PCMC.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
