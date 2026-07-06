import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { IBM_Plex_Mono, Inter_Tight, Montserrat } from "next/font/google";
import { MotionShell } from "@/components/MotionShell";
import { defaultLocale, dictionary, getSite, type Locale } from "@/content/portfolio";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
  metadataBase: new URL(getSite(defaultLocale).productionUrl),
  title: {
    default: getSite(defaultLocale).title,
    template: "%s | Pavel Kostin"
  },
  description: getSite(defaultLocale).description,
  authors: [{ name: getSite(defaultLocale).name }],
  creator: getSite(defaultLocale).name,
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
    title: getSite(defaultLocale).title,
    description: getSite(defaultLocale).description,
    url: "/",
    siteName: getSite(defaultLocale).name,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${getSite(defaultLocale).name} portfolio` }]
  },
  twitter: {
    card: "summary_large_image",
    title: getSite(defaultLocale).title,
    description: getSite(defaultLocale).description,
    creator: getSite(defaultLocale).name,
    images: ["/opengraph-image"]
  }
};

export const viewport: Viewport = {
  themeColor: "#11110f",
  width: "device-width",
  initialScale: 1
};

function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/ru" || pathname.startsWith("/ru/") ? "ru" : defaultLocale;
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale = getLocaleFromPathname(requestHeaders.get("x-pathname") ?? "/");

  return (
    <html lang={dictionary[locale].htmlLang}>
      <body className={`${montserrat.variable} ${interTight.variable} ${ibmPlexMono.variable}`}>
        <a className="skip-link" href="#main-content">
          {dictionary[locale].skipLink}
        </a>
        <MotionShell>{children}</MotionShell>
      </body>
    </html>
  );
}
