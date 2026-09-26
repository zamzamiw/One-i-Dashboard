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

## Brand — jangan diganti
- Token Tailwind: `brand-navy` #0F172A (teks judul, navbar, CTA band), `brand-blue` #3B5BFE (aksen, CTA, logo), `brand-amber` #FF8A3D (aksen sekunder), `brand-surface` #EEF1FB (background card). Didefinisikan di app/globals.css.
- Amber hanya untuk garis, titik, dan aksen dekoratif — tidak untuk teks atau tombol (kontras di atas putih 2.35:1).
- Blue di atas navy hanya untuk teks besar (kontras 3.5:1).
- Tema terang saja, tidak ada dark mode.
- Skill ui-ux-pro-max dipakai untuk aturan UX, aksesibilitas, dan checklist. Warna dan font dari PRD SELALU mengalahkan rekomendasi warna/font skill tersebut.

## Aturan
- Semua teks di halaman berbahasa Indonesia, diambil dari PRD. Kalau copy belum ada di PRD, buat draft dan tandai dengan komentar TODO.
- Mobile-first. Cek tampilan di lebar 375px.
- Hormati prefers-reduced-motion (pakai `useReducedMotion` dari motion/react).
- Target halaman muat < 3 detik. Jangan menambah three.js, GSAP, Lottie, atau library berat lain tanpa bertanya.
- Komponen dari 21st.dev: sesuaikan warna, font, dan teks ke brand; ganti import framer-motion ke motion/react.
- Sebelum selesai: `npm run build` dan `npm run lint` harus bersih.

## Keputusan pemilik project (mengubah/melengkapi PRD)
- Tombol WhatsApp melayang di pojok kanan bawah (`components/whatsapp-float.tsx`), dan menu "Contact Us" di navbar tampil sebagai tombol biru (tetap scroll ke `#kontak`). Hero tetap tanpa tombol CTA.
- Label menu "Cara Kerja"; judul section tetap "Bagaimana Kami Bisa Membantu?".
- Nama brand ditulis "One-I" di seluruh halaman.
- Logo resmi: `components/logo.tsx` (navbar), `app/icon.svg` + `favicon.ico` + `apple-icon.png` (ikon browser/HP). Sumber asli: `docs/brand/logo-one-i-original.png`. Gradien logo `#0655FC` → `#00B6FF` sengaja berbeda dari `brand-blue`; jangan dipakai sebagai warna UI.

## Keputusan yang masih terbuka (tanya pemilik project, jangan diasumsikan)
- Data kontak asli (placeholder di lib/site.ts).
- Copy final paragraf 2 section Tentang.

## Windows (kalau dijalankan di laptop pemilik)
- Jalankan Python dengan `python`, bukan `python3`.
