"use client";

import Image from "next/image";
import { ContactLinks, Footer, Header } from "@/components/SiteChrome";
import { useMotionShell } from "@/components/MotionShell";
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
              Live website {"\u2197"}
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
            <p>
              The page system uses large editorial type, controlled spacing and clear visual contrast so the project can be understood quickly.
            </p>
          </article>
          <article>
            <span>Typography</span>
            <p>
              Oversized display moments are balanced with precise metadata, making the experience feel visual without losing structure.
            </p>
          </article>
          <article>
            <span>Motion</span>
            <p>
              Masked reveals, directional media movement and route transitions create rhythm while keeping the interface responsive.
            </p>
          </article>
        </section>

        <section className="case-solution section-grid">
          <div>
            <span>Context</span>
            <p>{project.overview}</p>
          </div>
          <div>
            <span>Direction</span>
            <p>
              A focused visual identity, responsive interface and motion system designed to make the work itself carry the story.
            </p>
          </div>
        </section>

        <section className="case-cta section-grid">
          <h2>{project.title}</h2>
          <a className="button primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <span>Visit live project</span>
          </a>
          <a className="next-project-link" href={nextProject.route} onClick={openNext}>
            Next project<br />
            <span>{nextProject.title}</span>
          </a>
        </section>

        <section className="contact section-grid">
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
      <Footer showBackHome />
    </>
  );
}
