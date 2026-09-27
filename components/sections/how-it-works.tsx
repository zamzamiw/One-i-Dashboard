import { ChevronDown, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

// PRD 5.6 (dulu "Cara Kerja"): tiga langkah singkat tanpa sub-teks.
// Horizontal di layar sm ke atas, vertikal di HP, dihubungkan garis rute putus-putus.
const steps = [
  "Konsultasi kebutuhan",
  "Implementasi sistem",
  "Monitoring & pengembangan berkelanjutan",
];

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="py-20 sm:py-28">
      <div className="px-page">
        <h2 className="text-center text-3xl font-bold tracking-tight text-balance sm:text-4xl 2xl:text-5xl">
          Bagaimana Kami Bisa Membantu?
        </h2>

        <ol role="list" className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step, index) => {
            const last = index === steps.length - 1;
            return (
              <li key={step}>
                <Reveal delay={index * 0.12} className="relative flex items-start gap-5 sm:flex-col sm:items-center sm:text-center">
                  <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-blue font-heading text-lg font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-3.5 text-lg font-semibold sm:pt-0">{step}</p>

                  {!last && (
                    <>
                      {/* HP: dari bawah lingkaran ke lingkaran berikutnya (celah gap-10). */}
                      <span
                        aria-hidden="true"
                        className="absolute top-16 -bottom-9 left-7 flex -translate-x-1/2 flex-col items-center sm:hidden"
                      >
                        <span className="w-0 flex-1 border-l-2 border-dashed border-brand-blue/40" />
                        <ChevronDown className="-mt-1.5 size-4 text-brand-blue/70" />
                      </span>
                      {/* sm+: dari tepi lingkaran ini ke lingkaran di kolom berikutnya (celah gap-8). */}
                      <span
                        aria-hidden="true"
                        className="absolute top-7 right-[calc(-50%+0.25rem)] left-[calc(50%+2.25rem)] hidden -translate-y-1/2 items-center sm:flex"
                      >
                        <span className="h-0 flex-1 border-t-2 border-dashed border-brand-blue/40" />
                        <ChevronRight className="-ml-1.5 size-4 text-brand-blue/70" />
                      </span>
                    </>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
