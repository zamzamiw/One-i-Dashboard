// Semua data situs di satu tempat. Nilai bertanda TODO masih placeholder:
// ganti dengan data asli One-I sebelum go-live.
export const site = {
  name: "One-I",
  legalName: "Optimized Network Engagement Indonesia",
  tagline: "TRACK · PERFORM · GROW",
  title: "Sistem Informasi Penjualan untuk Distributor",
  description:
    "Sistem informasi yang membantu distributor memantau tim sales, margin, dan performa bisnis.",
  contact: {
    // TODO: nomor WhatsApp One-I, format internasional tanpa "+" dan spasi (contoh: 6281xxxxxxxxx).
    whatsapp: "620000000000",
    // TODO: konfirmasi teks pesan default. Penanda "dari website" membantu menghitung leads (PRD bagian 9).
    whatsappMessage: "Halo One-I, saya lihat dari website dan ingin konsultasi.",
    email: "halo@example.com", // TODO
    instagram: "https://instagram.com/", // TODO
    facebook: "https://facebook.com/", // TODO
  },
} as const;

export const nav = [
  { label: "Tentang", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  // TODO: label final. PRD 5.6 mengganti judul section jadi "Bagaimana Kami Bisa Membantu?".
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Contact Us", href: "#kontak" },
] as const;

export function whatsappLink(message: string = site.contact.whatsappMessage) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
