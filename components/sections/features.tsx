import { ArrowRight } from "lucide-react";
import { SectionTag, type SectionTagData } from "@/components/receipt";
import { Timeline } from "@/components/ui/timeline";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// PRD 5.5: lima fitur utama pada timeline horizontal yang bergeser mengikuti scroll
// (keputusan pemilik project). Panel biru di awal jalur berisi judul + deskripsi section.
export function Features({ t, tag }: { t: Dictionary["features"]; tag: SectionTagData }) {
  return (
    <section id="layanan" aria-labelledby="layanan-judul" className="bg-brand-surface">
      <Timeline
        items={t.items}
        header={<SectionTag {...tag} />}
        intro={
          <div className="flex h-full flex-col justify-between gap-10 rounded-2xl bg-brand-blue p-6 text-white sm:p-8 lg:p-10">
            <h2 id="layanan-judul" className="text-3xl font-bold tracking-tight text-balance sm:text-4xl 2xl:text-5xl">
              {t.title}
            </h2>
            <div className="space-y-8">
              <p className="max-w-xl text-lg leading-relaxed text-white/90">{t.description}</p>
              {/* Petunjuk geser; hanya tampil di mode geser (.timeline-hint di globals.css). */}
              <div
                aria-hidden="true"
                className="timeline-hint items-center justify-between gap-4 border-t border-white/30 pt-5 font-mono text-xs tracking-[0.15em] uppercase"
              >
                <span>{t.scrollHint}</span>
                <span className="flex size-10 shrink-0 items-center justify-center border border-white/40">
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </div>
          </div>
        }
      />
    </section>
  );
}
