import type { Metadata } from "next";
import Link from "next/link";
import ApplyButton from "@/components/ApplyButton";
import { forge } from "@/content/forge";

export const metadata: Metadata = {
  title: "Forge",
  description: "Forge is the Midwest's largest student-run startup weekend, held in Chicago.",
};

export default function ForgePage() {
  return (
    <>
      <section className="band-ink">
        <div className="wrap page-head">
          <Link href="/events" className="tag" style={{ textDecoration: "none" }}>
            ← Events / Forge
          </Link>
          <img src="/images/logos/events/forge_logo.png" alt="" width={120} height={120} style={{ width: 96, height: 96, objectFit: "contain" }} />
          <h1 className="display display--xl">{forge.edition}</h1>
          <div className="meta-row">
            <span className="chip chip--orange">{forge.dates}</span>
            <span className="chip">{forge.location}</span>
          </div>
          <p className="lede">{forge.pitch}</p>
          {forge.applyUrl && (
            <div className="btn-row">
              <ApplyButton label="Apply to Forge" url={forge.applyUrl} />
            </div>
          )}
          <p className="tag" style={{ justifySelf: "start", margin: 0 }}>
            Forge 2027 dates coming soon. Follow us on Instagram to hear first.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="tag">Forge {forge.winnersYear}</span>
            <h2 className="display display--md">The podium</h2>
          </div>
          <div className="podium">
            {forge.winners.map((w) => (
              <article key={w.name} className="card card--lift">
                <span className="podium__place">{w.place}</span>
                <h3 className="card__title">{w.name}</h3>
                <p className="card__body" style={{ color: "var(--ink)" }}>
                  {w.blurb}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-paper" style={{ borderTop: "2px solid var(--ink)" }}>
        <div className="wrap">
          <div className="section-head">
            <span className="tag tag--blue">Forge {forge.peopleYear}</span>
            <h2 className="display display--md">Speakers, judges and mentors</h2>
          </div>
          <div className="grid-3">
            {forge.people.map((g) => (
              <div key={g.group}>
                <h3 className="display display--sm" style={{ marginBottom: 10 }}>
                  {g.group}
                </h3>
                <ul className="name-list">
                  {g.names.map((n) => {
                    const [who, ...org] = n.split(", ");
                    return (
                      <li key={n}>
                        <strong>{who}</strong>
                        {org.length > 0 && <span>, {org.join(", ")}</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
