"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/format";

const SCROLL_THRESHOLD = 80;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll, focus the panel, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panel) {
        const items = Array.from(panel.querySelectorAll<HTMLElement>("a, button"));
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <header className="pointer-events-none sticky top-0 z-50 h-[var(--nav-height)]">
      <div
        className={cn(
          "pointer-events-auto mx-auto flex items-center justify-between gap-6 transition-all duration-300 ease-out",
          scrolled
            ? "mt-3 h-[52px] w-[calc(100%-2rem)] max-w-[960px] rounded-lg border border-line bg-surface/80 pl-4 pr-1.5 shadow-float backdrop-blur-md"
            : "h-[var(--nav-height)] w-full max-w-content border border-transparent bg-transparent px-4 sm:px-6 lg:px-8",
        )}
      >
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn(
                    "rounded-pill px-3 py-2 text-sm transition-colors hover:bg-ink/5",
                    isActive(l.href) ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href={nav.login.href} className="rounded-pill px-3 py-2 text-sm text-muted transition-colors hover:text-ink">
            {nav.login.label}
          </Link>
          <ButtonLink href={nav.cta.href} size="sm">
            {nav.cta.label}
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <MenuIcon />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="pointer-events-auto fixed inset-0 z-[60] flex flex-col bg-bg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex h-[var(--nav-height)] items-center justify-between px-4 sm:px-6">
              <Logo onClick={() => setOpen(false)} />
              <button
                type="button"
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
              >
                <CloseIcon />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-between px-4 pb-8 pt-4 sm:px-6">
              <ul className="divide-y divide-line border-y border-line">
                {nav.links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    data-reveal
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i + 0.05 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-5 font-display text-2xl font-heading tracking-tight"
                    >
                      {l.label}
                      <span aria-hidden className="font-mono text-xs text-muted">
                        /0{i + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 grid gap-3">
                <ButtonLink href={nav.cta.href} size="lg" onClick={() => setOpen(false)}>
                  {nav.cta.label}
                </ButtonLink>
                <ButtonLink href={nav.login.href} size="lg" variant="secondary" onClick={() => setOpen(false)}>
                  {nav.login.label}
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
