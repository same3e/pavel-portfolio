"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMemo, useRef } from "react";

gsap.registerPlugin(useGSAP);

function splitCharacters(label: string) {
  return Array.from(label).map((character, index) => (
    <span className="letter-swap-char" key={`${character}-${index}`}>
      {character === " " ? "\u00A0" : character}
    </span>
  ));
}

export function LetterSwapText({ label, className }: { label: string; className?: string }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const characters = useMemo(() => splitCharacters(label), [label]);

  useGSAP(
    () => {
      const root = rootRef.current;
      const control = root?.closest<HTMLElement>("a,button");
      if (!root || !control || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const current = root.querySelectorAll<HTMLElement>(".letter-swap-row-current .letter-swap-char");
      const next = root.querySelectorAll<HTMLElement>(".letter-swap-row-next .letter-swap-char");
      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const timeline = gsap.timeline({ paused: true });

      gsap.set(next, { yPercent: 155 });
      timeline
        .to(current, {
          yPercent: -155,
          duration: 0.42,
          ease: "power3.out",
          stagger: 0.018
        })
        .to(
          next,
          {
            yPercent: 0,
            duration: 0.42,
            ease: "power3.out",
            stagger: 0.018
          },
          0
        );

      function play() {
        timeline.play();
      }

      function reverse() {
        timeline.reverse();
      }

      if (canHover) {
        control.addEventListener("pointerenter", play);
        control.addEventListener("pointerleave", reverse);
      }

      control.addEventListener("focus", play);
      control.addEventListener("blur", reverse);

      return () => {
        if (canHover) {
          control.removeEventListener("pointerenter", play);
          control.removeEventListener("pointerleave", reverse);
        }

        control.removeEventListener("focus", play);
        control.removeEventListener("blur", reverse);
        timeline.kill();
      };
    },
    { dependencies: [label], scope: rootRef }
  );

  return (
    <span className={`letter-swap ${className ?? ""}`} ref={rootRef}>
      <span className="sr-only">{label}</span>
      <span className="letter-swap-visual" aria-hidden="true">
        <span className="letter-swap-row letter-swap-row-current">{characters}</span>
        <span className="letter-swap-row letter-swap-row-next">{characters}</span>
      </span>
    </span>
  );
}
