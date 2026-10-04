"use client";

import { useEffect, useRef } from "react";

// Ekor karakter One-I (permintaan pemilik project): garis biru yang keluar dari bawah batang
// "i" di hero, melengkung ke tengah gutter kanan, lalu turun di setiap section sampai footer.
// Ujungnya mengikuti pengguna: selalu berada di 75% tinggi layar saat di-scroll (memendek lagi
// saat di-scroll ke atas). Karakternya sendiri tetap di hero (components/one-i-character.tsx).
// - lapisan absolute selebar & setinggi halaman (induknya relative), z-30: di atas section, di
//   bawah navbar (z-50) dan tombol WhatsApp (z-40); pointer-events-none
// - garis di koordinat halaman, jadi ikut tergulir mulus; per frame scroll hanya panjang garis
//   yang terlihat (stroke-dasharray) yang diubah. Bagian di gutter diberi tepi putih supaya
//   tetap terlihat di atas latar biru/navy
// - prefers-reduced-motion: tidak ditampilkan
const TIP = 0.75; // posisi ujung ekor, dalam tinggi layar

export function OneITail() {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tailRef = useRef<SVGPathElement>(null);
  const haloRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const svg = svgRef.current;
    const tail = tailRef.current;
    const halo = haloRef.current;
    if (!root || !svg || !tail || !halo) return;

    const geo = { top: 0, startY: 0, curveEndY: 0, endY: 0, curveLength: 0, total: 0, ready: false };

    const measure = () => {
      const start = document.querySelector<HTMLElement>("[data-one-i-tail]");
      const hero = document.getElementById("hero");
      if (!start || !hero) return;
      const box = root.getBoundingClientRect();
      const bar = start.getBoundingClientRect();
      const heroBottom = hero.getBoundingClientRect().bottom - box.top;
      const page = hero.querySelector<HTMLElement>(".px-page");
      const gutter = page ? parseFloat(getComputedStyle(page).paddingRight) : 20;
      const width = Math.min(16, Math.max(6, gutter * 0.2));

      const x0 = bar.left + bar.width / 2 - box.left;
      const y0 = bar.bottom - box.top;
      const xg = box.width - gutter / 2;
      const y3 = heroBottom + 40;
      const endY = box.height - 16;
      const dy = y3 - y0;

      svg.setAttribute("width", `${box.width}`);
      svg.setAttribute("height", `${box.height}`);
      tail.setAttribute("d", `M ${x0} ${y0} C ${x0} ${y0 + dy * 0.6}, ${xg} ${y0 + dy * 0.4}, ${xg} ${y3} L ${xg} ${endY}`);
      halo.setAttribute("d", `M ${xg} ${y3} L ${xg} ${endY}`);
      tail.setAttribute("stroke-width", `${width}`);
      halo.setAttribute("stroke-width", `${width + 4}`);

      geo.top = box.top + window.scrollY;
      geo.startY = y0;
      geo.curveEndY = y3;
      geo.endY = endY;
      geo.total = tail.getTotalLength();
      geo.curveLength = geo.total - (endY - y3);
      geo.ready = endY > y3;
    };

    const update = () => {
      frame = 0;
      if (!geo.ready) return;
      // Ekor baru keluar setelah halaman di-scroll (di tablet batang "i" sudah di atas 75% layar
      // sejak awal), lalu menyusul ke garis 75% layar dan mengikutinya.
      const tipY = Math.min(window.scrollY + window.innerHeight * TIP - geo.top, geo.startY + window.scrollY * 1.5);
      let length = 0;
      if (tipY >= geo.curveEndY) {
        length = geo.curveLength + Math.min(tipY, geo.endY) - geo.curveEndY;
      } else if (tipY > geo.startY) {
        // Di bagian lengkung: cari panjang yang titiknya setinggi ujung ekor.
        let low = 0;
        let high = geo.curveLength;
        for (let i = 0; i < 14; i++) {
          const mid = (low + high) / 2;
          if (tail.getPointAtLength(mid).y < tipY) low = mid;
          else high = mid;
        }
        length = low;
      }
      const haloLength = Math.min(Math.max(0, tipY - geo.curveEndY), geo.endY - geo.curveEndY);
      tail.style.strokeDasharray = `${length} ${geo.total + 20}`;
      halo.style.strokeDasharray = `${haloLength} ${geo.total + 20}`;
      tail.style.opacity = length > 0.5 ? "1" : "0";
      halo.style.opacity = haloLength > 0.5 ? "1" : "0";
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
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 overflow-hidden motion-reduce:hidden">
      <svg ref={svgRef} className="absolute top-0 left-0" fill="none">
        <path ref={haloRef} stroke="#ffffff" strokeLinecap="round" opacity="0" />
        <path ref={tailRef} className="stroke-brand-blue" strokeLinecap="round" opacity="0" />
      </svg>
    </div>
  );
}
