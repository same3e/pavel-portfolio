"use client";

import { useEffect, useMemo, useState } from "react";
import {
  contact,
  goals,
  industries,
  navigation,
  process,
  projectLinks,
  services,
  site
} from "@/content/portfolio";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}

function ContactLink({ label, href }: { label: string; href: string }) {
  const isPlaceholder = href.startsWith("REPLACE_WITH");
  const finalHref =
    label === "Email" && !isPlaceholder && !href.startsWith("mailto:")
      ? `mailto:${href}`
      : href;

  return (
    <a aria-disabled={isPlaceholder} className="contact-row" href={isPlaceholder ? "#" : finalHref}>
      <span>{label}</span>
      <span>{isPlaceholder ? "Add link" : "Open"}</span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGoal, setActiveGoal] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const currentGoal = goals[activeGoal];
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Pavel portfolio home">
          PAVEL
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="availability">
          <span aria-hidden="true" />
          {site.availability}
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <p>{site.availability}</p>
      </div>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy reveal">
            <p className="mono">INDEPENDENT WEB DESIGNER & DEVELOPER<br />TBILISI / WORLDWIDE</p>
            <h1>Websites that make service businesses easier to choose.</h1>
            <p className="hero-text">
              I design and develop clear, visually strong websites that help businesses present their services, build trust and receive enquiries.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">View selected work</a>
              <a className="button secondary" href="#contact">Start a project</a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="visual-top">
              <span>01</span>
              <span>Structure / Clarity / Launch</span>
            </div>
            <div className="visual-grid">
              <div className="visual-block tall">Service architecture</div>
              <div className="visual-block blue">Enquiry path</div>
              <div className="visual-block line">Visual direction</div>
              <div className="visual-block wide">Responsive interface</div>
            </div>
            <div className="visual-type">PV</div>
          </div>
        </section>

        <section className="statement reveal">
          <p>Your customers should not have to search through <span>dozens of posts</span> to understand what you offer.</p>
          <p>I bring services, projects, specialists and booking paths together in <span>one clear digital experience</span>.</p>
        </section>

        <section className="work section-grid" id="work">
          <div className="section-intro">
            <SectionLabel>01 / SELECTED WORK</SectionLabel>
            <h2>Thai Nari</h2>
            <p>A visual website concept created to translate the calm atmosphere of a Thai wellness studio into a refined digital experience and make its services easier to explore.</p>
          </div>
          <div className="project-meta">
            {["YEAR 2026", "ROLE DESIGN & DEVELOPMENT", "TYPE CONCEPT PROJECT", "PLATFORM RESPONSIVE WEB"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="project-stage">
            <div className="desktop-frame">
              <div className="frame-nav"><span /><span /><span /></div>
              <div className="thai-layout">
                <div className="thai-hero">Thai Nari</div>
                <div className="thai-copy">Concept Project · Design & Development</div>
                <div className="thai-service" />
                <div className="thai-service short" />
              </div>
            </div>
            <div className="phone-frame">
              <div />
              <span>Mobile menu</span>
            </div>
          </div>
          <div className="responsibilities">
            {["Art direction", "UI design", "Responsive development", "Motion design", "Service presentation", "Booking-focused navigation"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <a className="text-link" href={projectLinks.thaiNari === "REPLACE_WITH_THAI_NARI_LIVE_URL" ? "#" : projectLinks.thaiNari}>
            Visit live website
          </a>
        </section>

        <section className="approach section-grid">
          <SectionLabel>Project approach</SectionLabel>
          {[
            ["Atmosphere", "The visual language carries the feeling of the physical space into the digital experience."],
            ["Clarity", "Services and information are structured so visitors can quickly understand the offer."],
            ["Conversion", "Clear actions lead visitors from exploration to enquiry or booking."]
          ].map(([title, copy], index) => (
            <article className="approach-row" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </section>

        <section className="goal-selector section-grid" aria-labelledby="goal-title">
          <div>
            <SectionLabel>Interactive planning</SectionLabel>
            <h2 id="goal-title">What should your website help people do?</h2>
            <div className="goal-buttons" role="tablist" aria-label="Website goals">
              {goals.map((goal, index) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeGoal === index}
                  aria-controls="goal-panel"
                  className={activeGoal === index ? "is-active" : ""}
                  key={goal.title}
                  onClick={() => setActiveGoal(index)}
                >
                  {goal.title}
                </button>
              ))}
            </div>
          </div>
          <div className="goal-panel" id="goal-panel" role="tabpanel">
            <p>{currentGoal.description}</p>
            <div className="page-map">
              {currentGoal.structure.map((item, index) => (
                <span style={{ width: `${100 - index * 9}%` }} key={item}>{item}</span>
              ))}
            </div>
            <a className="button primary" href="#contact">{currentGoal.cta}</a>
          </div>
        </section>

        <section className="services section-grid" id="services">
          <div className="section-intro">
            <SectionLabel>02 / SERVICES</SectionLabel>
            <h2>From first direction to final launch.</h2>
          </div>
          <div className="service-list">
            {services.map((service, index) => (
              <article className="service-row" key={service.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="industries section-grid">
          <div>
            <SectionLabel>Selected fields</SectionLabel>
            <h2>Selected fields I work with</h2>
          </div>
          <div className="industry-list">
            {industries.map(([title, copy], index) => (
              <button
                type="button"
                className={activeIndustry === index ? "is-active" : ""}
                key={title}
                onClick={() => setActiveIndustry(index)}
                onFocus={() => setActiveIndustry(index)}
              >
                <span>{title}</span>
                <small>{copy}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="process section-grid" id="process">
          <div className="section-intro">
            <SectionLabel>03 / PROCESS</SectionLabel>
            <h2>A clear process, without unnecessary complexity.</h2>
          </div>
          <div className="process-steps">
            {process.map(([title, copy], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about section-grid" id="about">
          <SectionLabel>04 / ABOUT</SectionLabel>
          <div className="about-copy">
            <h2>Independent by structure. Collaborative by process.</h2>
            <p>I&apos;m Pavel, an independent web designer and developer based in Tbilisi. I create clear, visually strong websites for service businesses and handle the complete path from visual direction to development and launch.</p>
            <p>I use modern development tools and AI-assisted workflows to move quickly, while keeping the final decisions, testing and quality control human-led.</p>
          </div>
          <div className="about-mark" aria-hidden="true">PAVEL / DESIGN & DEVELOPMENT</div>
          <div className="about-meta">
            {["Based in Tbilisi", "Working worldwide", "RU / EN", site.availability].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className="contact section-grid" id="contact">
          <div>
            <h2>Have a business that deserves a better website?</h2>
            <p>Tell me what you offer, what is currently missing and what you want the website to achieve.</p>
          </div>
          <div className="contact-list">
            <ContactLink label="Instagram" href={contact.instagram} />
            <ContactLink label="Telegram" href={contact.telegram} />
            <ContactLink label="WhatsApp" href={contact.whatsapp} />
            <ContactLink label="Email" href={contact.email} />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Pavel - Independent Web Designer & Developer</p>
        <p>{site.location}</p>
        <p>Portfolio design and development by Pavel - {year}</p>
        <a href="#top">Back to top</a>
      </footer>
    </>
  );
}
