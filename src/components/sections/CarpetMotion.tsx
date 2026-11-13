"use client";

import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";

const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// A line drawing that builds itself: walls draw with the scroll, dimension lines grow out from
// their labels, then the readout counts to the sample figures and the shortfall gets its cloud.
export function CarpetMotion() {
  const anchor = useScene(({ ST, section, desktop }) => {
    const q = gsap.utils.selector(section);
    const walls = q(".plan-walls path");
    const doors = q(".plan-doors path");
    const labels = q(".plan-labels text");
    const dims = q(".dim");
    const values = q(".readout dd") as HTMLElement[];
    const cloud = section.querySelector<SVGPathElement>(".deficit-cloud path");

    gsap.set(walls, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set([...doors, ...labels], { opacity: 0 });
    gsap.set(dims, { scale: 0, transformOrigin: "50% 50%", transformBox: "fill-box" });
    if (cloud) gsap.set(cloud, { strokeDashoffset: 1 });

    const draw = gsap.timeline({ defaults: { ease: "none" } });
    draw.to(walls, { strokeDashoffset: 0, duration: 1, stagger: 0.08 }, 0);
    draw.to(doors, { opacity: 1, duration: 0.2, stagger: 0.04 }, 0.7);
    draw.to(labels, { opacity: 1, duration: 0.2, stagger: 0.03 }, 0.8);
    draw.to(dims, { scale: 1, duration: 0.3, stagger: 0.12, ease: "power2.out" }, 1);

    const st = ST.create({
      trigger: section.querySelector(".plan"),
      start: "top 80%",
      end: desktop ? "bottom 60%" : "bottom 70%",
      scrub: true,
      animation: draw,
    });

    // Readout: count up once when it comes into view, then draw the cloud round the shortfall.
    const counters = values.map((el) => ({ el, to: Number(el.dataset.value), v: 0 }));
    const unitHtml = values.map((el) => el.querySelector(".readout-unit")?.outerHTML ?? "");
    const paint = () => counters.forEach((c, i) => (c.el.innerHTML = `${fmt(c.v)} ${unitHtml[i]}`));
    counters.forEach((c) => (c.v = 0));
    paint();
    const count = gsap.timeline({ paused: true });
    count.to(counters, { v: (i: number) => counters[i].to, duration: 1.1, ease: "power3.out", onUpdate: paint });
    if (cloud) count.to(cloud, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 0.9);
    const st2 = ST.create({ trigger: section.querySelector(".readout"), start: "top 82%", once: true, onEnter: () => count.play() });

    return () => {
      st.kill();
      st2.kill();
      draw.kill();
      count.kill();
      counters.forEach((c) => (c.v = c.to));
      paint();
      gsap.set([...walls, ...doors, ...labels, ...dims, ...(cloud ? [cloud] : [])], { clearProps: "all" });
    };
  });
  return <span ref={anchor} hidden />;
}
