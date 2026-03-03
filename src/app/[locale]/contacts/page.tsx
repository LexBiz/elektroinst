import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { isLocale } from "@/lib/i18n";
import { company } from "@/lib/company";

type ContactsProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactsPage({ params }: ContactsProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const isUk = locale === "uk";

  return (
    <section className="section page-top">
      <div className="container">
        <p className="kicker">{isUk ? "Контакти" : "Kontakty"}</p>
        <h1>{isUk ? "Готові обговорити ваш проєкт" : "Jsme pripraveni na vas projekt"}</h1>
        <p className="lead">
          {isUk
            ? "Зателефонуйте, напишіть або залиште запит у формі. Зазвичай відповідаємо того ж дня."
            : "Zavolejte, napiste nebo vyplnte poptavkovy formular. Obvykle odpovidame jeste ten samy den."}
        </p>

        <div className="grid grid-2">
          <article className="card contact-card">
            <h3>{isUk ? "Контактні дані" : "Kontaktni udaje"}</h3>
            <p>
              <strong>{isUk ? "Firma:" : "Firma:"}</strong> {company.name}
            </p>
            <p>
              <strong>{isUk ? "Телефон:" : "Telefon:"}</strong> {company.phone}
            </p>
            <p>
              <strong>E-mail:</strong> {company.email}
            </p>
            <p>
              <strong>{isUk ? "Адреса:" : "Adresa:"}</strong> {company.street}, {company.cityLine},{" "}
              {isUk ? "Чеська Республіка" : "Ceska republika"}
            </p>
            <p>
              <strong>ICO:</strong> {company.ico}
            </p>
            <p>
              <strong>DIC:</strong> {company.dic}
            </p>
            <p className="muted">
              {isUk
                ? "Для термінового сервісу телефонуйте напряму. Для розрахунку проєкту краще використати форму."
                : "Pro urgentni servis volejte prosim primo na telefon. Pro poptavky je idealni formular vedle."}
            </p>
          </article>

          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}
