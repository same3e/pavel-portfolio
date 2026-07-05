import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter_Tight, Pixelify_Sans } from "next/font/google";
import { MotionShell } from "@/components/MotionShell";
import { site } from "@/content/portfolio";
import "./globals.css";

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(site.productionUrl),
  title: {
    default: site.title,
    template: "%s | Pavel Kostin"
  },
  description: site.description,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon", type: "image/png" }
    ],
    shortcut: "/favicon.ico"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
    siteName: site.name,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} portfolio` }]
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: site.name,
    images: ["/opengraph-image"]
  }
};

export const viewport: Viewport = {
  themeColor: "#11110f",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pixelifySans.variable} ${interTight.variable} ${ibmPlexMono.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <MotionShell>{children}</MotionShell>
      </body>
    </html>
  );
}
