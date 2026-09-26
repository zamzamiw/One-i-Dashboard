import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Logo resmi One-I, divektorkan dari docs/brand/logo-one-i-original.png.
// Versi file lengkapnya ada di app/icon.svg (favicon). Gradien latar pakai CSS
// supaya logo aman dipakai lebih dari sekali di satu halaman (tanpa bentrok id SVG).
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block size-9 shrink-0 overflow-hidden rounded-[22.7%] bg-linear-to-br from-[#0655FC] to-[#00B6FF]",
        className,
      )}
    >
      <svg viewBox="0 0 660 660" className="block size-full">
        <g fill="#FFFFFF">
          <rect x="146" y="392" width="80" height="42" rx="11" />
          <rect x="181" y="392" width="45" height="167" rx="11" />
          <rect x="415" y="176" width="90" height="383" rx="28" />
          <circle cx="461" cy="113" r="46.5" />
        </g>
        <rect x="281" y="285" width="87" height="274" rx="27" fill="#D6EBFC" />
      </svg>
    </span>
  );
}

// Tinggi ikon disamakan dengan blok nama + tagline (PRD 5.1).
export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="leading-none">
        <span className="block font-heading text-lg font-bold tracking-tight">{site.name}</span>
        <span className="mt-1 block text-[10px] font-medium tracking-[0.2em] text-muted-foreground">
          {site.tagline}
        </span>
      </span>
    </span>
  );
}
