import { CornerMarks, SectionTag, type SectionTagData } from "@/components/receipt";
import { Reveal } from "@/components/reveal";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// PRD 5.8 + FR-1: banner navy, tombol langsung membuka chat WhatsApp One-I
// (pesan default terisi otomatis) di tab baru.
const route = "M40 290 C90 285 110 275 150 270 C220 262 270 250 330 230 C420 200 480 140 550 60";

export function CtaBand({ t, tag, whatsappHref }: { t: Dictionary["cta"]; tag: SectionTagData; whatsappHref: string }) {
  return (
    <section id="hubungi" className="px-page py-20 sm:py-24">
      {/* Pembungkus untuk tanda "+" di sudut (kartu sendiri overflow-hidden). */}
      <div className="relative">
        <CornerMarks className="text-brand-blue" />
        <div className="relative overflow-hidden rounded-3xl bg-brand-navy px-6 py-14 text-center sm:px-12 sm:py-20 xl:py-28">
        {/* Garis rute (motif Track → Perform → Grow), murni dekoratif. Hanya di layar lebar agar tidak
            menabrak judul; titik Grow tetap amber penuh, hanya garisnya yang redup. */}
        <svg
          viewBox="0 0 600 340"
          aria-hidden="true"
          className="pointer-events-none absolute right-6 -bottom-4 hidden w-[36rem] xl:block"
        >
          <path d={route} fill="none" strokeWidth="4" strokeLinecap="round" className="stroke-brand-blue/50" />
          <circle cx="150" cy="270" r="8" strokeWidth="4" className="fill-brand-navy stroke-brand-blue/50" />
          <circle cx="330" cy="230" r="8" strokeWidth="4" className="fill-brand-navy stroke-brand-blue/50" />
          <circle cx="550" cy="60" r="20" className="fill-brand-amber/20" />
          <circle cx="550" cy="60" r="10" className="fill-brand-amber" />
        </svg>

        <Reveal className="relative">
          <SectionTag {...tag} inverse className="mb-10 sm:mb-14" />
          <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl 2xl:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-white/75">{t.subtitle}</p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-12 items-center gap-2.5 rounded-lg bg-brand-blue px-6 font-semibold text-white transition hover:brightness-110 focus-visible:outline-white"
          >
            <WhatsAppIcon className="size-5" />
            {t.button}
            <span className="sr-only"> {t.newTab}</span>
          </a>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
