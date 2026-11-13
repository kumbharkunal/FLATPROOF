"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, loadST } from "@/lib/gsap";
import { ANCHOR_EVENT } from "@/lib/scroll";
import { Logo } from "@/components/brand/Logo";
import { WaChip } from "@/components/ui/WaChip";
import type { MobileMenu as MobileMenuType } from "./MobileMenu";

// The phone menu (and Motion's exit animations) load on first open, prefetched when idle.
const importMenu = () => import("./MobileMenu").then((mod) => mod.MobileMenu);
const MobileMenu = dynamic(importMenu, { ssr: false }) as typeof MobileMenuType;

const NAV_LINE = 44; // px from the top: the pill's vertical centre, where the theme is sampled

export type NavData = {
  links: { label: string; href: string }[];
  cta: string;
  ctaShort: string;
  open: string;
  close: string;
  home: string;
  bookHref: string;
  phone: { display: string; href: string };
  instagram: string;
};

export function NavClient({ data }: { data: NavData }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const focusInside = useRef(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const linksRef = useRef<HTMLElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  // After an in-page link (goTo announces it), the pill stays put through the smooth scroll, so the
  // reader arrives with the nav in view instead of an empty band where it was.
  const holdUntil = useRef(0);
  useEffect(() => {
    const onAnchor = () => {
      holdUntil.current = performance.now() + 1600;
      setHidden(false);
    };
    window.addEventListener(ANCHOR_EVENT, onAnchor);
    return () => window.removeEventListener(ANCHOR_EVENT, onAnchor);
  }, []);

  // Sliding active-link indicator: one pill that FLIPs to the active link with the Web Animations
  // API (transform only). Keeps Motion out of first-load JS (FP-D44).
  useEffect(() => {
    const nav = linksRef.current;
    const ind = indicator.current;
    if (!nav || !ind) return;
    const link = active ? nav.querySelector<HTMLElement>(`a[href="#${active}"]`) : null;
    if (!link) {
      ind.style.opacity = "0";
      return;
    }
    const x = link.offsetLeft;
    const w = link.offsetWidth;
    const prev = ind.dataset.w ? { x: Number(ind.dataset.x), w: Number(ind.dataset.w) } : null;
    const wasShown = ind.style.opacity === "1";
    ind.style.width = `${w}px`;
    ind.style.transform = `translateX(${x}px)`;
    ind.style.opacity = "1";
    if (prev && wasShown && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ind.animate(
        [{ transform: `translateX(${prev.x}px) scaleX(${prev.w / w})` }, { transform: `translateX(${x}px) scaleX(1)` }],
        { duration: 420, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );
    }
    ind.dataset.x = String(x);
    ind.dataset.w = String(w);
  }, [active]);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2000));
    const id = idle(() => void importMenu());
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id);
  }, []);

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
        for (const l of data.links) {
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
            if (performance.now() < holdUntil.current) {
              last = 0;
              return;
            }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
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
          <a href="#top" className="nav-brand" aria-label={data.home} data-cursor="Top">
            <Logo height={38} both eager />
          </a>
          <nav aria-label="Main" className="nav-links" ref={linksRef}>
            <span ref={indicator} className="nav-indicator" aria-hidden="true" style={{ opacity: 0 }} />
            {data.links.map((l) => {
              const id = l.href.slice(1);
              return (
                <a key={l.href} href={l.href} className="nav-link" aria-current={active === id ? "location" : undefined}>
                  {l.label}
                </a>
              );
            })}
          </nav>
          <div className="nav-cta">
            <a
              href={data.bookHref}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="WhatsApp"
            >
              <WaChip />
              <span>{data.cta}</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <a
            href={data.bookHref}
            className="btn btn-primary nav-book nav-mobile-only"
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.ctaShort}
            <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
          </a>
          <button
            ref={menuBtn}
            type="button"
            className="nav-menu-btn nav-mobile-only"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
              setMenuMounted(true);
              setOpen((v) => !v);
            }}
          >
            <span className="sr-only">{data.open}</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>
      {menuMounted && <MobileMenu open={open} onClose={close} returnFocus={menuBtn} data={data} />}
    </>
  );
}
