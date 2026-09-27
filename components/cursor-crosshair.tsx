"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

// Crosshair yang mengikuti kursor di seluruh situs (turunan efek 21st.dev
// variable-font-and-cursor, TANPA efek pada font). Kursor asli tetap tampil dan overlay
// tidak menangkap klik. Posisi digerakkan lewat motion value (transform, tanpa render
// ulang React). Hanya untuk pointer presisi (mouse/trackpad); mati untuk
// prefers-reduced-motion. Keadaan awal (tersembunyi, posisi 0) sama di server dan browser.
export function CursorCrosshair() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const roundedX = useTransform(x, (value) => Math.round(value));
  const roundedY = useTransform(y, (value) => Math.round(value));

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      opacity.set(1);
    };
    // Sembunyikan saat kursor keluar dari jendela browser.
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) opacity.set(0);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
    };
  }, [x, y, opacity]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] hidden overflow-hidden [@media(hover:hover)_and_(pointer:fine)]:block motion-reduce:hidden!"
      style={{ opacity }}
    >
      <motion.div className="absolute inset-y-0 left-0 w-px bg-brand-navy/25" style={{ x }} />
      <motion.div className="absolute inset-x-0 top-0 h-px bg-brand-navy/25" style={{ y }} />
      {/* Tanda "+" biru dengan tepi putih supaya tetap terlihat di atas footer yang biru. */}
      <motion.div
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-brand-blue"
        style={{ x, y }}
      >
        <svg viewBox="0 0 18 18" className="block size-[18px]">
          <path d="M9 1.5v15M1.5 9h15" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <path d="M9 1.5v15M1.5 9h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>
      {/* Digeser 20px supaya tidak tertutup panah kursor asli. */}
      <motion.div
        className="absolute top-0 left-0 translate-x-5 translate-y-5 rounded bg-brand-navy px-1.5 py-0.5 font-mono text-xs whitespace-nowrap text-white tabular-nums ring-1 ring-white/20"
        style={{ x, y }}
      >
        x: <motion.span>{roundedX}</motion.span> y: <motion.span>{roundedY}</motion.span>
      </motion.div>
    </motion.div>
  );
}
