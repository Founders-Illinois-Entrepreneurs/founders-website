"use client";

/*
 * A tiny "build something" toy, the successor to the old falling-cubes hero.
 * Tap or click anywhere to drop a block; blocks stack into towers.
 * Keyboard: focus the box and press Space/Enter to drop at a random spot.
 * Reduced motion: blocks land instantly instead of falling.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import useReducedMotion from "./useReducedMotion";

type Block = { col: number; y: number; vy: number; restY: number; color: string; tilt: number; settled: boolean };

const COLORS = ["#ff9500", "#13294b", "#ff9500", "#111318", "#ff9500", "#24467a"];

export default function BlockToy() {
  const reduced = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blocks = useRef<Block[]>([]);
  const heights = useRef<number[]>([]);
  const size = useRef({ w: 0, h: 0, cell: 34, cols: 0 });
  const raf = useRef(0);
  const [count, setCount] = useState(0);

  const draw = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const { w, h, cell } = size.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    // baseline
    ctx.fillStyle = "#111318";
    ctx.fillRect(0, h - 3, w, 3);
    for (const b of blocks.current) {
      const x = b.col * cell;
      ctx.save();
      ctx.translate(x + cell / 2, b.y + cell / 2);
      ctx.rotate(b.settled ? 0 : b.tilt);
      ctx.fillStyle = b.color;
      ctx.fillRect(-cell / 2 + 1, -cell / 2 + 1, cell - 2, cell - 2);
      ctx.strokeStyle = "#111318";
      ctx.lineWidth = 2;
      ctx.strokeRect(-cell / 2 + 1, -cell / 2 + 1, cell - 2, cell - 2);
      ctx.restore();
    }
  }, []);

  const loop = useCallback(() => {
    raf.current = 0;
    let moving = false;
    for (const b of blocks.current) {
      if (b.settled) continue;
      b.vy += 0.9;
      b.y += b.vy;
      b.tilt *= 0.92;
      if (b.y >= b.restY) {
        b.y = b.restY;
        if (Math.abs(b.vy) > 4) {
          b.vy = -b.vy * 0.25; // small bounce
          moving = true;
        } else {
          b.settled = true;
        }
      } else moving = true;
    }
    draw();
    if (moving) raf.current = requestAnimationFrame(loop);
  }, [draw]);

  const resize = useCallback(() => {
    const box = boxRef.current;
    const c = canvasRef.current;
    if (!box || !c) return;
    const { width, height } = box.getBoundingClientRect();
    const cell = width < 500 ? 28 : 34;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(width * dpr);
    c.height = Math.round(height * dpr);
    const cols = Math.max(1, Math.floor(width / cell));
    const changed = cols !== size.current.cols || cell !== size.current.cell;
    size.current = { w: width, h: height, cell, cols };
    if (changed) {
      blocks.current = [];
      heights.current = new Array(cols).fill(0);
      setCount(0);
    }
    draw();
  }, [draw]);

  useEffect(() => {
    resize();
    const ro = new ResizeObserver(resize);
    if (boxRef.current) ro.observe(boxRef.current);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [resize]);

  const drop = useCallback(
    (col: number) => {
      const { h, cell, cols } = size.current;
      const c = Math.max(0, Math.min(cols - 1, col));
      const maxStack = Math.floor((h - 60) / cell);
      if (heights.current[c] >= maxStack) return;
      heights.current[c] += 1;
      const restY = h - 3 - heights.current[c] * cell;
      blocks.current.push({
        col: c,
        y: reduced ? restY : -cell,
        vy: 0,
        restY,
        color: COLORS[blocks.current.length % COLORS.length],
        tilt: reduced ? 0 : (Math.random() - 0.5) * 0.8,
        settled: reduced,
      });
      setCount((n) => n + 1);
      if (reduced) draw();
      else if (!raf.current) raf.current = requestAnimationFrame(loop);
    },
    [draw, loop, reduced]
  );

  const onPointer = (e: React.PointerEvent) => {
    const rect = boxRef.current!.getBoundingClientRect();
    drop(Math.floor((e.clientX - rect.left) / size.current.cell));
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      drop(Math.floor(Math.random() * size.current.cols));
    }
  };

  const reset = () => {
    blocks.current = [];
    heights.current = new Array(size.current.cols).fill(0);
    setCount(0);
    draw();
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={boxRef}
        className="toy"
        role="button"
        tabIndex={0}
        aria-label={`Block builder. Press Space to drop a block. ${count} blocks placed.`}
        onPointerDown={onPointer}
        onKeyDown={onKey}
      >
        <canvas ref={canvasRef} aria-hidden="true" />
        <span className="toy__hint tag">
          {count === 0 ? "Tap anywhere to drop a block" : `${count} blocks. Keep building.`}
        </span>
      </div>
      {count > 0 && (
        <button type="button" className="btn btn--ghost btn--sm toy__reset" onClick={reset}>
          Clear
        </button>
      )}
    </div>
  );
}
