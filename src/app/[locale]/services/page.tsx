import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/lib/i18n";

type ServicesProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: ServicesProps): Promise<Metadata> {
  const { locale } = await params;
  const uk = locale === "uk";
  return {
    title: uk ? "Послуги | ELEKTROINST" : "Sluzby | ELEKTROINST",
    description: uk
      ? "Kompleксний електромонтаж, проєктування, CCTV, розумний дім Ajax, освітлення та ревізії по всій Чехії."
      : "Kompletní elektroinstalace, projektování, CCTV, chytrá domácnost Ajax, osvětlení a revize po celé ČR.",
  };
}

type ServiceCategory = {
  num: string;
  icon: string;
  title: string;
  desc: string;
  items: string[];
};

const SERVICES_CS: ServiceCategory[] = [
  {
    num: "01",
    icon: "⚡",
    title: "Kompletní elektroinstalace",
    desc: "Od projektu po revizi — realizujeme veškeré elektroinstalační práce pro byty, domy, kanceláře i průmyslové provozy.",
    items: [
      "Silnoproudé rozvody — novostavby i rekonstrukce",
      "Montáž a výměna rozvaděčů, jističů, zásuvek a vypínačů",
      "Instalace domácích spotřebičů a klimatizací",
      "Připojení k distribuční síti — nová odběrní místa",
    ],
  },
  {
    num: "02",
    icon: "📐",
    title: "Projektování & dokumentace",
    desc: "Zpracujeme kompletní projektovou dokumentaci pro silnoproud i slaboproud a postaráme se o veškeré administrativní náležitosti.",
    items: [
      "Projekty silnoproudých a slaboproudých instalací (byt, dům, průmysl)",
      "DSP, DPS, výkresová dokumentace a technické zprávy",
      "Administrativní zajištění nových odběrních míst",
      "Koordinace s navazujícími profesemi a úřady",
    ],
  },
  {
    num: "03",
    icon: "🔌",
    title: "Kabeláž & datové sítě",
    desc: "Pokládáme silové i datové rozvody — od hrubé stavby po finální zapojení.",
    items: [
      "Strukturovaná kabeláž Cat6 a optické trasy",
      "Silové kabely — průmyslové i bytové objekty",
      "Datové sítě, Wi-Fi pokrytí a firemní infrastruktura",
      "Kompletní kabelové trasy na klíč",
    ],
  },
  {
    num: "04",
    icon: "💡",
    title: "Osvětlení",
    desc: "Navrhujeme a instalujeme osvětlovací systémy pro každý typ objektu — od světelného konceptu po finální montáž.",
    items: [
      "Světelný koncept a výpočet osvětlenosti dle norem",
      "Montáž a výměna svítidel, lustrů a LED prvků",
      "Průmyslové osvětlení hal a skladů",
      "Venkovní osvětlení a architekturální lighting",
    ],
  },
  {
    num: "05",
    icon: "🏠",
    title: "Chytrá domácnost & zabezpečení",
    desc: "Integrujeme zabezpečovací a automatizační systémy Ajax, CCTV a přístupové kontroly do jednoho celku.",
    items: [
      "Zabezpečovací systémy Ajax — instalace, ovládání přes mobil",
      "Kamerové systémy CCTV — montáž a servis",
      "Přístupové kontroly a elektrické zámky",
      "Automatizace osvětlení a rolet, integrace do BMS",
    ],
  },
  {
    num: "06",
    icon: "📋",
    title: "Revize & servis",
    desc: "Provádíme veškeré typy revizí elektroinstalací dle platných ČSN norem a zajišťujeme rychlý servisní zásah.",
    items: [
      "Výchozí revize nových elektroinstalací",
      "Pravidelné a mimořádné revize dle ČSN norem",
      "Odstranění závad a preventivní servisní plán",
      "Pohotovostní výjezdy při poruchách 24/7",
    ],
  },
];

const SERVICES_UK: ServiceCategory[] = [
  {
    num: "01",
    icon: "⚡",
    title: "Комплексний електромонтаж",
    desc: "Від проєкту до ревізії — виконуємо всі електромонтажні роботи для квартир, будинків, офісів та промислових об'єктів.",
    items: [
      "Силові розводки — новобудови та реконструкції",
      "Монтаж і заміна щитів, автоматів, розеток і вимикачів",
      "Підключення побутових приладів і кондиціонерів",
      "Приєднання до розподільної мережі — нові точки обліку",
    ],
  },
  {
    num: "02",
    icon: "📐",
    title: "Проєктування та документація",
    desc: "Розробляємо повний пакет проєктної документації для силових і слабкострумових систем, займаємось адміністративним узгодженням.",
    items: [
      "Проєкти силових і слабкострумових установок (квартира, будинок, промисловість)",
      "DSP, DPS, креслення та технічні звіти",
      "Адміністративне оформлення нових точок обліку",
      "Координація з суміжними підрядниками та органами",
    ],
  },
  {
    num: "03",
    icon: "🔌",
    title: "Кабельні мережі та дата",
    desc: "Прокладаємо силові та інформаційні кабелі — від чорнової розводки до фінального підключення.",
    items: [
      "Структурована кабельна проводка Cat6 і оптоволокно",
      "Силові кабелі для промислових і житлових об'єктів",
      "Комп'ютерні мережі, Wi-Fi покриття, корпоративна інфраструктура",
      "Повні кабельні траси під ключ",
    ],
  },
  {
    num: "04",
    icon: "💡",
    title: "Освітлення",
    desc: "Проєктуємо та монтуємо освітлення для будь-якого типу об'єкта — від концепції до фінальної здачі.",
    items: [
      "Світловий концепт і розрахунок освітленості за нормами",
      "Монтаж і заміна світильників, люстр і LED елементів",
      "Промислове освітлення цехів і складів",
      "Вуличне та архітектурне підсвічування",
    ],
  },
  {
    num: "05",
    icon: "🏠",
    title: "Розумний дім & безпека",
    desc: "Інтегруємо охоронні та автоматизаційні системи Ajax, CCTV і контроль доступу в єдиний комплекс.",
    items: [
      "Охоронні системи Ajax — монтаж, керування через смартфон",
      "Камерне спостереження CCTV — монтаж і сервіс",
      "Контроль доступу та електромагнітні замки",
      "Автоматизація освітлення, рольставнів, інтеграція в BMS",
    ],
  },
  {
    num: "06",
    icon: "📋",
    title: "Ревізія та сервіс",
    desc: "Проводимо всі типи ревізій електроустановок за чинними нормами ČSN і забезпечуємо швидке сервісне реагування.",
    items: [
      "Початкові ревізії нових електроустановок",
      "Регулярні та позачергові ревізії за нормою ČSN",
      "Усунення несправностей і профілактичне обслуговування",
      "Оперативний виїзд при аваріях 24/7",
    ],
  },
];

export default async function ServicesPage({ params }: ServicesProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const uk = locale === "uk";
  const services = uk ? SERVICES_UK : SERVICES_CS;

  return (
    <>
      {/* ─── HERO BANNER ─── */}
      <div className="photo-banner" style={{ height: "480px" }}>
        <div
          className="photo-banner-bg"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="photo-banner-overlay" />
        <div className="container photo-banner-content" style={{ paddingTop: "calc(var(--header-h) + 2rem)" }}>
          <p className="kicker">{uk ? "Послуги" : "Služby"}</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}>
            {uk
              ? "Повний спектр електротехнічних робіт"
              : "Kompletní spektrum elektrotechnických prací"}
          </h1>
          <p className="lead">
            {uk
              ? "Від першого контакту до фінальної ревізії — один партнер, повна відповідальність."
              : "Od prvního kontaktu po finální revizi — jeden partner, plná odpovědnost."}
          </p>
        </div>
      </div>

      {/* ─── SERVICES GRID ─── */}
      <section className="section">
        <div className="container">
          <div className="services-grid">
            {services.map((s, i) => (
              <article
                key={s.num}
                className={`svc-card frame card reveal reveal-d${Math.min((i % 3) + 1, 3)}`}
              >
                <div className="svc-header">
                  <span className="svc-num">{s.num}</span>
                  <span className="svc-icon">{s.icon}</span>
                </div>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-desc">{s.desc}</p>
                <ul className="svc-list">
                  {s.items.map((item) => (
                    <li key={item}>
                      <span className="svc-bullet">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-band reveal">
        <div className="container">
          <p className="kicker">{uk ? "Обговоримо ваш проєкт" : "Proberme váš projekt"}</p>
          <h2>{uk ? "Маєте конкретне завдання?" : "Máte konkrétní zadání?"}</h2>
          <p>
            {uk
              ? "Надішліть запит — підготуємо план, терміни та орієнтовний кошторис."
              : "Pošlete poptávku — připravíme plán prací, termíny a orientační rozpočet."}
          </p>
          <Link href={localePath(locale, "/contacts")} className="btn btn-dark">
            {uk ? "Надіслати запит" : "Poslat poptávku"}
          </Link>
        </div>
      </section>
    </>
  );
}
