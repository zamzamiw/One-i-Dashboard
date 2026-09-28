import { notFound } from "next/navigation";
import { About } from "@/components/sections/about";
import { CtaBand } from "@/components/sections/cta-band";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Navbar } from "@/components/sections/navbar";
import { Problems } from "@/components/sections/problems";
import { TechStack } from "@/components/sections/tech-stack";
import { Testimonials } from "@/components/sections/testimonials";
import { Why } from "@/components/sections/why";
import { InteractiveCanvas } from "@/components/ui/interactive-canvas";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { whatsappLink } from "@/lib/site";

// Urutan section sesuai PRD bagian 4, ditambah pita Teknologi setelah hero dan Testimoni sebelum
// CTA (keputusan pemilik project).
// Semua teks datang dari kamus bahasa aktif (lib/i18n/dictionaries). `tag` = baris pembuka
// gaya struk "[ 01 ] LABEL ---- +" (components/receipt.tsx), labelnya sama dengan menu navbar.
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const whatsappHref = whatsappLink(t.whatsapp.message);

  return (
    <>
      {/* Latar grid titik interaktif, tampil di section berlatar putih (di belakang konten). */}
      <InteractiveCanvas />
      <Navbar t={t.nav} newTab={t.common.newTab} locale={lang} whatsappHref={whatsappHref} />
      <main>
        <Hero t={t.hero} />
        <TechStack t={t.techStack} />
        <About t={t.about} tag={{ index: 1, label: t.nav.links.tentang }} />
        <Problems t={t.problems} tag={{ index: 2, label: t.nav.links.masalah }} />
        <Features t={t.features} tag={{ index: 3, label: t.nav.links.layanan }} />
        <HowItWorks t={t.howItWorks} tag={{ index: 4, label: t.nav.links["cara-kerja"] }} />
        <Why t={t.why} tag={{ index: 5, label: t.nav.links.kenapa }} />
        <Testimonials t={t.testimonials} tag={{ index: 6, label: t.nav.links.testimoni }} />
        <CtaBand t={t.cta} tag={{ index: 7, label: t.nav.contact }} whatsappHref={whatsappHref} />
      </main>
      <Footer t={t.footer} nav={t.nav.links} description={t.meta.description} newTab={t.common.newTab} whatsappHref={whatsappHref} />
      <WhatsAppFloat label={t.whatsapp.floatLabel} href={whatsappHref} />
    </>
  );
}
