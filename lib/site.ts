// Data situs yang sama di semua bahasa. Teks yang diterjemahkan ada di lib/i18n/dictionaries.
// TODO: nilai "xxxx" dan link kosong di bawah adalah placeholder — ganti dengan data asli
// One-I sebelum go-live. Tombol WhatsApp melayang, CTA band, dan footer mengambil dari sini.
export const site = {
  name: "One-I",
  legalName: "Optimized Network Engagement Indonesia",
  tagline: "TRACK · PERFORM · GROW",
  // URL dasar untuk tag canonical/hreflang. TODO: isi NEXT_PUBLIC_SITE_URL dengan domain asli
  // saat go-live; di Vercel otomatis memakai domain produksi proyek.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  contact: {
    // Nomor untuk link wa.me: format internasional tanpa "+" dan spasi (contoh: 6281xxxxxxxxx).
    whatsapp: "620000000000",
    // Nomor yang tampil di footer.
    whatsappDisplay: "+62 xxxx-xxxx-xxxx",
    email: "xxxx@example.com",
    address: "xxxx",
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
  designedBy: "xxxx",
} as const;

// Anchor menu navbar; labelnya di kamus (nav.links). `navMore` = isi dropdown "Lainnya"
// (ditambah link WhatsApp). Footer kolom Navigasi memakai `nav`.
export const nav = ["tentang", "masalah", "layanan", "cara-kerja"] as const;
export const navMore = ["kenapa", "testimoni"] as const;
export type NavAnchor = (typeof nav)[number] | (typeof navMore)[number];

// Tombol "Contact Us" di navbar scroll ke footer.
export const contactHref = "#kontak";

// Pesan default berbeda per bahasa (kamus whatsapp.message).
export function whatsappLink(message: string) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
