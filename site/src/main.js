/*
 * THE LIVING ARCHIVE — Night Wing
 * S0 Vestibule. Built to STYLE-CONCEPT.md §4 with a procedural placeholder Keystone
 * (zero Higgsfield credits until the Gate-A asset batch is approved).
 *
 * Architecture (locked): singleton WebGL canvas behind the DOM; one scene; Lenis owns
 * scroll; ONE ScrollTrigger scrubs ONE master timeline; cue-sheet JSON drives text + beats.
 * Codex-legal only: flat fog, one raking key light, NORMAL-blended dust, no bloom/gradient/glow.
 */
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";
import cueSheet from "../cue-sheets/vestibule.json";

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Locked ease vocabulary (four camera eases + cinematicSettle for text).
CustomEase.create("cinematicSilk", "M0,0 C0.25,0.1 0.25,1 1,1");
CustomEase.create("cinematicSmooth", "M0,0 C0.4,0 0.2,1 1,1");
CustomEase.create("cinematicFlow", "M0,0 C0.3,0 0.1,1 1,1");
CustomEase.create("cinematicLinear", "M0,0 C0.33,0.33 0.66,0.66 1,1");
CustomEase.create("cinematicSettle", "M0,0 C0.16,1 0.3,1 1,1"); // ~expo.out

const TOKENS = {
  deep: 0x171d2d,
  plum: 0x2b2139,
  ivory: 0xf4f1ed,
  stone: 0x8f9099,
  amber: 0xe8a832,
  bluehour: 0x1a2744,
};

const prefersReduced =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------------------------------------
// Populate copy from the cue sheet (single source of truth for text).
// ---------------------------------------------------------------------------
function hydrateCopy() {
  for (const beat of cueSheet.beats) {
    const el = document.querySelector(`[data-beat="${beat.label}"]`);
    if (!el) continue;
    if (beat.kind === "caption") el.textContent = beat.copy;
  }
}

// ---------------------------------------------------------------------------
// WebGL scene: fog, Keystone, dust, curator's light.
// ---------------------------------------------------------------------------
class Archive {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.86; // luminance kept in check (anti-glow)

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(TOKENS.deep);
    // Fog IS the background; depth = what light cannot reach.
    this.scene.fog = new THREE.FogExp2(TOKENS.deep, 0.052);

    this.camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    this.orbit = { angle: -0.5, radius: 8.2, height: 0.6 };
    this._placeCamera();

    this._buildLights();
    this._buildKeystone();
    this._buildDust();

    this.clock = new THREE.Clock();
    this._onResize = this._resize.bind(this);
    window.addEventListener("resize", this._onResize);
  }

  _placeCamera() {
    const { angle, radius, height } = this.orbit;
    this.camera.position.set(
      Math.sin(angle) * radius,
      height,
      Math.cos(angle) * radius
    );
    this.camera.lookAt(0, 0.2, 0);
  }

  _buildLights() {
    // Near-dark fill so the wing starts as shadow.
    this.ambient = new THREE.AmbientLight(TOKENS.bluehour, 0.18);
    this.scene.add(this.ambient);

    // THE CURATOR'S LIGHT — one key. Zero emissive, zero bloom.
    this.key = new THREE.SpotLight(0xffffff, 0, 26, Math.PI * 0.16, 0.5, 1.2);
    this.key.position.set(-6, 5.5, 4.5);
    this.key.target.position.set(0, 0.2, 0);
    this.scene.add(this.key);
    this.scene.add(this.key.target);

    // Cool rim, very low — separates stone from fog.
    this.rim = new THREE.DirectionalLight(TOKENS.bluehour, 0.25);
    this.rim.position.set(5, 2, -5);
    this.scene.add(this.rim);
  }

  _buildKeystone() {
    // Placeholder hero exhibit: a rounded stone stele. The 28px brand radius made
    // physical as filleted edges. Replaced by the Higgsfield GLB at Gate A.
    const geo = new RoundedBoxGeometry(2.1, 4.2, 0.85, 6, 0.16);
    const mat = new THREE.MeshStandardMaterial({
      color: TOKENS.stone,
      roughness: 0.92,
      metalness: 0.0,
      flatShading: false,
    });
    this.keystone = new THREE.Mesh(geo, mat);
    this.keystone.position.set(0, 0.1, 0);
    this.scene.add(this.keystone);

    // A shallow inset on the back face marks where the hummingbird relief will be
    // caught by the raking light (discovered, not announced). Placeholder: a plate.
    const plate = new THREE.Mesh(
      new RoundedBoxGeometry(0.9, 0.9, 0.04, 4, 0.08),
      new THREE.MeshStandardMaterial({ color: TOKENS.stone, roughness: 0.98 })
    );
    plate.position.set(0, 0.7, -0.44);
    this.keystone.add(plate);
  }

  _buildDust() {
    // THE DUST FIELD — instanced motes, NORMAL blending, visible mainly near light.
    const count = window.innerWidth < 800 ? 512 : 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const m = new THREE.PointsMaterial({
      color: TOKENS.ivory,
      size: 0.02,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.NormalBlending, // additive is banned
      fog: true,
    });
    this.dust = new THREE.Points(g, m);
    this.scene.add(this.dust);
  }

  _resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h);
  }

  render() {
    const t = this.clock.getElapsedTime();
    // Idle orbit-slow drift on the dust and a whisper of stele rotation.
    this.dust.rotation.y = t * 0.012;
    this.keystone.rotation.y += (this._targetSpin - this.keystone.rotation.y) * 0.04;
    this.renderer.render(this.scene, this.camera);
  }

  _targetSpin = 0;

  // Timeline hooks -----------------------------------------------------------
  setLight(intensity) {
    this.key.intensity = intensity;
  }
  setLightAzimuth(x) {
    this.key.position.x = x;
  }
  setOrbit(angle) {
    this.orbit.angle = angle;
    this._placeCamera();
  }
  setFog(density) {
    this.scene.fog.density = density;
  }
  setStaticFrame() {
    // Reduced-motion composed shot: light on, camera at the resting three-quarter.
    this.setLight(2.4);
    this.setLightAzimuth(-3.4);
    this.setOrbit(0.42);
    this.setFog(0.05);
  }
}

// ---------------------------------------------------------------------------
// Scroll rig
// ---------------------------------------------------------------------------
function initScroll(archive) {
  const lenis = new Lenis({ lerp: 0.11 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  const c = cueSheet;
  const title = document.querySelector('[data-beat="v-title"]');
  const cap = document.querySelector('[data-beat="v-cap1"]');

  // ONE master timeline, duration 1, scrubbed by ONE ScrollTrigger over the hall.
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#vestibule",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      pin: ".hall__pin",
      pinSpacing: true,
      anticipatePin: 1,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
    },
  });

  const at = (f) => f; // fractions map 1:1 to timeline time (total = 1)

  // Curator's light: rise, then sweep across the stone.
  tl.fromTo(
    archive,
    { _lp: 0 },
    {
      _lp: 1,
      duration: c.light.riseTo - c.light.riseFrom,
      ease: "cinematicFlow",
      onUpdate() {
        archive.setLight(this.targets()[0]._lp * 2.6);
      },
    },
    at(c.light.riseFrom)
  );
  tl.to(
    archive.key.position,
    {
      x: -2.6,
      duration: c.light.sweepTo - c.light.sweepFrom,
      ease: "cinematicSmooth",
    },
    at(c.light.sweepFrom)
  );
  tl.to(
    archive,
    {
      duration: 0.15,
      ease: "cinematicLinear",
      onStart() {
        archive._targetSpin = 0.5; // stone turns its back face into the rake
      },
    },
    at(0.72)
  );

  // Quarter-arc orbital dolly.
  tl.fromTo(
    archive.orbit,
    { angle: -0.5 },
    {
      angle: 0.28,
      duration: c.camera.orbitTo - c.camera.orbitFrom,
      ease: "cinematicSilk",
      onUpdate: () => archive._placeCamera(),
    },
    at(c.camera.orbitFrom)
  );

  // H1: rests, then exits (settle ease).
  const titleBeat = c.beats.find((b) => b.label === "v-title");
  tl.to(
    title,
    {
      opacity: 0,
      y: -34,
      duration: 0.05,
      ease: "cinematicSettle",
    },
    at(titleBeat.exit)
  );

  // Caption card: 15/70/15 window around its beat.
  const capBeat = c.beats.find((b) => b.label === "v-cap1");
  tl.fromTo(
    cap,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.04, ease: "cinematicSettle" },
    at(capBeat.enter)
  );
  tl.to(
    cap,
    { opacity: 0, y: -18, duration: 0.05, ease: "cinematicSettle" },
    at(capBeat.exit)
  );

  // Fog-swallow handoff to Hall I.
  tl.fromTo(
    archive.scene.fog,
    { density: 0.052 },
    {
      density: 0.22,
      duration: c.transition.fogSwallowTo - c.transition.fogSwallowFrom,
      ease: "cinematicSmooth",
    },
    at(c.transition.fogSwallowFrom)
  );

  // Registrar's Rail — total-page progress as roman-numeral instrument.
  const tick = document.getElementById("railTick");
  const label = document.getElementById("railLabel");
  const roman = (n) => ["I", "II", "III", "IV", "V"][Math.min(n, 4)];
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const p = self.progress;
      tick.style.top = `${p * 100}%`;
      const pct = String(Math.round(p * 100)).padStart(3, "0");
      label.style.top = `${p * 100}%`;
      label.textContent = `${roman(Math.floor(p * 5))} — ${pct}%`;
    },
  });

  ScrollTrigger.refresh();
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
function boot() {
  hydrateCopy();
  const canvas = document.getElementById("stage");

  let archive;
  try {
    archive = new Archive(canvas);
  } catch (err) {
    // No WebGL → static text page (the Reading-Room aesthetic is the fallback).
    document.body.classList.add("is-static");
    canvas.style.display = "none";
    console.warn("WebGL unavailable, static fallback engaged:", err);
    return;
  }

  const loop = () => {
    archive.render();
    requestAnimationFrame(loop);
  };
  loop();

  if (prefersReduced) {
    // No pins, no scrub. Composed still + text in flow.
    document.body.classList.add("is-static");
    archive.setStaticFrame();
    return;
  }

  document.fonts.ready.then(() => initScroll(archive));
}

boot();
