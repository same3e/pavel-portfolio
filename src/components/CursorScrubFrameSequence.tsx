"use client";

import { useEffect, useRef } from "react";

type FrameSequence = {
  basePath: string;
  frameCount: number;
  extension?: string;
  pad?: number;
};

type CursorScrubFrameSequenceProps = {
  sequence: FrameSequence;
  className?: string;
  onTrackingChange?: (isTracking: boolean) => void;
};

const CENTER_PROGRESS = 0.5;
const INTERPOLATION = 0.3;
const PROGRESS_EPSILON = 0.002;
const PRELOAD_CONCURRENCY = 6;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function getFrameIndex(progress: number, frameCount: number) {
  return Math.round(clamp(progress) * Math.max(frameCount - 1, 0));
}

function getScrollFrameIndex(progress: number, frameCount: number) {
  return Math.min(Math.floor(clamp(progress) * frameCount), Math.max(frameCount - 1, 0));
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

function findNearestCachedFrame(cache: Map<number, HTMLImageElement>, targetIndex: number, frameCount: number) {
  if (cache.has(targetIndex)) {
    return targetIndex;
  }

  for (let offset = 1; offset < frameCount; offset += 1) {
    const left = targetIndex - offset;
    const right = targetIndex + offset;

    if (left >= 0 && cache.has(left)) {
      return left;
    }

    if (right < frameCount && cache.has(right)) {
      return right;
    }
  }

  return null;
}

export function CursorScrubFrameSequence({
  sequence,
  className,
  onTrackingChange
}: CursorScrubFrameSequenceProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetProgressRef = useRef(CENTER_PROGRESS);
  const currentProgressRef = useRef(CENTER_PROGRESS);
  const animationFrameRef = useRef<number | null>(null);
  const frameCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const pendingFramesRef = useRef<Map<number, Promise<HTMLImageElement>>>(new Map());
  const currentFrameRef = useRef<number | null>(null);
  const currentImageRef = useRef<HTMLImageElement | null>(null);
  const reducedMotionRef = useRef(false);
  const finePointerRef = useRef(false);
  const coarsePointerRef = useRef(false);
  const draggingRef = useRef(false);
  const trackingRef = useRef(false);
  const destroyedRef = useRef(false);
  const onTrackingChangeRef = useRef(onTrackingChange);

  useEffect(() => {
    onTrackingChangeRef.current = onTrackingChange;
  }, [onTrackingChange]);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;

    if (!root || !canvas) {
      return;
    }

    const rootElement = root;
    const canvasElement = canvas;
    const context = canvasElement.getContext("2d", { alpha: true });
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const scrollScrubElement = rootElement.closest<HTMLElement>(".hero-portrait-frame") ?? rootElement;
    const centerFrame = getFrameIndex(CENTER_PROGRESS, sequence.frameCount);
    const preloadOrder = getPreloadOrder(sequence.frameCount, centerFrame);
    let preloadCursor = 0;
    let activePreloads = 0;
    let scrollScrubVisible = false;
    let scrollScrubFrameRef: number | null = null;

    destroyedRef.current = false;
    rootElement.dataset.ready = "false";
    rootElement.dataset.interactive = "false";

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

    function sizeCanvas() {
      const rect = canvasElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvasElement.width !== width || canvasElement.height !== height) {
        canvasElement.width = width;
        canvasElement.height = height;
      }
    }

    function drawImage(image: HTMLImageElement) {
      if (!context) {
        return;
      }

      sizeCanvas();
      context.clearRect(0, 0, canvasElement.width, canvasElement.height);

      const imageRatio = image.naturalWidth / image.naturalHeight;
      const canvasRatio = canvasElement.width / canvasElement.height;
      const drawWidth = imageRatio > canvasRatio ? canvasElement.width : canvasElement.height * imageRatio;
      const drawHeight = imageRatio > canvasRatio ? canvasElement.width / imageRatio : canvasElement.height;
      const x = (canvasElement.width - drawWidth) / 2;
      const y = (canvasElement.height - drawHeight) / 2;

      context.drawImage(image, x, y, drawWidth, drawHeight);
      currentImageRef.current = image;
    }

    function drawFrame(index: number) {
      const image = frameCacheRef.current.get(index);

      if (!image || currentFrameRef.current === index) {
        return;
      }

      currentFrameRef.current = index;
      drawImage(image);
    }

    async function loadFrame(index: number) {
      const cached = frameCacheRef.current.get(index);

      if (cached) {
        return cached;
      }

      const pending = pendingFramesRef.current.get(index);

      if (pending) {
        return pending;
      }

      const promise = new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new window.Image();
        image.decoding = "async";
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`Failed to load portrait frame ${index}`));
        image.src = getFrameSrc(sequence, index);
      }).then(async (image) => {
        try {
          await image.decode();
        } catch {
          // Some browsers resolve onload after decode or reject decode for cached images.
        }

        frameCacheRef.current.set(index, image);
        pendingFramesRef.current.delete(index);
        return image;
      });

      pendingFramesRef.current.set(index, promise);
      return promise;
    }

    function revealCenterFrame() {
      loadFrame(centerFrame)
        .then((image) => {
          if (destroyedRef.current) {
            return;
          }

          frameCacheRef.current.set(centerFrame, image);
          drawFrame(centerFrame);
          rootElement.dataset.ready = "true";

          if (!reducedMotionRef.current) {
            rootElement.dataset.interactive = "true";
            preloadFrames();

            if (coarsePointerRef.current) {
              scheduleScrollScrubFrame();
            }
          }
        })
        .catch(() => {
          if (!destroyedRef.current) {
            rootElement.dataset.ready = "false";
          }
        });
    }

    function preloadNextFrame() {
      if (destroyedRef.current || reducedMotionRef.current) {
        return;
      }

      while (activePreloads < PRELOAD_CONCURRENCY && preloadCursor < preloadOrder.length) {
        const frameIndex = preloadOrder[preloadCursor];
        preloadCursor += 1;

        if (frameCacheRef.current.has(frameIndex) || pendingFramesRef.current.has(frameIndex)) {
          continue;
        }

        activePreloads += 1;
        loadFrame(frameIndex)
          .catch(() => undefined)
          .finally(() => {
            activePreloads -= 1;
            preloadNextFrame();
          });
      }
    }

    function preloadFrames() {
      preloadNextFrame();
    }

    function syncToProgress(progress: number) {
      const targetIndex = getFrameIndex(progress, sequence.frameCount);
      const nearestIndex = findNearestCachedFrame(frameCacheRef.current, targetIndex, sequence.frameCount);

      if (nearestIndex !== null) {
        drawFrame(nearestIndex);
      }

      if (!frameCacheRef.current.has(targetIndex)) {
        void loadFrame(targetIndex).catch(() => undefined);
      }
    }

    function syncToFrameIndex(targetIndex: number) {
      const nearestIndex = findNearestCachedFrame(frameCacheRef.current, targetIndex, sequence.frameCount);

      if (nearestIndex !== null) {
        drawFrame(nearestIndex);
      }

      if (!frameCacheRef.current.has(targetIndex)) {
        void loadFrame(targetIndex).catch(() => undefined);
      }
    }

    function getScrollScrubProgress() {
      const rect = scrollScrubElement.getBoundingClientRect();
      const viewportHeight = Math.max(window.innerHeight || document.documentElement.clientHeight, 1);
      const travel = viewportHeight + Math.max(rect.height, 1);

      return clamp((viewportHeight - rect.top) / travel);
    }

    function updateScrollScrubFrame() {
      scrollScrubFrameRef = null;

      if (
        reducedMotionRef.current ||
        !coarsePointerRef.current ||
        !scrollScrubVisible ||
        rootElement.dataset.ready !== "true"
      ) {
        return;
      }

      const frameIndex = getScrollFrameIndex(getScrollScrubProgress(), sequence.frameCount);
      syncToFrameIndex(frameIndex);
    }

    function scheduleScrollScrubFrame() {
      if (scrollScrubFrameRef !== null) {
        return;
      }

      scrollScrubFrameRef = window.requestAnimationFrame(updateScrollScrubFrame);
    }

    function centerImmediately() {
      cancelAnimationFrameIfNeeded();
      if (scrollScrubFrameRef !== null) {
        window.cancelAnimationFrame(scrollScrubFrameRef);
        scrollScrubFrameRef = null;
      }
      targetProgressRef.current = CENTER_PROGRESS;
      currentProgressRef.current = CENTER_PROGRESS;
      setTracking(false);
      syncToProgress(CENTER_PROGRESS);
    }

    function runTimelineStep() {
      animationFrameRef.current = null;

      if (reducedMotionRef.current || rootElement.dataset.ready !== "true") {
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
      syncToProgress(nextProgress);

      if (Math.abs(targetProgress - nextProgress) > PROGRESS_EPSILON) {
        animationFrameRef.current = window.requestAnimationFrame(runTimelineStep);
      }
    }

    function scheduleTimelineStep() {
      if (reducedMotionRef.current || rootElement.dataset.ready !== "true") {
        return;
      }

      if (animationFrameRef.current === null) {
        animationFrameRef.current = window.requestAnimationFrame(runTimelineStep);
      }
    }

    function setTargetProgress(progress: number) {
      targetProgressRef.current = clamp(progress);
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

    function handleWindowPointerMove(event: PointerEvent) {
      if (!finePointerRef.current || reducedMotionRef.current || draggingRef.current) {
        return;
      }

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
      if (coarsePointerRef.current || finePointerRef.current || reducedMotionRef.current || event.pointerType === "mouse") {
        return;
      }

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
      coarsePointerRef.current = coarsePointerQuery.matches;

      if (reducedMotionRef.current) {
        rootElement.dataset.interactive = "false";
        centerImmediately();
        return;
      }

      if (rootElement.dataset.ready === "true") {
        rootElement.dataset.interactive = "true";
        preloadFrames();
      }

      if (coarsePointerRef.current) {
        setTracking(false);
        scheduleScrollScrubFrame();
        return;
      }

      if (!finePointerRef.current) {
        returnToCenter();
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      if (currentImageRef.current) {
        drawImage(currentImageRef.current);
      }
    });

    resizeObserver.observe(canvasElement);
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        scrollScrubVisible = Boolean(entry?.isIntersecting);
        scheduleScrollScrubFrame();
      },
      { threshold: [0, 0.2, 0.5, 0.8, 1] }
    );

    intersectionObserver.observe(scrollScrubElement);
    syncMotionPreferences();
    revealCenterFrame();

    window.addEventListener("pointermove", handleWindowPointerMove, { passive: true });
    window.addEventListener("pointerout", handleWindowPointerOut, { passive: true });
    window.addEventListener("blur", handleWindowBlur);
    rootElement.addEventListener("pointerdown", handleTouchPointerDown);
    rootElement.addEventListener("pointermove", handleTouchPointerMove, { passive: true });
    rootElement.addEventListener("pointerup", finishTouchScrub);
    rootElement.addEventListener("pointercancel", finishTouchScrub);
    window.addEventListener("scroll", scheduleScrollScrubFrame, { passive: true });
    window.addEventListener("resize", scheduleScrollScrubFrame);
    reducedMotionQuery.addEventListener("change", syncMotionPreferences);
    finePointerQuery.addEventListener("change", syncMotionPreferences);
    coarsePointerQuery.addEventListener("change", syncMotionPreferences);

    return () => {
      destroyedRef.current = true;
      cancelAnimationFrameIfNeeded();
      if (scrollScrubFrameRef !== null) {
        window.cancelAnimationFrame(scrollScrubFrameRef);
        scrollScrubFrameRef = null;
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      frameCacheRef.current.clear();
      pendingFramesRef.current.clear();
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerout", handleWindowPointerOut);
      window.removeEventListener("blur", handleWindowBlur);
      rootElement.removeEventListener("pointerdown", handleTouchPointerDown);
      rootElement.removeEventListener("pointermove", handleTouchPointerMove);
      rootElement.removeEventListener("pointerup", finishTouchScrub);
      rootElement.removeEventListener("pointercancel", finishTouchScrub);
      window.removeEventListener("scroll", scheduleScrollScrubFrame);
      window.removeEventListener("resize", scheduleScrollScrubFrame);
      reducedMotionQuery.removeEventListener("change", syncMotionPreferences);
      finePointerQuery.removeEventListener("change", syncMotionPreferences);
      coarsePointerQuery.removeEventListener("change", syncMotionPreferences);
    };
  }, [sequence]);

  const centerFrame = getFrameIndex(CENTER_PROGRESS, sequence.frameCount);

  return (
    <div className={`cursor-frame-sequence ${className ?? ""}`} ref={rootRef}>
      <div className="portraitFrameSequenceCanvas">
        {/* The raw image is a same-path poster fallback for the canvas frame cache. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="cursor-frame-sequence__poster"
          src={getFrameSrc(sequence, centerFrame)}
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
        <canvas className="cursor-frame-sequence__canvas" ref={canvasRef} aria-hidden="true" />
        <span className="darkEmbeddedLogoCover" aria-hidden="true" />
      </div>
    </div>
  );
}
