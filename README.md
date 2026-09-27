# One-I — Landing Page

Landing page One-I (Optimized Network Engagement Indonesia): **TRACK · PERFORM · GROW**.
Spesifikasi: [`docs/PRD.md`](docs/PRD.md). Panduan setup di Windows: [`docs/SETUP-WINDOWS.md`](docs/SETUP-WINDOWS.md).

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
| `app/[lang]/layout.tsx` | Font, metadata SEO per bahasa |
| `lib/i18n/dictionaries/` | **Semua teks halaman**: `id.ts` (Indonesia, di `/`) dan `en.ts` (Inggris, di `/en`) |
| `app/globals.css` | Token warna brand |
| `components/sections/` | Satu file per section |
| `components/cursor-crosshair.tsx` | Crosshair kursor di seluruh situs (dipasang di `app/layout.tsx`) |
| `components/ui/interactive-canvas.tsx` | Latar grid titik interaktif di belakang halaman |
| `lib/site.ts` | Nama, **data kontak, nomor WhatsApp, "Designed by"** (masih placeholder `xxxx`), URL situs |
| `.claude/skills/ui-ux-pro-max/` | Skill desain untuk Claude Code |

## Stack

Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui · Motion (`motion/react`) · lucide-react
