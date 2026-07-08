/*
 * FORP HERO — "The Fragments"
 * A scroll-scrubbed cinematic: Husam bends flame, the universe shatters, six fragments reveal,
 * an invitation to create your own. Scene changes happen ONLY through a glass-shard wipe passing
 * in front of the frame — never a hard cut — and everything is scrubbed seamlessly by scroll.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const FRAG_BASE = "https://curatedchaos.artifactstudio.info/en/works/fragments/";
const FRAGMENTS = [
  { roman: "I",  name: "Agustín",    slogan: "A minimalist visual poem about artistic awakening.", slug: "agustin" },
  { roman: "II", name: "Najoua",     slogan: "Kindness mistaken for weakness — until she spoke.",  slug: "najoua" },
  { roman: "III",name: "Başak",      slogan: "From protective invisibility to deliberate presence.", slug: "basak" },
  { roman: "IV", name: "Yaşar Efe",  slogan: "The figure who returns the blade to himself.",       slug: "yasar-efe" },
  { roman: "V",  name: "Baver",      slogan: "A year of surviving panic without yielding.",        slug: "baver" },
  { roman: "VI", name: "Federica · Espera", slogan: "Foglia d'Oro — the gold leaf beneath her skin.", slug: "federica" },
];

// Scene order. 'husam' scrubs the video; fragments/note/cta are plates. Boundaries = shard-wipes.
const SCENES = ["title", "husam", "f0", "f1", "f2", "f3", "f4", "f5", "note", "cta"];
const N = SCENES.length;
const WIPE_HALF = 0.03; // half-width (in scroll progress) of a shard-wipe window

const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);

const els = {
  video: document.getElementById("hero"),
  scrim: document.querySelector(".scrim"),
  wipe: document.querySelector(".wipe"),
  title: document.querySelector('[data-plate="title"]'),
  frag: document.querySelector('[data-plate="frag"]'),
  note: document.querySelector('[data-plate="note"]'),
  cta: document.querySelector('[data-plate="cta"]'),
  tick: document.getElementById("railTick"),
  label: document.getElementById("railLabel"),
};

// Build shard-wipe elements (a moving curtain of glass that occludes the swap).
function buildShards() {
  const conf = [
    { x: 8, s: 1.05, r: -8, delay: 0.0 },
    { x: 42, s: 1.25, r: 6, delay: 0.08 },
    { x: 74, s: 1.0, r: -3, delay: 0.04 },
  ];
  return conf.map((c) => {
    const img = document.createElement("img");
    img.className = "shard";
    img.src = "/shard.png";
    img.alt = "";
    img.style.left = c.x + "%";
    img.dataset.s = c.s;
    img.dataset.r = c.r;
    img.dataset.delay = c.delay;
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

let shards, currentScene = -1;

function setScene(idx) {
  if (idx === currentScene) return;
  currentScene = idx;
  const name = SCENES[idx];
  // Plate visibility
  const show = (el, on) => {
    el.style.opacity = on ? "1" : "0";
    el.classList.toggle("is-live", on);
  };
  show(els.title, name === "title");
  show(els.note, name === "note");
  show(els.cta, name === "cta");
  const isFrag = name[0] === "f";
  show(els.frag, isFrag);
  if (isFrag) els.frag.innerHTML = fragHTML(FRAGMENTS[+name.slice(1)]);
  // Scrim mood
  els.scrim.style.opacity =
    name === "title" ? "0.55" : name === "cta" ? "0.82" : name === "note" ? "0.35" : "0";
}

function updateVideoTarget(p) {
  const d = els.video.duration || 5;
  const a = 1 / N, b = 2 / N; // husam slice
  let target;
  if (p <= a) target = 0;
  else if (p >= b) target = d - 0.05;
  else target = ((p - a) / (b - a)) * d;
  els._vt = target;
}

function updateWipe(p) {
  // Nearest interior boundary
  const k = Math.round(p * N);
  els.wipe.style.opacity = "1";
  if (k <= 0 || k >= N) {
    shards.forEach((s) => (s.style.opacity = "0"));
    return;
  }
  const b = k / N;
  if (Math.abs(p - b) > WIPE_HALF) {
    shards.forEach((s) => (s.style.opacity = "0"));
    return;
  }
  const t = clamp((p - (b - WIPE_HALF)) / (2 * WIPE_HALF), 0, 1);
  shards.forEach((s) => {
    const d = +s.dataset.delay;
    const lt = clamp((t - d) / (1 - d), 0, 1);
    const x = -170 + smooth(lt) * 340; // sweep left→right across the frame
    s.style.opacity = "1";
    s.style.transform = `translateX(${x}%) scale(${s.dataset.s}) rotate(${s.dataset.r}deg)`;
  });
  // Swap scene exactly when the curtain covers center
  setScene(t < 0.5 ? k - 1 : k);
}

function onScroll(p) {
  const seg = clamp(Math.floor(p * N), 0, N - 1);
  setScene(seg);
  updateVideoTarget(p);
  updateWipe(p);
  const pc = Math.round(p * 100);
  els.tick.style.top = els.label.style.top = `${p * 100}%`;
  const roman = ["I", "II", "III", "IV", "V"][Math.min(Math.floor(p * 5), 4)];
  els.label.textContent = `${roman} — ${String(pc).padStart(3, "0")}%`;
}

function initStatic() {
  document.body.classList.add("is-static");
  els.frag.style.opacity = "1";
  els.frag.innerHTML = FRAGMENTS.map(fragHTML).join("");
  els.title.style.opacity = els.note.style.opacity = els.cta.style.opacity = "1";
}

function boot() {
  if (prefersReduced) return initStatic();
  shards = buildShards();
  els.video.play?.().catch(() => {});

  const lenis = new Lenis({ lerp: 0.09 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.create({
    trigger: "#hero-sec", start: "top top", end: "bottom bottom",
    pin: ".hero__pin", scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
    onUpdate: (self) => onScroll(self.progress),
  });

  // Seamless video scrub: lerp currentTime toward target every frame.
  els._vt = 0;
  const raf = () => {
    if (els.video.readyState >= 2 && els._vt != null) {
      const cur = els.video.currentTime;
      const next = cur + (els._vt - cur) * 0.18;
      if (Math.abs(next - cur) > 0.001) {
        try { els.video.currentTime = next; } catch (e) {}
      }
    }
    requestAnimationFrame(raf);
  };
  raf();

  onScroll(0);
  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts?.ready) document.fonts.ready.then(refresh);
  els.video.addEventListener("loadedmetadata", refresh);
}

boot();
