import type { Metadata } from "next";
import { Geist } from "next/font/google";
// Dark theme  → ScrollPalette (kept, swap back if needed)
// Light theme → ScrollPaletteLight (active)
import { ScrollPaletteLight as ScrollPalette } from "@/components/ScrollPaletteLight";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elektroinstgroup.cz"),
  title: "ELEKTROINST | Elektroinstalace pro domy, firmy a prumysl",
  description:
    "Moderni elektroinstalace, fotovoltaika, revize a servis po cele Ceske republice.",
  icons: {
    icon: [
      { url: "/logo.jpg", type: "image/jpeg" },
    ],
    shortcut: ["/logo.jpg"],
    apple: ["/logo.jpg"],
  },
  openGraph: {
    title: "ELEKTROINSTGROUP S.R.O.",
    description:
      "Moderni elektroinstalace, fotovoltaika, revize a servis po cele Ceske republice.",
    url: "https://elektroinstgroup.cz",
    siteName: "ELEKTROINSTGROUP S.R.O.",
    images: [
      { url: "/logo.jpg", width: 512, height: 512, alt: "ELEKTROINSTGROUP S.R.O. logo" },
    ],
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ELEKTROINSTGROUP S.R.O.",
    description:
      "Moderni elektroinstalace, fotovoltaika, revize a servis po cele Ceske republice.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${geistSans.variable} antialiased`}>
        <ScrollPalette />
        {children}
      </body>
    </html>
  );
}
