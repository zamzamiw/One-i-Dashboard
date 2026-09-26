import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// TODO: ikon sementara. Ganti dengan file logo resmi One-I (PRD 6: grafik bar biru).
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-9 text-brand-blue", className)}>
      <rect x="3" y="17" width="7" height="12" rx="2" fill="currentColor" opacity="0.45" />
      <rect x="12.5" y="10" width="7" height="19" rx="2" fill="currentColor" opacity="0.7" />
      <rect x="22" y="3" width="7" height="26" rx="2" fill="currentColor" />
    </svg>
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
