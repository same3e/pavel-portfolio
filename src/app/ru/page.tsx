import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { getAlternateLanguages, getSite } from "@/content/portfolio";

const locale = "ru";
const currentSite = getSite(locale);

export const metadata: Metadata = {
  title: {
    absolute: currentSite.title
  },
  description: currentSite.description,
  alternates: {
    canonical: "/ru",
    languages: getAlternateLanguages("/")
  },
  openGraph: {
    title: currentSite.title,
    description: currentSite.description,
    url: "/ru",
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["en_US"],
    images: [{ url: "/ru/opengraph-image", width: 1200, height: 630, alt: `${currentSite.name} портфолио` }]
  },
  twitter: {
    card: "summary_large_image",
    title: currentSite.title,
    description: currentSite.description,
    images: ["/ru/opengraph-image"]
  }
};

export default function RussianHome() {
  return <HomePage locale={locale} />;
}
