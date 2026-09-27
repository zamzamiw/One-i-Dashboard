# One-I — Landing Page

Landing page One-I (Optimized Network Engagement Indonesia): **TRACK · PERFORM · GROW**.
Spesifikasi: [`docs/PRD.md`](docs/PRD.md). Panduan setup di Windows: [`docs/SETUP-WINDOWS.md`](docs/SETUP-WINDOWS.md).

## Menjalankan

Butuh Node.js 20.9 atau lebih baru.

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Server development, otomatis refresh saat file berubah |
| `npm run build` | Build versi produksi (sekaligus cek error TypeScript) |
| `npm run start` | Menjalankan hasil build |
| `npm run lint` | Cek kualitas kode |

## Struktur

| Lokasi | Isi |
|---|---|
| `app/page.tsx` | Merangkai semua section sesuai urutan PRD |
| `app/layout.tsx` | Font, metadata SEO |
| `app/globals.css` | Token warna brand |
| `components/sections/` | Satu file per section |
| `components/cursor-crosshair.tsx` | Crosshair kursor di seluruh situs (dipasang di `app/layout.tsx`) |
| `components/ui/interactive-canvas.tsx` | Latar grid titik interaktif di belakang halaman |
| `lib/site.ts` | Nama, menu, **data kontak, nomor WhatsApp, "Designed by"** (masih placeholder `xxxx`) |
| `.claude/skills/ui-ux-pro-max/` | Skill desain untuk Claude Code |

## Stack

Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui · Motion (`motion/react`) · lucide-react
