import { About } from "@/components/sections/about";
import { CtaBand } from "@/components/sections/cta-band";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Navbar } from "@/components/sections/navbar";
import { Problems } from "@/components/sections/problems";
import { Why } from "@/components/sections/why";
import { WhatsAppFloat } from "@/components/whatsapp-float";

// Urutan section sesuai PRD bagian 4. Placeholder diganti komponen
// section aslinya di components/sections/, satu per satu.
const placeholders = [
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
        <Features />
        <HowItWorks />
        <Why />
        <CtaBand />
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
