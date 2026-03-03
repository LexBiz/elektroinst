import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { RevealObserver } from "@/components/RevealObserver";
import { isLocale } from "@/lib/i18n";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isUk = locale === "uk";

  return {
    title: isUk
      ? "ELEKTROINST | Електромонтаж для дому, бізнесу та промисловості"
      : "ELEKTROINST | Elektroinstalace pro domy, firmy a prumysl",
    description: isUk
      ? "Сучасні електромонтажні роботи, фотовольтаїка, ревізії та сервіс по всій Чехії."
      : "Moderni elektroinstalace, fotovoltaika, revize a servis po cele Ceske republice.",
  };
}

export function generateStaticParams() {
  return [{ locale: "cs" }, { locale: "uk" }];
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="site-shell">
      <RevealObserver />
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
