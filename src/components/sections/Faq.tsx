import { site } from "@/content/site";
import { FaqList } from "./FaqList";

// Verified answers only. Questions without a confirmed answer stay hidden (show: false) and are
// listed in CLIENT_QUESTIONS.md.
export function Faq() {
  const f = site.faq;
  const items = f.items.filter((i) => i.show).map(({ q, a }) => ({ q, a }));
  return (
    <section id="faq" className="faq section-y" data-nav="light" aria-labelledby="faq-title">
      <div className="container-x faq-grid">
        <h2 id="faq-title" className="type-h2 section-title faq-title">
          {f.title}
        </h2>
        <FaqList items={items} />
      </div>
    </section>
  );
}
