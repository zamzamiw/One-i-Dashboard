import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/navbar";
import { Problems } from "@/components/sections/problems";
import { WhatsAppFloat } from "@/components/whatsapp-float";

// Urutan section sesuai PRD bagian 4. Placeholder diganti komponen
// section aslinya di components/sections/, satu per satu.
const placeholders = [
  { id: "layanan", prd: "5.5", title: "Apa yang Dikerjakan One-I" },
  { id: "cara-kerja", prd: "5.6", title: "Bagaimana Kami Bisa Membantu?" },
  { id: "kenapa", prd: "5.7", title: "Kenapa One-I?" },
  { id: "hubungi", prd: "5.8", title: "Call-to-Action" },
  { id: "kontak", prd: "5.9", title: "Footer — Contact Us" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Problems />
        {placeholders.map((section) => (
          <section key={section.id} id={section.id} className="border-t py-24">
            <div className="mx-auto max-w-6xl px-4">
              <p className="text-sm font-medium text-brand-blue">PRD {section.prd}</p>
              <h2 className="mt-2 text-3xl font-bold">{section.title}</h2>
              <p className="mt-2 text-muted-foreground">Placeholder — belum dibangun.</p>
            </div>
          </section>
        ))}
      </main>
      <WhatsAppFloat />
    </>
  );
}
