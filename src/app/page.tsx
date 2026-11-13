import { Hero } from "@/components/hero/Hero";
import { Stakes } from "@/components/sections/Stakes";
import { Checks } from "@/components/sections/Checks";
import { Process } from "@/components/sections/Process";
import { Report } from "@/components/sections/Report";
import { CarpetArea } from "@/components/sections/CarpetArea";
import { CaseFile } from "@/components/sections/CaseFile";
import { Services } from "@/components/sections/Services";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

// Beneath the finish: the bright surface (hero), what hides under it (stakes, checks), how it is
// found (process), the proof (report, carpet area, case file), then everything else and booking.
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Stakes />
      <Checks />
      <Process />
      <Report />
      <CarpetArea />
      <CaseFile />
      <Services />
      <Faq />
      <FinalCta />
    </main>
  );
}
