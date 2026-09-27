import type { LucideIcon } from "lucide-react";
import { ArrowDown, EyeOff, FileStack, MapPinOff, Percent, Truck } from "lucide-react";
import { FlowArt, FlowSection } from "@/components/ui/story-scroll";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

// PRD 5.4 dengan efek story scroll (keputusan pemilik project): panel pembuka berisi judul +
// deskripsi, lalu satu panel per masalah yang naik sambil berputar dan menumpuk.
// Warna panel bergantian supaya tiap panel baru terlihat menutupi yang sebelumnya.
// Garis amber = "garis masalah" (PRD 6), hanya dekoratif.
const themes = {
  navy: {
    panel: "bg-brand-navy text-white",
    muted: "text-white/80",
    rule: "border-brand-amber",
    icon: "border-white/20 text-brand-amber",
  },
  blue: {
    panel: "bg-brand-blue text-white",
    muted: "text-white/90",
    rule: "border-white/40",
    icon: "border-white/40 text-white",
  },
  surface: {
    panel: "bg-brand-surface text-brand-navy",
    muted: "text-muted-foreground",
    rule: "border-brand-amber",
    icon: "border-brand-navy/15 text-brand-blue",
  },
};

// Ikon dan warna per masalah, berurutan sesuai kamus problems.items.
const visuals: { icon: LucideIcon; theme: keyof typeof themes }[] = [
  { icon: EyeOff, theme: "navy" },
  { icon: Percent, theme: "blue" },
  { icon: FileStack, theme: "surface" },
  { icon: MapPinOff, theme: "blue" },
  { icon: Truck, theme: "navy" },
];

const headingSize = "text-[length:clamp(2.75rem,min(9vw,14svh),10rem)] leading-[0.92] font-bold tracking-tight";
const bodySize = "text-[length:clamp(1.125rem,2vw,1.75rem)] leading-snug";
export function Problems({ t }: { t: Dictionary["problems"] }) {
  const total = String(t.items.length).padStart(2, "0");
  return (
    <section id="masalah" aria-labelledby="masalah-judul">
      <FlowArt>
        {/* Panel pembuka tanpa latar: grid titik di belakang halaman tetap terlihat. */}
        <FlowSection>
          <div className="space-y-8">
            <h2 id="masalah-judul" className={cn(headingSize, "max-w-[14ch] text-balance")}>
              {t.title}
            </h2>
            <hr className="border-brand-amber" />
          </div>
          <div className="flex items-end justify-between gap-6">
            <p className={cn(bodySize, "max-w-[40ch] text-muted-foreground")}>{t.description}</p>
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center border border-brand-navy/20 sm:size-14"
            >
              <ArrowDown className="size-5 sm:size-6" />
            </span>
          </div>
        </FlowSection>

        {t.items.map(({ title, text }, index) => {
          const { icon: Icon, theme } = visuals[index];
          const colors = themes[theme];
          return (
            <FlowSection key={title} className={colors.panel}>
              <div className="space-y-8">
                <div className="flex items-center justify-between gap-4">
                  <p className={cn("font-mono text-xs tracking-[0.2em] uppercase sm:text-sm", colors.muted)}>
                    {t.counter} {String(index + 1).padStart(2, "0")} / {total}
                  </p>
                  <span
                    aria-hidden="true"
                    className={cn("flex size-12 shrink-0 items-center justify-center border sm:size-14", colors.icon)}
                  >
                    <Icon className="size-6 sm:size-7" />
                  </span>
                </div>
                <hr className={colors.rule} />
                <h3 className={cn(headingSize, "max-w-[16ch] text-balance")}>{title}</h3>
              </div>
              <div className="space-y-8">
                <hr className={colors.rule} />
                <p className={cn(bodySize, "max-w-[36ch] font-medium")}>{text}</p>
              </div>
            </FlowSection>
          );
        })}
      </FlowArt>
    </section>
  );
}
