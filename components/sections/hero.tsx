import { RouteChart } from "@/components/route-chart";

// PRD 5.2. Tanpa tombol CTA; ajakan kontak ada di tombol WhatsApp melayang dan CTA band.
// Headline sengaja tidak dianimasikan: ia elemen terbesar di layar pertama (LCP).
export function Hero() {
  return (
    <section id="hero" className="overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-28">
        <div>
          <h1 className="text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl xl:text-6xl">
            Kenali setiap langkah sales, <span className="text-brand-blue sm:whitespace-nowrap">tumbuh lebih pasti.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Sistem informasi yang membantu distributor memantau tim sales, margin, dan performa bisnis.
          </p>
        </div>
        <RouteChart />
      </div>
    </section>
  );
}
