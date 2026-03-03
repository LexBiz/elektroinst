import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/lib/i18n";

type AboutProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: AboutProps): Promise<Metadata> {
  const { locale } = await params;
  const uk = locale === "uk";
  return {
    title: uk ? "Про нас | ELEKTROINST" : "O nas | ELEKTROINST",
    description: uk
      ? "Elektroinst Group s.r.o. — чеська компанія з електромонтажу та проєктування. Власний автопарк, сертифіковані фахівці."
      : "Elektroinst Group s.r.o. — česká firma pro elektroinstalace a projektování. Vlastní vozový park, certifikovaní specialisté.",
  };
}

export default async function AboutPage({ params }: AboutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const uk = locale === "uk";

  const values = uk
    ? [
        { icon: "🛡️", title: "Безпека",     desc: "Всі роботи виконуємо строго за чеськими нормами ČSN і вимогами BOZP." },
        { icon: "🤝", title: "Надійність",  desc: "Дотримуємось домовленостей, дедлайнів і погодженого обсягу робіт." },
        { icon: "💡", title: "Інновації",   desc: "Застосовуємо сучасні технології, які дають клієнту реальну вигоду й економію." },
        { icon: "📞", title: "Комунікація", desc: "На зв'язку на кожному етапі — жодних зникнень і затримок відповіді." },
      ]
    : [
        { icon: "🛡️", title: "Bezpečnost",   desc: "Vše realizujeme striktně dle českých norem ČSN a požadavků BOZP." },
        { icon: "🤝", title: "Spolehlivost", desc: "Dodržujeme dohodnuté termíny, rozsah prací i cenový návrh." },
        { icon: "💡", title: "Inovace",      desc: "Nasazujeme moderní technologie, které zákazníkovi přinášejí reálné úspory." },
        { icon: "📞", title: "Komunikace",   desc: "Jsme k dispozici v každé fázi projektu — bez zbytečného čekání." },
      ];

  return (
    <>
      {/* ─── LOGO SHOWCASE ─── */}
      <section className="logo-showcase-section">
        <div className="container logo-showcase-inner">
          <div className="logo-showcase-text reveal">
            <p className="kicker">{uk ? "Про нас" : "O nás"}</p>
            <h1>
              {uk ? "Elektroinst Group s.r.o." : "Elektroinst Group s.r.o."}
            </h1>
            <p className="lead">
              {uk
                ? "Ми — чеська компанія з електромонтажу та проєктування. Білий Mercedes Vito з написом «ELEKTROINSTALACE» на борту — символ нашої готовності приїхати на будь-який об'єкт по всій Чехії вчасно та підготовленими."
                : 'Jsme česká firma pro elektroinstalace a projektování. Bílý Mercedes Vito s nápisem \u201eELEKTROINSTALACE\u201c na boku symbolizuje naši připravenost dorazit na jakýkoliv objekt v celé České republice — včas a plně vybaveni.'}
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: "0.97rem" }}>
              {uk
                ? "Elektroinst Group s.r.o. заснована в Празі (Praha 10 — Pitkovice). Від першого проєкту до фінальної ревізії ми несемо повну відповідальність за кожен об'єкт. Власний автопарк, сертифіковані техніки й проєктанти з чинними допусками — це не слова, це наша повсякденна реальність."
                : "Elektroinst Group s.r.o. sídlí v Praze (Praha 10 — Pitkovice). Od prvního projektu po finální revizi neseme plnou odpovědnost za každý objekt. Vlastní vozový park, certifikovaní technici a projektanti s platnými oprávněními — to není jen marketing, to je naše každodenní realita."}
            </p>
            <div className="cta-row">
              <Link href={localePath(locale, "/services")} className="btn btn-primary">
                {uk ? "Наші послуги" : "Naše služby"}
              </Link>
              <Link href={localePath(locale, "/contacts")} className="btn btn-outline">
                {uk ? "Написати нам" : "Napsat nám"}
              </Link>
            </div>
          </div>

          <div className="logo-showcase-logo reveal reveal-d2">
            <div className="logo-gold-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.jpg" alt="Elektroinst Group s.r.o." />
            </div>
            <p className="logo-company-name">Elektroinst Group s.r.o.</p>
            <p className="logo-company-sub">
              {uk ? "Прага · Чехія" : "Praha · Česká republika"}
            </p>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <div className="stats-strip">
        {[
          { num: "350+", label: uk ? "завершених проєктів" : "dokončených projektů" },
          { num: "12",   label: uk ? "років досвіду"       : "let praxe v oboru"    },
          { num: "24/7", label: uk ? "технічна підтримка"  : "technická podpora"    },
          { num: "100%", label: uk ? "сертифіковані спеці" : "certifikovaní spec."  },
        ].map((s) => (
          <div className="stat-item" key={s.label}>
            <strong>{s.num}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ─── VAN / AUTO ─── */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "center", gap: "2.5rem" }}>
            <div className="reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/auto.jpg"
                alt={uk ? "Автопарк ELEKTROINST" : "Vozový park ELEKTROINST"}
                style={{ width: "100%", borderRadius: "var(--radius)", objectFit: "cover", height: "420px" }}
              />
            </div>
            <div className="reveal reveal-d2">
              <p className="kicker">{uk ? "Наш автопарк" : "Náš vozový park"}</p>
              <h2>
                {uk
                  ? "Завжди готові до виїзду — будь-де в Чехії"
                  : "Vždy připraveni na výjezd — kdekoliv v ČR"}
              </h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75, marginBottom: "1.2rem" }}>
                {uk
                  ? "Наш сервісний автопарк повністю оснащений інструментом, кабелями та матеріалами. Ми не втрачаємо час на дозбір — команда приїжджає підготовленою і виконує роботу з першого разу."
                  : "Náš servisní vozový park je plně vybaven nářadím, kabely a materiálem. Neztrácíme čas doplňováním — tým přijíždí připravený a práci zvládá napoprvé."}
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.55rem", listStyle: "none", padding: 0 }}>
                {(uk
                  ? ["Виїзди по всій Чехії", "Повне оснащення в кожному авто", "Команда в постійній готовності 24/7", "Mercedes-Benz Vito — надійний і вмісткий"]
                  : ["Výjezdy po celé České republice", "Plné vybavení v každém vozidle", "Tým v neustálé pohotovosti 24/7", "Mercedes-Benz Vito — spolehlivý a prostorný"]
                ).map((item) => (
                  <li key={item} style={{ display: "flex", gap: "0.65rem", color: "var(--muted)", fontSize: "0.93rem" }}>
                    <span style={{ color: "var(--brand)", flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── APPROACH ─── */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-head reveal">
            <p className="kicker">{uk ? "Наш підхід" : "Náš přístup"}</p>
            <h2>{uk ? "Від першого дзвінка до фінального підпису" : "Od prvního telefonátu po finální podpis"}</h2>
          </div>
          <div className="grid grid-2" style={{ gap: "1.5rem" }}>
            {(uk
              ? [
                  { n: "01", t: "Аналіз і ТЗ", d: "Безкоштовно з'ясовуємо потреби клієнта та технічні умови об'єкта." },
                  { n: "02", t: "Прозора пропозиція", d: "Готуємо детальний план і кошторис без прихованих статей витрат." },
                  { n: "03", t: "Реалізація", d: "Виконуємо роботи якісно, у погоджений термін, з активним зворотним зв'язком." },
                  { n: "04", t: "Ревізія та здача", d: "Проводимо ревізію, передаємо повний пакет документів і залишаємось на сервісній підтримці." },
                ]
              : [
                  { n: "01", t: "Analýza a TZ", d: "Zdarma zmapujeme potřeby zákazníka a technické podmínky objektu." },
                  { n: "02", t: "Transparentní nabídka", d: "Připravíme detailní plán a cenový návrh bez skrytých položek." },
                  { n: "03", t: "Realizace", d: "Provedeme práce kvalitně, v dohodnutém termínu s aktivní zpětnou vazbou." },
                  { n: "04", t: "Revize a předání", d: "Provedeme revizi, předáme kompletní dokumentaci a zůstaneme k dispozici pro servis." },
                ]
            ).map((step) => (
              <div key={step.n} className="frame card reveal" style={{ display: "flex", gap: "1.2rem", alignItems: "flex-start" }}>
                <span style={{
                  fontSize: "2rem", fontWeight: 900,
                  color: "rgba(255 213 0 / 0.15)",
                  lineHeight: 1, flexShrink: 0, minWidth: "2.5rem",
                }}>
                  {step.n}
                </span>
                <div>
                  <h3 style={{ marginBottom: "0.4rem" }}>{step.t}</h3>
                  <p style={{ color: "var(--muted)", margin: 0, fontSize: "0.92rem" }}>{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="kicker">{uk ? "Наші цінності" : "Naše hodnoty"}</p>
            <h2>{uk ? "Принципи, якими ми керуємось" : "Principy, které dodržujeme"}</h2>
          </div>
          <div className="grid grid-4">
            {values.map((v, i) => (
              <div key={v.title} className={`frame card reveal reveal-d${i + 1}`} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>{v.icon}</div>
                <h3>{v.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-band reveal">
        <div className="container">
          <p className="kicker">{uk ? "Познайомимось" : "Pojďme se poznat"}</p>
          <h2>{uk ? "Готові до співпраці?" : "Připraveni ke spolupráci?"}</h2>
          <p>
            {uk
              ? "Зв'яжіться з нами — обговоримо ваш проєкт і відповімо на всі питання."
              : "Kontaktujte nás — probereme váš projekt a zodpovíme všechny otázky."}
          </p>
          <Link href={localePath(locale, "/contacts")} className="btn btn-dark">
            {uk ? "Зв'язатись" : "Kontaktovat nás"}
          </Link>
        </div>
      </section>
    </>
  );
}
