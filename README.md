# One-I — Landing Page

Landing page One-I (Optimized Network Engagement Indonesia): **TRACK · PERFORM · GROW**.
Spesifikasi: [`docs/PRD.md`](docs/PRD.md). Memakai project dari file zip: [`PANDUAN.md`](PANDUAN.md). Panduan setup Windows lewat Git: [`docs/SETUP-WINDOWS.md`](docs/SETUP-WINDOWS.md).

## Menjalankan

Butuh Node.js 20.9 atau lebih baru.

```bash
npm install
npm run dev
```

Buka http://localhost:3000 (Indonesia) atau http://localhost:3000/en (Inggris).

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Server development, otomatis refresh saat file berubah |
| `npm run build` | Build versi produksi (sekaligus cek error TypeScript) |
| `npm run start` | Menjalankan hasil build |
| `npm run lint` | Cek kualitas kode |

## Struktur

| Lokasi | Isi |
|---|---|
| `app/[lang]/page.tsx` | Merangkai semua section sesuai urutan PRD |
| `app/[lang]/layout.tsx` | Font, metadata SEO per bahasa, loading awal |
| `lib/i18n/dictionaries/` | **Semua teks halaman**: `id.ts` (Indonesia, di `/`) dan `en.ts` (Inggris, di `/en`) |
| `lib/site.ts` | Nama, **data kontak, nomor WhatsApp, "Designed by"** (masih placeholder `xxxx`), URL situs |
| `lib/tech-stack.ts` | Daftar logo di pita Teknologi |
| `app/globals.css` | Token warna brand + animasi CSS |
| `components/sections/` | Satu file per section |
| `components/one-i-tail.tsx` | Karakter "i" di hero + ekornya yang mengikuti scroll sampai Contact Us |
| `components/ui/paper-design-shader-background.tsx` | Latar gradien bergerak (shader) di belakang halaman |
| `CLAUDE.md` | Catatan lengkap semua keputusan desain + daftar hal yang belum final |
| `PANDUAN.md` | Panduan memakai project dari file zip |

## Stack

Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui · Motion (`motion/react`) · lucide-react · Paper Shaders (`@paper-design/shaders-react`)
