"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function HeroPortrait() {
  const [isTracking, setIsTracking] = useState(false);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackingRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<HTMLDivElement | null>(null);
  const trackingActiveRef = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const tracking = trackingRef.current;
    const marker = markerRef.current;

    if (!viewport || !tracking || !marker) {
      return;
    }

    const viewportElement = viewport;
    const trackingElement = tracking;
    const markerElement = marker;
    const canTrack = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canTrack || reduceMotion) {
      return;
    }

    const portraitX = gsap.quickTo(trackingElement, "x", {
      duration: 0.45,
      ease: "power3.out"
    });
    const portraitY = gsap.quickTo(trackingElement, "y", {
      duration: 0.45,
      ease: "power3.out"
    });
    const markerX = gsap.quickTo(markerElement, "x", {
      duration: 0.5,
      ease: "power3.out"
    });
    const markerY = gsap.quickTo(markerElement, "y", {
      duration: 0.5,
      ease: "power3.out"
    });

    function activateTracking() {
      if (trackingActiveRef.current) {
        return;
      }

      trackingActiveRef.current = true;
      setIsTracking(true);
    }

    function handlePointerEnter() {
      activateTracking();
    }

    function handlePointerMove(event: PointerEvent) {
      activateTracking();

      const rect = viewportElement.getBoundingClientRect();
      const normalizedX = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
      const normalizedY = clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);

      portraitX(normalizedX * 4);
      portraitY(normalizedY * 4);
      markerX(normalizedX * 12);
      markerY(normalizedY * 10);
    }

    function handlePointerLeave() {
      trackingActiveRef.current = false;
      portraitX(0);
      portraitY(0);
      markerX(0);
      markerY(0);
      setIsTracking(false);
    }

    function handleWindowPointerMove(event: PointerEvent) {
      if (!trackingActiveRef.current) {
        return;
      }

      const rect = viewportElement.getBoundingClientRect();
      const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (outside) {
        handlePointerLeave();
      }
    }

    viewportElement.addEventListener("pointerenter", handlePointerEnter);
    viewportElement.addEventListener("pointermove", handlePointerMove);
    viewportElement.addEventListener("pointerleave", handlePointerLeave);
    viewportElement.addEventListener("pointercancel", handlePointerLeave);
    window.addEventListener("pointermove", handleWindowPointerMove);

    return () => {
      viewportElement.removeEventListener("pointerenter", handlePointerEnter);
      viewportElement.removeEventListener("pointermove", handlePointerMove);
      viewportElement.removeEventListener("pointerleave", handlePointerLeave);
      viewportElement.removeEventListener("pointercancel", handlePointerLeave);
      window.removeEventListener("pointermove", handleWindowPointerMove);
      gsap.killTweensOf([trackingElement, markerElement]);
    };
  }, []);

  return (
    <div
      className={`hero-portrait-frame ${isTracking ? "is-tracking" : ""}`}
      ref={frameRef}
      aria-label="Voxel portrait render preview"
    >
      <div className="portrait-frame-header">
        <span>PORTRAIT_01</span>
        <span>OBJ / 001</span>
      </div>

      <div className="portrait-viewport" ref={viewportRef}>
        <div className="portrait-marker" ref={markerRef} aria-hidden="true" />

        <div className="portrait-float">
          <div className="portrait-tracking" ref={trackingRef}>
            <div className="portrait-image-scale">
              <Image
                src="/hero.png"
                alt="Voxel portrait of Pavel Kostin"
                fill
                priority
                quality={100}
                sizes="(max-width: 768px) 88vw, (max-width: 1200px) 38vw, 620px"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="portrait-frame-footer">
        <span>1254 x 1254</span>
        <span>
          <i aria-hidden="true" />
          {isTracking ? "SUBJECT TRACKING" : "RENDER ACTIVE"}
        </span>
      </div>
    </div>
  );
}
