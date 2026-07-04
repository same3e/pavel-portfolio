"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CursorScrubVideoProps = {
  darkSrc: string;
  lightSrc: string;
  darkPosterSrc?: string;
  lightPosterSrc?: string;
  className?: string;
  onTrackingChange?: (isTracking: boolean) => void;
  onReadyChange?: (isReady: boolean) => void;
};

type VideoTheme = "dark" | "light";
type ThemeRecord<T> = Record<VideoTheme, T>;

type VideoWithFrameCallback = HTMLVideoElement & {
  requestVideoFrameCallback?: (callback: (now: number, metadata: unknown) => void) => number;
  cancelVideoFrameCallback?: (handle: number) => void;
};

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const CENTER_PROGRESS = 0.5;
const START_OFFSET = 0.4;
const INTERPOLATION = 0.32;
const PROGRESS_EPSILON = 0.002;
const SEEK_TIME_EPSILON = 1 / 90;
const VIDEO_LOAD_TIMEOUT = 30000;
const VIDEO_SEEK_TIMEOUT = 7000;
const VIDEO_FRAME_TIMEOUT = 3000;
const INACTIVE_PRELOAD_TIMEOUT = 4000;
const INACTIVE_PRELOAD_DELAY = 900;

const DEFAULT_POSTERS: ThemeRecord<string> = {
  dark: "/images/portrait-dark-poster.webp",
  light: "/images/portrait-light-poster.webp"
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function getTargetTime(progress: number, duration: number) {
  const start = Math.min(START_OFFSET, duration);
  const usableDuration = Math.max(0, duration - start);

  return start + clamp(progress) * usableDuration;
}

function getDocumentTheme(): VideoTheme {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getOppositeTheme(theme: VideoTheme): VideoTheme {
  return theme === "dark" ? "light" : "dark";
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

function warnInDevelopment(message: string, error?: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(message, error);
  }
}

function waitForVideoEvent(
  video: HTMLVideoElement,
  eventName: keyof HTMLMediaElementEventMap,
  signal: AbortSignal,
  timeoutMs: number
) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Video request aborted", "AbortError"));
      return;
    }

    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error(`Timed out waiting for ${eventName}`));
    }, timeoutMs);

    function cleanup() {
      window.clearTimeout(timeout);
      video.removeEventListener(eventName, handleEvent);
      video.removeEventListener("error", handleError);
      signal.removeEventListener("abort", handleAbort);
    }

    function handleEvent() {
      cleanup();
      resolve();
    }

    function handleError() {
      cleanup();
      reject(video.error ?? new Error(`Video ${eventName} failed`));
    }

    function handleAbort() {
      cleanup();
      reject(new DOMException("Video request aborted", "AbortError"));
    }

    video.addEventListener(eventName, handleEvent, { once: true });
    video.addEventListener("error", handleError, { once: true });
    signal.addEventListener("abort", handleAbort, { once: true });
  });
}

function waitForDecodedFrame(video: HTMLVideoElement, signal: AbortSignal) {
  const frameVideo = video as VideoWithFrameCallback;

  if (!frameVideo.requestVideoFrameCallback) {
    return new Promise<void>((resolve, reject) => {
      if (signal.aborted) {
        reject(new DOMException("Video request aborted", "AbortError"));
        return;
      }

      const frame = window.requestAnimationFrame(() => {
        cleanup();
        resolve();
      });

      function cleanup() {
        window.cancelAnimationFrame(frame);
        signal.removeEventListener("abort", handleAbort);
      }

      function handleAbort() {
        cleanup();
        reject(new DOMException("Video request aborted", "AbortError"));
      }

      signal.addEventListener("abort", handleAbort, { once: true });
    });
  }

  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Video request aborted", "AbortError"));
      return;
    }

    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("Timed out waiting for decoded video frame"));
    }, VIDEO_FRAME_TIMEOUT);
    const handle = frameVideo.requestVideoFrameCallback(() => {
      cleanup();
      resolve();
    });

    function cleanup() {
      window.clearTimeout(timeout);
      frameVideo.cancelVideoFrameCallback?.(handle);
      signal.removeEventListener("abort", handleAbort);
    }

    function handleAbort() {
      cleanup();
      reject(new DOMException("Video request aborted", "AbortError"));
    }

    signal.addEventListener("abort", handleAbort, { once: true });
  });
}

export function CursorScrubVideo({
  darkSrc,
  lightSrc,
  darkPosterSrc = DEFAULT_POSTERS.dark,
  lightPosterSrc = DEFAULT_POSTERS.light,
  className,
  onTrackingChange,
  onReadyChange
}: CursorScrubVideoProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const darkVideoRef = useRef<HTMLVideoElement | null>(null);
  const lightVideoRef = useRef<HTMLVideoElement | null>(null);
  const targetProgressRef = useRef(CENTER_PROGRESS);
  const currentProgressRef = useRef(CENTER_PROGRESS);
  const animationFrameRef = useRef<number | null>(null);
  const activeThemeRef = useRef<VideoTheme>("light");
  const visibleVideoThemeRef = useRef<VideoTheme | null>(null);
  const readyRef = useRef<ThemeRecord<boolean>>({ dark: false, light: false });
  const failedRef = useRef<ThemeRecord<boolean>>({ dark: false, light: false });
  const durationRef = useRef<ThemeRecord<number>>({ dark: 0, light: 0 });
  const lastSeekTimeRef = useRef<ThemeRecord<number>>({ dark: -1, light: -1 });
  const objectUrlRef = useRef<ThemeRecord<string | null>>({ dark: null, light: null });
  const abortControllerRef = useRef<ThemeRecord<AbortController | null>>({ dark: null, light: null });
  const loadPromiseRef = useRef<Partial<ThemeRecord<Promise<void>>>>({});
  const reducedMotionRef = useRef(false);
  const finePointerRef = useRef(false);
  const staticPosterOnlyRef = useRef(false);
  const listenersAttachedRef = useRef(false);
  const trackingRef = useRef(false);
  const pageVisibleRef = useRef(true);
  const idleHandleRef = useRef<number | null>(null);
  const idleTimeoutRef = useRef<number | null>(null);
  const onTrackingChangeRef = useRef(onTrackingChange);
  const onReadyChangeRef = useRef(onReadyChange);
  const [activeTheme, setActiveTheme] = useState<VideoTheme>("light");
  const [visibleVideoTheme, setVisibleVideoTheme] = useState<VideoTheme | null>(null);
  const [staticPosterOnly, setStaticPosterOnly] = useState(false);

  const posterByTheme: ThemeRecord<string> = {
    dark: darkPosterSrc,
    light: lightPosterSrc
  };
  const activeReady = staticPosterOnly || visibleVideoTheme === activeTheme;

  useEffect(() => {
    onTrackingChangeRef.current = onTrackingChange;
  }, [onTrackingChange]);

  useEffect(() => {
    onReadyChangeRef.current = onReadyChange;
  }, [onReadyChange]);

  useEffect(() => {
    onReadyChangeRef.current?.(activeReady);
  }, [activeReady]);

  useEffect(() => {
    const root = rootRef.current;
    const darkVideo = darkVideoRef.current;
    const lightVideo = lightVideoRef.current;

    if (!root || !darkVideo || !lightVideo) {
      return;
    }

    const rootElement = root;
    const videoElements: ThemeRecord<HTMLVideoElement> = {
      dark: darkVideo,
      light: lightVideo
    };
    const sourceByTheme: ThemeRecord<string> = {
      dark: darkSrc,
      light: lightSrc
    };
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    function setTracking(nextValue: boolean) {
      if (trackingRef.current === nextValue) {
        return;
      }

      trackingRef.current = nextValue;
      onTrackingChangeRef.current?.(nextValue);
    }

    function setVisibleTheme(nextTheme: VideoTheme | null) {
      visibleVideoThemeRef.current = nextTheme;
      setVisibleVideoTheme(nextTheme);
    }

    function cancelAnimationFrameIfNeeded() {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }

    function clearIdlePreload() {
      const idleWindow = window as WindowWithIdleCallback;

      if (idleHandleRef.current !== null) {
        idleWindow.cancelIdleCallback?.(idleHandleRef.current);
        idleHandleRef.current = null;
      }

      if (idleTimeoutRef.current !== null) {
        window.clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = null;
      }
    }

    function isInteractiveReady() {
      return (
        pageVisibleRef.current &&
        finePointerRef.current &&
        !reducedMotionRef.current &&
        readyRef.current[activeThemeRef.current] &&
        visibleVideoThemeRef.current === activeThemeRef.current
      );
    }

    function setVideoTime(video: HTMLVideoElement, time: number, theme: VideoTheme) {
      if (Math.abs(lastSeekTimeRef.current[theme] - time) < SEEK_TIME_EPSILON) {
        return;
      }

      try {
        video.currentTime = time;
        video.pause();
        lastSeekTimeRef.current[theme] = time;
      } catch {
        // Some browsers reject seeks before a decoded frame is available.
      }
    }

    async function seekThemeToProgress(theme: VideoTheme, progress: number, signal: AbortSignal) {
      const video = videoElements[theme];
      const duration = durationRef.current[theme];

      if (!duration || duration <= 0) {
        throw new Error(`Missing ${theme} video duration`);
      }

      const targetTime = getTargetTime(progress, duration);
      video.pause();

      if (Math.abs(video.currentTime - targetTime) > SEEK_TIME_EPSILON) {
        video.currentTime = targetTime;
        lastSeekTimeRef.current[theme] = targetTime;
        await waitForVideoEvent(video, "seeked", signal, VIDEO_SEEK_TIMEOUT);
      }

      await waitForDecodedFrame(video, signal);
    }

    async function loadThemeVideo(theme: VideoTheme, progress: number) {
      if (staticPosterOnlyRef.current || readyRef.current[theme]) {
        return;
      }

      const existingPromise = loadPromiseRef.current[theme];
      if (existingPromise) {
        return existingPromise;
      }

      const video = videoElements[theme];
      const controller = new AbortController();
      abortControllerRef.current[theme] = controller;

      const loadPromise = (async () => {
        try {
          const timeout = window.setTimeout(() => controller.abort(), VIDEO_LOAD_TIMEOUT);
          const response = await fetch(sourceByTheme[theme], { signal: controller.signal });
          window.clearTimeout(timeout);

          if (!response.ok) {
            throw new Error(`Failed to fetch ${theme} portrait video: ${response.status}`);
          }

          const blob = await response.blob();
          if (controller.signal.aborted) {
            throw new DOMException("Video request aborted", "AbortError");
          }

          const objectUrl = URL.createObjectURL(blob);
          objectUrlRef.current[theme] = objectUrl;
          video.src = objectUrl;
          video.load();
          await waitForVideoEvent(video, "loadedmetadata", controller.signal, VIDEO_SEEK_TIMEOUT);

          const duration = Number.isFinite(video.duration) ? video.duration : 0;
          if (duration <= 0) {
            throw new Error(`${theme} portrait video has no duration`);
          }

          durationRef.current[theme] = duration;
          video.pause();
          await seekThemeToProgress(theme, progress, controller.signal);
          readyRef.current[theme] = true;
          failedRef.current[theme] = false;

          if (activeThemeRef.current === theme) {
            setVisibleTheme(theme);
            scheduleInactivePreload();
          }
        } catch (error) {
          if (!readyRef.current[theme]) {
            video.removeAttribute("src");
            video.load();

            if (objectUrlRef.current[theme]) {
              URL.revokeObjectURL(objectUrlRef.current[theme]!);
              objectUrlRef.current[theme] = null;
            }
          }

          if (!isAbortError(error)) {
            failedRef.current[theme] = true;
            warnInDevelopment(`Portrait ${theme} video failed to load. Keeping poster visible.`, error);
          }
        } finally {
          delete loadPromiseRef.current[theme];

          if (abortControllerRef.current[theme] === controller) {
            abortControllerRef.current[theme] = null;
          }
        }
      })();

      loadPromiseRef.current[theme] = loadPromise;
      return loadPromise;
    }

    function scheduleInactivePreload() {
      clearIdlePreload();

      if (staticPosterOnlyRef.current) {
        return;
      }

      const inactiveTheme = getOppositeTheme(activeThemeRef.current);
      if (readyRef.current[inactiveTheme] || failedRef.current[inactiveTheme] || loadPromiseRef.current[inactiveTheme]) {
        return;
      }

      const run = () => {
        idleHandleRef.current = null;
        idleTimeoutRef.current = null;
        void loadThemeVideo(inactiveTheme, currentProgressRef.current);
      };
      const idleWindow = window as WindowWithIdleCallback;

      if (idleWindow.requestIdleCallback) {
        idleHandleRef.current = idleWindow.requestIdleCallback(run, { timeout: INACTIVE_PRELOAD_TIMEOUT });
      } else {
        idleTimeoutRef.current = window.setTimeout(run, INACTIVE_PRELOAD_DELAY);
      }
    }

    function prepareActiveTheme(theme: VideoTheme, progress = currentProgressRef.current) {
      activeThemeRef.current = theme;
      setActiveTheme(theme);
      setTracking(false);
      cancelAnimationFrameIfNeeded();

      if (staticPosterOnlyRef.current) {
        setVisibleTheme(null);
        return;
      }

      setVisibleTheme(null);
      clearIdlePreload();

      if (readyRef.current[theme]) {
        const controller = new AbortController();
        void seekThemeToProgress(theme, progress, controller.signal)
          .then(() => {
            if (activeThemeRef.current === theme) {
              setVisibleTheme(theme);
              scheduleInactivePreload();
            }
          })
          .catch((error) => {
            if (!isAbortError(error)) {
              failedRef.current[theme] = true;
              warnInDevelopment(`Portrait ${theme} video seek failed. Keeping poster visible.`, error);
            }
          });
        return;
      }

      void loadThemeVideo(theme, progress);
    }

    function syncActiveVideoToProgress(progress: number) {
      if (!isInteractiveReady()) {
        return;
      }

      const theme = activeThemeRef.current;
      const video = videoElements[theme];
      const duration = durationRef.current[theme];
      setVideoTime(video, getTargetTime(progress, duration), theme);
    }

    function runTimelineStep() {
      animationFrameRef.current = null;

      if (!isInteractiveReady()) {
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
      syncActiveVideoToProgress(nextProgress);

      if (Math.abs(targetProgress - nextProgress) > PROGRESS_EPSILON) {
        animationFrameRef.current = window.requestAnimationFrame(runTimelineStep);
      }
    }

    function scheduleTimelineStep() {
      if (!isInteractiveReady()) {
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

    function returnToCenter() {
      setTracking(false);
      targetProgressRef.current = CENTER_PROGRESS;
      scheduleTimelineStep();
    }

    function handleWindowPointerMove(event: PointerEvent) {
      if (!isInteractiveReady()) {
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

    function attachPointerListeners() {
      if (listenersAttachedRef.current || staticPosterOnlyRef.current) {
        return;
      }

      window.addEventListener("pointermove", handleWindowPointerMove, { passive: true });
      window.addEventListener("pointerout", handleWindowPointerOut, { passive: true });
      window.addEventListener("blur", handleWindowBlur);
      listenersAttachedRef.current = true;
    }

    function detachPointerListeners() {
      if (!listenersAttachedRef.current) {
        return;
      }

      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerout", handleWindowPointerOut);
      window.removeEventListener("blur", handleWindowBlur);
      listenersAttachedRef.current = false;
    }

    function syncMotionPreferences() {
      const currentTheme = getDocumentTheme();
      reducedMotionRef.current = reducedMotionQuery.matches;
      finePointerRef.current = finePointerQuery.matches;
      staticPosterOnlyRef.current = reducedMotionRef.current || !finePointerRef.current;
      activeThemeRef.current = currentTheme;
      setActiveTheme(currentTheme);
      setStaticPosterOnly(staticPosterOnlyRef.current);

      if (staticPosterOnlyRef.current) {
        detachPointerListeners();
        cancelAnimationFrameIfNeeded();
        setTracking(false);
        setVisibleTheme(null);

        for (const theme of Object.keys(videoElements) as VideoTheme[]) {
          if (!readyRef.current[theme]) {
            abortControllerRef.current[theme]?.abort();
          }
        }

        return;
      }

      attachPointerListeners();
      prepareActiveTheme(currentTheme, currentProgressRef.current);
    }

    function handleThemeMutation() {
      const nextTheme = getDocumentTheme();
      if (nextTheme !== activeThemeRef.current) {
        prepareActiveTheme(nextTheme, currentProgressRef.current);
      }
    }

    function handleVisibilityChange() {
      pageVisibleRef.current = document.visibilityState !== "hidden";

      if (!pageVisibleRef.current) {
        cancelAnimationFrameIfNeeded();
        setTracking(false);
        return;
      }

      syncActiveVideoToProgress(currentProgressRef.current);
    }

    for (const video of Object.values(videoElements)) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }

    pageVisibleRef.current = document.visibilityState !== "hidden";
    syncMotionPreferences();

    const themeObserver = new MutationObserver(handleThemeMutation);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", syncMotionPreferences);
    finePointerQuery.addEventListener("change", syncMotionPreferences);

    return () => {
      clearIdlePreload();
      detachPointerListeners();
      cancelAnimationFrameIfNeeded();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", syncMotionPreferences);
      finePointerQuery.removeEventListener("change", syncMotionPreferences);

      for (const theme of Object.keys(videoElements) as VideoTheme[]) {
        abortControllerRef.current[theme]?.abort();
        abortControllerRef.current[theme] = null;
        videoElements[theme].pause();
        videoElements[theme].removeAttribute("src");
        videoElements[theme].load();

        if (objectUrlRef.current[theme]) {
          URL.revokeObjectURL(objectUrlRef.current[theme]!);
          objectUrlRef.current[theme] = null;
        }
      }
    };
  }, [darkSrc, lightSrc]);

  return (
    <div
      className={`cursor-scrub-video ${className ?? ""}`}
      ref={rootRef}
      data-active-theme={activeTheme}
      data-video-ready={activeReady ? "true" : "false"}
      data-static-poster={staticPosterOnly ? "true" : "false"}
    >
      <div className="portraitVideoCanvas">
        <div className={`portraitLayer portraitLayerDark ${visibleVideoTheme === "dark" ? "is-video-visible" : ""}`}>
          <Image
            className="portraitPoster"
            src={posterByTheme.dark}
            alt=""
            fill
            sizes="(max-width: 680px) 92vw, (max-width: 1024px) 560px, 610px"
            loading="eager"
            aria-hidden="true"
            draggable={false}
          />
          <video
            ref={darkVideoRef}
            className="portraitVideo portraitVideoDark"
            preload="none"
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

        <div className={`portraitLayer portraitLayerLight ${visibleVideoTheme === "light" ? "is-video-visible" : ""}`}>
          <Image
            className="portraitPoster"
            src={posterByTheme.light}
            alt=""
            fill
            sizes="(max-width: 680px) 92vw, (max-width: 1024px) 560px, 610px"
            loading="eager"
            aria-hidden="true"
            draggable={false}
          />
          <video
            ref={lightVideoRef}
            className="portraitVideo portraitVideoLight"
            preload="none"
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
        </div>
      </div>
    </div>
  );
}
