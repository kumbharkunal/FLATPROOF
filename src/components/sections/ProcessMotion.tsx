"use client";

import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";

// The line that connects the steps fills as you read, and each number fills as the line reaches it
// (FP-D71). Desktop: the line runs across the number row and fills while that row crosses from 85% to
// 40% of the screen, so it reaches 3 while the row is still in view. Phones: the line runs down the
// steps with its tip held at 60% of the screen, so each number fills as it passes that point.
// The instruments slide into step 2 as they come into view.
export function ProcessMotion() {
  const anchor = useScene(({ ST, section, desktop }) => {
    const line = section.querySelector<HTMLElement>(".steps-line")!;
    const fill = section.querySelector<HTMLElement>(".steps-line-fill")!;
    const nums = Array.from(section.querySelectorAll<HTMLElement>(".step-num"));
    const tools = Array.from(section.querySelectorAll<HTMLElement>(".tool"));
    const axis = desktop ? "scaleX" : "scaleY";

    // Where each number sits along the line, 0 to 1 (the line stops at the edge of the last circle,
    // so its centre measures just past 1: the last number lights as the line arrives).
    let at: number[] = [];
    const measure = () => {
      const l = line.getBoundingClientRect();
      at = nums.map((n) => {
        const b = n.getBoundingClientRect();
        const p = desktop ? (b.left + b.width / 2 - l.left) / l.width : (b.top + b.height / 2 - l.top) / l.height;
        return Math.min(0.99, Math.max(0, p));
      });
    };
    const light = (p: number) => nums.forEach((n, i) => n.classList.toggle("on", p >= at[i] - 0.01));
    measure();

    gsap.set(fill, { [axis]: 0, transformOrigin: desktop ? "0% 50%" : "50% 0%" });
    const draw = gsap.to(fill, { [axis]: 1, ease: "none", paused: true });
    const st = ST.create({
      trigger: line,
      start: desktop ? "top 85%" : "top 60%",
      end: desktop ? "top 40%" : "bottom 60%",
      scrub: true,
      animation: draw,
      onUpdate: (self) => light(self.progress),
      onRefresh: (self) => {
        measure();
        light(self.progress);
      },
    });

    gsap.set(tools, { opacity: 0, x: -10 });
    const toolsIn = gsap.to(tools, { opacity: 1, x: 0, duration: 0.45, stagger: 0.08, ease: "power2.out", paused: true });
    const st2 = ST.create({
      trigger: section.querySelector(".tools"),
      start: "top 92%",
      onEnter: () => toolsIn.play(),
      onEnterBack: () => toolsIn.play(),
    });

    return () => {
      st.kill();
      st2.kill();
      draw.kill();
      toolsIn.kill();
      gsap.set([fill, ...tools], { clearProps: "all" });
      nums.forEach((n) => n.classList.remove("on"));
    };
  });
  return <span ref={anchor} hidden />;
}
