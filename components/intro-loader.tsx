"use client";

import { useEffect, type CSSProperties } from "react";
import { animate, stagger, useAnimate, useMotionValue, useTransform, motion } from "motion/react";
import { site } from "@/lib/site";
import { INTRO_KEY, REVEAL_EVENT } from "@/lib/page-reveal";

// Loading saat website pertama kali dibuka (keputusan pemilik project): latar brand-blue,
// logo One-I dengan animasi motion graphic (kotak berputar masuk, batang tumbuh seperti
// grafik, titik jatuh memantul), tulisan "One-I", angka progres 0–100, dan garis progres.
// - hanya sekali per sesi; tidak tampil saat ganti bahasa (skrip di <head>, lib/page-reveal.ts)
// - sudah menutupi halaman sejak piksel pertama (dirender server); animasi logo & huruf
//   berjalan lewat CSS (globals.css) sehingga tidak menunggu JavaScript
// - angka baru mencapai 100 setelah halaman benar-benar selesai dimuat (event load + font),
//   maksimal menunggu 3 detik; total sekitar 2 detik di koneksi normal
// - pengaman: CSS menyembunyikan layar setelah 5 detik kalau JavaScript gagal;
//   prefers-reduced-motion: tidak ditampilkan sama sekali
// - selesai: html[data-intro], sessionStorage ditandai, event REVEAL_EVENT dikirim

// Bentuk logo sama dengan components/logo.tsx (versi inverse: kotak putih, glyph biru).
function AnimatedMark() {
  return (
    <span className="intro-mark block size-14 overflow-hidden rounded-[22.7%] bg-white text-brand-blue sm:size-20">
      <svg viewBox="0 0 660 660" className="block size-full">
        <g className="intro-bar" style={{ animationDelay: "0.35s" }} fill="currentColor">
          <rect x="146" y="392" width="80" height="42" rx="11" />
          <rect x="181" y="392" width="45" height="167" rx="11" />
        </g>
        <rect className="intro-bar" style={{ animationDelay: "0.47s" }} x="281" y="285" width="87" height="274" rx="27" fill="#A8BAFE" />
        <rect className="intro-bar" style={{ animationDelay: "0.59s" }} x="415" y="176" width="90" height="383" rx="28" fill="currentColor" />
        <circle className="intro-dot" cx="461" cy="113" r="46.5" fill="currentColor" />
      </svg>
    </span>
  );
}

const EASE_IN = [0.64, 0, 0.78, 0] as const;
const EASE_PANEL = [0.76, 0, 0.24, 1] as const;

export function IntroLoader() {
  const [scope, animateScope] = useAnimate<HTMLDivElement>();
  const progress = useMotionValue(0);
  const count = useTransform(progress, (value) => Math.round(value));
  const barScale = useTransform(progress, [0, 100], [0, 1]);

  useEffect(() => {
    const html = document.documentElement;
    const finish = (skipped: boolean) => {
      html.setAttribute("data-intro", skipped ? "skip" : "done");
      html.style.overflow = "";
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}
      window.dispatchEvent(new Event(REVEAL_EVENT));
    };

    // Sudah dilewati skrip <head> (pernah tampil di sesi ini / datang dari ganti bahasa).
    if (html.hasAttribute("data-intro")) return;
    // Reduced motion (layar sudah disembunyikan CSS) atau JavaScript terlambat sehingga
    // pengaman CSS sudah/hampir menyembunyikan layar: langsung selesai.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || performance.now() > 4500) {
      finish(true);
      return;
    }

    let active = true;
    const running: { stop: () => void }[] = [];
    html.style.overflow = "hidden";

    const pageLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    const ready = Promise.race([
      Promise.all([pageLoaded, document.fonts?.ready ?? Promise.resolve()]),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);

    (async () => {
      const toMost = animate(progress, 84, { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] });
      running.push(toMost);
      await Promise.all([toMost, ready]);
      if (!active) return;
      const toFull = animate(progress, 100, { duration: 0.3, ease: "easeOut" });
      running.push(toFull);
      await toFull;
      if (!active) return;

      // Keluar: logo, huruf, dan angka naik keluar, lalu panel terbuka ke atas.
      running.push(animateScope("[data-exit]", { y: "-120%", opacity: 0 }, { duration: 0.4, ease: EASE_IN, delay: stagger(0.04) }));
      const panel = animateScope(scope.current, { y: "-100%" }, { duration: 0.75, ease: EASE_PANEL, delay: 0.18 });
      running.push(panel);
      await panel;
      if (!active) return;
      finish(false);
    })();

    return () => {
      active = false;
      running.forEach((controls) => controls.stop());
      html.style.overflow = "";
    };
  }, [scope, animateScope, progress]);

  return (
    <div ref={scope} aria-hidden="true" className="intro-loader fixed inset-0 z-[80] bg-brand-blue text-white select-none">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 px-page sm:gap-x-12">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Tanpa topeng: kotak yang berputar masuk tidak boleh terpotong. */}
          <span data-exit className="block">
            <AnimatedMark />
          </span>
          <p className="font-heading text-6xl leading-[1.05] font-bold tracking-tighter whitespace-nowrap sm:text-8xl">
            {Array.from(site.name, (char, index) => (
              <span key={index} className="inline-block overflow-y-clip align-top">
                <span data-exit className="inline-block">
                  <span className="intro-letter inline-block" style={{ "--i": index } as CSSProperties}>
                    {char}
                  </span>
                </span>
              </span>
            ))}
          </p>
        </div>
        <p className="overflow-y-clip font-mono text-5xl leading-none tabular-nums sm:text-7xl">
          <span data-exit className="intro-count inline-flex items-baseline">
            <motion.span className="inline-block w-[3ch] text-right">{count}</motion.span>
            <span className="ml-1 text-2xl text-white/80 sm:text-3xl">%</span>
          </span>
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
        <motion.div className="h-full origin-left bg-white" style={{ scaleX: barScale }} />
      </div>
    </div>
  );
}
