import { ArrowUp } from "lucide-react";
import { FooterWordmark } from "@/components/footer-wordmark";
import { Logo } from "@/components/logo";
import { nav, site, whatsappLink } from "@/lib/site";

// PRD 5.9 + FR-2: tanpa form, empat kanal kontak yang bisa langsung diklik
// (kolom Kontak + Media Sosial = grid 2 kolom). Tata letak mengikuti referensi dari
// pemilik project (wordmark raksasa), dengan latar brand-blue agar konsisten.
// Teks sekunder minimal white/90: kontras 4.9:1 di atas #2552FC (white/70 hanya 3.6:1).

const YEAR = new Date().getFullYear();

type FooterLink = { label: string; href: string; external?: boolean };

const columns: { title: string; links: FooterLink[]; note?: string }[] = [
  { title: "Navigasi", links: [{ label: "Beranda", href: "#hero" }, ...nav] },
  {
    title: "Kontak",
    links: [
      { label: site.contact.email, href: `mailto:${site.contact.email}` },
      { label: site.contact.whatsappDisplay, href: whatsappLink(), external: true },
    ],
    note: site.contact.address,
  },
  {
    title: "Media Sosial",
    links: [
      { label: "Instagram", href: site.contact.instagram, external: true },
      { label: "Facebook", href: site.contact.facebook, external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer id="kontak" className="bg-brand-blue text-white">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-24 sm:pt-20 sm:pb-10">
        <h2 className="sr-only">Contact Us</h2>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo inverse />
            <p className="mt-6 max-w-xs leading-relaxed text-white/90">{site.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold tracking-[0.15em] text-white/90 uppercase">
                  {column.title}
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
                        {link.external && <span className="sr-only"> (membuka tab baru)</span>}
                      </a>
                    </li>
                  ))}
                </ul>
                {column.note && <p className="mt-3 leading-relaxed text-white/90">{column.note}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 sm:mt-24">
          <FooterWordmark />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/30 pt-6 text-sm text-white/90 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
            <p>
              © {YEAR} {site.name} · {site.legalName}
            </p>
            <p>
              Designed by <span className="font-medium text-white">{site.designedBy}</span>
            </p>
          </div>
          {/* Jarak kanan supaya tidak tertutup tombol WhatsApp melayang. */}
          <a
            href="#hero"
            className="inline-flex items-center gap-2 self-start text-xs font-semibold tracking-[0.15em] text-white uppercase hover:underline focus-visible:outline-white sm:mr-20 sm:self-auto"
          >
            Kembali ke atas
            <ArrowUp aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
