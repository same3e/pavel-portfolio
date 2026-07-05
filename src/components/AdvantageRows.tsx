"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { getAdvantages, type Locale } from "@/content/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function AdvantageRows({ locale }: { locale: Locale }) {
  const rootRef = useRef<HTMLUListElement>(null);
  const advantages = getAdvantages(locale);

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const rows = root.querySelectorAll<HTMLElement>(".advantage-row");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 86%",
          once: true
        }
      });

      timeline.fromTo(
        rows,
        { opacity: 0, y: 18, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          clearProps: "filter,opacity,transform,willChange",
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.14,
          willChange: "transform,filter,opacity"
        }
      );

      return () => {
        timeline.kill();
      };
    },
    { scope: rootRef }
  );

  return (
    <ul className="advantage-rows" ref={rootRef}>
      {advantages.map((advantage) => (
        <li className="advantage-row" key={advantage.tag}>
          {advantage.before}
          <span>{advantage.tag}</span>
          {advantage.after}
        </li>
      ))}
    </ul>
  );
}
