"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { contactNav, nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const buttonClass =
  "inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4"
      >
        <a href="#hero" aria-label={`${site.name}, kembali ke atas`} onClick={close}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-brand-blue"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a href={contactNav.href} className={buttonClass}>
              {contactNav.label}
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-md md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t md:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={close}
                    className="flex h-11 items-center rounded-md px-3 font-medium hover:bg-muted"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href={contactNav.href} onClick={close} className={cn(buttonClass, "w-full")}>
                  {contactNav.label}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
