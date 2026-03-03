import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { company } from "@/lib/company";
import { isLocale, localePath } from "@/lib/i18n";
import { getVacancies } from "@/lib/storage";

type CareerProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: CareerProps): Promise<Metadata> {
  const { locale } = await params;
  const uk = locale === "uk";
  return {
    title: uk ? "Кар'єра | ELEKTROINST" : "Kariéra | ELEKTROINST",
    description: uk
      ? "Вакансії в ELEKTROINST. Шукаємо людей, які хочуть рости разом з нами."
      : "Kariéra v ELEKTROINST. Hledáme lidi, kteří chtějí růst s námi.",
  };
}

type CareerJob = {
  id: string;
  title: string;
  type: string;
  location: string;
  items: string[];
};

function toItems(text: string) {
  return text
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const dynamic = "force-dynamic";

export default async function CareerPage({ params }: CareerProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const uk = locale === "uk";
  const phoneRaw = company.phone;
  const phoneDigits = phoneRaw.replace(/\D/g, "");
  const email = company.email;

  const rawVacancies = await getVacancies();
  const jobs: CareerJob[] = rawVacancies.map((vacancy) => ({
    id: vacancy.id,
    title: uk
      ? vacancy.titleUk || vacancy.titleCs || "Nova vakansiia"
      : vacancy.titleCs || vacancy.titleUk || "Nova pozice",
    type: vacancy.type || (uk ? "Povnа / chastkova zainiatist" : "HPP / ICO"),
    location: vacancy.location || (uk ? "Cheska Respublika" : "Ceska republika"),
    items: toItems(uk ? vacancy.descriptionUk || vacancy.descriptionCs : vacancy.descriptionCs || vacancy.descriptionUk),
  }));

  const perks = uk
    ? [
        { icon: "📈", title: "Стабільність",    text: "Стабільні проєкти і довгострокова співпраця без сезонних перерв." },
        { icon: "💰", title: "Оплата",           text: "Конкурентна оплата відповідно до реального досвіду і кваліфікації." },
        { icon: "🎓", title: "Навчання",         text: "Тренінги, курси та підтримка сертифікацій за рахунок компанії." },
        { icon: "🤝", title: "Команда",          text: "Командна атмосфера, де цінується якість та взаємоповага." },
        { icon: "🚐", title: "Оснащення",        text: "Власний автопарк, сучасний інструмент і матеріали — все є." },
        { icon: "📍", title: "Виїзди",           text: "Проєкти по всій Чехії — всі витрати на виїзди компенсуються." },
      ]
    : [
        { icon: "📈", title: "Stabilita",        text: "Stabilní projekty a dlouhodobá spolupráce bez sezónních výpadků." },
        { icon: "💰", title: "Odměna",           text: "Nadstandardní ohodnocení odpovídající skutečným zkušenostem." },
        { icon: "🎓", title: "Vzdělávání",       text: "Školení, kurzy a podpora certifikací na náklady společnosti." },
        { icon: "🤝", title: "Tým",              text: "Pracovní prostředí, kde mají slovo kvalita i vzájemný respekt." },
        { icon: "🚐", title: "Vybavení",         text: "Vlastní vozový park, moderní nářadí a materiál — vše zajistíme." },
        { icon: "📍", title: "Výjezdy",          text: "Projekty po celé ČR — veškeré cestovní náklady se proplácejí." },
      ];

  return (
    <>
      {/* ─── HERO ─── */}
      <div className="photo-banner" style={{ height: "440px" }}>
        <div
          className="photo-banner-bg"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="photo-banner-overlay" />
        <div className="container photo-banner-content" style={{ paddingTop: "calc(var(--header-h) + 2rem)" }}>
          <p className="kicker">{uk ? "Кар'єра" : "Kariéra"}</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            {uk ? "Ростіть разом з нами" : "Rostěte s námi"}
          </h1>
          <p className="lead">
            {uk
              ? "Шукаємо людей, яким важлива якість, команда і розвиток в електротехнічному обгрунтуванні."
              : "Hledáme lidi, kterým záleží na kvalitě, týmu a profesním růstu v elektrotechnickém oboru."}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">

          {/* ─── VACANCIES ─── */}
          {jobs.length > 0 ? (
            <>
              <div className="section-head reveal">
                <p className="kicker">{uk ? "Відкриті вакансії" : "Otevřené pozice"}</p>
                <h2>{uk ? "Приєднуйтесь до команди" : "Připojte se k týmu"}</h2>
              </div>
              <div className="jobs-grid">
                {jobs.map((job, i) => {
                  const msg = uk
                    ? `Dobryi den, chcu vidhuknutysia na vakansiiu: ${job.title}`
                    : `Dobry den, mam zajem o pozici: ${job.title}`;
                  const whatsappHref = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(msg)}`;
                  return (
                  <article key={job.id} className={`job-card frame reveal reveal-d${Math.min((i % 2) + 1, 2)}`}>
                    <div className="job-card-top">
                      <span className="job-index">{String(i + 1).padStart(2, "0")}</span>
                      <div className="job-badges">
                        <span className="badge-type">{job.type}</span>
                        <span className="badge-location">📍 {job.location}</span>
                      </div>
                    </div>
                    <h3 className="job-title">{job.title}</h3>
                    {job.items.length > 0 && (
                      <ul className="job-list">
                        {job.items.map((item) => (
                          <li key={item}>
                            <span>→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="job-footer">
                      <div className="job-actions">
                        <a href={`tel:${phoneRaw}`} className="btn btn-outline">
                          {uk ? "Zatelefonuvaty" : "Zavolat"}
                        </a>
                        <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn btn-primary">
                          WhatsApp
                        </a>
                        <a href={`mailto:${email}?subject=${encodeURIComponent(job.title)}`} className="btn btn-outline">
                          E-mail
                        </a>
                      </div>
                    </div>
                  </article>
                  );
                })}
              </div>
            </>
          ) : (
            /* ─── NO VACANCIES ─── */
            <div className="no-jobs-block reveal">
              <div className="no-jobs-frame frame">
                <span className="no-jobs-icon">🔍</span>
                <h2>
                  {uk ? "Наразі відкритих вакансій немає" : "Momentálně žádné volné pozice"}
                </h2>
                <p>
                  {uk
                    ? "Але ми завжди раді знайомитись із хорошими фахівцями. Надішліть CV — збережемо у базі та зв'яжемось при першій нагоді."
                    : "Ale vždy rádi poznáme šikovné odborníky. Pošlete nám CV — uložíme ho a ozveme se, jakmile se pozice uvolní."}
                </p>
                <Link href={localePath(locale, "/contacts")} className="btn btn-primary">
                  {uk ? "Надіслати CV" : "Poslat CV"}
                </Link>
              </div>
            </div>
          )}

          {/* ─── PERKS ─── */}
          <div style={{ marginTop: "5rem" }}>
            <div className="section-head reveal">
              <p className="kicker">{uk ? "Що ми пропонуємо" : "Co nabízíme"}</p>
              <h2>{uk ? "Умови роботи" : "Pracovní podmínky"}</h2>
            </div>
            <div className="perks-grid">
              {perks.map((p, i) => (
                <div key={p.title} className={`perk-card card reveal reveal-d${Math.min((i % 3) + 1, 3)}`}>
                  <span className="perk-icon">{p.icon}</span>
                  <h4 className="perk-title">{p.title}</h4>
                  <p className="perk-text">{p.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
