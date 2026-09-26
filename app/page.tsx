import { About } from "@/components/sections/about";
import { CtaBand } from "@/components/sections/cta-band";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Navbar } from "@/components/sections/navbar";
import { Problems } from "@/components/sections/problems";
import { Why } from "@/components/sections/why";
import { WhatsAppFloat } from "@/components/whatsapp-float";

// Urutan section sesuai PRD bagian 4.
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
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
