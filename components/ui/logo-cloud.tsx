import type { CSSProperties } from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import type { TechLogo } from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

// Logo teknologi sebagai kartu dalam dua baris berjalan lambat berlawanan arah (referensi
// Indisea dari pemilik project; dasar slider dari "logo-cloud-4" 21st.dev):
// - saat kursor di atas satu kartu: barisnya berhenti pelan, kartu itu terangkat dan ikonnya
//   berwarna asli brand, kartu lain buram tipis (aturan .logo-cloud di globals.css)
// - selebar layar, tepi kiri-kanan memudar lewat mask; tanpa garis/kotak pembungkus
// - logo = ikon SVG + nama. Path tiap ikon ditulis SEKALI sebagai <symbol> lalu dipakai ulang
//   lewat <use>, karena setiap logo tampil empat kali (2 baris × 2 salinan slider)
// - baris kedua = urutan digeser setengah, aria-hidden (isinya sama dengan baris pertama);
//   prefers-reduced-motion: hanya baris pertama, diam, kartu dibungkus rata tengah
const slug = (name: string) => `tech-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
const fade = "motion-safe:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]";
const SPEED = 18; // px per detik

function Card({ logo }: { logo: TechLogo }) {
  return (
    <li
      className="logo-card group flex h-24 w-44 shrink-0 items-center justify-center gap-3 rounded-2xl bg-white px-5 text-brand-navy/80 shadow-[0_1px_2px_rgb(15_23_42/0.04)] ring-1 ring-brand-navy/6 transition-[filter,opacity,transform,box-shadow] duration-300 select-none hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgb(37_82_252/0.35)] hover:ring-brand-blue/30 motion-reduce:transition-none sm:h-28 sm:w-52 lg:h-32 lg:w-60"
      style={{ "--logo-color": logo.hex } as CSSProperties}
    >
      <svg
        aria-hidden="true"
        className="size-7 shrink-0 fill-current transition-colors duration-300 group-hover:text-(--logo-color) sm:size-8"
      >
        <use href={`#${slug(logo.name)}`} />
      </svg>
      <span className="font-heading text-base font-semibold whitespace-nowrap sm:text-lg">{logo.name}</span>
    </li>
  );
}

export function LogoCloud({ logos, label, className }: { logos: TechLogo[]; label?: string; className?: string }) {
  const half = Math.ceil(logos.length / 2);
  const shifted = [...logos.slice(half), ...logos.slice(0, half)];

  return (
    <div className={cn("logo-cloud relative space-y-4 py-2 sm:space-y-5", className)}>
      <svg aria-hidden="true" className="absolute size-0 overflow-hidden">
        <defs>
          {logos.map((logo) => (
            <symbol key={logo.name} id={slug(logo.name)} viewBox="0 0 24 24">
              <path d={logo.path} />
            </symbol>
          ))}
        </defs>
      </svg>

      <InfiniteSlider gap={16} speed={SPEED} speedOnHover={0} label={label} className={cn(fade, "-my-3 py-5")}>
        {logos.map((logo) => (
          <Card key={logo.name} logo={logo} />
        ))}
      </InfiniteSlider>
      <div aria-hidden="true" className="motion-reduce:hidden">
        <InfiniteSlider gap={16} speed={SPEED} speedOnHover={0} reverse className={cn(fade, "-my-3 py-5")}>
          {shifted.map((logo) => (
            <Card key={logo.name} logo={logo} />
          ))}
        </InfiniteSlider>
      </div>
    </div>
  );
}
