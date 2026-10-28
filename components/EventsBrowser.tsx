"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { events, kindLabels, type EventKind, type FoundersEvent } from "@/content/events";
import AddToCalendar from "./AddToCalendar";

type Filter = "all" | EventKind;

export function formatDates(e: FoundersEvent) {
  if (!e.start) return e.dateLabel || null;
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" };
  const a = new Date(`${e.start}T00:00:00Z`);
  if (!e.end || e.end === e.start) return a.toLocaleDateString("en-US", opts);
  const b = new Date(`${e.end}T00:00:00Z`);
  const sameMonth = a.getUTCMonth() === b.getUTCMonth() && a.getUTCFullYear() === b.getUTCFullYear();
  return sameMonth
    ? `${a.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })} ${a.getUTCDate()}-${b.getUTCDate()}, ${b.getUTCFullYear()}`
    : `${a.toLocaleDateString("en-US", opts)} - ${b.toLocaleDateString("en-US", opts)}`;
}

/** "upcoming" | "past" | "tbd", decided in the visitor's browser so it never goes stale. */
function useWhen() {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);
  return (e: FoundersEvent) => {
    if (e.recurring) return e.until && today && e.until < today ? ("past" as const) : ("upcoming" as const);
    if (e.past) return "past" as const;
    if (!e.start) return "tbd" as const;
    if (!today) return "tbd" as const;
    return (e.end || e.start) < today ? ("past" as const) : ("upcoming" as const);
  };
}

export function EventCard({ e, when }: { e: FoundersEvent; when: "upcoming" | "past" | "tbd" }) {
  const dates = formatDates(e);
  const inner = (
    <>
      {e.flyer && <img src={e.flyer} alt={`${e.name} flyer`} className="event-flyer" loading="lazy" />}
      <div className="meta-row">
        <span className="chip chip--blue">{kindLabels[e.kind]}</span>
        {e.recurring && when !== "past" ? (
          <span className="chip chip--orange">Every week</span>
        ) : (
          when === "upcoming" && <span className="chip chip--orange">Coming up</span>
        )}
        {when === "past" && <span className="chip chip--muted">Past</span>}
      </div>
      <h3 className="card__title">{e.todo ? <span className="todo">{e.name}</span> : e.name}</h3>
      <p className="card__body">{e.todo ? <span className="todo">{e.blurb}</span> : e.blurb}</p>
      <div className="card__foot">
        <span>
          {dates ?? e.recurring ?? "Date TBA"}
          {e.time ? ` · ${e.time}` : ""}
          {e.location && !e.location.startsWith("[TODO") ? ` · ${e.location}` : ""}
        </span>
        {e.href && <span aria-hidden="true">{e.href.startsWith("http") ? "↗" : "→"}</span>}
      </div>
    </>
  );
  const cls = `card ${e.todo ? "card--todo" : ""}`;
  // Upcoming dated events get an "Add to Google Calendar" button. Cards with a button
  // can't also be one big link, so the details link moves into the card instead.
  if (when === "upcoming" && (e.start || (e.recurring && e.weekday != null)) && !e.todo) {
    return (
      <article className={cls}>
        {inner}
        <div className="btn-row cal-row">
          <AddToCalendar e={e} />
          {e.href &&
            (e.href.startsWith("http") ? (
              <a className="text-link" href={e.href} target="_blank" rel="noopener noreferrer">
                Details ↗
              </a>
            ) : (
              <Link className="text-link" href={e.href}>
                Details →
              </Link>
            ))}
        </div>
      </article>
    );
  }
  if (e.href?.startsWith("http"))
    return (
      <a href={e.href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  if (e.href)
    return (
      <Link href={e.href} className={cls}>
        {inner}
      </Link>
    );
  return <article className={cls}>{inner}</article>;
}

export default function EventsBrowser() {
  const [filter, setFilter] = useState<Filter>("all");
  const when = useWhen();
  // Only show filter buttons for kinds that have at least one event.
  const kinds = (Object.keys(kindLabels) as EventKind[]).filter((k) => events.some((e) => e.kind === k));
  const list = events
    .filter((e) => filter === "all" || e.kind === filter)
    // Weekly events first, then by date (newest first), placeholders last.
    .sort(
      (a, b) =>
        Number(!!b.recurring) - Number(!!a.recurring) ||
        Number(!!a.todo) - Number(!!b.todo) ||
        (b.start ?? "9999").localeCompare(a.start ?? "9999")
    );
  // Coming up: weekly first, then soonest date first, then dates still TBD.
  const upcoming = list
    .filter((e) => when(e) !== "past")
    .sort(
      (a, b) =>
        Number(!!b.recurring) - Number(!!a.recurring) ||
        Number(!!a.todo) - Number(!!b.todo) ||
        (a.start ?? "9999").localeCompare(b.start ?? "9999")
    );
  const past = list.filter((e) => when(e) === "past");

  return (
    <div>
      <div className="filters" role="group" aria-label="Filter events by type">
        <button type="button" className="filter" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
          All<span className="filter__count">{events.length}</span>
        </button>
        {kinds.map((k) => (
          <button key={k} type="button" className="filter" aria-pressed={filter === k} onClick={() => setFilter(k)}>
            {kindLabels[k]}s<span className="filter__count">{events.filter((e) => e.kind === k).length}</span>
          </button>
        ))}
      </div>

      <h3 className="tag" style={{ margin: "0 0 14px" }}>
        Coming up
      </h3>
      {upcoming.length ? (
        <div className="grid-3">
          {upcoming.map((e) => (
            <EventCard key={e.slug} e={e} when={when(e)} />
          ))}
        </div>
      ) : (
        <p className="prose">Nothing on the calendar here yet. Follow us on Instagram so you hear first.</p>
      )}

      {past.length > 0 && (
        <>
          <h3 className="tag" style={{ margin: "40px 0 14px" }}>
            Past
          </h3>
          <div className="grid-3">
            {past.map((e) => (
              <EventCard key={e.slug} e={e} when="past" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
