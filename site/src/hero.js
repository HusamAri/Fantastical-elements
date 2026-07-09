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
// frame indices: 0 K1 calm · 1 K2 shatter · 2 K3 action · 3 K4 flame · 4 K5 settle/close ·
// 5 K6 dodge · 6 K7 ultimate · 7 K8 pendant · 8 K9 evil-eye · 9 K10 constellation ·
// 10 K11 lotus · 11 Baver glass · 12 K12 Agustín disc · 13 K13 Twin Spiral charge ·
// 14 K14 Twin Spiral throw. Fragments are WOVEN through the fight — a battle move, then a
// fragment surfaces. His Twin Spiral (Q) is two beats: charge (K13) then throw (K14). No frame
// is reused for two beats; the close resolves the sun-flash to K5 (settle), not to pure black.
const BEATS = [
  { frame: 0,  plate: "title" },                                             // 01 K1  calm hero
  { frame: 1,  plate: "note" },                                              // 02 K2  shatter — "Six were witnessed."
  { frame: 12, plate: "frag", frag: 0 },                                     // 03 K12 Fragment I  · Agustín — the disc coalesces
  { frame: 2,  plate: "beat", line: "He fought to keep them whole." },       // 04 K3  action
  { frame: 10, plate: "frag", frag: 1 },                                     // 05 K11 Fragment II · Najoua — lotus
  { frame: 13, plate: "beat", line: "Two discs woke in his hands," },        // 06 K13 Twin Spiral — charge
  { frame: 14, plate: "beat", line: "and he loosed them, spiralling." },     // 07 K14 Twin Spiral — throw
  { frame: 7,  plate: "frag", frag: 5 },                                     // 08 K8  Fragment VI · Federica — pendant catch (a move)
  { frame: 5,  plate: "beat", line: "Every strike, he turned aside." },      // 09 K6  dodge
  { frame: 8,  plate: "frag", frag: 2 },                                     // 10 K9  Fragment III · Başak — evil-eye, the damage
  { frame: 3,  plate: "beat", line: "The fire he carried turned outward." }, // 11 K4  Flame Inside — ignites from the hit
  { frame: 11, plate: "frag", frag: 4 },                                     // 12 —   Fragment V · Baver — data in the shards
  { frame: 9,  plate: "frag", frag: 3 },                                     // 13 K10 Fragment IV · Yaşar — constellation, charging
  { frame: 6,  plate: "beat", line: "Then he called down the sun." },        // 14 K7  ultimate — Ancient Sunlight
  { frame: 4,  plate: null },                        // 15 eye-blinder flash → resolves to the settle (K5)
  { frame: 4,  plate: "cta" },                       // 16 CTA over the settle (K5), dust still falling
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
  // Ultimate → eye-blinder sun flash → the flash FALLS TO REVEAL the settle (K5) → CTA.
  const fpk = (N - 2) / N;                          // boundary: ultimate → close (K5)
  const flash = p <= fpk
    ? smooth(inv(p, fpk - 0.5 / N, fpk))            // rise into the blinder
    : 1 - smooth(inv(p, fpk, fpk + 0.5 / N));       // fall out of the flash, uncovering K5
  els.flash.style.opacity = String(clamp(flash, 0, 1));
  // No blackout: the whiteout resolves onto the settle frame (K5). A faint scrim only, for CTA legibility.
  els.black.style.opacity = String(0.22 * inv(p, fpk + 0.5 / N, 1));
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
