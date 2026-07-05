import Image from "next/image";
import { AdvantageRows } from "@/components/AdvantageRows";
import { ContactLinks, Footer, Header } from "@/components/SiteChrome";
import { HeroPortrait } from "@/components/HeroPortrait";
import { LetterSwapText } from "@/components/LetterSwapText";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { SelectedWork } from "@/components/SelectedWork";
import { SplitRevealText } from "@/components/SplitRevealText";
import {
  aboutCopy,
  contact,
  dictionary,
  getHomepageServices,
  getSite,
  hero,
  type Locale
} from "@/content/portfolio";

const serviceImages = [
  { src: "/webdesign.png", alt: "", width: 520, height: 520 },
  { src: "/cube.png", alt: "", width: 520, height: 520 },
  { src: "/intagrayion.png", alt: "", width: 520, height: 520 },
  { src: "/automation.png", alt: "", width: 520, height: 520 }
] as const;

export function HomePage({ locale }: { locale: Locale }) {
  const copy = dictionary[locale];
  const currentSite = getSite(locale);
  const serviceCards = getHomepageServices(locale).map((service, index) => ({
    ...service,
    image: serviceImages[index]!
  }));

  return (
    <>
      <Header locale={locale} />
      <main id="main-content">
        <section className="hero home-hero section-grid">
          <div className="hero-id">
            <p>
              <span>{copy.heroName}</span>
            </p>
            <span>{copy.heroRole}</span>
            <span>{currentSite.location}</span>
          </div>

          <SplitRevealText as="h1" className="masked-title" ariaLabel={hero.aria[locale]} lines={hero.lines[locale]} mode="load" />

          <HeroPortrait locale={locale} />

          <div className="hero-subtitle">
            <p>{hero.subtitle[locale]}</p>
          </div>

          <div className="hero-actions">
            <a className="text-cta hero-cta" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
              <LetterSwapText label={copy.heroCta} />
            </a>
          </div>
        </section>

        <SelectedWork locale={locale} />

        <MarqueeStrip locale={locale} />

        <section className="services service-section section-grid" id="services">
          <div className="service-intro">
            <SplitRevealText
              as="h2"
              className="service-statement"
              ariaLabel={copy.serviceStatementAria}
              lines={copy.serviceStatementLines}
              mode="scroll"
            />
          </div>
          <span className="service-block-label">{copy.serviceBlockLabel}</span>
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
          <SplitRevealText as="p" className="about-statement" ariaLabel={aboutCopy[locale]} text={aboutCopy[locale]} mode="scroll" />
          <div className="about-meta-list">
            {copy.aboutMeta.map((item) => (
              <span key={item}>{item}</span>
            ))}
            <span>{currentSite.availability}</span>
          </div>
        </section>

        <section className="advantages-section" aria-label={locale === "en" ? "Working advantages" : "Преимущества работы"}>
          <AdvantageRows locale={locale} />
        </section>

        <section className="contact section-grid" id="contact">
          <div>
            <SplitRevealText as="h2" ariaLabel={copy.contactHeadingAria} lines={copy.contactHeadingLines} mode="scroll" />
            <p>{copy.contactLead}</p>
            <a className="text-cta contact-cta" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
              <LetterSwapText label={copy.contactCta} />
            </a>
          </div>
          <ContactLinks locale={locale} />
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
