import { RouteSteps, type RouteStep } from "@/components/route-steps";

// PRD 5.5: lima fitur utama sebagai daftar bernomor yang terhubung garis "rute".
const features: RouteStep[] = [
  {
    title: "Tracking Sales ke Customer",
    description:
      "Memantau transaksi & aktivitas penjualan tiap salesman ke tiap pelanggan/toko secara real-time.",
  },
  {
    title: "Tracking Pergerakan Sales Team",
    description: "Memantau rute & pergerakan tim sales di lapangan untuk cakupan kunjungan optimal.",
  },
  {
    title: "Info One-Page untuk Presentasi",
    description: "Materi ringkas satu halaman bagi salesman saat presentasi produk ke toko.",
  },
  {
    title: "Tracking Profit Margin per Customer",
    description: "Menghitung & memantau margin keuntungan tiap transaksi per pelanggan.",
  },
  {
    title: "Insight Bisnis per Lini Bisnis",
    description:
      "Merangkum performa bisnis menyeluruh per lini bisnis untuk pengambilan keputusan manajemen.",
  },
];

export function Features() {
  return (
    <section id="layanan" className="bg-brand-surface py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Apa yang Dikerjakan One-I
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            One-I dirancang untuk membantu distributor menghubungkan tim lapangan dengan informasi yang
            dibutuhkan manajemen.
          </p>
        </div>
        <RouteSteps steps={features} />
      </div>
    </section>
  );
}
