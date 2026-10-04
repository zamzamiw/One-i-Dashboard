import { SectionTag, type SectionTagData } from "@/components/receipt";
import { Timeline } from "@/components/ui/timeline";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// PRD 5.5: lima fitur utama pada timeline vertikal yang terisi mengikuti scroll
// (keputusan pemilik project). Panel biru di atasnya berisi judul + deskripsi section.
export function Features({ t, tag }: { t: Dictionary["features"]; tag: SectionTagData }) {
  return (
    <section id="layanan" aria-labelledby="layanan-judul" className="bg-brand-surface py-20 sm:py-28">
      <div className="px-page">
        <SectionTag {...tag} className="mb-10 sm:mb-14" />
        <div className="grid gap-6 rounded-2xl bg-brand-blue p-6 text-white sm:p-10 lg:grid-cols-2 lg:items-end lg:gap-16 lg:p-12">
          <h2 id="layanan-judul" className="text-3xl font-bold tracking-tight text-balance sm:text-4xl 2xl:text-5xl">
            {t.title}
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-white/90">{t.description}</p>
        </div>
        <Timeline items={t.items} className="mt-14 sm:mt-20" />
      </div>
    </section>
  );
}
