import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getSubmissions, getVacancies } from "@/lib/storage";

function lines(text: string) {
  return text
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams: Promise<{
    sort?: string;
    created?: string;
    deleted?: string;
    deletedLead?: string;
    error?: string;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
  const { sort, created, deleted, deletedLead, error } = await searchParams;
  const submissionSort = sort === "oldest" ? "oldest" : "newest";
  const isSuccess = created === "1" || deleted === "1" || deletedLead === "1";
  const successMessage =
    created === "1"
      ? "Pozice byla uspesne vytvorena."
      : deleted === "1"
        ? "Pozice byla uspesne smazana."
        : deletedLead === "1"
          ? "Zadost byla uspesne smazana."
          : "";
  const errorMessage =
    error === "vacancy"
      ? "Nepodarilo se ulozit pozici. Zkuste to prosim znovu."
      : error === "submission"
        ? "Nepodarilo se zpracovat zadost. Zkuste to prosim znovu."
        : "";

  const [submissions, vacancies] = await Promise.all([
    getSubmissions(),
    getVacancies(),
  ]);
  const sortedSubmissions =
    submissionSort === "oldest"
      ? [...submissions].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      : submissions;

  return (
    <section className="section page-top">
      <div className="container">
        {isSuccess ? <p className="form-msg success admin-feedback">{successMessage}</p> : null}
        {errorMessage ? <p className="form-msg error admin-feedback">{errorMessage}</p> : null}

        <div className="admin-toolbar">
          <div>
            <p className="kicker">Admin CRM</p>
            <h1 className="admin-title">Zadosti a kariera</h1>
            <p className="muted">Soukroma sekce pouze pro klienta.</p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button className="btn btn-outline" type="submit">
              Odhlasit
            </button>
          </form>
        </div>

        <div className="grid grid-2 admin-grid">
          <article className="frame card">
            <h3 className="admin-subtitle">Pridat novou pozici</h3>
            <form action="/api/admin/vacancies" method="post">
              <input type="hidden" name="intent" value="create" />
              <div className="form-grid">
                <label>
                  Nazev pozice (CS)
                  <input name="titleCs" />
                </label>
                <label>
                  Nazev pozice (UK)
                  <input name="titleUk" />
                </label>
                <label>
                  Typ uvazku
                  <input name="type" placeholder="HPP / ICO / Brigada" />
                </label>
                <label>
                  Lokalita
                  <input name="location" placeholder="Praha / Cesko / Remote" />
                </label>
              </div>
              <label>
                Popis pozice (CS), 1 bod na 1 radek
                <textarea name="descriptionCs" rows={5} />
              </label>
              <label>
                Popis pozice (UK), 1 bod na 1 radek
                <textarea name="descriptionUk" rows={5} />
              </label>
              <div className="form-actions">
                <button className="btn btn-primary" type="submit">
                  Ulozit pozici
                </button>
              </div>
            </form>
          </article>

          <article className="frame card">
            <h3 className="admin-subtitle">
              Aktivni pozice ({vacancies.length})
            </h3>
            {vacancies.length === 0 ? (
              <p className="muted">Zatim nejsou zadne aktivni pozice.</p>
            ) : (
              <div className="admin-card-list">
                {vacancies.map((vacancy) => (
                  <div
                    key={vacancy.id}
                    className="card"
                    style={{ background: "var(--surface-2)" }}
                  >
                    <div className="admin-row">
                      <div>
                        <strong>{vacancy.titleCs || vacancy.titleUk || "Nova pozice"}</strong>
                        <p className="muted">
                          {(vacancy.type || "HPP / ICO")} · {(vacancy.location || "Ceska republika")}
                        </p>
                      </div>
                      <form action="/api/admin/vacancies" method="post">
                        <input type="hidden" name="intent" value="delete" />
                        <input type="hidden" name="id" value={vacancy.id} />
                        <button className="btn btn-outline btn-sm" type="submit">
                          Smazat
                        </button>
                      </form>
                    </div>
                    <ul className="admin-vacancy-list">
                      {lines(vacancy.descriptionCs || vacancy.descriptionUk || "").map((line, idx) => (
                        <li key={`${vacancy.id}-${idx}`}>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </article>
        </div>

        <article className="frame card admin-submissions">
          <div className="admin-row admin-submissions-head">
            <h3 className="admin-subtitle admin-subtitle-no-gap">
              Prichozi zadosti z formulare ({submissions.length})
            </h3>
            <div className="admin-filters">
              <Link
                href={submissionSort === "newest" ? "/admin" : "/admin?sort=newest"}
                className={`btn btn-sm ${submissionSort === "newest" ? "btn-primary" : "btn-outline"}`}
              >
                Nejdrive nove
              </Link>
              <Link
                href="/admin?sort=oldest"
                className={`btn btn-sm ${submissionSort === "oldest" ? "btn-primary" : "btn-outline"}`}
              >
                Nejdrive stare
              </Link>
            </div>
          </div>
          {sortedSubmissions.length === 0 ? (
            <p className="muted">Zatim nejsou zadne zadosti.</p>
          ) : (
            <div className="admin-card-list">
              {sortedSubmissions.map((row) => (
                <div
                  key={row.id}
                  className="card"
                  style={{ background: "var(--surface-2)" }}
                >
                  <div className="admin-entry-head">
                    <div className="admin-contact-line">
                      <strong>{row.fullName}</strong>
                      <span>{row.phone}</span>
                      <span>{row.email}</span>
                    </div>
                    <form action="/api/admin/submissions" method="post">
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="sort" value={submissionSort} />
                      <button className="btn btn-outline btn-sm" type="submit">
                        Smazat
                      </button>
                    </form>
                  </div>
                  <p className="muted admin-details">
                    {row.details}
                  </p>
                  <p className="muted admin-meta">
                    {new Date(row.createdAt).toLocaleString("cs-CZ")} ·{" "}
                    {row.locale.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    </section>
  );
}

