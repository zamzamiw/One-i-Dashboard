import { MessagesSquare, Settings2, TrendingUp } from "lucide-react";
import { SectionTag, type SectionTagData } from "@/components/receipt";
import { DisplayCards } from "@/components/ui/display-cards";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// PRD 5.6 (dulu "Cara Kerja"): tiga langkah singkat tanpa sub-teks, ditampilkan sebagai kartu
// bertumpuk miring (display cards, keputusan pemilik project). Langkah terakhir paling depan.
const icons = [MessagesSquare, Settings2, TrendingUp];

export function HowItWorks({ t, tag }: { t: Dictionary["howItWorks"]; tag: SectionTagData }) {
  const cards = t.steps.map((step, index) => {
    const Icon = icons[index];
    return {
      icon: <Icon className="size-4" />,
      title: `${t.stepLabel} ${String(index + 1).padStart(2, "0")}`,
      description: step,
    };
  });

  return (
    <section id="cara-kerja" className="overflow-hidden py-20 sm:py-28">
      <div className="px-page">
        <SectionTag {...tag} className="mb-10 sm:mb-14" />
        <h2 className="text-center text-3xl font-bold tracking-tight text-balance sm:text-4xl 2xl:text-5xl">
          {t.title}
        </h2>
        <DisplayCards cards={cards} className="mt-14 sm:mt-24" />
      </div>
    </section>
  );
}
