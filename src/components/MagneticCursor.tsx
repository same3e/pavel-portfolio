"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const MAGNETIC_TARGET_SELECTOR = "a, button, .text-cta";

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    function syncPointerMode() {
      const nextEnabled = !coarsePointerQuery.matches;
      document.documentElement.classList.toggle("has-magnetic-cursor", nextEnabled);
    }

    syncPointerMode();
    coarsePointerQuery.addEventListener("change", syncPointerMode);

    if (!cursor) {
      return () => {
        coarsePointerQuery.removeEventListener("change", syncPointerMode);
        document.documentElement.classList.remove("has-magnetic-cursor");
      };
    }

    const cursorElement = cursor;
    const xTo = gsap.quickTo(cursorElement, "x", { duration: 0.28, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorElement, "y", { duration: 0.28, ease: "power3.out" });

    function moveCursor(event: PointerEvent) {
      if (coarsePointerQuery.matches) {
        return;
      }

      const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
      cursorElement.classList.toggle(
        "is-on-light-surface",
        hoveredElement instanceof Element && Boolean(hoveredElement.closest(".contact"))
      );
      xTo(event.clientX);
      yTo(event.clientY);
    }

    function activateCursor(event: PointerEvent) {
      if (coarsePointerQuery.matches) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element) || !target.closest(MAGNETIC_TARGET_SELECTOR)) {
        return;
      }

      cursorElement.classList.add("is-active");
    }

    function deactivateCursor(event: PointerEvent) {
      if (coarsePointerQuery.matches) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element) || !target.closest(MAGNETIC_TARGET_SELECTOR)) {
        return;
      }

      cursorElement.classList.remove("is-active");
    }

    document.addEventListener("pointermove", moveCursor, { passive: true });
    document.addEventListener("pointerover", activateCursor, { passive: true });
    document.addEventListener("pointerout", deactivateCursor, { passive: true });

    return () => {
      document.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerover", activateCursor);
      document.removeEventListener("pointerout", deactivateCursor);
      coarsePointerQuery.removeEventListener("change", syncPointerMode);
      document.documentElement.classList.remove("has-magnetic-cursor");
      gsap.killTweensOf(cursorElement);
    };
  }, []);

  return <div className="magnetic-cursor" ref={cursorRef} aria-hidden="true" />;
}
