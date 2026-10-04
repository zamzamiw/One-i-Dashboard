"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useInView, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

// Timeline vertikal (turunan "timeline" Hyperiux Vault dari 21st.dev), ditulis ulang tanpa GSAP.
// Versi aslinya horizontal dan menahan section; atas permintaan pemilik project arahnya ke bawah
// mengikuti scroll biasa (tanpa section tertahan). Yang dipertahankan dari versi asli:
// - garis yang terisi mengikuti scroll; ujungnya di 70% tinggi layar
// - item bergantian di dua sisi garis (≥lg) dan saling bertumpuk setengah tinggi
// - item yang dilewati ujung garis menumbuhkan tiang + titik, lalu teksnya naik dari balik
//   masker (per blok label/judul/deskripsi, bukan per baris hasil SplitText)
// Di bawah lg garis ada di kiri dan semua item di kanannya. prefers-reduced-motion: garis
// langsung penuh, item muncul tanpa transisi. Keadaan awal sama di server dan browser
// (useScroll mulai dari 0, useInView false).
export type TimelineItem = { title: string; description: string };

export function Timeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 70%", "end 70%"] });

  return (
    <div ref={railRef} className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-1.5 w-0.5 -translate-x-1/2 overflow-hidden bg-brand-blue/15 lg:left-1/2"
      >
        <motion.span
          className="absolute inset-0 origin-top bg-brand-blue motion-reduce:transform-none!"
          style={{ scaleY: scrollYProgress }}
        />
      </span>
      <ol role="list" className="grid gap-12 lg:grid-cols-2 lg:gap-x-32 lg:gap-y-0">
        {items.map((item, index) => (
          <Item key={item.title} item={item} index={index} total={items.length} />
        ))}
      </ol>
    </div>
  );
}

const pad = (value: number) => String(value).padStart(2, "0");

function Item({ item, index, total }: { item: TimelineItem; index: number; total: number }) {
  const ref = useRef<HTMLLIElement>(null);
  // Menyala saat item sudah berada di atas 70% tinggi layar (tetap menyala setelah lewat ke atas).
  const on = useInView(ref, { margin: "9999px 0px -30% 0px" });
  const left = index % 2 === 0; // sisi kiri garis di ≥lg
  const reveal =
    "block translate-y-[110%] transition-transform duration-700 ease-out group-data-[on=true]:translate-y-0 motion-reduce:transition-none";

  return (
    <li
      ref={ref}
      data-on={on}
      className={cn(
        "group relative pl-12 lg:[grid-row:var(--row)/span_2] lg:pb-16 lg:pl-0",
        left ? "lg:col-start-1 lg:text-right" : "lg:col-start-2",
      )}
      style={{ "--row": index + 1 } as CSSProperties}
    >
      {/* Tiang mendatar dari garis ke teks; tumbuh dari sisi garis. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-2 left-1.5 h-px w-8 origin-left scale-x-0 bg-brand-blue transition-transform duration-500 ease-out group-data-[on=true]:scale-x-100 motion-reduce:transition-none lg:w-12",
          left ? "lg:-right-16 lg:left-auto lg:origin-right" : "lg:-left-16",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-2 left-1.5 size-3 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-brand-blue ring-4 ring-brand-surface transition-transform delay-200 duration-300 group-data-[on=true]:scale-100 motion-reduce:transition-none",
          left ? "lg:-right-16 lg:left-auto lg:translate-x-1/2" : "lg:-left-16",
        )}
      />
      <p aria-hidden="true" className="overflow-hidden font-mono text-xs tracking-[0.15em] text-brand-blue">
        <span className={reveal}>
          [ {pad(index + 1)} ] / {pad(total)}
        </span>
      </p>
      <h3 className="mt-3 overflow-hidden pb-0.5 font-heading text-xl leading-snug font-semibold tracking-tight text-balance sm:text-2xl xl:text-3xl">
        <span className={`${reveal} delay-75`}>{item.title}</span>
      </h3>
      <p
        className={cn(
          "mt-2 max-w-[38ch] overflow-hidden text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base lg:text-lg",
          left && "lg:ml-auto",
        )}
      >
        <span className={`${reveal} delay-150`}>{item.description}</span>
      </p>
    </li>
  );
}
