"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { LetterSwapText } from "@/components/LetterSwapText";
import { contact, dictionary, getNavigation, getSite, locales, type Locale, withLocale } from "@/content/portfolio";

function getAnchorHref(locale: Locale, hash: string) {
  return `${withLocale(locale, "/")}${hash}`;
}

function LanguageSwitcher({ locale, onNavigate }: { locale: Locale; onNavigate?: () => void }) {
  const pathname = usePathname() || "/";

  return (
    <nav className={`language-switcher language-switcher--${locale}`} aria-label={dictionary[locale].languageAria}>
      {locales.map((item) => (
        <Link
          className={item === locale ? "is-active" : ""}
          href={withLocale(item, pathname)}
          hrefLang={item}
          aria-current={item === locale ? "page" : undefined}
          key={item}
          onClick={onNavigate}
        >
          <LetterSwapText label={item.toUpperCase()} />
        </Link>
      ))}
      <span className="language-switcher-pill" aria-hidden="true" />
    </nav>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const currentSite = getSite(locale);
  const copy = dictionary[locale];
  const navigation = getNavigation(locale);

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

  function closeMenu() {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }

  return (
    <>
      <header className="site-header">
        <Link className="brand" href={withLocale(locale, "/")} aria-label={copy.brandAria}>
          <span className="brand-label brand-label--desktop">
            <LetterSwapText label={copy.desktopBrand} />
          </span>
          <span className="brand-label brand-label--mobile">
            <LetterSwapText label={copy.mobileBrand} />
          </span>
        </Link>
        <nav className="desktop-nav" aria-label={copy.navAria}>
          {navigation.map((item) => (
            <Link href={getAnchorHref(locale, item.href)} key={item.href}>
              <LetterSwapText label={item.label} />
            </Link>
          ))}
        </nav>
        <LanguageSwitcher locale={locale} />
        <div className="availability">
          <span aria-hidden="true" />
          {currentSite.availability}
        </div>
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <LetterSwapText label={menuOpen ? copy.close : copy.menu} />
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu is-open" id="mobile-menu" role="dialog" aria-modal="true" aria-label={copy.mobileNavAria}>
          <button ref={closeButtonRef} className="mobile-menu-close" type="button" onClick={closeMenu}>
            <LetterSwapText label={copy.close} />
          </button>
          <LanguageSwitcher locale={locale} onNavigate={closeMenu} />
          <nav aria-label={copy.mobileNavAria}>
            {navigation.map((item) => (
              <Link href={getAnchorHref(locale, item.href)} key={item.href} onClick={closeMenu}>
                <LetterSwapText label={item.label} />
              </Link>
            ))}
          </nav>
          <div className="mobile-menu-meta">
            <p>{currentSite.location}</p>
            <p>{currentSite.availability}</p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
      )}
    </>
  );
}

export function Footer({ locale, showBackHome = false }: { locale: Locale; showBackHome?: boolean }) {
  const year = useMemo(() => new Date().getFullYear(), []);
  const currentSite = getSite(locale);
  const copy = dictionary[locale];

  return (
    <footer className="footer">
      <p>{copy.footerRole}</p>
      <p>{currentSite.location}</p>
      <p>{copy.footerCredit} - {year}</p>
      {showBackHome ? (
        <Link href={withLocale(locale, "/")}>
          <LetterSwapText label={copy.backHome} />
        </Link>
      ) : null}
    </footer>
  );
}

export function ContactLink({ label, actionLabel, href }: { label: string; actionLabel: string; href: string }) {
  const finalHref =
    href === contact.email && !href.startsWith("mailto:")
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
      <LetterSwapText label={actionLabel} />
    </a>
  );
}

export function ContactLinks({ locale }: { locale: Locale }) {
  const copy = dictionary[locale];

  return (
    <div className="contact-list">
      <ContactLink label={copy.email} actionLabel={copy.open} href={contact.email} />
      <ContactLink label="Instagram" actionLabel={copy.open} href={contact.instagram} />
      <ContactLink label="Telegram" actionLabel={copy.open} href={contact.telegram} />
      <ContactLink label="WhatsApp" actionLabel={copy.open} href={contact.whatsapp} />
    </div>
  );
}
