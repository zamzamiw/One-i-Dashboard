import type { LucideIcon } from "lucide-react";
import { EyeOff, FileStack, MapPinOff, Percent, Truck } from "lucide-react";
import { Reveal } from "@/components/reveal";

// PRD 5.4. Judul dan deskripsi rata tengah, kartu tersusun di tengah halaman.
// Teks kartu rata kiri, bukan justify: justify pada kalimat pendek membuat jarak
// antarkata renggang, terutama di layar HP. Garis amber = "garis masalah" (PRD 6).
const problems: { icon: LucideIcon; text: string }[] = [
  { icon: EyeOff, text: "Aktivitas sales di lapangan sulit dipantau secara real-time" },
  { icon: Percent, text: "Margin keuntungan per pelanggan tidak terlihat jelas" },
  { icon: FileStack, text: "Laporan manajemen tersebar dan tidak saling terhubung" },
  {
    icon: MapPinOff,
    text: "Rute dan pergerakan tim sales tidak terencana, mengakibatkan kunjungan tidak efektif dan toko terlewat",
  },
  { icon: Truck, text: "Rute pengiriman yang tidak terstruktur dengan rapi, menghambat efisiensi" },
];

export function Problems() {
  return (
    <section id="masalah" className="py-20 sm:py-28">
      <div className="px-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl 2xl:text-5xl">
            Masalah yang Dihadapi Distributor
          </h2>
          {/* TODO: konfirmasi copy. PRD 5.4 menyebut deskripsi tapi belum menyediakan teksnya. */}
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Banyak distributor masih mengandalkan laporan manual dan data yang tersebar, sehingga
            masalah di lapangan baru terlihat ketika sudah terlambat.
          </p>
        </div>

        <ul className="mt-12 flex flex-wrap justify-center gap-4 lg:gap-6">
          {problems.map(({ icon: Icon, text }, index) => (
            <li key={text} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-3rem)/3)]">
              <Reveal
                delay={index * 0.06}
                className="flex h-full gap-4 rounded-xl border-l-4 border-brand-amber bg-brand-surface p-5"
              >
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand-amber"
                >
                  <Icon className="size-5" />
                </span>
                <p className="leading-relaxed font-medium">{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
