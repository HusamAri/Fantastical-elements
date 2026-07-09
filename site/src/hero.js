/*
 * FORP HERO — "The Fragments" · PHASE I (continuous video-scrub + motion typography)
 * ---------------------------------------------------------------------------------
 * The intro is driven by the FILM itself: phase1 = clips C1–C6, the six locked keyframes
 * morphed one into the next by Kling (K1→K2→K12→K3→K11→K13→K14). Scroll scrubs the video's
 * playhead.
 *
 * FREEZE = 0 ON CONNECTIONS (director's rule): the scrub is CONTINUOUS — the film never
 * dead-stops at a join. There are no "hold" frames; every clip is scrubbed edge-to-edge and
 * the playhead always advances with scroll. Lingering on a reveal is achieved by SLOWING the
 * motion (a heavier scroll weight on that clip), never by freezing it. Only the very last
 * frame parks under the CTA (the finale — not a scene connection).
 *
 * MOTION UI (director's rule + reference): text does not just fade — it REVEALS WITH MOTION as
 * the scroll continues (rises + unblurs through its window). Fragment reveals are frosted-glass
 * cards with the real character CUTOUT breaking the card edge and parallaxing over it.
 *
 * PACING ("tailor seconds between frames, then the length"): each clip is a fixed ~5.05s of
 * film; its DWELL is tailored by a scroll weight. Page length = Σ(weights). Calm/reveal beats
 * are weighted heavy (slow, they breathe); action beats light (they snap past).
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const FRAG_BASE = "https://curatedchaos.artifactstudio.info/en/works/fragments/";
const FRAGMENTS = {
  agustin: { roman: "I",  name: "Agustín", slogan: "A minimalist visual poem about artistic awakening.", slug: "agustin", cut: "/fragments/agustin.png" },
  najoua:  { roman: "II", name: "Najoua",  slogan: "Kindness mistaken for weakness — until she spoke.",  slug: "najoua",  cut: "/fragments/najoua.png" },
};

// Film duration read from the element once metadata loads; this is the fallback.
let DUR = 30.29;
const anchor = (i) => (i / 6) * DUR; // 7 keyframes at the six equal clip boundaries

// Per-clip scroll weights (pacing) + a final outro zone for the CTA.
const CLIPW = [1.5, 1.4, 1.15, 1.15, 1.2, 1.35]; // C1 shatter · C2→Agustín · C3 action · C4→Najoua · C5 · C6 throw
const OUTRO = 1.5;                                 // CTA settle on the last frame
const WTOTAL = CLIPW.reduce((a, b) => a + b, 0) + OUTRO;
const S = [0];                                     // S[i] = scroll fraction at keyframe Ki (i=0..6)
for (let i = 0; i < 6; i++) S.push(S[i] + CLIPW[i] / WTOTAL);
const OUT0 = S[6];                                 // outro spans [OUT0, 1]
const sz = (i) => S[i + 1] - S[i];

const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);
const inv = (v, a, b) => (b === a ? 0 : clamp((v - a) / (b - a), 0, 1));
const lerp = (a, b, t) => a + (b - a) * t;

const els = {
  film: document.getElementById("film"),
  scrim: document.querySelector(".scrim"),
  tick: document.getElementById("railTick"),
  label: document.getElementById("railLabel"),
};

// ---- Fragment card markup (frosted panel + cutout that breaks the edge) ----
function cardHTML(f, side) {
  return `<figure class="fcard fcard--${side}">
    <span class="fcard__ghost">${f.roman}</span>
    <img class="fcard__cut" src="${f.cut}" alt="${f.name}" draggable="false" />
    <figcaption class="fcard__panel">
      <span class="fcard__idx">Fragment ${f.roman}</span>
      <svg class="fcard__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span class="fcard__name">${f.name}</span>
      <span class="fcard__slogan">“${f.slogan}”</span>
      <a class="fcard__enter" href="${FRAG_BASE}${f.slug}" target="_blank" rel="noopener">Enter the fragment →</a>
    </figcaption>
  </figure>`;
}

const plateEl = (k) => document.querySelector(`[data-plate="${k}"]`);
plateEl("fragA").innerHTML = cardHTML(FRAGMENTS.agustin, "right");
plateEl("fragN").innerHTML = cardHTML(FRAGMENTS.najoua, "left");

// ---- Plate timeline: window [a,b] in scroll + motion params ----
// type "text": rises + unblurs. type "card": panel + cutout parallax at different rates.
const PLATES = [
  { key: "title",      type: "text", a: 0,                   b: S[0] + 0.62 * sz(0), fin: 0.0,  fout: 0.42, y: [0, -70],  blur: 8 },
  { key: "note",       type: "text", a: S[1] - 0.34 * sz(0), b: S[1] + 0.42 * sz(1), fin: 0.30, fout: 0.30, y: [46, -46], blur: 7 },
  { key: "fragA",      type: "card", a: S[2] - 0.44 * sz(1), b: S[2] + 0.54 * sz(2), fin: 0.20, fout: 0.24, side: 1 },
  { key: "beatAction", type: "text", a: S[2] + 0.60 * sz(2), b: S[3] + 0.05 * sz(3), fin: 0.30, fout: 0.30, y: [46, -46], blur: 7 },
  { key: "fragN",      type: "card", a: S[4] - 0.44 * sz(3), b: S[4] + 0.54 * sz(4), fin: 0.20, fout: 0.24, side: -1 },
  { key: "beatCharge", type: "text", a: S[5] - 0.34 * sz(4), b: S[5] + 0.40 * sz(5), fin: 0.30, fout: 0.32, y: [46, -46], blur: 7 },
  { key: "beatThrow",  type: "text", a: S[5] + 0.44 * sz(5), b: OUT0 + 0.12 * (1 - OUT0), fin: 0.34, fout: 0.30, y: [40, -40], blur: 6 },
  { key: "cta",        type: "text", a: OUT0 - 0.10 * sz(5), b: 1.0, fin: 0.16, fout: 0.0, y: [40, 0], blur: 6 },
];
for (const pl of PLATES) {
  pl.el = plateEl(pl.key);
  if (pl.type === "card") {
    pl.cut = pl.el.querySelector(".fcard__cut");
    pl.panel = pl.el.querySelector(".fcard__panel");
    pl.ghost = pl.el.querySelector(".fcard__ghost");
  }
}

function envelope(u, fin, fout) {
  if (u < 0 || u > 1) return 0;
  let o = 1;
  if (fin > 0 && u < fin) o = smooth(u / fin);
  if (fout > 0 && u > 1 - fout) o = Math.min(o, smooth((1 - u) / fout));
  return o;
}

function applyPlate(pl, p) {
  const u = inv(p, pl.a, pl.b);
  const o = envelope(u, pl.fin, pl.fout);
  const el = pl.el;
  if (o <= 0.001) {
    if (el.style.opacity !== "0") { el.style.opacity = "0"; el.classList.remove("is-live"); }
    return 0;
  }
  el.style.opacity = o.toFixed(3);
  el.classList.toggle("is-live", o > 0.6);
  if (pl.type === "card") {
    // whole card drifts gently; cutout + panel move at DIFFERENT rates → depth (reference look)
    el.style.transform = `translate3d(0, ${lerp(24, -22, u).toFixed(1)}px, 0)`;
    pl.cut.style.transform = `translate3d(${(pl.side * lerp(-10, 18, u)).toFixed(1)}px, ${lerp(54, -78, u).toFixed(1)}px, 0) scale(${lerp(1.05, 1.0, u).toFixed(3)})`;
    pl.panel.style.transform = `translate3d(${(pl.side * lerp(52, -6, u)).toFixed(1)}px, ${lerp(30, -20, u).toFixed(1)}px, 0)`;
    pl.panel.style.clipPath = `inset(0 0 ${clamp((1 - o) * 42, 0, 42).toFixed(1)}% 0 round 18px)`;
    pl.ghost.style.transform = `translate3d(${(pl.side * lerp(30, -30, u)).toFixed(1)}px, ${lerp(-10, -40, u).toFixed(1)}px, 0)`;
  } else {
    const blur = (1 - o) * pl.blur;
    el.style.transform = `translate3d(0, ${lerp(pl.y[0], pl.y[1], u).toFixed(1)}px, 0)`;
    el.style.filter = blur > 0.25 ? `blur(${blur.toFixed(2)}px)` : "";
  }
  return o;
}

// ---- Video-time target from scroll (continuous, monotonic — never a dead hold) ----
function timeAt(p) {
  if (p >= OUT0) return DUR - 0.02;                 // finale parks on the last frame
  for (let i = 0; i < 6; i++) {
    if (p < S[i + 1] || i === 5) return lerp(anchor(i), anchor(i + 1), inv(p, S[i], S[i + 1]));
  }
  return 0;
}

let targetTime = 0, ready = false;
function onScroll(p) {
  targetTime = timeAt(p);
  let strongest = 0;
  for (const pl of PLATES) strongest = Math.max(strongest, applyPlate(pl, p));
  els.scrim.style.opacity = (0.12 + 0.42 * strongest).toFixed(3);
  const pc = Math.round(p * 100);
  els.tick.style.top = els.label.style.top = `${p * 100}%`;
  els.label.textContent = String(pc).padStart(2, "0");
}

// Ease the playhead toward the scroll target every frame — a weighty, filmic scrub.
function scrubTick() {
  if (ready && els.film.readyState >= 2) {
    const cur = els.film.currentTime;
    const next = lerp(cur, clamp(targetTime, 0, DUR - 0.02), 0.2);
    if (Math.abs(next - cur) > 0.003) { try { els.film.currentTime = next; } catch (_) {} }
  }
}

function initStatic() {
  // Reduced-motion: no scrub. The film loops dimmed behind, and CSS reveals EVERY plate
  // (all six fragment cards, names, slogans, links + beat captions) in a stacked, scrollable
  // layout — the full narrative stays accessible without motion.
  document.body.classList.add("is-static");
  const f = els.film;
  f.setAttribute("loop", ""); f.muted = true;
  f.play?.().catch(() => {});
}

function boot() {
  const f = els.film;
  const onMeta = () => { if (f.duration && isFinite(f.duration)) DUR = f.duration; ready = true; ScrollTrigger.refresh(); };
  if (f.readyState >= 1) onMeta();
  f.addEventListener("loadedmetadata", onMeta, { once: true });

  if (prefersReduced) return initStatic();
  // Prime the pipeline (some browsers need a play/pause to become seekable) — scrub path ONLY,
  // so it never races initStatic's loop and freezes the film for reduced-motion users.
  f.play?.().then(() => f.pause()).catch(() => {});

  // Page length from the tailored pacing weights.
  document.getElementById("hero-sec").style.height = `${Math.round(WTOTAL * 92)}vh`;

  const lenis = new Lenis({ lerp: 0.08 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); scrubTick(); });
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.create({
    trigger: "#hero-sec", start: "top top", end: "bottom bottom",
    pin: ".hero__pin", scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
    onUpdate: (self) => onScroll(self.progress),
  });

  onScroll(0);
  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts?.ready) document.fonts.ready.then(refresh);
  addEventListener("load", refresh);

  // Deterministic seek for offline animatic capture (?capture): jump scroll + film exactly.
  if (location.search.includes("capture")) {
    window.__seek = (p) => {
      const max = document.documentElement.scrollHeight - innerHeight;
      lenis.scrollTo(p * max, { immediate: true });
      ScrollTrigger.update();
      onScroll(p);
      try { els.film.currentTime = clamp(timeAt(p), 0, DUR - 0.02); } catch (_) {}
    };
    window.__ready = () => ready && els.film.readyState >= 2;
  }
}

boot();
