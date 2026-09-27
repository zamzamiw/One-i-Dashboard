import type { Metadata } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import { CursorCrosshair } from "@/components/cursor-crosshair";
import { defaultLocale, hasLocale, localeHref, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// Menu navbar (huruf kapital ala terminal). Satu ketebalan saja supaya file font tetap kecil.
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: "400",
  subsets: ["latin"],
});

// Hanya /id dan /en yang dibuat (statis); nilai lain langsung 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const t = getDictionary(locale).meta;
  const title = `${site.name} — ${t.title}`;

  return {
    metadataBase: new URL(site.url),
    title,
    description: t.description,
    alternates: {
      canonical: localeHref(locale),
      languages: { ...Object.fromEntries(locales.map((l) => [l, localeHref(l)])), "x-default": localeHref(defaultLocale) },
    },
    openGraph: {
      title,
      description: t.description,
      siteName: site.name,
      locale: t.ogLocale,
      type: "website",
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  return (
    <html
      lang={hasLocale(lang) ? lang : defaultLocale}
      className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body>
        {children}
        <CursorCrosshair />
      </body>
    </html>
  );
}
