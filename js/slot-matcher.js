class SlotMatcher {
  constructor(data) {
    this.data = data;
    this.rules = data.combinationRules;
  }

  getItemById(category, id) {
    if (!id || !this.data[category]) return null;
    return this.data[category].find(item => item.id === id) || null;
  }

  collectTags(item) {
    if (!item || !item.tags) return [];
    const tags = [];
    for (const [key, value] of Object.entries(item.tags)) {
      if (Array.isArray(value)) {
        value.forEach(v => tags.push(key + ':' + v));
      } else {
        tags.push(key + ':' + value);
      }
    }
    return tags;
  }

  resolveSelections(selections) {
    return {
      magic: this.getItemById('magicSystems', selections.magic),
      camera: this.getItemById('cameraMovements', selections.camera),
      lens: this.getItemById('lenses', selections.lens),
      lighting: this.getItemById('lightingPatterns', selections.lighting),
      body: this.getItemById('bodyMovements', selections.body),
      creature: selections.creature ? {
        shape: this.getItemById('creatureShapes', selections.creatureShape),
        material: this.getItemById('creatureMaterials', selections.creatureMaterial),
        behavior: this.getItemById('creatureBehaviors', selections.creatureBehavior)
      } : null
    };
  }

  generateRecipe(selections) {
    const items = [];
    const itemIds = [];

    const mappings = [
      { key: 'magic', category: 'magicSystems' },
      { key: 'camera', category: 'cameraMovements' },
      { key: 'lens', category: 'lenses' },
      { key: 'lighting', category: 'lightingPatterns' },
      { key: 'body', category: 'bodyMovements' },
      { key: 'creature', category: 'creatureShapes' }
    ];

    for (const m of mappings) {
      const id = selections[m.key];
      if (id) {
        const item = this.getItemById(m.category, id);
        if (item) {
          items.push(item);
          itemIds.push(id);
        }
      }
    }

    if (items.length < 3) {
      return { error: 'Please select at least Magic System, Camera Movement, and Lighting Pattern.' };
    }

    const synergy = this.calculateSynergy(itemIds);
    const conflicts = this.findConflicts(itemIds);
    const mood = this.determineMood(items);
    const description = this.generateDescription(selections, items, mood);
    const promptSnippet = this.generatePrompt(selections, items);
    const soundSuggestion = this.suggestSound(selections, items);
    const colorSuggestion = this.suggestColorGrade(selections, items);

    return {
      moodLabel: mood.label,
      moodDescription: mood.description,
      synergyScore: synergy.score,
      synergyDetails: synergy.details,
      synergies: synergy.synergies,
      conflicts: conflicts,
      description: description,
      promptSnippet: promptSnippet,
      soundSuggestion: soundSuggestion,
      colorSuggestion: colorSuggestion
    };
  }

  calculateSynergy(selectedIds) {
    let score = 50;
    const foundSynergies = [];

    for (const rule of this.rules.synergies) {
      const match = rule.elements.every(el => selectedIds.includes(el));
      if (match) {
        score += rule.synergyScore * 2;
        foundSynergies.push(rule);
      }
    }

    let tagOverlap = 0;
    const allTags = [];
    for (const id of selectedIds) {
      for (const category of Object.keys(this.data)) {
        if (!Array.isArray(this.data[category])) continue;
        const item = this.data[category].find(i => i.id === id);
        if (item) {
          allTags.push(...this.collectTags(item));
          break;
        }
      }
    }

    const tagCounts = {};
    for (const tag of allTags) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      if (tagCounts[tag] > 1) tagOverlap++;
    }
    score += tagOverlap * 3;

    score = Math.min(100, Math.max(0, score));

    const details = foundSynergies.length > 0
      ? foundSynergies.map(s => s.description).join('. ')
      : 'No specific synergy rules matched, but the combination has creative potential.';

    return { score, synergies: foundSynergies, details };
  }

  findConflicts(selectedIds) {
    const found = [];
    for (const rule of this.rules.conflicts) {
      const match = rule.elements.every(el => selectedIds.includes(el));
      if (match) {
        found.push({
          elements: rule.elements,
          severity: rule.severity,
          description: rule.description,
          suggestion: rule.suggestion || ''
        });
      }
    }
    return found;
  }

  determineMood(items) {
    const allTags = [];
    for (const item of items) {
      allTags.push(...this.collectTags(item));
    }

    const tagSet = new Set(allTags);
    let bestMood = null;
    let bestScore = -1;

    for (const [moodName, moodDef] of Object.entries(this.rules.moodOutputs)) {
      let matchCount = 0;
      for (const reqTag of moodDef.requiredTags) {
        const [key, value] = reqTag.split(':');
        for (const tag of tagSet) {
          const [tKey, tValue] = tag.split(':');
          if (tKey === key && tValue === value) matchCount++;
          if (tKey === value || tValue === value) matchCount += 0.5;
        }
      }
      if (matchCount > bestScore) {
        bestScore = matchCount;
        bestMood = { label: moodName, description: moodDef.description };
      }
    }

    if (!bestMood || bestScore < 1) {
      const moodWords = allTags
        .filter(t => t.startsWith('mood:'))
        .map(t => t.split(':')[1]);
      const label = moodWords.length > 0 ? moodWords[0] : 'unique';
      bestMood = {
        label: label,
        description: 'A unique combination that defies easy categorization — let the creative tension drive discovery.'
      };
    }

    bestMood.label = bestMood.label.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return bestMood;
  }

  generateDescription(selections, items, mood) {
    const magic = this.getItemById('magicSystems', selections.magic);
    const camera = this.getItemById('cameraMovements', selections.camera);
    const lens = this.getItemById('lenses', selections.lens);
    const lighting = this.getItemById('lightingPatterns', selections.lighting);
    const body = this.getItemById('bodyMovements', selections.body);
    const creature = this.getItemById('creatureShapes', selections.creature);

    let desc = 'Picture this: ';

    if (camera) {
      desc += `A ${camera.name.toLowerCase()} ${lens ? 'through a ' + lens.name.toLowerCase() + ' lens ' : ''}captures the scene`;
    }

    if (body && magic) {
      desc += ` as a figure performs ${body.name.toLowerCase()} gestures, channeling ${magic.name.toLowerCase()} energy. `;
    } else if (magic) {
      desc += ` as ${magic.name.toLowerCase()} energy crackles through the air. `;
    } else {
      desc += '. ';
    }

    if (lighting) {
      desc += `${lighting.name} lighting sculpts the scene with a mood of ${lighting.mood.toLowerCase()}. `;
    }

    if (magic && magic.visuals) {
      desc += `${magic.visuals.particleType} swirl in ${magic.visuals.movementPattern.toLowerCase()} patterns, `;
      desc += `their ${magic.visuals.edgeQuality.toLowerCase()} edges ${magic.visuals.glowStyle.toLowerCase()}. `;
    }

    if (creature) {
      desc += `In the distance, a ${creature.name.toLowerCase()} creature stirs — its ${creature.movementStyle.toLowerCase()} motion commanding attention. `;
    }

    desc += `The overall feeling is ${mood.label.toLowerCase()} — ${mood.description.split('—')[0].trim().toLowerCase()}.`;

    return desc;
  }

  generatePrompt(selections, items) {
    const keywords = [];

    for (const item of items) {
      if (item.promptKeywords) {
        keywords.push(...item.promptKeywords.slice(0, 3));
      }
    }

    const magic = this.getItemById('magicSystems', selections.magic);
    const camera = this.getItemById('cameraMovements', selections.camera);
    const lens = this.getItemById('lenses', selections.lens);
    const lighting = this.getItemById('lightingPatterns', selections.lighting);
    const body = this.getItemById('bodyMovements', selections.body);

    let prompt = '';
    if (body) prompt += body.name + ' casting pose, ';
    if (magic) prompt += magic.name + ' magic energy, ';
    if (camera) prompt += camera.name + ' camera movement, ';
    if (lens) prompt += lens.name + ' lens, ';
    if (lighting) prompt += lighting.name + ' lighting, ';

    prompt += 'cinematic, fantasy film still, 8K, photorealistic, ';
    prompt += keywords.slice(0, 8).join(', ');

    return prompt;
  }

  suggestSound(selections, items) {
    const magic = this.getItemById('magicSystems', selections.magic);
    if (!magic) return { description: 'Select a magic system for sound suggestions.' };

    const soundElements = this.data.soundElements;
    const base = soundElements.find(s => s.layeringPosition === 'base') || soundElements[3];
    const texture = soundElements.find(s => s.layeringPosition === 'texture') || soundElements[2];
    const sweetener = soundElements.find(s => s.layeringPosition === 'sweetener') || soundElements[0];

    let suggestedBase = base;
    let suggestedTexture = texture;
    let suggestedSweetener = sweetener;

    if (magic.sound && magic.sound.organic) {
      suggestedBase = soundElements.find(s => s.id === 'nature_element') || base;
      suggestedTexture = soundElements.find(s => s.id === 'choir_ethereal') || texture;
      suggestedSweetener = soundElements.find(s => s.id === 'chime_bell') || sweetener;
    } else {
      suggestedBase = soundElements.find(s => s.id === 'drone_sustain') || base;
      suggestedTexture = soundElements.find(s => s.id === 'crackle_spark') || texture;
      suggestedSweetener = soundElements.find(s => s.id === 'glitch_digital') || sweetener;
    }

    if (magic.id === 'dark_forbidden') {
      suggestedBase = soundElements.find(s => s.id === 'rumble_sub') || base;
      suggestedTexture = soundElements.find(s => s.id === 'whisper_breath') || texture;
      suggestedSweetener = soundElements.find(s => s.id === 'impact_hit') || sweetener;
    } else if (magic.id === 'celestial_divine') {
      suggestedBase = soundElements.find(s => s.id === 'drone_sustain') || base;
      suggestedTexture = soundElements.find(s => s.id === 'choir_ethereal') || texture;
      suggestedSweetener = soundElements.find(s => s.id === 'chime_bell') || sweetener;
    } else if (magic.id === 'robotic_cybernetic') {
      suggestedBase = soundElements.find(s => s.id === 'drone_sustain') || base;
      suggestedTexture = soundElements.find(s => s.id === 'crackle_spark') || texture;
      suggestedSweetener = soundElements.find(s => s.id === 'glitch_digital') || sweetener;
    }

    return {
      base: suggestedBase.name,
      texture: suggestedTexture.name,
      sweetener: suggestedSweetener.name,
      description: `Layer ${suggestedBase.name} as foundation, add ${suggestedTexture.name} for character, and top with ${suggestedSweetener.name} for magical accent. ${magic.sound.description}`
    };
  }

  suggestColorGrade(selections, items) {
    const magic = this.getItemById('magicSystems', selections.magic);
    if (!magic) return { palette: null, description: 'Select a magic system for color suggestions.' };

    const palettes = this.data.colorPalettes;
    let suggested = palettes.find(p => p.magicSystemMatch === magic.id);
    if (!suggested) suggested = palettes[0];

    return {
      palette: suggested,
      description: `${suggested.name} — ${suggested.description} Technique: ${suggested.technique}`
    };
  }
}

function initRecipeBuilder() {
  if (typeof FANTASTICAL_DATA === 'undefined') return;

  const matcher = new SlotMatcher(FANTASTICAL_DATA);

  const btn = document.getElementById('generate-recipe');
  if (!btn) return;

  btn.addEventListener('click', function () {
    const selections = {
      magic: document.getElementById('slot-magic')?.value || '',
      camera: document.getElementById('slot-camera')?.value || '',
      lens: document.getElementById('slot-lens')?.value || '',
      lighting: document.getElementById('slot-lighting')?.value || '',
      body: document.getElementById('slot-body')?.value || '',
      creature: document.getElementById('slot-creature')?.value || ''
    };

    if (!selections.magic && !selections.camera && !selections.lighting) {
      showRecipeError('Please select at least a Magic System, Camera Movement, and Lighting Pattern.');
      return;
    }

    const recipe = matcher.generateRecipe(selections);

    if (recipe.error) {
      showRecipeError(recipe.error);
      return;
    }

    renderRecipeOutput(recipe, matcher);
  });
}

function showRecipeError(message) {
  const output = document.getElementById('recipe-output');
  if (!output) return;
  output.classList.remove('hidden');
  output.innerHTML = '<div class="recipe-error"><p>' + message + '</p></div>';
}

function renderRecipeOutput(recipe, matcher) {
  const output = document.getElementById('recipe-output');
  if (!output) return;

  output.classList.remove('hidden');

  const moodLabel = document.getElementById('recipe-mood-label');
  const synergyScore = document.getElementById('recipe-synergy-score');
  const description = document.getElementById('recipe-description');
  const conflicts = document.getElementById('recipe-conflicts');
  const prompt = document.getElementById('recipe-prompt');
  const sound = document.getElementById('recipe-sound');
  const colorGrade = document.getElementById('recipe-color-grade');

  if (moodLabel) {
    moodLabel.textContent = recipe.moodLabel;
    moodLabel.className = 'recipe-mood-label';
  }

  if (synergyScore) {
    const scoreClass = recipe.synergyScore >= 70 ? 'high' : recipe.synergyScore >= 40 ? 'medium' : 'low';
    synergyScore.innerHTML =
      '<div class="synergy-bar"><div class="synergy-fill synergy-' + scoreClass + '" style="width:' + recipe.synergyScore + '%"></div></div>' +
      '<span class="synergy-label">' + recipe.synergyScore + '% Synergy</span>';
    if (recipe.synergyDetails) {
      synergyScore.innerHTML += '<p class="synergy-details">' + recipe.synergyDetails + '</p>';
    }
  }

  if (description) {
    description.innerHTML = '<p>' + recipe.description + '</p>';
  }

  if (conflicts) {
    if (recipe.conflicts.length > 0) {
      let html = '<h4>Conflicts & Creative Solutions</h4>';
      recipe.conflicts.forEach(function (c) {
        const severityClass = c.severity === 'strong' ? 'conflict-strong' : c.severity === 'moderate' ? 'conflict-moderate' : 'conflict-mild';
        html += '<div class="conflict-item ' + severityClass + '">';
        html += '<span class="conflict-severity">' + c.severity.toUpperCase() + '</span> ';
        html += '<span>' + c.description + '</span>';
        if (c.suggestion) {
          html += '<p class="conflict-suggestion">' + c.suggestion + '</p>';
        }
        html += '</div>';
      });
      conflicts.innerHTML = html;
    } else {
      conflicts.innerHTML = '<p class="no-conflicts">No conflicts detected — this combination flows naturally.</p>';
    }
  }

  if (prompt) {
    prompt.innerHTML = '<pre class="prompt-code">' + recipe.promptSnippet + '</pre>' +
      '<button class="btn btn-secondary copy-btn" onclick="navigator.clipboard.writeText(this.previousElementSibling.textContent).then(function(){alert(\'Copied!\')})">Copy Prompt</button>';
  }

  if (sound) {
    const s = recipe.soundSuggestion;
    sound.innerHTML = '<p><strong>Base:</strong> ' + (s.base || 'N/A') + '</p>' +
      '<p><strong>Texture:</strong> ' + (s.texture || 'N/A') + '</p>' +
      '<p><strong>Sweetener:</strong> ' + (s.sweetener || 'N/A') + '</p>' +
      '<p>' + s.description + '</p>';
  }

  if (colorGrade) {
    const cg = recipe.colorSuggestion;
    if (cg.palette) {
      let swatches = '<div class="color-swatches">';
      cg.palette.colors.forEach(function (c) {
        swatches += '<span class="color-swatch" style="background:' + c + '" title="' + c + '"></span>';
      });
      swatches += '</div>';
      colorGrade.innerHTML = '<p><strong>' + cg.palette.name + '</strong></p>' + swatches + '<p>' + cg.description + '</p>';
    } else {
      colorGrade.innerHTML = '<p>' + cg.description + '</p>';
    }
  }
}
