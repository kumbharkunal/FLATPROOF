"use client";

import { useEffect, useRef } from "react";

// Desktop: hovering or focusing a service row swaps the docked preview (CSS crossfade).
export function ServicesHover() {
  const anchor = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const section = anchor.current?.closest("section");
    if (!section) return;
    const rows = Array.from(section.querySelectorAll<HTMLElement>(".svc-row"));
    const frames = Array.from(section.querySelectorAll<HTMLElement>(".svc-frame"));
    const activate = (id: string) => {
      rows.forEach((r) => (r.dataset.active = r.dataset.id === id ? "true" : "false"));
      frames.forEach((f) => (f.dataset.active = f.dataset.id === id ? "true" : "false"));
    };
    const handlers = rows.map((r) => {
      const on = () => activate(r.dataset.id!);
      r.addEventListener("pointerenter", on);
      r.addEventListener("focusin", on);
      return () => {
        r.removeEventListener("pointerenter", on);
        r.removeEventListener("focusin", on);
      };
    });
    return () => handlers.forEach((off) => off());
  }, []);
  return <span ref={anchor} hidden />;
}
