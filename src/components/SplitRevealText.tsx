"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { createElement, useMemo, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type SplitRevealTextProps = {
  as?: "h1" | "h2" | "p";
  className?: string;
  id?: string;
  ariaLabel?: string;
  lines?: string[];
  mode?: "load" | "scroll";
  text?: string;
};

export function SplitRevealText({
  as = "p",
  className,
  id,
  ariaLabel,
  lines,
  mode = "scroll",
  text
}: SplitRevealTextProps) {
  const rootRef = useRef<HTMLElement>(null);
  const contentKey = useMemo(() => (lines ?? [text ?? ""]).join("\n"), [lines, text]);
  const content = lines?.length
    ? lines.map((line, index) => (
        <span className="split-line" key={line}>
          {line}
          {index < lines.length - 1 ? " " : ""}
        </span>
      ))
    : text;

  useGSAP(
    () => {
      const element = rootRef.current;
      if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const split = new SplitText(element, {
        type: "words",
        wordsClass: "split-word"
      });
      const words = split.words;
      const hiddenState = {
        opacity: 0,
        filter: "blur(6px)",
        y: 12
      };

      function play() {
        gsap.killTweensOf(words);
        gsap.set(words, hiddenState);
        gsap.to(words, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          clearProps: "filter,opacity,transform,willChange",
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.05,
          willChange: "transform,filter,opacity"
        });
      }

      gsap.set(words, hiddenState);

      if (mode === "load") {
        play();
        return () => split.revert();
      }

      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top 82%",
        end: "bottom 18%",
        onEnter: play,
        onEnterBack: play
      });

      return () => {
        trigger.kill();
        split.revert();
      };
    },
    {
      dependencies: [contentKey, mode],
      scope: rootRef
    }
  );

  return createElement(
    as,
    {
      "aria-label": ariaLabel,
      className,
      id,
      ref: rootRef
    },
    content
  );
}
