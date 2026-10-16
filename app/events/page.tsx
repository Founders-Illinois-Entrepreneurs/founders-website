import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import EventsBrowser, { formatDates } from "@/components/EventsBrowser";
import { events } from "@/content/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Hackathons, speakers, workshops and Forge, the Midwest's largest student-run startup weekend.",
};

export default function EventsPage() {
  const flagships = events.filter((e) => e.flagship);
  return (
    <>
      <PageHead tag="Events" title={<>Show up. <span style={{ color: "var(--orange)" }}>Build.</span> Pitch.</>}>
        Hackathons, speakers and workshops all year, plus two flagship weekends. Here&apos;s what&apos;s on.
      </PageHead>

      <section className="wrap" style={{ paddingBottom: 24 }}>
        {flagships.map((e) => {
          const dates = formatDates(e);
          return (
            <article className="flagship" key={e.slug}>
              <div className="flagship__media">
                {e.photos?.map((p) => (
                  <img key={p} className="flagship__photo" src={p} alt="" loading="lazy" />
                ))}
                {e.logo && <img className="flagship__logo" src={e.logo} alt={`${e.name} logo`} loading="lazy" />}
              </div>
              <div className="flagship__copy">
                <div className="meta-row">
                  <span className="chip chip--blue">{e.kind === "hackathon" ? "Hackathon" : "Startup weekend"}</span>
                  {dates && <span className="chip">{dates}</span>}
                  {e.location &&
                    (e.location.startsWith("[TODO") ? (
                      <span className="todo">{e.location}</span>
                    ) : (
                      <span className="chip">{e.location}</span>
                    ))}
                </div>
                <h2 className="display display--lg">{e.name}</h2>
                <p className="lede">{e.blurb}</p>
                <div className="btn-row">
                  {e.href && (
                    <Link href={e.href} className="btn btn--ghost">
                      Details <span className="arrow" aria-hidden="true">→</span>
                    </Link>
                  )}
                  {e.slug === "54" && <span className="todo">[TODO: next 54 dates + signup link]</span>}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="tag tag--blue">Everything</span>
            <h2 className="display display--md">The full calendar</h2>
          </div>
          <EventsBrowser />
        </div>
      </section>
    </>
  );
}
