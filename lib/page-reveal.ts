// Koordinasi layar penutup halaman: loading awal (components/intro-loader.tsx) dan layar
// ganti bahasa (components/language-transition.tsx). Animasi yang harus terlihat sejak awal
// (mis. animasi muncul karakter One-I di hero) menunggu sampai halaman tidak tertutup lagi.
// File ini tidak memakai "use client" supaya konstanta string-nya bisa dipakai layout (server).
export const REVEAL_EVENT = "one-i:reveal";
export const INTRO_KEY = "one-i-intro";

// Dijalankan di <head> SETELAH skrip ganti bahasa: loading awal hanya tampil sekali per sesi
// dan tidak tampil saat halaman dibuka lewat tombol ganti bahasa. Kalau sessionStorage tidak
// bisa dipakai, loading dilewati.
export const introScript = `(function(){var d=document.documentElement;try{if(sessionStorage.getItem("${INTRO_KEY}")||d.hasAttribute("data-lang-switch"))d.setAttribute("data-intro","skip")}catch(e){d.setAttribute("data-intro","skip")}})()`;

// Tertutup = loading awal belum selesai (html belum punya data-intro) atau layar ganti bahasa aktif.
export function isPageCovered() {
  const html = document.documentElement;
  return !html.hasAttribute("data-intro") || html.hasAttribute("data-lang-switch");
}

/** Jalankan `callback` begitu halaman terlihat (langsung kalau sudah). Mengembalikan fungsi pembatal. */
export function onPageRevealed(callback: () => void) {
  if (!isPageCovered()) {
    callback();
    return () => {};
  }
  const check = () => {
    if (isPageCovered()) return;
    window.removeEventListener(REVEAL_EVENT, check);
    callback();
  };
  window.addEventListener(REVEAL_EVENT, check);
  return () => window.removeEventListener(REVEAL_EVENT, check);
}
