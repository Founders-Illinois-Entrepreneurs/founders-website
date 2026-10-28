"use client";

import { Children, useEffect, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Renders a section listing only the items whose last date (YYYY-MM-DD) hasn't passed yet.
 * Decided in the visitor's browser, so the static site never shows stale "upcoming" events.
 * Renders nothing if none are upcoming. `children` must line up 1:1 with `items`.
 */
export default function UpcomingOnly({
  items,
  children,
  head,
  foot,
  className,
  style,
  listClassName,
}: {
  items: { key: string; last: string }[];
  children: ReactNode;
  head?: ReactNode;
  foot?: ReactNode;
  className?: string;
  style?: CSSProperties;
  listClassName?: string;
}) {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);
  if (!today) return null;
  const kids = Children.toArray(children);
  const shown = kids.filter((_, i) => items[i] && items[i].last >= today);
  if (!shown.length) return null;
  return (
    <section className={className} style={style}>
      {head}
      <ul className={listClassName}>{shown}</ul>
      {foot}
    </section>
  );
}
