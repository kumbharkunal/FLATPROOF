"use client";

import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";

// The photo opens like a shutter; then, once the whole photo is on screen, each fault gets its
// revision cloud in turn (a, b, c) and the matching note badge lands as its cloud is drawn. The
// sequence is timed, not tied to scrolling, so (c) is never drawn after the photo has left the
// screen (FP-D71). The note text itself never dims.
export function CaseMotion() {
  const anchor = useScene(({ ST, section }) => {
    const q = gsap.utils.selector(section);
    const photo = section.querySelector<HTMLElement>(".case-photo")!;
    const clouds = q(".case-clouds path");
    const keys = q(".case-photo .case-key");
    const noteKeys = q(".case-note .case-key");

    gsap.set(photo, { clipPath: "inset(0 0 100% 0 round 16px)" });
    gsap.set(clouds, { strokeDashoffset: 1 });
    gsap.set(keys, { scale: 0, opacity: 0 });
    gsap.set(noteKeys, { scale: 0.6 });

    const reveal = gsap.to(photo, {
      clipPath: "inset(0 0 0% 0 round 16px)",
      duration: 0.9,
      ease: "power3.inOut",
      paused: true,
    });
    const st1 = ST.create({ trigger: photo, start: "top 85%", onEnter: () => reveal.play(), onEnterBack: () => reveal.play() });

    // Starts a beat after the shutter, so a jump straight to the case file still shows a, b, c in turn.
    const tl = gsap.timeline({ paused: true });
    clouds.forEach((c, i) => {
      const at = 0.3 + i * 0.6;
      tl.to(c, { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" }, at);
      tl.to(keys[i], { scale: 1, opacity: 1, duration: 0.22, ease: "back.out(2)" }, at + 0.32);
      tl.to(noteKeys[i], { scale: 1, duration: 0.22, ease: "back.out(2)" }, at + 0.22);
    });
    // When the photo's middle reaches 70% of the screen, the whole photo is in view on phones and
    // desktops alike.
    const st2 = ST.create({ trigger: photo, start: "center 70%", end: "bottom top", onEnter: () => tl.play(), onEnterBack: () => tl.play() });

    return () => {
      st1.kill();
      st2.kill();
      reveal.kill();
      tl.kill();
      gsap.set([photo, ...clouds, ...keys, ...noteKeys], { clearProps: "all" });
    };
  });
  return <span ref={anchor} hidden />;
}
