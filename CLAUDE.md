@AGENTS.md

# Project: Landing Page One-I

Spesifikasi lengkap ada di @docs/PRD.md. PRD adalah sumber kebenaran untuk isi, urutan section, dan brand.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS v4. `components.json` sudah disiapkan untuk shadcn/ui (style new-york).
- Animasi pakai paket `motion`, import dari "motion/react" (BUKAN "framer-motion"). Komponen yang memakai motion wajib diawali "use client".
- Font lewat next/font/google di app/layout.tsx: Space Grotesk (`font-heading`: judul, heading, nomor fitur), Inter (`font-sans`: body).
- Ikon: lucide-react. Gabung class: `cn()` dari `@/lib/utils`.

## Struktur
- `app/page.tsx` — merangkai section sesuai urutan PRD bagian 4.
- `components/sections/` — satu section = satu file.
- `lib/site.ts` — nama, tagline, menu, data kontak, dan `whatsappLink()`. Semua data kontak diambil dari sini, jangan di-hardcode di komponen.
- ID anchor: `#hero`, `#tentang`, `#masalah`, `#layanan`, `#cara-kerja`, `#kenapa`, `#hubungi`, `#kontak`.
- Komponen pakai ulang: `components/reveal.tsx` (fade-up saat masuk layar), `components/route-steps.tsx` (daftar bernomor + garis "rute" yang terisi mengikuti scroll).

## Brand — jangan diganti
- Token Tailwind: `brand-navy` #0F172A (teks judul, navbar, CTA band), `brand-blue` #2552FC (aksen, CTA, logo — diganti pemilik project dari #3B5BFE di PRD), `brand-amber` #FF8A3D (aksen sekunder), `brand-surface` #EEF1FB (background card). Didefinisikan di app/globals.css.
- Amber hanya untuk garis, titik, dan aksen dekoratif — tidak untuk teks atau tombol (kontras di atas putih 2.35:1).
- Blue di atas navy hanya untuk teks besar (kontras 3.1:1).
- Tema terang saja, tidak ada dark mode.
- Skill ui-ux-pro-max dipakai untuk aturan UX, aksesibilitas, dan checklist. Warna dan font dari PRD SELALU mengalahkan rekomendasi warna/font skill tersebut.

## Aturan
- Semua teks di halaman berbahasa Indonesia, diambil dari PRD. Kalau copy belum ada di PRD, buat draft dan tandai dengan komentar TODO.
- Mobile-first. Cek tampilan di lebar 375px.
- Hormati prefers-reduced-motion (pakai `useReducedMotion` dari motion/react). Prop `initial` dan style awal harus SAMA di server dan browser: reduced motion cukup membuat `transition` jadi `{ duration: 0 }` atau lewat kelas CSS `motion-reduce:`. Jangan pakai `initial={reduce ? false : ...}` atau render bersyarat berdasarkan `useReducedMotion` (memicu React error #418 / hydration mismatch).
- Target halaman muat < 3 detik. Jangan menambah three.js, GSAP, Lottie, atau library berat lain tanpa bertanya.
- Komponen dari 21st.dev: sesuaikan warna, font, dan teks ke brand; ganti import framer-motion ke motion/react.
- Sebelum selesai: `npm run build` dan `npm run lint` harus bersih.

## Keputusan pemilik project (mengubah/melengkapi PRD)
- Tombol WhatsApp melayang di pojok kanan bawah (`components/whatsapp-float.tsx`), dan menu "Contact Us" di navbar tampil sebagai tombol biru (tetap scroll ke `#kontak`). Hero tetap tanpa tombol CTA.
- Label menu "Cara Kerja"; judul section tetap "Bagaimana Kami Bisa Membantu?".
- Nama brand ditulis "One-I" di seluruh halaman.
- Logo resmi: `components/logo.tsx` (navbar), `app/icon.svg` + `favicon.ico` + `apple-icon.png` (ikon browser/HP). Sumber bentuk: `docs/brand/logo-one-i-original.png`; warnanya diganti jadi `brand-blue` polos (tanpa gradien), batang tengah `#D8E0FE`.
- Arti nama: One-I = singkatan Optimized Network Engagement Indonesia (menggantikan penjelasan "One" + empat "I" di PRD 5.3). Ringkasan produk PRD bagian 1 kalimat kedua ("Landing page ini menjadi etalase...") adalah catatan internal, jangan ditampilkan.
- Biru brand #2552FC menggantikan #3B5BFE di PRD bagian 6, dipakai untuk logo, tombol, dan semua aksen biru.

## Keputusan yang masih terbuka (tanya pemilik project, jangan diasumsikan)
- Data kontak asli (placeholder di lib/site.ts).
- Konfirmasi copy paragraf 2 section Tentang (draft di components/sections/about.tsx).
- Konfirmasi deskripsi section Masalah (draft di components/sections/problems.tsx).
- Teks kartu Masalah rata kiri, bukan justify seperti PRD 5.4 (usulan Claude supaya tidak ada spasi renggang di HP; belum dikonfirmasi pemilik).

## Windows (kalau dijalankan di laptop pemilik)
- Jalankan Python dengan `python`, bukan `python3`.
