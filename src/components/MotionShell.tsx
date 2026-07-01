"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [introVisible, setIntroVisible] = useState(true);
  const [introResolved, setIntroResolved] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [transition, setTransition] = useState<{ active: boolean; title: string }>({
    active: false,
    title: ""
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);

    if (media.matches) {
      setIntroVisible(false);
      setIntroResolved(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setIntroVisible(false);
      setIntroResolved(true);
    }, 1780);

    return () => window.clearTimeout(timer);
  }, []);

  const value = useMemo<MotionContextValue>(
    () => ({
      reducedMotion,
      openProject(title, route) {
        if (reducedMotion) {
          router.push(route);
          return;
        }

        setTransition({ active: true, title });
        window.setTimeout(() => router.push(route), 520);
        window.setTimeout(() => {
          setTransition((current) => ({ ...current, active: false }));
        }, 920);
      }
    }),
    [reducedMotion, router]
  );

  function skipIntro() {
    setIntroVisible(false);
    setIntroResolved(true);
  }

  return (
    <MotionContext.Provider value={value}>
      <div className={introResolved ? "site-ready" : "site-entering"}>{children}</div>

      {introVisible && (
        <div className="intro-overlay" role="dialog" aria-label="Pavel Kostin intro animation">
          <button type="button" onClick={skipIntro}>
            Skip
          </button>
          <div className="intro-name" aria-label="PAVEL KOSTIN">
            <div className="intro-word">
              {"PAVEL".split("").map((letter, index) => (
                <span style={{ animationDelay: `${index * 55}ms` }} key={`pavel-${letter}-${index}`}>
                  <i>{letter}</i>
                </span>
              ))}
            </div>
            <div className="intro-word intro-word-last">
              {"KOSTIN".split("").map((letter, index) => (
                <span style={{ animationDelay: `${310 + index * 46}ms` }} key={`kostin-${letter}-${index}`}>
                  <i>{letter}</i>
                </span>
              ))}
            </div>
          </div>
          <p>DESIGN & DEVELOPMENT<br />TBILISI / WORLDWIDE</p>
          <div className="intro-line">
            <span />
          </div>
          <div className="intro-pk" aria-hidden="true">
            <span>P</span>
            <span>K</span>
          </div>
        </div>
      )}

      <div className={`route-transition ${transition.active ? "is-active" : ""}`} aria-hidden="true">
        <p>{transition.title}</p>
      </div>
    </MotionContext.Provider>
  );
}
