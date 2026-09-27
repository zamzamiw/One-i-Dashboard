// Bahasa situs (keputusan pemilik project): Indonesia di "/" (default, tanpa awalan),
// Inggris di "/en". Rute fisiknya app/[lang]; "/" di-rewrite ke "/id" dan "/id" dialihkan
// ke "/" (next.config.ts). Tanpa deteksi bahasa browser: banyak pengunjung Indonesia
// memakai browser berbahasa Inggris, jadi mereka tetap mendapat versi Indonesia.
// File ini aman diimpor komponen client (tidak memuat kamus).
export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "id";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const localeHref = (locale: Locale) => (locale === defaultLocale ? "/" : `/${locale}`);

export const localeNames: Record<Locale, { short: string; full: string }> = {
  id: { short: "ID", full: "Bahasa Indonesia" },
  en: { short: "EN", full: "English" },
};
