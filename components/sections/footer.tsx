import { ArrowUp } from "lucide-react";
import { Logo } from "@/components/logo";
import { Barcode, Rule } from "@/components/receipt";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { nav, site } from "@/lib/site";

// PRD 5.9 + FR-2: tanpa form, empat kanal kontak yang bisa langsung diklik
// (kolom Kontak + Media Sosial = grid 2 kolom). Tata letak mengikuti referensi dari
// pemilik project (wordmark raksasa), dengan latar brand-blue agar konsisten.
// Teks sekunder minimal white/90: kontras 4.9:1 di atas #2552FC (white/70 hanya 3.6:1).

// Rasio lebar/tinggi-font "One-I" (Space Grotesk bold, tracking-tighter), diukur di
// browser, supaya wordmark pas selebar kontainer lewat unit cqw.
const WORDMARK_RATIO = 2.33;
const YEAR = new Date().getFullYear();

type FooterLink = { label: string; href: string; external?: boolean };

export function Footer({
  t,
  nav: navLabels,
  description,
  newTab,
  whatsappHref,
}: {
  t: Dictionary["footer"];
  nav: Dictionary["nav"]["links"];
  description: string;
  newTab: string;
  whatsappHref: string;
}) {
  const columns: { title: string; links: FooterLink[]; note?: string }[] = [
    {
      title: t.navigation,
      links: [{ label: t.home, href: "#hero" }, ...nav.map((anchor) => ({ label: navLabels[anchor], href: `#${anchor}` }))],
    },
    {
      title: t.contact,
      links: [
        { label: site.contact.email, href: `mailto:${site.contact.email}` },
        { label: site.contact.whatsappDisplay, href: whatsappHref, external: true },
      ],
      note: site.contact.address,
    },
    {
      title: t.social,
      links: [
        { label: "Instagram", href: site.contact.instagram, external: true },
        { label: "Facebook", href: site.contact.facebook, external: true },
      ],
    },
  ];

  // overflow-hidden: ruang descent font wordmark raksasa tidak boleh menambah tinggi halaman di bawah footer.
  return (
    <footer id="kontak" className="receipt-edge-top overflow-hidden bg-brand-blue text-white">
      <div className="px-page pt-16 pb-24 sm:pt-20 sm:pb-10">
        <h2 className="sr-only">{t.heading}</h2>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo inverse />
            <p className="mt-6 max-w-xs leading-relaxed text-white/90">{description}</p>
            <Barcode className="mt-8 h-10 w-44 text-white/90" />
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold tracking-[0.15em] text-white/90 uppercase">
                  <span aria-hidden="true">[ </span>
                  {column.title}
                  <span aria-hidden="true"> ]</span>
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                        className="[overflow-wrap:anywhere] underline-offset-4 hover:underline focus-visible:outline-white"
                      >
                        {link.label}
                        {link.external && <span className="sr-only"> {newTab}</span>}
                      </a>
                    </li>
                  ))}
                </ul>
                {column.note && <p className="mt-3 leading-relaxed text-white/90">{column.note}</p>}
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="@container mt-16 select-none sm:mt-24">
          <p
            className="font-heading leading-[0.78] font-bold tracking-tighter whitespace-nowrap"
            style={{ fontSize: `calc(100cqw / ${WORDMARK_RATIO})` }}
          >
            {site.name}
          </p>
        </div>

        <Rule className="mt-8 text-white/30" />
        <div className="mt-6 flex flex-col gap-4 text-sm text-white/90 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
            <p>
              © {YEAR} {site.name} · {site.legalName}
            </p>
            <p>
              {t.designedBy} <span className="font-medium text-white">{site.designedBy}</span>
            </p>
          </div>
          {/* Jarak kanan supaya tidak tertutup tombol WhatsApp melayang. */}
          <a
            href="#hero"
            className="inline-flex items-center gap-2 self-start text-xs font-semibold tracking-[0.15em] text-white uppercase hover:underline focus-visible:outline-white sm:mr-20 sm:self-auto"
          >
            {t.backToTop}
            <ArrowUp aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
