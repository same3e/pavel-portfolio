import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/content/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  robots: { index: true, follow: true },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#F2F0EA",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
