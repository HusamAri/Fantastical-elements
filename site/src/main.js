/*
 * THE LIVING ARCHIVE — Night Wing · S0 Vestibule
 * Cinematic build: a fogged archive hall, a volumetric "curator's light", a wet-stone
 * reflective floor, a carved monolith (placeholder Keystone), swirling lit dust, camera
 * parallax + scroll dolly, and a wide reveal. All spectacle is photographic (in-scene light,
 * fog, density, reflection, grain) — no bloom, no additive, no gradient/glitch UI.
 */
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";
import cueSheet from "../cue-sheets/vestibule.json";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("cinematicSilk", "M0,0 C0.25,0.1 0.25,1 1,1");
CustomEase.create("cinematicSmooth", "M0,0 C0.4,0 0.2,1 1,1");
CustomEase.create("cinematicFlow", "M0,0 C0.3,0 0.1,1 1,1");
CustomEase.create("cinematicSettle", "M0,0 C0.16,1 0.3,1 1,1");

const T = {
  deep: 0x141a29, plum: 0x241b31, ivory: 0xf4f1ed,
  stone: 0x9a9ba6, amber: 0xe8a832, bluehour: 0x1a2744, warm: 0xf0d9b0,
};
const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

function radialTexture(inner, outer, stops) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const x = c.getContext("2d");
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  for (const [o, col] of stops) g.addColorStop(o, col);
  x.fillStyle = g;
  x.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}
function noiseTexture(size = 256) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const x = c.getContext("2d");
  const img = x.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 120 + Math.floor(Math.random() * 90);
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 4);
  return t;
}

function hydrateCopy() {
  for (const b of cueSheet.beats) {
    const el = document.querySelector(`[data-beat="${b.label}"]`);
    if (el && b.kind === "caption") el.textContent = b.copy;
  }
}

class Archive {
  constructor(canvas) {
    this.canvas = canvas;
    const r = (this.renderer = new THREE.WebGLRenderer({
      canvas, antialias: true, powerPreference: "high-performance",
    }));
    this.dpr = Math.min(devicePixelRatio, 2);
    r.setPixelRatio(this.dpr);
    r.setSize(innerWidth, innerHeight);
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.02;
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFSoftShadowMap;

    const s = (this.scene = new THREE.Scene());
    s.background = new THREE.Color(T.deep);
    s.fog = new THREE.FogExp2(T.deep, 0.05);

    this.camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.1, 120);
    this.rig = { angle: -0.62, radius: 12.5, height: 1.4, target: 0.6 };
    this.parallax = { x: 0, y: 0, tx: 0, ty: 0 };
    this._placeCamera();
    s.add(this.camera);

    this._buildHall();
    this._buildFloor();
    this._buildKeystone();
    this._buildLight();
    this._buildBeam();
    this._buildDust();
    this._buildVignette();

    this.clock = new THREE.Clock();
    this._spin = 0; this._spinT = 0;
    addEventListener("resize", () => this._resize());
    addEventListener("pointermove", (e) => {
      this.parallax.tx = (e.clientX / innerWidth - 0.5);
      this.parallax.ty = (e.clientY / innerHeight - 0.5);
    });
  }

  _placeCamera() {
    const { angle, radius, height, target } = this.rig;
    const px = Math.sin(angle) * radius + this.parallax.x;
    const pz = Math.cos(angle) * radius;
    this.camera.position.set(px, height + this.parallax.y, pz);
    this.camera.lookAt(0, target, 0);
  }

  _buildHall() {
    // A tall archive hall: an inverted cylinder of plum stone, fogged so far walls dissolve.
    const geo = new THREE.CylinderGeometry(22, 22, 34, 64, 1, true);
    const mat = new THREE.MeshStandardMaterial({
      color: T.plum, roughness: 1, metalness: 0, side: THREE.BackSide, fog: true,
    });
    const hall = new THREE.Mesh(geo, mat);
    hall.position.y = 6;
    this.scene.add(hall);
    // Faint back pillars for parallax depth.
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x1c2334, roughness: 1 });
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 16, 12), pillarMat);
      p.position.set(Math.sin(a) * 15, 2, Math.cos(a) * 15);
      this.scene.add(p);
    }
  }

  _buildFloor() {
    // Wet-stone reflective floor — the single biggest depth cue.
    const geo = new THREE.CircleGeometry(20, 96);
    const floor = new Reflector(geo, {
      clipBias: 0.003,
      textureWidth: innerWidth * this.dpr,
      textureHeight: innerHeight * this.dpr,
      color: 0x0c1119, // dark tint = damped, stone-like reflection
    });
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.6;
    this.scene.add(floor);
    // Matte ring over the mirror so it reads as polished stone, not glass.
    const matte = new THREE.Mesh(
      new THREE.RingGeometry(0.1, 20, 96),
      new THREE.MeshStandardMaterial({
        color: T.deep, roughness: 0.7, metalness: 0.1,
        transparent: true, opacity: 0.55, side: THREE.DoubleSide,
      })
    );
    matte.rotation.x = -Math.PI / 2;
    matte.position.y = -2.598;
    this.scene.add(matte);
  }

  _buildKeystone() {
    const bump = noiseTexture();
    const stoneMat = new THREE.MeshStandardMaterial({
      color: T.stone, roughness: 0.86, metalness: 0.04,
      bumpMap: bump, bumpScale: 0.012,
    });
    const g = (this.keystone = new THREE.Group());
    // Square tapered obelisk shaft (4-sided cylinder) + pyramidion cap.
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.66, 4.0, 4, 1), stoneMat);
    shaft.rotation.y = Math.PI / 4;
    shaft.position.y = -0.3;
    shaft.castShadow = shaft.receiveShadow = true;
    g.add(shaft);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.85, 4), stoneMat);
    cap.rotation.y = Math.PI / 4;
    cap.position.y = 2.12;
    cap.castShadow = true;
    g.add(cap);
    // Pedestal.
    const ped = new THREE.Mesh(
      new RoundedBoxGeometry(2.0, 0.5, 2.0, 4, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x2a2233, roughness: 0.9 })
    );
    ped.position.y = -2.35;
    ped.receiveShadow = ped.castShadow = true;
    g.add(ped);
    // Placeholder relief plate on the back face (hummingbird catches the rake here).
    const plate = new THREE.Mesh(
      new RoundedBoxGeometry(0.62, 0.62, 0.04, 3, 0.05),
      new THREE.MeshStandardMaterial({ color: T.stone, roughness: 0.98, bumpMap: bump, bumpScale: 0.02 })
    );
    plate.position.set(0, 0.3, -0.36);
    g.add(plate);
    this.scene.add(g);
  }

  _buildLight() {
    this.ambient = new THREE.AmbientLight(T.bluehour, 0.28);
    this.scene.add(this.ambient);
    this.fill = new THREE.HemisphereLight(T.bluehour, 0x0a0d16, 0.35);
    this.scene.add(this.fill);
    // Curator's key: a raking spotlight with soft penumbra + shadow.
    const key = (this.key = new THREE.SpotLight(T.warm, 0, 40, Math.PI * 0.14, 0.6, 1.1));
    key.position.set(-6.5, 8.5, 5);
    key.target.position.set(0, 0.4, 0);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 30;
    key.shadow.bias = -0.0004;
    this.scene.add(key, key.target);
    // Cool rim to peel the stone off the fog.
    this.rim = new THREE.DirectionalLight(0x6f86b8, 0.5);
    this.rim.position.set(7, 3, -6);
    this.scene.add(this.rim);
    // Warm face-fill near the exhibit so the camera-facing stone catches light (waking), not just backlit.
    this.faceFill = new THREE.PointLight(T.warm, 0, 16, 2);
    this.faceFill.position.set(1.8, 3.4, 3.4);
    this.scene.add(this.faceFill);
  }

  _buildBeam() {
    // Volumetric shaft: camera-facing soft quads stacked down the light axis (light-in-fog,
    // NORMAL blended — not additive). Reads as a god-ray without a bloom pass.
    const tex = radialTexture(0, 128, [
      [0, "rgba(240,220,170,0.5)"],
      [0.35, "rgba(232,168,50,0.16)"],
      [1, "rgba(232,168,50,0)"],
    ]);
    const from = new THREE.Vector3(-6.5, 8.5, 5);
    const to = new THREE.Vector3(0, -1.2, 0);
    this.beam = new THREE.Group();
    this.beamMats = [];
    const N = 26;
    for (let i = 0; i < N; i++) {
      const f = i / (N - 1);
      const m = new THREE.MeshBasicMaterial({
        map: tex, transparent: true, opacity: 0, depthWrite: false,
        blending: THREE.NormalBlending, fog: false, toneMapped: false,
      });
      this.beamMats.push(m);
      const q = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), m);
      q.position.lerpVectors(from, to, f);
      q.scale.setScalar(1.1 + f * 3.6);
      q.userData.f = f;
      this.beam.add(q);
    }
    this.scene.add(this.beam);
  }

  _buildDust() {
    const count = innerWidth < 800 ? 700 : 2600;
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 10 - 2.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      seed[i] = Math.random() * 6.28;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    this.dustSeed = seed;
    this.dustBase = pos.slice();
    const m = new THREE.PointsMaterial({
      map: radialTexture(0, 128, [[0, "rgba(255,255,255,0.9)"], [1, "rgba(255,255,255,0)"]]),
      color: T.ivory, size: 0.05, sizeAttenuation: true, transparent: true,
      opacity: 0.5, depthWrite: false, blending: THREE.NormalBlending, fog: true,
    });
    this.dust = new THREE.Points(g, m);
    this.scene.add(this.dust);
  }

  _buildVignette() {
    // In-canvas photographic vignette, parented to the camera (scene-light, not DOM gradient).
    const tex = radialTexture(0, 128, [
      [0, "rgba(10,13,22,0)"], [0.62, "rgba(10,13,22,0)"], [1, "rgba(10,13,22,0.9)"],
    ]);
    const m = new THREE.MeshBasicMaterial({
      map: tex, transparent: true, depthTest: false, depthWrite: false,
      fog: false, toneMapped: false,
    });
    const q = (this.vignette = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), m));
    q.position.z = -1;
    q.renderOrder = 999;
    this.camera.add(q);
    this._fitVignette();
  }
  _fitVignette() {
    const d = 1;
    const h = 2 * Math.tan((this.camera.fov * Math.PI) / 360) * d;
    this.vignette.scale.set(h * this.camera.aspect * 1.25, h * 1.25, 1);
  }

  _resize() {
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.setSize(innerWidth, innerHeight);
    this._fitVignette();
  }

  render() {
    const t = this.clock.getElapsedTime();
    // Parallax easing.
    this.parallax.x += (this.parallax.tx * 1.1 - this.parallax.x) * 0.05;
    this.parallax.y += (-this.parallax.ty * 0.7 - this.parallax.y) * 0.05;
    this._placeCamera();
    // Stone slow settle-rotation (turns the relief into the rake).
    this.keystone.rotation.y += (this._spinT - this._spin) * 0.03;
    this._spin += (this._spinT - this._spin) * 0.03;
    this.keystone.rotation.y = this._spin;
    // Dust drift + swirl, denser life inside the cone.
    const p = this.dust.geometry.attributes.position.array;
    for (let i = 0; i < this.dustSeed.length; i++) {
      const s = this.dustSeed[i];
      p[i * 3] = this.dustBase[i * 3] + Math.sin(t * 0.12 + s) * 0.5;
      p[i * 3 + 1] = this.dustBase[i * 3 + 1] + Math.sin(t * 0.08 + s * 1.7) * 0.35;
      p[i * 3 + 2] = this.dustBase[i * 3 + 2] + Math.cos(t * 0.1 + s) * 0.5;
    }
    this.dust.geometry.attributes.position.needsUpdate = true;
    this.dust.rotation.y = t * 0.01;
    // Beam quads face the camera.
    for (const q of this.beam.children) q.quaternion.copy(this.camera.quaternion);
    this.renderer.render(this.scene, this.camera);
  }

  // Timeline hooks
  setLight(v) {
    this.key.intensity = v * 6.0;
    this.rim.intensity = 0.35 + v * 0.5;
    this.faceFill.intensity = v * 16;
    this.ambient.intensity = 0.24 + v * 0.2;
  }
  setBeam(v) { this.beam.children.forEach((q) => (q.material.opacity = v * (0.5 - q.userData.f * 0.42))); }
  setSpin(v) { this._spinT = v; }
  setStaticFrame() {
    this.rig.angle = -0.45; this.rig.radius = 10.5; this._placeCamera();
    this.setLight(0.85); this.setBeam(0.8); this.setSpin(0.35);
  }
}

function initScroll(a) {
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  const c = cueSheet;
  const title = document.querySelector('[data-beat="v-title"]');
  const cap = document.querySelector('[data-beat="v-cap1"]');
  const proxy = { light: 0, beam: 0 };

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#vestibule", start: "top top", end: "bottom bottom",
      scrub: 1, pin: ".hall__pin", anticipatePin: 1, fastScrollEnd: true,
      invalidateOnRefresh: true,
    },
  });

  // Light rise + beam bloom-of-fog (photographic).
  tl.to(proxy, {
    light: 1, duration: c.light.riseTo - c.light.riseFrom, ease: "cinematicFlow",
    onUpdate() { a.setLight(proxy.light); a.setBeam(proxy.light); },
  }, c.light.riseFrom);

  // Camera: slow push-in through the hall.
  tl.to(a.rig, { radius: 7.2, height: 0.9, duration: 0.5, ease: "cinematicSmooth", onUpdate: () => a._placeCamera() }, 0.12);
  // Quarter-arc orbital dolly.
  tl.to(a.rig, { angle: 0.34, duration: c.camera.orbitTo - c.camera.orbitFrom, ease: "cinematicSilk", onUpdate: () => a._placeCamera() }, c.camera.orbitFrom);
  // Light sweep across the stone.
  tl.to(a.key.position, { x: -2.4, duration: c.light.sweepTo - c.light.sweepFrom, ease: "cinematicSmooth" }, c.light.sweepFrom);
  // Stone turns its relief into the rake.
  tl.to(a, { duration: 0.2, onStart: () => a.setSpin(0.62) }, 0.66);
  // Wide reveal: pull back to show the hall + reflection + beam.
  tl.to(a.rig, { radius: 12.8, height: 2.2, angle: 0.05, duration: 0.13, ease: "cinematicSmooth", onUpdate: () => a._placeCamera() }, 0.72);

  // Title rests, then settles out.
  const tb = c.beats.find((b) => b.label === "v-title");
  tl.to(title, { opacity: 0, y: -34, filter: "blur(6px)", duration: 0.05, ease: "cinematicSettle" }, tb.exit);
  // Caption 15/70/15.
  const cb = c.beats.find((b) => b.label === "v-cap1");
  tl.fromTo(cap, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.04, ease: "cinematicSettle" }, cb.enter);
  tl.to(cap, { opacity: 0, y: -16, duration: 0.05, ease: "cinematicSettle" }, cb.exit);
  // Fog-swallow handoff.
  tl.to(a.scene.fog, { density: 0.2, duration: c.transition.fogSwallowTo - c.transition.fogSwallowFrom, ease: "cinematicSmooth" }, c.transition.fogSwallowFrom);

  const tick = document.getElementById("railTick");
  const label = document.getElementById("railLabel");
  const roman = (n) => ["I", "II", "III", "IV", "V"][Math.min(n, 4)];
  ScrollTrigger.create({
    start: 0, end: "max",
    onUpdate: (self) => {
      const pc = Math.round(self.progress * 100);
      tick.style.top = label.style.top = `${self.progress * 100}%`;
      label.textContent = `${roman(Math.floor(self.progress * 5))} — ${String(pc).padStart(3, "0")}%`;
    },
  });
  ScrollTrigger.refresh();
}

function boot() {
  hydrateCopy();
  const canvas = document.getElementById("stage");
  let a;
  try { a = new Archive(canvas); }
  catch (e) {
    document.body.classList.add("is-static");
    canvas.style.display = "none";
    console.warn("WebGL unavailable:", e);
    return;
  }
  const loop = () => { a.render(); requestAnimationFrame(loop); };
  loop();
  if (prefersReduced) { document.body.classList.add("is-static"); a.setStaticFrame(); return; }
  document.fonts.ready.then(() => initScroll(a));
}
boot();
