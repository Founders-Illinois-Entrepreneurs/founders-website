import type { FoundersEvent } from "@/content/events";

/** "Nov 7, 2026", "Mar 28-29, 2027", or the event's dateLabel when exact dates aren't set. Safe on server and client. */
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
