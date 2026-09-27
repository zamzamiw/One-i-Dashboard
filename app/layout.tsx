import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { CursorCrosshair } from "@/components/cursor-crosshair";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const title = `${site.name} — ${site.title}`;

export const metadata: Metadata = {
  title,
  description: site.description,
  openGraph: {
    title,
    description: site.description,
    siteName: site.name,
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        {children}
        <CursorCrosshair />
      </body>
    </html>
  );
}
