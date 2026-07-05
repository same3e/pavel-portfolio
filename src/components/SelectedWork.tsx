"use client";

import gsap from "gsap";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type MouseEvent, type Ref } from "react";
import { LetterSwapText } from "@/components/LetterSwapText";
import { useMotionShell } from "@/components/MotionShell";
import { Project, projects } from "@/content/portfolio";

function ProjectPreviewMedia({ project, mediaRef }: { project: Project; mediaRef?: Ref<HTMLDivElement> }) {
  return (
    <div className="work-media-frame" key={project.id} ref={mediaRef}>
      <Image
        src={project.previewImage}
        alt={project.alt}
        width={1600}
        height={1050}
        sizes="(max-width: 900px) 100vw, 48vw"
      />
    </div>
  );
}

export function SelectedWork() {
  const { openProject } = useMotionShell();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const activeProject = projects[activeIndex];

  const alignPreviewToProject = useCallback((index: number, animate = true) => {
    const section = sectionRef.current;
    const preview = previewRef.current;
    const media = mediaRef.current;
    const item = itemRefs.current[index];

    if (!section || !preview || !media || !item) {
      return;
    }

    const sectionRect = section.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const mediaRect = media.getBoundingClientRect();
    const targetY = Math.max(0, itemRect.top - sectionRect.top + itemRect.height / 2 - mediaRect.height / 2);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !animate) {
      gsap.set(preview, { y: targetY });
      return;
    }

    gsap.to(preview, {
      y: targetY,
      duration: 0.55,
      ease: "power3.out",
      overwrite: true
    });
  }, []);

  useEffect(() => {
    alignPreviewToProject(activeIndex);

    const media = mediaRef.current;
    if (!media || window.matchMedia("(max-width: 1024px)").matches) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(media, { autoAlpha: 1, y: 0, clipPath: "inset(0)" });
      return;
    }

    gsap.fromTo(
      media,
      { autoAlpha: 0, y: 28, clipPath: "inset(0 0 100% 0)" },
      {
        autoAlpha: 1,
        y: 0,
        clipPath: "inset(0)",
        duration: 0.5,
        ease: "power3.out",
        overwrite: true
      }
    );
  }, [activeIndex, alignPreviewToProject]);

  useEffect(() => {
    function handleResize() {
      alignPreviewToProject(activeIndex, false);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex, alignPreviewToProject]);

  function activatePreview(index: number) {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      return;
    }

    setActiveIndex(index);
    alignPreviewToProject(index);
  }

  function handleProjectClick(event: MouseEvent<HTMLAnchorElement>, project: Project) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    openProject(project.title, project.route);
  }

  return (
    <section className="selected-work" id="work" aria-labelledby="work-title">
      <h2 id="work-title" className="sr-only">Selected work</h2>

      <div className="selected-work-inner selected-work-desktop" ref={sectionRef}>
        <div className="work-list-panel">
          <div className="work-list" aria-label="Selected projects">
            {projects.map((project, index) => (
              <a
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                className={`work-list-item ${activeIndex === index ? "is-active" : ""}`}
                href={project.route}
                key={project.id}
                data-index={index}
                onClick={(event) => handleProjectClick(event, project)}
                onFocus={() => activatePreview(index)}
                onMouseEnter={() => activatePreview(index)}
              >
                <strong>{project.title}</strong>
                <small>{project.category}</small>
              </a>
            ))}
          </div>

          <a
            className="work-case-link text-cta"
            href={activeProject.route}
            onClick={(event) => handleProjectClick(event, activeProject)}
          >
            <LetterSwapText label="Explore the case" />
          </a>
        </div>

        <aside className="work-preview" aria-label={`${activeProject.title} preview`}>
          <div className="work-floating-preview" ref={previewRef}>
            <div className="work-media-shell">
              <ProjectPreviewMedia project={activeProject} mediaRef={mediaRef} />
            </div>
            <p className="work-summary" key={`${activeProject.id}-summary`}>
              {activeProject.description}
            </p>
            <div className="work-info" key={activeProject.id}>
              <div className="work-info-row">
                <span>Year</span>
                <p>{activeProject.year}</p>
              </div>
              <div className="work-info-row">
                <span>Overview</span>
                <p>{activeProject.overview}</p>
              </div>
              <div className="work-info-row">
                <span>Role</span>
                <p>{activeProject.role}</p>
              </div>
              <div className="work-info-row">
                <span>Type</span>
                <p>{activeProject.type}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="selected-work-mobile" aria-label="Selected projects">
        {projects.map((project) => (
          <article className="mobile-work-item" key={project.id}>
            <a
              className="mobile-work-title"
              href={project.route}
              onClick={(event) => handleProjectClick(event, project)}
            >
              <strong>{project.title}</strong>
            </a>
            <p className="mobile-work-category">{project.category}</p>
            <div className="mobile-work-media">
              <Image
                src={project.previewImage}
                alt={project.alt}
                width={1600}
                height={1050}
                sizes="(max-width: 1024px) calc(100vw - 32px), 1px"
              />
            </div>
            <p className="mobile-work-summary">{project.description}</p>
            <dl className="mobile-work-meta">
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>{project.type}</dd>
              </div>
            </dl>
            <a
              className="mobile-work-link text-cta"
              href={project.route}
              onClick={(event) => handleProjectClick(event, project)}
            >
              <LetterSwapText label="Explore case" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
