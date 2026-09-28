import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import type { TechLogo } from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

// Logo cloud (turunan "logo-cloud-4" dari 21st.dev), disesuaikan:
// - selebar layar (aturan layout project), garis atas-bawah penuh, tepi kiri-kanan diberi
//   warna brand-surface + blur bertahap
// - logo berupa ikon SVG + nama (bukan <img> dari CDN). Path tiap ikon ditulis SEKALI sebagai
//   <symbol> lalu dipakai ulang lewat <use>, karena slider menampilkan isinya dua kali.
// - warna ikon satu warna (navy lembut) supaya menyatu dengan palet brand
const slug = (name: string) => `tech-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export function LogoCloud({ logos, label, className }: { logos: TechLogo[]; label?: string; className?: string }) {
  return (
    <div className={cn("relative border-y bg-gradient-to-r from-brand-surface via-transparent to-brand-surface py-6 sm:py-8", className)}>
      <svg aria-hidden="true" className="absolute size-0 overflow-hidden">
        <defs>
          {logos.map((logo) => (
            <symbol key={logo.name} id={slug(logo.name)} viewBox="0 0 24 24">
              <path d={logo.path} />
            </symbol>
          ))}
        </defs>
      </svg>

      <InfiniteSlider gap={56} speed={40} speedOnHover={12} reverse label={label}>
        {logos.map((logo) => (
          <li key={logo.name} className="flex items-center gap-3 text-brand-navy/70 select-none">
            <svg aria-hidden="true" className="size-6 shrink-0 fill-current sm:size-7">
              <use href={`#${slug(logo.name)}`} />
            </svg>
            <span className="font-heading text-base font-semibold whitespace-nowrap sm:text-lg">{logo.name}</span>
          </li>
        ))}
      </InfiniteSlider>

      <ProgressiveBlur
        blurIntensity={1}
        direction="left"
        className="pointer-events-none absolute top-0 left-0 h-full w-16 sm:w-40 motion-reduce:hidden"
      />
      <ProgressiveBlur
        blurIntensity={1}
        direction="right"
        className="pointer-events-none absolute top-0 right-0 h-full w-16 sm:w-40 motion-reduce:hidden"
      />
    </div>
  );
}
