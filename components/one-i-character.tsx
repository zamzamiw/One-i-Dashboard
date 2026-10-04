"use client";

import { useEffect, useRef, useState } from "react";
import { onPageRevealed } from "@/lib/page-reveal";
import { cn } from "@/lib/utils";

// Karakter khas One-I (permintaan pemilik project, terinspirasi karakter di samping judul hero
// Indisea): glyph logo One-I (batang "L" kecil, batang tengah muda, batang "i" + titik).
// - di puncak halaman tampil besar sebagai logo di kolom kanan hero (tempat `anchor`)
// - saat di-scroll ke bawah: batang-batang bergeser dan menyatu menjadi satu batang "i", lalu
//   "i" itu terbang ke tepi kanan layar dan ikut turun (fixed) di setiap section sampai footer;
//   batangnya memanjang sesuai seberapa jauh halaman sudah di-scroll
// - kembali ke atas: semuanya berbalik dan kembali menjadi logo (murni mengikuti posisi scroll)
// - lapisan fixed di atas konten (pointer-events-none, di bawah navbar & tombol WhatsApp);
//   setelah menyatu diberi tepi putih supaya tetap terlihat di atas latar biru/navy
// - per frame scroll hanya 5 elemen yang diubah (transform + ukuran), dihitung dari ukuran yang
//   di-cache saat resize; animasi muncul (batang naik, titik jatuh memantul) memakai CSS
// - prefers-reduced-motion: lapisan ini disembunyikan, logo statis tampil di hero
// - markup server = browser; lapisan baru terlihat setelah ukurannya diukur di browser

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
const DELAY: Record<Piece, string> = { nub: "0.1s", stem: "0.1s", middle: "0.22s", tall: "0.34s", dot: "0.6s" };

// Tahap scroll, dalam tinggi layar: menyatu sampai 0,22; terbang ke tepi sampai 0,6.
const MERGE_END = 0.22;
const FLY_END = 0.6;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: Rect, b: Rect, t: number): Rect => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
  w: lerp(a.w, b.w, t),
  h: lerp(a.h, b.h, t),
});

export function OneICharacter() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const pieceRefs = useRef<Partial<Record<Piece, HTMLDivElement | null>>>({});
  const [ready, setReady] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const anchor = anchorRef.current;
    const root = rootRef.current;
    if (!anchor || !root) return;

    // Ukuran yang di-cache (diukur ulang saat ukuran layar/halaman berubah).
    const size = { ox: 0, oy: 0, u: 0, gutter: 20, navH: 64, floor: 0, docH: 0 };
    const measure = () => {
      const rect = anchor.getBoundingClientRect();
      const u = Math.min(rect.width / GLYPH.w, rect.height / GLYPH.h);
      const page = anchor.closest<HTMLElement>(".px-page");
      const whatsapp = document.querySelector<HTMLElement>("[data-whatsapp-float]");
      size.u = u;
      size.ox = rect.left + window.scrollX + (rect.width - GLYPH.w * u) / 2;
      size.oy = rect.top + window.scrollY + (rect.height - GLYPH.h * u) / 2;
      size.gutter = page ? parseFloat(getComputedStyle(page).paddingRight) : 20;
      size.navH = document.querySelector("header")?.getBoundingClientRect().height ?? 64;
      size.floor = (whatsapp?.getBoundingClientRect().top ?? window.innerHeight) - 16;
      size.docH = document.documentElement.scrollHeight;
    };

    const place = (piece: Piece, rect: Rect, visible = true) => {
      const el = pieceRefs.current[piece];
      if (!el) return;
      el.style.transform = `translate3d(${rect.x}px, ${rect.y}px, 0)`;
      el.style.width = `${rect.w}px`;
      el.style.height = `${rect.h}px`;
      el.style.borderRadius = piece === "dot" ? "50%" : `${Math.min(rect.w, rect.h) * 0.3}px`;
      el.style.opacity = visible ? "1" : "0";
    };

    const update = () => {
      frame = 0;
      const scrolled = window.scrollY;
      const vh = window.innerHeight;
      const merge = ease(clamp01(scrolled / (vh * MERGE_END)));
      const fly = ease(clamp01((scrolled - vh * MERGE_END) / (vh * (FLY_END - MERGE_END))));
      const { ox, oy, u, gutter, navH, floor, docH } = size;
      const logo = (piece: Piece): Rect => {
        const r = LOGO[piece];
        return { x: ox + r.x * u, y: oy + r.y * u, w: r.w * u, h: r.h * u };
      };

      // Posisi akhir: "i" kecil di tengah gutter kanan, di bawah navbar.
      const uEnd = Math.min(16, Math.max(6, gutter * 0.2));
      const center = window.innerWidth - gutter / 2;
      const dotEnd: Rect = { x: center - (uEnd * 1.03) / 2, y: navH + Math.max(14, gutter * 0.3), w: uEnd * 1.03, h: uEnd * 1.03 };
      const barTop = dotEnd.y + dotEnd.h + Math.max(3, uEnd * 0.18);
      const minLength = uEnd * LOGO.tall.h;
      const maxLength = Math.max(minLength, floor - barTop);
      const progress = clamp01(scrolled / Math.max(1, docH - vh));
      const tallEnd: Rect = { x: center - uEnd / 2, y: barTop, w: uEnd, h: lerp(minLength, maxLength, progress) };

      const tall = mix(logo("tall"), tallEnd, fly);
      for (const piece of ["nub", "stem", "middle"] as const) {
        place(piece, fly > 0 ? tall : mix(logo(piece), logo("tall"), merge), fly === 0);
      }
      place("tall", tall);
      place("dot", mix(logo("dot"), dotEnd, fly));
      root.toggleAttribute("data-merged", fly > 0.5);
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
    observer.observe(document.body);
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
    <>
      {/* Tempat logo di hero. Untuk prefers-reduced-motion, logo statis tampil di sini. */}
      <div ref={anchorRef} aria-hidden="true" className="h-52 sm:h-64 lg:h-[min(34rem,62svh)]">
        <svg viewBox="146 66.5 359 492.5" className="mx-auto hidden h-full w-auto motion-reduce:block">
          <g className="fill-brand-blue">
            <rect x="146" y="392" width="80" height="42" rx="11" />
            <rect x="181" y="392" width="45" height="167" rx="11" />
            <rect x="415" y="176" width="90" height="383" rx="28" />
            <circle cx="461" cy="113" r="46.5" />
          </g>
          <rect x="281" y="285" width="87" height="274" rx="27" fill="#A8BAFE" />
        </svg>
      </div>
      <div
        ref={rootRef}
        aria-hidden="true"
        data-ready={ready ? "" : undefined}
        data-in={shown ? "" : undefined}
        className="one-i-character pointer-events-none invisible fixed inset-0 z-30 data-ready:visible motion-reduce:hidden"
      >
        {PIECES.map((piece) => (
          <div
            key={piece}
            ref={(el) => {
              pieceRefs.current[piece] = el;
            }}
            className="absolute top-0 left-0 will-change-transform"
          >
            <span
              className={cn("char-fill", piece === "middle" ? "bg-[#A8BAFE]" : "bg-brand-blue", piece === "dot" && "char-dot")}
              style={{ animationDelay: piece === "dot" ? `${DELAY.dot}, 1.8s` : DELAY[piece] }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
