import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import EventsBrowser from "@/components/EventsBrowser";
import { formatDates } from "@/components/formatDates";
import { events } from "@/content/events";
import InstagramNote from "@/components/InstagramNote";
import NewsletterButton from "@/components/NewsletterButton";

export const metadata: Metadata = {
  title: "Events",
  description: "Weekly mixers, hackathons, speakers, workshops and Forge, the Midwest's largest student-run startup weekend.",
};

export default function EventsPage() {
  // Flagships: upcoming / date-TBD ones first, ones that already happened after.
  const flagships = events.filter((e) => e.flagship).sort((a, b) => Number(!!a.past) - Number(!!b.past));

  return (
    <>
      <PageHead tag="Events" title={<>Show up. <span style={{ color: "var(--orange)" }}>Build.</span> Pitch.</>}>
        Weekly mixers, hackathons, speakers and workshops, plus two flagship weekends. Here&apos;s what&apos;s on.
      </PageHead>

      <div className="wrap" style={{ display: "grid", gap: 14, paddingBottom: 8 }}>
        <InstagramNote />
        <div>
          <NewsletterButton variant="ghost" size="sm" />
        </div>
      </div>

      {/* The calendar first: what's coming up, then what already happened. */}
      <section className="wrap" style={{ paddingTop: 8, paddingBottom: "clamp(32px, 5vw, 56px)" }}>
        <EventsBrowser />
      </section>

      <section className="wrap" style={{ paddingBottom: 24 }}>
        <div className="section-head">
          <span className="tag tag--blue">Flagship events</span>
          <h2 className="display display--md">Our big weekends</h2>
        </div>
        {flagships.map((e) => {
          const dates = formatDates(e);
          return (
            <article className="flagship" key={e.slug}>
              <div className="flagship__media">
                {e.photos?.slice(0, 3).map((p) => (
                  <img key={p} className="flagship__photo" src={p} alt="" loading="lazy" />
                ))}
                {e.logo && <img className="flagship__logo" src={e.logo} alt={`${e.name} logo`} loading="lazy" />}
              </div>
              <div className="flagship__copy">
                <div className="meta-row">
                  <span className="chip chip--blue">{e.kind === "hackathon" ? "Hackathon" : "Startup weekend"}</span>
                  {e.past && <span className="chip chip--muted">Past</span>}
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
                  {e.todoNote && <span className="todo">{e.todoNote}</span>}
                </div>
              </div>
              {e.photos && e.photos.length > 3 && (
                <div className="strip flagship__strip" tabIndex={0} aria-label={`${e.name} photos, scroll sideways`}>
                  {e.photos.map((p) => (
                    <img key={p} src={p} alt={`${e.name} hackathon`} loading="lazy" />
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </section>
    </>
  );
}
