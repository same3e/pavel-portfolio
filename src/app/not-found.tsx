import { headers } from "next/headers";
import Link from "next/link";
import { LetterSwapText } from "@/components/LetterSwapText";
import { Footer, Header } from "@/components/SiteChrome";
import { defaultLocale, dictionary, type Locale, withLocale } from "@/content/portfolio";

function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/ru" || pathname.startsWith("/ru/") ? "ru" : defaultLocale;
}

export default async function NotFound() {
  const requestHeaders = await headers();
  const locale = getLocaleFromPathname(requestHeaders.get("x-pathname") ?? "/");
  const copy = dictionary[locale];

  return (
    <>
      <Header locale={locale} />
      <main className="not-found section-grid" id="main-content">
        <div>
          <p>{copy.notFoundCode}</p>
          <h1>{copy.notFoundTitle}</h1>
          <Link className="text-cta" href={withLocale(locale, "/")}>
            <LetterSwapText label={copy.backHome} />
          </Link>
        </div>
      </main>
      <Footer locale={locale} showBackHome />
    </>
  );
}
