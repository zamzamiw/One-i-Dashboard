import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

// Kartu bertumpuk miring (turunan "display-cards" dari 21st.dev), disesuaikan:
// - warna tema terang brand (kartu putih transparan, ikon & judul brand-blue); kelas animate-in
//   dari tailwindcss-animate diganti Reveal (motion): kartu masuk berurutan saat terlihat
// - posisi tumpukan lewat variabel CSS (--i, --dx, --dy, --lift; lihat .display-* di globals.css):
//   HP = kartu disusun ke bawah tanpa saling menutupi (semua teks terbaca tanpa hover);
//   ≥sm = bertumpuk, kartu belakang abu-abu & redup, naik + berwarna saat di-hover ATAU saat
//   difokus lewat keyboard (tabIndex), supaya isinya tetap bisa dibaca tanpa mouse
// - judul + teks di bagian atas kartu, sehingga tetap terlihat di atas kartu depannya saat naik;
//   teks boleh turun baris (versi asli whitespace-nowrap), pudaran kanan dipersempit
export type DisplayCardData = { icon: ReactNode; title: string; description: string };

export function DisplayCards({ cards, className }: { cards: DisplayCardData[]; className?: string }) {
  const last = cards.length - 1;
  return (
    <ol role="list" className={cn("display-stack", className)} style={{ "--last": last } as CSSProperties}>
      {cards.map((card, index) => (
        <li key={card.title} className="sm:[grid-area:stack]">
          <Reveal delay={index * 0.15}>
            <div
              tabIndex={0}
              className={cn(
                "display-card relative flex h-40 w-[17rem] flex-col rounded-xl border-2 bg-white/80 px-4 py-3 backdrop-blur-sm outline-none sm:w-[22rem] lg:h-44 lg:w-[26rem] lg:px-5 lg:py-4",
                "transition-[transform,border-color,background-color,filter] duration-700 hover:border-brand-blue/40 hover:bg-white focus-visible:border-brand-blue focus-visible:bg-white motion-reduce:transition-none",
                "after:pointer-events-none after:absolute after:top-[-5%] after:-right-1 after:h-[110%] after:w-1/5 after:bg-gradient-to-l after:from-background/80 after:to-transparent after:content-['']",
                index < last &&
                  "sm:grayscale sm:before:pointer-events-none sm:before:absolute sm:before:inset-0 sm:before:rounded-[inherit] sm:before:bg-background/50 sm:before:transition-opacity sm:before:duration-700 sm:before:content-[''] sm:hover:grayscale-0 sm:hover:before:opacity-0 sm:focus-visible:grayscale-0 sm:focus-visible:before:opacity-0",
              )}
              style={{ "--i": index } as CSSProperties}
            >
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="inline-flex rounded-full bg-brand-blue p-1.5 text-white">
                  {card.icon}
                </span>
                <p className="font-medium text-brand-blue">{card.title}</p>
              </div>
              <p className="mt-3 text-base leading-snug font-semibold text-balance sm:text-lg lg:text-xl">{card.description}</p>
              {/* Penanda posisi langkah (hiasan). */}
              <div aria-hidden="true" className="mt-auto flex gap-1.5">
                {cards.map((_, step) => (
                  <span key={step} className={cn("h-1 w-6 rounded-full", step <= index ? "bg-brand-blue" : "bg-border")} />
                ))}
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
