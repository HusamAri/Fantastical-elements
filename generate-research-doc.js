const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ShadingType } = require('docx');
const fs = require('fs');

const gold = '996B1F';
const darkBg = '1a1a2e';
const headerBg = '2a2a3e';

function heading(text, level) {
  return new Paragraph({
    heading: level,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, bold: true, size: level === HeadingLevel.HEADING_1 ? 36 : level === HeadingLevel.HEADING_2 ? 28 : 24, color: gold })]
  });
}

function para(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, size: 22, color: opts.color || '333333', bold: opts.bold, italics: opts.italic })]
  });
}

function bulletItem(text) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, size: 22 })]
  });
}

function labelValue(label, value) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({ text: label + ': ', bold: true, size: 22 }),
      new TextRun({ text: value, size: 22 })
    ]
  });
}

function sectionDivider() {
  return new Paragraph({ spacing: { before: 200, after: 200 }, children: [new TextRun({ text: '────────────────────────────────────────', color: 'CCCCCC', size: 18 })] });
}

function buildDoc() {
  const sections = [];

  // TITLE PAGE
  sections.push(
    new Paragraph({ spacing: { before: 2000 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'FANTASTICAL ELEMENTS', bold: true, size: 56, color: gold })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [new TextRun({ text: 'A Comprehensive Visual Language Guide for Fantasy Filmmaking', size: 28, color: '666666', italics: true })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: 'Deep Research Document', size: 24, color: '999999' })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: 'Generated: ' + new Date().toLocaleDateString(), size: 20, color: '999999' })] }),
    sectionDivider()
  );

  // TABLE OF CONTENTS
  sections.push(
    heading('Table of Contents', HeadingLevel.HEADING_1),
    para('1. Introduction'),
    para('2. Magic Systems in Film'),
    para('3. Camera & Cinematography'),
    para('4. Lighting for Fantasy'),
    para('5. Body Movement & Performance'),
    para('6. Magical Creatures'),
    para('7. Sound Design'),
    para('8. Color Grading & Color Science'),
    para('9. Combination Guide — Visual Recipes'),
    para('10. Glossary of Terms'),
    sectionDivider()
  );

  // CH1: INTRODUCTION
  sections.push(
    heading('1. Introduction', HeadingLevel.HEADING_1),
    para('This document serves as a comprehensive research guide to the visual language of fantasy filmmaking. It covers every aspect of creating cinematic fantasy — from how different magic systems should look and sound, to which camera movements evoke which emotions, to how lighting setups can transform a scene from mundane to magical.'),
    para('Each section provides detailed terminology, practical descriptions, and reference information that can be used by filmmakers, VFX artists, cinematographers, sound designers, and AI prompt engineers to create consistent, compelling fantasy visuals.'),
    para('The guide is organized into interconnected sections that mirror the interactive website companion tool, where users can mix and match elements to create unique "visual recipes" for their productions.'),
    sectionDivider()
  );

  // CH2: MAGIC SYSTEMS
  sections.push(heading('2. Magic Systems in Film', HeadingLevel.HEADING_1));
  sections.push(para('Magic systems are the foundational visual vocabulary of any fantasy production. Each type of magic carries distinct visual signatures that audiences have learned to recognize and associate with specific emotional and narrative contexts.'));

  const magicSystems = [
    { name: 'Ancient / Elemental', era: 'Ancient', desc: 'Raw, primal magic drawn from the natural world. Earth, fire, water, and air converge through ritualistic invocation.', particles: 'Dust motes, embers, water droplets, leaf fragments', glow: 'Warm, pulsing inner glow with organic falloff', movement: 'Slow spirals, rising columns, ground-hugging waves', edge: 'Soft, diffused, natural', colors: 'Earth tones: amber #8B6914, forest green #2E7D32, deep orange #D84315', sound: 'Deep earth rumbles layered with wind howls and crackling fire', films: 'Lord of the Rings, Willow, The Green Knight' },
    { name: 'Modern / Urban', era: 'Contemporary', desc: 'Geometric, precise magic manifesting as mandalas, glyphs, and hard-light constructs.', particles: 'Geometric shards, light fractals, mandala rings', glow: 'Sharp-edged neon with clean falloff', movement: 'Rapid rotation, expanding rings, snapping into place', edge: 'Hard, crisp, defined', colors: 'Warm neon: orange #FF6F00, deep orange #E65100, gold #FFD600', sound: 'Crystalline chimes over electrical hum with sharp activation sounds', films: 'Doctor Strange, Harry Potter, The Sorcerer\'s Apprentice' },
    { name: 'Futuristic / Tech', era: 'Futuristic', desc: 'Technology indistinguishable from magic. Holographic interfaces, force fields, energy manipulation.', particles: 'Data streams, holographic fragments, energy pulses', glow: 'Cool, even emission with digital flicker', movement: 'Linear trajectories, grid-aligned, instant teleportation', edge: 'Pixel-sharp, sometimes glitching', colors: 'Cool cyan: blue #00B0FF, deep blue #0091EA, cyan #00E5FF', sound: 'Synthesized tonal sweeps with digital processing', films: 'Star Wars, Tron Legacy, The Matrix' },
    { name: 'Robotic / Cybernetic', era: 'Cyberpunk', desc: 'Mechanical augmentation meets arcane energy. Circuit-like patterns pulse through artificial bodies.', particles: 'Circuit sparks, binary cascades, mechanical fragments', glow: 'Strobing, irregular pulses with static interference', movement: 'Jerky mechanical articulation with smooth servo movements', edge: 'Glitchy, pixelated edges with scan artifacts', colors: 'Neon contrast: magenta #F50057, violet #D500F9, acid green #76FF03', sound: 'Servo whines mixed with electrical arcing', films: 'Ghost in the Shell, Alita Battle Angel, Upgrade' },
    { name: 'Dark / Forbidden', era: 'Timeless', desc: 'Corrupted, consuming magic drawn from shadow, decay, and forbidden knowledge.', particles: 'Black smoke tendrils, shadow fragments, decaying embers', glow: 'Inverse glow — absorbs surrounding light', movement: 'Creeping tendrils, sudden lashes, gravitational pull', edge: 'Ragged, torn, bleeding into surroundings', colors: 'Shadow spectrum: deep purple #4A148C, void #1B0033, toxic green #76FF03', sound: 'Reversed reverbs over sub-bass drones with whispering voices', films: 'Harry Potter (Voldemort), Lord of the Rings (Sauron), Maleficent' },
    { name: 'Celestial / Divine', era: 'Mythological', desc: 'Power drawn from the cosmos and divine planes. Overwhelming radiance and golden light.', particles: 'Star motes, golden light rays, constellation lines', glow: 'Brilliant radiance with volumetric god rays', movement: 'Descending from above, expanding halos, orbital patterns', edge: 'Bloom-heavy, ethereal, overwhelming', colors: 'Divine gold: gold #FFD700, ivory #FFF8E1, soft violet #B388FF', sound: 'Celestial choir over deep cosmic resonance', films: 'Thor, Eternals, Clash of the Titans' }
  ];

  for (const ms of magicSystems) {
    sections.push(heading(ms.name, HeadingLevel.HEADING_2));
    sections.push(para('Era: ' + ms.era, { italic: true }));
    sections.push(para(ms.desc));
    sections.push(labelValue('Particle Effects', ms.particles));
    sections.push(labelValue('Glow Style', ms.glow));
    sections.push(labelValue('Movement Pattern', ms.movement));
    sections.push(labelValue('Edge Quality', ms.edge));
    sections.push(labelValue('Color Palette', ms.colors));
    sections.push(labelValue('Sound Signature', ms.sound));
    sections.push(labelValue('Famous Examples', ms.films));
    sections.push(sectionDivider());
  }

  // CH3: CAMERA & CINEMATOGRAPHY
  sections.push(heading('3. Camera & Cinematography', HeadingLevel.HEADING_1));
  sections.push(para('Camera movement is the filmmaker\'s most powerful tool for manipulating audience emotion. Each movement type creates specific psychological and emotional responses that, when combined with fantasy elements, amplify the supernatural quality of scenes.'));

  const cameraMovements = [
    { name: 'Dolly In', desc: 'Camera physically moves toward the subject. Creates intimacy, tension, and focus.', emotions: 'Intimacy, tension, focus, revelation', speed: 'Variable', bestFor: 'Emotional close-ups, building tension, spell casting moments' },
    { name: 'Dolly Out', desc: 'Camera retreats from subject, revealing environment. Creates isolation and awe.', emotions: 'Isolation, revelation, epic scale, vulnerability', speed: 'Variable', bestFor: 'Revealing landscapes, showing isolation, world-building reveals' },
    { name: 'Truck (Lateral)', desc: 'Camera moves laterally parallel to subject. Follows action smoothly.', emotions: 'Flow, continuity, exploration, energy', speed: 'Medium', bestFor: 'Following characters, battle sequences, walking conversations' },
    { name: 'Pan', desc: 'Camera rotates horizontally on fixed axis. Surveys environments.', emotions: 'Exploration, connection, surveillance, anticipation', speed: 'Variable', bestFor: 'Environment surveys, connecting characters, landscape panoramas' },
    { name: 'Tilt', desc: 'Camera rotates vertically. Up conveys power; down suggests discovery.', emotions: 'Power, grandeur, discovery, intimidation', speed: 'Slow', bestFor: 'Revealing creature height, character power, cathedral interiors' },
    { name: 'Crane / Jib', desc: 'Camera sweeps on elevated arm. Creates godlike perspective and grandeur.', emotions: 'Epic, grandeur, transcendence, omniscience', speed: 'Slow', bestFor: 'Establishing shots, battle overviews, magical ascension' },
    { name: 'Steadicam / Gimbal', desc: 'Smooth floating movement following subjects. Dreamlike, immersive quality.', emotions: 'Immersion, flow, dreamlike, pursuit', speed: 'Medium', bestFor: 'Following through corridors, ritual sequences, exploration' },
    { name: 'Handheld', desc: 'Organic shake creating raw urgency and visceral energy.', emotions: 'Urgency, chaos, realism, anxiety', speed: 'Fast', bestFor: 'Battle scenes, chase sequences, transformation pain' },
    { name: 'Drone / Aerial', desc: 'High-altitude sweeping movements revealing full scope of fantasy landscapes.', emotions: 'Epic, scale, freedom, omniscience', speed: 'Variable', bestFor: 'Landscape reveals, army overviews, dragon flights' },
    { name: 'Vertigo Effect (Dolly Zoom)', desc: 'Camera dollies in while zooming out. Background warps creating disorientation.', emotions: 'Disorientation, dread, realization, psychological unease', speed: 'Slow', bestFor: 'Horrifying revelations, curse effects, reality warping' },
    { name: 'Whip Pan', desc: 'Extremely fast horizontal pan creating motion blur for transitions.', emotions: 'Surprise, energy, transition, supernatural speed', speed: 'Fast', bestFor: 'Spell casting transitions, time jumps, surprise attacks' },
    { name: 'Orbit / Arc', desc: 'Camera circles around subject maintaining distance. Builds dramatic tension.', emotions: 'Importance, examination, tension, heroic', speed: 'Slow', bestFor: 'Hero moments, villain reveals, power-up sequences' }
  ];

  sections.push(heading('3.1 Camera Movements', HeadingLevel.HEADING_2));
  for (const cm of cameraMovements) {
    sections.push(heading(cm.name, HeadingLevel.HEADING_3));
    sections.push(para(cm.desc));
    sections.push(labelValue('Emotional Effects', cm.emotions));
    sections.push(labelValue('Speed', cm.speed));
    sections.push(labelValue('Best For', cm.bestFor));
  }

  sections.push(heading('3.2 Lenses', HeadingLevel.HEADING_2));
  const lenses = [
    { name: 'Ultra Wide (10-16mm)', sig: 'Expansive, distorted, immersive. Strong barrel distortion, very deep DoF. Makes small spaces vast and vast spaces infinite.' },
    { name: 'Wide Angle (17-24mm)', sig: 'Expansive but natural. Moderate distortion, deep focus. Captures character and environment equally.' },
    { name: 'Standard (35-50mm)', sig: 'Closest to human eye. Minimal distortion, moderate DoF. Invisible lens — pure storytelling.' },
    { name: 'Portrait Telephoto (85-135mm)', sig: 'Flattering compression, shallow DoF, creamy bokeh. World melts away behind subject.' },
    { name: 'Long Telephoto (200mm+)', sig: 'Extreme depth compression, paper-thin focus. Flattened, voyeuristic feel.' },
    { name: 'Macro (60-105mm)', sig: 'Extremely shallow DoF at close range. Reveals invisible worlds — tiny feels monumental.' },
    { name: 'Anamorphic (2x squeeze)', sig: 'Oval bokeh, horizontal flares, widescreen grandeur. The quintessential cinematic look.' },
    { name: 'Tilt-Shift', sig: 'Selective focus plane, miniature effect. Creates omniscient observation quality.' }
  ];
  for (const l of lenses) {
    sections.push(labelValue(l.name, l.sig));
  }

  sections.push(heading('3.3 Camera Systems', HeadingLevel.HEADING_2));
  sections.push(labelValue('IMAX (70mm)', 'Unmatched resolution and scale. 16+ stops dynamic range. Used in Dunkirk, Interstellar, Oppenheimer.'));
  sections.push(labelValue('ARRI Alexa', 'Legendary skin tones, organic filmic quality. 14+ stops. Gold standard. Used in Dune, Skyfall, Joker.'));
  sections.push(labelValue('RED Monstro/Raptor', 'Ultra-sharp clinical precision, 8K, 17+ stops. Used in Guardians of the Galaxy, The Hobbit.'));
  sections.push(labelValue('Sony Venice', 'Dual ISO, beautiful full-frame DoF, excels in low light. 15+ stops. Used in Top Gun Maverick.'));
  sections.push(labelValue('Blackmagic URSA', 'Impressive quality for independent filmmakers. 13+ stops. Budget-conscious productions.'));

  sections.push(heading('3.4 Depth of Field Techniques', HeadingLevel.HEADING_2));
  sections.push(labelValue('Shallow DoF', 'Wide aperture (f/1.4-2.8). Only subject sharp. Creates intimacy and emotional focus.'));
  sections.push(labelValue('Deep DoF', 'Narrow aperture (f/8-16). Everything sharp. Shows full scope of environments.'));
  sections.push(labelValue('Rack Focus', 'Focus shifts between subjects. Directs attention and reveals connections.'));
  sections.push(labelValue('Split Diopter', 'Two planes in focus simultaneously. Creates uncanny dual-focus unease.'));
  sections.push(labelValue('Shaped Bokeh', 'Custom aperture shapes (stars, hexagons) for magical atmosphere.'));
  sections.push(sectionDivider());

  // CH4: LIGHTING
  sections.push(heading('4. Lighting for Fantasy', HeadingLevel.HEADING_1));
  sections.push(para('Lighting is the single most powerful tool for establishing mood in fantasy filmmaking. The right lighting setup can make the difference between a scene that feels magical and one that feels mundane.'));

  sections.push(heading('4.1 Lighting Patterns', HeadingLevel.HEADING_2));
  const patterns = [
    { name: 'Rembrandt', desc: 'Key at 45° creating triangle of light on shadow side. Dramatic, painterly, mysterious. Ratio: 4:1 to 8:1.' },
    { name: 'Butterfly (Paramount)', desc: 'Key directly above creating butterfly shadow under nose. Glamorous, ethereal, divine. Ratio: 2:1 to 4:1.' },
    { name: 'Split Lighting', desc: 'Key at exact 90° illuminating half the face. Maximum dramatic contrast. Dual nature, deception.' },
    { name: 'Loop Lighting', desc: 'Key at 30-45° creating small nose shadow loop. Natural, approachable. Ratio: 2:1 to 3:1.' },
    { name: 'Rim / Silhouette', desc: 'Strong backlight, minimal front fill. Mysterious, iconic, otherworldly.' },
    { name: 'Under Lighting', desc: 'Light from below. Instinctively unsettling — reverses natural light direction. Sinister, unnatural.' },
    { name: 'Practical Only', desc: 'All light from visible in-scene sources (candles, torches, magical orbs). Maximum authenticity.' },
    { name: 'Top / Overhead', desc: 'Light directly above creating deep eye socket shadows. Divine judgment or oppressive weight.' }
  ];
  for (const p of patterns) {
    sections.push(labelValue(p.name, p.desc));
  }

  sections.push(heading('4.2 Light Qualities', HeadingLevel.HEADING_2));
  sections.push(labelValue('Hard Light', 'Direct source, sharp shadows, high contrast. Harsh, dramatic, confrontational.'));
  sections.push(labelValue('Soft Light', 'Diffused source, gentle shadow transitions. Gentle, romantic, dreamlike.'));
  sections.push(labelValue('Diffused / Ambient', 'Heavily scattered, minimal direction. Ethereal, otherworldly, liminal.'));
  sections.push(labelValue('Specular', 'Tiny intense source, razor-sharp shadows. Magical, precise, focused energy.'));

  sections.push(heading('4.3 Color Temperature Guide', HeadingLevel.HEADING_2));
  sections.push(labelValue('1800K - Candlelight', 'Deep amber. Ancient, ritual, intimate. Best for: elemental magic.'));
  sections.push(labelValue('2200K - Torchlight', 'Orange. Medieval, adventurous. Best for: elemental magic.'));
  sections.push(labelValue('3200K - Halogen', 'Warm white. Standard film lighting. Best for: modern magic.'));
  sections.push(labelValue('5600K - Daylight', 'Natural white. Truthful, heroic. Best for: divine magic.'));
  sections.push(labelValue('6500K - Overcast', 'Cool blue-white. Somber, ominous. Best for: dark magic.'));
  sections.push(labelValue('9000K - Blue Hour', 'Deep blue. Mysterious, supernatural. Best for: dark/forbidden magic.'));

  sections.push(heading('4.4 Magic-Type Lighting Presets', HeadingLevel.HEADING_2));
  sections.push(labelValue('Ancient/Elemental', 'Warm firelight key (2200K), cool moonlight rim (9000K), ground fog, dust particles in torch beams.'));
  sections.push(labelValue('Modern/Urban', 'Neutral to cool key from spell effects, ambient city neon, urban haze catching spell light.'));
  sections.push(labelValue('Futuristic/Tech', 'Cool cyan-white key from holographics, low ambient blue, clean atmosphere with energy particles.'));
  sections.push(labelValue('Dark/Forbidden', 'Sickly green under-light, near-zero fill, thick black fog that absorbs light.'));
  sections.push(labelValue('Celestial/Divine', 'Brilliant warm gold from above, soft gold ambient wrap, intense white bloom halo, heavy atmosphere for god rays.'));
  sections.push(sectionDivider());

  // CH5: BODY MOVEMENT
  sections.push(heading('5. Body Movement & Performance', HeadingLevel.HEADING_1));
  sections.push(para('How actors physically channel magic is as important as the VFX. Body movement defines the character\'s relationship with their power and communicates narrative information that dialogue cannot.'));

  const movements = [
    { name: 'Tai Chi / Flowing', desc: 'Slow, continuous circular movements. Channels energy like water. Pairs with: Ancient/Elemental, Celestial/Divine.', poses: 'Cloud hands, wave rolling, crane stance, push and pull' },
    { name: 'Martial Arts / Precise', desc: 'Sharp explosive strikes and blocks. Each gesture is a weapon. Pairs with: Modern/Urban, Futuristic/Tech.', poses: 'Strike palm, crane block, horse stance, spinning kick' },
    { name: 'Conductor / Orchestral', desc: 'Grand sweeping arm movements orchestrating forces like a symphony. Pairs with: Modern/Urban, Celestial/Divine.', poses: 'Grand sweep, pinch and pull, crescendo lift, cut-off' },
    { name: 'Ritual / Ceremonial', desc: 'Deliberate symbolic gestures in specific sequences. Drawing sigils, mudras. Pairs with: Ancient/Elemental, Dark/Forbidden.', poses: 'Sigil trace, invocation arms, binding gesture, prostration' },
    { name: 'Tech Interface / Gestural', desc: 'Precise finger movements manipulating holographic interfaces. Minority Report style. Pairs with: Futuristic/Tech, Robotic/Cybernetic.', poses: 'Swipe and select, pinch and expand, tap activation, drag and deploy' },
    { name: 'Primal / Instinctive', desc: 'Raw movements driven by emotion. Clawing, screaming, convulsing. Pairs with: Dark/Forbidden, Robotic/Cybernetic.', poses: 'Feral crouch, primal scream, ground pound, writhing channel' },
    { name: 'Meditation / Stillness', desc: 'Near-total stillness. Power from internal focus. A single gesture triggers massive effect. Pairs with: Celestial/Divine, Ancient/Elemental.', poses: 'Lotus position, standing meditation, single gesture, levitation' }
  ];
  for (const m of movements) {
    sections.push(heading(m.name, HeadingLevel.HEADING_2));
    sections.push(para(m.desc));
    sections.push(labelValue('Key Poses', m.poses));
  }
  sections.push(sectionDivider());

  // CH6: CREATURES
  sections.push(heading('6. Magical Creatures', HeadingLevel.HEADING_1));
  sections.push(para('Creature design in fantasy filmmaking operates on three fundamental axes: Shape (silhouette and movement), Material (what the creature is made of), and Behavior (how it acts). The combination of these three elements creates the creature\'s unique cinematic presence.'));

  sections.push(heading('6.1 Shape Language', HeadingLevel.HEADING_2));
  sections.push(labelValue('Serpentine', 'Long sinuous body, S-curves, coiling. Primal fear + ancient wisdom. Based on: snakes, eels, dragons.'));
  sections.push(labelValue('Avian', 'Broad wingspan, sharp beak, taloned feet. Freedom + divine messenger. Based on: eagles, ravens, phoenix.'));
  sections.push(labelValue('Chimeric', 'Composite of multiple animals. Wrongness + impossibility. Based on: griffin, manticore, sphinx.'));
  sections.push(labelValue('Geometric/Abstract', 'Non-organic forms, crystals, fractals. Cosmic horror + alien intelligence. Based on: crystals, sacred geometry.'));
  sections.push(labelValue('Insectoid', 'Segmented body, multiple limbs, exoskeleton. Revulsion + swarm anxiety. Based on: beetles, spiders, mantises.'));
  sections.push(labelValue('Aquatic/Amorphous', 'Fluid boneless form, tentacles, bioluminescence. Deep-sea dread + the unknown. Based on: octopus, jellyfish, kraken.'));

  sections.push(heading('6.2 Material Composition', HeadingLevel.HEADING_2));
  sections.push(labelValue('Ethereal/Translucent', 'Semi-transparent, ghostly. Light refracts through body. Sound: whispers, glass harmonics.'));
  sections.push(labelValue('Elemental Fire', 'Living flame with ember core, magma skin, heat distortion. Sound: roaring flames, crackling.'));
  sections.push(labelValue('Elemental Ice/Water', 'Crystalline ice or flowing liquid. Prismatic light splitting. Sound: cracking ice, crystalline tinkling.'));
  sections.push(labelValue('Mechanical/Steampunk', 'Brass, copper, iron with visible gears and steam. Sound: gear grinding, steam hissing, clockwork.'));
  sections.push(labelValue('Cosmic/Nebula', 'Swirling nebula gases with star clusters inside. Sound: deep cosmic drones, crystalline star tones.'));
  sections.push(labelValue('Shadow/Void', 'Living darkness, absolute black core absorbing all light. Sound: reversed sounds, bass drops, weighted silence.'));
  sections.push(labelValue('Crystalline', 'Living crystal — faceted surfaces, internal refraction. Sound: glass ringing, harmonic resonance.'));
  sections.push(labelValue('Bioluminescent', 'Organic tissue with glowing vein networks. Sound: wet squelches, rhythmic pulsing, humming.'));

  sections.push(heading('6.3 Behavior Archetypes', HeadingLevel.HEADING_2));
  sections.push(labelValue('Predatory Stalker', 'Patient hunter (Aggr: 9/10, Int: 7/10). Solitary. Near-silent approach, explosive ambush.'));
  sections.push(labelValue('Guardian Sentinel', 'Ancient protector (Aggr: 3/10, Int: 8/10). Solitary duty. Stone-still patience, overwhelming defense.'));
  sections.push(labelValue('Trickster/Shapeshifter', 'Deceptive, unpredictable (Aggr: 4/10, Int: 9/10). Infiltrates groups. Mimicry, false vulnerability.'));
  sections.push(labelValue('Ancient/Wise', 'Vast age and knowledge (Aggr: 1/10, Int: 10/10). Solitary sage. Subtle reality manipulation.'));
  sections.push(labelValue('Swarm/Hivemind', 'Countless units as one mind (Aggr: 7/10, Int: 6/10). Collective. Wave attacks, shape formation.'));
  sections.push(labelValue('Parasitic/Corruptor', 'Invades hosts, corrupts from within (Aggr: 6/10, Int: 5/10). Body horror archetype.'));
  sections.push(labelValue('Benevolent/Healer', 'Gentle restorer (Aggr: 0/10, Int: 7/10). Nurturing groups. Healing touch, empathic bonding.'));
  sections.push(sectionDivider());

  // CH7: SOUND DESIGN
  sections.push(heading('7. Sound Design for Fantasy', HeadingLevel.HEADING_1));
  sections.push(para('Sound design completes the fantasy illusion. Effective magical sounds combine organic recordings with synthesis, layered in three positions: Base (foundation tone), Texture (character and movement), and Sweetener (accent and sparkle).'));

  sections.push(heading('7.1 Sound Elements', HeadingLevel.HEADING_2));
  sections.push(labelValue('Whoosh/Swipe', 'Fast air displacement. 200Hz-12kHz. Created from rope/rod swings with pitch shifting. Best for: spell releases, projectiles.'));
  sections.push(labelValue('Impact/Hit', 'Energy connecting with target. 30Hz-8kHz. Rock impacts + electrical arcs + synth sub-bass. Best for: spell impacts, shield blocks.'));
  sections.push(labelValue('Riser/Swell', 'Building tension sweep upward. 80Hz-16kHz. Synth sweep + reversed cymbal. Best for: power charging, transformation build-up.'));
  sections.push(labelValue('Drone/Sustain', 'Continuous evolving tonal bed. 20Hz-2kHz. Granular synthesis of metals + string drones. Best for: magical environments.'));
  sections.push(labelValue('Chime/Bell', 'Clear ringing tones. 500Hz-18kHz. Crystal bowls + bells with long reverb. Best for: spell activation, healing.'));
  sections.push(labelValue('Crackle/Spark', 'Electrical discharge. 1kHz-20kHz. Tesla coils + fire crackle + static. Best for: lightning magic, energy shields.'));
  sections.push(labelValue('Rumble/Sub-Bass', 'Deep felt-more-than-heard power. 15Hz-120Hz. Slowed thunder + synth sub. Best for: earthquake magic, portals.'));
  sections.push(labelValue('Whisper/Breath', 'Ghostly vocal fragments. 300Hz-8kHz. Processed voice with granular stretch. Best for: ghost encounters, dark magic.'));
  sections.push(labelValue('Glitch/Digital', 'Stuttering corrupted artifacts. 200Hz-20kHz. Bit-crushing + circuit-bent electronics. Best for: tech magic, reality glitches.'));
  sections.push(labelValue('Choir/Ethereal', 'Angelic harmonics. 200Hz-14kHz. Recorded choir + spectral manipulation. Best for: divine magic, transcendent moments.'));

  sections.push(heading('7.2 Layering Technique', HeadingLevel.HEADING_2));
  sections.push(para('Every magical sound event should be built from three layers:'));
  sections.push(bulletItem('BASE LAYER: Foundation tone that establishes the weight and scale (drones, rumbles, nature elements)'));
  sections.push(bulletItem('TEXTURE LAYER: Character and movement that gives the sound its identity (risers, whispers, crackles, choir)'));
  sections.push(bulletItem('SWEETENER: Accent that adds magic and memorability (chimes, whooshes, glitches, impacts)'));
  sections.push(sectionDivider());

  // CH8: COLOR GRADING
  sections.push(heading('8. Color Grading & Color Science', HeadingLevel.HEADING_1));
  sections.push(para('Color grading is the final emotional layer applied to fantasy footage. The right palette reinforces the magic system, mood, and narrative themes.'));

  sections.push(heading('8.1 Key Palettes', HeadingLevel.HEADING_2));
  sections.push(labelValue('Teal & Orange Blockbuster', 'Complementary contrast. Push shadows teal, warm highlights orange. Exciting, cinematic. Films: Transformers, Mad Max.'));
  sections.push(labelValue('Desaturated Grim', 'Nearly monochrome. 50-70% saturation reduction, crushed blacks. Bleak, war-torn. Films: Saving Private Ryan, The Road.'));
  sections.push(labelValue('Golden Warm Ancient', 'Amber and gold evoking candlelight civilizations. Warm shadows. Nostalgic, regal. Films: Lord of the Rings, Gladiator.'));
  sections.push(labelValue('Neon Cyberpunk', 'High-saturation neons against pure black. Magenta, cyan, electric blue. Futuristic, dangerous. Films: Blade Runner 2049, John Wick.'));
  sections.push(labelValue('Ethereal Pastel', 'Soft lifted pastels with blown highlights. Dreamlike, celestial. Films: The Tree of Life, Eternals.'));
  sections.push(labelValue('Deep Shadow Horror', 'Impenetrable darkness with thin slivers of deep red. Terrifying, oppressive. Films: The Exorcist, Hereditary.'));
  sections.push(labelValue('Cosmic Vibrant', 'Deep space purples punctuated by nebula colors. Wondrous, psychedelic. Films: Guardians of the Galaxy, Doctor Strange.'));

  sections.push(heading('8.2 Techniques', HeadingLevel.HEADING_2));
  sections.push(labelValue('LUTs (Look-Up Tables)', 'Pre-made color transformations applied as starting points. Can be film-stock emulations or custom looks.'));
  sections.push(labelValue('Power Windows', 'Masked color adjustments applied to specific frame regions — isolate sky, skin, or set pieces.'));
  sections.push(labelValue('HSL Curves', 'Hue, Saturation, Luminance curve adjustments for precise color targeting.'));
  sections.push(labelValue('Color Wheels', 'Lift (shadows), Gamma (midtones), Gain (highlights) color adjustments. Primary grading tool.'));
  sections.push(sectionDivider());

  // CH9: COMBINATION GUIDE
  sections.push(heading('9. Combination Guide — Visual Recipes', HeadingLevel.HEADING_1));
  sections.push(para('The most powerful aspect of this guide is understanding how elements combine. Below are proven high-synergy combinations and creative conflicts.'));

  sections.push(heading('9.1 High-Synergy Combinations', HeadingLevel.HEADING_2));
  const synergies = [
    'Ancient/Elemental + Tai Chi Flowing + Crane Shot + Rembrandt Lighting + Golden Warm palette = "Epic Ancient Revelation"',
    'Dark/Forbidden + Primal/Instinctive + Handheld + Under Lighting + Deep Shadow palette = "Visceral Dark Corruption"',
    'Celestial/Divine + Meditation/Stillness + Crane Shot + Butterfly Lighting + Ethereal Pastel palette = "Transcendent Divine Calm"',
    'Futuristic/Tech + Tech Interface + Steadicam + Soft Light + Teal & Orange palette = "Sleek Tech Mastery"',
    'Modern/Urban + Martial Arts + Whip Pan + Split Lighting + Cosmic Vibrant palette = "Dynamic Arcane Combat"',
    'Robotic/Cybernetic + Primal/Instinctive + Handheld + Practical Only + Neon Cyberpunk palette = "Chaotic Augmented Fury"'
  ];
  for (const s of synergies) { sections.push(bulletItem(s)); }

  sections.push(heading('9.2 Creative Conflicts', HeadingLevel.HEADING_2));
  sections.push(para('These combinations create tension — use them intentionally for narrative effect:'));
  sections.push(bulletItem('Celestial/Divine + Under Lighting: Divine light comes from above — underlighting suggests a fallen or corrupted divine being'));
  sections.push(bulletItem('Ancient/Elemental + Glitch sounds: Digital artifacts clash with organic magic — use when tech corrupts nature'));
  sections.push(bulletItem('Handheld + Meditation/Stillness: Chaotic camera undermines stillness — use handheld on observers, locked-off on meditator'));
  sections.push(sectionDivider());

  // CH10: GLOSSARY
  sections.push(heading('10. Glossary of Key Terms', HeadingLevel.HEADING_1));
  const glossary = [
    ['Anamorphic', 'Lens system using a 2x horizontal squeeze, creating widescreen images with characteristic oval bokeh and horizontal flares.'],
    ['Bokeh', 'The aesthetic quality of out-of-focus blur, particularly in highlights. Shaped by aperture blade design.'],
    ['Chiaroscuro', 'Strong contrast between light and dark areas, named after the Renaissance painting technique.'],
    ['Color Temperature', 'Measurement in Kelvin (K) of light color from warm amber (2000K) to cool blue (10000K).'],
    ['Dolly Zoom', 'Simultaneous dolly and zoom in opposite directions, creating background distortion (Vertigo Effect).'],
    ['Dynamic Range', 'The ratio between the darkest and brightest values a camera can capture, measured in stops.'],
    ['God Rays', 'Volumetric light beams visible in atmospheric haze, creating dramatic shafts of light.'],
    ['Key-to-Fill Ratio', 'The intensity difference between the main (key) light and the fill light, expressed as a ratio.'],
    ['LUT', 'Look-Up Table — a mathematical formula that transforms color values for consistent color grading.'],
    ['Motivated Lighting', 'Lighting that appears to come from a logical source within the scene (window, lamp, fire).'],
    ['Particle System', 'VFX technique generating thousands of small elements (sparks, dust, embers) following physics rules.'],
    ['Practical Light', 'A visible light source within the scene that serves both as set dressing and actual illumination.'],
    ['Rack Focus', 'Shifting focus from one subject to another within a shot to redirect viewer attention.'],
    ['Riser', 'A sound effect that builds in pitch and intensity, creating anticipation before a climactic moment.'],
    ['Sweetener', 'A subtle sound layer added to enhance or accent a primary sound effect.'],
    ['Volumetric Lighting', 'Light that is visible in three-dimensional space due to atmospheric particles (fog, dust, haze).']
  ];
  for (const [term, def] of glossary) {
    sections.push(labelValue(term, def));
  }

  return new Document({
    styles: {
      paragraphStyles: [{
        id: 'Normal',
        name: 'Normal',
        run: { font: 'Calibri', size: 22 },
        paragraph: { spacing: { line: 300 } }
      }]
    },
    sections: [{ children: sections }]
  });
}

async function main() {
  console.log('Generating research document...');
  const doc = buildDoc();
  const buffer = await Packer.toBuffer(doc);
  fs.mkdirSync('research', { recursive: true });
  fs.writeFileSync('research/fantasy-filmmaking-guide.docx', buffer);
  console.log('Done! Document saved to: research/fantasy-filmmaking-guide.docx');
}

main().catch(console.error);
