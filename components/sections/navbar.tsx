"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { LetterSwap } from "@/components/ui/letter-swap";
import { contactNav, nav, navMore, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

// Gaya mengikuti referensi dari pemilik project: menu huruf kapital font mono (Space Mono),
// link desktop tersusun dalam kolom 3 baris, dropdown "Lainnya" dengan kotak panah, dan
// tombol Contact Us biru bersudut tajam. Di bawah lg (1024px) diganti menu hamburger.
// Semua teks menu memakai LetterSwap: huruf bergulir acak saat kursor masuk.

type Item = { label: string; href: string; external?: boolean };

const moreItems: Item[] = [...navMore, { label: "WhatsApp", href: whatsappLink(), external: true }];
const mobileItems: Item[] = [...nav, ...moreItems];

const labelClass = "font-mono text-[0.8125rem] uppercase tracking-[0.06em]";
const ctaClass = cn(
  labelClass,
  "group inline-flex h-11 items-center justify-center gap-2 bg-primary px-5 text-primary-foreground transition-colors hover:bg-primary/90",
);

function ArrowBox({ external }: { external?: boolean }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <span
      aria-hidden="true"
      className="flex size-6 shrink-0 items-center justify-center border border-brand-navy/25 transition-colors group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white"
    >
      <Icon className="size-3.5" />
    </span>
  );
}

function MenuLink({
  item,
  onClick,
  className,
}: {
  item: Item;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}) {
  return (
    <a
      href={item.href}
      onClick={onClick}
      {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
      className={cn("group flex items-center justify-between gap-6 transition-colors", labelClass, className)}
    >
      <span>
        <LetterSwap label={item.label} />
        {item.external && <span className="sr-only"> (membuka di tab baru)</span>}
      </span>
      <ArrowBox external={item.external} />
    </a>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const pendingTarget = useRef<string | null>(null);
  const reduceMotion = useReducedMotion();

  const close = () => setOpen(false);
  const closeMore = () => setMoreOpen(false);

  // Link di menu HP: scroll baru dimulai setelah menu selesai menutup (onExitComplete).
  // Kalau bersamaan, tinggi menu yang menyusut menghentikan smooth-scroll browser di tempat.
  const navigateMobile = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    close();
    if (!href.startsWith("#")) return;
    event.preventDefault();
    pendingTarget.current = href;
  };
  const scrollToPending = () => {
    const href = pendingTarget.current;
    pendingTarget.current = null;
    if (!href) return;
    history.pushState(null, "", href);
    // behavior "auto" mengikuti CSS: smooth, atau langsung untuk prefers-reduced-motion.
    document.querySelector(href)?.scrollIntoView();
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Dropdown desktop: tutup dengan Escape (fokus kembali ke tombol) atau klik di luar.
  useEffect(() => {
    if (!moreOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMoreOpen(false);
      moreButtonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!moreRef.current?.contains(event.target as Node)) setMoreOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [moreOpen]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <nav
        aria-label="Navigasi utama"
        className="flex h-(--nav-h) items-center justify-between gap-8 px-page"
      >
        <a
          href="#hero"
          aria-label={`${site.name}, kembali ke atas`}
          onClick={(event) => {
            closeMore();
            if (open) navigateMobile(event, "#hero");
          }}
        >
          <Logo tagline={false} />
        </a>

        <div className="hidden items-center gap-12 lg:flex xl:gap-20">
          {/* Satu daftar, dialirkan per kolom 3 baris: urutan baca tetap Tentang → Lainnya. */}
          <ul className="grid grid-flow-col grid-rows-3 gap-x-12 xl:gap-x-16">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(labelClass, "flex h-6 items-center transition-colors hover:text-brand-blue")}
                >
                  <LetterSwap label={item.label} />
                </a>
              </li>
            ))}
            <li
              ref={moreRef}
              className="relative"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeMore();
              }}
            >
              <button
                ref={moreButtonRef}
                type="button"
                aria-expanded={moreOpen}
                aria-controls="menu-lainnya"
                onClick={() => setMoreOpen((value) => !value)}
                className={cn(
                  labelClass,
                  "flex h-6 items-center gap-1.5 transition-colors hover:text-brand-blue",
                  moreOpen && "text-brand-blue",
                )}
              >
                <LetterSwap label="Lainnya" />
                <ChevronDown
                  aria-hidden="true"
                  className={cn("size-3.5 transition-transform motion-reduce:transition-none", moreOpen && "rotate-180")}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    id="menu-lainnya"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-3 w-64 border bg-background shadow-[0_16px_40px_-16px_rgb(15_23_42/0.3)]"
                  >
                    <ul className="divide-y">
                      {moreItems.map((item) => (
                        <li key={item.href}>
                          <MenuLink
                            item={item}
                            onClick={closeMore}
                            className="h-12 px-4 hover:bg-brand-surface hover:text-brand-blue"
                          />
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>

          <a href={contactNav.href} className={ctaClass}>
            <LetterSwap label={contactNav.label} />
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
          </a>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
        </button>
      </nav>

      <AnimatePresence initial={false} onExitComplete={scrollToPending}>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t lg:hidden"
          >
            <div className="px-page py-4">
              <ul className="divide-y">
                {mobileItems.map((item) => (
                  <li key={item.href}>
                    <MenuLink
                      item={item}
                      onClick={(event) => navigateMobile(event, item.href)}
                      className="h-12 hover:text-brand-blue"
                    />
                  </li>
                ))}
              </ul>
              <a
                href={contactNav.href}
                onClick={(event) => navigateMobile(event, contactNav.href)}
                className={cn(ctaClass, "mt-4 w-full")}
              >
                <LetterSwap label={contactNav.label} />
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
