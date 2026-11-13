"use client";

import { useEffect, useState } from "react";
import { site, waHref } from "@/content/site";
import { gsap, loadST } from "@/lib/gsap";
import { WhatsappIcon } from "@/components/brand-icons/whatsapp";

// Appears once the hero has scrolled away; hides while the closing call to action is on screen.
export function FloatingWhatsApp() {
  const [pastHero, setPastHero] = useState(false);
  const [atClose, setAtClose] = useState(false);

  useEffect(() => {
    let dead = false;
    let ctx: gsap.Context | undefined;
    loadST().then((ST) => {
      if (dead) return;
      ctx = gsap.context(() => {
        ST.create({
          trigger: "#top",
          start: "bottom 30%",
          onEnter: () => setPastHero(true),
          onLeaveBack: () => setPastHero(false),
        });
        ST.create({
          trigger: "#book",
          start: "top bottom",
          end: "bottom top",
          onToggle: (s) => setAtClose(s.isActive),
        });
      });
    });
    return () => {
      dead = true;
      ctx?.revert();
    };
  }, []);

  const visible = pastHero && !atClose;
  return (
    <a
      href={waHref("book")}
      className="float-wa"
      data-visible={visible ? "true" : "false"}
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? undefined : -1}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="WhatsApp"
    >
      <WhatsappIcon className="size-7" idPrefix="wa-float" />
      <span className="float-wa-label" aria-hidden="true">
        {site.floatingWa.label}
      </span>
      <span className="sr-only">{site.floatingWa.label} (opens in a new tab)</span>
    </a>
  );
}
