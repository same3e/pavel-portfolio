"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LetterSwapText } from "@/components/LetterSwapText";
import { useMotionShell } from "@/components/MotionShell";
import { Project, projects } from "@/content/portfolio";

function ProjectPreviewMedia({ project }: { project: Project }) {
  return (
    <div className="work-media-frame" key={project.id}>
      <Image
        src={project.previewImage}
        alt={project.alt}
        width={1600}
        height={1050}
        sizes="(max-width: 900px) 100vw, 48vw"
        priority={project.id === "thai-nari"}
      />
    </div>
  );
}

export function SelectedWork() {
  const { openProject } = useMotionShell();
  const [scrollActive, setScrollActive] = useState(0);
  const [previewActive, setPreviewActive] = useState<number | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const activeIndex = previewActive ?? scrollActive;
  const activeProject = projects[activeIndex];

  useEffect(() => {
    const elements = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        const index = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(index)) {
          setScrollActive(index);
        }
      },
      {
        root: null,
        threshold: [0.35, 0.55, 0.75],
        rootMargin: "-22% 0px -28% 0px"
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function handleProjectClick(event: React.MouseEvent<HTMLAnchorElement>, project: Project) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    openProject(project.title, project.route);
  }

  return (
    <section className="selected-work" id="work" aria-labelledby="work-title">
      <div className="selected-work-inner">
        <aside className="work-sticky">
          <div className="work-media-shell">
            <ProjectPreviewMedia project={activeProject} />
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
            <a
              className="work-case-link"
              href={activeProject.route}
              onClick={(event) => handleProjectClick(event, activeProject)}
            >
              <LetterSwapText label="Explore the case" />
            </a>
          </div>
        </aside>

        <div className="work-list" aria-label="Selected projects">
          <h2 id="work-title" className="sr-only">Selected work</h2>
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
              onFocus={() => setPreviewActive(index)}
              onBlur={() => setPreviewActive(null)}
              onMouseEnter={() => setPreviewActive(index)}
              onMouseLeave={() => setPreviewActive(null)}
            >
              <strong>{project.title}</strong>
              <small>{project.category}</small>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
