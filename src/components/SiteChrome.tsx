"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { LetterSwapText } from "@/components/LetterSwapText";
import { contact, navigation, site } from "@/content/portfolio";

type ViewTransitionHandle = {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition: () => void;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (updateCallback: () => void) => ViewTransitionHandle;
};

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [themeTransitioning, setThemeTransitioning] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const themeTransitioningRef = useRef(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const initialTheme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) {
      closeButtonRef.current?.focus();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !menuOpen) {
        return;
      }

      const menu = document.getElementById("mobile-menu");
      const focusable = Array.from(
        menu?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  function applyTheme(nextTheme: "light" | "dark") {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  }

  function toggleTheme() {
    if (themeTransitioningRef.current) {
      return;
    }

    const nextTheme = theme === "dark" ? "light" : "dark";
    const button = themeButtonRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const documentWithTransition = document as DocumentWithViewTransition;

    if (!button || reduceMotion || !documentWithTransition.startViewTransition) {
      applyTheme(nextTheme);
      return;
    }

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.style.setProperty("--theme-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-y", `${y}px`);
    document.documentElement.style.setProperty("--theme-radius", `${radius}px`);

    themeTransitioningRef.current = true;
    setThemeTransitioning(true);
    const transition = documentWithTransition.startViewTransition(() => {
      flushSync(() => applyTheme(nextTheme));
    });

    transition.finished.finally(() => {
      themeTransitioningRef.current = false;
      setThemeTransitioning(false);
    });
  }

  function closeMenu() {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Pavel portfolio home">
          <LetterSwapText label="PAVEL · DEVELOP" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link href={`/${item.href}`} key={item.href}>
              <LetterSwapText label={item.label} />
            </Link>
          ))}
        </nav>
        <div className="availability">
          <span aria-hidden="true" />
          {site.availability}
        </div>
        <button
          ref={themeButtonRef}
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          disabled={themeTransitioning}
          onClick={toggleTheme}
        >
          <span className="theme-icon theme-icon-sun" aria-hidden="true" />
          <span className="theme-icon theme-icon-moon" aria-hidden="true" />
        </button>
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <LetterSwapText label={menuOpen ? "Close" : "Menu"} />
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu is-open" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button ref={closeButtonRef} className="mobile-menu-close" type="button" onClick={closeMenu}>
            <LetterSwapText label="Close" />
          </button>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link href={`/${item.href}`} key={item.href} onClick={closeMenu}>
                <LetterSwapText label={item.label} />
              </Link>
            ))}
          </nav>
          <div className="mobile-menu-meta">
            <p>{site.location}</p>
            <p>{site.availability}</p>
            <button type="button" onClick={toggleTheme}>
              <LetterSwapText label={theme === "dark" ? "Light mode" : "Dark mode"} />
            </button>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
      )}
    </>
  );
}

export function Footer({ showBackHome = false }: { showBackHome?: boolean }) {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="footer">
      <p>Pavel Kostin - Independent Web Designer & Developer</p>
      <p>{site.location}</p>
      <p>Portfolio design and development by Pavel - {year}</p>
      {showBackHome ? (
        <Link href="/">
          <LetterSwapText label="Back home" />
        </Link>
      ) : null}
    </footer>
  );
}

export function ContactLink({ label, href }: { label: string; href: string }) {
  const finalHref =
    label === "Email" && !href.startsWith("mailto:")
      ? `mailto:${href}`
      : href;
  const isExternal = !finalHref.startsWith("mailto:");

  return (
    <a
      className="contact-row"
      href={finalHref}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <span>{label}</span>
      <LetterSwapText label="Open" />
    </a>
  );
}

export function ContactLinks() {
  return (
    <div className="contact-list">
      <ContactLink label="Email" href={contact.email} />
      <ContactLink label="Instagram" href={contact.instagram} />
      <ContactLink label="Telegram" href={contact.telegram} />
      <ContactLink label="WhatsApp" href={contact.whatsapp} />
    </div>
  );
}
