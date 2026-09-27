import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Logo resmi One-I, divektorkan dari docs/brand/logo-one-i-original.png dengan warna
// latar brand-blue (keputusan pemilik project). Versi file lengkapnya: app/icon.svg.
// `inverse` (kotak putih, glyph biru) untuk dipakai di atas latar brand-blue.
export function LogoMark({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block size-9 shrink-0 overflow-hidden rounded-[22.7%]",
        inverse ? "bg-white text-brand-blue" : "bg-brand-blue text-white",
        className,
      )}
    >
      <svg viewBox="0 0 660 660" className="block size-full">
        <g fill="currentColor">
          <rect x="146" y="392" width="80" height="42" rx="11" />
          <rect x="181" y="392" width="45" height="167" rx="11" />
          <rect x="415" y="176" width="90" height="383" rx="28" />
          <circle cx="461" cy="113" r="46.5" />
        </g>
        <rect x="281" y="285" width="87" height="274" rx="27" fill={inverse ? "#A8BAFE" : "#D8E0FE"} />
      </svg>
    </span>
  );
}

// Dengan tagline (footer): tinggi ikon disamakan dengan blok nama + tagline (PRD 5.1).
// Navbar memakai `tagline={false}`: ikon + nama saja (keputusan pemilik project).
export function Logo({ inverse = false, tagline = true }: { inverse?: boolean; tagline?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark inverse={inverse} />
      {tagline ? (
        <span className="leading-none">
          <span className="block font-heading text-lg font-bold tracking-tight">{site.name}</span>
          <span
            className={cn(
              "mt-1 block text-[10px] font-medium tracking-[0.2em]",
              inverse ? "text-white/90" : "text-muted-foreground",
            )}
          >
            {site.tagline}
          </span>
        </span>
      ) : (
        <span className="font-heading text-xl leading-none font-bold tracking-tight">{site.name}</span>
      )}
    </span>
  );
}
