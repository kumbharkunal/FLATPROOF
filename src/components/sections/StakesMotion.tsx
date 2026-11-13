"use client";

import { gsap, loadSplit } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";

// Words brighten as the statement passes through the viewport (scrubbed); each marked defect
// gets its amber underline once it is lit.
export function StakesMotion() {
  const anchor = useScene(({ ST, section }) => {
    const body = section.querySelector<HTMLElement>(".stakes-body")!;
    let split: { revert: () => void } | null = null;
    let tl: gsap.core.Timeline | null = null;
    const marks: ReturnType<typeof ST.create>[] = [];
    let dead = false;
    loadSplit().then((SplitText) => {
      if (dead) return;
      const s = SplitText.create(body, { type: "words", wordsClass: "w", tag: "span", aria: "none" });
      split = s;
      gsap.set(s.words, { opacity: 0.38 });
      tl = gsap.timeline({
        scrollTrigger: { trigger: body, start: "top 80%", end: "bottom 62%", scrub: true },
      });
      tl.to(s.words, { opacity: 1, ease: "none", stagger: 0.12, duration: 0.6 });
      section.querySelectorAll<HTMLElement>(".mark").forEach((m) => {
        marks.push(
          ST.create({
            trigger: m,
            start: "top 58%",
            onEnter: () => m.classList.add("lit"),
            onLeaveBack: () => m.classList.remove("lit"),
          }),
        );
      });
      ST.refresh();
    });
    return () => {
      dead = true;
      marks.forEach((t) => t.kill());
      tl?.scrollTrigger?.kill();
      tl?.kill();
      split?.revert();
      section.querySelectorAll(".mark").forEach((m) => m.classList.remove("lit"));
    };
  });
  return <span ref={anchor} hidden />;
}
