"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Locale, localePath } from "@/lib/i18n";

type SiteHeaderProps = { locale: Locale };

const NAV_LABELS = {
  cs: { home: "Domu", services: "Sluzby", about: "O nas", career: "Kariera", contacts: "Kontakty", cta: "Poptavka", menu: "Menu" },
  uk: { home: "Головна", services: "Послуги", about: "Про нас", career: "Кар'єра", contacts: "Контакти", cta: "Запит", menu: "Меню" },
} as const;

export function SiteHeader({ locale }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = NAV_LABELS[locale];
  const close = () => setOpen(false);

  useEffect(() => {
    close();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: localePath(locale, "/"),           label: t.home      },
    { href: localePath(locale, "/services"),   label: t.services  },
    { href: localePath(locale, "/about"),      label: t.about     },
    { href: localePath(locale, "/career"),     label: t.career    },
    { href: localePath(locale, "/contacts"),   label: t.contacts  },
  ];

  return (
    <header className="header">
      <div className="container nav-row">

        {/* Logo */}
        <Link href={localePath(locale, "/")} className="logo" onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpg"
            alt="ELEKTROINSTGROUP S.R.O."
            className="logo-img"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
          <span className="logo-wordmark">
            ELEKTROINST<em>GROUP</em>
          </span>
        </Link>

        {/* Hamburger */}
        <button
          className="nav-toggle"
          aria-label={t.menu}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>

        {/* Nav */}
        <nav id="site-nav" className={`nav ${open ? "open" : ""}`}>
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher locale={locale} />
          <Link
            href={localePath(locale, "/contacts")}
            className="btn btn-primary btn-sm"
            onClick={close}
          >
            {t.cta}
          </Link>
        </nav>

      </div>
      {open ? <button className="nav-backdrop" aria-label="Close menu" onClick={close} /> : null}
    </header>
  );
}
