#!/usr/bin/env python3
"""Deterministic FORP validators — run these BEFORE any LLM judge pass.

Zero-context checks pulled out of the QA loops so they cost no tokens and never drift:

  prompt-scan <file> [--video]   banned abstract adjectives + prompt-dependence phrases;
                                 --video adds the motion-only law scan (appearance words)
  registry-check [registry.md]   every id in the asset registry matches UUID 8-4-4-4-12
  resolve <file> [registry.md]   every <<<uuid>>> placeholder in <file> exists in the registry
  duration-check <file>          every "| kling3_0 ..." / "| seedance_2_0 ..." row's Gen duration
                                 is inside the model's verified range (Kling 3-15s, Seedance 4-15s,
                                 Seedance mini 4-15s)

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
    path = args[0]
    text = read(path)
    row_re = re.compile(r"(kling3_0|seedance_2_0_mini|seedance_2_0)[^|\n]*", re.I)
    dur_re = re.compile(r"gen duration[^0-9]*([0-9]+(?:\.[0-9]+)?)", re.I)
    for i, line in enumerate(text.splitlines(), 1):
        mm = row_re.search(line)
        dm = dur_re.search(line)
        if mm and dm:
            model = mm.group(1).lower()
            dur = float(dm.group(1))
            lo, hi = MODEL_DURATION[model]
            if not (lo <= dur <= hi):
                find(f"{path}:{i}: Gen duration {dur}s outside {model} range {lo}-{hi}s")


COMMANDS = {
    "prompt-scan": cmd_prompt_scan,
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
