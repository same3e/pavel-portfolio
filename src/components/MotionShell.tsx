"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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
  const [transition, setTransition] = useState<{ active: boolean; title: string }>({
    active: false,
    title: ""
  });
  const transitionActiveRef = useRef(false);
  const navigationTimerRef = useRef<number | null>(null);
  const resetTimerRef = useRef<number | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);

  const clearTransitionTimers = useCallback(() => {
    for (const timerRef of [navigationTimerRef, resetTimerRef, fallbackTimerRef]) {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }, []);

  const resetTransition = useCallback(() => {
    clearTransitionTimers();
    transitionActiveRef.current = false;
    setTransition({ active: false, title: "" });
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
    resetTransition();
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
      setTransition({ active: true, title });

      navigationTimerRef.current = window.setTimeout(() => {
        router.push(route);
      }, 420);

      resetTimerRef.current = window.setTimeout(() => {
        resetTransition();
      }, 880);

      fallbackTimerRef.current = window.setTimeout(() => {
        resetTransition();
      }, 1400);
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

      <div className={`route-transition ${transition.active ? "is-active" : ""}`} aria-hidden="true">
        <p>{transition.title}</p>
      </div>
    </MotionContext.Provider>
  );
}
