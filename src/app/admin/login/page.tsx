"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Nespravne heslo.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Nepodarilo se prihlasit.");
      setLoading(false);
    }
  }

  return (
    <section className="section page-top">
      <div className="container admin-login-wrap">
        <div className="frame card admin-login-card">
          <p className="kicker">Admin CRM</p>
          <h1 style={{ fontSize: "2rem" }}>Prihlaseni klienta</h1>
          <p className="muted" style={{ marginBottom: "1rem" }}>
            Tato sekce je dostupna pouze pro klienta.
          </p>
          <form onSubmit={onSubmit}>
            <label>
              Heslo
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Prihlasuji..." : "Prihlasit"}
              </button>
              {error ? <p className="form-msg error">{error}</p> : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

