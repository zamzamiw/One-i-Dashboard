"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type Transition } from "motion/react";
import { onPageRevealed } from "@/lib/page-reveal";

// Karakter khas One-I di hero (permintaan pemilik project, terinspirasi karakter garis di
// samping judul hero Indisea): glyph logo One-I (batang "L" kecil, batang tengah muda, dan
// batang "i" bertitik) yang mengintip dari balik kartu grafik hero.
// - saat halaman terbuka: batang naik bergantian dan titik "i" jatuh memantul (seperti animasi
//   loading), dimulai setelah loading awal / layar ganti bahasa selesai
// - saat di-scroll: batang "i" memanjang ke bawah mengikuti scroll. Ujung bawahnya keluar dari
//   bawah kartu, seolah tertahan di layar, lalu berhenti sedikit di dalam section berikutnya
// - ukuran lewat --u (= lebar batang "i"); proporsi diambil dari components/logo.tsx
// - dipasang di pembungkus kartu (relative); kartu grafik wajib di atasnya (z-10)
// - prefers-reduced-motion: langsung tampil, batang tidak memanjang
// - keadaan awal sama di server dan browser (batang tersembunyi di balik kartu)
const OVERLAP = 48; // px, seberapa jauh ujung batang masuk ke section berikutnya
const BASE = 0.4; // ujung batang saat diam: 40% tinggi kartu (tersembunyi di belakangnya)

export function OneICharacter() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const timing = (transition: Transition): Transition => (reduceMotion ? { duration: 0 } : transition);
  const [shown, setShown] = useState(false);

  // Panjang batang "i" di bawah tepi atas kartu (px): dasar + tambahan yang mengikuti scroll.
  const base = useMotionValue(0);
  const max = useMotionValue(0);
  const still = useRef(false); // prefers-reduced-motion: batang tidak memanjang
  const { scrollY } = useScroll();
  const below = useTransform([scrollY, base, max], ([scrolled, start, end]: number[]) => {
    const extra = still.current ? 0 : Math.min(Math.max(0, scrolled), Math.max(0, end - start));
    return `calc(var(--u) * 4.26 + ${start + extra}px)`;
  });

  useEffect(() => {
    const root = rootRef.current;
    const card = root?.parentElement;
    const hero = root?.closest("section");
    if (!root || !card || !hero) return;
    still.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Ukuran di-cache saat resize; jarak dihitung dari selisih posisi (tidak terpengaruh scroll).
    const measure = () => {
      const cardRect = card.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();
      base.set(cardRect.height * BASE);
      max.set(heroRect.bottom - cardRect.top + OVERLAP);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(card);
    observer.observe(hero);
    const stopWaiting = onPageRevealed(() => setShown(true));
    return () => {
      observer.disconnect();
      stopWaiting();
    };
  }, [base, max]);

  const rise = (delay: number) => timing({ type: "spring", stiffness: 260, damping: 22, delay });

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-[clamp(1.25rem,3vw,3rem)] z-0 w-[calc(var(--u)*4)] [--u:0.75rem] sm:[--u:0.875rem] lg:[--u:1.1rem] xl:[--u:1.25rem] 2xl:[--u:1.5rem]"
    >
      {/* Batang "L" kecil: tiang + tonjolan ke kiri di atasnya. */}
      <motion.div
        className="absolute top-[calc(var(--u)*-1.86)] left-0 h-[calc(var(--u)*4)] w-[calc(var(--u)*0.89)]"
        initial={{ y: "100%" }}
        animate={{ y: shown ? 0 : "100%" }}
        transition={rise(0.1)}
      >
        <span className="absolute inset-x-0 top-0 h-[calc(var(--u)*0.47)] rounded-[calc(var(--u)*0.12)] bg-brand-blue" />
        <span className="absolute top-0 right-0 bottom-0 w-[calc(var(--u)*0.5)] rounded-[calc(var(--u)*0.12)] bg-brand-blue" />
      </motion.div>
      {/* Batang tengah (warna muda seperti di logo). */}
      <motion.div
        className="absolute top-[calc(var(--u)*-3.04)] left-[calc(var(--u)*1.5)] h-[calc(var(--u)*5)] w-[calc(var(--u)*0.97)] rounded-[calc(var(--u)*0.3)] bg-[#A8BAFE]"
        initial={{ y: "100%" }}
        animate={{ y: shown ? 0 : "100%" }}
        transition={rise(0.22)}
      />
      {/* Batang "i": memanjang ke bawah mengikuti scroll. */}
      <motion.div
        className="absolute top-[calc(var(--u)*-4.26)] left-[calc(var(--u)*2.99)] w-(--u) rounded-[calc(var(--u)*0.31)] bg-brand-blue"
        style={{ height: below }}
        initial={{ y: "100%" }}
        animate={{ y: shown ? 0 : "100%" }}
        transition={rise(0.34)}
      />
      {/* Titik "i": jatuh memantul, lalu melayang pelan (CSS). */}
      <motion.div
        className="absolute top-[calc(var(--u)*-5.47)] left-[calc(var(--u)*2.98)] size-[calc(var(--u)*1.03)]"
        initial={{ y: "-8rem", opacity: 0 }}
        animate={shown ? { y: 0, opacity: 1 } : { y: "-8rem", opacity: 0 }}
        transition={timing({ y: { type: "spring", stiffness: 420, damping: 11, delay: 0.6 }, opacity: { duration: 0.2, delay: 0.6 } })}
      >
        <span className="character-float block size-full rounded-full bg-brand-blue" />
      </motion.div>
    </div>
  );
}
