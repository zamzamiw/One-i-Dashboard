import { LogoCloud } from "@/components/ui/logo-cloud";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { techStack } from "@/lib/tech-stack";

// Section Teknologi (permintaan pemilik project, di luar PRD awal): pita logo teknologi yang
// dipakai One-I, tepat setelah hero sebagai pemisah menuju section Tentang.
export function TechStack({ t }: { t: Dictionary["techStack"] }) {
  return (
    <section id="teknologi" aria-labelledby="teknologi-judul" className="py-14 sm:py-20">
      <h2 id="teknologi-judul" className="px-page text-center">
        <span className="block text-base font-medium text-muted-foreground sm:text-lg">{t.eyebrow}</span>
        <span className="mt-1 block text-2xl font-bold tracking-tight text-balance sm:text-3xl">{t.title}</span>
      </h2>
      <LogoCloud logos={techStack} label={t.title} className="mt-8 sm:mt-10" />
    </section>
  );
}
