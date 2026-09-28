"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useInView, useMotionValue, useScroll, useTransform, motion } from "motion/react";

// Timeline horizontal (turunan "timeline" Hyperiux Vault dari 21st.dev), ditulis ulang tanpa GSAP:
// section tertahan di bawah navbar dan jalurnya bergeser ke samping mengikuti scroll; garis
// terisi sampai titik 70% lebar layar, dan tiap item yang dilewati garis menumbuhkan tiangnya,
// memunculkan titik, lalu teksnya naik dari balik masker. Perubahan dari versi aslinya:
// - pin memakai CSS sticky, geser + isi garis memakai useScroll/useTransform dari motion (sudah
//   terpasang); GSAP, ScrollTrigger, dan SplitText (plugin berbayar Club dulu) TIDAK dipasang
// - teks naik per blok (label, judul, deskripsi), bukan per baris hasil SplitText
// - panjang scroll dihitung dari lebar jalur sebenarnya (bukan tinggi tetap 200vw/400vh),
//   jadi pas di semua lebar layar dan ikut berubah saat ukuran layar berubah
// - foto di awal jalur diganti panel isi bebas (`intro`), item & teks dari props (dua bahasa)
// - tata letak ada di globals.css (.timeline-*): mode geser hanya aktif kalau gerakan tidak
//   dikurangi DAN tinggi layar ≥ 37.5rem; selain itu tampil sebagai daftar vertikal biasa
//   (markup server = browser, tidak ada render bersyarat)
export type TimelineItem = { title: string; description: string };

const SLIDE_END = 0.82; // sisa scroll setelah titik ini = jeda sebelum section dilepas
const REVEAL_X = 0.7; // ujung garis & titik "menyala": 70% lebar layar

export function Timeline({
  items,
  header,
  intro,
}: {
  items: TimelineItem[];
  /** Baris di atas jalur (mis. SectionTag). */
  header?: ReactNode;
  /** Panel pertama di jalur, sebelum item pertama. */
  intro: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const distance = useMotionValue(0);
  const geometry = useRef({ start: 0, width: 1, reveal: 0, view: 0 });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  // Garis mulai terisi saat section naik ke layar, supaya tidak sudah penuh sebelum terlihat.
  const { scrollYProgress: entry } = useScroll({ target: containerRef, offset: ["start 70%", "start 15%"] });
  const x = useTransform([scrollYProgress, distance], ([progress, total]: number[]) => {
    return -Math.min(1, progress / SLIDE_END) * total;
  });
  // Ujung garis di 70% lebar layar; menjelang akhir geseran ujungnya menyusul ke tepi kanan,
  // supaya garis sudah penuh saat section dilepas.
  const fill = useTransform([x, entry, distance], ([offset, entered, total]: number[]) => {
    const { start, width, reveal, view } = geometry.current;
    const slid = total > 0 ? -offset / total : 0;
    const tip = reveal + (view - reveal) * slid ** 3;
    return Math.min(1, Math.max(0, (tip - (start + offset)) / width)) * entered;
  });

  useEffect(() => {
    const container = containerRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const line = lineRef.current;
    if (!container || !viewport || !track || !line) return;

    const measure = () => {
      const total = Math.max(0, track.scrollWidth - viewport.clientWidth);
      container.style.setProperty("--timeline-distance", `${total}px`);
      const view = viewport.getBoundingClientRect();
      const rect = line.getBoundingClientRect();
      geometry.current = {
        start: rect.left - view.left - x.get(),
        width: rect.width || 1,
        reveal: window.innerWidth * REVEAL_X - view.left,
        view: view.width,
      };
      distance.set(total);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [distance, x]);

  return (
    <div ref={containerRef} className="timeline">
      <div className="timeline-pin">
        {header && <div className="timeline-header px-page">{header}</div>}
        <div ref={viewportRef} className="timeline-viewport">
          <motion.div ref={trackRef} className="timeline-track px-page" style={{ x }}>
            <div className="timeline-intro">{intro}</div>
            <div className="timeline-rail">
              <span ref={lineRef} aria-hidden="true" className="timeline-line bg-brand-blue/15">
                <motion.span className="absolute inset-0 origin-left bg-brand-blue" style={{ scaleX: fill }} />
              </span>
              <ol role="list" className="timeline-items">
                {items.map((item, index) => (
                  <Item key={item.title} item={item} index={index} total={items.length} />
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const pad = (value: number) => String(value).padStart(2, "0");

function Item({ item, index, total }: { item: TimelineItem; index: number; total: number }) {
  const ref = useRef<HTMLLIElement>(null);
  // Menyala saat item berada di kiri 70% lebar layar dan di atas 70% tinggi layar.
  const on = useInView(ref, { margin: "9999px -30% -30% 9999px" });
  const reveal =
    "block translate-y-[110%] transition-transform duration-700 ease-out group-data-[on=true]:translate-y-0 motion-reduce:transition-none";

  return (
    <li
      ref={ref}
      data-side={index % 2 === 0 ? "top" : "bottom"}
      data-on={on}
      className="timeline-item group relative"
      style={{ "--start": index + 1 } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="timeline-stem absolute left-0 w-px scale-y-0 bg-brand-blue transition-transform duration-500 ease-out group-data-[on=true]:scale-y-100 motion-reduce:transition-none"
      />
      <span
        aria-hidden="true"
        className="timeline-dot absolute left-0 size-3 -translate-x-1/2 scale-0 rounded-full bg-brand-blue ring-4 ring-brand-surface transition-transform delay-200 duration-300 group-data-[on=true]:scale-100 motion-reduce:transition-none"
      />
      <div>
        <p aria-hidden="true" className="overflow-hidden font-mono text-xs tracking-[0.15em] text-brand-blue">
          <span className={reveal}>
            [ {pad(index + 1)} ] / {pad(total)}
          </span>
        </p>
        <h3 className="mt-3 overflow-hidden pb-0.5 font-heading text-xl leading-snug font-semibold tracking-tight text-balance sm:text-2xl xl:text-3xl">
          <span className={`${reveal} delay-75`}>{item.title}</span>
        </h3>
        <p className="mt-2 max-w-[34ch] overflow-hidden text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
          <span className={`${reveal} delay-150`}>{item.description}</span>
        </p>
      </div>
    </li>
  );
}
