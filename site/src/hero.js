/*
 * FORP HERO — "The Fragments"
 * ---------------------------------------------------------------------------------
 * PHASE I  (film,  #hero-sec):  clips C1–C6 (K1→K2→K12→K3→K11→K13→K14), scroll-SCRUBBED.
 * PHASE II (film2, #reel-sec):  clips C7–C16 (K14→…→K5), which PLAYS THROUGH — seeking a long
 *   film over the network stalls, so phase-2 is a played climax reel, not a scrub. The two share
 *   the seam frame (K14) so the crossfade at the join is invisible.
 *
 * FRAGMENTS (no character photos — director's rule). Each of the six fragments is an ANNOTATION on
 * the film's own object: a marker ring sits on the object (the record, the lotus, the pendant, the
 * nazar, the data, the constellation), a leader line runs from it to a frosted glass info-box placed
 * in the frame's NEGATIVE SPACE, and the box "opens" exactly as the object comes into focus. The
 * object anchor + box position are precomputed offline (src/fragmap.json) with a saliency / free-space
 * pass (external-labeling technique) and the anchor is TRACKED across the reveal so the line follows
 * the object. Screen positions are derived with the same object-fit:cover math the browser applies to
 * the film, so the ring always lands on the real pixel — on any viewport.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import FMAP from "./fragmap.json";

gsap.registerPlugin(ScrollTrigger);

const FRAG_BASE = "https://curatedchaos.artifactstudio.info/en/works/fragments/";
// roman · name · logline (HERO-BIBLE, no em dashes) · route slug · object label · phase
const FMETA = {
  agustin:  { roman: "I",   name: "Agustín",   slogan: "A minimalist visual poem about artistic awakening.",      slug: "agustin",   object: "the record",        phase: 1 },
  najoua:   { roman: "II",  name: "Najoua",    slogan: "Kindness mistaken for weakness, until she finally spoke.", slug: "najoua",   object: "the lotus",         phase: 1 },
  federica: { roman: "III", name: "Federica",  slogan: "Foglia d'Oro: the gold leaf beneath her skin.",           slug: "federica",  object: "the pendant",       phase: 2 },
  basak:    { roman: "IV",  name: "Başak",     slogan: "From protective invisibility to deliberate presence.",    slug: "basak",     object: "the nazar",         phase: 2 },
  baver:    { roman: "V",   name: "Baver",     slogan: "A year of surviving panic without yielding.",             slug: "baver",     object: "the data",          phase: 2 },
  yasar:    { roman: "VI",  name: "Yaşar Efe", slogan: "The figure who returns the blade to himself.",            slug: "yasar-efe", object: "the constellation", phase: 2 },
};
const KEY2PLATE = { agustin: "fragA", najoua: "fragN", federica: "fragF", basak: "fragB", baver: "fragV", yasar: "fragY" };

// ---- PHASE I pacing (scrub) ----
let DUR = 30.29;
const anchorT = (i) => (i / 6) * DUR;
const CLIPW = [1.5, 1.4, 1.15, 1.15, 1.2, 1.35];
const OUTRO = 1.0;
const WTOTAL = CLIPW.reduce((a, b) => a + b, 0) + OUTRO;
const S = [0];
for (let i = 0; i < 6; i++) S.push(S[i] + CLIPW[i] / WTOTAL);
const OUT0 = S[6];
const sz = (i) => S[i + 1] - S[i];

// ---- PHASE II duration (play-through) ----
let DUR2 = 53.46;

const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
let MOBILE = matchMedia("(max-width: 720px)").matches;
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

// object-fit:cover + object-position 42% mapping — normalized film point (u,v) → viewport px
const OP = 0.42;
function coverMap(u, v, natW, natH) {
  const vw = innerWidth, vh = innerHeight;
  const s = Math.max(vw / natW, vh / natH);
  const dw = natW * s, dh = natH * s;
  return { x: (vw - dw) * OP + u * dw, y: (vh - dh) * OP + v * dh };
}
function anchorAt(track, t) {
  const n = track.length;
  if (t <= track[0][0]) return { u: track[0][1], v: track[0][2] };
  if (t >= track[n - 1][0]) return { u: track[n - 1][1], v: track[n - 1][2] };
  for (let i = 0; i < n - 1; i++) {
    const a = track[i], b = track[i + 1];
    if (t >= a[0] && t <= b[0]) { const f = (t - a[0]) / (b[0] - a[0]); return { u: lerp(a[1], b[1], f), v: lerp(a[2], b[2], f) }; }
  }
  return { u: track[n - 1][1], v: track[n - 1][2] };
}

// ---- Build fragment DOM (annotation: wire + ring + tag + glass box) ----
function fragHTML(fr) {
  return `<svg class="frag__wire" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <line class="frag__line" pathLength="1" x1="50" y1="50" x2="50" y2="50" /></svg>
    <span class="frag__ring"><i></i></span>
    <span class="frag__tag">${fr.object}</span>
    <aside class="frag__box">
      <span class="frag__idx">Fragment ${fr.roman}</span>
      <svg class="frag__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span class="frag__name">${fr.name}</span>
      <span class="frag__slogan">“${fr.slogan}”</span>
      <a class="frag__enter" href="${FRAG_BASE}${fr.slug}" target="_blank" rel="noopener">Enter the fragment →</a>
    </aside>`;
}
const FRAGS = {};
for (const key of Object.keys(FMETA)) {
  const fr = { ...FMETA[key], ...FMAP[key], key };
  const el = document.querySelector(`[data-plate="${KEY2PLATE[key]}"]`);
  el.classList.add("plate--anno");
  el.innerHTML = fragHTML(fr);
  fr.el = el;
  fr.wire = el.querySelector(".frag__wire");
  fr.line = el.querySelector(".frag__line");
  fr.ring = el.querySelector(".frag__ring");
  fr.tag = el.querySelector(".frag__tag");
  fr.boxEl = el.querySelector(".frag__box"); // DOM node (fr.box stays the {cx,cy} anchor from fragmap)
  fr.bw = 0; fr.bh = 0;
  FRAGS[key] = fr;
}

function envelope(u, fin, fout) {
  if (u < 0 || u > 1) return 0;
  let o = 1;
  if (fin > 0 && u < fin) o = smooth(u / fin);
  if (fout > 0 && u > 1 - fout) o = Math.min(o, smooth((1 - u) / fout));
  return o;
}

// ---- Apply one fragment: o = open amount (0..1), filmTime = current film time for the anchor ----
function applyFrag(fr, o, filmTime) {
  const el = fr.el;
  if (o <= 0.001) {
    if (el.style.opacity !== "0") { el.style.opacity = "0"; el.classList.remove("is-live"); }
    return o;
  }
  el.style.opacity = o.toFixed(3);
  el.classList.toggle("is-live", o > 0.6);
  if (!fr.bw) { fr.bw = fr.boxEl.offsetWidth; fr.bh = fr.boxEl.offsetHeight; }
  if (MOBILE) {
    // Mobile: text + glass box only (no ring / leader / tag) — centred low in the frame.
    fr.boxEl.style.transform = `translate(${(innerWidth / 2).toFixed(1)}px, ${(innerHeight - fr.bh / 2 - innerHeight * 0.11).toFixed(1)}px) translate(-50%, -50%)`;
    fr.boxEl.style.clipPath = `inset(0 0 ${((1 - o) * 100).toFixed(1)}% 0 round 14px)`;
    return o;
  }
  const a = anchorAt(fr.track, filmTime);
  const A = coverMap(a.u, a.v, fr.natW, fr.natH);
  const B = coverMap(fr.box.cx, fr.box.cy, fr.natW, fr.natH);
  const bx = clamp(B.x, fr.bw / 2 + 14, innerWidth - fr.bw / 2 - 14);
  const by = clamp(B.y, fr.bh / 2 + 14, innerHeight - fr.bh / 2 - 14);
  // ring + tag ride the object; box drifts up a touch as it opens
  const rise = lerp(10, 0, o);
  fr.ring.style.transform = `translate(${A.x.toFixed(1)}px, ${A.y.toFixed(1)}px)`;
  fr.tag.style.transform = `translate(${A.x.toFixed(1)}px, ${A.y.toFixed(1)}px)`;
  fr.boxEl.style.transform = `translate(${bx.toFixed(1)}px, ${(by + rise).toFixed(1)}px) translate(-50%, -50%)`;
  fr.boxEl.style.clipPath = `inset(0 0 ${((1 - o) * 100).toFixed(1)}% 0 round 14px)`;
  // leader draws from the object toward the box as it opens (percent coords, non-scaling stroke)
  fr.line.setAttribute("x1", (A.x / innerWidth * 100).toFixed(2));
  fr.line.setAttribute("y1", (A.y / innerHeight * 100).toFixed(2));
  fr.line.setAttribute("x2", (bx / innerWidth * 100).toFixed(2));
  fr.line.setAttribute("y2", ((by + rise) / innerHeight * 100).toFixed(2));
  fr.line.style.strokeDashoffset = (1 - smooth(clamp((o - 0.12) / 0.5, 0, 1))).toFixed(3);
  return o;
}

// ---- Text plates (title / note / beats / cta) ----
function applyText(pl, o) {
  const el = pl.el;
  if (o <= 0.001) { if (el.style.opacity !== "0") { el.style.opacity = "0"; el.classList.remove("is-live"); } return o; }
  el.style.opacity = o.toFixed(3);
  el.classList.toggle("is-live", o > 0.6);
  const blur = (1 - o) * pl.blur;
  el.style.transform = `translate3d(0, ${lerp(pl.y[0], pl.y[1], o).toFixed(1)}px, 0)`;
  el.style.filter = blur > 0.25 ? `blur(${blur.toFixed(2)}px)` : "";
  return o;
}
const textEl = (k) => document.querySelector(`[data-plate="${k}"]`);

// ---- PHASE I plates (scroll windows) ----
const TEXT1 = [
  { key: "title",      a: 0,                   b: S[0] + 0.62 * sz(0), fin: 0.0,  fout: 0.42, y: [0, -70],  blur: 8 },
  { key: "note",       a: S[1] - 0.34 * sz(0), b: S[1] + 0.42 * sz(1), fin: 0.30, fout: 0.30, y: [46, -46], blur: 7 },
  { key: "beatAction", a: S[2] + 0.72 * sz(2), b: S[3] + 0.08 * sz(3), fin: 0.30, fout: 0.30, y: [46, -46], blur: 7 },
  { key: "beatCharge", a: S[5] - 0.34 * sz(4), b: S[5] + 0.40 * sz(5), fin: 0.30, fout: 0.32, y: [46, -46], blur: 7 },
  { key: "beatThrow",  a: S[5] + 0.44 * sz(5), b: OUT0 + 0.55 * (1 - OUT0), fin: 0.34, fout: 0.34, y: [40, -40], blur: 6 },
];
// windows end soon after the keyframe so the box fades out WITH its object (never lingers after it)
const FRAG1 = [
  { key: "agustin", a: S[2] - 0.30 * sz(2), b: S[2] + 0.55 * sz(2), fin: 0.30, fout: 0.34 },
  { key: "najoua",  a: S[4] - 0.30 * sz(4), b: S[4] + 0.55 * sz(4), fin: 0.30, fout: 0.34 },
];
TEXT1.forEach((p) => (p.el = textEl(p.key)));

// ---- PHASE II plates (film-time windows, seconds) ----
const TEXT2 = [
  { key: "reelIntro", ta: 0.3,  tb: 4.6,   fin: 0.28, fout: 0.34, y: [46, -46], blur: 7 },
  { key: "cta",       ta: 46.0, tb: 53.46, fin: 0.16, fout: 0.0,  y: [40, 0],   blur: 6 },
];
// tb ends just after each peak so the box vanishes as the object leaves (full-open still lands on
// the peak, so it holds fully open through the gated dwell)
const FRAG2 = [
  { key: "federica", ta: 3.9,  tb: 7.3,   fin: 0.32, fout: 0.34 },
  { key: "basak",    ta: 18.8, tb: 22.5,  fin: 0.34, fout: 0.34 },
  { key: "baver",    ta: 28.9, tb: 32.3,  fin: 0.36, fout: 0.34 },
  { key: "yasar",    ta: 33.3, tb: 37.3,  fin: 0.30, fout: 0.34 },
];
TEXT2.forEach((p) => (p.el = textEl(p.key)));

// ---- PHASE II is scroll-GATED play-through: the film plays at natural speed toward the next
// fragment peak, then HOLDS there (paused, box open) until scroll unlocks the next peak. ----
const PPEAK = [5.0, 20.1, 30.2, 34.6];      // the four fragment object-peaks (federica·basak·baver·yasar)
const PGATE = [0.16, 0.38, 0.58, 0.78];     // scroll fractions that unlock playing PAST each peak
let reelP = 0, capturing = false;
function allowedTimeFor(p2) {
  let idx = 0;
  for (let k = 0; k < PGATE.length; k++) if (p2 >= PGATE[k]) idx = k + 1;
  return idx < PPEAK.length ? PPEAK[idx] : DUR2 - 0.05;   // last gate → play to the end (CTA)
}

function paintChrome(pct, strongest) {
  els.scrim.style.opacity = (0.12 + 0.34 * strongest).toFixed(3);
  els.tick.style.top = els.label.style.top = `${pct}%`;
  els.label.textContent = String(Math.round(pct)).padStart(2, "0");
}

// ---- Mobile focus pan: on a portrait crop the 16:9 film loses its side-objects, so we pan the
// film's object-position toward the ACTIVE fragment's object (else back to Husam) so the thing the
// card names is actually on screen. On wide viewports there is no horizontal crop, so it's a no-op. ----
const VASPECT = 1.78;                 // film ≈ 16:9
const HUSAM_U1 = 0.36, HUSAM_U2 = 0.44; // where the subject sits when no object is in focus
let focusWant = 0.4, focusU = 0.4;
function focusTick() {
  focusU += (focusWant - focusU) * 0.05;
  const r = (VASPECT * innerHeight) / innerWidth; // >1 → portrait crop (mobile); horizontal is cropped
  let px = 42;
  if (r > 1.05) px = clamp((0.5 - focusU * r) / (1 - r), 0, 1) * 100; // place the focus point at centre
  const film = film2Vis > 0.5 ? els.film2 : els.film;
  film.style.objectPosition = `${px.toFixed(1)}% 42%`;
}

// ---- PHASE I: scroll → film1 scrub + phase-1 plates ----
let targetTime = 0, ready = false, ready2 = false, film2Vis = 0;
function timeAt(p) {
  if (p >= OUT0) return DUR - 0.02;
  for (let i = 0; i < 6; i++) if (p < S[i + 1] || i === 5) return lerp(anchorT(i), anchorT(i + 1), inv(p, S[i], S[i + 1]));
  return 0;
}
function onScroll(p) {
  targetTime = timeAt(p);
  if (film2Vis > 0.5) return; // phase-2 owns the frame while its reel is active
  let strongest = 0, fO = 0, fU = HUSAM_U1;
  for (const t of TEXT1) strongest = Math.max(strongest, applyText(t, envelope(inv(p, t.a, t.b), t.fin, t.fout)));
  for (const f of FRAG1) {
    const o = envelope(inv(p, f.a, f.b), f.fin, f.fout);
    strongest = Math.max(strongest, applyFrag(FRAGS[f.key], o, targetTime));
    if (o > fO) { fO = o; fU = anchorAt(FRAGS[f.key].track, targetTime).u; }
  }
  focusWant = fO > 0.45 ? fU : HUSAM_U1;
  els.phase.textContent = "PHASE I";
  paintChrome(p * 100, strongest);
}

// ---- PHASE II: film2.currentTime → phase-2 plates (play-through, no seeking) ----
function applyPhase2(tt) {
  let strongest = 0, fO = 0, fU = HUSAM_U2;
  for (const t of TEXT2) strongest = Math.max(strongest, applyText(t, envelope(inv(tt, t.ta, t.tb), t.fin, t.fout)));
  for (const f of FRAG2) {
    const o = envelope(inv(tt, f.ta, f.tb), f.fin, f.fout);
    strongest = Math.max(strongest, applyFrag(FRAGS[f.key], o, tt));
    if (o > fO) { fO = o; fU = anchorAt(FRAGS[f.key].track, tt).u; }
  }
  focusWant = fO > 0.45 ? fU : HUSAM_U2;
  els.phase.textContent = "PHASE II";
  paintChrome((tt / DUR2) * 100, strongest);
}

// ---- Scrub film1 toward the scroll target (weighty, filmic) ----
function scrubTick() {
  if (film2Vis > 0.99) return;
  if (ready && els.film.readyState >= 2) {
    const cur = els.film.currentTime;
    const next = lerp(cur, clamp(targetTime, 0, DUR - 0.02), 0.2);
    if (Math.abs(next - cur) > 0.003) { try { els.film.currentTime = next; } catch (_) {} }
  }
}
function frameTick() {
  scrubTick();
  if (film2Vis > 0.5 && ready2) {
    if (!capturing) {
      // gate: play toward the allowed peak, then hold there until scroll unlocks the next one
      const v = els.film2, allowed = allowedTimeFor(reelP), ct = v.currentTime;
      if (ct > allowed + 0.15) { try { v.currentTime = allowed; } catch (_) {} if (!v.paused) v.pause(); }
      else if (ct < allowed - 0.06) { if (v.paused) v.play?.().catch(() => {}); }
      else if (!v.paused) v.pause();
    }
    applyPhase2(els.film2.currentTime);
  }
  focusTick();
}

function reelScroll(p2) { reelP = p2; }
function enterReel() { film2Vis = 1; els.film2.style.opacity = "1"; } // gate logic in frameTick drives play/pause
function leaveReel() {
  els.film2.pause?.();
  film2Vis = 0; els.film2.style.opacity = "0";
  onScroll(window.__lastP || 0);
}

function initStatic() {
  document.body.classList.add("is-static");
  for (const f of [els.film, els.film2]) { f.setAttribute("loop", ""); f.muted = true; f.play?.().catch(() => {}); }
}

function boot() {
  const f = els.film, f2 = els.film2;
  const onMeta = () => { if (f.duration && isFinite(f.duration)) DUR = f.duration; ready = true; ScrollTrigger.refresh(); };
  const onMeta2 = () => { if (f2.duration && isFinite(f2.duration)) DUR2 = f2.duration; ready2 = true; ScrollTrigger.refresh(); };
  if (f.readyState >= 1) onMeta();
  if (f2.readyState >= 1) onMeta2();
  f.addEventListener("loadedmetadata", onMeta, { once: true });
  f2.addEventListener("loadedmetadata", onMeta2, { once: true });

  if (prefersReduced) return initStatic();
  f.play?.().then(() => f.pause()).catch(() => {});

  document.getElementById("hero-sec").style.height = `${Math.round(WTOTAL * 92)}vh`;
  // Phase-2 is a scroll-GATED reel: pin it for a watch span; scroll unlocks each fragment in turn.
  document.getElementById("reel-sec").style.height = `${Math.round(DUR2 * 12)}vh`;

  const lenis = new Lenis({ lerp: 0.08 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); frameTick(); });
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.create({
    trigger: "#hero-sec", start: "top top", end: "bottom bottom",
    pin: ".hero__pin", scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
    onUpdate: (self) => { window.__lastP = self.progress; onScroll(self.progress); },
  });
  ScrollTrigger.create({
    trigger: "#reel-sec", start: "top top", end: "bottom bottom",
    pin: ".reel__pin", scrub: false, anticipatePin: 1, invalidateOnRefresh: true,
    onEnter: enterReel, onEnterBack: enterReel, onLeave: leaveReel, onLeaveBack: leaveReel,
    onUpdate: (self) => reelScroll(self.progress),
  });

  onScroll(0);
  const refresh = () => { for (const k in FRAGS) FRAGS[k].bw = 0; ScrollTrigger.refresh(); };
  if (document.fonts?.ready) document.fonts.ready.then(refresh);
  addEventListener("load", refresh);
  addEventListener("resize", () => { MOBILE = matchMedia("(max-width: 720px)").matches; for (const k in FRAGS) FRAGS[k].bw = 0; });

  // Deterministic capture (?capture): jump scroll (phase 1) or film2 time (phase 2).
  if (location.search.includes("capture")) {
    window.__phase1 = async (hp) => {
      const hero = document.getElementById("hero-sec");
      lenis.scrollTo((hero.offsetHeight - innerHeight) * hp, { immediate: true }); ScrollTrigger.update();
      await new Promise((r) => { const d = () => { els.film.removeEventListener("seeked", d); r(); }; els.film.addEventListener("seeked", d); try { els.film.currentTime = clamp(timeAt(hp), 0, DUR - 0.02); } catch (_) { r(); } setTimeout(r, 3000); });
      onScroll(hp);
    };
    window.__seekReel = async (tt) => {
      capturing = true; // freeze the gate logic so the deterministic seek holds
      const reel = document.getElementById("reel-sec");
      lenis.scrollTo(reel.offsetTop + 5, { immediate: true }); ScrollTrigger.update();
      film2Vis = 1; els.film2.style.opacity = "1";
      await new Promise((r) => { const d = () => { els.film2.removeEventListener("seeked", d); r(); }; els.film2.addEventListener("seeked", d); els.film2.currentTime = tt; setTimeout(r, 3000); });
      applyPhase2(tt);
    };
    window.__ready = () => ready && els.film.readyState >= 2 && ready2 && els.film2.readyState >= 2;
  }
}

boot();
