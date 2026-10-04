"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

// Latar halaman: shader GrainGradient dari Paper (@paper-design/shaders-react, komponen
// "paper-design-shader-background" 21st.dev), disesuaikan dengan tema One-I:
// - warna putih + biru brand (bukan latar hitam + oranye/kuning/merah versi aslinya), dilapisi
//   selubung putih 60% supaya teks di atasnya tetap terbaca
// - lapisan fixed di belakang konten (-z-10, pointer-events-none), jadi terlihat di section
//   tanpa latar; ditambah grid garis tipis (.bg-grid) di atasnya
// - kode shader dimuat terpisah setelah halaman tampil (next/dynamic, ssr: false) supaya tidak
//   memperlambat muat awal; sebelum siap latar putih + grid saja, lalu shader memudar masuk
// - resolusi render dibatasi (gradien lembut tidak butuh resolusi penuh); Paper sendiri
//   menghentikan render saat tab tidak aktif atau kanvas tidak terlihat
// - prefers-reduced-motion: gradien diam (speed 0)
const GrainGradient = dynamic(() => import("@paper-design/shaders-react").then((mod) => mod.GrainGradient), {
  ssr: false,
});

export function GradientBackground() {
  const reduceMotion = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-white">
      <GrainGradient
        className="shader-fade-in"
        style={{ height: "100%", width: "100%" }}
        colorBack="#ffffff"
        colors={["#5B78FC", "#A8BAFE", "#D8E0FE"]}
        softness={1}
        intensity={0.25}
        noise={0}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={reduceMotion ? 0 : 0.6}
        minPixelRatio={1}
        maxPixelCount={1280 * 800}
      />
      {/* Selubung putih: menjaga teks abu & biru di atas gradien tetap lolos kontras AA. */}
      <div className="absolute inset-0 bg-white/60" />
      <div className="bg-grid absolute inset-0" />
    </div>
  );
}
