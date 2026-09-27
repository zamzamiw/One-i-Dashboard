"use client";

import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { VariableFontAndCursor } from "@/components/ui/variable-font-and-cursor";
import { site } from "@/lib/site";

// Wordmark "One-I" raksasa di footer + efek kursor dari 21st.dev (variable-font-and-cursor):
// ketebalan huruf (sumbu 'wght' Space Grotesk, 300–700) mengikuti posisi mouse dari kiri ke
// kanan, dan kursor diganti crosshair + titik amber + koordinat — HANYA di area ini, supaya
// kursor asli tetap ada di atas link dan tombol. Crosshair hanya untuk pointer presisi
// (mouse/trackpad) dan dimatikan untuk prefers-reduced-motion. Seluruh blok dekoratif.

// Rasio lebar/tinggi-font "One-I" pada ketebalan 700 (paling lebar), diukur di browser,
// supaya wordmark pas selebar kontainer lewat unit cqw.
const WORDMARK_RATIO = 2.33;

export function FooterWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const roundedX = useTransform(x, (value) => Math.round(value));
  const roundedY = useTransform(y, (value) => Math.round(value));

  const trackPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      onPointerMove={trackPointer}
      onPointerEnter={trackPointer}
      className="@container group relative select-none [@media(hover:hover)_and_(pointer:fine)]:cursor-none motion-reduce:cursor-auto!"
    >
      <p
        className="text-center font-heading leading-[0.78] font-bold tracking-tighter whitespace-nowrap"
        style={{ fontSize: `calc(100cqw / ${WORDMARK_RATIO})` }}
      >
        <VariableFontAndCursor
          label={site.name}
          containerRef={containerRef}
          fontVariationMapping={{ x: { name: "wght", min: 300, max: 700 } }}
        />
      </p>

      <div
        className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:block motion-reduce:hidden!"
      >
        <motion.div className="absolute inset-y-0 left-0 w-px bg-brand-navy/50" style={{ x }} />
        <motion.div className="absolute inset-x-0 top-0 h-px bg-brand-navy/50" style={{ y }} />
        <motion.div
          className="absolute top-0 left-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-xs bg-brand-amber"
          style={{ x, y }}
        />
        <motion.div
          className="absolute top-0 left-0 translate-x-3 translate-y-3 rounded bg-brand-navy px-1.5 py-0.5 font-mono text-xs whitespace-nowrap text-white tabular-nums"
          style={{ x, y }}
        >
          x: <motion.span>{roundedX}</motion.span> y: <motion.span>{roundedY}</motion.span>
        </motion.div>
      </div>
    </div>
  );
}
