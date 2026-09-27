import { SectionTag, type SectionTagData } from "@/components/receipt";
import { RouteSteps } from "@/components/route-steps";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// PRD 5.5: lima fitur utama sebagai daftar bernomor yang terhubung garis "rute".
export function Features({ t, tag }: { t: Dictionary["features"]; tag: SectionTagData }) {
  return (
    <section id="layanan" className="bg-brand-surface py-20 sm:py-28">
      <SectionTag {...tag} className="mb-10 px-page sm:mb-14" />
      <div className="grid gap-12 px-page lg:grid-cols-[1fr_1.35fr] lg:gap-20 xl:gap-32">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl 2xl:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{t.description}</p>
        </div>
        <RouteSteps steps={t.items} />
      </div>
    </section>
  );
}
