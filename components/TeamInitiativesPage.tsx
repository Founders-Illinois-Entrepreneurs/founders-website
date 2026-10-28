import Link from "next/link";
import { team, teams, type TeamId } from "@/content/teams";
import { teamPages, type Initiative } from "@/content/initiatives";
import { events, kindLabels } from "@/content/events";
import AddToCalendar from "./AddToCalendar";
import UpcomingOnly from "./UpcomingOnly";

// Groups initiatives by their `term` (e.g. "Fall 2026"), keeping the order they're listed in.
function groupByTerm(items: Initiative[]) {
  const out: { term?: string; items: Initiative[] }[] = [];
  items.forEach((it) => {
    const last = out[out.length - 1];
    if (last && last.term === it.term) last.items.push(it);
    else out.push({ term: it.term, items: [it] });
  });
  return out;
}

const statusChip = (s: Initiative["status"]) =>
  s === "Live" ? "chip--orange" : s === "In progress" ? "chip--blue" : "chip--muted";

/** About > [team]: what one internal team does and the initiatives it's running. */
export default function TeamInitiativesPage({ id }: { id: Exclude<TeamId, "exec"> }) {
  const info = teams.find((t) => t.id === id)!;
  const page = teamPages[id];
  const leads = team.filter((m) => m.team === id && m.role !== "Member");
  const others = teams.filter((t) => t.id !== "exec" && t.id !== id);
  // The Events team page also lists dated events. Which ones are still upcoming is decided
  // in the visitor's browser (UpcomingOnly), so the list never goes stale between deploys.
  const dated = id === "events" ? events.filter((e) => !e.todo && e.start).sort((a, b) => a.start!.localeCompare(b.start!)) : [];

  return (
    <>
      <section className="wrap initiatives initiatives--head">
        <div className="initiatives__side">
          <header className="initiatives__head">
            <span className="tag">About · {info.name}</span>
            <h1 className="display display--xl">{info.name}</h1>
            <p className="lede">{page.focus}</p>
          </header>
          {info.icon && <img src={info.icon} alt="" className="initiatives__icon" loading="lazy" />}
          <p className="card__body">{info.blurb}</p>
          {leads.length > 0 && (
            <div style={{ display: "grid", gap: 6 }}>
              <span className="tag">Led by</span>
              <ul className="name-list">
                {leads.map((m) => (
                  <li key={m.name}>
                    <strong>{m.name}</strong>, <span>{m.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Link href={`/team#${id}`} className="text-link">
            Meet the whole {info.name} team →
          </Link>
        </div>

        <div style={{ display: "grid", gap: 14, minWidth: 0 }}>
          <span className="tag tag--blue">Initiatives</span>
          <h2 className="display display--md">{page.initiativesTitle || "What we're working on"}</h2>
          {groupByTerm(page.initiatives).map((g) => (
            <div key={g.term || "all"} style={{ display: "grid", gap: 14 }}>
              {g.term && (
                <span className="tag" style={{ marginTop: 8 }}>
                  {g.term}
                </span>
              )}
              <ol className="initiatives__list">
                {g.items.map((it, i) => (
                  <li key={it.title} className={`card ${it.todo ? "card--todo" : ""}`}>
                    <div className="card__foot" style={{ marginTop: 0 }}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <span className={`chip ${statusChip(it.status)}`}>{it.status}</span>
                    </div>
                    <h3 className="card__title">{it.todo ? <span className="todo">{it.title}</span> : it.title}</h3>
                    <p className="card__body">
                      {it.todo || it.summaryTodo ? <span className="todo">{it.summary}</span> : it.summary}
                    </p>
                    {it.lead && (
                      <p className="card__body" style={{ margin: 0 }}>
                        <strong>{it.lead}</strong> (Project Lead)
                        {it.members?.length ? `, ${it.members.join(", ")}` : ""}
                      </p>
                    )}
                    {it.href && (
                      <a className="text-link" href={it.href} target="_blank" rel="noopener noreferrer">
                        Visit {it.linkLabel || it.title} ↗
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {(page.about || page.tracks) && (
        <section className="wrap" style={{ display: "grid", gap: 20, paddingBottom: "clamp(32px, 5vw, 56px)" }}>
          <span className="tag tag--blue">How it works</span>
          {page.about?.map((p, i) => (
            <p key={i} className="lede" style={{ margin: 0, maxWidth: "70ch" }}>
              {p}
            </p>
          ))}
          {page.tracks && (
            <>
              {page.tracksTitle && (
                <h2 className="display display--md" style={{ marginTop: 12 }}>
                  {page.tracksTitle}
                </h2>
              )}
              <div className="grid-3">
                {page.tracks.map((t, i) => (
                  <article key={t.title} className="card">
                    <div className="card__foot" style={{ marginTop: 0 }}>
                      <span>Track {String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="card__title">{t.title}</h3>
                    <p className="card__body">{t.body}</p>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {dated.length > 0 && (
        <UpcomingOnly
          items={dated.map((e) => ({ key: e.slug, last: e.end || e.start! }))}
          className="wrap"
          style={{ display: "grid", gap: 14, paddingBottom: "clamp(32px, 5vw, 56px)" }}
          head={
            <>
              <span className="tag tag--blue">Coming up</span>
              <h2 className="display display--md">Upcoming events</h2>
            </>
          }
          foot={
            <Link href="/events" className="text-link">
              See all events →
            </Link>
          }
          listClassName="initiatives__list"
        >
          {dated.map((e) => (
            <li key={e.slug} className="card">
              <div className="card__foot" style={{ marginTop: 0 }}>
                <span>{kindLabels[e.kind]}</span>
                <span className="chip chip--orange">Coming up</span>
              </div>
              <h3 className="card__title">{e.name}</h3>
              <p className="card__body">{e.blurb}</p>
              <div className="card__foot">
                <span>
                  {new Date(e.start + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  {e.time ? ` · ${e.time}` : ""}
                  {e.location ? ` · ${e.location}` : ""}
                </span>
              </div>
              <div className="btn-row cal-row">
                <AddToCalendar e={e} />
              </div>
            </li>
          ))}
        </UpcomingOnly>
      )}

      <section className="wrap" style={{ paddingBottom: "clamp(56px, 9vw, 112px)" }}>
        <span className="tag">Other teams</span>
        <div className="initiatives__others">
          {others.map((t) => (
            <Link key={t.id} href={`/about/${t.id}`} className="btn btn--ghost btn--sm">
              {t.name} →
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
