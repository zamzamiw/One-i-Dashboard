import type { LucideIcon } from "lucide-react";
import { ArrowDown, EyeOff, FileStack, MapPinOff, Percent, Truck } from "lucide-react";
import { FlowArt, FlowSection } from "@/components/ui/story-scroll";
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

// TODO: konfirmasi judul singkat tiap masalah (draft Claude; PRD 5.4 hanya berisi kalimatnya).
const problems: { icon: LucideIcon; title: string; text: string; theme: keyof typeof themes }[] = [
  {
    icon: EyeOff,
    title: "Tim sales tak terpantau",
    text: "Aktivitas sales di lapangan sulit dipantau secara real-time",
    theme: "navy",
  },
  {
    icon: Percent,
    title: "Margin tak terlihat",
    text: "Margin keuntungan per pelanggan tidak terlihat jelas",
    theme: "blue",
  },
  {
    icon: FileStack,
    title: "Laporan tercecer",
    text: "Laporan manajemen tersebar dan tidak saling terhubung",
    theme: "surface",
  },
  {
    icon: MapPinOff,
    title: "Rute tanpa rencana",
    text: "Rute dan pergerakan tim sales tidak terencana, mengakibatkan kunjungan tidak efektif dan toko terlewat",
    theme: "blue",
  },
  {
    icon: Truck,
    title: "Pengiriman tidak efisien",
    text: "Rute pengiriman yang tidak terstruktur dengan rapi, menghambat efisiensi",
    theme: "navy",
  },
];

const headingSize = "text-[length:clamp(2.75rem,min(9vw,14svh),10rem)] leading-[0.92] font-bold tracking-tight";
const bodySize = "text-[length:clamp(1.125rem,2vw,1.75rem)] leading-snug";
const total = String(problems.length).padStart(2, "0");

export function Problems() {
  return (
    <section id="masalah" aria-labelledby="masalah-judul">
      <FlowArt>
        {/* Panel pembuka tanpa latar: grid titik di belakang halaman tetap terlihat. */}
        <FlowSection>
          <div className="space-y-8">
            <h2 id="masalah-judul" className={cn(headingSize, "max-w-[14ch] text-balance")}>
              Masalah yang Dihadapi Distributor
            </h2>
            <hr className="border-brand-amber" />
          </div>
          <div className="flex items-end justify-between gap-6">
            {/* TODO: konfirmasi copy. PRD 5.4 menyebut deskripsi tapi belum menyediakan teksnya. */}
            <p className={cn(bodySize, "max-w-[40ch] text-muted-foreground")}>
              Banyak distributor masih mengandalkan laporan manual dan data yang tersebar, sehingga
              masalah di lapangan baru terlihat ketika sudah terlambat.
            </p>
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center border border-brand-navy/20 sm:size-14"
            >
              <ArrowDown className="size-5 sm:size-6" />
            </span>
          </div>
        </FlowSection>

        {problems.map(({ icon: Icon, title, text, theme }, index) => {
          const t = themes[theme];
          return (
            <FlowSection key={title} className={t.panel}>
              <div className="space-y-8">
                <div className="flex items-center justify-between gap-4">
                  <p className={cn("font-mono text-xs tracking-[0.2em] uppercase sm:text-sm", t.muted)}>
                    Masalah {String(index + 1).padStart(2, "0")} / {total}
                  </p>
                  <span
                    aria-hidden="true"
                    className={cn("flex size-12 shrink-0 items-center justify-center border sm:size-14", t.icon)}
                  >
                    <Icon className="size-6 sm:size-7" />
                  </span>
                </div>
                <hr className={t.rule} />
                <h3 className={cn(headingSize, "max-w-[16ch] text-balance")}>{title}</h3>
              </div>
              <div className="space-y-8">
                <hr className={t.rule} />
                <p className={cn(bodySize, "max-w-[36ch] font-medium")}>{text}</p>
              </div>
            </FlowSection>
          );
        })}
      </FlowArt>
    </section>
  );
}
