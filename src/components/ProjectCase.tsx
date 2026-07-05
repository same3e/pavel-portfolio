"use client";

import Image from "next/image";
import { LetterSwapText } from "@/components/LetterSwapText";
import { ContactLinks, Footer, Header } from "@/components/SiteChrome";
import { useMotionShell } from "@/components/MotionShell";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { SplitRevealText } from "@/components/SplitRevealText";
import { contact, dictionary, getProjects, type Locale, type Project } from "@/content/portfolio";

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
}

function CaseDetails({ project, locale }: { project: Project; locale: Locale }) {
  const copy = dictionary[locale];

  return (
    <section className="case-details section-grid">
      <article>
        <span>{copy.visualSystem}</span>
        <p>{project.visualSystem}</p>
      </article>
      <article>
        <span>{copy.typography}</span>
        <p>{project.typography}</p>
      </article>
      <article>
        <span>{copy.motion}</span>
        <p>{project.motion}</p>
      </article>
    </section>
  );
}

function CaseSolution({ project, locale }: { project: Project; locale: Locale }) {
  const copy = dictionary[locale];

  return (
    <section className="case-solution section-grid">
      <div>
        <span>{copy.context}</span>
        <SplitRevealText as="p" ariaLabel={project.context} text={project.context} mode="scroll" />
      </div>
      <div>
        <span>{copy.direction}</span>
        <SplitRevealText as="p" ariaLabel={project.direction} text={project.direction} mode="scroll" />
      </div>
    </section>
  );
}

export function ProjectCase({ project, locale }: { project: Project; locale: Locale }) {
  const { openProject } = useMotionShell();
  const copy = dictionary[locale];
  const projects = getProjects(locale);
  const currentIndex = projects.findIndex((item) => item.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const desktopImage = project.desktopImage ?? project.previewImage;
  const hasShowcase = Boolean(project.desktopShowcase || project.mobileShowcase);

  function openNext(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    openProject(nextProject.title, nextProject.route);
  }

  return (
    <>
      <Header locale={locale} />
      <main className="case-page" id="main-content">
        <section className="case-hero section-grid">
          <h1 className="masked-title case-title">
            <span><i>{project.title}</i></span>
          </h1>
          <p>{project.description}</p>
          <a
            className="case-live-mobile text-cta"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.liveWebsiteAria}
          >
            <LetterSwapText label={`${copy.liveWebsite} ↗`} />
          </a>
          <div className="case-meta">
            <MetaItem label={copy.role} value={project.role} />
            <MetaItem label={copy.year} value={project.year} />
            <MetaItem label={copy.type} value={project.type} />
            <a
              className="case-live-meta"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.liveWebsiteAria}
            >
              <LetterSwapText label={`${copy.liveWebsite} ↗`} />
            </a>
          </div>
        </section>

        <section
          className={`case-media case-preview-media section-grid ${project.mobileImage ? "has-mobile" : "single-media"}`}
          aria-label={locale === "en" ? `${project.title} website previews` : `Превью сайта ${project.title}`}
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
              <span>{copy.mobileInterface}</span>
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

        {hasShowcase ? (
          <>
            <CaseSolution project={project} locale={locale} />

            {project.desktopShowcase ? (
              <ProjectShowcase
                showcase={project.desktopShowcase}
                variant="desktop"
                hideHeader
                hideCaptions
                interludeAfterIndex={1}
                interludeText={project.mobileShowcase?.description}
                locale={locale}
              />
            ) : null}

            {project.mobileShowcase ? (
              <>
                <p className="project-showcase__statement project-showcase__statement--before-mobile">
                  {project.mobileShowcase.title}
                </p>
                <ProjectShowcase showcase={project.mobileShowcase} variant="mobile" hideHeader hideCaptions locale={locale} />
              </>
            ) : null}

            <CaseDetails project={project} locale={locale} />
          </>
        ) : (
          <>
            <CaseDetails project={project} locale={locale} />
            <CaseSolution project={project} locale={locale} />
          </>
        )}

        <section className="case-cta section-grid">
          <h2>{project.title}</h2>
          <a className="text-cta case-live-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <LetterSwapText label={copy.visitLiveProject} />
          </a>
        </section>

        <a className="next-project-teaser" href={nextProject.route} onClick={openNext}>
          <span className="next-project-label">
            <LetterSwapText label={copy.nextProject} />
          </span>
          <h2>{nextProject.title}</h2>
        </a>

        <section className="contact section-grid">
          <div>
            <SplitRevealText
              as="h2"
              ariaLabel={copy.contactHeadingAria}
              lines={copy.contactHeadingLines}
              mode="scroll"
            />
            <p>{copy.contactLead}</p>
            <a className="text-cta contact-cta" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
              <LetterSwapText label={copy.contactCta} />
            </a>
          </div>
          <ContactLinks locale={locale} />
        </section>
      </main>
      <Footer locale={locale} showBackHome />
    </>
  );
}
