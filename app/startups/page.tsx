import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import { startups } from "@/content/startups";
import FeatureStartup from "@/components/FeatureStartup";

// Any field still starting with "[TODO" shows as a yellow placeholder.
const isTodo = (t?: string) => typeof t === "string" && t.startsWith("[TODO");

export const metadata: Metadata = {
  title: "Startups",
  description: "Companies built by Founders members.",
};

export default function StartupsPage() {
  return (
    <>
      <PageHead tag="Startups" title={<>Built by <span style={{ color: "var(--orange)" }}>Founders</span></>}>
        Companies and R&amp;D projects built by people in the organization.
      </PageHead>

      <section className="wrap" style={{ paddingBottom: "clamp(56px, 9vw, 112px)" }}>
        <div className="grid-3">
          {startups.map((s, i) => {
            const inner = (
              <>
                <div className="card__foot" style={{ marginTop: 0 }}>
                  <span>#{String(i + 1).padStart(2, "0")}</span>
                  {s.tag && <span className="chip chip--blue">{s.tag}</span>}
                </div>
                {s.logo && <img src={s.logo} alt="" style={{ height: 48, width: "auto", objectFit: "contain" }} />}
                <h2 className="card__title">{isTodo(s.name) ? <span className="todo">{s.name}</span> : s.name}</h2>
                <p className="card__body">{isTodo(s.oneLiner) ? <span className="todo">{s.oneLiner}</span> : s.oneLiner}</p>
                <div className="card__foot">
                  <span>{s.founders.some(isTodo) ? <span className="todo">{s.founders.join(", ")}</span> : `By ${s.founders.join(", ")}`}</span>
                  {s.url && <span aria-hidden="true">↗</span>}
                </div>
              </>
            );
            return s.url ? (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="card">
                {inner}
              </a>
            ) : (
              <article key={i} className={`card ${s.todo ? "card--todo" : ""}`}>
                {inner}
              </article>
            );
          })}
        </div>
        <div style={{ marginTop: "clamp(32px, 5vw, 56px)" }}>
          <FeatureStartup />
        </div>
      </section>
    </>
  );
}
