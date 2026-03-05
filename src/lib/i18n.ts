export const locales = ["cs", "uk"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "cs") {
    return normalized;
  }
  if (normalized === "/") {
    return "/uk";
  }
  return `/uk${normalized}`;
}
