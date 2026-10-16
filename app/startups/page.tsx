import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { startups } from "@/content/startups";

export const metadata: Metadata = {
  title: "Startups",
  description: "Companies built by Founders members.",
};

export default function StartupsPage() {
  return (
    <>
      <PageHead tag="Startups" title={<>Built by <span style={{ color: "var(--orange)" }}>Founders</span></>}>
        Companies started by people in the club. Want yours up here? Scroll down.
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
                <h2 className="card__title">{s.todo ? <span className="todo">{s.name}</span> : s.name}</h2>
                <p className="card__body">{s.todo ? <span className="todo">{s.oneLiner}</span> : s.oneLiner}</p>
                <div className="card__foot">
                  <span>{s.todo ? <span className="todo">{s.founders.join(", ")}</span> : `By ${s.founders.join(", ")}`}</span>
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

        <div className="card" style={{ marginTop: 32, background: "var(--orange-soft)" }}>
          <h2 className="display display--sm">Building something?</h2>
          <p className="card__body">
            If you&apos;re a Founders member with a startup, we want it on this wall. Email us the name, a one-liner,
            the founders and a link.
          </p>
          <div>
            <Link href="/join" className="text-link">
              Not a member yet? Join →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
