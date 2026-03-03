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
  searchParams: Promise<{ sort?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
  const { sort } = await searchParams;
  const submissionSort = sort === "oldest" ? "oldest" : "newest";

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p className="kicker">Admin CRM</p>
            <h1 style={{ fontSize: "2.1rem", marginBottom: "0.5rem" }}>
              Zadosti a kariera
            </h1>
            <p className="muted">Soukroma sekce pouze pro klienta.</p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button className="btn btn-outline" type="submit">
              Odhlasit
            </button>
          </form>
        </div>

        <div className="grid grid-2" style={{ alignItems: "start" }}>
          <article className="frame card">
            <h3 style={{ marginBottom: "0.9rem" }}>Pridat novou pozici</h3>
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
            <h3 style={{ marginBottom: "0.9rem" }}>
              Aktivni pozice ({vacancies.length})
            </h3>
            {vacancies.length === 0 ? (
              <p className="muted">Zatim nejsou zadne aktivni pozice.</p>
            ) : (
              <div style={{ display: "grid", gap: "0.8rem" }}>
                {vacancies.map((vacancy) => (
                  <div
                    key={vacancy.id}
                    className="card"
                    style={{ background: "var(--surface-2)" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "0.8rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <strong>{vacancy.titleCs}</strong>
                        <p className="muted">
                          {vacancy.type} · {vacancy.location}
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
                    <ul style={{ marginTop: "0.5rem", paddingLeft: "1rem" }}>
                      {lines(vacancy.descriptionCs).map((line) => (
                        <li key={line} style={{ listStyle: "disc" }}>
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

        <article className="frame card" style={{ marginTop: "1.2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.8rem",
              flexWrap: "wrap",
              marginBottom: "0.9rem",
            }}
          >
            <h3 style={{ marginBottom: 0 }}>
              Prichozi zadosti z formulare ({submissions.length})
            </h3>
            <div style={{ display: "flex", gap: "0.45rem" }}>
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
            <div style={{ display: "grid", gap: "0.8rem" }}>
              {sortedSubmissions.map((row) => (
                <div
                  key={row.id}
                  className="card"
                  style={{ background: "var(--surface-2)" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "0.8rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <p>
                      <strong>{row.fullName}</strong> · {row.phone} · {row.email}
                    </p>
                    <form action="/api/admin/submissions" method="post">
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="sort" value={submissionSort} />
                      <button className="btn btn-outline btn-sm" type="submit">
                        Smazat
                      </button>
                    </form>
                  </div>
                  <p className="muted" style={{ whiteSpace: "pre-wrap", marginTop: "0.4rem" }}>
                    {row.details}
                  </p>
                  <p className="muted" style={{ fontSize: "0.8rem" }}>
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

