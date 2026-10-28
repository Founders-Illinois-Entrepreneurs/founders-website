"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up to `value` the first time it scrolls into view. Shows the final number before JS runs. */
export default function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || done.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1100;
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        setShown(0);
        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {shown.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
