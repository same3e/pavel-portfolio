import Link from "next/link";
import { LetterSwapText } from "@/components/LetterSwapText";
import { Footer, Header } from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="not-found section-grid" id="main-content">
        <div>
          <p>404</p>
          <h1>Page not found</h1>
          <Link className="text-cta" href="/">
            <LetterSwapText label="Back home" />
          </Link>
        </div>
      </main>
      <Footer showBackHome />
    </>
  );
}
