"use client";

import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";

// The line that connects the steps draws as you scroll; each number fills as the line reaches it,
// and the instruments slide into step 2 as the line passes.
export function ProcessMotion() {
  const anchor = useScene(({ ST, section, desktop }) => {
    const q = gsap.utils.selector(section);
    const fill = section.querySelector<HTMLElement>(".steps-line-fill")!;
    const nums = q(".step-num");
    const tools = q(".tool");
    const axis = desktop ? "scaleX" : "scaleY";

    gsap.set(fill, { [axis]: 0, transformOrigin: desktop ? "0% 50%" : "50% 0%" });
    gsap.set(tools, { opacity: 0, x: -10 });

    const tl = gsap.timeline({ defaults: { ease: "none" } });
    tl.to(fill, { [axis]: 1, duration: 1 }, 0);
    tl.to(tools, { opacity: 1, x: 0, duration: 0.12, stagger: 0.05, ease: "power2.out" }, 0.45);

    const st = ST.create({
      trigger: section.querySelector(".steps"),
      start: desktop ? "top 72%" : "top 80%",
      end: desktop ? "bottom 70%" : "bottom 60%",
      scrub: true,
      animation: tl,
      onUpdate: (self) => {
        nums.forEach((n, i) => n.classList.toggle("on", self.progress >= (i / (nums.length - 1)) * 0.98));
      },
    });

    return () => {
      st.kill();
      tl.kill();
      gsap.set([fill, ...tools], { clearProps: "all" });
      nums.forEach((n) => n.classList.remove("on"));
    };
  });
  return <span ref={anchor} hidden />;
}
