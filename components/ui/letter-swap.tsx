"use client";

import { useEffect } from "react";
import { useAnimate, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

// Efek "random letter swap" (turunan Random Letter Swap dari 21st.dev/fancy, ditulis ulang):
// saat kursor masuk ke link/tombol induknya, tiap huruf bergulir ke atas dan digantikan
// salinannya dari bawah, dengan urutan huruf acak. Perubahan dari versi aslinya:
// - pemicu = seluruh area link/tombol terdekat (termasuk kotak panah), bukan hanya teks
// - salinan huruf lewat ::after, bukan elemen kedua per huruf (DOM separuhnya); pembaca
//   layar membaca label utuh dari span sr-only, huruf-huruf animasinya aria-hidden
// - hanya untuk mouse; mati untuk prefers-reduced-motion; tidak diulang sebelum selesai
// - markup sama di server dan browser (tanpa `initial`), jadi aman dari hydration mismatch
export function LetterSwap({
  label,
  className,
  stagger = 0.03,
}: {
  label: string;
  className?: string;
  /** Jeda antarhuruf, dalam detik. */
  stagger?: number;
}) {
  const [scope, animate] = useAnimate<HTMLSpanElement>();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = scope.current;
    const trigger = root?.closest<HTMLElement>("a, button") ?? root;
    if (!root || !trigger) return;
    let running = false;

    const play = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || running || reduceMotion) return;
      const letters = root.querySelectorAll<HTMLElement>("[data-char]");

      // Acak urutan giliran (Fisher–Yates), lalu turn[i] = giliran huruf ke-i.
      const order = Array.from(letters, (_, i) => i);
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      const turn: number[] = [];
      order.forEach((letter, index) => (turn[letter] = index));

      running = true;
      animate(letters, { y: "-100%" }, { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: (i) => turn[i] * stagger }).then(
        () => {
          // Salinan kini tepat di posisi huruf asli, jadi reset instan tidak terlihat.
          animate(letters, { y: 0 }, { duration: 0 });
          running = false;
        },
      );
    };

    trigger.addEventListener("pointerenter", play);
    return () => trigger.removeEventListener("pointerenter", play);
  }, [scope, animate, reduceMotion, stagger]);

  return (
    <span ref={scope} className={cn("relative inline-flex overflow-hidden", className)}>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="inline-flex">
        {Array.from(label, (char, i) => (
          <span
            key={i}
            data-char={char}
            className="relative inline-block whitespace-pre after:absolute after:top-full after:left-0 after:content-[attr(data-char)]"
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
