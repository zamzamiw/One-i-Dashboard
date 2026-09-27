// Semua data situs di satu tempat.
// TODO: nilai "xxxx" dan link kosong di bawah adalah placeholder — ganti dengan data asli
// One-I sebelum go-live. Tombol WhatsApp melayang, CTA band, dan footer mengambil dari sini.
export const site = {
  name: "One-I",
  legalName: "Optimized Network Engagement Indonesia",
  tagline: "TRACK · PERFORM · GROW",
  title: "Sistem Informasi Penjualan untuk Distributor",
  description:
    "Sistem informasi yang membantu distributor memantau tim sales, margin, dan performa bisnis.",
  contact: {
    // Nomor untuk link wa.me: format internasional tanpa "+" dan spasi (contoh: 6281xxxxxxxxx).
    whatsapp: "620000000000",
    // Nomor yang tampil di footer.
    whatsappDisplay: "+62 xxxx-xxxx-xxxx",
    // Penanda "dari website" membantu menghitung leads (PRD bagian 9).
    whatsappMessage: "Halo One-I, saya lihat dari website dan ingin konsultasi.",
    email: "xxxx@example.com",
    address: "xxxx",
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
  designedBy: "xxxx",
} as const;

export const nav = [
  { label: "Tentang", href: "#tentang" },
  { label: "Masalah", href: "#masalah" },
  { label: "Layanan", href: "#layanan" },
  { label: "Cara Kerja", href: "#cara-kerja" },
] as const;

// Isi dropdown "Lainnya" di navbar (ditambah link WhatsApp dari whatsappLink()).
export const navMore = [
  { label: "Kenapa One-I?", href: "#kenapa" },
  { label: "Testimoni", href: "#testimoni" },
] as const;

// Ditampilkan sebagai tombol di navbar, tetap scroll ke section Contact Us.
export const contactNav = { label: "Contact Us", href: "#kontak" } as const;

export function whatsappLink(message: string = site.contact.whatsappMessage) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
