import { InfiniteSlider } from "@/components/ui/infinite-slider";
import type { TechLogo } from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

// Logo cloud (turunan "logo-cloud-4" dari 21st.dev), disesuaikan:
// - selebar layar (aturan layout project) dan menyatu dengan latar halaman: tanpa garis/kotak,
//   tepi kiri-kanan memudar lewat mask (blur bertahap versi aslinya dihapus atas permintaan
//   pemilik karena ikut mengaburkan grid titik di belakangnya dan tampak seperti kotak)
// - logo berupa ikon SVG + nama (bukan <img> dari CDN). Path tiap ikon ditulis SEKALI sebagai
//   <symbol> lalu dipakai ulang lewat <use>, karena slider menampilkan isinya dua kali.
// - warna ikon satu warna (navy lembut) supaya menyatu dengan palet brand
const slug = (name: string) => `tech-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export function LogoCloud({ logos, label, className }: { logos: TechLogo[]; label?: string; className?: string }) {
  return (
    <div className={cn("relative py-2", className)}>
      <svg aria-hidden="true" className="absolute size-0 overflow-hidden">
        <defs>
          {logos.map((logo) => (
            <symbol key={logo.name} id={slug(logo.name)} viewBox="0 0 24 24">
              <path d={logo.path} />
            </symbol>
          ))}
        </defs>
      </svg>

      <InfiniteSlider
        gap={56}
        speed={40}
        speedOnHover={12}
        reverse
        label={label}
        className="motion-safe:[mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]"
      >
        {logos.map((logo) => (
          <li key={logo.name} className="flex items-center gap-3 text-brand-navy/70 select-none">
            <svg aria-hidden="true" className="size-6 shrink-0 fill-current sm:size-7">
              <use href={`#${slug(logo.name)}`} />
            </svg>
            <span className="font-heading text-base font-semibold whitespace-nowrap sm:text-lg">{logo.name}</span>
          </li>
        ))}
      </InfiniteSlider>
    </div>
  );
}
