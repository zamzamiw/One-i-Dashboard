# Panduan Lengkap: Landing Page One-I di Windows (VS Code + Claude Code)

Ikuti fase demi fase, dari atas ke bawah. Centang tiap langkah yang selesai. Jangan loncat fase: tiap fase bergantung pada fase sebelumnya.

> Versi saat panduan ini diuji: Next.js 16.3.6, motion 13.4.4, uipro-cli 2.2.3, shadcn 4.21.0.

---

## Fase 0 — Siapkan dulu

- [ ] Akun **Claude berbayar** (Pro, Max, Team, atau Enterprise) atau akun Claude Console. Paket gratis tidak bisa pakai Claude Code.
- [ ] Akun **GitHub** yang punya akses ke repo `zamzamiw/One-i-Dashboard`.
- [ ] File **`PRD.md`** (sudah dikirim di chat) — nanti ditaruh di folder `docs/`.
- [ ] File **logo One-I**, idealnya `.svg` (kalau tidak ada, `.png` resolusi tinggi).
- [ ] Data kontak: nomor WhatsApp, email, link Instagram, link Facebook.

---

## Fase 1 — Install aplikasi (sekali saja seumur laptop)

Install **dengan urutan ini**. Urutannya penting: installer Git baru menawarkan VS Code sebagai editor kalau VS Code sudah terpasang.

### 1.1 VS Code
- [ ] Download dari https://code.visualstudio.com → **Download for Windows**.
- [ ] Jalankan installer. Di layar **Select Additional Tasks**, centang:
  - **Add "Open with Code" action to Windows Explorer file context menu**
  - **Add "Open with Code" action to Windows Explorer directory context menu**
  - **Add to PATH** (biasanya sudah tercentang — **wajib**, supaya perintah `code .` jalan)

### 1.2 Git for Windows
- [ ] Download dari https://git-scm.com/downloads/win → **Click here to download**.
- [ ] Jalankan installer. Hampir semua layar cukup **Next**, kecuali dua ini:
  - **Choosing the default editor used by Git** → pilih **Use Visual Studio Code as Git's default editor**. (Default-nya Vim, yang membingungkan untuk pemula.)
  - **Adjusting the name of the initial branch in new repositories** → pilih **Override the default branch name** dan isi `main`.

Git juga dipakai Claude Code: dengan Git for Windows, Claude Code bisa menjalankan perintah lewat Git Bash.

### 1.3 Node.js (LTS)
- [ ] Download dari https://nodejs.org → tombol versi **LTS**.
- [ ] Jalankan installer, klik **Next** terus.
- [ ] Di layar **Tools for Native Modules**, **jangan** centang "Automatically install the necessary tools". Tidak dibutuhkan dan bikin install lama.

### 1.4 Python 3 (dibutuhkan skill UI UX Pro Max)
- [ ] Download dari https://www.python.org/downloads/windows → pilih **Python 3.13** → **Windows installer (64-bit)**.
- [ ] Di layar pertama installer, **centang "Add python.exe to PATH"** (di bagian bawah — gampang terlewat), lalu **Install Now**.
- [ ] Kalau di akhir muncul **Disable path length limit**, klik. Ini juga membantu folder `node_modules` yang path-nya panjang.

### 1.5 Restart laptop
- [ ] **Restart laptop.** Supaya semua aplikasi di atas terbaca di PATH. Ini langkah yang paling sering dilewati dan jadi sumber error "is not recognized".

### 1.6 Izinkan PowerShell menjalankan npm
Tanpa ini, perintah `npm`/`npx` di terminal VS Code akan error *"running scripts is disabled on this system"*.

- [ ] Klik Start → ketik **PowerShell** → buka **Windows PowerShell** (tidak perlu Run as Administrator).
- [ ] Jalankan:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
  ```
  Kalau ditanya konfirmasi, ketik `Y` lalu Enter.

### 1.7 Cek semua sudah terpasang
Masih di PowerShell, jalankan satu per satu. Tiap perintah harus mengeluarkan nomor versi:

```powershell
node -v
npm -v
git --version
python --version
code --version
```

- [ ] `node -v` menunjukkan **v20.9 atau lebih baru** (versi LTS pasti memenuhi).
- [ ] `python --version` menunjukkan `Python 3.x`. Kalau yang muncul *"Python was not found; run without arguments to install from the Microsoft Store"*, berarti "Add python.exe to PATH" tadi tidak tercentang → jalankan lagi installer Python → **Modify** → centang **Add Python to environment variables**.

### 1.8 Kenalkan diri ke Git
Ganti dengan nama dan email akun GitHub kamu:

```powershell
git config --global user.name "Nama Kamu"
git config --global user.email "email-github-kamu@contoh.com"
```

- [ ] Selesai.

---

## Fase 2 — Pasang ekstensi Claude Code di VS Code

- [ ] Buka VS Code.
- [ ] Tekan **Ctrl+Shift+X** (Extensions) → cari **Claude Code** → pastikan publisher-nya **Anthropic** → **Install**.
- [ ] Kalau ikonnya belum muncul: **Ctrl+Shift+P** → ketik **Developer: Reload Window** → Enter.

Login dilakukan nanti di Fase 3, setelah folder project terbuka.

---

## Fase 3 — Bikin folder project

### 3.1 Pilih lokasi yang aman
Simpan project di **`C:\Projects`**. **Jangan** di Desktop atau Documents: di banyak laptop Windows 11 kedua folder itu disinkron ke OneDrive, dan OneDrive yang menyinkron ribuan file `node_modules` bikin laptop lambat dan memicu error `EPERM` (file terkunci). Hindari juga nama folder yang pakai spasi.

- [ ] Di PowerShell:
  ```powershell
  mkdir C:\Projects
  cd C:\Projects
  ```

### 3.2 Clone repo GitHub
Nama folder **harus huruf kecil semua** — `create-next-app` menolak nama folder berhuruf kapital seperti `One-i-Dashboard`.

- [ ] Jalankan:
  ```powershell
  git clone https://github.com/zamzamiw/One-i-Dashboard.git one-i-dashboard
  cd one-i-dashboard
  code .
  ```
- [ ] Kalau muncul jendela login GitHub, pilih **Sign in with your browser** dan izinkan.
- [ ] Kalau muncul *"warning: You appear to have cloned an empty repository"* — itu **normal**, repo-nya memang masih kosong.

### 3.3 Di VS Code
- [ ] Kalau muncul **"Do you trust the authors of the files in this folder?"** → klik **Yes, I trust the authors**. (Kalau tidak, Claude Code tidak bisa jalan — mode Restricted.)
- [ ] Buka terminal: menu **Terminal → New Terminal** (atau **Ctrl+`**). Pastikan terminal menunjukkan path `C:\Projects\one-i-dashboard`.

### 3.4 Login Claude Code
- [ ] Klik ikon **Spark** (✻) di **Activity Bar** kiri. (Ikon Spark di pojok kanan atas editor hanya muncul kalau ada file yang terbuka.)
- [ ] Klik **Sign in** → selesaikan login di browser.

---

## Fase 4 — Setup project (jalankan di terminal VS Code, urut)

### 4.1 Next.js + TypeScript + Tailwind
Perhatikan titik (`.`) setelah `@latest` — artinya "pasang di folder ini".

```powershell
npx create-next-app@latest . --ts --tailwind --eslint --app --use-npm --yes
```

- [ ] Kalau muncul *"Need to install the following packages: create-next-app… Ok to proceed? (y)"* → ketik `y` → Enter.
- [ ] Tunggu sampai muncul **Success! Created one-i-dashboard**.

### 4.2 shadcn/ui (fondasi komponen 21st.dev)
Pakai versi **Radix** (`-b radix`), karena mayoritas komponen 21st.dev dibuat untuk shadcn versi Radix (misalnya memakai `asChild`).

```powershell
npx shadcn@latest init -b radix -p nova
```

- [ ] Kalau muncul pertanyaan tambahan, tekan **Enter** untuk memilih default.

### 4.3 Motion (Framer Motion)
```powershell
npm install motion
```
- [ ] Selesai. Di kode nanti import-nya dari `"motion/react"`, bukan `"framer-motion"`.

### 4.4 Skill UI UX Pro Max
```powershell
npx uipro-cli init --ai claude
```
- [ ] Muncul **UI/UX Pro Max installed successfully!** dan ada folder `.claude\skills\ui-ux-pro-max`.
- [ ] Tes script-nya jalan (harus keluar hasil, bukan error):
  ```powershell
  python .claude/skills/ui-ux-pro-max/scripts/search.py "landing page" --domain style -n 1
  ```

### 4.5 Jalankan website
```powershell
npm run dev
```

- [ ] Buka **http://localhost:3000** di browser → muncul halaman bawaan Next.js.
- [ ] Kalau Windows Defender Firewall bertanya soal Node.js → **Allow** untuk **Private networks**. Bonus: HP yang tersambung ke Wi-Fi yang sama bisa membuka alamat **Network** yang tampil di terminal (misalnya `http://192.168.1.5:3000`) — cara paling jujur untuk cek tampilan mobile.
- [ ] Biarkan terminal ini tetap jalan selama kamu bekerja. Untuk perintah lain, buka terminal kedua dengan tombol **+** di panel terminal. Untuk menghentikan server: klik terminalnya → **Ctrl+C**.

---

## Fase 5 — Masukkan PRD, logo, dan aturan untuk Claude

### 5.1 PRD dan logo
- [ ] Buat folder `docs` di root project, simpan **`PRD.md`** di situ → `docs\PRD.md`.
- [ ] Simpan logo di folder `public` → misalnya `public\logo.svg`.

### 5.2 CLAUDE.md
`create-next-app` sudah membuat file `CLAUDE.md` berisi satu baris `@AGENTS.md`. Buka file itu dan **ganti seluruh isinya** dengan ini:

```markdown
@AGENTS.md

# Project: Landing Page One-I

Spesifikasi lengkap ada di @docs/PRD.md. PRD adalah sumber kebenaran untuk isi, urutan section, dan brand.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui (Radix)
- Animasi pakai paket `motion`, import dari "motion/react" (BUKAN "framer-motion"). Komponen yang memakai motion wajib diawali "use client".
- Font lewat next/font/google: Space Grotesk (judul, heading, nomor fitur), Inter (body text).

## Brand — jangan diganti
- Navy #0F172A (teks judul, navbar, CTA band), Blue #3B5BFE (aksen, CTA, logo), Amber #FF8A3D (aksen sekunder), Light Gray #EEF1FB (background card).
- Amber hanya untuk garis, titik, dan aksen dekoratif — tidak untuk teks atau tombol (kontras di atas putih cuma 2.35:1).
- Blue di atas navy hanya untuk teks besar (kontras 3.5:1).
- Skill ui-ux-pro-max dipakai untuk aturan UX, aksesibilitas, dan checklist. Warna dan font dari PRD SELALU mengalahkan rekomendasi warna/font skill tersebut.

## Aturan
- Semua teks di halaman berbahasa Indonesia, diambil dari PRD. Kalau copy belum ada di PRD, buat draft dan tandai dengan komentar TODO.
- Mobile-first. Cek tampilan di lebar 375px.
- Hormati prefers-reduced-motion (pakai useReducedMotion dari motion/react).
- Target halaman muat < 3 detik. Jangan menambah three.js, GSAP, Lottie, atau library berat lain tanpa bertanya.
- Komponen dari 21st.dev: sesuaikan warna, font, dan teks ke brand; ganti import framer-motion ke motion/react.
- Satu section = satu file di components/sections/.

## Windows
- Jalankan Python dengan `python`, bukan `python3`.
```

### 5.3 Rapikan .gitignore
- [ ] Buka `.gitignore`, tambahkan baris ini di paling bawah (file setting pribadi Claude Code, jangan ikut ke GitHub):
  ```
  .claude/settings.local.json
  ```

### 5.4 Muat ulang Claude Code
- [ ] **Ctrl+Shift+P** → **Developer: Reload Window**, supaya skill dan CLAUDE.md terbaca.
- [ ] Buka panel Claude, tanyakan: *"Skill apa saja yang tersedia di project ini?"* → jawabannya harus menyebut **ui-ux-pro-max**.

---

## Fase 6 — Simpan titik awal ke GitHub

Sebelum Claude mulai mengubah apa pun, simpan kondisi bersih ini. Kalau nanti ada yang rusak, kamu selalu bisa kembali ke sini.

Di terminal kedua:

```powershell
git add .
git commit -m "Setup Next.js, shadcn, motion, skill UI UX Pro Max, dan PRD"
git branch -M main
git push -u origin main
```

- [ ] Buka repo di GitHub, pastikan file-file sudah muncul.

---

## Fase 7 — Bangun website bersama Claude Code

### 7.1 Siapkan jawaban untuk keputusan yang masih terbuka
PRD masih punya beberapa hal yang belum diputuskan. Claude akan menanyakannya — siapkan jawabannya:

- [ ] Tambah **tombol WhatsApp melayang** dan/atau jadikan menu **Contact Us** di navbar sebagai tombol? (PRD melarang tombol CTA di hero dan navbar, sehingga di layar pertama tidak ada ajakan kontak sama sekali.)
- [ ] Label menu: **"Cara Kerja"** atau **"Cara Kami Membantu"**? (PRD sudah mengganti judul section, tapi navbar masih "Cara Kerja".)
- [ ] Penulisan nama brand: **One-I**, **ONE-I**, atau **One–I**? Pilih satu.
- [ ] **Nomor WhatsApp** + **pesan default**. Saran: beri penanda sumber, misalnya *"Halo One-I, saya lihat dari website dan ingin konsultasi."* — supaya chat dari website bisa dihitung (metrik di PRD bagian 9).
- [ ] Link **Email, Instagram, Facebook**.
- [ ] **Paragraf 2 section Tentang** (PRD baru berisi deskripsi, belum teks final): tulis sendiri atau minta Claude buat draft.

### 7.2 Mode kerja Claude
Di bawah kotak prompt ada pilihan **permission mode**:
- **Plan** — Claude hanya membuat rencana, tidak mengubah file. Pakai untuk prompt pertama.
- **Manual** — Claude minta izin sebelum setiap perubahan dan menunjukkan diff. Paling aman.
- **Edit automatically** — Claude langsung mengedit file. Lebih cepat; aman selama kamu commit tiap section selesai.

Kalau hasil Claude melenceng: arahkan kursor ke pesan → tombol **rewind** → **Rewind code to here** untuk membatalkan perubahan file.

### 7.3 Prompt 1 — Rencana (mode Plan)
```
Baca CLAUDE.md dan docs/PRD.md. Jangan tulis kode dulu.
Buat rencana implementasi landing page One-I:
1. Daftar komponen per section dan lokasi filenya
2. Design token warna dan font
3. Animasi apa di section mana
4. Hal di PRD yang ambigu, saling bertentangan, atau datanya belum ada
Tanyakan ke saya hal nomor 4 sebelum mulai.
```
- [ ] Jawab pertanyaan Claude pakai daftar di 7.1, lalu setujui rencananya.

### 7.4 Prompt 2 — Fondasi
```
Setup fondasi saja, belum ada section:
- Warna brand sebagai CSS variable dan token Tailwind di app/globals.css
- Font Space Grotesk + Inter via next/font/google di app/layout.tsx
- Metadata SEO: title, description, lang="id", Open Graph (supaya preview link rapi saat dibagikan di WhatsApp)
- Kosongkan isi app/page.tsx
Jalankan npm run build di akhir dan pastikan tidak ada error.
```
- [ ] Cek http://localhost:3000, lalu commit (lihat 7.6).

### 7.5 Prompt 3 dst. — Satu section per prompt
Kerjakan **urut**, satu section per prompt. Template:

```
Buat section [NAMA] sesuai PRD bagian [5.x].
Simpan di components/sections/[nama-file].tsx dan pasang di app/page.tsx.
Pastikan rapi di lebar 375px.
```

| Urutan | Section | PRD | Catatan tambahan untuk prompt |
|---|---|---|---|
| 1 | Navbar | 5.1 | Sticky, menu smooth-scroll ke section (FR-3), menu hamburger di mobile |
| 2 | Hero | 5.2 | *"Grafik rute sebagai SVG. Garisnya tergambar dari kiri (Track) ke kanan (Grow) saat halaman dibuka memakai motion (pathLength), lalu 3 titik penanda muncul berurutan. Titik Grow warna amber."* |
| 3 | Tentang One-I | 5.3 | Rata tengah |
| 4 | Masalah Distributor | 5.4 | Blok di tengah, teks rata kiri (justify di kalimat pendek bikin spasi renggang) |
| 5 | 5 Fitur Utama | 5.5 | *"Garis vertikal yang terisi mengikuti scroll (useScroll), tiap item fade-in saat masuk layar."* |
| 6 | Bagaimana Kami Membantu | 5.6 | 3 langkah, tanpa sub-teks |
| 7 | Kenapa One-I | 5.7 | 4 poin |
| 8 | CTA Band | 5.8 | Link `wa.me` dengan pesan default ter-encode, buka di tab baru (`target="_blank"`, `rel="noopener noreferrer"`) — FR-1 |
| 9 | Footer — Contact Us | 5.9 | Grid 2 kolom: Email, WhatsApp, Instagram, Facebook — FR-2 |

**Pakai komponen 21st.dev?** Buka halaman komponennya → klik **Copy prompt** → paste ke Claude dengan pengantar:
```
Ini komponen dari 21st.dev untuk section [NAMA] (PRD bagian 5.x).
Sesuaikan warna, font, dan teks dengan brand dan PRD.
Ganti import framer-motion ke motion/react.
Kalau butuh dependency berat, beri tahu saya dulu.
```
Sebelum paste, cek daftar dependency-nya. Kalau ada `three`, `gsap`, atau `lottie`, pertimbangkan ulang (target muat < 3 detik).

### 7.6 Setelah setiap section
- [ ] Cek di browser (desktop).
- [ ] Cek tampilan mobile: di Chrome tekan **F12** → **Ctrl+Shift+M** → pilih **iPhone SE** (375px). Atau buka alamat Network di HP.
- [ ] Commit dan push (bisa juga minta ke Claude: *"commit dan push perubahan ini"*):
  ```powershell
  git add .
  git commit -m "Tambah section hero"
  git push
  ```

### 7.7 Prompt terakhir — Review
```
Review seluruh halaman memakai skill ui-ux-pro-max:
aksesibilitas, kontras warna, tampilan di 375px, prefers-reduced-motion,
dan kesesuaian dengan PRD (termasuk FR-1 sampai FR-4).
Perbaiki yang bermasalah, lalu jalankan npm run build dan npm run lint sampai bersih.
```

### 7.8 Cek kecepatan (target PRD: < 3 detik)
- [ ] Hentikan `npm run dev` (Ctrl+C), lalu jalankan versi produksi:
  ```powershell
  npm run build
  npm run start
  ```
- [ ] Buka http://localhost:3000 di Chrome → **F12** → tab **Lighthouse** → Device: **Mobile** → **Analyze page load**.
- [ ] Target skor **Performance ≥ 90**. Kalau di bawah itu, kirim hasilnya ke Claude dan minta perbaikan.

---

## Fase 8 — Online-kan dengan Vercel

- [ ] Buka https://vercel.com → **Sign Up** → **Continue with GitHub**.
- [ ] **Add New… → Project** → pilih repo **One-i-Dashboard** → **Import**.
- [ ] Framework otomatis terdeteksi **Next.js**. Klik **Deploy**.
- [ ] Setelah selesai, kamu dapat alamat `https://….vercel.app`. Setiap `git push` ke `main` akan otomatis memperbarui website.
- [ ] Domain sendiri (misalnya `one-i.co.id`): **Project → Settings → Domains**.

---

## Kalau ada error

| Pesan error | Penyebab | Solusi |
|---|---|---|
| `npx.ps1 cannot be loaded because running scripts is disabled` | Kebijakan PowerShell | Ulangi langkah 1.6 |
| `'node' / 'git' / 'code' is not recognized` | PATH belum diperbarui | Restart laptop. Kalau masih, install ulang aplikasinya |
| `Python was not found; run without arguments to install from the Microsoft Store` | Python belum masuk PATH | Installer Python → **Modify** → centang **Add Python to environment variables** |
| `Could not create a project called "One-i-Dashboard" because of npm naming restrictions` | Nama folder berhuruf kapital | Clone ulang dengan nama folder huruf kecil (langkah 3.2) |
| `EPERM: operation not permitted` / file terkunci | Folder di OneDrive, antivirus, atau dev server masih jalan | Pindahkan project ke `C:\Projects`; hentikan `npm run dev` lalu ulangi |
| `Port 3000 is in use` | Dev server lain masih jalan | Next.js otomatis pindah ke 3001 — pakai alamat yang tampil di terminal, atau tutup terminal lama |
| `shadcn init` gagal atau opsinya ditolak | Versi shadcn berubah | Jalankan `npx shadcn@latest init` tanpa opsi, pilih **Radix** lalu preset **Nova** |
| Ikon Spark Claude tidak muncul | Tidak ada file terbuka, atau mode Restricted | Buka file apa saja; pastikan folder sudah di-*trust*; **Developer: Reload Window** |
| Claude tidak mengenali skill ui-ux-pro-max | Belum di-reload | **Developer: Reload Window**, lalu tanya lagi |
| `git push` ditolak (`403` / `Permission denied`) | Akun GitHub belum punya akses tulis ke repo | Minta pemilik repo menambahkan kamu sebagai collaborator |
