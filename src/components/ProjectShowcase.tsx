"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { SplitRevealText } from "@/components/SplitRevealText";
import type { ProjectShowcase as ProjectShowcaseData } from "@/content/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ProjectShowcaseProps = {
  showcase: ProjectShowcaseData;
  variant: "desktop" | "mobile";
  hideHeader?: boolean;
  hideCaptions?: boolean;
  interludeAfterIndex?: number;
  interludeText?: string;
};

export function ProjectShowcase({
  showcase,
  variant,
  hideHeader = false,
  hideCaptions = false,
  interludeAfterIndex,
  interludeText
}: ProjectShowcaseProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemCount = showcase.screens.length || showcase.placeholderCount || 0;
  const galleryLabel = useMemo(
    () => `${showcase.title} gallery with ${itemCount} ${itemCount === 1 ? "item" : "items"}`,
    [itemCount, showcase.title]
  );
  const sizes =
    variant === "desktop"
      ? "(max-width: 768px) 100vw, (max-width: 1200px) 92vw, 90vw"
      : "(max-width: 600px) 88vw, (max-width: 1000px) 44vw, 30vw";

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const copy = section.querySelectorAll("[data-showcase-copy]");
      const screens = section.querySelectorAll("[data-showcase-item]");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true
        }
      });

      timeline
        .fromTo(
          copy,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.08 }
        )
        .fromTo(
          screens,
          { opacity: 0, y: 28, clipPath: "inset(8% 0 0 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12
          },
          "-=0.16"
        );

      return () => {
        timeline.kill();
      };
    },
    { dependencies: [showcase, variant], scope: sectionRef }
  );

  useEffect(() => {
    const media = mediaRef.current;
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    if (!media || !mobileQuery.matches || itemCount <= 1) {
      setActiveIndex(0);
      return;
    }

    const mediaElement = media;
    let frameId: number | null = null;

    function updateActiveIndex() {
      frameId = null;

      const items = Array.from(mediaElement.querySelectorAll<HTMLElement>("[data-showcase-item]"));
      const mediaLeft = mediaElement.getBoundingClientRect().left;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      items.forEach((item, index) => {
        const distance = Math.abs(item.getBoundingClientRect().left - mediaLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    }

    function scheduleUpdate() {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveIndex);
    }

    updateActiveIndex();
    mediaElement.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      mediaElement.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [itemCount, showcase]);

  return (
    <section
      className={`project-showcase project-showcase--${variant} ${hideCaptions ? "project-showcase--no-captions" : ""}`}
      ref={sectionRef}
    >
      {!hideHeader ? (
        <header className="project-showcase__header section-grid">
          <span className="project-showcase__eyebrow" data-showcase-copy>
            {showcase.eyebrow}
          </span>

          <div className="project-showcase__intro">
            <SplitRevealText as="h2" ariaLabel={showcase.title} text={showcase.title} mode="scroll" />

            {showcase.description ? <p data-showcase-copy>{showcase.description}</p> : null}
          </div>
        </header>
      ) : null}

      <div className="project-showcase__media" ref={mediaRef} aria-label={galleryLabel}>
        {showcase.screens.map((screen, index) => (
          <Fragment key={screen.src}>
            <figure
              className="project-showcase__item"
              data-showcase-item
              tabIndex={0}
              aria-label={`${String(index + 1).padStart(2, "0")} of ${itemCount}: ${screen.caption}`}
            >
              <div className="project-showcase__image">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  sizes={sizes}
                  quality={90}
                />
              </div>
              {!hideCaptions ? (
                <figcaption>
                  {String(index + 1).padStart(2, "0")} / {screen.caption}
                </figcaption>
              ) : null}
            </figure>
            {interludeText && interludeAfterIndex === index ? (
              <p className="project-showcase__statement" data-showcase-copy>
                {interludeText}
              </p>
            ) : null}
          </Fragment>
        ))}
        {showcase.screens.length === 0 && showcase.placeholderCount
          ? Array.from({ length: showcase.placeholderCount }).map((_, index) => (
              <figure
                className="project-showcase__item project-showcase__item--placeholder"
                data-showcase-item
                tabIndex={0}
                aria-label={`${String(index + 1).padStart(2, "0")} of ${itemCount}: mobile screenshot placeholder`}
                key={`placeholder-${index}`}
              >
                <div className="project-showcase__placeholder">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>Mobile screenshot placeholder</p>
                </div>
              </figure>
            ))
          : null}
      </div>
      {itemCount > 1 ? (
        <div className="project-showcase__counter" aria-hidden="true">
          {String(activeIndex + 1).padStart(2, "0")} / {String(itemCount).padStart(2, "0")}
        </div>
      ) : null}
    </section>
  );
}
