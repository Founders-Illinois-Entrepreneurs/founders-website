"use client";

/*
 * Hidden trigger for Pitch Dash.
 *  - Keyboard: the Konami code ↑ ↑ ↓ ↓ ← → ← → B A (ignored while typing in a field)
 *  - Touch / click: tap "Go build." in the footer 5 times (SecretTapTarget below)
 */

import { useCallback, useEffect, useRef, useState } from "react";
import PitchDash from "./PitchDash";

const CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const EVENT = "founders:pitch-dash";

export function openPitchDash() {
  window.dispatchEvent(new Event(EVENT));
}

export default function EasterEgg() {
  const [open, setOpen] = useState(false);
  const pos = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === CODE[pos.current]) {
        pos.current += 1;
        if (pos.current === CODE.length) {
          pos.current = 0;
          setOpen(true);
        }
      } else {
        pos.current = key === CODE[0] ? 1 : 0;
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(EVENT, onOpen);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);
  return open ? <PitchDash onClose={close} /> : null;
}

/** Wrap any text; tapping it 5 times quickly opens Pitch Dash. */
export function SecretTapTarget({ children }: { children: React.ReactNode }) {
  const taps = useRef<number[]>([]);
  const onClick = () => {
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < 2500), now];
    if (taps.current.length >= 5) {
      taps.current = [];
      openPitchDash();
    }
  };
  return (
    <span onClick={onClick} style={{ cursor: "default", userSelect: "none" }}>
      {children}
    </span>
  );
}
