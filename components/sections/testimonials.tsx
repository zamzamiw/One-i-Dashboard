import { Reveal } from "@/components/reveal";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// Section testimoni (permintaan pemilik project, di luar PRD awal), sebelum CTA band
// supaya bukti sosial tampil tepat sebelum ajakan kontak.
// Isi testimoni (masih CONTOH karangan, lihat TODO di kamus) ada di lib/i18n/dictionaries.

export function Testimonials({ t }: { t: Dictionary["testimonials"] }) {
  return (
    <section id="testimoni" className="py-20 sm:py-28">
      <Reveal className="px-page text-center">
        <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl 2xl:text-5xl">
          {t.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t.description}</p>
      </Reveal>
      <div className="mt-6 sm:mt-10">
        <StaggerTestimonials testimonials={t.items} labels={t.labels} />
      </div>
    </section>
  );
}
