"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { contact, navigation, site } from "@/content/portfolio";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) {
      closeButtonRef.current?.focus();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Pavel portfolio home">
          PAVEL
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link href={`/${item.href}`} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="availability">
          <span aria-hidden="true" />
          {site.availability}
        </div>
        <button
          ref={closeButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <div className="mobile-menu-mark" aria-hidden="true">
          <span>P</span>
          <span>K</span>
        </div>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link href={`/${item.href}`} key={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-meta">
          <p>{site.location}</p>
          <p>{site.availability}</p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </div>
    </>
  );
}

export function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="footer">
      <p>Pavel Kostin - Independent Web Designer & Developer</p>
      <p>{site.location}</p>
      <p>Portfolio design and development by Pavel - {year}</p>
      <p className="footer-pk" aria-hidden="true">PK</p>
      <Link href="/">Back home</Link>
    </footer>
  );
}

export function ContactLink({ label, href }: { label: string; href: string }) {
  const finalHref =
    label === "Email" && !href.startsWith("mailto:")
      ? `mailto:${href}`
      : href;

  return (
    <a className="contact-row" href={finalHref}>
      <span>{label}</span>
      <span>Open</span>
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
