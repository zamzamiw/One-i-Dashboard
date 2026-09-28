"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { switchLanguage } from "@/components/language-transition";
import { Logo } from "@/components/logo";
import { LetterSwap } from "@/components/ui/letter-swap";
import { localeHref, localeNames, locales, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { contactHref, nav, navMore, site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Gaya mengikuti referensi dari pemilik project: menu huruf kapital font mono (Space Mono),
// link desktop dalam satu baris berjarak rata (tata letak ala Kortrijk Xpo), dropdown
// "Lainnya" dengan kotak panah, dan tombol Contact Us biru bersudut tajam. Di bawah lg (1024px) diganti menu hamburger.
// Semua teks menu memakai LetterSwap: huruf bergulir acak saat kursor masuk.
// Tombol ganti bahasa tampil di semua ukuran layar (di HP: di samping tombol menu).

type Item = { label: string; href: string; external?: boolean };

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
  newTab,
  onClick,
  className,
}: {
  item: Item;
  newTab: string;
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
        {item.external && <span className="sr-only"> {newTab}</span>}
      </span>
      <ArrowBox external={item.external} />
    </a>
  );
}

// Tombol ganti bahasa (keputusan pemilik project): saklar ID/EN. Indonesia = tombol putih dengan
// penanda biru di kiri; Inggris = tombol biru dengan penanda putih di kanan. Saat diklik, saklar
// langsung bergeser ke bahasa tujuan (warna berganti halus) sementara layar transisi biru
// menutupi halaman (components/language-transition.tsx). Tetap berupa link biasa: tanpa
// JavaScript, atau dengan Ctrl/Cmd+klik, halaman bahasa lain dibuka seperti link biasa.
function LanguageToggle({ locale, label }: { locale: Locale; label: string }) {
  const target: Locale = locale === "id" ? "en" : "id";
  const [pending, setPending] = useState(false);
  const english = (pending ? target : locale) === "en";

  // Kembali lewat tombol Back (bfcache): tampilkan lagi bahasa halaman ini.
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) setPending(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const smooth = "duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none";

  return (
    <a
      href={localeHref(target)}
      hrefLang={target}
      lang={target}
      aria-label={`${label} ${localeNames[target].full} (${localeNames[target].short})`}
      onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        if (pending) return;
        setPending(true);
        switchLanguage(localeHref(target));
      }}
      className="group inline-flex h-11 items-center"
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative grid h-8 w-[4.5rem] grid-cols-2 border-2 transition-colors",
          smooth,
          english ? "border-brand-blue bg-brand-blue" : "border-brand-navy/15 bg-white group-hover:border-brand-blue/50",
        )}
      >
        <span
          className={cn(
            "absolute inset-y-0 left-0 w-1/2 transition-[translate,background-color]",
            smooth,
            english ? "translate-x-full bg-white" : "translate-x-0 bg-brand-blue",
          )}
        />
        {locales.map((option) => (
          <span
            key={option}
            className={cn(
              "relative flex items-center justify-center font-mono text-xs tracking-[0.06em] transition-colors",
              smooth,
              option === "id" ? "text-white" : english ? "text-brand-blue" : "text-muted-foreground",
            )}
          >
            {localeNames[option].short}
          </span>
        ))}
      </span>
    </a>
  );
}

export function Navbar({
  t,
  newTab,
  locale,
  whatsappHref,
}: {
  t: Dictionary["nav"];
  newTab: string;
  locale: Locale;
  whatsappHref: string;
}) {
  const navItems: Item[] = nav.map((anchor) => ({ label: t.links[anchor], href: `#${anchor}` }));
  const moreItems: Item[] = [
    ...navMore.map((anchor) => ({ label: t.links[anchor], href: `#${anchor}` })),
    { label: t.whatsapp, href: whatsappHref, external: true },
  ];
  const mobileItems = [...navItems, ...moreItems];
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
        aria-label={t.ariaLabel}
        className="flex h-(--nav-h) items-center justify-between gap-8 px-page"
      >
        <a
          href="#hero"
          aria-label={`${site.name}, ${t.home}`}
          onClick={(event) => {
            closeMore();
            if (open) navigateMobile(event, "#hero");
          }}
        >
          <Logo tagline={false} />
        </a>

        {/* Menu desktop: satu baris di tengah antara logo dan tombol kanan. */}
        <ul className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-10 2xl:gap-14">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(labelClass, "flex h-11 items-center whitespace-nowrap transition-colors hover:text-brand-blue")}
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
                "flex h-11 items-center gap-1.5 whitespace-nowrap transition-colors hover:text-brand-blue",
                moreOpen && "text-brand-blue",
              )}
            >
              <LetterSwap label={t.more} />
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
                  className="absolute top-full left-0 mt-[calc((var(--nav-h)-2.75rem)/2)] w-64 border bg-background shadow-[0_16px_40px_-16px_rgb(15_23_42/0.3)]"
                >
                  <ul className="divide-y">
                    {moreItems.map((item) => (
                      <li key={item.href}>
                        <MenuLink
                          item={item}
                          newTab={newTab}
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

        <div className="flex shrink-0 items-center gap-2 lg:gap-6">
          <LanguageToggle locale={locale} label={t.switchLanguage} />
          <a href={contactHref} className={cn(ctaClass, "hidden lg:inline-flex")}>
            <LetterSwap label={t.contact} />
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
          </a>
          <button
            type="button"
            className="-mr-2 inline-flex size-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>
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
                      newTab={newTab}
                      onClick={(event) => navigateMobile(event, item.href)}
                      className="h-12 hover:text-brand-blue"
                    />
                  </li>
                ))}
              </ul>
              <a
                href={contactHref}
                onClick={(event) => navigateMobile(event, contactHref)}
                className={cn(ctaClass, "mt-4 w-full")}
              >
                <LetterSwap label={t.contact} />
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
