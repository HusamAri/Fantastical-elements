#!/usr/bin/env python3
"""Deterministic FORP validators — run these BEFORE any LLM judge pass.

Zero-context checks pulled out of the QA loops so they cost no tokens and never drift:

  prompt-scan <file> [--video]   banned abstract adjectives + prompt-dependence phrases;
                                 --video adds the motion-only law scan (appearance words).
                                 For shotlists, extract video prompts first (see below) — a
                                 whole-file --video scan false-positives on image prompts.
  extract-video-prompts <shotlist> [out]  pull the fenced blocks under "Video prompt:" headings
                                 into one file (default: <shotlist>.videoprompts.txt) for a
                                 clean --video scan
  registry-check [registry.md]   every id in the asset registry matches UUID 8-4-4-4-12
  resolve <file> [registry.md]   every <<<uuid>>> placeholder in <file> exists in the registry
  duration-check <shotlist>      per shot block: tracks the last "Model:" line and checks each
                                 "Gen duration" line against that model's verified range
                                 (Kling 3-15s, Seedance 4-15s, mini 4-15s)

Exit code 0 = clean, 1 = findings (printed one per line as `FINDING: ...`).
"""
import re
import sys
import pathlib

HERE = pathlib.Path(__file__).resolve().parent
DEFAULT_REGISTRY = HERE.parent / "reference" / "asset-registry.md"

UUID_RE = re.compile(r"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")
ID_IN_TABLE_RE = re.compile(r"`([0-9a-fA-F-]{30,42})`")
PLACEHOLDER_RE = re.compile(r"<<<([^>]+)>>>")

BANNED_ADJECTIVES = [
    "cinematic", "epic", "beautiful", "dramatic", "stunning", "amazing",
    "masterpiece", "award-winning", "breathtaking", "gorgeous", "ethereal",
]
DEPENDENCE_PHRASES = [
    "same as before", "as before", "previous shot", "previous scene", "continues from",
    "she continues", "he continues", "still wearing", "as established", "like last time",
    "same lighting as", "same outfit as",
]
# Motion-only law: words that describe appearance/wardrobe/palette and must not
# appear in VIDEO prompts (identity lives in start_image/references).
APPEARANCE_WORDS = [
    "wearing", "outfit", "wardrobe", "dressed", "coat", "jacket", "shirt", "dress",
    "gown", "necklace", "pendant", "hair", "hairstyle", "stubble", "beard", "makeup",
    "skin", "freckle", "eye color", "eyes are", "face is", "handsome", "palette",
    "hex", "#", "color grading",
]
MODEL_DURATION = {"kling3_0": (3, 15), "seedance_2_0": (4, 15), "seedance_2_0_mini": (4, 15)}

findings = []


def find(msg):
    findings.append(msg)


def read(path):
    return pathlib.Path(path).read_text(encoding="utf-8")


def scan_terms(text, terms, label, path):
    low = text.lower()
    for t in terms:
        for m in re.finditer(re.escape(t.lower()), low):
            line_no = low.count("\n", 0, m.start()) + 1
            find(f"{path}:{line_no}: {label}: '{t}'")


def cmd_prompt_scan(args):
    path = args[0]
    text = read(path)
    scan_terms(text, BANNED_ADJECTIVES, "banned adjective", path)
    scan_terms(text, DEPENDENCE_PHRASES, "prompt-dependence phrase", path)
    if "--video" in args:
        scan_terms(text, APPEARANCE_WORDS, "appearance word in video prompt (motion-only law)", path)


def cmd_registry_check(args):
    reg = args[0] if args else str(DEFAULT_REGISTRY)
    for i, line in enumerate(read(reg).splitlines(), 1):
        for raw in ID_IN_TABLE_RE.findall(line):
            if not UUID_RE.match(raw):
                find(f"{reg}:{i}: malformed UUID (must be 8-4-4-4-12 hex): {raw}")


def registry_ids(reg):
    return {m for m in ID_IN_TABLE_RE.findall(read(reg)) if UUID_RE.match(m)}


def cmd_resolve(args):
    path = args[0]
    reg = args[1] if len(args) > 1 else str(DEFAULT_REGISTRY)
    known = registry_ids(reg)
    for i, line in enumerate(read(path).splitlines(), 1):
        for ph in PLACEHOLDER_RE.findall(line):
            ph = ph.strip()
            if not UUID_RE.match(ph):
                find(f"{path}:{i}: placeholder is not a valid UUID: <<<{ph}>>>")
            elif ph not in known:
                find(f"{path}:{i}: placeholder not in asset registry: <<<{ph}>>>")


def cmd_duration_check(args):
    """Stateful per-shot-block parse: remembers the last seen video model, checks each
    Gen duration line against it. Works on the key-value block layout defined in
    shotlist-standard.md (Serialization section)."""
    path = args[0]
    model_re = re.compile(r"(kling3_0|seedance_2_0_mini|seedance_2_0)", re.I)
    model_line_re = re.compile(r"^\s*\|?\s*Model(?: \+ mode)?\s*:", re.I)
    dur_re = re.compile(r"gen duration[^0-9]*([0-9]+(?:\.[0-9]+)?)", re.I)
    shot_re = re.compile(r"^#+\s|^Shot ID\s*:", re.I)
    current, seen_dur = None, False
    for i, line in enumerate(read(path).splitlines(), 1):
        if shot_re.search(line):
            current, seen_dur = None, False
        if model_line_re.search(line) or (model_re.search(line) and "model" in line.lower()):
            mm = model_re.search(line)
            if mm:
                current = mm.group(1).lower()
        dm = dur_re.search(line)
        if dm:
            seen_dur = True
            dur = float(dm.group(1))
            if current is None:
                find(f"{path}:{i}: Gen duration {dur}s has no preceding Model: line in this shot block")
            else:
                lo, hi = MODEL_DURATION[current]
                if not (lo <= dur <= hi):
                    find(f"{path}:{i}: Gen duration {dur}s outside {current} range {lo}-{hi}s")
    if not seen_dur:
        find(f"{path}: no 'Gen duration' lines found — file does not follow the shotlist block layout (see shotlist-standard.md Serialization)")


def cmd_extract_video_prompts(args):
    """Extract fenced blocks that follow a 'Video prompt' heading/label into one file."""
    path = args[0]
    out = args[1] if len(args) > 1 else path + ".videoprompts.txt"
    lines = read(path).splitlines()
    chunks, i, n = [], 0, len(lines)
    while i < n:
        if re.search(r"video prompt", lines[i], re.I):
            j = i + 1
            while j < n and not lines[j].strip().startswith("```"):
                if re.search(r"image prompt|^#|^\|", lines[j], re.I) and lines[j].strip():
                    break
                j += 1
            if j < n and lines[j].strip().startswith("```"):
                k = j + 1
                block = []
                while k < n and not lines[k].strip().startswith("```"):
                    block.append(lines[k]); k += 1
                chunks.append("\n".join(block))
                i = k
        i += 1
    pathlib.Path(out).write_text("\n\n---\n\n".join(chunks), encoding="utf-8")
    print(f"extracted {len(chunks)} video prompt(s) -> {out}")
    if not chunks:
        find(f"{path}: no fenced blocks under 'Video prompt' headings found — check the shotlist serialization layout")


COMMANDS = {
    "prompt-scan": cmd_prompt_scan,
    "extract-video-prompts": cmd_extract_video_prompts,
    "registry-check": cmd_registry_check,
    "resolve": cmd_resolve,
    "duration-check": cmd_duration_check,
}


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in COMMANDS:
        print(__doc__)
        return 2
    COMMANDS[sys.argv[1]](sys.argv[2:])
    for f in findings:
        print(f"FINDING: {f}")
    if findings:
        print(f"{len(findings)} finding(s).")
        return 1
    print("clean")
    return 0


if __name__ == "__main__":
    sys.exit(main())
