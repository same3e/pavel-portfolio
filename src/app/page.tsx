import Image from "next/image";
import { ContactLinks, Footer, Header } from "@/components/SiteChrome";
import { LetterSwapText } from "@/components/LetterSwapText";
import { SelectedWork } from "@/components/SelectedWork";
import { SplitRevealText } from "@/components/SplitRevealText";
import { aboutCopy, contact, hero, homepageServices, site } from "@/content/portfolio";

const serviceImages = [
  { src: "/webdesign.png", alt: "", width: 520, height: 520 },
  { src: "/cube.png", alt: "", width: 520, height: 520 },
  { src: "/intagrayion.png", alt: "", width: 520, height: 520 },
  { src: "/automation.png", alt: "", width: 520, height: 520 }
] as const;

const serviceCards = homepageServices.map((service, index) => ({
  ...service,
  image: serviceImages[index]!
}));

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

          <div className="hero-portrait-scene">
            <div className="hero-portrait-light" aria-hidden="true" />
            <div className="hero-portrait-object">
              <Image
                src="/hero.png"
                alt="3D pixel portrait"
                fill
                priority
                quality={100}
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 55vw, 680px"
              />
            </div>
          </div>

          <div className="hero-subtitle">
            <p>{hero.subtitle}</p>
          </div>

          <div className="hero-actions">
            <a className="text-cta hero-cta" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
              <LetterSwapText label="START A PROJECT" />
            </a>
          </div>
        </section>

        <SelectedWork />

        <section className="services service-section section-grid" id="services">
          <div className="service-intro">
            <SplitRevealText
              as="h2"
              className="service-statement"
              ariaLabel="Every project starts as a business problem, not a template — website, booking flow or a small automation that saves you hours each week."
              lines={[
                "Every project starts as a business problem, not a template —",
                "website, booking flow or a small automation that saves you hours each week."
              ]}
              mode="scroll"
            />
          </div>
          <div className="service-list">
            {serviceCards.map((service) => (
              <article className="service-row" key={service.title}>
                <div className="service-visual" aria-hidden="true">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    width={service.image.width}
                    height={service.image.height}
                    sizes="(max-width: 680px) 70vw, (max-width: 1024px) 34vw, 18vw"
                  />
                </div>
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
            <SplitRevealText
              as="h2"
              ariaLabel="LET'S MAKE SOMETHING MEMORABLE."
              lines={["LET'S MAKE", "SOMETHING", "MEMORABLE"]}
              mode="scroll"
            />
            <p>Have a project or business that needs a stronger digital presence?</p>
            <a className="text-cta contact-cta" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
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
