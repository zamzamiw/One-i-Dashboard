import { RouteChart } from "@/components/route-chart";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// PRD 5.2. Tanpa tombol CTA; ajakan kontak ada di tombol WhatsApp melayang dan CTA band.
// Headline sengaja tidak dianimasikan: ia elemen terbesar di layar pertama (LCP).
export function Hero({ t }: { t: Dictionary["hero"] }) {
  return (
    <section id="hero" className="flex items-center overflow-hidden lg:min-h-[calc(100svh-var(--nav-h))]">
      <div className="grid w-full items-center gap-12 px-page py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-24 xl:gap-24">
        <div>
          <h1 className="text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl xl:text-6xl 2xl:text-7xl">
            {t.titleLead} <span className="text-brand-blue sm:whitespace-nowrap">{t.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl 2xl:max-w-2xl">
            {t.subtitle}
          </p>
        </div>
        <RouteChart title={t.chartTitle} />
      </div>
    </section>
  );
}
