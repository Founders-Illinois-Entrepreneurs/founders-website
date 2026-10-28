"use client";

/*
 * Runway: keep a startup alive for 12 months.
 * Each month a card asks a question; swipe (or tap a button, or press ← / →) to choose.
 * Choices move cash, users and morale. Any stat at 0 and the startup dies.
 * Cards live in content/runway.ts. Best run is remembered on this device only.
 */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { runwayCards, type Effects, type RunwayCard, type Stat } from "@/content/runway";

const MONTHS = 12;
const BURN = 5; // cash spent every month no matter what you pick
const START: Record<Stat, number> = { cash: 50, users: 50, morale: 50 };
const STATS: { id: Stat; label: string }[] = [
  { id: "cash", label: "Cash" },
  { id: "users", label: "Users" },
  { id: "morale", label: "Morale" },
];
const DEATH: Record<Stat, string> = {
  cash: "You ran out of cash.",
  users: "Nobody's using it anymore.",
  morale: "The team burned out and quit.",
};
const BEST_KEY = "founders-runway-best";

const shuffle = <T,>(a: T[]) => {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};
const clamp = (v: number) => Math.max(0, Math.min(100, v));

type Phase = "intro" | "playing" | "won" | "lost";

export default function RunwayGame() {
  const [deck, setDeck] = useState<RunwayCard[]>([]);
  const [month, setMonth] = useState(0);
  const [stats, setStats] = useState(START);
  const [phase, setPhase] = useState<Phase>("intro");
  const [death, setDeath] = useState<Stat | null>(null);
  const [preview, setPreview] = useState<"left" | "right" | null>(null);
  const [drag, setDrag] = useState(0);
  const [best, setBest] = useState(0);
  const [flash, setFlash] = useState<Effects | null>(null);
  const startX = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      setBest(Number(localStorage.getItem(BEST_KEY)) || 0);
    } catch {
      /* storage blocked: no best score */
    }
  }, []);

  const saveBest = (m: number) => {
    if (m <= best) return;
    setBest(m);
    try {
      localStorage.setItem(BEST_KEY, String(m));
    } catch {
      /* ignore */
    }
  };

  const start = () => {
    setDeck(shuffle(runwayCards).slice(0, MONTHS));
    setMonth(0);
    setStats(START);
    setDeath(null);
    setPreview(null);
    setDrag(0);
    setFlash(null);
    setPhase("playing");
    setTimeout(() => cardRef.current?.focus(), 0);
  };

  const card = deck[month];

  const choose = useCallback(
    (side: "left" | "right") => {
      if (phase !== "playing" || !card) return;
      const fx: Effects = { ...card[side].fx, cash: (card[side].fx.cash ?? 0) - BURN };
      const next = { ...stats };
      (Object.keys(fx) as Stat[]).forEach((k) => (next[k] = clamp(next[k] + (fx[k] ?? 0))));
      setStats(next);
      setFlash(fx);
      setPreview(null);
      setDrag(0);
      const dead = STATS.find((s) => next[s.id] <= 0);
      const survived = month + 1;
      if (dead) {
        setDeath(dead.id);
        setPhase("lost");
        saveBest(month);
      } else if (survived >= MONTHS) {
        setPhase("won");
        saveBest(MONTHS);
      } else {
        setMonth(survived);
      }
      setTimeout(() => setFlash(null), 700);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [phase, card, stats, month, best]
  );

  // swipe
  const onDown = (e: React.PointerEvent) => {
    if (phase !== "playing") return;
    startX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    setDrag(dx);
    setPreview(dx < -24 ? "left" : dx > 24 ? "right" : null);
  };
  const onUp = () => {
    if (startX.current === null) return;
    startX.current = null;
    if (drag < -90) choose("left");
    else if (drag > 90) choose("right");
    else {
      setDrag(0);
      setPreview(null);
    }
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); choose("left"); }
    else if (e.key === "ArrowRight") { e.preventDefault(); choose("right"); }
  };

  const previewFx = preview && card ? card[preview].fx : null;

  return (
    <div className="runway">
      <div className="runway__stats" aria-label="Your startup">
        {STATS.map((s) => {
          const v = stats[s.id];
          const hint = previewFx?.[s.id];
          const changed = flash?.[s.id];
          return (
            <div key={s.id} className={`runway__stat ${v <= 20 ? "is-low" : ""}`}>
              <div className="runway__stat-top">
                <span className="tag">{s.label}</span>
                {s.id === "cash" && <span className="runway__burn">-{BURN}/mo</span>}
                {hint ? <span className="runway__hint" aria-hidden="true" title="This choice affects it">●</span> : null}
                {changed ? (
                  <span className={`runway__delta ${changed > 0 ? "is-up" : "is-down"}`}>
                    {changed > 0 ? `+${changed}` : changed}
                  </span>
                ) : null}
              </div>
              <div className="runway__bar" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={v} aria-label={s.label}>
                <span style={{ width: `${v}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {phase === "intro" && (
        <div className="runway__card runway__card--static">
          <span className="tag">The game</span>
          <h3 className="display display--md">Keep your startup alive for 12 months.</h3>
          <p className="card__body">
            Every month brings a decision. Swipe left or right, or use the buttons. You burn cash every month
            no matter what, so watch your cash, users and morale. If any of them hits zero, you&apos;re done.
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn--orange" onClick={start}>
              Start month 1
            </button>
            {best > 0 && <span className="chip chip--muted">Your best: {best === MONTHS ? "survived all 12" : `${best} months`}</span>}
          </div>
        </div>
      )}

      {phase === "playing" && card && (
        <>
          <div
            ref={cardRef}
            className={`runway__card ${preview ? `leans-${preview}` : ""}`}
            tabIndex={0}
            role="group"
            aria-roledescription="decision card"
            aria-label={`Month ${month + 1} of ${MONTHS}. ${card.prompt} Left: ${card.left.label}. Right: ${card.right.label}. Use arrow keys to choose.`}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onKeyDown={onKey}
            style={{ transform: `translateX(${drag}px) rotate(${drag / 22}deg)` }}
          >
            <div className="runway__month">
              Month {month + 1} <span>/ {MONTHS}</span>
            </div>
            <p className="runway__prompt">{card.prompt}</p>
            <div className="runway__labels" aria-hidden="true">
              <span className={preview === "left" ? "is-on" : ""}>← {card.left.label}</span>
              <span className={preview === "right" ? "is-on" : ""}>{card.right.label} →</span>
            </div>
          </div>
          <div className="runway__choices">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => choose("left")}
              onMouseEnter={() => setPreview("left")}
              onMouseLeave={() => setPreview(null)}
              onFocus={() => setPreview("left")}
              onBlur={() => setPreview(null)}
            >
              ← {card.left.label}
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => choose("right")}
              onMouseEnter={() => setPreview("right")}
              onMouseLeave={() => setPreview(null)}
              onFocus={() => setPreview("right")}
              onBlur={() => setPreview(null)}
            >
              {card.right.label} →
            </button>
          </div>
        </>
      )}

      {(phase === "won" || phase === "lost") && (
        <div className={`runway__card runway__card--static ${phase === "won" ? "is-won" : ""}`} role="status">
          <span className="tag">{phase === "won" ? "Month 12" : `Month ${month + 1}`}</span>
          <h3 className="display display--md">
            {phase === "won" ? "Still standing after 12 months." : death ? DEATH[death] : "Game over."}
          </h3>
          <p className="card__body">
            {phase === "won"
              ? "Most startups don't make it this far. Builders like you are who Founders is for."
              : `You made it ${month} month${month === 1 ? "" : "s"}. Every founder has a few of these. Run it back.`}
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn--orange" onClick={start}>
              Play again
            </button>
            {phase === "won" && (
              <Link href="/apply" className="btn btn--ghost">
                See how to apply
              </Link>
            )}
          </div>
          {phase === "won" && <p className="runway__psst">psst: ↑ ↑ ↓ ↓ ← → ← → B A</p>}
        </div>
      )}
    </div>
  );
}
