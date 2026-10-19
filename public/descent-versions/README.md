# *Quodlibet · The Descent* — version-controlled release set

An interactive HTML essay on mathematical logic (the semantic companion to *The Ascent*), 
delivered across five iterations. This repository preserves every version under strict 
semantic-versioned release control, with a full git history (one tagged commit per release).

## Manifest

| Version | Date | File | Lines | Bytes | SHA-256 (first 16) | Summary |
|---|---|---|---:|---:|---|---|
| **1.0.0** | 2026-06-18 | `releases/quodlibet-the-descent-v1.0.0.html` | 417 | 44,594 | `bbb8aef09d2c835c` | baseline — original three-movement essay |
| **1.1.0** | 2026-06-19 | `releases/quodlibet-the-descent-v1.1.0.html` | 590 | 64,052 | `cb64893ea04eb770` | structural expansion — fourth movement, Tennenbaum, grounding ladder |
| **2.0.0** | 2026-06-19 | `releases/quodlibet-the-descent-v2.0.0.html` | 641 | 80,102 | `7f05af5de5599fee` | rigor pillars — two-mechanism account, Galois duality, Lawvere audit, CH-fix |
| **2.1.0** | 2026-06-19 | `releases/quodlibet-the-descent-v2.1.0.html` | 652 | 85,981 | `895f748c36ab1939` | theorem floors — Löb-as-Lawvere, Lindström, §I mechanism, Putnam dialectic |
| **3.0.0** | 2026-06-19 | `releases/quodlibet-the-descent-v3.0.0.html` | 659 | 89,153 | `71a3d76ffd4e9de8` | absoluteness refinement — Shoenfield, floor taxonomy |

Full SHA-256 digests are listed in `SHA256SUMS`.

## Versioning policy

Versions follow **Semantic Versioning 2.0.0**, adapted for a prose/code artifact:

- **MAJOR** — a correction to one of the document's *central claims* (something a reader of the
  prior version would have relied on). `2.0.0` corrected the "Ascent and Descent are one
  construction" thesis; `3.0.0` corrected the "ℕ-seam = V-seam, one seam" framing.
- **MINOR** — *additive* deepening that does not overturn a central claim (`1.1.0` added the
  fourth movement; `2.1.0` added the Löb/Lindström theorem-floors and the §I mechanism).
- **PATCH** — fixes/polish with no claim or content change. *No patch-only release occurred;*
  the `.z` field is `0` throughout.

The numbering maps one-to-one onto the five development iterations.

## Git

```
git -C quodlibet-descent log --oneline --decorate   # the five releases
git -C quodlibet-descent tag -n1                     # annotated tags v1.0.0 … v3.0.0
git -C quodlibet-descent diff v2.0.0 v2.1.0          # what each round changed
git -C quodlibet-descent checkout v1.1.0             # inspect any release
```

The canonical working file at each commit is `quodlibet-the-descent.html`; the immutable
snapshots live in `releases/` under their semver filenames.

## Provenance & verification

`v1.0.0` is the original as received; `v3.0.0` is the final working file. The intermediate
snapshots (`1.1.0`, `2.0.0`, `2.1.0`) were reconstructed deterministically by reverse-applying
the recorded edit history, each reversal guarded by an exact-match assertion. Every version was
then verified independently:

- **HTML** — balanced `<div>` counts, no unclosed or mis-nested tags, single `<!DOCTYPE>`.
- **JavaScript** — `node --check` passes on the embedded script.
- **Feature isolation** — a 21-feature matrix confirms each feature appears at exactly the
  version that introduced it and never bleeds across a boundary.

## Filenaming convention

`quodlibet-the-descent-v<MAJOR>.<MINOR>.<PATCH>.html` — lowercase, hyphen-delimited, semver
suffix, no spaces or dates in the filename (dates live in git and the changelog).
