document.addEventListener('DOMContentLoaded', init);

function init() {
  setupNavigation();
  renderMagicSystems();
  renderCameraMovements();
  renderLenses();
  renderCameraSystems();
  renderDepthOfField();
  renderEmotionMatrix();
  renderLightingPatterns();
  renderLightQualities();
  renderColorTemperatures();
  renderMagicPresets();
  setupLightingConfigurator();
  renderBodyMovements();
  renderBodyMagicConnections();
  setupCreatureBuilder();
  renderSoundDesign();
  setupSoundLayerBuilder();
  renderColorGrading();
  populateRecipeSelects();
  setupSubTabs();
  initRecipeBuilder();
  handleHashNavigation();
}

function setupNavigation() {
  var tabs = document.querySelectorAll('.nav-tab');
  var toggle = document.getElementById('nav-toggle');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var target = tab.getAttribute('href');
      if (target) {
        history.pushState(null, '', target);
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }
      document.body.classList.remove('nav-open');
    });
  });

  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
    });
  }
}

function handleHashNavigation() {
  if (window.location.hash) {
    var target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(function () { target.scrollIntoView({ behavior: 'smooth' }); }, 300);
      var tab = document.querySelector('.nav-tab[href="' + window.location.hash + '"]');
      if (tab) {
        document.querySelectorAll('.nav-tab').forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
      }
    }
  }
}

function setupSubTabs() {
  document.querySelectorAll('.sub-tabs').forEach(function (tabGroup) {
    tabGroup.querySelectorAll('.sub-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabGroup.querySelectorAll('.sub-tab').forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var targetId = tab.getAttribute('data-target');
        var parent = tabGroup.parentElement;
        parent.querySelectorAll('.sub-tab-content').forEach(function (c) { c.classList.remove('active'); });
        var target = document.getElementById(targetId);
        if (target) target.classList.add('active');
      });
    });
  });
}

function createCard(data, extraHtml) {
  var card = document.createElement('div');
  card.className = 'card';
  if (data.colors && data.colors.primary) {
    card.style.borderTopColor = data.colors.primary;
  }
  var html = '<div class="card-header"><h3 class="card-title">' + data.name + '</h3>';
  if (data.era) html += '<span class="badge badge-era">' + data.era + '</span>';
  html += '</div>';
  if (data.description) html += '<p class="card-description">' + data.description + '</p>';
  if (extraHtml) html += extraHtml;
  card.innerHTML = html;
  return card;
}

function createBadge(text, className) {
  return '<span class="badge ' + (className || '') + '">' + text + '</span>';
}

function createColorSwatch(hex, label) {
  return '<span class="color-swatch" style="background:' + hex + '" title="' + (label || hex) + '"></span>';
}

function populateSelect(selectId, items, labelKey) {
  var select = document.getElementById(selectId);
  if (!select) return;
  items.forEach(function (item) {
    var opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item[labelKey || 'name'];
    select.appendChild(opt);
  });
}

// ===== MAGIC SYSTEMS =====
function renderMagicSystems() {
  var grid = document.getElementById('magic-grid');
  if (!grid) return;

  FANTASTICAL_DATA.magicSystems.forEach(function (ms) {
    var swatches = '<div class="color-swatches">';
    Object.entries(ms.colors).forEach(function (entry) {
      swatches += createColorSwatch(entry[1], entry[0]);
    });
    swatches += '</div>';

    var visuals = '<div class="card-details">';
    visuals += '<p><strong>Particles:</strong> ' + ms.visuals.particleType + '</p>';
    visuals += '<p><strong>Movement:</strong> ' + ms.visuals.movementPattern + '</p>';
    visuals += '<p><strong>Edge Quality:</strong> ' + ms.visuals.edgeQuality + '</p>';
    visuals += '</div>';

    var sound = '<p class="card-sound"><strong>Sound:</strong> ' + ms.sound.description + '</p>';

    var tags = '<div class="card-tags">';
    ms.tags.mood.forEach(function (m) {
      tags += createBadge(m, 'badge-mood');
    });
    tags += '</div>';

    var expandable = '<div class="card-expandable hidden">';
    expandable += '<h4>Visual Breakdown</h4>';
    expandable += '<p><strong>Glow:</strong> ' + ms.visuals.glowStyle + '</p>';
    expandable += '<p><strong>Opacity:</strong> ' + ms.visuals.opacity + '</p>';
    expandable += '<p><strong>Intensity:</strong> ' + ms.visuals.intensity + '</p>';
    expandable += '<h4>AI Prompt Keywords</h4>';
    expandable += '<div class="card-tags">' + ms.promptKeywords.map(function (k) { return createBadge(k, 'badge-keyword'); }).join('') + '</div>';
    expandable += '<h4>Famous Examples</h4>';
    expandable += '<ul>' + ms.famousExamples.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>';
    expandable += '</div>';

    var card = createCard(ms, swatches + visuals + sound + tags + expandable);
    card.style.borderTopColor = ms.colors.primary;
    card.classList.add('card-expandable-trigger');
    card.addEventListener('click', function () {
      var exp = card.querySelector('.card-expandable');
      if (exp) exp.classList.toggle('hidden');
    });
    grid.appendChild(card);
  });
}

// ===== CAMERA MOVEMENTS =====
function renderCameraMovements() {
  var grid = document.getElementById('movements-grid');
  if (!grid) return;

  FANTASTICAL_DATA.cameraMovements.forEach(function (cm) {
    var effects = '<div class="card-tags">';
    cm.emotionalEffect.forEach(function (e) {
      effects += createBadge(e, 'badge-emotion');
    });
    effects += '</div>';

    var speed = '<p><strong>Speed:</strong> ' + cm.speed + '</p>';

    var bestFor = '<div class="card-details"><strong>Best for:</strong><ul>';
    cm.bestFor.forEach(function (b) { bestFor += '<li>' + b + '</li>'; });
    bestFor += '</ul></div>';

    var card = createCard(cm, effects + speed + bestFor);
    card.style.borderTopColor = '#00d4ff';
    grid.appendChild(card);
  });
}

// ===== LENSES =====
function renderLenses() {
  var grid = document.getElementById('lenses-grid');
  if (!grid) return;

  FANTASTICAL_DATA.lenses.forEach(function (lens) {
    var chars = '<div class="card-details">';
    chars += '<p><strong>Focal Range:</strong> ' + lens.focalRange + '</p>';
    chars += '<p><strong>Distortion:</strong> ' + lens.characteristics.distortion + '</p>';
    chars += '<p><strong>Depth of Field:</strong> ' + lens.characteristics.depthOfField + '</p>';
    chars += '<p><strong>Bokeh:</strong> ' + lens.characteristics.bokeh + '</p>';
    chars += '</div>';

    var sig = '<p class="card-sound"><strong>Visual Signature:</strong> ' + lens.visualSignature + '</p>';

    var tags = '<div class="card-tags">';
    tags += createBadge(lens.tags.scale, 'badge-scale');
    tags += createBadge(lens.tags.style, 'badge-style');
    tags += '</div>';

    var card = createCard(lens, chars + sig + tags);
    card.style.borderTopColor = '#7b2ff7';
    grid.appendChild(card);
  });
}

// ===== CAMERA SYSTEMS =====
function renderCameraSystems() {
  var grid = document.getElementById('systems-grid');
  if (!grid) return;

  FANTASTICAL_DATA.cameraSystems.forEach(function (cs) {
    var specs = '<div class="card-details">';
    specs += '<p><strong>Sensor:</strong> ' + cs.sensorSize + '</p>';
    specs += '<p><strong>Resolution:</strong> ' + cs.resolution + '</p>';
    specs += '<p><strong>Dynamic Range:</strong> ' + cs.dynamicRange + '</p>';
    specs += '<p><strong>Slow-Mo:</strong> ' + cs.frameRates.slowMo + '</p>';
    specs += '</div>';

    var sig = '<p class="card-sound"><strong>Visual Signature:</strong> ' + cs.visualSignature + '</p>';

    var films = '<div class="card-tags">';
    cs.famousFilms.forEach(function (f) { films += createBadge(f, 'badge-film'); });
    films += '</div>';

    var card = createCard(cs, specs + sig + films);
    card.style.borderTopColor = '#ff8c00';
    grid.appendChild(card);
  });
}

// ===== DEPTH OF FIELD =====
function renderDepthOfField() {
  var grid = document.getElementById('dof-grid');
  if (!grid) return;

  FANTASTICAL_DATA.depthOfField.forEach(function (dof) {
    var details = '<div class="card-details">';
    details += '<p><strong>Emotional Effect:</strong> ' + dof.emotionalEffect + '</p>';
    details += '<p><strong>Technical Setup:</strong> ' + dof.technicalSetup + '</p>';
    details += '<p><strong>Best For:</strong> ' + dof.bestFor.join(', ') + '</p>';
    details += '</div>';

    var card = createCard(dof, details);
    card.style.borderTopColor = '#00ff88';
    grid.appendChild(card);
  });
}

// ===== EMOTION MATRIX =====
function renderEmotionMatrix() {
  var container = document.getElementById('emotion-matrix');
  if (!container) return;

  var emotions = ['intimacy', 'tension', 'epic', 'chaos', 'revelation', 'power', 'flow', 'dread'];
  var movements = FANTASTICAL_DATA.cameraMovements;

  var html = '<table class="matrix-table"><thead><tr><th></th>';
  emotions.forEach(function (e) {
    html += '<th>' + e.charAt(0).toUpperCase() + e.slice(1) + '</th>';
  });
  html += '</tr></thead><tbody>';

  movements.forEach(function (mov) {
    html += '<tr><td class="matrix-label">' + mov.name + '</td>';
    emotions.forEach(function (emo) {
      var match = mov.emotionalEffect.some(function (e) {
        return e.toLowerCase().includes(emo) || emo.includes(e.toLowerCase());
      });
      var tagMatch = mov.tags.mood.some(function (m) {
        return m.toLowerCase().includes(emo) || emo.includes(m.toLowerCase());
      });
      if (match || tagMatch) {
        html += '<td class="matrix-cell matrix-active" title="' + mov.name + ' creates ' + emo + '">&#9679;</td>';
      } else {
        html += '<td class="matrix-cell"></td>';
      }
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

// ===== LIGHTING =====
function renderLightingPatterns() {
  var grid = document.getElementById('patterns-grid');
  if (!grid) return;

  FANTASTICAL_DATA.lightingPatterns.forEach(function (lp) {
    var details = '<div class="card-details">';
    details += '<p><strong>Setup:</strong> ' + lp.setup + '</p>';
    details += '<p><strong>Mood:</strong> ' + lp.mood + '</p>';
    details += '<p><strong>Key:Fill Ratio:</strong> ' + lp.keyToFillRatio + '</p>';
    details += '<p><strong>Best For:</strong> ' + lp.bestFor.join(', ') + '</p>';
    details += '</div>';

    var tags = '<div class="card-tags">';
    tags += createBadge('Drama: ' + lp.tags.drama, 'badge-drama');
    tags += createBadge('Mystery: ' + lp.tags.mystery, 'badge-mystery');
    tags += '</div>';

    var card = createCard(lp, details + tags);
    card.style.borderTopColor = '#c9a84c';
    grid.appendChild(card);
  });
}

function renderLightQualities() {
  var grid = document.getElementById('qualities-grid');
  if (!grid) return;

  FANTASTICAL_DATA.lightQualities.forEach(function (lq) {
    var details = '<div class="card-details">';
    details += '<p><strong>Sources:</strong> ' + lq.sources + '</p>';
    details += '<p><strong>Mood:</strong> ' + lq.mood + '</p>';
    details += '</div>';

    var card = createCard(lq, details);
    card.style.borderTopColor = '#FFD700';
    grid.appendChild(card);
  });
}

function renderColorTemperatures() {
  var grid = document.getElementById('color-temp-grid');
  if (!grid) return;

  FANTASTICAL_DATA.colorTemperatures.forEach(function (ct) {
    var details = '<div class="card-details">';
    details += '<div class="temp-visual" style="background:' + ct.color + '; height:40px; border-radius:8px; margin-bottom:12px;"></div>';
    details += '<p><strong>Temperature:</strong> ' + ct.kelvin + 'K</p>';
    details += '<p><strong>Sources:</strong> ' + ct.sources + '</p>';
    details += '<p><strong>Mood:</strong> ' + ct.mood + '</p>';
    details += '</div>';

    var card = createCard(ct, details);
    card.style.borderTopColor = ct.color;
    grid.appendChild(card);
  });
}

function renderMagicPresets() {
  var grid = document.getElementById('magic-presets-grid');
  if (!grid) return;

  FANTASTICAL_DATA.magicLightingPresets.forEach(function (mp) {
    var magic = FANTASTICAL_DATA.magicSystems.find(function (m) { return m.id === mp.magicSystemId; });
    var name = magic ? magic.name : mp.magicSystemId;

    var details = '<div class="card-details">';
    details += '<p><strong>Key Light:</strong> ' + mp.keyLight + '</p>';
    details += '<p><strong>Fill Light:</strong> ' + mp.fillLight + '</p>';
    details += '<p><strong>Back Light:</strong> ' + mp.backLight + '</p>';
    details += '<p><strong>Practicals:</strong> ' + mp.practicalSources + '</p>';
    details += '<p><strong>Volumetric:</strong> ' + mp.volumetric + '</p>';
    details += '</div>';
    details += '<p class="card-sound"><strong>Mood:</strong> ' + mp.mood + '</p>';

    var card = createCard({ name: name + ' Lighting', description: 'Complete lighting preset for ' + name + ' magic.' }, details);
    if (magic) card.style.borderTopColor = magic.colors.primary;
    grid.appendChild(card);
  });
}

function setupLightingConfigurator() {
  populateSelect('config-pattern', FANTASTICAL_DATA.lightingPatterns, 'name');
  populateSelect('config-quality', FANTASTICAL_DATA.lightQualities, 'name');
  populateSelect('config-color-temp', FANTASTICAL_DATA.colorTemperatures, 'name');
  populateSelect('config-magic-type', FANTASTICAL_DATA.magicSystems, 'name');

  ['config-pattern', 'config-quality', 'config-color-temp', 'config-magic-type'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('change', updateLightingConfigurator);
  });
}

function updateLightingConfigurator() {
  var output = document.getElementById('configurator-output');
  if (!output) return;

  var patternId = document.getElementById('config-pattern')?.value;
  var qualityId = document.getElementById('config-quality')?.value;
  var tempId = document.getElementById('config-color-temp')?.value;
  var magicId = document.getElementById('config-magic-type')?.value;

  if (!patternId && !qualityId && !tempId && !magicId) {
    output.innerHTML = '<p class="placeholder-text">Select options above to generate a lighting setup.</p>';
    return;
  }

  var pattern = FANTASTICAL_DATA.lightingPatterns.find(function (p) { return p.id === patternId; });
  var quality = FANTASTICAL_DATA.lightQualities.find(function (q) { return q.id === qualityId; });
  var temp = FANTASTICAL_DATA.colorTemperatures.find(function (t) { return t.id === tempId; });
  var magic = FANTASTICAL_DATA.magicSystems.find(function (m) { return m.id === magicId; });

  var html = '<div class="configurator-result">';
  html += '<h4>Your Lighting Setup</h4>';

  if (pattern) html += '<p><strong>Pattern:</strong> ' + pattern.name + ' — ' + pattern.mood + '</p>';
  if (quality) html += '<p><strong>Quality:</strong> ' + quality.name + ' — ' + quality.mood + '</p>';
  if (temp) html += '<p><strong>Color Temperature:</strong> ' + temp.kelvin + 'K (' + temp.name + ') — ' + temp.mood + '</p>';
  if (magic) {
    var preset = FANTASTICAL_DATA.magicLightingPresets.find(function (p) { return p.magicSystemId === magic.id; });
    if (preset) html += '<p><strong>Magic Preset:</strong> ' + preset.mood + '</p>';
  }

  var moods = [pattern?.mood, quality?.mood, temp?.mood].filter(Boolean);
  if (moods.length > 0) {
    html += '<p class="configurator-mood"><strong>Combined Mood:</strong> ' + moods.join(' + ') + '</p>';
  }

  html += '</div>';
  output.innerHTML = html;
}

// ===== BODY & MOTION =====
function renderBodyMovements() {
  var grid = document.getElementById('body-grid');
  if (!grid) return;

  FANTASTICAL_DATA.bodyMovements.forEach(function (bm) {
    var poses = '<div class="card-details"><strong>Key Poses:</strong><ul>';
    bm.keyPoses.forEach(function (p) { poses += '<li>' + p + '</li>'; });
    poses += '</ul></div>';

    var details = '<p><strong>Rhythm:</strong> ' + bm.rhythm + '</p>';
    details += '<p><strong>Emotional Register:</strong> ' + bm.emotionalRegister + '</p>';
    details += '<p><strong>Sound:</strong> ' + bm.soundAccompaniment + '</p>';

    var pairs = '<div class="card-details"><strong>Pairs well with:</strong> ';
    pairs += bm.pairedMagicSystems.map(function (id) {
      var ms = FANTASTICAL_DATA.magicSystems.find(function (m) { return m.id === id; });
      return ms ? createBadge(ms.name, 'badge-magic') : '';
    }).join('');
    pairs += '</div>';

    var tags = '<div class="card-tags">';
    tags += createBadge('Power: ' + bm.tags.power, 'badge-power');
    tags += createBadge('Grace: ' + bm.tags.grace, 'badge-grace');
    tags += createBadge('Control: ' + bm.tags.control, 'badge-control');
    tags += '</div>';

    var expandable = '<div class="card-expandable hidden">';
    expandable += '<h4>AI Prompt Keywords</h4>';
    expandable += '<div class="card-tags">' + bm.promptKeywords.map(function (k) { return createBadge(k, 'badge-keyword'); }).join('') + '</div>';
    expandable += '</div>';

    var card = createCard(bm, poses + details + pairs + tags + expandable);
    card.style.borderTopColor = '#00ff88';
    card.classList.add('card-expandable-trigger');
    card.addEventListener('click', function () {
      var exp = card.querySelector('.card-expandable');
      if (exp) exp.classList.toggle('hidden');
    });
    grid.appendChild(card);
  });
}

function renderBodyMagicConnections() {
  var container = document.getElementById('body-magic-connections');
  if (!container) return;

  var html = '<div class="connections-grid">';
  FANTASTICAL_DATA.bodyMovements.forEach(function (bm) {
    html += '<div class="connection-row">';
    html += '<span class="connection-source">' + bm.name + '</span>';
    html += '<span class="connection-arrow">&rarr;</span>';
    html += '<span class="connection-targets">';
    bm.pairedMagicSystems.forEach(function (id) {
      var ms = FANTASTICAL_DATA.magicSystems.find(function (m) { return m.id === id; });
      if (ms) html += '<span class="connection-target" style="border-color:' + ms.colors.primary + '">' + ms.name + '</span>';
    });
    html += '</span></div>';
  });
  html += '</div>';
  container.innerHTML = html;
}

// ===== CREATURES =====
function setupCreatureBuilder() {
  populateSelect('creature-shape', FANTASTICAL_DATA.creatureShapes, 'name');
  populateSelect('creature-material', FANTASTICAL_DATA.creatureMaterials, 'name');
  populateSelect('creature-behavior', FANTASTICAL_DATA.creatureBehaviors, 'name');

  var btn = document.getElementById('generate-creature');
  if (btn) {
    btn.addEventListener('click', generateCreatureProfile);
  }
}

function generateCreatureProfile() {
  var shapeId = document.getElementById('creature-shape')?.value;
  var materialId = document.getElementById('creature-material')?.value;
  var behaviorId = document.getElementById('creature-behavior')?.value;
  var output = document.getElementById('creature-profile');

  if (!output) return;
  if (!shapeId || !materialId || !behaviorId) {
    output.innerHTML = '<p class="placeholder-text">Please select a shape, material, and behavior.</p>';
    return;
  }

  var shape = FANTASTICAL_DATA.creatureShapes.find(function (s) { return s.id === shapeId; });
  var material = FANTASTICAL_DATA.creatureMaterials.find(function (m) { return m.id === materialId; });
  var behavior = FANTASTICAL_DATA.creatureBehaviors.find(function (b) { return b.id === behaviorId; });

  if (!shape || !material || !behavior) return;

  var creatureName = material.name.split('/')[0].trim() + ' ' + shape.name + ' ' + behavior.name.split('/')[0].trim();

  var html = '<div class="creature-card">';
  html += '<h3 class="creature-name">' + creatureName + '</h3>';

  html += '<div class="creature-stats">';
  html += '<div class="stat"><span class="stat-label">Threat</span><div class="stat-bar"><div class="stat-fill" style="width:' + (behavior.aggression * 10) + '%; background:#ff4444"></div></div></div>';
  html += '<div class="stat"><span class="stat-label">Intelligence</span><div class="stat-bar"><div class="stat-fill" style="width:' + (behavior.intelligence * 10) + '%; background:#00d4ff"></div></div></div>';
  html += '</div>';

  html += '<div class="creature-details">';
  html += '<p><strong>Form:</strong> ' + shape.silhouetteDescription + '</p>';
  html += '<p><strong>Movement:</strong> ' + shape.movementStyle + '</p>';
  html += '<p><strong>Material:</strong> ' + material.textureDescription + '</p>';
  html += '<p><strong>Light Interaction:</strong> ' + material.lightInteraction + '</p>';
  html += '<p><strong>Behavior:</strong> ' + behavior.description + '</p>';
  html += '<p><strong>Social:</strong> ' + behavior.socialStructure + '</p>';
  html += '</div>';

  html += '<div class="creature-sound">';
  html += '<h4>Sound Palette</h4>';
  html += '<p><strong>Material Sound:</strong> ' + material.soundSignature + '</p>';
  html += '<p><strong>Behavior Sound:</strong> ' + behavior.soundPatterns + '</p>';
  html += '</div>';

  html += '<div class="creature-prompt">';
  html += '<h4>AI Prompt</h4>';
  var promptParts = shape.promptKeywords.slice(0, 2)
    .concat(material.promptKeywords.slice(0, 2))
    .concat(behavior.promptKeywords.slice(0, 2));
  html += '<pre class="prompt-code">' + promptParts.join(', ') + ', dark fantasy concept art, cinematic lighting, highly detailed, 8K</pre>';
  html += '</div>';

  html += '</div>';
  output.innerHTML = html;
}

// ===== SOUND DESIGN =====
function renderSoundDesign() {
  var grid = document.getElementById('sound-grid');
  if (!grid) return;

  FANTASTICAL_DATA.soundElements.forEach(function (se) {
    var details = '<div class="card-details">';
    details += '<p>' + createBadge(se.category, 'badge-category') + ' ' + createBadge(se.layeringPosition, 'badge-layer') + '</p>';

    var orgPercent = 100 - se.organicVsSynthetic;
    details += '<div class="spectrum-bar"><div class="spectrum-organic" style="width:' + orgPercent + '%"></div><div class="spectrum-synthetic" style="width:' + se.organicVsSynthetic + '%"></div></div>';
    details += '<p class="spectrum-labels"><span>Organic</span><span>Synthetic</span></p>';

    details += '<p><strong>Frequency:</strong> ' + se.frequencyRange.low + 'Hz - ' + se.frequencyRange.high + 'Hz</p>';
    details += '<p><strong>Creation:</strong> ' + se.creationTechnique + '</p>';
    details += '<p><strong>Best For:</strong> ' + se.bestFor.join(', ') + '</p>';
    details += '</div>';

    var card = createCard(se, details);
    card.style.borderTopColor = '#ff8c00';
    grid.appendChild(card);
  });
}

function setupSoundLayerBuilder() {
  var bases = FANTASTICAL_DATA.soundElements.filter(function (s) { return s.layeringPosition === 'base'; });
  var textures = FANTASTICAL_DATA.soundElements.filter(function (s) { return s.layeringPosition === 'texture'; });
  var sweeteners = FANTASTICAL_DATA.soundElements.filter(function (s) { return s.layeringPosition === 'sweetener' || s.layeringPosition === 'accent'; });

  populateSelect('sound-base', bases, 'name');
  populateSelect('sound-texture', textures, 'name');
  populateSelect('sound-sweetener', sweeteners, 'name');

  ['sound-base', 'sound-texture', 'sound-sweetener'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('change', updateSoundLayerBuilder);
  });
}

function updateSoundLayerBuilder() {
  var output = document.getElementById('sound-layer-output');
  if (!output) return;

  var baseId = document.getElementById('sound-base')?.value;
  var textureId = document.getElementById('sound-texture')?.value;
  var sweetenerId = document.getElementById('sound-sweetener')?.value;

  if (!baseId && !textureId && !sweetenerId) {
    output.innerHTML = '<p class="placeholder-text">Select sound layers above to preview a combined sound design.</p>';
    return;
  }

  var base = FANTASTICAL_DATA.soundElements.find(function (s) { return s.id === baseId; });
  var texture = FANTASTICAL_DATA.soundElements.find(function (s) { return s.id === textureId; });
  var sweetener = FANTASTICAL_DATA.soundElements.find(function (s) { return s.id === sweetenerId; });

  var html = '<div class="configurator-result">';
  html += '<h4>Sound Design Stack</h4>';
  if (base) html += '<p><strong>Base Layer:</strong> ' + base.name + ' — ' + base.description + '</p>';
  if (texture) html += '<p><strong>Texture Layer:</strong> ' + texture.name + ' — ' + texture.description + '</p>';
  if (sweetener) html += '<p><strong>Sweetener:</strong> ' + sweetener.name + ' — ' + sweetener.description + '</p>';

  var allFreqs = [base, texture, sweetener].filter(Boolean);
  if (allFreqs.length > 0) {
    var low = Math.min.apply(null, allFreqs.map(function (s) { return s.frequencyRange.low; }));
    var high = Math.max.apply(null, allFreqs.map(function (s) { return s.frequencyRange.high; }));
    html += '<p><strong>Combined Frequency Range:</strong> ' + low + 'Hz - ' + high + 'Hz</p>';
  }

  html += '</div>';
  output.innerHTML = html;
}

// ===== COLOR GRADING =====
function renderColorGrading() {
  var grid = document.getElementById('color-grid');
  if (!grid) return;

  FANTASTICAL_DATA.colorPalettes.forEach(function (cp) {
    var swatches = '<div class="color-swatches color-swatches-large">';
    cp.colors.forEach(function (c) { swatches += createColorSwatch(c); });
    swatches += '</div>';

    var details = '<div class="card-details">';
    details += '<p><strong>Technique:</strong> ' + cp.technique + '</p>';
    details += '<p><strong>Mood:</strong> ' + cp.mood + '</p>';
    details += '<p><strong>Films:</strong> ' + cp.famousFilms.join(', ') + '</p>';
    details += '</div>';

    var card = createCard(cp, swatches + details);
    card.style.borderTopColor = cp.colors[0];
    grid.appendChild(card);
  });
}

// ===== RECIPE BUILDER SELECTS =====
function populateRecipeSelects() {
  populateSelect('slot-magic', FANTASTICAL_DATA.magicSystems, 'name');
  populateSelect('slot-camera', FANTASTICAL_DATA.cameraMovements, 'name');
  populateSelect('slot-lens', FANTASTICAL_DATA.lenses, 'name');
  populateSelect('slot-lighting', FANTASTICAL_DATA.lightingPatterns, 'name');
  populateSelect('slot-body', FANTASTICAL_DATA.bodyMovements, 'name');
  populateSelect('slot-creature', FANTASTICAL_DATA.creatureShapes, 'name');
}
