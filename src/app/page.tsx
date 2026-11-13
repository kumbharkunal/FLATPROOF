import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      {/* Sections land in M6 to M8 (docs/PROGRESS.md). Temporary grounds for nav-theme testing. */}
      <section id="stakes" data-nav="dark" className="section-y bg-ink text-paper">
        <div className="container-x type-h2">Stakes</div>
      </section>
      <section id="checks" data-nav="dark" className="section-y bg-navy text-paper">
        <div className="container-x type-h2">Checks</div>
      </section>
      <section id="process" data-nav="light" className="section-y bg-mist">
        <div className="container-x type-h2">How it works</div>
      </section>
      <section id="report" data-nav="light" className="section-y">
        <div className="container-x type-h2">Report</div>
      </section>
      <section id="services" data-nav="light" className="section-y bg-mist">
        <div className="container-x type-h2">Services</div>
      </section>
      <section id="faq" data-nav="light" className="section-y">
        <div className="container-x type-h2">FAQ</div>
      </section>
      <section id="book" data-nav="dark" className="section-y bg-navy text-paper">
        <div className="container-x type-h2">Book</div>
      </section>
    </main>
  );
}
