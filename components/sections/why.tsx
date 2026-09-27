import type { LucideIcon } from "lucide-react";
import { Activity, ChartColumn, Handshake, SlidersHorizontal } from "lucide-react";
import { Reveal } from "@/components/reveal";

// PRD 5.7: empat poin singkat, ditampilkan apa adanya (tanpa kalimat penjelasan).
const points: { icon: LucideIcon; text: string }[] = [
  { icon: Activity, text: "Pemantauan real-time" },
  { icon: ChartColumn, text: "Insight berbasis data" },
  { icon: SlidersHorizontal, text: "Disesuaikan dengan bisnis Anda" },
  { icon: Handshake, text: "Didampingi tim lokal" },
];

export function Why() {
  return (
    <section id="kenapa" className="bg-brand-surface py-20 sm:py-28">
      <div className="px-page">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl 2xl:text-5xl">Kenapa One-I?</h2>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {points.map(({ icon: Icon, text }, index) => (
            <li key={text}>
              <Reveal
                delay={index * 0.08}
                className="flex h-full flex-col items-center rounded-2xl border bg-white px-4 py-8 text-center sm:px-6 lg:py-12"
              >
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue"
                >
                  <Icon className="size-6" />
                </span>
                <p className="mt-5 text-base font-semibold text-balance sm:text-lg">{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
