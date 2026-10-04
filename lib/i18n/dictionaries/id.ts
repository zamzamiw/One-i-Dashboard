// Teks halaman bahasa Indonesia (sumber: PRD). en.ts wajib punya struktur yang sama
// (dicek TypeScript lewat tipe Dictionary). Teks bertanda TODO belum ada di PRD.
export const id = {
  meta: {
    title: "Sistem Informasi Penjualan untuk Distributor",
    description: "Sistem informasi yang membantu distributor memantau tim sales, margin, dan performa bisnis.",
    ogLocale: "id_ID",
  },
  common: {
    newTab: "(membuka di tab baru)",
  },
  whatsapp: {
    // Penanda "dari website" membantu menghitung leads (PRD bagian 9).
    message: "Halo One-I, saya lihat dari website dan ingin konsultasi.",
    floatLabel: "Chat One-I via WhatsApp",
  },
  nav: {
    ariaLabel: "Navigasi utama",
    home: "kembali ke atas",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    more: "Lainnya",
    switchLanguage: "Ganti bahasa ke",
    links: {
      tentang: "Tentang",
      masalah: "Masalah",
      layanan: "Layanan",
      "cara-kerja": "Cara Kerja",
      kenapa: "Kenapa One-I?",
      testimoni: "Testimoni",
    },
    whatsapp: "WhatsApp",
    contact: "Contact Us",
  },
  languageTransition: {
    status: "Mengganti bahasa…",
  },
  hero: {
    titleLead: "Kenali setiap langkah sales,",
    titleAccent: "tumbuh lebih pasti.",
    subtitle: "Sistem informasi yang membantu distributor memantau tim sales, margin, dan performa bisnis.",
  },
  techStack: {
    // TODO: konfirmasi copy (belum ada di PRD).
    eyebrow: "Dibangun dengan teknologi andal",
    title: "Teknologi di Balik One-I",
  },
  about: {
    title: "Tentang One-I",
    intro:
      "One-I adalah platform digital penyedia sistem informasi penjualan untuk distributor. Membantu mengubah data lapangan yang rumit menjadi insight yang mudah dipahami.",
    acronymLabel: "One-I merupakan singkatan dari",
    // TODO: konfirmasi copy. Disusun dari ringkasan produk (PRD 1) dan kalimat manfaat PRD 5.3.
    // "real‑time" memakai tanda hubung tak terputus (U+2011) supaya tidak terpotong di akhir baris.
    body: "Kami membangun sistem informasi terintegrasi yang membantu distributor mengelola, memantau, dan mengembangkan seluruh aktivitas penjualan — dari lapangan hingga ke meja manajemen. Lacak penjualan, pantau tim, dan analisis profit margin secara real‑time, dengan sistem yang dapat disesuaikan dengan bisnis Anda.",
  },
  problems: {
    title: "Masalah yang Dihadapi Distributor",
    // TODO: konfirmasi copy. PRD 5.4 menyebut deskripsi tapi belum menyediakan teksnya.
    description:
      "Banyak distributor masih mengandalkan laporan manual dan data yang tersebar, sehingga masalah di lapangan baru terlihat ketika sudah terlambat.",
    counter: "Masalah",
    // TODO: konfirmasi judul singkat tiap masalah (draft Claude; PRD 5.4 hanya berisi kalimatnya).
    items: [
      { title: "Tim sales tak terpantau", text: "Aktivitas sales di lapangan sulit dipantau secara real-time" },
      { title: "Margin tak terlihat", text: "Margin keuntungan per pelanggan tidak terlihat jelas" },
      { title: "Laporan tercecer", text: "Laporan manajemen tersebar dan tidak saling terhubung" },
      {
        title: "Rute tanpa rencana",
        text: "Rute dan pergerakan tim sales tidak terencana, mengakibatkan kunjungan tidak efektif dan toko terlewat",
      },
      {
        title: "Pengiriman tidak efisien",
        text: "Rute pengiriman yang tidak terstruktur dengan rapi, menghambat efisiensi",
      },
    ],
  },
  features: {
    title: "Apa yang Dikerjakan One-I",
    description:
      "One-I dirancang untuk membantu distributor menghubungkan tim lapangan dengan informasi yang dibutuhkan manajemen.",
    items: [
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
        description: "Merangkum performa bisnis menyeluruh per lini bisnis untuk pengambilan keputusan manajemen.",
      },
    ],
  },
  howItWorks: {
    title: "Bagaimana Kami Bisa Membantu?",
    stepLabel: "Langkah",
    steps: ["Konsultasi kebutuhan", "Implementasi sistem", "Monitoring & pengembangan berkelanjutan"],
  },
  why: {
    title: "Kenapa One-I?",
    points: ["Pemantauan real-time", "Insight berbasis data", "Disesuaikan dengan bisnis Anda", "Didampingi tim lokal"],
  },
  testimonials: {
    // TODO: konfirmasi copy judul dan deskripsi (belum ada di PRD).
    title: "Apa Kata Mereka tentang One-I",
    description: "Cerita dari tim distribusi yang memantau penjualan bersama One-I.",
    labels: { carousel: "Testimoni pelanggan", previous: "Testimoni sebelumnya", next: "Testimoni berikutnya" },
    // TODO: SEMUA testimoni di bawah adalah CONTOH karangan (belum ada testimoni asli).
    // Ganti dengan testimoni asli + izin pelanggan sebelum go-live, atau sembunyikan section ini.
    // Menampilkan testimoni karangan ke publik termasuk klaim menyesatkan.
    items: [
      {
        quote: "Sekarang saya bisa lihat aktivitas tim sales di lapangan kapan saja, tanpa menunggu laporan sore.",
        name: "Budi Santoso",
        role: "Pemilik distributor FMCG, Surabaya",
      },
      {
        quote:
          "Margin per toko akhirnya kelihatan jelas. Kami jadi tahu pelanggan mana yang benar-benar menguntungkan.",
        name: "Rina Wulandari",
        role: "Manajer Keuangan, distributor minuman, Bandung",
      },
      {
        quote:
          "Laporan yang dulu tersebar di banyak file sekarang ada di satu tempat. Rapat mingguan jadi jauh lebih singkat.",
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
    ],
  },
  cta: {
    title: "Siap membuat tim sales Anda lebih terpantau?",
    subtitle: "Diskusikan kebutuhan distribusi Anda dengan One-I.",
    button: "Hubungi Kami Sekarang",
    newTab: "(membuka WhatsApp di tab baru)",
  },
  footer: {
    heading: "Contact Us",
    navigation: "Navigasi",
    home: "Beranda",
    contact: "Kontak",
    social: "Media Sosial",
    designedBy: "Designed by",
    backToTop: "Kembali ke atas",
  },
};
