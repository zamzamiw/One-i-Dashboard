import type { CSSProperties } from "react";

// Latar ambient (permintaan pemilik project, menggantikan grid titik interaktif): putih dengan
// gumpalan biru brand yang bergeser sangat pelan, plus grid garis tipis. Tanpa JavaScript dan
// tidak mengikuti kursor; gerakannya animasi CSS (.ambient-* di globals.css) yang diam untuk
// prefers-reduced-motion. Dipasang fixed di belakang konten, jadi hanya terlihat di section tanpa
// latar (Hero, panel pembuka Masalah, Cara Kerja, CTA, Teknologi). Warna paling pekat ±18% biru
// di pusat gumpalan, sehingga teks abu (#475569) tetap di atas kontras 4.5:1.
const blobs: Record<string, string>[] = [
  {
    top: "-22vmax",
    left: "-18vmax",
    width: "62vmax",
    height: "62vmax",
    "--blob-color": "rgb(37 82 252 / 0.18)",
    "--blob-dx": "14vmax",
    "--blob-dy": "10vmax",
    "--blob-scale": "1.1",
    "--blob-duration": "26s",
  },
  {
    right: "-20vmax",
    bottom: "-24vmax",
    width: "58vmax",
    height: "58vmax",
    "--blob-color": "rgb(37 82 252 / 0.14)",
    "--blob-dx": "-12vmax",
    "--blob-dy": "-14vmax",
    "--blob-scale": "1.15",
    "--blob-duration": "32s",
  },
  {
    top: "30%",
    right: "10%",
    width: "34vmax",
    height: "34vmax",
    "--blob-color": "rgb(216 224 254 / 0.7)",
    "--blob-dx": "-16vmax",
    "--blob-dy": "8vmax",
    "--blob-scale": "0.9",
    "--blob-duration": "38s",
  },
];

export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {blobs.map((style, index) => (
        <div key={index} className="ambient-blob" style={style as CSSProperties} />
      ))}
      <div className="ambient-grid absolute inset-0" />
    </div>
  );
}
