/*
 * FORP HERO — "The Fragments" · scroll-scrubbed film in TWO continuous phases
 * ---------------------------------------------------------------------------------
 * PHASE I  (film, #hero-sec): clips C1–C6, the six locked keyframes morphed one into the next by
 *   Kling (K1→K2→K12→K3→K11→K13→K14). Scroll scrubs the playhead. Two fragments reveal — Agustín I,
 *   Najoua II — each timed to the film's own object (the record, the lotus).
 * PHASE II (film2, #reel-sec): clips C7–C16 (K14→K8→K6→K15→K9→K4→BAVER→K10→K7→K5) — the climax and
 *   resolution. It shares its FIRST frame (K14) with phase-1's LAST frame, so the crossfade at the
 *   seam is invisible: one unbroken take. Four more fragments reveal at the exact moment their motif
 *   is on screen — Federica III (the lapis pendant, K8), Başak IV (the nazar, K9), Baver V (the data
 *   in the glass, BAVER), Yaşar Efe VI (the constellation, K10). Six were witnessed; here are all six.
 *
 * FREEZE = 0 ON CONNECTIONS (director's rule): the scrub is CONTINUOUS — the film never dead-stops at
 * a join. Lingering on a reveal is achieved by SLOWING the motion (a heavier scroll weight / a wider
 * reveal window), never by freezing it.
 *
 * MOTION UI (director's rule + reference): text REVEALS WITH MOTION (rises + unblurs through its
 * window). Fragment reveals are frosted-glass cards; on desktop the real character CUTOUT breaks the
 * card edge and parallaxes over it. On mobile the cards are text + glass only (no cutout / numeral /
 * connector) — see styles.css @media(max-width:720px).
 *
 * REVEAL TIMING (director's rule): a fragment's full-opacity onset lands EXACTLY on the frame where
 * its object is on screen — never earlier. Phase-1 cards carry a hairline connector to the object;
 * phase-2's motifs move through the shot, so those cards let the reveal-on-cue timing carry the link.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const FRAG_BASE = "https://curatedchaos.artifactstudio.info/en/works/fragments/";

// ---- PHASE I fragments (scrub-scene objects live at a fixed on-screen point at the reveal keyframe) ----
const FRAGMENTS = {
  // obj = the film object's on-screen position AT this fragment's reveal moment (S[k]); the connector
  // ring + wire land on it. The record is Husam's glowing disc-sigil at his hand (K12); the lotus is
  // the glowing bloom in Najoua's hands (K11). Both cards live in the dark right-hand negative space.
  agustin: { roman: "I",  name: "Agustín", slogan: "A minimalist visual poem about artistic awakening.", slug: "agustin", cut: "/fragments/agustin.png", object: "the record", obj: { x: 20, y: 39 } },
  najoua:  { roman: "II", name: "Najoua",  slogan: "Kindness mistaken for weakness, until she finally spoke.", slug: "najoua",  cut: "/fragments/najoua.png", object: "the lotus",  obj: { x: 43, y: 57 } },
};

// ---- PHASE II fragments (t = the second in the phase-2 film where the motif is on screen; side =
//      which negative-space quadrant the card sits in). Loglines are the locked HERO-BIBLE lines. ----
const FRAG2 = {
  federica: { roman: "III", name: "Federica",  slogan: "Foglia d'Oro: the gold leaf beneath her skin.",        slug: "federica",  cut: "/fragments/federica.png",  t: 5.0,  side: 1  },
  // Başak's source art is a full poster (title + logo + sky), not a clean cutout — so her card is
  // text + glass, and the blue nazar on screen at t≈20s is her motif. Swap in a cutout when ready.
  basak:    { roman: "IV",  name: "Başak",      slogan: "From protective invisibility to deliberate presence.", slug: "basak",     textOnly: true,                  t: 20.1, side: -1 },
  baver:    { roman: "V",   name: "Baver",      slogan: "A year of surviving panic without yielding.",          slug: "baver",     cut: "/fragments/baver.png",     t: 30.2, side: 1  },
  yasar:    { roman: "VI",  name: "Yaşar Efe",  slogan: "The figure who returns the blade to himself.",         slug: "yasar-efe", cut: "/fragments/yasar-efe.png", t: 34.6, side: -1 },
};

// ---- PHASE I pacing: film duration + per-clip scroll weights ----
let DUR = 30.29;                                   // read from film metadata; fallback
const anchor = (i) => (i / 6) * DUR;               // 7 keyframes at the six equal clip boundaries
const CLIPW = [1.5, 1.4, 1.15, 1.15, 1.2, 1.35];  // C1 shatter · C2→Agustín · C3 action · C4→Najoua · C5 · C6 throw
const OUTRO = 1.0;                                  // quiet hold on K14 (the seam into phase 2)
const WTOTAL = CLIPW.reduce((a, b) => a + b, 0) + OUTRO;
const S = [0];                                      // S[i] = scroll fraction at keyframe Ki (i=0..6)
for (let i = 0; i < 6; i++) S.push(S[i] + CLIPW[i] / WTOTAL);
const OUT0 = S[6];                                  // outro spans [OUT0, 1]
const sz = (i) => S[i + 1] - S[i];

// ---- PHASE II pacing: linear scrub (time = progress × DUR2). Uniform, relentless — a climax reel. ----
let DUR2 = 53.46;                                   // read from film2 metadata; fallback

const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);
const inv = (v, a, b) => (b === a ? 0 : clamp((v - a) / (b - a), 0, 1));
const lerp = (a, b, t) => a + (b - a) * t;

const els = {
  film: document.getElementById("film"),
  film2: document.getElementById("film2"),
  scrim: document.querySelector(".scrim"),
  tick: document.getElementById("railTick"),
  label: document.getElementById("railLabel"),
  phase: document.querySelector(".rail__phase"),
};

// ---- Phase-I fragment markup: card + a hairline connector pointing to the film's own object ----
function cardHTML(f, side) {
  const cls = side > 0 ? "right" : "left";
  const x1 = side > 0 ? 60 : 40; // wire starts at the card's inner-top; ends on the film object
  return `<div class="fconn">
      <svg class="fcard__wire" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line class="fcard__wireline" pathLength="1" x1="${x1}" y1="50" x2="${f.obj.x}" y2="${f.obj.y}" />
      </svg>
      <span class="fcard__ring" style="left:${f.obj.x}%; top:${f.obj.y}%"><i></i></span>
      <span class="fcard__tag fcard__tag--${cls}" style="left:${f.obj.x}%; top:${f.obj.y}%">${f.object}</span>
    </div>
    ${figureHTML(f, cls)}`;
}
// ---- Phase-II fragment markup: card only (the motif moves through the shot, so no static connector;
//      the reveal-on-cue timing is the link). Same figure/panel — mobile drops the cutout in CSS. ----
function cardHTML2(f) {
  return figureHTML(f, f.side > 0 ? "right" : "left", f.textOnly);
}
function figureHTML(f, cls, textOnly) {
  const cut = textOnly ? "" : `<img class="fcard__cut" src="${f.cut}" alt="${f.name}" draggable="false" />`;
  return `<figure class="fcard fcard--${cls}${textOnly ? " fcard--textonly" : ""}">
    <span class="fcard__ghost">${f.roman}</span>
    ${cut}
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
plateEl("fragA").innerHTML = cardHTML(FRAGMENTS.agustin, 1);
plateEl("fragN").innerHTML = cardHTML(FRAGMENTS.najoua, 1);   // right-hand negative space (film subject is centre)
plateEl("fragF").innerHTML = cardHTML2(FRAG2.federica);
plateEl("fragB").innerHTML = cardHTML2(FRAG2.basak);
plateEl("fragV").innerHTML = cardHTML2(FRAG2.baver);
plateEl("fragY").innerHTML = cardHTML2(FRAG2.yasar);

// ---- Phase-I plate timeline: window [a,b] in scroll + motion params ----
const PLATES = [
  { key: "title",      type: "text", a: 0,                   b: S[0] + 0.62 * sz(0), fin: 0.0,  fout: 0.42, y: [0, -70],  blur: 8 },
  { key: "note",       type: "text", a: S[1] - 0.34 * sz(0), b: S[1] + 0.42 * sz(1), fin: 0.30, fout: 0.30, y: [46, -46], blur: 7 },
  // Fragment reveals are TIMED TO THE OBJECT MOMENT: full-opacity onset (u=fin≈0.26) lands exactly
  // on the object keyframe — the record at S[2] (K12), the lotus at S[4] (K11).
  { key: "fragA",      type: "card", a: S[2] - 0.34 * sz(2), b: S[2] + 0.95 * sz(2), fin: 0.26, fout: 0.26, side: 1 },
  { key: "beatAction", type: "text", a: S[2] + 0.72 * sz(2), b: S[3] + 0.08 * sz(3), fin: 0.30, fout: 0.30, y: [46, -46], blur: 7 },
  { key: "fragN",      type: "card", a: S[4] - 0.34 * sz(4), b: S[4] + 0.95 * sz(4), fin: 0.26, fout: 0.26, side: 1 },
  { key: "beatCharge", type: "text", a: S[5] - 0.34 * sz(4), b: S[5] + 0.40 * sz(5), fin: 0.30, fout: 0.32, y: [46, -46], blur: 7 },
  { key: "beatThrow",  type: "text", a: S[5] + 0.44 * sz(5), b: OUT0 + 0.55 * (1 - OUT0), fin: 0.34, fout: 0.34, y: [40, -40], blur: 6 },
];

// ---- Phase-II plate timeline: windows are in film SECONDS {ta,tb}; converted to scroll fractions
//      once DUR2 is known (linear scrub, so p2 = t/DUR2). fin set so full opacity lands on the motif. ----
const PLATES2 = [
  { key: "reelIntro", type: "text", ta: 0.2,  tb: 5.6,   fin: 0.28, fout: 0.34, y: [46, -46], blur: 7 },
  { key: "fragF",     type: "card", ta: 3.0,  tb: 8.6,   fin: 0.34, fout: 0.30, side: FRAG2.federica.side },
  { key: "fragB",     type: "card", ta: 17.8, tb: 23.6,  fin: 0.38, fout: 0.30, side: FRAG2.basak.side },
  { key: "fragV",     type: "card", ta: 28.0, tb: 32.8,  fin: 0.42, fout: 0.28, side: FRAG2.baver.side },
  { key: "fragY",     type: "card", ta: 32.9, tb: 38.6,  fin: 0.28, fout: 0.32, side: FRAG2.yasar.side },
  { key: "cta",       type: "text", ta: 46.0, tb: 53.46, fin: 0.16, fout: 0.0,  y: [40, 0],   blur: 6 },
];

function bindPlate(pl) {
  pl.el = plateEl(pl.key);
  if (pl.type === "card") {
    pl.cut = pl.el.querySelector(".fcard__cut");
    pl.panel = pl.el.querySelector(".fcard__panel");
    pl.ghost = pl.el.querySelector(".fcard__ghost");
    pl.wire = pl.el.querySelector(".fcard__wireline"); // null for phase-2 cards (no connector)
  }
}
PLATES.forEach(bindPlate);
PLATES2.forEach(bindPlate);
// Seconds → scroll fractions for phase-2 (recomputed in onMeta2 when the real DUR2 arrives).
function syncPlates2() { for (const pl of PLATES2) { pl.a = pl.ta / DUR2; pl.b = pl.tb / DUR2; } }
syncPlates2();

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
    if (pl.cut) pl.cut.style.transform = `translate3d(${(pl.side * lerp(-10, 18, u)).toFixed(1)}px, ${lerp(54, -78, u).toFixed(1)}px, 0) scale(${lerp(1.05, 1.0, u).toFixed(3)})`;
    pl.panel.style.transform = `translate3d(${(pl.side * lerp(52, -6, u)).toFixed(1)}px, ${lerp(30, -20, u).toFixed(1)}px, 0)`;
    pl.panel.style.clipPath = `inset(0 0 ${clamp((1 - o) * 42, 0, 42).toFixed(1)}% 0 round 18px)`;
    pl.ghost.style.transform = `translate3d(${(pl.side * lerp(30, -30, u)).toFixed(1)}px, ${lerp(-10, -40, u).toFixed(1)}px, 0)`;
    // The connector (phase-1 only) draws toward the film object, completing right as the object
    // keyframe lands (u≈0.4, just past the full-opacity onset) so the wire "arrives" on cue.
    if (pl.wire) pl.wire.style.strokeDashoffset = (1 - smooth(clamp(u / 0.4, 0, 1))).toFixed(3);
  } else {
    const blur = (1 - o) * pl.blur;
    el.style.transform = `translate3d(0, ${lerp(pl.y[0], pl.y[1], u).toFixed(1)}px, 0)`;
    el.style.filter = blur > 0.25 ? `blur(${blur.toFixed(2)}px)` : "";
  }
  return o;
}

// ---- Phase-I video-time target from scroll (continuous, monotonic — never a dead hold) ----
function timeAt(p) {
  if (p >= OUT0) return DUR - 0.02;                 // finale parks on K14 (the seam frame)
  for (let i = 0; i < 6; i++) {
    if (p < S[i + 1] || i === 5) return lerp(anchor(i), anchor(i + 1), inv(p, S[i], S[i + 1]));
  }
  return 0;
}

let targetTime = 0, targetTime2 = 0, ready = false, ready2 = false;
let film2Vis = 0; // crossfade level of film2 (0 = phase-1 showing, 1 = phase-2 showing)

function paintScrim(strongest, cardStrong) {
  // Cards dim the film GENTLY (scrim sits below the plates → the cutout stays bright while the film's
  // protagonist eases back) — enough to settle the frame without crushing the footage.
  els.scrim.style.opacity = (0.12 + 0.28 * strongest + 0.14 * cardStrong).toFixed(3);
}

function onScroll(p) {
  targetTime = timeAt(p);
  let strongest = 0, cardStrong = 0;
  for (const pl of PLATES) {
    const o = applyPlate(pl, p);
    strongest = Math.max(strongest, o);
    if (pl.type === "card") cardStrong = Math.max(cardStrong, o);
  }
  if (film2Vis < 0.5) { // phase-1 owns the chrome only while it's the visible film
    paintScrim(strongest, cardStrong);
    els.phase.textContent = "PHASE I";
    const pc = Math.round(p * 100);
    els.tick.style.top = els.label.style.top = `${p * 100}%`;
    els.label.textContent = String(pc).padStart(2, "0");
  }
}

function onScroll2(p2) {
  targetTime2 = clamp(p2 * DUR2, 0, DUR2 - 0.02);   // linear scrub
  // Crossfade film2 in over the first sliver of the reel (the seam frame K14 matches both films).
  film2Vis = smooth(clamp(p2 / 0.02, 0, 1));
  els.film2.style.opacity = film2Vis.toFixed(3);
  let strongest = 0, cardStrong = 0;
  for (const pl of PLATES2) {
    const o = applyPlate(pl, p2);
    strongest = Math.max(strongest, o);
    if (pl.type === "card") cardStrong = Math.max(cardStrong, o);
  }
  if (film2Vis >= 0.5) { // phase-2 owns the chrome once it's the visible film
    paintScrim(strongest, cardStrong);
    els.phase.textContent = "PHASE II";
    const pc = Math.round(p2 * 100);
    els.tick.style.top = els.label.style.top = `${p2 * 100}%`;
    els.label.textContent = String(pc).padStart(2, "0");
  }
}

// ---- Ease each playhead toward its scroll target — a weighty, filmic scrub. Only seek the film that
//      is (partly) visible, so the hidden one never burns seeks. ----
function scrubOne(v, rdy, target, dur) {
  if (rdy && v.readyState >= 2) {
    const cur = v.currentTime;
    const next = lerp(cur, clamp(target, 0, dur - 0.02), 0.2);
    if (Math.abs(next - cur) > 0.003) { try { v.currentTime = next; } catch (_) {} }
  }
}
function scrubTick() {
  if (film2Vis < 0.99) scrubOne(els.film, ready, targetTime, DUR);
  if (film2Vis > 0.01) scrubOne(els.film2, ready2, targetTime2, DUR2);
}

function initStatic() {
  // Reduced-motion: no scrub. film1 loops dimmed behind, and CSS reveals EVERY plate (all six fragment
  // cards, names, slogans, links + beat captions) in a stacked, scrollable layout.
  document.body.classList.add("is-static");
  for (const f of [els.film, els.film2]) { f.setAttribute("loop", ""); f.muted = true; }
  els.film.play?.().catch(() => {});
}

function boot() {
  const f = els.film, f2 = els.film2;
  const onMeta = () => { if (f.duration && isFinite(f.duration)) DUR = f.duration; ready = true; ScrollTrigger.refresh(); };
  const onMeta2 = () => { if (f2.duration && isFinite(f2.duration)) DUR2 = f2.duration; syncPlates2(); ready2 = true; ScrollTrigger.refresh(); };
  if (f.readyState >= 1) onMeta();
  if (f2.readyState >= 1) onMeta2();
  f.addEventListener("loadedmetadata", onMeta, { once: true });
  f2.addEventListener("loadedmetadata", onMeta2, { once: true });

  if (prefersReduced) return initStatic();
  // Prime each pipeline (some browsers need a play/pause to become seekable) — scrub path ONLY.
  f.play?.().then(() => f.pause()).catch(() => {});
  f2.play?.().then(() => f2.pause()).catch(() => {});

  // Page lengths from the pacing: phase-1 from its weights, phase-2 from its duration (~26.5vh/s = the
  // same scrub speed as phase-1, so the whole piece reads at one cadence).
  document.getElementById("hero-sec").style.height = `${Math.round(WTOTAL * 92)}vh`;
  document.getElementById("reel-sec").style.height = `${Math.round(DUR2 * 26.5)}vh`;

  const lenis = new Lenis({ lerp: 0.08 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); scrubTick(); });
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.create({
    trigger: "#hero-sec", start: "top top", end: "bottom bottom",
    pin: ".hero__pin", scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
    onUpdate: (self) => onScroll(self.progress),
  });
  ScrollTrigger.create({
    trigger: "#reel-sec", start: "top top", end: "bottom bottom",
    pin: ".reel__pin", scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
    onUpdate: (self) => onScroll2(self.progress),
    onLeaveBack: () => { film2Vis = 0; els.film2.style.opacity = "0"; }, // fully back in phase-1
  });

  onScroll(0);
  onScroll2(0);
  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts?.ready) document.fonts.ready.then(refresh);
  addEventListener("load", refresh);

  // Deterministic seek for offline animatic capture (?capture): jump scroll + film exactly.
  if (location.search.includes("capture")) {
    const maxY = () => document.documentElement.scrollHeight - innerHeight;
    // p is a GLOBAL 0..1 across both sections; <0.5 → phase 1, ≥0.5 → phase 2.
    window.__seek = (p) => {
      lenis.scrollTo(p * maxY(), { immediate: true });
      ScrollTrigger.update();
      const heroBottom = document.getElementById("reel-sec").offsetTop;
      const y = p * maxY();
      if (y < heroBottom) { const pp = inv(y, 0, heroBottom); onScroll(pp); try { els.film.currentTime = clamp(timeAt(pp), 0, DUR - 0.02); } catch (_) {} }
      else { const reelH = document.getElementById("reel-sec").offsetHeight - innerHeight; const p2 = inv(y - heroBottom, 0, reelH); onScroll2(p2); try { els.film2.currentTime = clamp(p2 * DUR2, 0, DUR2 - 0.02); } catch (_) {} }
    };
    // Seek phase-2 by its OWN progress (p2 in 0..1) — used for reveal-frame captures.
    window.__seekReel = (p2) => {
      const reel = document.getElementById("reel-sec");
      const y = reel.offsetTop + p2 * (reel.offsetHeight - innerHeight);
      lenis.scrollTo(y, { immediate: true });
      ScrollTrigger.update();
      onScroll2(p2);
      try { els.film2.currentTime = clamp(p2 * DUR2, 0, DUR2 - 0.02); } catch (_) {}
    };
    window.__ready = () => ready && els.film.readyState >= 2 && ready2 && els.film2.readyState >= 2;
  }
}

boot();
