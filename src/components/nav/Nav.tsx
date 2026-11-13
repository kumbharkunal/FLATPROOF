"use client";

import { LazyMotion, m } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { site, waHref } from "@/content/site";
import { gsap, loadST } from "@/lib/gsap";
import { Logo } from "@/components/brand/Logo";
import { WaChip } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

// domMax (layout animations for the sliding indicator) loads after hydration.
const loadFeatures = () => import("motion/react").then((mod) => mod.domMax);
const NAV_LINE = 44; // px from the top: the pill's vertical centre, where the theme is sampled

export function Nav() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const focusInside = useRef(false);

  useEffect(() => {
    let dead = false;
    let ctx: gsap.Context | undefined;
    loadST().then((ST) => {
      if (dead) return;
      ctx = gsap.context(() => {
        // Theme: whichever section sits under the pill's centre line.
        gsap.utils.toArray<HTMLElement>("[data-nav]").forEach((sec) => {
          ST.create({
            trigger: sec,
            start: `top ${NAV_LINE}px`,
            end: `bottom ${NAV_LINE}px`,
            onToggle: (self) => {
              if (self.isActive) setTheme(sec.dataset.nav === "dark" ? "dark" : "light");
            },
          });
        });
        // Active link: the section crossing the middle of the viewport.
        for (const l of site.nav.links) {
          const id = l.href.slice(1);
          const el = document.getElementById(id);
          if (!el) continue;
          ST.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => setActive((cur) => (self.isActive ? id : cur === id ? null : cur)),
          });
        }
        // Hide on scroll down after the hero; return on any scroll up.
        let last = 0;
        ST.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const pastHero = self.scroll() > (document.getElementById("top")?.offsetHeight ?? innerHeight) * 0.9;
            const dir = self.direction;
            const next = pastHero && dir === 1 && !focusInside.current;
            if (dir !== last || !pastHero) {
              last = dir;
              setHidden(next);
            }
          },
        });
      });
    });
    return () => {
      dead = true;
      ctx?.revert();
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <LazyMotion features={loadFeatures}>
      <header
        ref={header}
        className="nav"
        data-theme={theme}
        data-hidden={hidden && !open ? "true" : "false"}
        onFocus={() => {
          focusInside.current = true;
          setHidden(false);
        }}
        onBlur={(e) => {
          if (!header.current?.contains(e.relatedTarget as Node)) focusInside.current = false;
        }}
      >
        <div className="nav-pill">
          <a href="#top" className="nav-brand" aria-label={site.nav.home} data-cursor="Top">
            <Logo height={38} both eager />
          </a>
          <nav aria-label="Main" className="nav-links">
            {site.nav.links.map((l) => {
              const id = l.href.slice(1);
              return (
                <a key={l.href} href={l.href} className="nav-link" aria-current={active === id ? "location" : undefined}>
                  {active === id && (
                    <m.span
                      layoutId="nav-active"
                      className="nav-indicator"
                      transition={{ type: "spring", stiffness: 520, damping: 42 }}
                    />
                  )}
                  {l.label}
                </a>
              );
            })}
          </nav>
          <div className="nav-cta">
            <a
              href={waHref("book")}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="WhatsApp"
            >
              <WaChip />
              <span>{site.nav.cta}</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <a
            href={waHref("book")}
            className="btn btn-primary nav-book nav-mobile-only"
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.nav.ctaShort}
            <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
          </a>
          <button
            ref={menuBtn}
            type="button"
            className="nav-menu-btn nav-mobile-only"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{site.nav.open}</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>
      <MobileMenu open={open} onClose={close} returnFocus={menuBtn} />
    </LazyMotion>
  );
}
