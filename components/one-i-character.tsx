"use client";

import { useEffect, useRef, useState } from "react";
import { onPageRevealed } from "@/lib/page-reveal";
import { cn } from "@/lib/utils";

// Karakter khas One-I di hero (permintaan pemilik project, terinspirasi karakter di samping
// judul hero Indisea): glyph logo One-I (batang "L" kecil, batang tengah muda, batang "i" +
// titik), tampil besar di kolom kanan hero.
// - saat di-scroll ke bawah batang-batang bergeser dan menyatu menjadi satu batang "i"; ke atas
//   lagi kembali menjadi logo. Karakter TETAP di hero (ikut tergulir bersama halaman); yang
//   mengikuti pengguna hanya ekornya (components/one-i-tail.tsx, mencari [data-one-i-tail])
// - posisi bagian dihitung relatif terhadap kotak hero (tidak ada elemen fixed), jadi tidak ada
//   jeda/goyang saat scroll; hanya diperbarui selama tahap menyatu
// - animasi muncul (batang naik, titik "i" jatuh memantul lalu melayang) memakai CSS setelah
//   loading awal / layar ganti bahasa selesai
// - prefers-reduced-motion: logo SVG statis
// - markup server = browser; bagian-bagian baru terlihat setelah ukurannya diukur di browser

type Piece = "nub" | "stem" | "middle" | "tall" | "dot";
type Rect = { x: number; y: number; w: number; h: number };

// Proporsi glyph dari components/logo.tsx; satuan = lebar batang "i" (90 di viewBox logo).
const GLYPH = { w: 4, h: 5.47 };
const LOGO: Record<Piece, Rect> = {
  nub: { x: 0, y: 3.61, w: 0.89, h: 0.47 },
  stem: { x: 0.39, y: 3.61, w: 0.5, h: 1.86 },
  middle: { x: 1.5, y: 2.43, w: 0.97, h: 3.04 },
  tall: { x: 2.99, y: 1.21, w: 1, h: 4.26 },
  dot: { x: 2.98, y: 0, w: 1.03, h: 1.03 },
};
const PIECES: Piece[] = ["nub", "stem", "middle", "tall", "dot"]; // urutan gambar: "i" paling atas
const DELAY: Record<Piece, string> = { nub: "0.1s", stem: "0.1s", middle: "0.22s", tall: "0.34s", dot: "0.6s, 1.8s" };
const MERGE_END = 0.22; // batang selesai menyatu setelah scroll 22% tinggi layar

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function OneICharacter() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const pieceRefs = useRef<Partial<Record<Piece, HTMLDivElement | null>>>({});
  const [ready, setReady] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const size = { u: 0, ox: 0, oy: 0 };
    let last = -1;

    const update = () => {
      frame = 0;
      const merge = ease(Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * MERGE_END))));
      if (merge === last) return;
      last = merge;
      const { u, ox, oy } = size;
      const tall = LOGO.tall;
      for (const piece of PIECES) {
        const el = pieceRefs.current[piece];
        if (!el) continue;
        const from = LOGO[piece];
        const to = piece === "dot" ? from : tall;
        const w = lerp(from.w, to.w, merge) * u;
        const h = lerp(from.h, to.h, merge) * u;
        el.style.transform = `translate3d(${ox + lerp(from.x, to.x, merge) * u}px, ${oy + lerp(from.y, to.y, merge) * u}px, 0)`;
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
        el.style.borderRadius = piece === "dot" ? "50%" : `${Math.min(w, h) * 0.3}px`;
      }
    };
    const measure = () => {
      const { width, height } = anchor.getBoundingClientRect();
      size.u = Math.min(width / GLYPH.w, height / GLYPH.h);
      size.ox = (width - GLYPH.w * size.u) / 2;
      size.oy = (height - GLYPH.h * size.u) / 2;
      last = -1;
    };

    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const refresh = () => {
      measure();
      schedule();
    };

    measure();
    update();
    setReady(true);
    const observer = new ResizeObserver(refresh);
    observer.observe(anchor);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", refresh);
    const stopWaiting = onPageRevealed(() => setShown(true));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", refresh);
      stopWaiting();
    };
  }, []);

  return (
    <div ref={anchorRef} aria-hidden="true" className="relative h-52 sm:h-64 lg:h-[min(34rem,62svh)]">
      {/* prefers-reduced-motion: logo statis. */}
      <svg viewBox="146 66.5 359 492.5" className="mx-auto hidden h-full w-auto motion-reduce:block">
        <g className="fill-brand-blue">
          <rect x="146" y="392" width="80" height="42" rx="11" />
          <rect x="181" y="392" width="45" height="167" rx="11" />
          <rect x="415" y="176" width="90" height="383" rx="28" />
          <circle cx="461" cy="113" r="46.5" />
        </g>
        <rect x="281" y="285" width="87" height="274" rx="27" fill="#A8BAFE" />
      </svg>
      <div
        data-ready={ready ? "" : undefined}
        data-in={shown ? "" : undefined}
        className="one-i-character invisible absolute inset-0 data-ready:visible motion-reduce:hidden"
      >
        {PIECES.map((piece) => (
          <div
            key={piece}
            ref={(el) => {
              pieceRefs.current[piece] = el;
            }}
            data-one-i-tail={piece === "tall" ? "" : undefined}
            className="absolute top-0 left-0"
          >
            <span
              className={cn("char-fill", piece === "middle" ? "bg-[#A8BAFE]" : "bg-brand-blue", piece === "dot" && "char-dot")}
              style={{ animationDelay: DELAY[piece] }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
