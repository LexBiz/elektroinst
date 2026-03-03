import Link from "next/link";
import { Locale, localePath } from "@/lib/i18n";
import { company } from "@/lib/company";

type SiteFooterProps = {
  locale: Locale;
};

const labels = {
  cs: {
    desc: "Profesionalni elektroinstalace, revize a energeticka reseni po cele Ceske republice.",
    company: "Spolecnost",
    services: "Sluzby",
    about: "O nas",
    career: "Kariera",
    contacts: "Kontakty",
    contact: "Kontakt",
    legal: "Pravni informace",
    gdpr: "Zpracovani osobnich udaju (GDPR)",
    addressCountry: "Ceska republika",
    rights: "Vsechna prava vyhrazena.",
  },
  uk: {
    desc: "Професійні електромонтажні роботи, ревізії та енергетичні рішення по всій Чехії.",
    company: "Компанія",
    services: "Послуги",
    about: "Про нас",
    career: "Кар'єра",
    contacts: "Контакти",
    contact: "Контакт",
    legal: "Юридична інформація",
    gdpr: "Обробка персональних даних (GDPR)",
    addressCountry: "Чеська Республіка",
    rights: "Усі права захищені.",
  },
} as const;

export function SiteFooter({ locale }: SiteFooterProps) {
  const t = labels[locale];

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href={localePath(locale, "/")} className="logo footer-logo-link">
            ELEKTROINST<em style={{ fontStyle: "normal", color: "var(--brand)" }}>GROUP</em>
          </Link>
          <p className="muted">{t.desc}</p>
        </div>

        <div>
          <h4>{t.company}</h4>
          <Link href={localePath(locale, "/services")}>{t.services}</Link>
          <Link href={localePath(locale, "/about")}>{t.about}</Link>
          <Link href={localePath(locale, "/career")}>{t.career}</Link>
          <Link href={localePath(locale, "/contacts")}>{t.contacts}</Link>
        </div>

        <div>
          <h4>{t.contact}</h4>
          <p>{company.name}</p>
          <p>Telefon: {company.phone}</p>
          <p>Email: {company.email}</p>
          <p>
            Adresa: {company.street}, {company.cityLine}, {t.addressCountry}
          </p>
        </div>

        <div>
          <h4>{t.legal}</h4>
          <Link href={localePath(locale, "/privacy-policy")}>{t.gdpr}</Link>
          <p>ICO: {company.ico}</p>
          <p>DIC: {company.dic}</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} ELEKTROINSTGROUP S.R.O. {t.rights}
        </p>
      </div>
    </footer>
  );
}
