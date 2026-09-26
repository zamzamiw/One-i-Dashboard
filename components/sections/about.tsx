import { Reveal } from "@/components/reveal";

// PRD 5.3, konten rata tengah. Arti nama mengikuti pemilik project
// (singkatan Optimized Network Engagement Indonesia), menggantikan
// penjelasan "One" dan empat "I" di PRD.
const acronym = [
  { letter: "O", word: "Optimized" },
  { letter: "N", word: "Network" },
  { letter: "E", word: "Engagement" },
  { letter: "I", word: "Indonesia" },
];

export function About() {
  return (
    <section id="tentang" className="bg-brand-surface py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Tentang One-I</h2>
        <p className="mt-6 text-lg leading-relaxed sm:text-xl">
          One-I adalah platform digital penyedia sistem informasi penjualan untuk distributor.
          Membantu mengubah data lapangan yang rumit menjadi insight yang mudah dipahami.
        </p>

        <p className="mt-12 text-sm font-medium text-muted-foreground">One-I merupakan singkatan dari</p>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {acronym.map((item, index) => (
            <li key={item.letter}>
              <Reveal delay={index * 0.08} className="h-full rounded-xl border bg-white px-4 py-6">
                <span aria-hidden="true" className="block font-heading text-5xl font-bold text-brand-blue">
                  {item.letter}
                </span>
                <span className="mt-2 block font-medium">{item.word}</span>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* TODO: konfirmasi copy. Disusun dari ringkasan produk (PRD 1) dan kalimat manfaat PRD 5.3. */}
        <p className="mt-12 leading-relaxed text-muted-foreground sm:text-lg">
          Kami membangun sistem informasi terintegrasi yang membantu distributor mengelola, memantau,
          dan mengembangkan seluruh aktivitas penjualan — dari lapangan hingga ke meja manajemen.
          Lacak penjualan, pantau tim, dan analisis profit margin secara{" "}
          <span className="whitespace-nowrap">real-time</span>, dengan sistem yang dapat disesuaikan
          dengan bisnis Anda.
        </p>
      </div>
    </section>
  );
}
