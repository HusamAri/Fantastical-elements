/*
 * FORP HERO — "The Fragments" · PHASE I (video-scrubbed)
 * -------------------------------------------------------
 * The intro is now driven by the FILM itself. phase1 = clips C1–C6, the six locked
 * keyframes morphed one into the next by Kling (K1→K2→K12→K3→K11→K13→K14). Scroll scrubs
 * the video's playhead; the clip morphs ARE the scene changes (no cuts, no wipes inside).
 *
 * PACING (director's rule — "tailor how many seconds between those frames, then tailor the
 * length"): each frame-pair is a fixed ~5.05s of film, but its DWELL in the scroll is
 * tailored per beat. Calm / reveal beats get more scroll distance so they breathe (they
 * feel longer); action beats get less so they snap past. The total scroll length is the
 * SUM of those tailored weights — so the pacing literally sizes the page. (EDITING-SOUND.md
 * §10: hold for emotion, accelerate through action.)
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const FRAG_BASE = "https://curatedchaos.artifactstudio.info/en/works/fragments/";
const FRAGMENTS = {
  agustin: { roman: "I",  name: "Agustín", slogan: "A minimalist visual poem about artistic awakening.", slug: "agustin" },
  najoua:  { roman: "II", name: "Najoua",  slogan: "Kindness mistaken for weakness — until she spoke.",  slug: "najoua" },
};

// Film duration is read from the element once metadata loads; this is the fallback.
let DUR = 30.29;
const anchor = (i) => (i / 6) * DUR; // 7 keyframes at the six equal clip boundaries

/*
 * SPANS = the scroll timeline. Each span either HOLDs on a keyframe (video frozen while a
 * plate reads) or PLAYs a clip (video scrubs from anchor a → a+1). `w` = scroll weight =
 * the tailored dwell. Sum(w) sizes the page.
 *   hold @0 title · C1 shatter · hold note · C2 · hold Agustín · C3 action · hold action ·
 *   C4 · hold Najoua · C5 · hold charge · C6 throw · hold CTA
 */
const HOLD = "hold", PLAY = "play";
const SPANS = [
  { k: HOLD, a: 0, w: 1.1, plate: "title"      }, //  0  K1 — hero breathes, title reads
  { k: PLAY, a: 0, w: 0.9                       }, //  1  C1 K1→K2  the shatter (violent snap)
  { k: HOLD, a: 1, w: 0.7, plate: "note"       }, //  2  K2 — "Six were witnessed."
  { k: PLAY, a: 1, w: 0.7                       }, //  3  C2 K2→K12 (shards coalesce)
  { k: HOLD, a: 2, w: 1.5, plate: "fragA"      }, //  4  K12 — Fragment I · Agustín (read card)
  { k: PLAY, a: 2, w: 0.7                       }, //  5  C3 K12→K3 (into the fight)
  { k: HOLD, a: 3, w: 0.6, plate: "beatAction" }, //  6  K3 — "He fought to keep them whole."
  { k: PLAY, a: 3, w: 0.7                       }, //  7  C4 K3→K11
  { k: HOLD, a: 4, w: 1.5, plate: "fragN"      }, //  8  K11 — Fragment II · Najoua (read card)
  { k: PLAY, a: 4, w: 0.8                       }, //  9  C5 K11→K13
  { k: HOLD, a: 5, w: 0.6, plate: "beatCharge" }, // 10  K13 — "Two discs woke in his hands,"
  { k: PLAY, a: 5, w: 0.8, plate: "beatThrow"  }, // 11  C6 K13→K14 (the throw — line rides the motion)
  { k: HOLD, a: 6, w: 1.6, plate: "cta"        }, // 12  K14 — CTA holds on the last frame
];
// Cumulative scroll fractions.
(() => {
  const total = SPANS.reduce((s, x) => s + x.w, 0);
  let acc = 0;
  for (const s of SPANS) { s.g0 = acc / total; acc += s.w; s.g1 = acc / total; }
  SPANS.WEIGHT = total;
})();

// Plate → the span(s) it lives in, and its fade envelope (as a fraction of its window).
// [spanStart, spanEnd, fadeIn, fadeOut]. title fades out through the shatter; cta never fades out.
const PLATES = {
  title:      { s0: 0,  s1: 1,  fin: 0.0,  fout: 0.42 },
  note:       { s0: 2,  s1: 2,  fin: 0.30, fout: 0.30 },
  fragA:      { s0: 4,  s1: 4,  fin: 0.20, fout: 0.20 },
  beatAction: { s0: 6,  s1: 6,  fin: 0.30, fout: 0.30 },
  fragN:      { s0: 8,  s1: 8,  fin: 0.20, fout: 0.20 },
  beatCharge: { s0: 10, s1: 10, fin: 0.30, fout: 0.32 },
  beatThrow:  { s0: 11, s1: 11, fin: 0.34, fout: 0.30 },
  cta:        { s0: 12, s1: 12, fin: 0.16, fout: 0.0  },
};

const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);
const inv = (v, a, b) => (b === a ? 0 : clamp((v - a) / (b - a), 0, 1));
const lerp = (a, b, t) => a + (b - a) * t;

const els = {
  film: document.getElementById("film"),
  scrim: document.querySelector(".scrim"),
  vignette: document.querySelector(".vignette"),
  tick: document.getElementById("railTick"),
  label: document.getElementById("railLabel"),
};
const plateEls = {};
document.querySelectorAll(".plate").forEach((el) => (plateEls[el.dataset.plate] = el));

plateEls.fragA.innerHTML = fragHTML(FRAGMENTS.agustin);
plateEls.fragN.innerHTML = fragHTML(FRAGMENTS.najoua);

function fragHTML(f) {
  return `<div class="frag">
    <div class="frag__idx">Fragment ${f.roman}</div>
    <div class="frag__name">${f.name}</div>
    <p class="frag__slogan">“${f.slogan}”</p>
    <a class="frag__enter" href="${FRAG_BASE}${f.slug}" target="_blank" rel="noopener">Enter the fragment →</a>
  </div>`;
}

// ---- Video-time target from scroll progress (piecewise over the spans) ----
function timeAt(p) {
  for (const s of SPANS) {
    if (p <= s.g1 || s === SPANS[SPANS.length - 1]) {
      if (s.k === HOLD) return anchor(s.a);
      return lerp(anchor(s.a), anchor(s.a + 1), inv(p, s.g0, s.g1));
    }
  }
  return 0;
}

// ---- Plate opacities from scroll progress ----
function envelope(u, fin, fout) {
  if (u < 0 || u > 1) return 0;
  let o = 1;
  if (fin > 0 && u < fin) o = smooth(u / fin);             // fade in (fin=0 → present at window start)
  if (fout > 0 && u > 1 - fout) o = Math.min(o, smooth((1 - u) / fout)); // fade out (fout=0 → holds to end)
  return o;
}
function renderPlates(p) {
  let strongest = 0;
  for (const key in PLATES) {
    const cfg = PLATES[key];
    const a = SPANS[cfg.s0].g0;
    const b = SPANS[cfg.s1].g1;
    const u = inv(p, a, b);
    const o = envelope(u, cfg.fin, cfg.fout);
    const el = plateEls[key];
    el.style.opacity = String(o);
    el.classList.toggle("is-live", o > 0.6);
    if (o > strongest) strongest = o;
  }
  // Darken just enough for text to read over the film; lift when no plate is up.
  els.scrim.style.opacity = String(0.14 + 0.4 * strongest);
}

let targetTime = 0, ready = false;
function onScroll(p) {
  targetTime = timeAt(p);
  renderPlates(p);
  const pc = Math.round(p * 100);
  els.tick.style.top = els.label.style.top = `${p * 100}%`;
  els.label.textContent = String(pc).padStart(2, "0");
}

// Ease the playhead toward the scroll target every frame — hides seek chunkiness,
// gives the film a weighty, filmic scrub instead of hard jumps.
function scrubTick() {
  if (ready && els.film.readyState >= 2) {
    const cur = els.film.currentTime;
    const next = lerp(cur, clamp(targetTime, 0, DUR - 0.02), 0.18);
    if (Math.abs(next - cur) > 0.003) {
      try { els.film.currentTime = next; } catch (_) {}
    }
  }
}

function initStatic() {
  // Reduced-motion / no-scrub tier: let the film play through, stack the key plates.
  document.body.classList.add("is-static");
  const f = els.film;
  f.setAttribute("loop", ""); f.muted = true;
  f.play?.().catch(() => {});
  plateEls.title.style.opacity = plateEls.cta.style.opacity = "1";
}

function boot() {
  const f = els.film;
  const onMeta = () => {
    if (f.duration && isFinite(f.duration)) DUR = f.duration;
    ready = true;
    ScrollTrigger.refresh();
  };
  if (f.readyState >= 1) onMeta();
  f.addEventListener("loadedmetadata", onMeta, { once: true });
  // Nudge the pipeline (some browsers need a play/pause to become seekable).
  f.play?.().then(() => f.pause()).catch(() => {});

  if (prefersReduced) return initStatic();

  // Size the page from the tailored pacing weights (this is the "length from the beats" rule).
  const heroVH = Math.round(SPANS.WEIGHT * 78); // ~78vh per weight unit
  document.getElementById("hero-sec").style.height = `${heroVH}vh`;

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

  // Deterministic seek for offline animatic capture (?capture): jump scroll + film exactly,
  // bypassing the eased scrub so each screenshot lands on its true frame. No effect otherwise.
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
