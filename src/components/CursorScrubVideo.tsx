"use client";

import { useEffect, useRef } from "react";

type CursorScrubVideoProps = {
  darkSrc: string;
  lightSrc: string;
  className?: string;
  onTrackingChange?: (isTracking: boolean) => void;
};

type VideoTheme = "dark" | "light";

const CENTER_PROGRESS = 0.5;
const START_OFFSET = 0.4;
const INTERPOLATION = 0.3;
const PROGRESS_EPSILON = 0.002;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function getTargetTime(progress: number, duration: number) {
  const start = Math.min(START_OFFSET, duration);
  const usableDuration = Math.max(0, duration - start);

  return start + clamp(progress) * usableDuration;
}

export function CursorScrubVideo({
  darkSrc,
  lightSrc,
  className,
  onTrackingChange
}: CursorScrubVideoProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const darkVideoRef = useRef<HTMLVideoElement | null>(null);
  const lightVideoRef = useRef<HTMLVideoElement | null>(null);
  const targetProgressRef = useRef(CENTER_PROGRESS);
  const currentProgressRef = useRef(CENTER_PROGRESS);
  const animationFrameRef = useRef<number | null>(null);
  const metadataReadyRef = useRef<Record<VideoTheme, boolean>>({ dark: false, light: false });
  const loadFailedRef = useRef<Record<VideoTheme, boolean>>({ dark: false, light: false });
  const durationRef = useRef<Record<VideoTheme, number>>({ dark: 0, light: 0 });
  const reducedMotionRef = useRef(false);
  const finePointerRef = useRef(false);
  const draggingRef = useRef(false);
  const trackingRef = useRef(false);
  const onTrackingChangeRef = useRef(onTrackingChange);

  useEffect(() => {
    onTrackingChangeRef.current = onTrackingChange;
  }, [onTrackingChange]);

  useEffect(() => {
    const root = rootRef.current;
    const darkVideo = darkVideoRef.current;
    const lightVideo = lightVideoRef.current;

    if (!root || !darkVideo || !lightVideo) {
      return;
    }

    const rootElement: HTMLDivElement = root;
    const videoElements: Record<VideoTheme, HTMLVideoElement> = {
      dark: darkVideo,
      light: lightVideo
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

    function setVideoTime(video: HTMLVideoElement, time: number) {
      try {
        video.currentTime = time;
      } catch {
        // Some browsers reject seeks before enough metadata is available.
      }
    }

    function hasReadyVideo() {
      return metadataReadyRef.current.dark || metadataReadyRef.current.light;
    }

    function allVideosSettled() {
      return (
        (metadataReadyRef.current.dark || loadFailedRef.current.dark) &&
        (metadataReadyRef.current.light || loadFailedRef.current.light)
      );
    }

    function revealIfSettled() {
      if (allVideosSettled()) {
        rootElement.dataset.ready = "true";
      }
    }

    function syncVideoToProgress(theme: VideoTheme, progress: number) {
      if (!metadataReadyRef.current[theme]) {
        return;
      }

      const video = videoElements[theme];
      const duration = durationRef.current[theme];
      setVideoTime(video, getTargetTime(progress, duration));
      video.pause();
    }

    function syncAllVideosToProgress(progress: number) {
      syncVideoToProgress("dark", progress);
      syncVideoToProgress("light", progress);
    }

    function centerImmediately() {
      cancelAnimationFrameIfNeeded();
      targetProgressRef.current = CENTER_PROGRESS;
      currentProgressRef.current = CENTER_PROGRESS;
      setTracking(false);
      syncAllVideosToProgress(CENTER_PROGRESS);
    }

    function runTimelineStep() {
      animationFrameRef.current = null;

      if (reducedMotionRef.current || !hasReadyVideo()) {
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
      syncAllVideosToProgress(nextProgress);

      if (Math.abs(targetProgress - nextProgress) > PROGRESS_EPSILON) {
        animationFrameRef.current = window.requestAnimationFrame(runTimelineStep);
      }
    }

    function scheduleTimelineStep() {
      if (reducedMotionRef.current || !hasReadyVideo()) {
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

    function handleLoadedMetadata(theme: VideoTheme) {
      const video = videoElements[theme];
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      durationRef.current[theme] = duration;
      metadataReadyRef.current[theme] = duration > 0;
      video.pause();

      if (duration <= 0) {
        loadFailedRef.current[theme] = true;
        revealIfSettled();
        return;
      }

      syncVideoToProgress(theme, currentProgressRef.current);

      if (reducedMotionRef.current) {
        targetProgressRef.current = CENTER_PROGRESS;
        currentProgressRef.current = CENTER_PROGRESS;
        syncVideoToProgress(theme, CENTER_PROGRESS);
      }

      revealIfSettled();
    }

    function handleVideoPlay(event: Event) {
      const video = event.currentTarget;
      if (video instanceof HTMLVideoElement) {
        video.pause();
      }
    }

    function handleVideoError(theme: VideoTheme) {
      loadFailedRef.current[theme] = true;
      revealIfSettled();
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
      if (finePointerRef.current || reducedMotionRef.current || event.pointerType === "mouse") {
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

      if (reducedMotionRef.current || !finePointerRef.current) {
        returnToCenter();
      }

      if (reducedMotionRef.current) {
        centerImmediately();
      }
    }

    const darkMetadataHandler = () => handleLoadedMetadata("dark");
    const lightMetadataHandler = () => handleLoadedMetadata("light");
    const darkErrorHandler = () => handleVideoError("dark");
    const lightErrorHandler = () => handleVideoError("light");

    syncMotionPreferences();

    for (const video of Object.values(videoElements)) {
      video.pause();
      video.addEventListener("play", handleVideoPlay);
    }

    darkVideo.addEventListener("loadedmetadata", darkMetadataHandler);
    darkVideo.addEventListener("error", darkErrorHandler);
    lightVideo.addEventListener("loadedmetadata", lightMetadataHandler);
    lightVideo.addEventListener("error", lightErrorHandler);

    if (darkVideo.readyState >= 1) {
      handleLoadedMetadata("dark");
    }

    if (lightVideo.readyState >= 1) {
      handleLoadedMetadata("light");
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
      for (const video of Object.values(videoElements)) {
        video.pause();
        video.removeEventListener("play", handleVideoPlay);
      }

      darkVideo.removeEventListener("loadedmetadata", darkMetadataHandler);
      darkVideo.removeEventListener("error", darkErrorHandler);
      lightVideo.removeEventListener("loadedmetadata", lightMetadataHandler);
      lightVideo.removeEventListener("error", lightErrorHandler);
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
  }, []);

  return (
    <div className={`cursor-scrub-video ${className ?? ""}`} ref={rootRef}>
      <div className="portraitVideoCanvas">
        <video
          ref={darkVideoRef}
          className="portraitVideo portraitVideoDark cursor-scrub-video__media cursor-scrub-video__media--dark"
          src={darkSrc}
          preload="auto"
          playsInline
          muted
          disablePictureInPicture
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          aria-hidden="true"
          draggable={false}
          onContextMenu={(event) => event.preventDefault()}
          onDragStart={(event) => event.preventDefault()}
        />
        <video
          ref={lightVideoRef}
          className="portraitVideo portraitVideoLight cursor-scrub-video__media cursor-scrub-video__media--light"
          src={lightSrc}
          preload="auto"
          playsInline
          muted
          disablePictureInPicture
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
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
