"use client";

import { useState } from "react";
import { ContactLinks, Footer, Header } from "@/components/SiteChrome";
import { SelectedWork } from "@/components/SelectedWork";
import { homepageServices, site } from "@/content/portfolio";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}

export default function Home() {
  const [activeService, setActiveService] = useState(0);

  return (
    <>
      <Header />
      <main id="top">
        <section className="hero home-hero section-grid">
          <div className="hero-id">
            <p><span>Pavel Kostin</span></p>
            <span>Independent web designer & developer</span>
            <span>{site.location}</span>
          </div>
          <h1 className="masked-title" aria-label="I design and build digital experiences for modern businesses.">
            <span><i>I design and build</i></span>
            <span><i>digital experiences</i></span>
            <span><i>for modern businesses.</i></span>
          </h1>
          <div className="hero-meta">
            <a href="#contact">{site.availability}</a>
            <a className="work-indicator" href="#work">Selected work ↓</a>
          </div>
          <div className="hero-mark pk-mark" aria-hidden="true">
            <span className="pk-line" />
            <div>
              <b>P</b>
              <b>K</b>
            </div>
          </div>
        </section>

        <SelectedWork />

        <section className="services compact-services section-grid" id="services">
          <div>
            <SectionLabel>02 / Services</SectionLabel>
            <h2 className="reveal-heading"><span>Design, build, launch.</span></h2>
          </div>
          <div className="service-list">
            {homepageServices.map((service, index) => (
              <button
                className={`service-row ${activeService === index ? "is-active" : ""}`}
                type="button"
                key={service.title}
                onClick={() => setActiveService(index)}
                onFocus={() => setActiveService(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
        </section>

        <section className="about minimal-about section-grid" id="about">
          <div className="about-background" aria-hidden="true">
            <span>PAVEL</span>
            <span>KOSTIN</span>
          </div>
          <SectionLabel>03 / About</SectionLabel>
          <p>
            Independent web designer and developer based in Tbilisi, creating visually strong websites from first direction to final launch.
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
            <h2 className="reveal-heading">
              <span>LET&apos;S MAKE</span>
              <span>SOMETHING</span>
              <span>MEMORABLE.</span>
            </h2>
            <p>Have a project or business that needs a stronger digital presence?</p>
            <a className="button contact-cta" href="mailto:kostinpavel447@gmail.com">Start a project</a>
          </div>
          <ContactLinks />
        </section>
      </main>
      <Footer />
    </>
  );
}
