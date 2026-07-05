"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;

    if (!bar) {
      return;
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 861px)", () => {
      gsap.set(bar, { scaleY: 0, transformOrigin: "top center" });

      const trigger = ScrollTrigger.create({
        start: 0,
        end: () => Math.max(document.documentElement.scrollHeight - window.innerHeight, 1),
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(bar, { scaleY: self.progress });
        }
      });

      return () => {
        trigger.kill();
      };
    });

    return () => {
      media.revert();
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={barRef} />
    </div>
  );
}
