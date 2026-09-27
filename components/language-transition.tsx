"use client";

import { useEffect } from "react";
import { stagger, useAnimate } from "motion/react";
import { site } from "@/lib/site";
import { LANGUAGE_SWITCH_EVENT, LANGUAGE_SWITCH_KEY } from "@/lib/language-transition";

// Layar transisi saat ganti bahasa (keputusan pemilik project): panel brand-blue naik dari
// bawah, huruf "One-I" (gaya wordmark footer) muncul satu per satu, lalu halaman bahasa lain
// dimuat penuh. Di halaman baru layar ini sudah menutupi sejak awal (skrip di <head> memasang
// html[data-lang-switch]); setelah hidrasi huruf naik keluar dan panel terbuka ke atas.
// - tampil/tersembunyi lewat CSS (.lang-loader di globals.css), jadi markup server = browser
// - pengaman: kalau JavaScript gagal, CSS menyembunyikan layar ini setelah 8 detik
// - kembali lewat tombol Back (bfcache): layar langsung dibuka lagi
// - prefers-reduced-motion: hanya memudar, tanpa gerakan

const EASE_PANEL = [0.76, 0, 0.24, 1] as const;
const EASE_TEXT_IN = [0.22, 1, 0.36, 1] as const;
const EASE_TEXT_OUT = [0.64, 0, 0.78, 0] as const;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Dipanggil tombol ganti bahasa: putar animasi masuk, lalu buka `href`. */
export function switchLanguage(href: string) {
  window.dispatchEvent(new CustomEvent<string>(LANGUAGE_SWITCH_EVENT, { detail: href }));
}

export function LanguageTransition({ status }: { status: string }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    const root = document.documentElement;
    const panel = scope.current.querySelector<HTMLElement>("[data-panel]")!;
    const letters = scope.current.querySelectorAll<HTMLElement>("[data-letter]");
    let busy = false;

    const reset = () => {
      root.removeAttribute("data-lang-switch");
      animate(panel, { y: "0%", opacity: 1 }, { duration: 0 });
      animate(letters, { y: "0%", rotate: 0 }, { duration: 0 });
      busy = false;
    };

    const leave = async () => {
      if (prefersReducedMotion()) {
        await animate(panel, { opacity: [1, 0] }, { duration: 0.3, delay: 0.2 });
      } else {
        await animate(letters, { y: ["0%", "-110%"] }, { duration: 0.5, ease: EASE_TEXT_OUT, delay: stagger(0.04, { startDelay: 0.25 }) });
        await animate(panel, { y: ["0%", "-100%"] }, { duration: 0.8, ease: EASE_PANEL });
      }
      reset();
    };

    const enter = async (event: Event) => {
      const href = (event as CustomEvent<string>).detail;
      if (busy) return;
      busy = true;
      const reduce = prefersReducedMotion();

      // Posisi awal dipasang sebelum layar ditampilkan, supaya tidak sempat terlihat penuh.
      if (reduce) animate(panel, { opacity: 0 }, { duration: 0 });
      else {
        animate(panel, { y: "100%" }, { duration: 0 });
        animate(letters, { y: "110%", rotate: 6 }, { duration: 0 });
      }
      root.setAttribute("data-lang-switch", "");
      try {
        sessionStorage.setItem(LANGUAGE_SWITCH_KEY, String(Date.now()));
      } catch {}

      if (reduce) await animate(panel, { opacity: 1 }, { duration: 0.25 });
      else
        await Promise.all([
          animate(panel, { y: ["100%", "0%"] }, { duration: 0.8, ease: EASE_PANEL }),
          animate(letters, { y: ["110%", "0%"], rotate: [6, 0] }, { duration: 0.7, ease: EASE_TEXT_IN, delay: stagger(0.06, { startDelay: 0.4 }) }),
        ]);
      window.location.assign(href);
    };

    // Halaman dipulihkan dari bfcache (tombol Back) dalam keadaan tertutup: buka lagi.
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) reset();
    };

    if (root.hasAttribute("data-lang-switch")) leave();
    window.addEventListener(LANGUAGE_SWITCH_EVENT, enter);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener(LANGUAGE_SWITCH_EVENT, enter);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [scope, animate]);

  return (
    <div ref={scope} className="lang-loader fixed inset-0 z-[70]">
      <div data-panel className="absolute inset-0 flex items-center justify-center bg-brand-blue px-page will-change-transform">
        <p
          aria-hidden="true"
          className="font-heading text-[length:clamp(5rem,24vw,22rem)] leading-[1.05] font-bold tracking-tighter whitespace-nowrap text-white select-none"
        >
          {Array.from(site.name, (char, i) => (
            // Topeng hanya atas-bawah (overflow-y: clip), supaya sudut huruf yang berputar tidak terpotong.
            <span key={i} className="inline-block overflow-x-visible overflow-y-clip align-top">
              <span data-letter className="inline-block origin-bottom-left">
                {char}
              </span>
            </span>
          ))}
        </p>
        <p role="status" className="sr-only">
          {status}
        </p>
      </div>
    </div>
  );
}
