"use client";

/*
 * Pitch Dash (easter egg). A nerdy college founder sprints toward demo day, laptop under one arm.
 * Jump over bugs, rejections and burnout; grab coffee for bonus points and a short shield.
 * Opened by the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) or by tapping "Go build." in the footer 5 times.
 * Controls: Space / ↑ / tap to jump. Enter or tap to restart. Esc closes.
 */

import { useCallback, useEffect, useRef, useState } from "react";

type Thing = { x: number; w: number; h: number; kind: "bug" | "no" | "burnout" | "coffee"; y: number; hit?: boolean };

const BEST_KEY = "founders-dash-best";
const INK = "#111318";
const ORANGE = "#ff9500";
const BLUE = "#13294b";

/** Thick line with an ink outline, for cartoon limbs. */
function limb(ctx: CanvasRenderingContext2D, pts: [number, number][], color: string, w = 5) {
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const [stroke, width] of [[INK, w + 2.5], [color, w]] as const) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (const [x, y] of pts.slice(1)) ctx.lineTo(x, y);
    ctx.stroke();
  }
}

/**
 * The runner: an original cartoon college kid (big glasses, messy hair, orange hoodie,
 * Illinois-blue jeans) hugging a laptop. Drawn in a 28x44 box with feet at the bottom.
 * step: 0 or 1 for the running stride; airborne: leaping pose.
 */
function drawNerd(ctx: CanvasRenderingContext2D, x: number, y: number, step: number, airborne: boolean) {
  ctx.save();
  ctx.translate(x, y);
  const JEANS = "#24467a";
  const SKIN = "#e9b48a";
  const HOODIE = ORANGE;

  // legs (behind the body)
  const hipA: [number, number] = [11, 31];
  const hipB: [number, number] = [17, 31];
  let legA: [number, number][], legB: [number, number][];
  if (airborne) {
    legA = [hipA, [4, 36], [-3, 38]]; // trailing leg stretched back
    legB = [hipB, [24, 35], [29, 41]]; // lead leg reaching forward
  } else if (step === 0) {
    legA = [hipA, [7, 37], [3, 42]];
    legB = [hipB, [21, 36], [24, 43]];
  } else {
    legA = [hipA, [13, 37], [16, 43]];
    legB = [hipB, [15, 37], [9, 41]];
  }
  limb(ctx, legA, JEANS, 5);
  limb(ctx, legB, JEANS, 5);
  // sneakers
  for (const leg of [legA, legB]) {
    const [fx, fy] = leg[leg.length - 1];
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(fx - 3, fy - 2, 8, 4, 2);
    ctx.fill();
    ctx.stroke();
  }

  // back arm (swings)
  limb(ctx, airborne ? [[9, 20], [2, 15]] : step === 0 ? [[9, 20], [4, 27]] : [[9, 20], [12, 28]], HOODIE, 4.5);

  // hoodie body
  ctx.fillStyle = HOODIE;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(6, 17, 16, 16, 5);
  ctx.fill();
  ctx.stroke();
  // drawstrings
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(12, 19); ctx.lineTo(12, 24);
  ctx.moveTo(16, 19); ctx.lineTo(16, 24);
  ctx.stroke();

  // laptop tucked under the front arm
  ctx.save();
  ctx.translate(20, 24);
  ctx.rotate(-0.18);
  ctx.fillStyle = "#c9ced6";
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.roundRect(-3, -6, 15, 10, 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = ORANGE; // little chevron sticker
  ctx.beginPath();
  ctx.moveTo(2, 1); ctx.lineTo(4.5, -2); ctx.lineTo(7, 1);
  ctx.lineTo(6, 1.8); ctx.lineTo(4.5, 0); ctx.lineTo(3, 1.8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  // front arm hugging the laptop
  limb(ctx, [[17, 20], [22, 27], [28, 24]], HOODIE, 4.5);

  // head
  ctx.fillStyle = SKIN;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(15, 9, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // messy hair
  ctx.fillStyle = "#2b2118";
  ctx.beginPath();
  ctx.moveTo(6.5, 8);
  ctx.quadraticCurveTo(7, 0, 15, 0.5);
  ctx.quadraticCurveTo(23, 0.5, 23.5, 7);
  ctx.lineTo(21, 4.5);
  ctx.lineTo(19.5, 6.5);
  ctx.lineTo(17, 3.5);
  ctx.lineTo(14, 6);
  ctx.lineTo(11.5, 3.5);
  ctx.lineTo(9, 7);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath(); // cowlick
  ctx.moveTo(13, 1.5);
  ctx.quadraticCurveTo(12, -2.5, 15.5, -2);
  ctx.quadraticCurveTo(14, -0.5, 15, 1.5);
  ctx.closePath();
  ctx.fill();
  // big round glasses
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.6;
  for (const gx of [13, 20]) {
    ctx.beginPath();
    ctx.arc(gx, 10, 3.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(16.4, 10); ctx.lineTo(16.6, 10);
  ctx.moveTo(9.6, 10); ctx.lineTo(7.5, 9);
  ctx.stroke();
  // determined grin
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.arc(18, 14, 2.2, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();

  ctx.restore();
}

export default function PitchDash({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const jumpRef = useRef<() => void>(() => {});
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [over, setOver] = useState(false);
  const [runId, setRunId] = useState(0);
  const playing = true; // same game on every device

  // focus + escape + restore focus
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    try {
      setBest(Number(localStorage.getItem(BEST_KEY)) || 0);
    } catch {
      /* ignore */
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [onClose]);

  useEffect(() => {
    if (!playing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = 720;
    const H = 240;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const GROUND = H - 34;
    const P = { x: 70, y: GROUND - 44, w: 24, h: 44, vy: 0, onGround: true };
    let things: Thing[] = [];
    let speed = 5.2;
    let dist = 0;
    let bonus = 0;
    let shieldUntil = 0;
    let nextSpawn = 60;
    let frame = 0;
    let dead = false;
    let raf = 0;
    let lastScore = -1;
    let bestLocal = 0;
    try {
      bestLocal = Number(localStorage.getItem(BEST_KEY)) || 0;
    } catch {
      /* ignore */
    }
    setOver(false);
    setScore(0);

    const jump = () => {
      if (dead) {
        setRunId((n) => n + 1); // restart
        return;
      }
      if (P.onGround) {
        P.vy = -11.6;
        P.onGround = false;
      }
    };
    jumpRef.current = jump;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault();
        jump();
      } else if (e.key === "Enter" && dead) {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", onKey);

    const spawn = () => {
      const r = Math.random();
      if (r < 0.22) {
        things.push({ kind: "coffee", x: W + 20, w: 18, h: 20, y: GROUND - 80 - Math.random() * 30 });
      } else {
        const kind = r < 0.5 ? "bug" : r < 0.78 ? "no" : "burnout";
        const h = kind === "burnout" ? 46 : kind === "no" ? 36 : 24;
        const w = kind === "burnout" ? 30 : kind === "no" ? 34 : 30;
        things.push({ kind, x: W + 20, w, h, y: GROUND - h });
      }
      nextSpawn = 55 + Math.random() * 60 - Math.min(30, speed * 2);
    };

    const drawThing = (t: Thing) => {
      if (t.kind === "coffee") {
        ctx.fillStyle = "#6b3f1f";
        ctx.fillRect(t.x, t.y + 4, t.w, t.h - 4);
        ctx.fillStyle = "#fff";
        ctx.fillRect(t.x + 2, t.y + 7, t.w - 4, 4);
        ctx.strokeStyle = "#6b3f1f";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(t.x + t.w + 2, t.y + 13, 5, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();
        return;
      }
      const fill = t.kind === "bug" ? INK : t.kind === "no" ? BLUE : ORANGE;
      ctx.fillStyle = fill;
      if (t.kind === "burnout") {
        ctx.beginPath();
        ctx.moveTo(t.x, t.y + t.h);
        ctx.lineTo(t.x + t.w / 2, t.y);
        ctx.lineTo(t.x + t.w, t.y + t.h);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = INK;
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        ctx.fillRect(t.x, t.y, t.w, t.h);
        if (t.kind === "bug") {
          ctx.fillRect(t.x - 4, t.y + 6, 4, 2);
          ctx.fillRect(t.x + t.w, t.y + 6, 4, 2);
          ctx.fillRect(t.x - 4, t.y + 14, 4, 2);
          ctx.fillRect(t.x + t.w, t.y + 14, 4, 2);
        }
      }
      ctx.fillStyle = t.kind === "burnout" ? INK : "#fff";
      ctx.font = "bold 10px ui-monospace, Menlo, monospace";
      ctx.textAlign = "center";
      const label = t.kind === "bug" ? "BUG" : t.kind === "no" ? "NO" : "BURN";
      ctx.fillText(label, t.x + t.w / 2, t.kind === "burnout" ? t.y + t.h - 6 : t.y + t.h / 2 + 4);
    };

    const tick = (now: number) => {
      frame++;
      if (!dead) {
        speed += 0.0016;
        dist += speed;
        P.vy += 0.62;
        P.y += P.vy;
        if (P.y >= GROUND - P.h) {
          P.y = GROUND - P.h;
          P.vy = 0;
          P.onGround = true;
        }
        if (--nextSpawn <= 0) spawn();
        for (const t of things) t.x -= speed;
        things = things.filter((t) => t.x + t.w > -10 && !t.hit);

        for (const t of things) {
          const hit = P.x < t.x + t.w - 3 && P.x + P.w > t.x + 3 && P.y < t.y + t.h && P.y + P.h > t.y + 3;
          if (!hit) continue;
          if (t.kind === "coffee") {
            t.hit = true;
            bonus += 100;
            shieldUntil = now + 2500;
          } else if (now < shieldUntil) {
            t.hit = true;
            bonus += 25;
          } else {
            dead = true;
            const final = Math.floor(dist / 10) + bonus;
            if (final > bestLocal) {
              bestLocal = final;
              try {
                localStorage.setItem(BEST_KEY, String(final));
              } catch {
                /* ignore */
              }
              setBest(final);
            }
            setOver(true);
          }
        }
      }

      // draw
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W, H);
      // skyline of tiny chevrons
      ctx.fillStyle = "rgba(19,41,75,0.08)";
      for (let i = 0; i < 9; i++) {
        const x = ((i * 110 - dist * 0.3) % (W + 110) + W + 110) % (W + 110) - 60;
        ctx.beginPath();
        ctx.moveTo(x, 120);
        ctx.lineTo(x + 30, 96);
        ctx.lineTo(x + 60, 120);
        ctx.lineTo(x + 60, 132);
        ctx.lineTo(x + 30, 108);
        ctx.lineTo(x, 132);
        ctx.closePath();
        ctx.fill();
      }
      // ground
      ctx.fillStyle = INK;
      ctx.fillRect(0, GROUND, W, 3);
      ctx.fillStyle = "rgba(17,19,24,0.25)";
      for (let i = 0; i < 24; i++) {
        const x = ((i * 34 - dist) % W + W) % W;
        ctx.fillRect(x, GROUND + 10, 10, 2);
      }
      for (const t of things) drawThing(t);
      // founder
      const shielded = now < shieldUntil && !dead;
      if (shielded) {
        ctx.strokeStyle = ORANGE;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(P.x + P.w / 2, P.y + P.h / 2, 30, 0, Math.PI * 2);
        ctx.stroke();
      }
      drawNerd(ctx, P.x - 2, P.y, dead ? 0 : frame % 14 < 7 ? 0 : 1, !P.onGround);

      const s = Math.floor(dist / 10) + bonus;
      if (s !== lastScore) {
        lastScore = s;
        setScore(s);
      }
      if (dead) {
        ctx.fillStyle = "rgba(255,255,255,0.78)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = INK;
        ctx.textAlign = "center";
        ctx.font = "bold 28px ui-monospace, Menlo, monospace";
        ctx.fillText("PITCH DENIED", W / 2, H / 2 - 8);
        ctx.font = "14px ui-monospace, Menlo, monospace";
        ctx.fillText("Tap, Space or Enter to run it back", W / 2, H / 2 + 20);
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, [playing, runId]);

  const onCanvasDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    jumpRef.current();
  }, []);

  return (
    <div className="dash" role="dialog" aria-modal="true" aria-labelledby="dash-title">
      <div className="dash__panel">
        <div className="dash__top">
          <div>
            <span className="tag">Easter egg unlocked</span>
            <h2 id="dash-title" className="display display--md">Pitch Dash</h2>
          </div>
          <button ref={closeRef} type="button" className="btn btn--ghost btn--sm" onClick={onClose}>
            Close
          </button>
        </div>
        <p className="card__body" style={{ margin: 0 }}>
          Get your laptop to demo day. Jump over bugs, rejections and burnout. Grab coffee for points and a quick shield.
        </p>
        {playing ? (
          <>
            <canvas ref={canvasRef} className="dash__canvas" onPointerDown={onCanvasDown} aria-label="Pitch Dash game. Press Space to jump." />
            <div className="dash__hud">
              <span className="chip">Score {score}</span>
              <span className="chip chip--muted">Best {Math.max(best, 0)}</span>
              {over && (
                <button type="button" className="btn btn--orange btn--sm" onClick={() => setRunId((n) => n + 1)}>
                  Run it back
                </button>
              )}
              <span className="dash__keys">Space / ↑ / tap to jump · Esc to close</span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
