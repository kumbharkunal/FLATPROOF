"use client";

import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";

// The wordmark at the foot of the page: once it is in view, a teal scan line sweeps across it and
// lights the letters as it passes (FLAT in silver, PROOF in teal), the thermal-scan idea of the hero.
// Time-based rather than scroll-scrubbed: the page ends too soon after the wordmark appears for a
// smooth scrub. It replays after scrolling back up past it. Reduced motion: the lit wordmark, still.
export function FooterMarkMotion() {
  const anchor = useScene(({ ST, section }) => {
    const mark = section.querySelector<HTMLElement>(".footer-mark")!;
    const lit = mark.querySelector<SVGSVGElement>(".mark-lit")!;
    const scan = mark.querySelector<HTMLElement>(".mark-scan")!;

    gsap.set(lit, { clipPath: "inset(0 100% 0 0)" });
    gsap.set(scan, { xPercent: 0, opacity: 0 });

    const sweep = 1.7;
    const tl = gsap
      .timeline({ paused: true, defaults: { ease: "power2.inOut" } })
      .fromTo(lit, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: sweep }, 0)
      // The scan track is as wide as the wordmark, so xPercent 100 puts the line on its right edge.
      .fromTo(scan, { xPercent: 0 }, { xPercent: 100, duration: sweep }, 0)
      .fromTo(scan, { opacity: 0 }, { opacity: 1, duration: 0.18, ease: "none" }, 0)
      .to(scan, { opacity: 0, duration: 0.3, ease: "none" }, sweep - 0.3);

    const st = ST.create({
      trigger: mark,
      start: "top 92%",
      onEnter: () => tl.restart(),
      onLeaveBack: () => {
        tl.pause(0);
      },
    });

    return () => {
      st.kill();
      tl.kill();
      gsap.set([lit, scan], { clearProps: "all" });
    };
  });
  return <span ref={anchor} hidden />;
}
