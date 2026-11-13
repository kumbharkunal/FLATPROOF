"use client";

import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";

// The report assembles: the sheet rises, then each finding settles onto it like paper and its
// severity tag lands. Scrubbed on desktop, played once on phones.
export function ReportMotion() {
  const anchor = useScene(({ ST, section, desktop }) => {
    const q = gsap.utils.selector(section);
    const sheet = section.querySelector<HTMLElement>(".sheet")!;
    const findings = q(".finding");
    const tags = q(".sev-tag");

    gsap.set(sheet, { y: 48, opacity: 0 });
    gsap.set(findings, { y: 56, opacity: 0, rotation: -1.2, transformOrigin: "0% 0%" });
    gsap.set(tags, { scale: 1.12, opacity: 0 });

    const tl = gsap.timeline();
    tl.to(sheet, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
    findings.forEach((f, i) => {
      tl.to(f, { y: 0, opacity: 1, rotation: 0, duration: 0.5, ease: "power3.out" }, 0.35 + i * 0.32);
      tl.to(tags[i], { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)" }, 0.6 + i * 0.32);
    });

    const st = desktop
      ? ST.create({ trigger: sheet, start: "top 85%", end: "bottom 75%", scrub: true, animation: tl })
      : ST.create({ trigger: sheet, start: "top 82%", animation: tl, toggleActions: "play none none none" });

    return () => {
      st.kill();
      tl.kill();
      gsap.set([sheet, ...findings, ...tags], { clearProps: "all" });
    };
  });
  return <span ref={anchor} hidden />;
}
