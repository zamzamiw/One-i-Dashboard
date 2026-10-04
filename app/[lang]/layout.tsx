import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Mono } from "next/font/google";
import { IntroLoader } from "@/components/intro-loader";
import { LanguageTransition } from "@/components/language-transition";
import { defaultLocale, hasLocale, localeHref, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { languageTransitionScript } from "@/lib/language-transition";
import { introScript } from "@/lib/page-reveal";
import { site } from "@/lib/site";
import "../globals.css";

// Judul dan teks: satu font variabel (gaya minimalis tebal, referensi Indisea dari pemilik
// project), menggantikan Space Grotesk + Inter dari PRD.
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
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
  const locale = hasLocale(lang) ? lang : defaultLocale;
  // suppressHydrationWarning: skrip di <head> bisa memasang data-lang-switch / data-intro pada
  // <html> sebelum hidrasi (layar ganti bahasa dan loading awal).
  return (
    <html
      lang={locale}
      className={`${plexSans.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageTransitionScript }} />
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        {children}
        <LanguageTransition status={getDictionary(locale).languageTransition.status} />
        <IntroLoader />
      </body>
    </html>
  );
}
