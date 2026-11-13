"use client";

import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";

const COUNTS = [28, 32, 38, 27];
const TOTAL = 125;

// The tape measures out to 125: segments fill in order, the odometer rolls with them (and back
// when you scroll up), and each trade's checks arrive as its segment completes. Pinned on tall
// desktop screens; scrubbed without a pin everywhere else.
export function ChecksMotion() {
  const anchor = useScene(({ ST, section, desktop }) => {
    const pinEl = section.querySelector<HTMLElement>(".checks-pin")!;
    const q = gsap.utils.selector(section);
    const segs = q(".tape-seg");
    const ticks = section.querySelector<SVGElement>(".tape-ticks svg")!;
    const nums = q(".tape-num");
    const strips = q(".odo-strip") as HTMLElement[];
    const cols = q(".check-col");

    const setOdo = (v: number) => {
      const s = String(Math.round(v)).padStart(strips.length, "0");
      strips.forEach((el, i) => el.style.setProperty("--d", s[i]));
    };

    gsap.set(segs, { scaleX: 0, transformOrigin: "0% 50%" });
    gsap.set(ticks, { clipPath: "inset(0 100% 0 0)" });
    gsap.set(nums, { opacity: 0 });
    cols.forEach((c) => gsap.set(c.querySelectorAll(".check-col-head, li"), { opacity: 0, y: 12 }));
    setOdo(0);

    const state = { v: 0 };
    const tl = gsap.timeline({ defaults: { ease: "none" } });
    let at = 0;
    segs.forEach((seg, i) => {
      const d = COUNTS[i] / TOTAL;
      tl.to(seg, { scaleX: 1, duration: d }, at);
      tl.to(cols[i]?.querySelectorAll(".check-col-head, li") ?? [], { opacity: 1, y: 0, duration: 0.1, stagger: 0.025, ease: "power2.out" }, at + d * 0.55);
      at += d;
    });
    tl.to(ticks, { clipPath: "inset(0 0% 0 0)", duration: 1 }, 0);
    tl.to(state, { v: TOTAL, duration: 1, onUpdate: () => setOdo(state.v) }, 0);
    nums.forEach((n, i) => tl.to(n, { opacity: 1, duration: 0.03 }, (i * 25) / TOTAL));

    const tall = desktop && window.innerHeight >= 860;
    const st = tall
      ? ST.create({ trigger: pinEl, start: "top top+=84", end: "+=120%", pin: true, scrub: true, animation: tl, anticipatePin: 1 })
      : ST.create({ trigger: section.querySelector(".tape"), start: "top 88%", end: desktop ? "top 30%" : "top 40%", scrub: true, animation: tl });

    return () => {
      st.kill();
      tl.kill();
      gsap.set([...segs, ticks, ...nums, ...cols.flatMap((c) => [...c.querySelectorAll(".check-col-head, li")])], { clearProps: "all" });
      setOdo(TOTAL);
    };
  });
  return <span ref={anchor} hidden />;
}
