"use client";

/*
 * Home hero slideshow: event photos that crossfade every few seconds with a slow zoom.
 * Pauses on hover/focus and when the tab is hidden. Behaves the same on every device;
 * the arrows and dots still work. Photos live in `heroSlides` in content/media.ts.
 */

import { useCallback, useEffect, useState } from "react";
import { heroSlides } from "@/content/media";

const INTERVAL = 4500;

export default function HeroSlideshow({ variant = "card" }: { variant?: "card" | "background" } = {}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = heroSlides.length;

  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);

  useEffect(() => {
    if (paused || n < 2) return;
    const t = window.setInterval(() => {
      if (!document.hidden) setI((v) => (v + 1) % n);
    }, INTERVAL);
    return () => window.clearInterval(t);
  }, [paused, n]);

  const slide = heroSlides[i];

  if (variant === "background") {
    // Decorative full-bleed backdrop behind the hero copy: photos only, no controls.
    return (
      <div className="hero__bg" aria-hidden="true">
        {heroSlides.map((s, k) => (
          <img key={s.src} src={s.src} alt="" className={`hero__bg-img ${k === i ? "is-on" : ""}`} loading={k === 0 ? "eager" : "lazy"} />
        ))}
      </div>
    );
  }

  return (
    <figure
      className="slides"
      aria-roledescription="carousel"
      aria-label="Photos from Founders events"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="slides__stage">
        {heroSlides.map((s, k) => (
          <img
            key={s.src}
            src={s.src}
            alt={k === i ? s.caption : ""}
            aria-hidden={k === i ? undefined : true}
            className={`slides__img zoom ${k === i ? "is-on" : ""}`}
            loading={k === 0 ? "eager" : "lazy"}
          />
        ))}
        <span className="slides__tag chip chip--orange">{slide.event}</span>
        <button type="button" className="slides__arrow slides__arrow--prev" onClick={() => go(-1)} aria-label="Previous photo">
          ←
        </button>
        <button type="button" className="slides__arrow slides__arrow--next" onClick={() => go(1)} aria-label="Next photo">
          →
        </button>
      </div>
      <figcaption className="slides__bar">
        <span className="slides__caption" aria-live="polite">
          {slide.caption}
        </span>
        <span className="slides__dots">
          {heroSlides.map((s, k) => (
            <button
              key={s.src}
              type="button"
              className={`slides__dot ${k === i ? "is-on" : ""}`}
              aria-label={`Show photo ${k + 1} of ${n}`}
              aria-current={k === i ? "true" : undefined}
              onClick={() => setI(k)}
            />
          ))}
        </span>
      </figcaption>
    </figure>
  );
}
