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
  const [introProgress, setIntroProgress] = useState(0);
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

    const progressTimer = window.setInterval(() => {
      setIntroProgress((progress) => {
        if (progress >= 100) {
          window.clearInterval(progressTimer);
          return 100;
        }

        return Math.min(100, progress + Math.ceil((100 - progress) / 8));
      });
    }, 70);

    const timer = window.setTimeout(() => {
      setIntroProgress(100);
      setIntroVisible(false);
      setIntroResolved(true);
    }, 2320);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(timer);
    };
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
          <div className="intro-loader" aria-live="polite">
            <span>{introProgress}%</span>
            <i>Loading</i>
          </div>
          <div className="intro-name" aria-label="PAVEL KOSTIN">
            <div className="intro-word">
              {Array.from("PAVEL KOSTIN").map((letter, index) => (
                <span style={{ animationDelay: `${index * 42}ms` }} key={`intro-name-${letter}-${index}`}>
                  <i>{letter === " " ? "\u00A0" : letter}</i>
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
