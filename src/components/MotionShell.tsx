"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type TransitionPhase = "idle" | "covering" | "covered" | "revealing";

type RouteTransitionState = {
  phase: TransitionPhase;
  title: string;
  route: string;
};

type MotionContextValue = {
  openProject: (title: string, route: string) => void;
  reducedMotion: boolean;
};

const MotionContext = createContext<MotionContextValue | null>(null);

export function useMotionShell() {
  const value = useContext(MotionContext);
  if (!value) {
    throw new Error("useMotionShell must be used inside MotionShell");
  }
  return value;
}

export function MotionShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [transition, setTransition] = useState<RouteTransitionState>({
    phase: "idle",
    title: "",
    route: ""
  });
  const transitionActiveRef = useRef(false);
  const coverTimerRef = useRef<number | null>(null);
  const navigationTimerRef = useRef<number | null>(null);
  const resetTimerRef = useRef<number | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const targetRouteRef = useRef("");
  const previousPathnameRef = useRef<string | null>(null);

  const clearTransitionTimers = useCallback(() => {
    for (const timerRef of [coverTimerRef, navigationTimerRef, resetTimerRef, fallbackTimerRef]) {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }, []);

  const resetTransition = useCallback(() => {
    clearTransitionTimers();
    transitionActiveRef.current = false;
    targetRouteRef.current = "";
    setTransition({ phase: "idle", title: "", route: "" });
  }, [clearTransitionTimers]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);

    function handleChange(event: MediaQueryListEvent) {
      setReducedMotion(event.matches);
      if (event.matches) {
        resetTransition();
      }
    }

    media.addEventListener("change", handleChange);
    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [resetTransition]);

  useEffect(() => resetTransition, [resetTransition]);

  useEffect(() => {
    if (previousPathnameRef.current === null) {
      previousPathnameRef.current = pathname;
      return;
    }

    previousPathnameRef.current = pathname;

    if (!transitionActiveRef.current || !targetRouteRef.current) {
      return;
    }

    setTransition((current) => ({
      ...current,
      phase: "revealing"
    }));

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      resetTransition();
    }, 760);
  }, [pathname, resetTransition]);

  const openProject = useCallback(
    (title: string, route: string) => {
      if (reducedMotion) {
        router.push(route);
        return;
      }

      if (transitionActiveRef.current) {
        return;
      }

      clearTransitionTimers();
      transitionActiveRef.current = true;
      targetRouteRef.current = route;
      setTransition({ phase: "covering", title, route });

      coverTimerRef.current = window.setTimeout(() => {
        setTransition((current) => ({
          ...current,
          phase: "covered"
        }));
      }, 560);

      navigationTimerRef.current = window.setTimeout(() => {
        router.push(route);
      }, 700);

      fallbackTimerRef.current = window.setTimeout(() => {
        resetTransition();
      }, 2200);
    },
    [clearTransitionTimers, reducedMotion, resetTransition, router]
  );

  const value = useMemo<MotionContextValue>(
    () => ({
      reducedMotion,
      openProject
    }),
    [openProject, reducedMotion]
  );

  return (
    <MotionContext.Provider value={value}>
      <div className="site-ready">{children}</div>

      <div className={`route-transition route-transition--${transition.phase}`} aria-hidden="true">
        <div className="route-transition-columns">
          {Array.from({ length: 12 }).map((_, index) => (
            <span
              className="route-transition-column"
              style={
                {
                  "--column-index": index,
                  "--column-reverse-index": 11 - index,
                  "--column-delay": `${index * 26}ms`,
                  "--column-reverse-delay": `${(11 - index) * 24}ms`
                } as React.CSSProperties
              }
              key={index}
            />
          ))}
        </div>
        <p>{transition.title}</p>
      </div>
    </MotionContext.Provider>
  );
}
