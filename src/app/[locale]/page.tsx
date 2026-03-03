import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/lib/i18n";
import { VehicleImage } from "@/components/VehicleImage";

type HomeProps = { params: Promise<{ locale: string }> };

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const uk = locale === "uk";

  const services = uk
    ? [
        { icon: "⚡", title: "Електромонтаж",       desc: "Повний монтаж силових та слабкострумових систем для будинків, офісів і промислових об'єктів. Від проєкту до здачі." },
        { icon: "☀️", title: "Фотовольтаїка",       desc: "Проєкт, монтаж, акумулятори та інтелектуальний моніторинг сонячних систем для максимальної економії." },
        { icon: "🚗", title: "Зарядні станції EV",  desc: "Встановлення wallbox і комерційних зарядних станцій для електромобілів — вдома та на підприємстві." },
        { icon: "📋", title: "Ревізія та сервіс",   desc: "Початкові і регулярні ревізії, профілактика та оперативний виїзд при аваріях по всій Чехії 24/7." },
        { icon: "📡", title: "Слабкострумові системи", desc: "Мережі даних, відеоспостереження, контроль доступу та охоронна сигналізація на ключ." },
        { icon: "🏭", title: "Промислова електрика", desc: "Комплексні електросистеми для виробничих і складських об'єктів, рівень відповідальності 24/7." },
      ]
    : [
        { icon: "⚡", title: "Elektroinstalace",     desc: "Kompletní silnoproud i slaboproud pro rodinné domy, kanceláře, obchodní centra a průmyslové provozy." },
        { icon: "☀️", title: "Fotovoltaika",         desc: "Návrh, montáž, bateriová úložiště a monitoring solárních systémů pro maximální úsporu energií." },
        { icon: "🚗", title: "Nabíjecí stanice EV",  desc: "Instalace wallboxů a veřejných stanic pro elektromobily v domácnostech i firemních prostorech." },
        { icon: "📋", title: "Revize a servis",      desc: "Výchozí i periodické revize, preventivní kontroly a pohotovostní výjezdy v celé ČR nonstop." },
        { icon: "📡", title: "Slaboproud",           desc: "Datové sítě, CCTV, přístupové systémy a zabezpečovací technologie od návrhu po záruku." },
        { icon: "🏭", title: "Průmyslová elektrika", desc: "Komplexní elektrická infrastruktura pro výrobní haly a sklady v nepřetržitém provozu 24/7." },
      ];

  const steps = uk
    ? [
        { n: "01", title: "Консультація",  desc: "Безкоштовно з'ясовуємо потреби і технічні вимоги вашого об'єкта." },
        { n: "02", title: "Пропозиція",    desc: "Детальний план робіт і прозорий кошторис без прихованих витрат." },
        { n: "03", title: "Реалізація",    desc: "Якісне виконання в погоджені терміни з активною комунікацією." },
        { n: "04", title: "Здача та сервіс", desc: "Ревізія, повний пакет документів і подальша сервісна підтримка." },
      ]
    : [
        { n: "01", title: "Konzultace",    desc: "Zdarma zmapujeme vaše potřeby a technické požadavky objektu." },
        { n: "02", title: "Nabídka",       desc: "Detailní plán prací a transparentní cenový návrh bez skrytých nákladů." },
        { n: "03", title: "Realizace",     desc: "Kvalitní provedení v dohodnutém termínu s aktivní komunikací." },
        { n: "04", title: "Předání & servis", desc: "Revize, kompletní dokumentace a dlouhodobá servisní podpora." },
      ];

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-bg" />

        <div className="container hero-inner">
          <div className="hero-grid">
            <div>
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                {uk
                  ? "Сертифіковані електрики · Чехія"
                  : "Certifikovaní elektrikáři · Česká republika"}
              </div>

              <h1>
                {uk ? (
                  <>Ваша <em>електрична</em><br />інфраструктура<br />в надійних руках.</>
                ) : (
                  <>Vaše <em>elektrická</em><br />infrastruktura<br />v těch správných rukou.</>
                )}
              </h1>

              <p className="lead">
                {uk
                  ? "Від проєктування до довгострокового сервісу — реалізуємо все, що пов'язано з електрикою, для будинків, бізнесу та промисловості по всій Чехії."
                  : "Od projektu po dlouhodobý servis — realizujeme vše kolem elektřiny pro domy, firmy a průmyslové provozy po celé České republice."}
              </p>

              <div className="cta-row">
                <Link href={localePath(locale, "/contacts")} className="btn btn-primary">
                  ⚡ {uk ? "Отримати консультацію" : "Dostat nabídku zdarma"}
                </Link>
                <Link href={localePath(locale, "/services")} className="btn btn-outline">
                  {uk ? "Наші послуги" : "Naše služby"}
                </Link>
              </div>
            </div>

            <aside className="hero-card frame card">
              <h3>{uk ? "Чому обирають нас" : "Proč si vybrat nás"}</h3>
              <ul>
                {(uk
                  ? ["Сертифіковані техніки та ревізори", "Прозорий бюджет без сюрпризів", "Один партнер від проєкту до сервісу", "Виїзди по всій Чехії"]
                  : ["Certifikovaní technici a revizoři", "Transparentní cena bez překvapení", "Jeden partner od projektu po servis", "Výjezdy po celé České republice"]
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS STRIP
      ═══════════════════════════════════════════ */}
      <div className="stats-strip">
        {[
          { num: "350+", label: uk ? "завершених проєктів" : "dokončených projektů" },
          { num: "12",   label: uk ? "років досвіду"       : "let praxe v oboru"    },
          { num: "24/7", label: uk ? "технічна підтримка"  : "technická podpora"    },
          { num: "100%", label: uk ? "сертифіковані спеці" : "certifikovaní specialisté" },
        ].map((s) => (
          <div className="stat-item" key={s.label}>
            <strong>{s.num}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════
          SERVICES OVERVIEW
      ═══════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="kicker">{uk ? "Що ми робимо" : "Co děláme"}</p>
            <h2>
              {uk ? "Послуги, які рухають\nвас вперед" : "Služby, které vás\nposunou dál"}
            </h2>
          </div>

          <div className="grid grid-3">
            {services.map((s, i) => (
              <article
                key={s.title}
                className={`frame service-card card reveal reveal-d${Math.min(i + 1, 4)}`}
              >
                <span className="service-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>

          <div className="centered reveal">
            <Link href={localePath(locale, "/services")} className="btn btn-outline">
              {uk ? "Всі послуги →" : "Všechny služby →"}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PHOTO BANNER 1 — electrician at work
      ═══════════════════════════════════════════ */}
      <div className="photo-banner">
        <div
          className="photo-banner-bg"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="photo-banner-overlay" />
        <div className="container photo-banner-content reveal">
          <p className="kicker">
            {uk ? "Безпека та стандарти" : "Bezpečnost a normy"}
          </p>
          <h2>
            {uk
              ? "Виконуємо роботи відповідно до чеських норм і міжнародних стандартів"
              : "Vše realizujeme dle českých norem a mezinárodních bezpečnostních předpisů"}
          </h2>
          <Link href={localePath(locale, "/about")} className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
            {uk ? "Про компанію" : "O naší firmě"}
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          PROCESS
      ═══════════════════════════════════════════ */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-head reveal">
            <p className="kicker">{uk ? "Як ми працюємо" : "Jak pracujeme"}</p>
            <h2>{uk ? "Простий процес —\nпрозорий результат" : "Jednoduchý proces —\ntransparentní výsledek"}</h2>
          </div>

          <div className="process-grid">
            {steps.map((s, i) => (
              <div key={s.n} className={`frame process-step card reveal reveal-d${i + 1}`}>
                <span className="step-num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VEHICLE / AUTO SECTION
      ═══════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "center" }}>
            <div className="reveal">
              <VehicleImage
                altText={uk ? "Автопарк ELEKTROINST" : "Vozový park ELEKTROINST"}
                placeholder={uk ? "Додайте /public/auto.jpg" : "Přidejte /public/auto.jpg"}
              />
            </div>

            <div className="reveal reveal-d2">
              <p className="kicker">{uk ? "Наш автопарк" : "Náš vozový park"}</p>
              <h2>{uk ? "Оснащені та готові до виїзду по всій Чехії" : "Vybavení a připraveni vyjet po celé České republice"}</h2>
              <p className="lead" style={{ marginBottom: "1.5rem" }}>
                {uk
                  ? "Наш сервісний автопарк повністю оснащений для монтажу, ревізій та аварійних виїздів. Приїжджаємо вчасно — будь-де в Чехії."
                  : "Náš servisní vozový park je plně vybaven pro montáže, revize i havarijní výjezdy. Dorazíme včas — kdekoliv v ČR."}
              </p>
              <Link href={localePath(locale, "/contacts")} className="btn btn-primary">
                {uk ? "Замовити виїзд" : "Objednat výjezd"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PHOTO BANNER 2 — solar / modern energy
      ═══════════════════════════════════════════ */}
      <div className="photo-banner">
        <div
          className="photo-banner-bg"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="photo-banner-overlay" />
        <div className="container photo-banner-content reveal">
          <p className="kicker">{uk ? "Відновлювана енергія" : "Obnovitelná energie"}</p>
          <h2>
            {uk
              ? "Fotovoltaïka a bateriová úložiška — investice, která se vyplácí"
              : "Fotovoltaika a bateriová úložiště — investice, která se vyplácí"}
          </h2>
          <Link href={localePath(locale, "/services")} className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
            {uk ? "Дізнатися більше" : "Zjistit více"}
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          CTA BAND
      ═══════════════════════════════════════════ */}
      <section className="cta-band reveal">
        <div className="container">
          <p className="kicker">{uk ? "Зв'яжіться з нами" : "Kontaktujte nás"}</p>
          <h2>{uk ? "Готові обговорити ваш проєкт?" : "Připraveni probrat váš projekt?"}</h2>
          <p>
            {uk
              ? "Надішліть запит — відповімо протягом 24 годин з пропозицією та орієнтовним кошторисом."
              : "Pošlete poptávku — ozveme se do 24 hodin s návrhem a orientační cenou."}
          </p>
          <Link href={localePath(locale, "/contacts")} className="btn btn-dark">
            {uk ? "Надіслати запит" : "Poslat poptávku"}
          </Link>
        </div>
      </section>
    </>
  );
}
