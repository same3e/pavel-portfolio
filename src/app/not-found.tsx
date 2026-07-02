import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="not-found section-grid" id="main-content">
        <div>
          <p>404</p>
          <h1>Page not found</h1>
          <Link className="button primary" href="/">
            <span>Back home</span>
          </Link>
        </div>
      </main>
      <Footer showBackHome />
    </>
  );
}

