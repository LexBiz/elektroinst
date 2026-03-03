"use client";

import { FormEvent, useState } from "react";
import { Locale } from "@/lib/i18n";

type Status = "idle" | "loading" | "success" | "error";
type ContactFormProps = { locale: Locale };

const T = {
  cs: {
    title:    "Nezávazná poptávka",
    subtitle: "Vyplňte formulář. Odpovíme co nejdříve.",
    fullName: "Jméno a příjmení *",
    email:    "E-mail *",
    phone:    "Telefon *",
    details:  "Stručný popis projektu *",
    consent:  "Souhlasím se zpracováním osobních údajů dle stránky GDPR.",
    sending:  "Odesílám…",
    send:     "Odeslat poptávku",
    success:  "Děkujeme. Ozveme se vám nejpozději do 24 hodin.",
    error:    "Odeslání se nezdařilo. Zkuste to prosím znovu.",
  },
  uk: {
    title:    "Запит на консультацію",
    subtitle: "Заповніть форму. Відповімо якнайшвидше.",
    fullName: "Ім'я та прізвище *",
    email:    "E-mail *",
    phone:    "Телефон *",
    details:  "Короткий опис проєкту *",
    consent:  "Погоджуюсь на обробку персональних даних згідно сторінки GDPR.",
    sending:  "Надсилаю…",
    send:     "Надіслати запит",
    success:  "Дякуємо. Ми зв'яжемось з вами протягом 24 годин.",
    error:    "Не вдалося надіслати форму. Спробуйте ще раз.",
  },
} as const;

export function ContactForm({ locale }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const t = T[locale];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      fullName: String(form.get("fullName") ?? ""),
      email:    String(form.get("email")    ?? ""),
      phone:    String(form.get("phone")    ?? ""),
      details:  String(form.get("details")  ?? ""),
      consent:  form.get("consent") === "on",
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        throw new Error(data.message || t.error);
      }
      formEl.reset();
      setStatus("success");
      setMessage(data.message || t.success);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error && error.message ? error.message : t.error);
    }
  }

  return (
    <form className="contact-form card" onSubmit={handleSubmit}>
      <h3>{t.title}</h3>
      <p className="muted">{t.subtitle}</p>

      <div className="form-grid">
        <label>
          {t.fullName}
          <input name="fullName" required />
        </label>
        <label>
          {t.phone}
          <input name="phone" type="tel" required />
        </label>
        <label style={{ gridColumn: "1 / -1" }}>
          {t.email}
          <input name="email" type="email" required />
        </label>
      </div>

      <label>
        {t.details}
        <textarea name="details" required rows={5} />
      </label>

      <label className="checkbox-row">
        <input type="checkbox" name="consent" required />
        {t.consent}
      </label>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
          {status === "loading" ? t.sending : t.send}
        </button>
        {message && <p className={`form-msg ${status}`}>{message}</p>}
      </div>
    </form>
  );
}
