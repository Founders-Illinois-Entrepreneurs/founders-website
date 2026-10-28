"use client";

import { useEffect, useState } from "react";

// Home hero headline. Fades in once when the page loads.
const heroLine = ["UIUC's Boldest", "Building Together."];

export default function HeroHeadline() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const r = window.requestAnimationFrame(() => setShown(true));
    return () => window.cancelAnimationFrame(r);
  }, []);
  const [a, b] = heroLine;
  return (
    <h1 className={`display display--xl hero__title hero__title--fade ${shown ? "is-on" : ""}`}>
      <span className="line">{a}</span>
      <span className="line line--orange">{b}</span>
    </h1>
  );
}
