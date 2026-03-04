"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const basePath = segments.length > 1 ? `/${segments.slice(1).join("/")}` : "";

  const csPath = `/cs${basePath}`;
  const ukPath = `/uk${basePath}`;

  return (
    <div className="lang-switch" aria-label="Language switcher">
      <Link href={csPath} className={locale === "cs" ? "active" : ""}>
        CZ
      </Link>
      <Link href={ukPath} className={locale === "uk" ? "active" : ""}>
        UA
      </Link>
    </div>
  );
}
