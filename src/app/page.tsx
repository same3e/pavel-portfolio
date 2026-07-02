import { ContactLinks, Footer, Header } from "@/components/SiteChrome";
import { LetterSwapText } from "@/components/LetterSwapText";
import { SelectedWork } from "@/components/SelectedWork";
import { SplitRevealText } from "@/components/SplitRevealText";
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

          <SplitRevealText as="h1" className="masked-title" ariaLabel={hero.aria} lines={hero.lines} mode="load" />

          <div className="hero-subtitle">
            <p>{hero.subtitle}</p>
          </div>

          <div className="hero-actions">
            <a className="button primary" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
              <LetterSwapText label="START A PROJECT" />
            </a>
            <a className="button" href="#work">
              <LetterSwapText label="VIEW MY WORK" />
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
          <SplitRevealText as="p" className="about-statement" ariaLabel={aboutCopy} text={aboutCopy} mode="scroll" />
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
              <LetterSwapText label="START A PROJECT" />
            </a>
          </div>
          <ContactLinks />
        </section>
      </main>
      <Footer />
    </>
  );
}
