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
        priority={project.id === "thai-nari"}
      />
    </div>
  );
}

export function SelectedWork() {
  const { openProject } = useMotionShell();
  const [scrollActive, setScrollActive] = useState(0);
  const [previewActive, setPreviewActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const activeIndex = previewActive ?? scrollActive;
  const activeProject = projects[activeIndex];

  const alignPreviewToProject = useCallback((index: number, animate = true) => {
    const section = sectionRef.current;
    const preview = previewRef.current;
    const item = itemRefs.current[index];

    if (!section || !preview || !item) {
      return;
    }

    const sectionRect = section.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const targetY = Math.max(0, itemRect.top - sectionRect.top - 18);
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

  useEffect(() => {
    alignPreviewToProject(activeIndex);

    const media = mediaRef.current;
    if (!media) {
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
    setPreviewActive(index);
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
      <div className="selected-work-inner" ref={sectionRef}>
        <div className="work-list-panel">
          <h2 id="work-title" className="sr-only">Selected work</h2>

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
                onBlur={() => setPreviewActive(null)}
                onMouseEnter={() => activatePreview(index)}
                onMouseLeave={() => setPreviewActive(null)}
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
    </section>
  );
}
