import Link from "next/link";
import { notFound } from "next/navigation";
import { company } from "@/lib/company";
import { isLocale, localePath } from "@/lib/i18n";
import { VehicleImage } from "@/components/VehicleImage";

type HomeProps = { params: Promise<{ locale: string }> };

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const uk = locale === "uk";
  const waPhone = company.phone.replace(/\D/g, "");
  const waMsg247 = encodeURIComponent(
    uk
      ? "Dobryy den! Meni potribna ekstrena dopomoha elektryka."
      : "Dobrý den! Potřebuji urgentní pomoc elektrikáře."
  );

  const works = [
    {
      img: "https://images.unsplash.com/photo-1621905251189-08b45249e9d2?auto=format&fit=crop&w=800&q=80",
      titleCs: "Kompletní rekonstrukce elektro, byt 3+1 — Praha 4",
      titleUk: "Повна реконструкція електрики, квартира 3+1 — Прага 4",
      descCs: "Vyměnili jsme veškeré rozvody v panelovém bytě: nové kabely, zásuvky, vypínače a rozvaděč s moderními jističi. Hotovo za 2 dny.",
      descUk: "Замінили всі проводки в панельній квартирі: нові кабелі, розетки, вимикачі і щиток з сучасними автоматами. Виконано за 2 дні.",
    },
    {
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      titleCs: "Nová kabelová trasa v administrativní budově — Brno",
      titleUk: "Нова кабельна траса в офісній будівлі — Брно",
      descCs: "Položili jsme 200 m kabelových tras: silnoproud, datové rozvody a záložní napájení pro serverovnu. Práce bez výpadku provozu.",
      descUk: "Проклали 200 м кабельних трас: силова мережа, ІТ-кабелювання та резервне живлення для серверної кімнати. Без зупинки офісу.",
    },
    {
      img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
      titleCs: "Revize a servis výrobní haly — Praha-východ",
      titleUk: "Ревізія та сервіс виробничого цеху — Схід Праги",
      descCs: "Provedli jsme výchozí revizi elektroinstalace v hale 3 000 m². Nalezené závady opraveny na místě, protokol předán do 48 h.",
      descUk: "Провели первинну ревізію електрики у цеху 3 000 м². Несправності усунуто одразу, протокол переданий замовнику протягом 48 год.",
    },
    {
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      titleCs: "Fotovoltaická elektrárna 12 kWp — Středočeský kraj",
      titleUk: "Сонячна електростанція 12 кВт — Середньочеський край",
      descCs: "Navrhli a namontovali jsme FV systém s 30 panely a bateriovým úložištěm 10 kWh. Úspora klienta přes 70 % ročních nákladů.",
      descUk: "Спроєктували та встановили FV-систему з 30 панелями та батарейним накопичувачем 10 кВт·год. Економія клієнта — понад 70% на рік.",
    },
    {
      img: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?auto=format&fit=crop&w=800&q=80",
      titleCs: "Wallbox 22 kW pro elektromobil — Praha 6",
      titleUk: "Wallbox 22 кВт для електромобіля — Прага 6",
      descCs: "Nainstalovali jsme wallbox 22 kW se smart řízením, zesílili přívod a vystavili revizní zprávu. Vše na klíč za jeden den.",
      descUk: "Встановили wallbox 22 кВт зі смарт-керуванням, посилили введення і видали ревізійний звіт. Все «під ключ» за один день.",
    },
    {
      img: "/auto.jpg",
      titleCs: "Pohotovostní výjezd — oprava pojistkové skříně, Praha 9",
      titleUk: "Аварійний виїзд — ремонт запобіжної коробки, Прага 9",
      descCs: "Klient volal v 22:00 — bez proudu celý dům. Výjezd do 40 minut, oprava na místě, elektřina obnovena do půlnoci.",
      descUk: "Клієнт зателефонував о 22:00 — весь будинок без струму. Виїзд за 40 хвилин, ремонт на місці, електрика відновлена до опівночі.",
    },
  ];

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
                  ? "Електромонтаж під ключ · вся Чехія"
                  : "Elektroinstalace na klíč · celá ČR"}
              </div>

              <h1>
                {uk ? (
                  <><em>Струм,</em><br />що живить<br />ваші плани.</>
                ) : (
                  <><em>Proud,</em><br />co pohání<br />vaše plány.</>
                )}
              </h1>

              <p className="lead">
                {uk
                  ? "Навіть найскладніший об'єкт ми здаємо в строк — повна відповідальність від першого проєкту до фінальної ревізії."
                  : "I ten nejsložitější objekt předáme včas — plná odpovědnost od prvního projektu až po finální revizi."}
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
                  ? ["Власні монтажні бригади і технагляд", "Прозорий бюджет без сюрпризів", "Один партнер від проєкту до сервісу", "Гарантія підтримки після здачі об'єкта"]
                  : ["Vlastní montážní týmy a technický dohled", "Transparentní cena bez překvapení", "Jeden partner od projektu po servis", "Garance podpory i po předání díla"]
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
          { num: "100%", label: uk ? "дотримання термінів" : "dodrzeni terminu" },
        ].map((s) => (
          <div className="stat-item" key={s.label}>
            <strong>{s.num}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════
          24/7 EMERGENCY BAND
      ═══════════════════════════════════════════ */}
      <section className="band-247 reveal">
        <div className="container band-247-inner">
          <div className="band-247-left">
            <div className="band-247-num">24<span>/</span>7</div>
            <p className="band-247-title">
              {uk ? "Аварійна бригада" : "Pohotovostní brigáda"}
            </p>
            <p className="band-247-desc">
              {uk
                ? "Вийшов автомат? Пропало світло? Коротке замикання? Виїжджаємо протягом 1 години — вдень і вночі, у будні та свята."
                : "Vypadl jistič? Výpadek proudu? Zkrat? Vyjíždíme do 1 hodiny — ve dne i v noci, ve všední dny i o svátcích."}
            </p>
          </div>
          <div className="band-247-right">
            <a
              href={`https://wa.me/${waPhone}?text=${waMsg247}`}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {uk ? "Написати в WhatsApp" : "Napsat přes WhatsApp"}
              <span className="btn-whatsapp-phone">{company.phone}</span>
            </a>
            <a href={`tel:${company.phone}`} className="btn-call-247">
              {uk ? "або зателефонувати" : "nebo zavolat"} {company.phone}
            </a>
          </div>
        </div>
      </section>

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
          OUR WORKS
      ═══════════════════════════════════════════ */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-head reveal">
            <p className="kicker">{uk ? "Портфоліо" : "Portfolio"}</p>
            <h2>{uk ? "Наші роботи" : "Naše práce"}</h2>
            <p className="lead">
              {uk
                ? "Приклади типових робіт: монтаж щитів, кабельні траси, зовнішні підключення та сервісні ревізії."
                : "Ukázky typických realizací: rozvaděče, kabelové trasy, venkovní napojení a servisní revize."}
            </p>
          </div>
          <div className="works-grid">
            {works.map((w, i) => (
              <div
                key={w.titleCs}
                className={`work-card reveal reveal-d${Math.min((i % 3) + 1, 3)}`}
              >
                <div className="work-card-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={w.img}
                    alt={uk ? w.titleUk : w.titleCs}
                    className="work-card-img"
                  />
                </div>
                <div className="work-card-body">
                  <p className="work-card-title">{uk ? w.titleUk : w.titleCs}</p>
                  <p className="work-card-desc">{uk ? w.descUk : w.descCs}</p>
                </div>
              </div>
            ))}
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
