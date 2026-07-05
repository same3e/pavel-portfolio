"use client";

import { useEffect, useRef } from "react";

type FrameSequence = {
  basePath: string;
  frameCount: number;
  extension?: string;
  pad?: number;
};

type CursorScrubFrameSequenceProps = {
  darkSequence: FrameSequence;
  lightSequence: FrameSequence;
  className?: string;
  onTrackingChange?: (isTracking: boolean) => void;
};

type SequenceTheme = "dark" | "light";

const CENTER_PROGRESS = 0.5;
const INTERPOLATION = 0.3;
const PROGRESS_EPSILON = 0.002;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function getFrameIndex(progress: number, frameCount: number) {
  return Math.round(clamp(progress) * Math.max(frameCount - 1, 0));
}

function getFrameSrc(sequence: FrameSequence, index: number) {
  const extension = sequence.extension ?? "webp";
  const pad = sequence.pad ?? 3;
  const paddedIndex = String(index).padStart(pad, "0");

  return `${sequence.basePath}/frame-${paddedIndex}.${extension}`;
}

function getPreloadOrder(frameCount: number, startIndex: number) {
  const order = [startIndex];

  for (let offset = 1; order.length < frameCount; offset += 1) {
    const left = startIndex - offset;
    const right = startIndex + offset;

    if (left >= 0) {
      order.push(left);
    }

    if (right < frameCount) {
      order.push(right);
    }
  }

  return order;
}

export function CursorScrubFrameSequence({
  darkSequence,
  lightSequence,
  className,
  onTrackingChange
}: CursorScrubFrameSequenceProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const darkImageRef = useRef<HTMLImageElement | null>(null);
  const lightImageRef = useRef<HTMLImageElement | null>(null);
  const targetProgressRef = useRef(CENTER_PROGRESS);
  const currentProgressRef = useRef(CENTER_PROGRESS);
  const animationFrameRef = useRef<number | null>(null);
  const initialReadyRef = useRef<Record<SequenceTheme, boolean>>({ dark: false, light: false });
  const loadFailedRef = useRef<Record<SequenceTheme, boolean>>({ dark: false, light: false });
  const reducedMotionRef = useRef(false);
  const finePointerRef = useRef(false);
  const draggingRef = useRef(false);
  const trackingRef = useRef(false);
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);
  const onTrackingChangeRef = useRef(onTrackingChange);

  useEffect(() => {
    onTrackingChangeRef.current = onTrackingChange;
  }, [onTrackingChange]);

  useEffect(() => {
    const root = rootRef.current;
    const darkImage = darkImageRef.current;
    const lightImage = lightImageRef.current;

    if (!root || !darkImage || !lightImage) {
      return;
    }

    const rootElement: HTMLDivElement = root;
    const imageElements: Record<SequenceTheme, HTMLImageElement> = {
      dark: darkImage,
      light: lightImage
    };
    const sequences: Record<SequenceTheme, FrameSequence> = {
      dark: darkSequence,
      light: lightSequence
    };
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    rootElement.dataset.ready = "false";

    function setTracking(nextValue: boolean) {
      if (trackingRef.current === nextValue) {
        return;
      }

      trackingRef.current = nextValue;
      onTrackingChangeRef.current?.(nextValue);
    }

    function cancelAnimationFrameIfNeeded() {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }

    function hasReadyImage() {
      return initialReadyRef.current.dark || initialReadyRef.current.light;
    }

    function allInitialImagesSettled() {
      return (
        (initialReadyRef.current.dark || loadFailedRef.current.dark) &&
        (initialReadyRef.current.light || loadFailedRef.current.light)
      );
    }

    function revealIfSettled() {
      if (allInitialImagesSettled()) {
        rootElement.dataset.ready = "true";
      }
    }

    function setImageFrame(theme: SequenceTheme, progress: number) {
      const image = imageElements[theme];
      const sequence = sequences[theme];
      const frameIndex = getFrameIndex(progress, sequence.frameCount);
      const frameKey = String(frameIndex);

      if (image.dataset.frameIndex === frameKey) {
        return;
      }

      image.dataset.frameIndex = frameKey;
      image.src = getFrameSrc(sequence, frameIndex);
    }

    function syncAllImagesToProgress(progress: number) {
      setImageFrame("dark", progress);
      setImageFrame("light", progress);
    }

    function centerImmediately() {
      cancelAnimationFrameIfNeeded();
      targetProgressRef.current = CENTER_PROGRESS;
      currentProgressRef.current = CENTER_PROGRESS;
      setTracking(false);
      syncAllImagesToProgress(CENTER_PROGRESS);
    }

    function runTimelineStep() {
      animationFrameRef.current = null;

      if (reducedMotionRef.current || !hasReadyImage()) {
        return;
      }

      const targetProgress = clamp(targetProgressRef.current);
      const currentProgress = clamp(currentProgressRef.current);
      const delta = targetProgress - currentProgress;
      const nextProgress =
        Math.abs(delta) <= PROGRESS_EPSILON
          ? targetProgress
          : currentProgress + delta * INTERPOLATION;

      currentProgressRef.current = nextProgress;
      syncAllImagesToProgress(nextProgress);

      if (Math.abs(targetProgress - nextProgress) > PROGRESS_EPSILON) {
        animationFrameRef.current = window.requestAnimationFrame(runTimelineStep);
      }
    }

    function scheduleTimelineStep() {
      if (reducedMotionRef.current || !hasReadyImage()) {
        return;
      }

      if (animationFrameRef.current === null) {
        animationFrameRef.current = window.requestAnimationFrame(runTimelineStep);
      }
    }

    function setTargetProgress(progress: number) {
      const nextProgress = clamp(progress);
      targetProgressRef.current = nextProgress;
      scheduleTimelineStep();
    }

    function setTargetFromViewport(clientX: number) {
      const width = Math.max(window.innerWidth, 1);
      setTargetProgress(clientX / width);
    }

    function setTargetFromFrame(clientX: number) {
      const rect = rootElement.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      setTargetProgress((clientX - rect.left) / width);
    }

    function returnToCenter() {
      setTracking(false);
      setTargetProgress(CENTER_PROGRESS);
    }

    function handleImageLoad(theme: SequenceTheme) {
      initialReadyRef.current[theme] = true;
      revealIfSettled();
    }

    function handleImageError(theme: SequenceTheme) {
      loadFailedRef.current[theme] = true;
      revealIfSettled();
    }

    function preloadSequence(sequence: FrameSequence) {
      const startIndex = getFrameIndex(CENTER_PROGRESS, sequence.frameCount);
      const order = getPreloadOrder(sequence.frameCount, startIndex);

      for (const frameIndex of order) {
        const image = new window.Image();
        image.decoding = "async";
        image.src = getFrameSrc(sequence, frameIndex);
        preloadedImagesRef.current.push(image);
      }
    }

    function preloadFramesIfNeeded() {
      if (reducedMotionRef.current || preloadedImagesRef.current.length > 0) {
        return;
      }

      preloadSequence(darkSequence);
      preloadSequence(lightSequence);
    }

    function handleWindowPointerMove(event: PointerEvent) {
      if (!finePointerRef.current || reducedMotionRef.current || draggingRef.current) {
        return;
      }

      preloadFramesIfNeeded();
      setTracking(true);
      setTargetFromViewport(event.clientX);
    }

    function handleWindowPointerOut(event: PointerEvent) {
      if (event.relatedTarget === null) {
        returnToCenter();
      }
    }

    function handleWindowBlur() {
      returnToCenter();
    }

    function handleTouchPointerDown(event: PointerEvent) {
      if (finePointerRef.current || reducedMotionRef.current || event.pointerType === "mouse") {
        return;
      }

      preloadFramesIfNeeded();
      draggingRef.current = true;
      setTracking(true);
      setTargetFromFrame(event.clientX);

      try {
        rootElement.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture is an enhancement for touch-drag scrubbing.
      }
    }

    function handleTouchPointerMove(event: PointerEvent) {
      if (!draggingRef.current || reducedMotionRef.current) {
        return;
      }

      setTargetFromFrame(event.clientX);
    }

    function finishTouchScrub(event: PointerEvent) {
      if (!draggingRef.current) {
        return;
      }

      draggingRef.current = false;

      try {
        rootElement.releasePointerCapture(event.pointerId);
      } catch {
        // The pointer may already be released by the browser.
      }

      returnToCenter();
    }

    function syncMotionPreferences() {
      reducedMotionRef.current = reducedMotionQuery.matches;
      finePointerRef.current = finePointerQuery.matches;

      if (reducedMotionRef.current) {
        centerImmediately();
        return;
      }

      if (!finePointerRef.current) {
        returnToCenter();
      }
    }

    const darkLoadHandler = () => handleImageLoad("dark");
    const lightLoadHandler = () => handleImageLoad("light");
    const darkErrorHandler = () => handleImageError("dark");
    const lightErrorHandler = () => handleImageError("light");

    syncMotionPreferences();

    if (finePointerRef.current && !reducedMotionRef.current) {
      preloadFramesIfNeeded();
    }

    darkImage.addEventListener("load", darkLoadHandler);
    darkImage.addEventListener("error", darkErrorHandler);
    lightImage.addEventListener("load", lightLoadHandler);
    lightImage.addEventListener("error", lightErrorHandler);

    if (darkImage.complete && darkImage.naturalWidth > 0) {
      handleImageLoad("dark");
    }

    if (lightImage.complete && lightImage.naturalWidth > 0) {
      handleImageLoad("light");
    }

    window.addEventListener("pointermove", handleWindowPointerMove, { passive: true });
    window.addEventListener("pointerout", handleWindowPointerOut, { passive: true });
    window.addEventListener("blur", handleWindowBlur);
    rootElement.addEventListener("pointerdown", handleTouchPointerDown);
    rootElement.addEventListener("pointermove", handleTouchPointerMove, { passive: true });
    rootElement.addEventListener("pointerup", finishTouchScrub);
    rootElement.addEventListener("pointercancel", finishTouchScrub);
    reducedMotionQuery.addEventListener("change", syncMotionPreferences);
    finePointerQuery.addEventListener("change", syncMotionPreferences);

    return () => {
      cancelAnimationFrameIfNeeded();
      preloadedImagesRef.current = [];
      darkImage.removeEventListener("load", darkLoadHandler);
      darkImage.removeEventListener("error", darkErrorHandler);
      lightImage.removeEventListener("load", lightLoadHandler);
      lightImage.removeEventListener("error", lightErrorHandler);
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerout", handleWindowPointerOut);
      window.removeEventListener("blur", handleWindowBlur);
      rootElement.removeEventListener("pointerdown", handleTouchPointerDown);
      rootElement.removeEventListener("pointermove", handleTouchPointerMove);
      rootElement.removeEventListener("pointerup", finishTouchScrub);
      rootElement.removeEventListener("pointercancel", finishTouchScrub);
      reducedMotionQuery.removeEventListener("change", syncMotionPreferences);
      finePointerQuery.removeEventListener("change", syncMotionPreferences);
    };
  }, [darkSequence, lightSequence]);

  const darkCenterFrame = getFrameIndex(CENTER_PROGRESS, darkSequence.frameCount);
  const lightCenterFrame = getFrameIndex(CENTER_PROGRESS, lightSequence.frameCount);

  return (
    <div className={`cursor-frame-sequence ${className ?? ""}`} ref={rootRef}>
      <div className="portraitFrameSequenceCanvas">
        <img
          ref={darkImageRef}
          className="portraitFrame portraitFrameDark cursor-frame-sequence__media cursor-frame-sequence__media--dark"
          src={getFrameSrc(darkSequence, darkCenterFrame)}
          data-frame-index={darkCenterFrame}
          width={960}
          height={960}
          alt=""
          loading="eager"
          decoding="async"
          aria-hidden="true"
          draggable={false}
          onContextMenu={(event) => event.preventDefault()}
          onDragStart={(event) => event.preventDefault()}
        />
        <img
          ref={lightImageRef}
          className="portraitFrame portraitFrameLight cursor-frame-sequence__media cursor-frame-sequence__media--light"
          src={getFrameSrc(lightSequence, lightCenterFrame)}
          data-frame-index={lightCenterFrame}
          width={960}
          height={960}
          alt=""
          loading="eager"
          decoding="async"
          aria-hidden="true"
          draggable={false}
          onContextMenu={(event) => event.preventDefault()}
          onDragStart={(event) => event.preventDefault()}
        />
        <span className="darkEmbeddedLogoCover" aria-hidden="true" />
      </div>
    </div>
  );
}
