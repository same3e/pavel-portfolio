"use client";

import Image from "next/image";
import { LetterSwapText } from "@/components/LetterSwapText";
import { ContactLinks, Footer, Header } from "@/components/SiteChrome";
import { useMotionShell } from "@/components/MotionShell";
import { SplitRevealText } from "@/components/SplitRevealText";
import { contact, Project, projects } from "@/content/portfolio";

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
}

export function ProjectCase({ project }: { project: Project }) {
  const { openProject } = useMotionShell();
  const currentIndex = projects.findIndex((item) => item.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const desktopImage = project.desktopImage ?? project.previewImage;

  function openNext(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    openProject(nextProject.title, nextProject.route);
  }

  return (
    <>
      <Header />
      <main className="case-page" id="main-content">
        <section className="case-hero section-grid">
          <h1 className="masked-title case-title">
            <span><i>{project.title}</i></span>
          </h1>
          <p>{project.description}</p>
          <div className="case-meta">
            <MetaItem label="Role" value={project.role} />
            <MetaItem label="Year" value={project.year} />
            <MetaItem label="Type" value={project.type} />
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <LetterSwapText label="Live website ↗" />
            </a>
          </div>
        </section>

        <section
          className={`case-media section-grid ${project.mobileImage ? "has-mobile" : "single-media"}`}
          aria-label={`${project.title} website previews`}
        >
          <div className="case-desktop preview-media">
            <div className="case-image-frame">
              <Image
                src={desktopImage}
                alt={project.alt}
                width={1600}
                height={1050}
                sizes="(max-width: 900px) 100vw, 72vw"
                priority
              />
            </div>
          </div>
          {project.mobileImage ? (
            <div className="case-phone">
              <span>Mobile interface</span>
              <div>
                <Image
                  src={project.mobileImage}
                  alt=""
                  width={720}
                  height={1280}
                  sizes="(max-width: 900px) 80vw, 22vw"
                />
              </div>
            </div>
          ) : null}
        </section>

        <section className="case-details section-grid">
          <article>
            <span>Visual system</span>
            <p>{project.visualSystem}</p>
          </article>
          <article>
            <span>Typography</span>
            <p>{project.typography}</p>
          </article>
          <article>
            <span>Motion</span>
            <p>{project.motion}</p>
          </article>
        </section>

        <section className="case-solution section-grid">
          <div>
            <span>Context</span>
            <SplitRevealText as="p" ariaLabel={project.context} text={project.context} mode="scroll" />
          </div>
          <div>
            <span>Direction</span>
            <SplitRevealText as="p" ariaLabel={project.direction} text={project.direction} mode="scroll" />
          </div>
        </section>

        <section className="case-cta section-grid">
          <h2>{project.title}</h2>
          <a className="text-cta case-live-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <LetterSwapText label="Visit live project" />
          </a>
        </section>

        <a className="next-project-teaser" href={nextProject.route} onClick={openNext}>
          <span className="next-project-label">Next project</span>
          <h2>{nextProject.title}</h2>
        </a>

        <section className="contact section-grid">
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
      <Footer showBackHome />
    </>
  );
}
