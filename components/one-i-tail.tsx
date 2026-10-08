"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion/react";
import { onPageRevealed } from "@/lib/page-reveal";

// Karakter "i" One-I + ekornya (permintaan pemilik project, referensi garis karakter Indisea).
// - di hero: huruf "i" (titik + batang). Di ≥lg berdiri di kotak [data-one-i-start]; di bawah lg
//   di gutter kanan. Batangnya langsung menjadi ekor dengan ketebalan sama
// - ekor menempuh rute seperti perjalanan di peta: turun di gutter, lalu di celah antar section
//   berbelok menyeberang ke gutter seberang (kanan → kiri → kanan ...), jadi tidak menutupi teks
// - ujung ekor mengikuti pengguna: berada di 75% tinggi layar saat di-scroll (belokan
//   digambar selama ±35% tinggi layar), memendek lagi saat di-scroll ke atas
// - rute berakhir di section Contact Us ([data-one-i-end]): ekor turun, berbelok-U ke atas
//   dan membentuk huruf "i" lagi; titiknya muncul saat ekor selesai. Di dalam section biru itu
//   garisnya putih; di sepanjang gutter diberi tepi putih supaya terlihat di latar biru/navy
// - lapisan absolute selebar & setinggi isi halaman (induknya relative), z-30: di atas section,
//   di bawah navbar (z-50) dan tombol WhatsApp (z-40); pointer-events-none
// - per frame scroll hanya panjang garis yang terlihat (stroke-dasharray) yang diubah; rute
//   dihitung ulang saat ukuran halaman/layar berubah
// - prefers-reduced-motion: lapisan disembunyikan, "i" statis tampil di hero & Contact Us
const TIP = 0.75; // posisi ujung ekor, dalam tinggi layar
const TURN = 0.35; // jarak scroll untuk menggambar satu belokan, dalam tinggi layar
const ROUTE = ["masalah", "layanan", "cara-kerja", "kenapa", "testimoni"]; // section tempat ekor menyeberang

type Seg = { len: number; k0: number; k1: number };
type Point = { x: number; y: number };

// Panjang garis dibagi ke segmen; tiap segmen punya rentang "kunci" (posisi ujung ekor dalam
// koordinat halaman) saat ia digambar. Kunci selalu naik, sehingga panjang garis = f(scroll).
class Route {
  d: string;
  x: number;
  y: number;
  length = 0;
  segs: Seg[] = [];

  constructor(x: number, y: number) {
    this.d = `M ${x} ${y}`;
    this.x = x;
    this.y = y;
  }

  private add(len: number, k0: number, k1: number, x: number, y: number) {
    this.segs.push({ len, k0, k1: Math.max(k0, k1) });
    this.length += len;
    this.x = x;
    this.y = y;
  }

  line(x: number, y: number, k0: number, k1: number) {
    this.d += ` L ${x} ${y}`;
    this.add(Math.hypot(x - this.x, y - this.y), k0, k1, x, y);
  }

  arc(r: number, x: number, y: number, sweep: 0 | 1, k0: number, k1: number, len: number) {
    this.d += ` A ${r} ${r} 0 0 ${sweep} ${x} ${y}`;
    this.add(len, k0, k1, x, y);
  }

  cubic(c1: Point, c2: Point, end: Point, k0: number, k1: number) {
    let len = 0;
    let prev: Point = { x: this.x, y: this.y };
    for (let i = 1; i <= 48; i++) {
      const t = i / 48;
      const m = 1 - t;
      const p = {
        x: m * m * m * this.x + 3 * m * m * t * c1.x + 3 * m * t * t * c2.x + t * t * t * end.x,
        y: m * m * m * this.y + 3 * m * m * t * c1.y + 3 * m * t * t * c2.y + t * t * t * end.y,
      };
      len += Math.hypot(p.x - prev.x, p.y - prev.y);
      prev = p;
    }
    this.d += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`;
    this.add(len, k0, k1, end.x, end.y);
  }

  // Turun lalu menyeberang mendatar ke x lain di ketinggian y, lalu turun lagi (sudut membulat).
  cross(x: number, y: number, radius: number, k0: number, k1: number) {
    const dir = Math.sign(x - this.x) || 1;
    const r = Math.min(radius, Math.abs(x - this.x) / 2);
    const quarter = (Math.PI * r) / 2;
    const flat = Math.abs(x - this.x) - 2 * r;
    const key = (l: number) => k0 + ((k1 - k0) * l) / (2 * quarter + flat);
    this.line(this.x, Math.max(this.y, y - r), this.segs.at(-1)?.k1 ?? k0, k0);
    const xA = this.x;
    this.arc(r, xA + dir * r, y, dir < 0 ? 1 : 0, key(0), key(quarter), quarter);
    this.line(x - dir * r, y, key(quarter), key(quarter + flat));
    this.arc(r, x, y + r, dir < 0 ? 0 : 1, key(quarter + flat), k1, quarter);
  }

  lengthAt(key: number) {
    let total = 0;
    for (const s of this.segs) {
      if (key >= s.k1) {
        total += s.len;
        continue;
      }
      if (key > s.k0) total += (s.len * (key - s.k0)) / (s.k1 - s.k0);
      break;
    }
    return total;
  }
}

const padding = (el: Element | null, side: "paddingTop" | "paddingBottom") =>
  el ? parseFloat(getComputedStyle(el)[side]) || 0 : 0;

export function OneITail() {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const haloRef = useRef<SVGPathElement>(null);
  const tailRef = useRef<SVGPathElement>(null);
  const whiteRef = useRef<SVGPathElement>(null);
  const startDotRef = useRef<SVGCircleElement>(null);
  const endDotRef = useRef<SVGCircleElement>(null);
  const haloClipRef = useRef<SVGRectElement>(null);
  const whiteClipRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const svg = svgRef.current;
    const startDot = startDotRef.current;
    const endDot = endDotRef.current;
    const haloClip = haloClipRef.current;
    const whiteClip = whiteClipRef.current;
    const halo = haloRef.current;
    const tail = tailRef.current;
    const white = whiteRef.current;
    if (!root || !svg || !startDot || !endDot || !haloClip || !whiteClip || !halo || !tail || !white) return;
    const paths = [halo, tail, white];

    let route: Route | null = null;
    let top = 0; // posisi lapisan di halaman
    let stemBottom = 0;
    let stemLength = 0;
    let grown = 0; // animasi muncul batang "i" (0–1)

    const measure = () => {
      const box = root.getBoundingClientRect();
      const hero = document.getElementById("hero");
      const cta = document.getElementById("hubungi");
      const end = document.querySelector<HTMLElement>("[data-one-i-end]");
      const start = document.querySelector<HTMLElement>("[data-one-i-start]");
      if (!hero || !cta || !end || !start) return;
      const rel = (rect: DOMRect) => ({ left: rect.left - box.left, top: rect.top - box.top, width: rect.width, height: rect.height, bottom: rect.bottom - box.top });
      const vh = window.innerHeight;
      const page = hero.querySelector(".px-page");
      const gutter = page ? parseFloat(getComputedStyle(page).paddingRight) : 20;
      // Tebal "i" + ekor: sedang (±23px di 1440, 26px maks., 10px di HP), tetap muat di gutter.
      const width = Math.min(26, Math.max(10, gutter * 0.32));
      const dotR = width * 0.65;
      const xRight = box.width - gutter / 2;
      const xLeft = gutter / 2;
      const heroBox = rel(hero.getBoundingClientRect());

      // Huruf "i" di hero.
      const startRect = start.getBoundingClientRect();
      let x0 = xRight;
      let dotTop: number;
      if (startRect.height > 0) {
        const s = rel(startRect);
        x0 = s.left + s.width / 2;
        dotTop = s.top;
        stemBottom = s.bottom;
      } else {
        const title = hero.querySelector("h1")?.getBoundingClientRect();
        dotTop = title ? title.top - box.top : heroBox.top + 64;
        stemBottom = heroBox.bottom - 24;
      }
      const stemTop = dotTop + dotR * 2 + width * 0.45 + width / 2;
      stemLength = Math.max(0, stemBottom - stemTop);
      startDot.setAttribute("cx", `${x0}`);
      startDot.setAttribute("cy", `${dotTop + dotR}`);
      startDot.setAttribute("r", `${dotR}`);

      const next = new Route(x0, stemTop);
      next.line(x0, stemBottom, -Infinity, -Infinity);

      // Titik belok di celah antar section: di padding yang lebih lebar (atas section berikut
      // atau bawah section sebelumnya), jadi garis mendatar tidak menabrak isi.
      const turnAt = (prev: Element, section: Element) => {
        const rect = rel(section.getBoundingClientRect());
        const below = Math.max(padding(section, "paddingTop"), padding(section.firstElementChild, "paddingTop"));
        const above = padding(prev, "paddingBottom");
        const space = Math.max(below, above);
        const y = below >= above ? rect.top + below * 0.4 : rect.top - above * 0.4;
        return { y, r: Math.max(width * 0.6, Math.min(width * 2, space * 0.3)) };
      };
      const half = (TURN * vh) / 2;

      // Dari bawah batang "i" ke gutter kanan.
      const sections = ["tentang", ...ROUTE].map((id) => document.getElementById(id));
      if (sections.some((s) => !s)) return;
      const first = turnAt(hero, sections[0]!);
      const dy = first.y - stemBottom;
      next.cubic({ x: x0, y: stemBottom + dy * 0.6 }, { x: xRight, y: stemBottom + dy * 0.4 }, { x: xRight, y: first.y }, stemBottom, first.y);

      let side = xRight;
      let key = first.y;
      for (let i = 1; i < sections.length; i++) {
        const { y, r } = turnAt(sections[i - 1]!, sections[i]!);
        const other = side === xRight ? xLeft : xRight;
        next.line(side, Math.max(next.y, y - r), key, y - half);
        next.cross(other, y, r, y - half, y + half);
        side = other;
        key = y + half;
      }

      // Akhir rute: masuk section Contact Us, turun, belok-U ke atas, dan membentuk "i".
      const ctaBox = rel(cta.getBoundingClientRect());
      const e = rel(end.getBoundingClientRect());
      const u = Math.min(width * 2.5, Math.max(width * 1.2, e.width * 0.12));
      const xe = e.left + e.width / 2 - u;
      const beside = e.top - ctaBox.top < ctaBox.height * 0.5;
      const pad = padding(cta.firstElementChild, "paddingTop");
      const yEnter = beside ? ctaBox.top + pad * 0.4 : e.top + width * 1.5;
      const rEnter = Math.max(width * 0.6, Math.min(width * 2, (beside ? pad : e.height) * 0.3));
      const uBottom = e.top + e.height * 0.72;
      const stemTopEnd = Math.max(e.top + dotR * 2 + width * 1.2, uBottom - u - Math.max(width * 4, e.height * 0.38));
      next.line(side, Math.max(next.y, yEnter - rEnter), key, yEnter - half);
      next.cross(xe, yEnter, rEnter, yEnter - half, yEnter + half);
      // Belokan-U + batang "i" digambar lebih awal (mulai saat dasarnya di ±88% layar, selesai di
      // ±68%), supaya "i" sudah utuh selagi section Contact Us masih terlihat penuh.
      const k0 = uBottom - u - 0.13 * vh;
      const k1 = uBottom - u + 0.07 * vh;
      next.line(xe, uBottom - u, yEnter + half, k0);
      const curl = Math.PI * u;
      const rise = uBottom - u - stemTopEnd;
      next.arc(u, xe + 2 * u, uBottom - u, 0, k0, k0 + ((k1 - k0) * curl) / (curl + rise), curl);
      next.line(xe + 2 * u, stemTopEnd, k0 + ((k1 - k0) * curl) / (curl + rise), k1);
      endDot.setAttribute("cx", `${xe + 2 * u}`);
      endDot.setAttribute("cy", `${stemTopEnd - width / 2 - width * 0.45 - dotR}`);
      endDot.setAttribute("r", `${dotR}`);

      svg.setAttribute("width", `${box.width}`);
      svg.setAttribute("height", `${box.height}`);
      for (const [index, path] of paths.entries()) {
        path.setAttribute("d", next.d);
        path.setAttribute("stroke-width", `${index === 0 ? width + 4 : width}`);
      }
      // Tepi putih hanya di antara hero dan Contact Us; garis putih hanya di dalam Contact Us.
      haloClip.setAttribute("y", `${heroBox.bottom}`);
      haloClip.setAttribute("height", `${Math.max(0, ctaBox.top - heroBox.bottom)}`);
      haloClip.setAttribute("width", `${box.width}`);
      whiteClip.setAttribute("y", `${ctaBox.top}`);
      whiteClip.setAttribute("height", `${ctaBox.height}`);
      whiteClip.setAttribute("width", `${box.width}`);
      top = box.top + window.scrollY;
      route = next;
    };

    const update = () => {
      frame = 0;
      if (!route) return;
      // Ekor baru keluar setelah halaman di-scroll, lalu menyusul ke garis 75% layar.
      const key = Math.min(window.scrollY + window.innerHeight * TIP - top, stemBottom + window.scrollY * 1.5);
      const visible = grown < 1 ? grown * stemLength : route.lengthAt(key);
      for (const path of paths) path.style.strokeDasharray = `${visible} ${route.length + 100}`;
      svg.toggleAttribute("data-done", visible >= route.length - 1);
    };

    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const refresh = () => {
      measure();
      schedule();
    };

    refresh();
    const observer = new ResizeObserver(refresh);
    observer.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", refresh);
    let growth: { stop: () => void } | undefined;
    const stopWaiting = onPageRevealed(() => {
      svg.setAttribute("data-in", "");
      growth = animate(0, 1, {
        duration: 0.9,
        ease: [0.3, 0.7, 0.3, 1],
        onUpdate: (value) => {
          grown = value;
          schedule();
        },
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", refresh);
      stopWaiting();
      growth?.stop();
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 overflow-hidden motion-reduce:hidden">
      <svg ref={svgRef} className="one-i-tail absolute top-0 left-0" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <clipPath id="one-i-halo">
            <rect ref={haloClipRef} x="0" y="0" width="0" height="0" />
          </clipPath>
          <clipPath id="one-i-white">
            <rect ref={whiteClipRef} x="0" y="0" width="0" height="0" />
          </clipPath>
        </defs>
        <path ref={haloRef} stroke="#ffffff" clipPath="url(#one-i-halo)" strokeDasharray="0 1" />
        <path ref={tailRef} className="stroke-brand-blue" strokeDasharray="0 1" />
        <path ref={whiteRef} stroke="#ffffff" clipPath="url(#one-i-white)" strokeDasharray="0 1" />
        <circle ref={startDotRef} className="tail-start-dot fill-brand-blue" r="0" />
        <circle ref={endDotRef} className="tail-end-dot fill-white" r="0" />
      </svg>
    </div>
  );
}
