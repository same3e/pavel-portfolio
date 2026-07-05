"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_TEXT = Array.from(
  { length: 10 },
  () => "WEB DESIGN — AUTOMATION — CRM INTEGRATIONS — BOOKING BOTS — "
).join("");

export function MarqueeStrip() {
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;

    if (!root || !track) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(track, { xPercent: 0 });
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        track,
        { xPercent: -100 },
        {
          xPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true
          }
        }
      );
    }, root);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section className="marquee-strip" aria-label="Services and integrations" ref={rootRef}>
      <div className="marquee-track" ref={trackRef}>
        {MARQUEE_TEXT}
      </div>
    </section>
  );
}
