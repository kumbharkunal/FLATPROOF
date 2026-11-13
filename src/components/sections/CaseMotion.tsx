"use client";

import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";

// The photo opens like a shutter, then each fault gets its revision cloud in turn, and the
// matching note brightens as its cloud is drawn.
export function CaseMotion() {
  const anchor = useScene(({ ST, section, desktop }) => {
    const q = gsap.utils.selector(section);
    const photo = section.querySelector<HTMLElement>(".case-photo")!;
    const clouds = q(".case-clouds path");
    const keys = q(".case-photo .case-key");
    const notes = q(".case-note");

    gsap.set(photo, { clipPath: "inset(0 0 100% 0 round 16px)" });
    gsap.set(clouds, { strokeDashoffset: 1 });
    gsap.set(keys, { scale: 0, opacity: 0 });
    gsap.set(notes, { opacity: 0.4 });

    const reveal = gsap.to(photo, {
      clipPath: "inset(0 0 0% 0 round 16px)",
      duration: 0.9,
      ease: "power3.inOut",
      paused: true,
    });
    const st1 = ST.create({ trigger: photo, start: "top 80%", once: true, onEnter: () => reveal.play() });

    const tl = gsap.timeline();
    clouds.forEach((c, i) => {
      const at = i * 0.5;
      tl.to(c, { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut" }, at);
      tl.to(keys[i], { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(2)" }, at + 0.3);
      tl.to(notes[i], { opacity: 1, duration: 0.2 }, at + 0.2);
    });
    const st2 = desktop
      ? ST.create({ trigger: photo, start: "top 55%", end: "bottom 45%", scrub: true, animation: tl })
      : ST.create({ trigger: photo, start: "top 60%", animation: tl, toggleActions: "play none none none" });

    return () => {
      st1.kill();
      st2.kill();
      reveal.kill();
      tl.kill();
      gsap.set([photo, ...clouds, ...keys, ...notes], { clearProps: "all" });
    };
  });
  return <span ref={anchor} hidden />;
}
