/*
 * FORP HERO — "The Fragments"
 * Scroll-driven intro built on five LOCKED keyframes (K1 calm → K2 shatter → K3 action →
 * K4 Flame Inside → K5 final). The motion's job is to REVEAL the six fragments. Scene changes
 * happen only through a glass-shard wipe passing in front of the frame — never a hard cut — and
 * everything is scrubbed by scroll. Text lives in the frame's negative space (integrated
 * composition), and the finale fades to black and stays before the CTA.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const FRAG_BASE = "https://curatedchaos.artifactstudio.info/en/works/fragments/";
const FRAGMENTS = [
  { roman: "I",   name: "Agustín",           slogan: "A minimalist visual poem about artistic awakening.", slug: "agustin" },
  { roman: "II",  name: "Najoua",            slogan: "Kindness mistaken for weakness — until she spoke.",   slug: "najoua" },
  { roman: "III", name: "Başak",             slogan: "From protective invisibility to deliberate presence.", slug: "basak" },
  { roman: "IV",  name: "Yaşar Efe",         slogan: "The figure who returns the blade to himself.",        slug: "yasar-efe" },
  { roman: "V",   name: "Baver",             slogan: "A year of surviving panic without yielding.",         slug: "baver" },
  { roman: "VI",  name: "Federica · Espera", slogan: "Foglia d'Oro — the gold leaf beneath her skin.",      slug: "federica" },
];

// Each beat: which keyframe is on stage, which plate shows, and its payload.
// frame 0=K1 calm, 1=K2 shatter, 2=K3 action, 3=K4 flame, 4=K5 final.
const BEATS = [
  { frame: 0, plate: "title" },
  { frame: 1, plate: "note" },
  { frame: 1, plate: "frag", frag: 0 },
  { frame: 1, plate: "frag", frag: 1 },
  { frame: 1, plate: "frag", frag: 2 },
  { frame: 1, plate: "frag", frag: 3 },
  { frame: 1, plate: "frag", frag: 4 },
  { frame: 1, plate: "frag", frag: 5 },
  { frame: 2, plate: "beat", line: "He fought to keep them whole." },   // K3 action
  { frame: 5, plate: "beat", line: "Every strike, he turned aside." },  // K6 dodge (mid-scene)
  { frame: 3, plate: "beat", line: "The fire he carried turned outward." }, // K4 Flame Inside
  { frame: 6, plate: "beat", line: "Then he called down the sun." },    // K7 ultimate
  { frame: 6, plate: null },                       // eye-blinder flash → fade to black
  { frame: 6, plate: "cta" },                      // CTA over black
];
const N = BEATS.length;
const WIPE_HALF = 0.028; // half-width (scroll progress) of a shard-wipe window

const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);
const inv = (v, a, b) => clamp((v - a) / (b - a), 0, 1);

const els = {
  frames: [...document.querySelectorAll(".frame")],
  scrim: document.querySelector(".scrim"),
  flash: document.querySelector(".flash"),
  black: document.querySelector(".blackout"),
  wipe: document.querySelector(".wipe"),
  title: document.querySelector('[data-plate="title"]'),
  note: document.querySelector('[data-plate="note"]'),
  frag: document.querySelector('[data-plate="frag"]'),
  beat: document.querySelector('[data-plate="beat"]'),
  cta: document.querySelector('[data-plate="cta"]'),
  tick: document.getElementById("railTick"),
  label: document.getElementById("railLabel"),
};

function buildShards() {
  const conf = [
    { x: 6,  s: 1.08, r: -7, delay: 0.0 },
    { x: 40, s: 1.28, r: 6,  delay: 0.08 },
    { x: 73, s: 1.02, r: -3, delay: 0.04 },
  ];
  return conf.map((c) => {
    const img = document.createElement("img");
    img.className = "shard"; img.src = "/shard.png"; img.alt = "";
    img.style.left = c.x + "%";
    img.dataset.s = c.s; img.dataset.r = c.r; img.dataset.delay = c.delay;
    els.wipe.appendChild(img);
    return img;
  });
}

function fragHTML(f) {
  return `<div class="frag">
    <div class="frag__idx">Fragment ${f.roman}</div>
    <div class="frag__name">${f.name}</div>
    <p class="frag__slogan">“${f.slogan}”</p>
    <a class="frag__enter" href="${FRAG_BASE}${f.slug}" target="_blank" rel="noopener">Enter the fragment →</a>
  </div>`;
}

let shards, curBeat = -1, curFrame = -1;

function show(el, on) { el.style.opacity = on ? "1" : "0"; el.classList.toggle("is-live", on); }

function setBeat(idx) {
  if (idx === curBeat) return;
  curBeat = idx;
  const b = BEATS[idx];
  // Frame swap (cross-fade)
  if (b.frame !== curFrame) {
    curFrame = b.frame;
    els.frames.forEach((f, i) => f.classList.toggle("is-active", i === b.frame));
  }
  // Plates
  show(els.title, b.plate === "title");
  show(els.note, b.plate === "note");
  show(els.frag, b.plate === "frag");
  show(els.beat, b.plate === "beat");
  show(els.cta, b.plate === "cta");
  if (b.plate === "frag") els.frag.innerHTML = fragHTML(FRAGMENTS[b.frag]);
  if (b.plate === "beat") els.beat.innerHTML = `<p class="beat__line">${b.line}</p>`;
  // Mood: darken slightly on fragment/beat plates so text reads
  els.scrim.style.opacity =
    b.plate === "frag" || b.plate === "beat" ? "0.34" : b.plate === "note" ? "0.28" : "0.12";
}

function parallax(localT) {
  // Subtle Ken-Burns within a beat on the active frame.
  const f = els.frames[curFrame];
  if (!f) return;
  const s = 1.06 + localT * 0.06;
  const x = (localT - 0.5) * 3.2;
  f.style.transform = `scale(${s}) translateX(${x}%)`;
}

function updateWipe(p) {
  const k = Math.round(p * N);
  if (k <= 0 || k >= N) { shards.forEach((s) => (s.style.opacity = "0")); return; }
  const boundary = k / N;
  if (Math.abs(p - boundary) > WIPE_HALF) { shards.forEach((s) => (s.style.opacity = "0")); return; }
  const t = inv(p, boundary - WIPE_HALF, boundary + WIPE_HALF);
  shards.forEach((s) => {
    const d = +s.dataset.delay;
    const lt = clamp((t - d) / (1 - d), 0, 1);
    const x = -175 + smooth(lt) * 350; // sweep across
    s.style.opacity = lt > 0 && lt < 1 ? "1" : "0";
    s.style.transform = `translateX(${x}%) scale(${s.dataset.s}) rotate(${s.dataset.r}deg)`;
  });
  setBeat(t < 0.5 ? k - 1 : k); // swap under cover of the curtain
}

function onScroll(p) {
  const fp = p * N;
  const seg = clamp(Math.floor(fp), 0, N - 1);
  setBeat(seg);
  parallax(fp - seg);
  updateWipe(p);
  // Ultimate → eye-blinder sun flash → fade to black → CTA.
  const fpk = (N - 2) / N;                          // boundary: ultimate → close
  const flash = p <= fpk
    ? smooth(inv(p, fpk - 0.5 / N, fpk))            // rise into the blinder
    : 1 - smooth(inv(p, fpk, fpk + 0.5 / N));       // fall out of the flash
  els.flash.style.opacity = String(clamp(flash, 0, 1));
  // Black rises as the white flash falls, so the whiteout resolves straight to black (no bright gap).
  els.black.style.opacity = String(inv(p, fpk, fpk + 0.5 / N));
  const pc = Math.round(p * 100);
  els.tick.style.top = els.label.style.top = `${p * 100}%`;
  els.label.textContent = String(pc).padStart(2, "0");
}

function initStatic() {
  document.body.classList.add("is-static");
  els.title.style.opacity = els.note.style.opacity = els.cta.style.opacity = "1";
  els.frag.style.opacity = els.beat.style.opacity = "1";
  els.frag.innerHTML = FRAGMENTS.map(fragHTML).join("");
  els.beat.innerHTML = BEATS.filter((b) => b.plate === "beat").map((b) => `<p class="beat__line">${b.line}</p>`).join("");
}

function boot() {
  if (prefersReduced) return initStatic();
  shards = buildShards();
  els.frames[0].classList.add("is-active");

  const lenis = new Lenis({ lerp: 0.085 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
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
}

boot();
