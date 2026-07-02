import { ContactLinks, Footer, Header } from "@/components/SiteChrome";
import { SelectedWork } from "@/components/SelectedWork";
import { aboutCopy, contact, hero, homepageServices, site } from "@/content/portfolio";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="hero home-hero section-grid">
          <div className="hero-id">
            <p>
              <span>PAVEL KOSTIN</span>
            </p>
            <span>INDEPENDENT WEB DESIGNER & DEVELOPER</span>
            <span>{site.location}</span>
          </div>

          <h1 className="masked-title word-reveal" aria-label={hero.aria}>
            {hero.lines.map((line, lineIndex) => (
              <span key={line}>
                {line.split(" ").map((word, index, words) => (
                  <span className="word-wrap" key={`${line}-${word}-${index}`}>
                    <i className="word" style={{ animationDelay: `${index * 52 + lineIndex * 70}ms` }}>
                      {word}
                    </i>
                    {index < words.length - 1 ? " " : ""}
                  </span>
                ))}
                {lineIndex < hero.lines.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          <div className="hero-subtitle">
            <p>{hero.subtitle}</p>
          </div>

          <div className="hero-actions">
            <a className="button primary" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
              <span>START A PROJECT</span>
            </a>
            <a className="button" href="#work">
              <span>VIEW MY WORK</span>
            </a>
          </div>
        </section>

        <SelectedWork />

        <section className="services compact-services section-grid" id="services">
          <div>
            <h2 className="reveal-heading">
              <span>Design build launch</span>
            </h2>
          </div>
          <div className="service-list">
            {homepageServices.map((service, index) => (
              <article className="service-row" key={service.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about minimal-about section-grid" id="about">
          <p className="about-statement word-reveal" aria-label={aboutCopy}>
            {aboutCopy.split(" ").map((word, index) => (
              <span className="word-wrap" key={`${word}-${index}`}>
                <i className="word" style={{ animationDelay: `${index * 42}ms` }}>
                  {word}
                </i>
                {index < aboutCopy.split(" ").length - 1 ? " " : ""}
              </span>
            ))}
          </p>
          <div className="about-meta-list">
            <span>Based in Tbilisi</span>
            <span>Working worldwide</span>
            <span>RU / EN</span>
            <span>{site.availability}</span>
          </div>
        </section>

        <section className="contact section-grid" id="contact">
          <div>
            <h2 className="reveal-heading" aria-label="LET'S MAKE SOMETHING MEMORABLE.">
              <span>LET&apos;S MAKE</span>
              <span>SOMETHING</span>
              <span>MEMORABLE</span>
            </h2>
            <p>Have a project or business that needs a stronger digital presence?</p>
            <a className="button primary contact-cta" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
              <span>START A PROJECT</span>
            </a>
          </div>
          <ContactLinks />
        </section>
      </main>
      <Footer />
    </>
  );
}
