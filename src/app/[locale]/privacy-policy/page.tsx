import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { company } from "@/lib/company";

type PrivacyProps = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPolicyPage({ params }: PrivacyProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const isUk = locale === "uk";

  return (
    <section className="section page-top">
      <div className="container legal">
        <p className="kicker">{isUk ? "Юридична інформація" : "Pravni informace"}</p>
        <h1>
          {isUk
            ? "Обробка персональних даних (GDPR)"
            : "Zpracovani osobnich udaju (GDPR)"}
        </h1>
        <p>
          {isUk
            ? "Цей текст є підготовленим шаблоном для сайту компанії у Чехії. Перед публікацією внесіть точні реквізити компанії та, за потреби, уточніть формулювання з юристом."
            : "Tento text slouzi jako pripravena sablona pro web firmy v Ceske republice. Pred publikaci doplnte presne identifikacni a kontaktni udaje spolecnosti a pripadne pravni upresneni podle vaseho podnikani."}
        </p>

        <h2>1. {isUk ? "Адміністратор персональних даних" : "Spravce osobnich udaju"}</h2>
        <p>
          {isUk
            ? `Адміністратором персональних даних є: ${company.name}, IČO: ${company.ico}, адреса: ${company.street}, ${company.cityLine}, e-mail: ${company.email}, телефон: ${company.phone}.`
            : `Spravcem osobnich udaju je: ${company.name}, ICO: ${company.ico}, se sidlem: ${company.street}, ${company.cityLine}, e-mail: ${company.email}, telefon: ${company.phone}.`}
        </p>

        <h2>2. {isUk ? "Які дані ми обробляємо" : "Jake udaje zpracovavame"}</h2>
        <p>
          {isUk
            ? "Обробляємо дані, які ви надаєте через контактну форму або e-mail: ім'я, контакти, дані компанії та інформацію про запит."
            : "Zpracovavame udaje, ktere nam sami poskytnete pres kontaktni formular nebo e-mail, zejmena jmeno, kontaktni udaje, udaje o firme a informace o poptavce."}
        </p>

        <h2>3. {isUk ? "Мета та правова підстава" : "Ucel a pravni zaklad"}</h2>
        <p>
          {isUk
            ? "Дані обробляються для опрацювання запиту, комунікації з клієнтом та укладання/виконання договору. Правові підстави: переддоговірні дії, виконання договору, законний інтерес або згода."
            : "Udaje zpracovavame za ucelem vyrizeni poptavky, komunikace se zakaznikem a pripadneho uzavreni a plneni smlouvy. Pravnimi zaklady mohou byt jednani o smlouve, plneni smlouvy, opravneny zajem a souhlas."}
        </p>

        <h2>4. {isUk ? "Термін зберігання" : "Doba uchovani"}</h2>
        <p>
          {isUk
            ? "Дані зберігаються лише протягом необхідного строку відповідно до мети обробки та законодавчих вимог."
            : "Udaje uchovavame po dobu nezbytnou pro splneni ucelu zpracovani a po dobu danou pravnimi predpisy."}
        </p>

        <h2>5. {isUk ? "Одержувачі персональних даних" : "Prijemci osobnich udaju"}</h2>
        <p>
          {isUk
            ? "Дані можуть передаватися перевіреним постачальникам послуг (наприклад, IT або хостинг) у необхідному обсязі та з дотриманням належного рівня захисту."
            : "Udaje mohou byt predany overenym dodavatelum sluzeb (napr. IT nebo hosting), a to pouze v rozsahu nutnem pro poskytovani sluzeb a pri zajisteni odpovidajici ochrany."}
        </p>

        <h2>6. {isUk ? "Ваші права" : "Vase prava"}</h2>
        <p>
          {isUk
            ? "Ви маєте право на доступ до даних, виправлення, видалення, обмеження обробки, перенесення даних та заперечення. Також можете подати скаргу до наглядового органу (ÚOOÚ)."
            : "Mate pravo na pristup k osobnim udajum, opravu, vymaz, omezeni zpracovani, prenositelnost a pravo vznesit namitku. Mate take pravo podat stiznost u dozoroveho uradu (Urad pro ochranu osobnich udaju)."}
        </p>

        <h2>7. {isUk ? "Контакт з питань GDPR" : "Kontakt pro GDPR dotazy"}</h2>
        <p>
          {isUk
            ? `З питань захисту персональних даних звертайтесь: ${company.email}.`
            : `Pro dotazy ohledne ochrany osobnich udaju nas kontaktujte na: ${company.email}.`}
        </p>
      </div>
    </section>
  );
}
