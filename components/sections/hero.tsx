import { OneICharacter } from "@/components/one-i-character";
import { CornerMarks } from "@/components/receipt";
import { RouteChart } from "@/components/route-chart";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// PRD 5.2. Tanpa tombol CTA; ajakan kontak ada di tombol WhatsApp melayang dan CTA band.
// Headline sengaja tidak dianimasikan: ia elemen terbesar di layar pertama (LCP).
// overflow-x-clip (bukan hidden): batang karakter One-I boleh menjulur ke section berikutnya.
export function Hero({ t }: { t: Dictionary["hero"] }) {
  return (
    <section id="hero" className="flex items-center overflow-x-clip lg:min-h-[calc(100svh-var(--nav-h))]">
      <div className="grid w-full items-center gap-12 px-page py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-24 xl:gap-24">
        <div>
          <h1 className="text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl xl:text-6xl 2xl:text-7xl">
            {t.titleLead} <span className="text-brand-blue sm:whitespace-nowrap">{t.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl 2xl:max-w-2xl">
            {t.subtitle}
          </p>
        </div>
        {/* mt: ruang untuk karakter One-I yang mengintip di atas kartu (HP/tablet). */}
        <div className="relative mt-10 min-w-0 sm:mt-12 lg:mt-0">
          <OneICharacter />
          <div className="relative z-10">
            <RouteChart title={t.chartTitle} stages={t.stages} />
          </div>
          <CornerMarks className="z-20 text-brand-blue" />
        </div>
      </div>
    </section>
  );
}
