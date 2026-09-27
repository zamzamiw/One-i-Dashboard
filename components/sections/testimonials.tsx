import { Reveal } from "@/components/reveal";
import { StaggerTestimonials, type Testimonial } from "@/components/ui/stagger-testimonials";

// Section testimoni (permintaan pemilik project, di luar PRD awal), sebelum CTA band
// supaya bukti sosial tampil tepat sebelum ajakan kontak.
// TODO: SEMUA testimoni di bawah adalah CONTOH karangan (belum ada testimoni asli).
// Ganti dengan testimoni asli + izin pelanggan sebelum go-live, atau sembunyikan section ini.
// Menampilkan testimoni karangan ke publik termasuk klaim menyesatkan.
const testimonials: Testimonial[] = [
  {
    quote: "Sekarang saya bisa lihat aktivitas tim sales di lapangan kapan saja, tanpa menunggu laporan sore.",
    name: "Budi Santoso",
    role: "Pemilik distributor FMCG, Surabaya",
  },
  {
    quote: "Margin per toko akhirnya kelihatan jelas. Kami jadi tahu pelanggan mana yang benar-benar menguntungkan.",
    name: "Rina Wulandari",
    role: "Manajer Keuangan, distributor minuman, Bandung",
  },
  {
    quote: "Laporan yang dulu tersebar di banyak file sekarang ada di satu tempat. Rapat mingguan jadi jauh lebih singkat.",
    name: "Hendra Kurniawan",
    role: "General Manager, distributor consumer goods, Semarang",
  },
  {
    quote: "Rute kunjungan lebih teratur. Toko yang biasanya terlewat sekarang ikut terlayani.",
    name: "Dewi Lestari",
    role: "Supervisor Sales, distributor makanan ringan, Medan",
  },
  {
    quote: "Materi satu halaman sangat membantu salesman kami saat presentasi produk ke toko baru.",
    name: "Agus Pratama",
    role: "Kepala Penjualan, distributor bahan pokok, Makassar",
  },
  {
    quote: "Tim sales kami cepat terbiasa. Dalam seminggu semua sudah memakainya setiap hari.",
    name: "Siti Nurhaliza",
    role: "Manajer Operasional, distributor farmasi, Yogyakarta",
  },
  {
    quote: "Tim One-I selalu responsif setiap kali kami butuh bantuan. Rasanya seperti punya tim IT sendiri.",
    name: "Yohanes Tanoto",
    role: "Pemilik distributor alat tulis, Denpasar",
  },
  {
    quote: "Keputusan membuka area baru sekarang kami ambil berdasarkan data, bukan tebakan.",
    name: "Fitri Amalia",
    role: "Direktur Operasional, distributor kosmetik, Jakarta",
  },
];

export function Testimonials() {
  return (
    <section id="testimoni" className="py-20 sm:py-28">
      <Reveal className="px-page text-center">
        {/* TODO: konfirmasi copy judul dan deskripsi (belum ada di PRD). */}
        <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl 2xl:text-5xl">
          Apa Kata Mereka tentang One-I
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Cerita dari tim distribusi yang memantau penjualan bersama One-I.
        </p>
      </Reveal>
      <div className="mt-6 sm:mt-10">
        <StaggerTestimonials
          testimonials={testimonials}
          labels={{ carousel: "Testimoni pelanggan", previous: "Testimoni sebelumnya", next: "Testimoni berikutnya" }}
        />
      </div>
    </section>
  );
}
