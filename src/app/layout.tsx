import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ScrollPalette } from "@/components/ScrollPalette";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ELEKTROINST | Elektroinstalace pro domy, firmy a prumysl",
  description:
    "Moderni elektroinstalace, fotovoltaika, revize a servis po cele Ceske republice.",
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
