@AGENTS.md

# Project: Landing Page One-I

Spesifikasi lengkap ada di @docs/PRD.md. PRD adalah sumber kebenaran untuk isi, urutan section, dan brand.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS v4. `components.json` sudah disiapkan untuk shadcn/ui (style new-york).
- Animasi pakai paket `motion`, import dari "motion/react" (BUKAN "framer-motion"). Komponen yang memakai motion wajib diawali "use client".
- Font lewat next/font/google di app/layout.tsx: Space Grotesk (`font-heading`: judul, heading, nomor fitur), Inter (`font-sans`: body), Space Mono 400 (`font-mono`: menu navbar, huruf kapital).
- Ikon: lucide-react. Gabung class: `cn()` dari `@/lib/utils`.

## Struktur
- `app/page.tsx` — merangkai section sesuai urutan PRD bagian 4.
- `components/sections/` — satu section = satu file.
- `lib/site.ts` — nama, tagline, menu, data kontak, dan `whatsappLink()`. Semua data kontak diambil dari sini, jangan di-hardcode di komponen.
- ID anchor: `#hero`, `#tentang`, `#masalah`, `#layanan`, `#cara-kerja`, `#kenapa`, `#testimoni`, `#hubungi`, `#kontak`.
- Komponen pakai ulang: `components/reveal.tsx` (fade-up saat masuk layar), `components/route-steps.tsx` (daftar bernomor + garis "rute" yang terisi mengikuti scroll), `components/ui/letter-swap.tsx` (huruf bergulir acak saat kursor masuk ke link/tombol induknya), `components/ui/story-scroll.tsx` (`FlowArt` + `FlowSection`: panel bertumpuk, panel berikutnya naik sambil berputar 30° → 0°), `components/ui/stagger-testimonials.tsx` (carousel testimoni bertumpuk; foto opsional, tanpa foto tampil inisial).
- `components/ui/` — tempat komponen gaya shadcn/21st.dev. `hooks/` — custom hooks (alias `@/hooks`, sesuai components.json).

## Brand — jangan diganti
- Token Tailwind: `brand-navy` #0F172A (teks judul, navbar, CTA band), `brand-blue` #2552FC (aksen, CTA, logo — diganti pemilik project dari #3B5BFE di PRD), `brand-amber` #FF8A3D (aksen sekunder), `brand-surface` #EEF1FB (background card). Didefinisikan di app/globals.css.
- Amber hanya untuk garis, titik, dan aksen dekoratif — tidak untuk teks atau tombol (kontras di atas putih 2.35:1).
- Blue di atas navy hanya untuk teks besar (kontras 3.1:1).
- Tema terang saja, tidak ada dark mode.
- Skill ui-ux-pro-max dipakai untuk aturan UX, aksesibilitas, dan checklist. Warna dan font dari PRD SELALU mengalahkan rekomendasi warna/font skill tersebut.

## Aturan
- Semua teks di halaman berbahasa Indonesia, diambil dari PRD. Kalau copy belum ada di PRD, buat draft dan tandai dengan komentar TODO.
- Mobile-first. Cek tampilan di lebar 375px.
- Layout selebar layar (keputusan pemilik project): JANGAN pakai kontainer `mx-auto max-w-6xl`; pakai utilitas `px-page` (gutter fleksibel 20px–96px, di app/globals.css). Grid/kartu/gambar boleh melebar penuh, tapi paragraf tetap dibatasi (`max-w-xl`–`max-w-3xl`) supaya enak dibaca. Root font-size naik otomatis di ≥1600/1920/2400px. Hero mengisi satu layar di desktop (`lg:min-h-[calc(100svh-var(--nav-h))]`). Tinggi navbar = variabel `--nav-h` di app/globals.css (4rem, 5.75rem di ≥lg); `scroll-padding-top` ikut variabel ini. Cek di 320, 375, 768, 1024, 1440, 1920, dan 2560px.
- Hormati prefers-reduced-motion (pakai `useReducedMotion` dari motion/react). Prop `initial` dan style awal harus SAMA di server dan browser: reduced motion cukup membuat `transition` jadi `{ duration: 0 }` atau lewat kelas CSS `motion-reduce:`. Jangan pakai `initial={reduce ? false : ...}` atau render bersyarat berdasarkan `useReducedMotion` (memicu React error #418 / hydration mismatch).
- Target halaman muat < 3 detik. Jangan menambah three.js, GSAP, Lottie, atau library berat lain tanpa bertanya.
- Komponen dari 21st.dev: sesuaikan warna, font, dan teks ke brand; ganti import framer-motion ke motion/react.
- Sebelum selesai: `npm run build` dan `npm run lint` harus bersih.

## Keputusan pemilik project (mengubah/melengkapi PRD)
- Tombol WhatsApp melayang di pojok kanan bawah (`components/whatsapp-float.tsx`), dan menu "Contact Us" di navbar tampil sebagai tombol biru (tetap scroll ke `#kontak`). Hero tetap tanpa tombol CTA.
- Navbar mengikuti referensi desain pemilik project (gaya Checkpoint Research): menu huruf kapital `font-mono`; di desktop (≥lg) link tersusun dalam kolom 3 baris (Tentang, Masalah, Layanan | Cara Kerja, Lainnya); dropdown "Lainnya" (Kenapa One-I?, WhatsApp) dengan kotak panah bergaris; tombol "Contact Us ↗" biru bersudut tajam. Di bawah lg: menu hamburger dengan gaya yang sama. Semua teks menu (termasuk Lainnya, isi dropdown, dan Contact Us) memakai animasi random letter swap (`LetterSwap`): hanya mouse, mati untuk prefers-reduced-motion. Data menu: `nav` + `navMore` di lib/site.ts. Link menu HP baru scroll setelah menu selesai menutup (kalau bersamaan, smooth-scroll terhenti).
- Section Masalah (`components/sections/problems.tsx`) memakai efek story scroll dari 21st.dev, ditulis ulang dengan motion + CSS sticky (GSAP TIDAK dipasang): panel pembuka (judul + deskripsi, tanpa latar) lalu 5 panel masalah berwarna bergantian navy / blue / surface / blue / navy, masing-masing setinggi layar di bawah navbar. Panel tertahan di bawah navbar (`top: var(--nav-h)`). Reduced motion: panel tetap bertumpuk tanpa rotasi. Section ini sekitar 5,4 layar scroll.
- Section Testimoni (`components/sections/testimonials.tsx`, `#testimoni`) di antara Kenapa One-I? dan CTA band, juga masuk dropdown "Lainnya" di navbar. Isinya masih CONTOH KARANGAN (nama, jabatan, kutipan) karena belum ada testimoni asli; avatar pakai inisial, bukan foto stok (foto orang sungguhan + kutipan karangan = endorsement palsu). Wajib diganti testimoni asli + izin pelanggan, atau section disembunyikan, sebelum go-live.
- Label menu "Cara Kerja"; judul section tetap "Bagaimana Kami Bisa Membantu?".
- Nama brand ditulis "One-I" di seluruh halaman.
- Logo resmi: `components/logo.tsx` (navbar: ikon + nama saja lewat `tagline={false}`; tagline TRACK · PERFORM · GROW hanya di footer), `app/icon.svg` + `favicon.ico` + `apple-icon.png` (ikon browser/HP). Sumber bentuk: `docs/brand/logo-one-i-original.png`; warnanya diganti jadi `brand-blue` polos (tanpa gradien), batang tengah `#D8E0FE`.
- Arti nama: One-I = singkatan Optimized Network Engagement Indonesia (menggantikan penjelasan "One" + empat "I" di PRD 5.3). Ringkasan produk PRD bagian 1 kalimat kedua ("Landing page ini menjadi etalase...") adalah catatan internal, jangan ditampilkan.
- Footer (`components/sections/footer.tsx`, `#kontak`) mengikuti referensi desain dari pemilik project: logo + nama + tagline kiri atas, kolom Navigasi / Kontak / Media Sosial, wordmark "One-I" raksasa selebar kontainer, baris copyright + "Designed by" + "Kembali ke atas". Latar `brand-blue`. Di atas latar biru: logo pakai `<Logo inverse />`, teks sekunder minimal `text-white/90` (white/80 ke bawah gagal kontras AA).
- Crosshair kursor global (`components/cursor-crosshair.tsx`, dipasang di `app/layout.tsx` sehingga aktif di semua halaman): kursor asli TETAP tampil, garis grid horizontal + vertikal, dan tanda "+" biru mengikuti mouse, TANPA label koordinat (dihapus atas permintaan pemilik); overlay `pointer-events-none`. TANPA efek pada font (hero dan wordmark footer statis). Mati di perangkat sentuh dan untuk prefers-reduced-motion. Paket `framer-motion` tidak dipasang; pakai `motion/react`.
- Latar grid titik interaktif (`components/ui/interactive-canvas.tsx`, dipasang di `app/page.tsx`): canvas `fixed -z-10 pointer-events-none` di belakang konten, jadi hanya terlihat di section tanpa latar (Hero, panel pembuka Masalah, Cara Kerja, sekitar CTA); section `bg-brand-surface` dan footer menutupinya. Titik membesar di dekat kursor; digambar ulang hanya saat mouse bergerak. Statis di perangkat sentuh dan untuk prefers-reduced-motion. Versi 21st.dev aslinya tidak dipakai mentah (menghalangi klik, 14.400 titik per frame, salah koordinat setelah scroll).
- Biru brand #2552FC menggantikan #3B5BFE di PRD bagian 6, dipakai untuk logo, tombol, dan semua aksen biru.

## Keputusan yang masih terbuka (tanya pemilik project, jangan diasumsikan)
- Data kontak asli: nomor WhatsApp, email, alamat, link Instagram & Facebook, dan nama "Designed by" (semua placeholder "xxxx" di lib/site.ts).
- Konfirmasi copy paragraf 2 section Tentang (draft di components/sections/about.tsx).
- Konfirmasi deskripsi section Masalah (draft di components/sections/problems.tsx).
- Testimoni asli (nama, jabatan/perusahaan, kutipan, foto opsional, izin pelanggan) untuk menggantikan contoh karangan; judul + deskripsi section Testimoni (draft).
- Judul singkat tiap panel Masalah ("Tim sales tak terpantau", dst.; draft Claude, PRD 5.4 hanya berisi kalimatnya).

## Windows (kalau dijalankan di laptop pemilik)
- Jalankan Python dengan `python`, bukan `python3`.
