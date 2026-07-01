"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContactLinks, Footer, Header } from "@/components/SiteChrome";
import { homepageServices, project, site } from "@/content/portfolio";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}

function IntroOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const completed = sessionStorage.getItem("pavel-intro-complete") === "true";

    if (reduceMotion || completed) {
      sessionStorage.setItem("pavel-intro-complete", "true");
      return;
    }

    setVisible(true);
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("pavel-intro-complete", "true");
      setVisible(false);
    }, 1700);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  function skipIntro() {
    sessionStorage.setItem("pavel-intro-complete", "true");
    setVisible(false);
  }

  return (
    <div className="intro-overlay" role="dialog" aria-label="Pavel intro animation">
      <button type="button" onClick={skipIntro}>
        Skip
      </button>
      <div className="intro-word" aria-label="PAVEL">
        {"PAVEL".split("").map((letter, index) => (
          <span style={{ animationDelay: `${index * 70}ms` }} key={letter}>
            <i>{letter}</i>
          </span>
        ))}
      </div>
      <p>DESIGN & DEVELOPMENT / TBILISI</p>
      <div className="intro-line">
        <span />
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [transitioning, setTransitioning] = useState(false);

  function openProject(event: React.MouseEvent<HTMLAnchorElement>) {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      return;
    }

    event.preventDefault();
    setTransitioning(true);
    window.setTimeout(() => router.push(project.route), 680);
  }

  return (
    <>
      <IntroOverlay />
      <Header />
      <main id="top">
        <section className="hero home-hero section-grid">
          <div className="hero-id">
            <p>Pavel Kostin</p>
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
            <a href="#work">Selected work ↓</a>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <span />
            <p>PV</p>
          </div>
        </section>

        <section className="work work-preview section-grid" id="work">
          <div className="work-heading">
            <SectionLabel>01 / SELECTED WORK</SectionLabel>
            <h2>Selected work</h2>
          </div>

          <a className="project-preview" href={project.route} onClick={openProject}>
            <div className="project-preview-copy">
              <p>{project.title}</p>
              <span>{project.category}</span>
              <span>{project.service}</span>
              <span>{project.status}</span>
              <strong>View case ↗</strong>
            </div>
            <div className="preview-media">
              <div className="preview-screen">
                <div className="thai-cover">
                  <span>Thai Nari</span>
                  <i>Calm wellness interface</i>
                </div>
                <div className="thai-side">
                  <span>Services</span>
                  <span>Rituals</span>
                  <span>Booking</span>
                </div>
              </div>
            </div>
          </a>
        </section>

        <section className="services compact-services section-grid" id="services">
          <div>
            <SectionLabel>02 / SERVICES</SectionLabel>
            <h2>Design, build, launch.</h2>
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
          <SectionLabel>03 / ABOUT</SectionLabel>
          <p>
            Independent web designer and developer based in Tbilisi, creating visually strong websites from first direction to final launch.
          </p>
          <div>
            <span>RU / EN</span>
            <span>Working worldwide</span>
          </div>
        </section>

        <section className="contact section-grid" id="contact">
          <div>
            <h2>Let&apos;s make something worth remembering.</h2>
            <p>Have a project or business that needs a stronger digital presence?</p>
            <a className="button contact-cta" href="mailto:REPLACE_WITH_EMAIL">Start a project</a>
          </div>
          <ContactLinks />
        </section>
      </main>
      <Footer />

      <div className={`route-transition ${transitioning ? "is-active" : ""}`} aria-hidden="true">
        <p>THAI NARI</p>
      </div>
    </>
  );
}
