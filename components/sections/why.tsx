import type { LucideIcon } from "lucide-react";
import { Activity, ChartColumn, Handshake, SlidersHorizontal } from "lucide-react";
import { SectionTag, type SectionTagData } from "@/components/receipt";
import { Reveal } from "@/components/reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// PRD 5.7: empat poin singkat, ditampilkan apa adanya (tanpa kalimat penjelasan).
const icons: LucideIcon[] = [Activity, ChartColumn, SlidersHorizontal, Handshake];

export function Why({ t, tag }: { t: Dictionary["why"]; tag: SectionTagData }) {
  const points = t.points.map((text, index) => ({ text, icon: icons[index] }));
  return (
    <section id="kenapa" className="bg-brand-surface py-20 sm:py-28">
      <div className="px-page">
        <SectionTag {...tag} className="mb-10 sm:mb-14" />
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl 2xl:text-5xl">{t.title}</h2>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {points.map(({ icon: Icon, text }, index) => (
            <li key={text}>
              <Reveal
                delay={index * 0.08}
                className="relative flex h-full flex-col items-center rounded-2xl border border-dashed border-brand-navy/25 bg-white px-4 py-8 text-center sm:px-6 lg:py-12"
              >
                <span aria-hidden="true" className="absolute top-3 left-3 font-mono text-[0.6875rem] text-muted-foreground">
                  [{String(index + 1).padStart(2, "0")}]
                </span>
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
