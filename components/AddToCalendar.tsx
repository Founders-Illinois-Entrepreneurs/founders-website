"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import type { FoundersEvent } from "@/content/events";

const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (d: string) => d.replace(/-/g, "");

function nextDay(d: string) {
  const t = new Date(d + "T12:00:00Z");
  t.setUTCDate(t.getUTCDate() + 1);
  return t.toISOString().slice(0, 10).replace(/-/g, "");
}

/** Reads times like "1:30-4:30 PM", "5-6 PM" or "11 AM-1 PM" into 24h [start, end]. */
function parseTime(str?: string): [string, string] | null {
  const m = /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?\s*[-–]\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i.exec(str || "");
  if (!m) return null;
  const to24 = (h: number, mer: string) => (h % 12) + (mer.toUpperCase() === "PM" ? 12 : 0);
  const endMer = m[6];
  const startMer = m[3] || endMer;
  let sh = to24(+m[1], startMer);
  const eh = to24(+m[4], endMer);
  if (!m[3] && sh > eh) sh -= 12;
  return [`${pad(sh)}${pad(+(m[2] || 0))}00`, `${pad(eh)}${pad(+(m[5] || 0))}00`];
}

/** Next date (YYYY-MM-DD, local) that falls on the given weekday, starting today. */
function nextWeekday(weekday: number) {
  const d = new Date();
  d.setDate(d.getDate() + ((weekday - d.getDay() + 7) % 7));
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** A Google Calendar "create event" link with the event's details filled in (Central time). */
export function googleCalendarUrl(e: FoundersEvent) {
  const details = `${e.blurb || ""}\n\nHosted by ${site.fullName}. ${site.domain}`;
  if (e.recurring && e.weekday != null) {
    const first = nextWeekday(e.weekday);
    if (e.until && first > e.until) return null;
    const t = parseTime(e.time);
    if (!t) return null;
    const p = new URLSearchParams({
      action: "TEMPLATE",
      text: e.name,
      dates: `${ymd(first)}T${t[0]}/${ymd(first)}T${t[1]}`,
      ctz: "America/Chicago",
      details,
      recur: `RRULE:FREQ=WEEKLY${e.until ? `;UNTIL=${ymd(e.until)}T235959Z` : ""}`,
    });
    if (e.location) p.set("location", e.location);
    return `https://calendar.google.com/calendar/render?${p.toString()}`;
  }
  if (!e.start) return null;
  const t = parseTime(e.time);
  const dates =
    t && !e.end ? `${ymd(e.start)}T${t[0]}/${ymd(e.start)}T${t[1]}` : `${ymd(e.start)}/${nextDay(e.end || e.start)}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.name.startsWith("Founders") ? e.name : `${e.name} (Founders)`,
    dates,
    ctz: "America/Chicago",
    details,
  });
  if (e.location) params.set("location", e.location);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function AddToCalendar({ e }: { e: FoundersEvent }) {
  // Built in the visitor's browser, so weekly events start from the next real date, not the build date.
  const [href, setHref] = useState<string | null>(null);
  useEffect(() => setHref(googleCalendarUrl(e)), [e]);
  if (!href) return null;
  return (
    <a className="btn btn--ghost btn--sm cal-btn" href={href} target="_blank" rel="noopener noreferrer">
      + Add to Google Calendar <span className="arrow" aria-hidden="true">↗</span>
    </a>
  );
}
