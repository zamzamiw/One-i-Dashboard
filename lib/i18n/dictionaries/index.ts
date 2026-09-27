import type { Locale } from "@/lib/i18n/config";
import { en } from "./en";
import { id } from "./id";

// Kamus hanya dipakai di Server Component; komponen client menerima potongan kamusnya
// lewat props, jadi teks kedua bahasa tidak ikut terkirim ke browser.
export type Dictionary = typeof id;

const dictionaries: Record<Locale, Dictionary> = { id, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
