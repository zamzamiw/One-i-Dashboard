import { ArrowRight } from "lucide-react";
import { StaticI } from "@/components/one-i-character";
import { SectionTag, type SectionTagData } from "@/components/receipt";
import { Reveal } from "@/components/reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/site";

// PRD 5.8 + FR-1. Tata letak mengikuti referensi Indisea dari pemilik project: section biru
// selebar layar, judul besar di kiri, tombol pil gelap yang langsung membuka chat WhatsApp (pesan
// default terisi) + email + nomor. Kolom kanan (di HP: blok di bawah) sengaja kosong: di situ
// ujung ekor karakter One-I membentuk huruf "i" ([data-one-i-end], components/one-i-tail.tsx).
const linkClass =
  "border-b border-white/60 pb-1 font-medium [overflow-wrap:anywhere] transition-colors hover:border-white focus-visible:outline-white";

export function CtaBand({ t, tag, whatsappHref }: { t: Dictionary["cta"]; tag: SectionTagData; whatsappHref: string }) {
  return (
    <section id="hubungi" className="bg-brand-blue text-white">
      <div className="grid gap-12 px-page py-24 sm:py-32 lg:min-h-[85svh] lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-16 lg:py-40">
        <Reveal>
          <SectionTag {...tag} inverse className="mb-8 sm:mb-10" />
          <h2 className="max-w-[15ch] text-4xl leading-[1.02] font-bold tracking-tight text-balance sm:text-6xl xl:text-7xl">
            {t.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/90 sm:text-xl">{t.subtitle}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-3 rounded-full bg-brand-navy px-7 font-semibold text-white transition-colors hover:bg-black focus-visible:outline-white"
            >
              {t.button}
              <ArrowRight aria-hidden="true" className="size-5 text-[#A8BAFE]" />
              <span className="sr-only"> {t.newTab}</span>
            </a>
            <a href={`mailto:${site.contact.email}`} className={linkClass}>
              {site.contact.email}
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {site.contact.whatsappDisplay}
              <span className="sr-only"> {t.newTab}</span>
            </a>
          </div>
        </Reveal>
        <div data-one-i-end aria-hidden="true" className="h-56 sm:h-64 lg:h-[min(26rem,52svh)]">
          {/* prefers-reduced-motion: tanpa ekor, "i" statis. */}
          <StaticI className="mx-auto hidden h-full w-auto fill-white motion-reduce:block" />
        </div>
      </div>
    </section>
  );
}
