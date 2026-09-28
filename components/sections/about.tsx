import { SectionTag, type SectionTagData } from "@/components/receipt";
import { Reveal } from "@/components/reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// PRD 5.3, konten rata tengah. Arti nama mengikuti pemilik project
// (singkatan Optimized Network Engagement Indonesia), menggantikan
// penjelasan "One" dan empat "I" di PRD.
const acronym = [
  { letter: "O", word: "Optimized" },
  { letter: "N", word: "Network" },
  { letter: "E", word: "Engagement" },
  { letter: "I", word: "Indonesia" },
];

export function About({ t, tag }: { t: Dictionary["about"]; tag: SectionTagData }) {
  return (
    <section id="tentang" className="bg-brand-surface py-20 sm:py-28">
      <div className="px-page text-center">
        <SectionTag {...tag} className="mb-10 sm:mb-14" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl 2xl:text-5xl">{t.title}</h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed sm:text-xl">{t.intro}</p>

        <p className="mt-12 text-sm font-medium text-muted-foreground">{t.acronymLabel}</p>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:gap-6">
          {acronym.map((item, index) => (
            <li key={item.letter}>
              <Reveal delay={index * 0.08} className="h-full rounded-xl border bg-white px-4 py-6 lg:py-10">
                <span aria-hidden="true" className="block font-heading text-5xl font-bold text-brand-blue lg:text-6xl xl:text-7xl">
                  {item.letter}
                </span>
                <span className="mt-2 block font-medium lg:text-lg">{item.word}</span>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-12 max-w-3xl leading-relaxed text-muted-foreground sm:text-lg">{t.body}</p>
      </div>
    </section>
  );
}
