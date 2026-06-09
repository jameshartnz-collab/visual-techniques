/* Generate on-brand editorial SVG panels, one per technique.
   Output: assets/examples/<id>.svg  (16:9, 1280x720, scales crisply on 4K TV).
   No external fonts/scripts (safe inside <img>); system serif/sans fallbacks. */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
global.window = {};
require(path.join(ROOT, "data/techniques.js"));
const { CATEGORIES, DIFFICULTIES, TECHNIQUES } = global.window.VT;

const OUT = path.join(ROOT, "assets/examples");

/* ---- palette (mirrors css/styles.css :root) ---- */
const PAPER = "#f3efe6";
const PAPER2 = "#ece6d9";
const INK = "#16130d";
const INK_SOFT = "#4a4339";
const CAT = {
  camera: "#1f6f8f",
  editing: "#b1492a",
  lighting: "#9a7400",
  colour: "#6a4c93",
  "mise-en-scene": "#2e7d54",
  performance: "#b23a64",
  symbolism: "#43448a",
  "sound-image": "#0e7575",
};
const catLabel = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));
const diffLabel = Object.fromEntries(DIFFICULTIES.map((d) => [d.id, d.label]));

/* ---- helpers ---- */
function clamp(n) { return Math.max(0, Math.min(255, Math.round(n))); }
function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function rgbToHex([r, g, b]) { return "#" + [r, g, b].map((v) => clamp(v).toString(16).padStart(2, "0")).join(""); }
function mix(a, b, t) { const A = hexToRgb(a), B = hexToRgb(b); return rgbToHex([0, 1, 2].map((i) => A[i] + (B[i] - A[i]) * t)); }
function darken(h, t) { return mix(h, "#000000", t); }
function lighten(h, t) { return mix(h, "#ffffff", t); }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

/* deterministic PRNG seeded from the technique id */
function seedFrom(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed) { let s = seed || 1; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }

const W = 1280, H = 720, ART_H = 540, STRIPE = 18;

/* ---------- per-category motif drawn inside the 1280 x 540 art zone ---------- */
function motif(cat, R) {
  const c = CAT[cat];
  const deep = darken(c, 0.32);
  const lite = lighten(c, 0.5);
  const paperOnCat = PAPER;
  let s = "";

  if (cat === "camera") {
    // viewfinder: corner brackets, angle guides, focus reticle
    const b = 70, len = 150, m = 90;
    const corners = [[m, m, 1, 1], [W - m, m, -1, 1], [m, ART_H - m, 1, -1], [W - m, ART_H - m, -1, -1]];
    corners.forEach(([x, y, dx, dy]) => {
      s += `<path d="M ${x} ${y + dy * len} L ${x} ${y} L ${x + dx * len} ${y}" stroke="${paperOnCat}" stroke-width="10" fill="none" stroke-linecap="square"/>`;
    });
    const cx = W / 2 + (R() - 0.5) * 320, cy = ART_H / 2 + (R() - 0.5) * 160;
    s += `<circle cx="${cx}" cy="${cy}" r="92" stroke="${paperOnCat}" stroke-width="6" fill="none"/>`;
    s += `<line x1="${cx - 130}" y1="${cy}" x2="${cx + 130}" y2="${cy}" stroke="${paperOnCat}" stroke-width="4"/>`;
    s += `<line x1="${cx}" y1="${cy - 130}" x2="${cx}" y2="${cy + 130}" stroke="${paperOnCat}" stroke-width="4"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="10" fill="${lite}"/>`;
  } else if (cat === "editing") {
    // filmstrip with sprocket holes; uneven "cut" gaps
    const top = 70, h = ART_H - 140, holeW = 26, holeH = 34;
    s += `<rect x="60" y="${top}" width="${W - 120}" height="${h}" fill="${deep}"/>`;
    let x = 110; const frames = [];
    while (x < W - 150) { const w = 150 + Math.floor(R() * 130); frames.push([x, w]); x += w + 14; }
    frames.forEach(([fx, fw]) => { s += `<rect x="${fx}" y="${top + 56}" width="${fw}" height="${h - 112}" fill="${lighten(c, 0.18)}"/>`; });
    for (let hx = 90; hx < W - 110; hx += 70) {
      s += `<rect x="${hx}" y="${top + 12}" width="${holeW}" height="${holeH}" rx="5" fill="${PAPER}"/>`;
      s += `<rect x="${hx}" y="${top + h - 12 - holeH}" width="${holeW}" height="${holeH}" rx="5" fill="${PAPER}"/>`;
    }
  } else if (cat === "lighting") {
    // light burst from a seeded corner + hard shadow split
    const fromLeft = R() > 0.5; const ox = fromLeft ? 120 : W - 120, oy = 90;
    s += `<defs><radialGradient id="lg" cx="${(ox / W * 100).toFixed(1)}%" cy="${(oy / ART_H * 100).toFixed(1)}%" r="90%">
      <stop offset="0%" stop-color="${lighten(c, 0.62)}"/><stop offset="45%" stop-color="${c}"/><stop offset="100%" stop-color="${deep}"/>
    </radialGradient></defs>`;
    s += `<rect x="0" y="0" width="${W}" height="${ART_H}" fill="url(#lg)"/>`;
    for (let i = 0; i < 9; i++) {
      const ang = (-0.2 + i * 0.12) * (fromLeft ? 1 : -1);
      const ex = ox + Math.cos(ang) * 1500, ey = oy + Math.sin(ang) * 1500;
      s += `<line x1="${ox}" y1="${oy}" x2="${ex}" y2="${ey}" stroke="${lighten(c, 0.5)}" stroke-width="3" opacity="0.35"/>`;
    }
    s += `<circle cx="${ox}" cy="${oy}" r="46" fill="${PAPER}"/>`;
  } else if (cat === "colour") {
    // vertical graded swatch bands
    const n = 5 + Math.floor(R() * 3); const bw = W / n;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const col = mix(lighten(c, 0.55), darken(c, 0.35), t);
      s += `<rect x="${(i * bw).toFixed(1)}" y="0" width="${bw.toFixed(1) + 1}" height="${ART_H}" fill="${col}"/>`;
    }
    // offset registration line
    const ly = 120 + R() * 300;
    s += `<line x1="0" y1="${ly.toFixed(0)}" x2="${W}" y2="${ly.toFixed(0)}" stroke="${PAPER}" stroke-width="5" opacity="0.7"/>`;
  } else if (cat === "mise-en-scene") {
    // nested depth planes
    s += `<rect x="0" y="0" width="${W}" height="${ART_H}" fill="${c}"/>`;
    const layers = 5; let inset = 0;
    for (let i = 0; i < layers; i++) {
      const ox = inset + (R() - 0.5) * 40, oy = inset + (R() - 0.5) * 24;
      const w = W - 2 * inset - ox, h = ART_H - 2 * inset - oy;
      const col = mix(lighten(c, 0.5), deep, i / (layers - 1));
      s += `<rect x="${(inset + ox).toFixed(0)}" y="${(inset + oy).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="none" stroke="${col}" stroke-width="7"/>`;
      inset += 70;
    }
  } else if (cat === "performance") {
    // gesture arcs + simple figure
    s += `<rect x="0" y="0" width="${W}" height="${ART_H}" fill="${c}"/>`;
    const fx = W / 2 + (R() - 0.5) * 360, fy = ART_H - 60;
    for (let i = 0; i < 4; i++) {
      const r = 120 + i * 70 + R() * 30;
      s += `<path d="M ${fx - r} ${fy} A ${r} ${r} 0 0 1 ${fx + r} ${fy}" stroke="${lighten(c, 0.5)}" stroke-width="4" fill="none" opacity="${0.8 - i * 0.15}"/>`;
    }
    s += `<circle cx="${fx}" cy="${fy - 250}" r="46" fill="${PAPER}"/>`;
    s += `<path d="M ${fx} ${fy - 204} L ${fx} ${fy - 70} M ${fx} ${fy - 170} L ${fx - 70} ${fy - 120} M ${fx} ${fy - 170} L ${fx + 70} ${fy - 120} M ${fx} ${fy - 70} L ${fx - 55} ${fy} M ${fx} ${fy - 70} L ${fx + 55} ${fy}" stroke="${PAPER}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  } else if (cat === "symbolism") {
    // concentric rings + a seeded mark
    s += `<rect x="0" y="0" width="${W}" height="${ART_H}" fill="${c}"/>`;
    const cx = W / 2, cy = ART_H / 2;
    for (let r = 60; r < 320; r += 52) s += `<circle cx="${cx}" cy="${cy}" r="${r}" stroke="${lighten(c, 0.45)}" stroke-width="3" fill="none" opacity="0.7"/>`;
    const mark = Math.floor(R() * 3);
    if (mark === 0) s += `<path d="M ${cx} ${cy - 90} L ${cx + 80} ${cy + 70} L ${cx - 80} ${cy + 70} Z" fill="${PAPER}"/>`;
    else if (mark === 1) { s += `<line x1="${cx}" y1="${cy - 95}" x2="${cx}" y2="${cy + 95}" stroke="${PAPER}" stroke-width="16"/><line x1="${cx - 95}" y1="${cy}" x2="${cx + 95}" y2="${cy}" stroke="${PAPER}" stroke-width="16"/>`; }
    else { s += `<ellipse cx="${cx}" cy="${cy}" rx="120" ry="64" fill="none" stroke="${PAPER}" stroke-width="14"/><circle cx="${cx}" cy="${cy}" r="34" fill="${PAPER}"/>`; }
  } else if (cat === "sound-image") {
    // waveform meeting a frame line
    s += `<rect x="0" y="0" width="${W}" height="${ART_H}" fill="${c}"/>`;
    const mid = ART_H / 2, n = 46, bw = (W - 120) / n;
    for (let i = 0; i < n; i++) {
      const a = (Math.sin(i * 0.6 + seedFromLocal) * 0.5 + 0.5);
      const h = 30 + (R() * 0.6 + a * 0.4) * 200;
      const x = 60 + i * bw;
      s += `<rect x="${x.toFixed(1)}" y="${(mid - h / 2).toFixed(1)}" width="${(bw - 6).toFixed(1)}" height="${h.toFixed(1)}" rx="4" fill="${lighten(c, 0.45)}"/>`;
    }
    const vx = 200 + R() * (W - 400);
    s += `<line x1="${vx.toFixed(0)}" y1="40" x2="${vx.toFixed(0)}" y2="${ART_H - 40}" stroke="${PAPER}" stroke-width="6"/>`;
  }
  return s;
}

let seedFromLocal = 0; // used by sound-image phase, set per technique below

function buildSVG(t) {
  const cat = t.category;
  const c = CAT[cat] || INK;
  const R = rng(seedFrom(t.id));
  seedFromLocal = (seedFrom(t.id) % 100) / 16;
  const art = motif(cat, R);
  const name = esc(t.name);
  const catTxt = esc((catLabel[cat] || cat).toUpperCase());
  const diffTxt = esc((diffLabel[t.difficulty] || t.difficulty || "").toUpperCase());

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${name} — ${catTxt}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <!-- art zone -->
  <svg x="0" y="0" width="${W}" height="${ART_H}" viewBox="0 0 ${W} ${ART_H}">
    <rect width="${W}" height="${ART_H}" fill="${darken(c, 0.05)}"/>
    ${art}
  </svg>
  <!-- caption band -->
  <rect x="0" y="${ART_H}" width="${W}" height="${H - ART_H}" fill="${PAPER2}"/>
  <rect x="0" y="${ART_H}" width="${W}" height="4" fill="${INK}"/>
  <rect x="0" y="0" width="${STRIPE}" height="${H}" fill="${c}"/>
  <text x="70" y="${ART_H + 56}" font-family="Inter, 'Helvetica Neue', Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="4" fill="${c}">${catTxt}</text>
  <text x="70" y="${ART_H + 132}" font-family="Fraunces, Georgia, 'Times New Roman', serif" font-size="62" font-weight="600" fill="${INK}">${name}</text>
  <text x="${W - 70}" y="${ART_H + 56}" text-anchor="end" font-family="Inter, 'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="600" letter-spacing="3" fill="${INK_SOFT}">${diffTxt}</text>
</svg>
`;
}

let count = 0;
for (const t of TECHNIQUES) {
  const svg = buildSVG(t);
  fs.writeFileSync(path.join(OUT, t.id + ".svg"), svg, "utf8");
  count++;
}
console.log("Generated " + count + " SVG panels into " + OUT);
