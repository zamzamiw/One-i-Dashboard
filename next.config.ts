import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bahasa Indonesia tanpa awalan: "/" dilayani oleh rute app/[lang] dengan lang = "id",
  // dan alamat "/id" dialihkan ke "/" supaya tidak ada dua URL untuk halaman yang sama.
  // Bahasa Inggris tetap di "/en". Lihat lib/i18n/config.ts.
  async redirects() {
    return [{ source: "/id", destination: "/", permanent: true }];
  },
  async rewrites() {
    return [{ source: "/", destination: "/id" }];
  },
};

export default nextConfig;
