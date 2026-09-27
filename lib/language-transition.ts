// Konstanta layar transisi ganti bahasa, dipakai bersama oleh components/language-transition.tsx
// (client) dan app/[lang]/layout.tsx (server). Tidak boleh berada di file "use client":
// nilai non-komponen dari file client tidak bisa dibaca Server Component.
export const LANGUAGE_SWITCH_EVENT = "one-i:language-switch";
export const LANGUAGE_SWITCH_KEY = "one-i-lang-switch";

// Dijalankan di <head> sebelum halaman pertama kali digambar: kalau halaman ini dibuka lewat
// tombol ganti bahasa (penanda di sessionStorage, maksimal 10 detik), layar biru langsung
// menutupi halaman sehingga tidak ada kedipan sebelum animasi keluar diputar.
export const languageTransitionScript = `(function(){try{var t=sessionStorage.getItem("${LANGUAGE_SWITCH_KEY}");sessionStorage.removeItem("${LANGUAGE_SWITCH_KEY}");if(t&&Date.now()-Number(t)<10000)document.documentElement.setAttribute("data-lang-switch","")}catch(e){}})()`;
