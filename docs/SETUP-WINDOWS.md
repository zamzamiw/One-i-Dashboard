# Panduan Windows: Menjalankan Landing Page One-I di Laptop

**Alur kerja project ini:** kode ditulis oleh Claude di session cloud (claude.ai/code), lalu di-push ke GitHub. Di laptop kamu cukup **menarik kode terbaru (`git pull`) dan melihat hasilnya di browser**. Tidak ada copy-paste kode, tidak perlu login Claude Code di VS Code.

Ikuti fase dari atas ke bawah. Fase 1–3 cukup sekali; Fase 4 diulang setiap ada perubahan.

---

## Fase 0 — Siapkan dulu

- [ ] Akun **GitHub** yang punya akses ke repo `zamzamiw/One-i-Dashboard`.
- [ ] Laptop Windows 10 atau 11, koneksi internet.

---

## Fase 1 — Install aplikasi (sekali saja)

Install **dengan urutan ini** — installer Git baru menawarkan VS Code sebagai editor kalau VS Code sudah terpasang.

### 1.1 VS Code
- [ ] Download dari https://code.visualstudio.com → **Download for Windows**.
- [ ] Di layar **Select Additional Tasks**, pastikan **Add to PATH** tercentang (wajib). Centang juga kedua opsi **Add "Open with Code" action…**

### 1.2 Git for Windows
- [ ] Download dari https://git-scm.com/downloads/win.
- [ ] Hampir semua layar cukup **Next**, kecuali:
  - **Choosing the default editor used by Git** → **Use Visual Studio Code as Git's default editor** (default-nya Vim, membingungkan untuk pemula).
  - **Adjusting the name of the initial branch in new repositories** → **Override the default branch name** → isi `main`.

### 1.3 Node.js (LTS)
- [ ] Download dari https://nodejs.org → tombol versi **LTS** → Next terus.
- [ ] Di layar **Tools for Native Modules**, **jangan** centang "Automatically install the necessary tools" (tidak dibutuhkan, bikin install lama).

### 1.4 Restart laptop
- [ ] **Restart.** Supaya ketiga aplikasi terbaca. Ini langkah yang paling sering dilewati dan jadi sumber error *"is not recognized"*.

### 1.5 Izinkan PowerShell menjalankan npm
Tanpa ini, `npm` di terminal VS Code error *"running scripts is disabled on this system"*.

- [ ] Start → ketik **PowerShell** → buka **Windows PowerShell** (tidak perlu Administrator), jalankan:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
  ```
  Ketik `Y` lalu Enter kalau ditanya.

### 1.6 Cek semua terpasang
Masih di PowerShell. Tiap baris harus mengeluarkan nomor versi:
```powershell
node -v
npm -v
git --version
code --version
```
- [ ] `node -v` minimal **v20.9** (versi LTS pasti memenuhi).

### 1.7 Kenalkan diri ke Git
```powershell
git config --global user.name "Nama Kamu"
git config --global user.email "email-github-kamu@contoh.com"
```

---

## Fase 2 — Ambil project dari GitHub (sekali saja)

Simpan di **`C:\Projects`**. **Jangan** di Desktop atau Documents — di banyak laptop Windows 11 keduanya disinkron OneDrive, dan OneDrive yang menyinkron ribuan file `node_modules` bikin laptop lambat dan memicu error `EPERM` (file terkunci).

- [ ] Di PowerShell:
  ```powershell
  mkdir C:\Projects
  cd C:\Projects
  git clone https://github.com/zamzamiw/One-i-Dashboard.git one-i-dashboard
  cd one-i-dashboard
  code .
  ```
- [ ] Kalau muncul jendela login GitHub → **Sign in with your browser** → izinkan.
- [ ] Di VS Code, kalau muncul **"Do you trust the authors of the files in this folder?"** → **Yes, I trust the authors**.
- [ ] Cek branch yang aktif. Buka terminal VS Code (**Terminal → New Terminal** atau **Ctrl+`**), jalankan:
  ```powershell
  git branch
  ```
  Harus ada tanda `*` di **`claude/website-claude-framer-uiux-bun1cd`** — branch tempat Claude mengirim kode. Kalau belum:
  ```powershell
  git checkout claude/website-claude-framer-uiux-bun1cd
  ```

---

## Fase 3 — Jalankan website pertama kali

Di terminal VS Code:

```powershell
npm install
npm run dev
```

- [ ] Buka **http://localhost:3000** di browser.
- [ ] Kalau Windows Defender Firewall bertanya soal Node.js → **Allow** untuk **Private networks**. Bonus: HP di Wi-Fi yang sama bisa membuka alamat **Network** yang tampil di terminal (misalnya `http://192.168.1.5:3000`) — cara terbaik mengecek tampilan mobile.
- [ ] Biarkan terminal ini tetap jalan. Untuk perintah lain, buka terminal kedua dengan tombol **+** di panel terminal. Menghentikan server: klik terminalnya → **Ctrl+C**.

---

## Fase 4 — Alur kerja harian (diulang setiap ada perubahan)

1. **Minta perubahan** di session Claude (claude.ai/code). Claude menulis kode, mengecek build, mengirim screenshot, lalu push ke GitHub.
2. **Tarik kode terbaru** — di terminal kedua VS Code:
   ```powershell
   git pull
   ```
3. **Kalau di output `git pull` muncul `package.json` atau `package-lock.json`**, ada library baru → jalankan:
   ```powershell
   npm install
   ```
   Lalu hentikan dan jalankan ulang `npm run dev`.
4. **Cek di browser** — http://localhost:3000 biasanya refresh sendiri. Cek juga versi mobile (lihat 5.1).
5. **Kasih feedback** di session Claude: apa yang kurang, sertakan screenshot kalau perlu.

### Aturan penting: jangan edit file di laptop
Semua perubahan lewat Claude. Kalau kamu mengedit file di laptop dan Claude juga mengubah file yang sama, `git pull` akan bentrok.

Kalau terlanjur mengedit dan `git pull` menolak dengan pesan *"Your local changes to the following files would be overwritten"*:
```powershell
git restore .
git pull
```
`git restore .` **membuang semua perubahan lokal kamu** — kalau perubahannya penting, kirim dulu isinya ke Claude.

---

## Fase 5 — Pengecekan kualitas

### 5.1 Tampilan mobile
- [ ] Di Chrome tekan **F12** → **Ctrl+Shift+M** → pilih **iPhone SE** (375px). Atau buka alamat Network di HP.

### 5.2 Kecepatan (target PRD: < 3 detik)
- [ ] Hentikan `npm run dev` (Ctrl+C), lalu jalankan versi produksi:
  ```powershell
  npm run build
  npm run start
  ```
- [ ] Buka http://localhost:3000 → **F12** → tab **Lighthouse** → Device **Mobile** → **Analyze page load**.
- [ ] Target **Performance ≥ 90**. Kalau kurang, kirim hasilnya ke Claude.

---

## Fase 6 — Online-kan dengan Vercel

- [ ] https://vercel.com → **Sign Up** → **Continue with GitHub**.
- [ ] **Add New… → Project** → pilih repo **One-i-Dashboard** → **Import** → **Deploy**.
- [ ] Kamu dapat alamat `https://….vercel.app`. Setiap push akan otomatis memperbarui website.
- [ ] Domain sendiri: **Project → Settings → Domains**.

Catatan: saat ini satu-satunya branch di repo adalah `claude/website-claude-framer-uiux-bun1cd`, jadi branch itu yang dianggap utama. Sebelum go-live sebaiknya dibuat branch `main` sebagai versi produksi — minta ke Claude saat websitenya siap.

---

## Kalau ada error

| Pesan error | Penyebab | Solusi |
|---|---|---|
| `npm.ps1 cannot be loaded because running scripts is disabled` | Kebijakan PowerShell | Ulangi langkah 1.5 |
| `'node' / 'git' / 'code' is not recognized` | PATH belum diperbarui | Restart laptop. Kalau masih, install ulang aplikasinya |
| `EPERM: operation not permitted` / file terkunci | Folder di OneDrive, antivirus, atau dev server masih jalan | Pindahkan project ke `C:\Projects`; hentikan `npm run dev` lalu ulangi |
| `Port 3000 is in use` | Dev server lain masih jalan | Pakai alamat yang tampil di terminal (Next.js pindah ke 3001), atau tutup terminal lama |
| `Your local changes … would be overwritten by merge` | Ada file yang kamu edit di laptop | Lihat "Aturan penting" di Fase 4 |
| `Module not found: Can't resolve '…'` | Ada library baru yang belum terpasang | `npm install`, lalu jalankan ulang `npm run dev` |
| `git pull` minta login terus / `403` | Akun GitHub belum punya akses | Minta pemilik repo menambahkan kamu sebagai collaborator |

---

## Opsional: pakai Claude Code langsung di VS Code

Tidak wajib untuk alur di atas. Kalau suatu saat mau:
1. **Ctrl+Shift+X** → cari **Claude Code** (publisher **Anthropic**) → **Install**.
2. Klik ikon **Spark** (✻) di Activity Bar kiri → **Claude.ai Subscription** → login di browser dengan akun claude.ai kamu → **Authorize**. Jangan pilih Anthropic Console (ditagih terpisah per pemakaian API).
3. Project ini sudah berisi `CLAUDE.md` dan skill `ui-ux-pro-max`, jadi Claude di VS Code langsung paham aturan brand dan PRD. Skill tersebut butuh Python 3 (https://www.python.org/downloads/windows, centang **Add python.exe to PATH** saat install).
4. Batas pemakaian langganan dipakai bersama antara claude.ai, session cloud, dan VS Code.
