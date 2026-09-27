import { About } from "@/components/sections/about";
import { CtaBand } from "@/components/sections/cta-band";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Navbar } from "@/components/sections/navbar";
import { Problems } from "@/components/sections/problems";
import { Testimonials } from "@/components/sections/testimonials";
import { Why } from "@/components/sections/why";
import { InteractiveCanvas } from "@/components/ui/interactive-canvas";
import { WhatsAppFloat } from "@/components/whatsapp-float";

// Urutan section sesuai PRD bagian 4, ditambah Testimoni sebelum CTA (keputusan pemilik project).
export default function Home() {
  return (
    <>
      {/* Latar grid titik interaktif, tampil di section berlatar putih (di belakang konten). */}
      <InteractiveCanvas />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Problems />
        <Features />
        <HowItWorks />
        <Why />
        <Testimonials />
        <CtaBand />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
