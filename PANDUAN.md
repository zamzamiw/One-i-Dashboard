# Panduan Memakai Project One-I dari File Zip

File zip ini berisi **kode sumber** landing page One-I (Next.js). Isinya bukan website yang langsung bisa dibuka dengan klik dua kali: kode perlu dijalankan dulu dengan Node.js. Ikuti langkah di bawah dari atas ke bawah.

---

## 1. Yang perlu dipasang (sekali saja)

| Aplikasi | Untuk apa | Link |
|---|---|---|
| **Node.js versi LTS (20.9 atau lebih baru)** | Menjalankan project | https://nodejs.org → tombol **LTS** |
| **VS Code** (disarankan) | Membuka dan mengedit kode | https://code.visualstudio.com |

Cek Node.js sudah terpasang: buka **Command Prompt / PowerShell / Terminal**, ketik:

```bash
node -v
```

Harus muncul angka versi, misalnya `v22.x.x`. Kalau muncul "not recognized", pasang ulang Node.js lalu tutup dan buka lagi terminalnya.

---

## 2. Ekstrak zip

1. Klik kanan file `one-i-landing.zip` → **Extract All…** (Windows) atau klik dua kali (Mac).
2. Hasilnya folder `one-i-landing`. Pindahkan ke tempat yang mudah, misalnya `Documents`.
3. **Jangan** menjalankan project langsung dari dalam zip tanpa diekstrak.

---

## 3. Pasang paket (sekali, dan setiap `package.json` berubah)

1. Buka folder `one-i-landing` di VS Code (**File → Open Folder…**).
2. Buka terminal di VS Code: menu **Terminal → New Terminal**.
3. Jalankan:

```bash
npm install
```

Tunggu sampai selesai (1–3 menit, butuh internet). Perintah ini membuat folder `node_modules` berisi semua paket yang dibutuhkan. Folder itu sengaja **tidak** ikut di zip karena ukurannya ratusan MB dan bisa dibuat ulang kapan saja dengan `npm install`.

---

## 4. Menjalankan website di komputer sendiri

```bash
npm run dev
```

Setelah muncul tulisan `Ready`, buka browser ke:

- http://localhost:3000 → versi **Indonesia**
- http://localhost:3000/en → versi **Inggris**

Setiap file disimpan, halaman di browser otomatis ter-refresh. Untuk menghentikan server: klik terminal lalu tekan **Ctrl + C**.

---

## 5. Mengubah isi website

| Mau mengubah | Buka file |
|---|---|
| Semua **teks** halaman | `lib/i18n/dictionaries/id.ts` (Indonesia) **dan** `lib/i18n/dictionaries/en.ts` (Inggris). Strukturnya harus sama persis; kalau beda, build akan error. |
| **Nomor WhatsApp, email, alamat, Instagram, Facebook, "Designed by"** | `lib/site.ts` (masih berisi placeholder `xxxx`, wajib diganti sebelum online) |
| Daftar **logo teknologi** | `lib/tech-stack.ts` |
| **Warna** brand | `app/globals.css` (bagian paling atas) |
| Tampilan tiap section | `components/sections/` (satu file per section) |

Catatan lengkap semua keputusan desain dan hal yang **belum final** (kontak asli, testimoni asli, terjemahan Inggris, dll.) ada di `CLAUDE.md`, bagian "Keputusan yang masih terbuka".

> **Penting:** isi section **Testimoni** masih contoh karangan. Ganti dengan testimoni asli (dengan izin pelanggan) atau sembunyikan section itu sebelum website dipublikasikan.

---

## 6. Cek sebelum dipublikasikan

```bash
npm run build
npm run lint
```

Keduanya harus selesai tanpa error. `npm run build` membuat versi produksi; untuk mencobanya di komputer sendiri jalankan `npm run start`, lalu buka http://localhost:3000.

---

## 7. Mempublikasikan (online)

Cara termudah: **Vercel** (gratis untuk project pribadi, pembuat Next.js).

1. Upload folder project ke repository GitHub (tanpa folder `node_modules` dan `.next`).
2. Masuk ke https://vercel.com dengan akun GitHub → **Add New… → Project** → pilih repository tersebut → **Deploy**. Pengaturan bawaan sudah benar.
3. Setelah punya domain sendiri, tambahkan di Vercel (**Settings → Domains**) dan isi environment variable `NEXT_PUBLIC_SITE_URL` dengan alamat domain itu (misalnya `https://one-i.co.id`). Dipakai untuk tag SEO (canonical & hreflang).

---

## 8. Kalau ada masalah

| Masalah | Solusi |
|---|---|
| `Module not found: Can't resolve '...'` | Jalankan `npm install`, lalu `npm run dev` lagi. |
| `'npm' is not recognized` | Node.js belum terpasang / terminal belum dibuka ulang setelah memasang Node.js. |
| Port 3000 sudah dipakai | Jalankan `npm run dev -- -p 3001`, lalu buka http://localhost:3001. |
| Tampilan aneh / tidak berubah | Hentikan server (Ctrl + C), hapus folder `.next`, jalankan `npm run dev` lagi. |
| Animasi tidak muncul | Cek pengaturan "kurangi animasi" (reduce motion) di sistem operasi; kalau aktif, website sengaja menampilkan versi diam. |

---

## Isi zip

- `app/`, `components/`, `lib/` — kode website
- `public/` — file statis
- `docs/` — PRD (spesifikasi), logo asli, panduan setup Windows lewat Git
- `CLAUDE.md`, `AGENTS.md` — catatan untuk Claude Code (dan dokumentasi keputusan desain)
- `.claude/skills/` — skill desain untuk Claude Code (opsional)
- `package.json`, `package-lock.json` — daftar paket (dipakai `npm install`)

Tidak ikut di zip (dibuat otomatis): `node_modules/`, `.next/`. Riwayat Git juga tidak ikut; riwayat lengkap ada di repository GitHub `zamzamiw/One-i-Dashboard`.
