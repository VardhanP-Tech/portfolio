import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface Centre { x: number; y: number; s: number }
interface Pt { x: number; y: number; c: Centre; z: number; born: number; user?: boolean }

const CENTRES: Centre[] = [
  { x: 0.3, y: 0.38, s: 0.07 },
  { x: 0.68, y: 0.62, s: 0.075 },
];

function mulberry(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function zScore(x: number, y: number) {
  let best = { c: CENTRES[0], z: Infinity };
  for (const c of CENTRES) {
    const z = Math.hypot(x - c.x, y - c.y) / c.s;
    if (z < best.z) best = { c, z };
  }
  return best;
}

function makePoints(): Pt[] {
  const rand = mulberry(42);
  const gauss = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());
  const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
  const out: Pt[] = [];
  for (let i = 0; i < 220; i++) {
    const c = CENTRES[i % 2];
    const x = clamp(c.x + gauss() * c.s, 0.03, 0.97);
    const y = clamp(c.y + gauss() * c.s, 0.05, 0.95);
    out.push({ x, y, c, z: zScore(x, y).z, born: rand() * 0.8 });
  }
  for (let j = 0; j < 14; j++) {
    const c = CENTRES[j % 2];
    const ang = rand() * Math.PI * 2;
    const r = (3 + rand() * 2.2) * c.s;
    const x = clamp(c.x + Math.cos(ang) * r, 0.03, 0.97);
    const y = clamp(c.y + Math.sin(ang) * r, 0.05, 0.95);
    out.push({ x, y, c, z: zScore(x, y).z, born: rand() * 0.8 });
  }
  return out;
}

const cssVar = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

export default function AnomalyPlot({ themeKey }: { themeKey: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const base = useMemo(makePoints, []);
  const [added, setAdded] = useState<Pt[]>([]);
  const [threshold, setThreshold] = useState(2.6);
  const [hover, setHover] = useState<{ x: number; y: number; z: number } | null>(null);
  const progress = useRef(0);
  const size = useRef({ w: 0, h: 0 });

  const points = useMemo(() => [...base, ...added], [base, added]);
  const flagged = points.filter((p) => p.z > threshold).length;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const { w: W, h: H } = size.current;
    if (!canvas || !ctx || !W) return;
    const dot = cssVar("--dot"), sig = cssVar("--signal"), line = cssVar("--line"), accent = cssVar("--accent");
    ctx.clearRect(0, 0, W, H);

    ctx.strokeStyle = line; ctx.lineWidth = 1; ctx.globalAlpha = 0.5;
    ctx.beginPath();
    for (let g = 1; g < 4; g++) {
      ctx.moveTo(0, (H * g) / 4); ctx.lineTo(W, (H * g) / 4);
      ctx.moveTo((W * g) / 4, 0); ctx.lineTo((W * g) / 4, H);
    }
    ctx.stroke(); ctx.globalAlpha = 1;

    for (const c of CENTRES) {
      ctx.beginPath(); ctx.setLineDash([5, 5]);
      ctx.ellipse(c.x * W, c.y * H, threshold * c.s * W, threshold * c.s * H, 0, 0, Math.PI * 2);
      ctx.strokeStyle = sig; ctx.globalAlpha = 0.55; ctx.lineWidth = 1.25; ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha = 1;
    }

    for (const p of points) {
      const a = Math.min(1, Math.max(0, (progress.current - p.born) / 0.2));
      if (a <= 0) continue;
      const x = p.x * W, y = p.y * H, bad = p.z > threshold;
      if (bad) {
        ctx.globalAlpha = a; ctx.fillStyle = sig;
        ctx.beginPath(); ctx.arc(x, y, 4.6, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = sig; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.stroke();
      } else {
        ctx.globalAlpha = a * 0.75; ctx.fillStyle = p.user ? accent : dot;
        ctx.beginPath(); ctx.arc(x, y, p.user ? 4.4 : 3.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    if (hover) {
      const hx = hover.x * W, hy = hover.y * H, bad = hover.z > threshold;
      ctx.strokeStyle = bad ? sig : accent; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(hx, hy, 11, 0, Math.PI * 2); ctx.stroke();
    }
  }, [points, threshold, hover, themeKey]);

  // size + resize
  useEffect(() => {
    const canvas = canvasRef.current!;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const r = canvas.getBoundingClientRect();
      size.current = { w: r.width, h: r.height };
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      canvas.getContext("2d")!.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    return () => ro.disconnect();
  }, [draw]);

  // one-time intro
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { progress.current = 1.2; draw(); return; }
    let raf = 0, t0 = 0;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      progress.current = Math.min(1.2, (ts - t0) / 1400);
      draw();
      if (progress.current < 1.2) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(draw, [draw]);

  const toNorm = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  };

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const n = toNorm(e);
    setHover({ ...n, z: zScore(n.x, n.y).z });
  };
  const onClick = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const n = toNorm(e);
    const { c, z } = zScore(n.x, n.y);
    setAdded((a) => [...a.slice(-19), { x: n.x, y: n.y, c, z, born: 0, user: true }]);
  };

  return (
    <div className="plot">
      <div className="plot-head">
        <strong>Anomaly detection, live</strong>
        <output aria-live="polite"><b>{flagged}</b> flagged of {points.length}</output>
      </div>
      <canvas
        ref={canvasRef}
        id="plot-canvas"
        role="img"
        aria-label="Scatter plot of data points in two clusters. Points far from a cluster centre are highlighted as anomalies."
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
        onPointerDown={onClick}
        style={{ cursor: "crosshair", touchAction: "manipulation" }}
      />
      <p className="plot-readout" aria-live="polite">
        {hover
          ? `Point here is ${hover.z.toFixed(1)} standard deviations from the nearest cluster: ${hover.z > threshold ? "anomaly" : "normal"}.`
          : "Move over the plot to score a point. Click or tap to drop one."}
      </p>
      <label htmlFor="threshold">
        Sensitivity
        <input
          id="threshold" type="range" min={1.2} max={4} step={0.05}
          value={threshold} onChange={(e) => setThreshold(parseFloat(e.target.value))}
        />
      </label>
      <div className="plot-foot">
        <p className="plot-note">Lower the slider to flag more points. Same idea as my review-spam project: measure distance from normal, then draw a line.</p>
        {added.length > 0 && <button className="chip" type="button" onClick={() => setAdded([])}>Clear my points</button>}
      </div>
    </div>
  );
}
