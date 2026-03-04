export const locales = ["cs", "uk"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localePath(locale: Locale, path: string): string {
  if (!path.startsWith("/")) {
    return `/${locale}/${path}`;
  }

  if (path === "/") {
    return `/${locale}`;
  }

  return `/${locale}${path}`;
}
