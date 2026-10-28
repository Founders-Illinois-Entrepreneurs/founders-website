"use client";

/*
 * The majors sphere: every major in Founders floating on a rotating 3D globe.
 * Carried over from the old site and rebuilt:
 *  - drag or swipe to spin, with momentum; it slowly drifts on its own when idle
 *  - words facing you are dark ink, words on the far side fade to Illinois blue
 *  - tap or click a major to pull it forward (it turns orange and is announced)
 *  - "Pick one for me" and the arrow keys do the same without a mouse
 *  - pauses when scrolled offscreen or when the tab is hidden
 *  - looks and moves the same on every device; only if WebGL is unavailable does it fall back to a list
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { majors } from "@/content/media";

type Api = { pick: (i: number | null) => void; nudge: (dx: number, dy: number) => void };

export default function MajorsSphere() {
  const hostRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<Api | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (failed) return;
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;
      if (!THREE.WebGLRenderer) throw new Error("three.js not available");

      // Test for WebGL before building anything.
      const probe = document.createElement("canvas");
      if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) {
        setFailed(true);
        return;
      }

      // Use the site's display face for the labels once it has loaded.
      const family =
        getComputedStyle(document.documentElement).getPropertyValue("--font-bebas").trim() || "Impact";
      try {
        await document.fonts.load(`64px ${family}`);
      } catch {
        /* fall back to whatever loaded */
      }
      if (disposed) return;

      const INK = new THREE.Color("#111318");
      const BLUE = new THREE.Color("#24467a");
      const ORANGE = new THREE.Color("#ff9500");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 1, 2000);
      camera.position.z = 720;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        setFailed(true);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");

      const globe = new THREE.Group();
      scene.add(globe);

      const RADIUS = 230;
      const textures: import("three").CanvasTexture[] = [];
      const sprites: import("three").Sprite[] = [];
      const baseScale: [number, number][] = [];
      const n = majors.length;

      majors.forEach((word, i) => {
        const fontPx = 64;
        const c = document.createElement("canvas");
        const ctx = c.getContext("2d")!;
        ctx.font = `${fontPx}px ${family}`;
        const w = Math.ceil(ctx.measureText(word).width) + 24;
        c.width = w;
        c.height = fontPx + 16;
        ctx.font = `${fontPx}px ${family}`;
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(word, w / 2, c.height / 2 + 4);

        const tex = new THREE.CanvasTexture(c);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 4;
        textures.push(tex);
        const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, color: INK.clone() });
        const s = new THREE.Sprite(mat);

        // Even spacing on the sphere (Fibonacci lattice).
        const y = 1 - (i / (n - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = Math.PI * (3 - Math.sqrt(5)) * i;
        s.position.set(Math.cos(theta) * r * RADIUS, y * RADIUS, Math.sin(theta) * r * RADIUS);

        const h = 26;
        const sc: [number, number] = [(w / c.height) * h, h];
        baseScale.push(sc);
        s.scale.set(sc[0], sc[1], 1);
        s.userData.index = i;
        globe.add(s);
        sprites.push(s);
      });

      // ---------- state ----------
      let rotX = -0.25;
      let rotY = 0;
      let velX = 0;
      const IDLE = 0.0035; // same gentle spin on every device
      let velY = IDLE; // idle drift
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let downX = 0;
      let downY = 0;
      let pickedIdx: number | null = null;
      let visible = true;
      let raf = 0;

      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      const tmp = new THREE.Vector3();
      const tick = () => {
        raf = 0;
        if (!visible) return;
        if (!dragging) {
          rotY += velY;
          rotX = Math.max(-1.2, Math.min(1.2, rotX + velX));
          // Ease toward a gentle idle spin (holds still while a major is picked).
          const idle = pickedIdx === null ? IDLE : 0;
          velY += (idle - velY) * 0.02;
          velX *= 0.94;
          if (pickedIdx === null) rotX += (-0.25 - rotX) * 0.01;
        }
        globe.rotation.set(rotX, rotY, 0);
        globe.updateMatrixWorld();

        for (const s of sprites) {
          tmp.copy(s.position).applyMatrix4(globe.matrixWorld);
          const depth = (tmp.z + RADIUS) / (2 * RADIUS); // 0 back, 1 front
          const mat = s.material as import("three").SpriteMaterial;
          const i = s.userData.index as number;
          const isPicked = i === pickedIdx;
          if (isPicked) {
            mat.color.lerp(ORANGE, 0.25);
            mat.opacity = 1;
          } else {
            mat.color.copy(BLUE).lerp(INK, Math.pow(depth, 1.4));
            mat.opacity = 0.18 + depth * 0.82;
          }
          const target = isPicked ? 1.9 : 0.75 + depth * 0.35;
          const cur = s.scale.y / baseScale[i][1];
          const next = cur + (target - cur) * 0.15;
          s.scale.set(baseScale[i][0] * next, baseScale[i][1] * next, 1);
          s.renderOrder = isPicked ? 999 : Math.round(depth * 100);
        }
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      const start = () => {
        if (!raf && visible) raf = requestAnimationFrame(tick);
      };

      // ---------- picking ----------
      const raycaster = new THREE.Raycaster();
      const ndc = new THREE.Vector2();
      const pickAt = (clientX: number, clientY: number) => {
        const rect = host.getBoundingClientRect();
        ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
        raycaster.setFromCamera(ndc, camera);
        const hits = raycaster.intersectObjects(sprites, false);
        // Prefer the hit nearest the viewer.
        const front = hits.find((h) => {
          tmp.copy(h.object.position).applyMatrix4(globe.matrixWorld);
          return tmp.z > -RADIUS * 0.2;
        });
        setPick(front ? (front.object.userData.index as number) : null);
      };
      const setPick = (i: number | null) => {
        pickedIdx = i;
        setPicked(i);
        if (i !== null) {
          // Spin so the picked word swings toward the front.
          const p = sprites[i].position;
          const targetY = Math.atan2(-p.x, p.z);
          let d = targetY - (rotY % (Math.PI * 2));
          d = Math.atan2(Math.sin(d), Math.cos(d));
          // Velocity decays by 2% (Y) and 6% (X) per frame, so these land it near the front.
          velY = d * 0.02;
          velX = (Math.asin(Math.max(-1, Math.min(1, p.y / RADIUS))) - rotX) * 0.06;
        }
        start();
      };

      // ---------- pointer ----------
      const onDown = (e: PointerEvent) => {
        dragging = true;
        lastX = downX = e.clientX;
        lastY = downY = e.clientY;
        velX = velY = 0;
        host.setPointerCapture?.(e.pointerId);
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        velY = dx * 0.006;
        velX = dy * 0.004;
        rotY += velY;
        rotX = Math.max(-1.2, Math.min(1.2, rotX + velX));
        start();
      };
      const onUp = (e: PointerEvent) => {
        if (!dragging) return;
        dragging = false;
        if (Math.hypot(e.clientX - downX, e.clientY - downY) < 6) pickAt(e.clientX, e.clientY);
      };
      const onCancel = () => {
        dragging = false;
      };
      host.addEventListener("pointerdown", onDown);
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerup", onUp);
      host.addEventListener("pointercancel", onCancel);

      // ---------- pause when not visible ----------
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && !document.hidden;
        if (visible) start();
      });
      io.observe(host);
      const onVis = () => {
        visible = !document.hidden;
        if (visible) start();
      };
      document.addEventListener("visibilitychange", onVis);

      apiRef.current = {
        pick: setPick,
        nudge: (dx, dy) => {
          velY += dx;
          velX += dy;
          start();
        },
      };
      start();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        host.removeEventListener("pointerdown", onDown);
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerup", onUp);
        host.removeEventListener("pointercancel", onCancel);
        sprites.forEach((s) => (s.material as import("three").SpriteMaterial).dispose());
        textures.forEach((t) => t.dispose());
        renderer.dispose();
        renderer.domElement.remove();
        apiRef.current = null;
      };
    })().catch(() => {
      // Anything goes wrong building the globe: show the plain list instead of an empty circle.
      if (!disposed) setFailed(true);
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [failed]);

  const pickRandom = useCallback(() => {
    let i = Math.floor(Math.random() * majors.length);
    if (i === picked) i = (i + 1) % majors.length;
    if (apiRef.current) apiRef.current.pick(i);
    else setPicked(i);
  }, [picked]);

  const onKey = (e: React.KeyboardEvent) => {
    const api = apiRef.current;
    if (!api) return;
    const step = 0.05;
    if (e.key === "ArrowLeft") api.nudge(-step, 0);
    else if (e.key === "ArrowRight") api.nudge(step, 0);
    else if (e.key === "ArrowUp") api.nudge(0, -step);
    else if (e.key === "ArrowDown") api.nudge(0, step);
    else if (e.key === "Enter" || e.key === " ") pickRandom();
    else if (e.key === "Escape") api.pick(null);
    else return;
    e.preventDefault();
  };

  const status = (
    <div className="sphere__hud">
      <div>
        <div className="tag">{picked === null ? "Tap a major" : "You picked"}</div>
        <div className="sphere__picked" aria-live="polite">
          {picked === null ? " " : majors[picked]}
        </div>
      </div>
      <button type="button" className="btn btn--ghost btn--sm" onClick={pickRandom}>
        Pick one for me
      </button>
    </div>
  );

  if (failed) {
    return (
      <figure style={{ margin: 0 }}>
        <div className="sphere__fallback">
          <ul aria-label="Majors in Founders">
            {majors.map((m, i) => (
              <li
                key={m}
                style={picked === i ? { background: "var(--orange)", borderColor: "var(--ink)" } : undefined}
              >
                {m}
              </li>
            ))}
          </ul>
        </div>
        {status}
      </figure>
    );
  }

  return (
    <figure style={{ margin: 0 }}>
      <div
        ref={hostRef}
        className="sphere"
        role="application"
        tabIndex={0}
        aria-roledescription="spinning globe"
        aria-label="Globe of majors in Founders. Drag to spin, or use arrow keys. Press Enter to pick a major."
        onKeyDown={onKey}
      >
        <div className="sphere__ring" aria-hidden="true" />
        <ul className="sr-only">
          {majors.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
      {status}
    </figure>
  );
}
