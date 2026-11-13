import { site } from "@/content/site";
import { StakesMotion } from "./StakesMotion";

// Why now: every flat looks perfect on handover day, and the possession letter is the leverage.
export function Stakes() {
  const s = site.stakes;
  return (
    <section id="stakes" className="stakes section-y" data-nav="dark" aria-labelledby="stakes-title">
      <div className="container-x stakes-grid">
        <h2 id="stakes-title" className="type-h2 stakes-title">
          {s.title}
        </h2>
        <p className="type-statement stakes-body">
          {s.body.map((part, i) =>
            "mark" in part && part.mark ? (
              <span key={i} className="mark">
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>
      </div>
      <StakesMotion />
    </section>
  );
}
