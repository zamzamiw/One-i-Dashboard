import { nav, site } from "@/lib/site";

// Kerangka halaman sesuai urutan PRD bagian 4. Tiap placeholder nanti diganti
// komponen section aslinya di components/sections/, satu per satu.
const sections = [
  { id: "hero", prd: "5.2", title: "Hero" },
  { id: "tentang", prd: "5.3", title: "Tentang One-I" },
  { id: "masalah", prd: "5.4", title: "Masalah yang Dihadapi Distributor" },
  { id: "layanan", prd: "5.5", title: "Apa yang Dikerjakan One-I" },
  { id: "cara-kerja", prd: "5.6", title: "Bagaimana Kami Bisa Membantu?" },
  { id: "kenapa", prd: "5.7", title: "Kenapa One-I?" },
  { id: "hubungi", prd: "5.8", title: "Call-to-Action" },
  { id: "kontak", prd: "5.9", title: "Footer — Contact Us" },
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="#hero" className="leading-tight">
            <span className="block font-heading text-lg font-bold">{site.name}</span>
            <span className="block text-[10px] tracking-[0.2em] text-muted-foreground">
              {site.tagline}
            </span>
          </a>
          <ul className="hidden gap-6 text-sm font-medium md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-brand-blue">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="border-b py-24">
            <div className="mx-auto max-w-6xl px-4">
              <p className="text-sm font-medium text-brand-blue">PRD {section.prd}</p>
              <h2 className="mt-2 text-3xl font-bold">{section.title}</h2>
              <p className="mt-2 text-muted-foreground">Placeholder — belum dibangun.</p>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
