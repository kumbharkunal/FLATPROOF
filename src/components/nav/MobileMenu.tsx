"use client";

import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useRef, type RefObject } from "react";
import type { NavData } from "./NavClient";
import { goTo } from "@/lib/scroll";
import { EASE } from "@/lib/motion";
import { Logo } from "@/components/brand/Logo";
import { WaChip } from "@/components/ui/WaChip";
import { InstagramIcon } from "@/components/brand-icons/instagram";

const SPRING = { type: "spring", stiffness: 420, damping: 38 } as const;
const PILL = "inset(0px 0px calc(100% - 64px) 0px round 32px)";
const FULL = "inset(0px 0px 0% 0px round 28px)";

type Props = { open: boolean; onClose: () => void; returnFocus: RefObject<HTMLButtonElement | null>; data: NavData };

// Modal dialog that grows out of the nav pill (clip-path only; the blur never animates).
export function MobileMenu({ open, onClose, returnFocus, data }: Props) {
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const sheet = useRef<HTMLDivElement>(null);
  const pending = useRef<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const opener = returnFocus.current;
    lenis?.stop();
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    sheet.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !sheet.current) return;
      const items = Array.from(sheet.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    // Rotation or a desktop-width resize closes the sheet (the full nav takes over).
    const mq = matchMedia("(min-width: 1024px)");
    const onWide = () => mq.matches && onClose();
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
      html.style.overflow = prevOverflow;
      lenis?.start();
      if (pending.current) {
        const hash = pending.current;
        pending.current = null;
        requestAnimationFrame(() => goTo(hash, lenis));
      } else {
        opener?.focus();
      }
    };
  }, [open, lenis, onClose, returnFocus]);

  const onLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    pending.current = href;
    onClose();
  };

  const d = reduce ? 0 : 1;

  return (
    <LazyMotion features={domAnimation}>
    <AnimatePresence>
      {open && (
        <>
          <m.div
            key="overlay"
            className="menu-overlay"
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 * d } }}
            exit={{ opacity: 0, transition: { duration: 0.2 * d } }}
          />
          <m.div
            key="sheet"
            id="mobile-menu"
            ref={sheet}
            className="menu-sheet"
            data-theme="dark"
            data-nav="dark"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduce ? { opacity: 0 } : { clipPath: PILL }}
            animate={reduce ? { opacity: 1 } : { clipPath: FULL, transition: { duration: 0.44, ease: EASE.out } }}
            exit={reduce ? { opacity: 0 } : { clipPath: PILL, transition: { duration: 0.3, ease: EASE.out } }}
          >
            <div className="menu-head">
              <span aria-hidden="true">
                <Logo height={36} dark />
              </span>
              <button type="button" className="nav-menu-btn" onClick={onClose}>
                <span className="sr-only">{data.close}</span>
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav aria-label="Menu" className="menu-links">
              {data.links.map((l, i) => (
                <m.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => onLink(e, l.href)}
                  initial={{ opacity: 0, y: 14 * d }}
                  animate={{ opacity: 1, y: 0, transition: { ...SPRING, delay: d * (0.1 + i * 0.04) } }}
                >
                  {l.label}
                </m.a>
              ))}
            </nav>
            <m.div
              className="menu-contact"
              initial={{ opacity: 0, y: 12 * d }}
              animate={{ opacity: 1, y: 0, transition: { ...SPRING, delay: d * 0.32 } }}
            >
              <a href={data.bookHref} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                <WaChip />
                <span>{data.cta}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <div className="row">
                <a href={data.phone.href} className="btn btn-secondary-dark">
                  Call {data.phone.display}
                </a>
                <a href={data.instagram} className="btn btn-secondary-dark" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="size-5" idPrefix="ig-menu" />
                  <span>Instagram</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </m.div>
          </m.div>
        </>
      )}
    </AnimatePresence>
    </LazyMotion>
  );
}
