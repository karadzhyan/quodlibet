# Changelog — *Quodlibet · The Descent*

All notable changes to this document are recorded here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning follows [Semantic Versioning 2.0.0](https://semver.org/), adapted for prose
(see *Versioning policy* in `README.md`).

---

## [3.0.0] — 2026-06-19 · "absoluteness refinement"

Corrects the document's central **"one seam"** framing with a theorem, and resolves the
equivocation latent in the word *floor*.

### Changed
- **Central framing corrected.** The claim that the ℕ-seam and the set-theoretic V-seam are
  "one seam" is qualified by **Shoenfield's absoluteness theorem**: every Σ¹₂ statement
  (hence every arithmetic one) is invariant across all forcing extensions, while CH is not.
  The arithmetic floor is therefore strictly firmer than the continuum floor.
- **Coda revised.** "No floor" → "no floor it can name … the thing unnamed does not fall,"
  reflecting the taxonomy below.

### Added
- Theorem box **"the floors are not the same depth — Shoenfield, 1961."**
- Closing **floor taxonomy** ("in which sense there is no floor"): *no definitional floor*
  (Löwenheim–Skolem + metatheoretic regress), but *a recursion-theoretic floor* (Tennenbaum)
  and *an absoluteness floor* (Shoenfield); the continuum lacks the third.
- Source: Shoenfield 1961.

## [2.1.0] — 2026-06-19 · "theorem floors"

Grounds each side of the Ascent/Descent correspondence in a *named theorem*, converting the
prior version's assertions into mechanisms.

### Added
- **Left floor** — *Löb's theorem is Lawvere's, worn by provability*: the provability operator
  on the Lindenbaum algebra makes the Ascent's reflection obstruction a genuine Lawvere fixed
  point (Gödel II as the case φ = ⊥).
- **Right floor** — *Lindström's theorem (1969)*: first-order logic is the maximal logic with
  compactness and downward Löwenheim–Skolem, so categoricity and the model-building powers are
  complementary *by theorem* — not by contingency.
- Three-theorem **synthesis** ("two floors, one suspension": Lawvere · Lindström · completeness).
- **§I categoricity mechanism**: the set of standard elements is the very subset second-order
  induction forces to exhaust the model — making "quantifies over all subsets" do visible work.
- Sources: Löb 1955, Lindström 1969, Lewis 1984, Bays 2001.

### Changed
- **Putnam deepened into a dialectic.** The fiat dismissal ("structurally empty") is replaced by
  Putnam's model-theoretic argument → the realist reply (Lewis, Bays: the metalanguage is not up
  for reinterpretation) → the honest residue (a determinacy one may hold but cannot derive).
- Putnam visual box and the §IV table-note updated to match.

## [2.0.0] — 2026-06-19 · "rigor pillars"

**Breaking (thesis correction).** The emotional thesis that *Ascent and Descent are one
construction (the diagonal)* is corrected: compactness / Löwenheim–Skolem is **expressive
weakness**, not a Lawvere fixed-point phenomenon. The single "engine" is replaced by a precise
account of two mechanisms bound by the completeness theorem.

### Changed
- Lede ¶3 rewritten around the **completeness-theorem equivalence**.
- §IV section-head, intro, and closing notes rewritten to *resist* the overclaim.
- Colophon and inter-section glyph corrected for honesty.

### Added
- Theorem **"undecided means divided"**: by soundness + completeness, `T ⊬ φ ∧ T ⊬ ¬φ` ⟺ models
  disagree on φ. Independence *is* model-disagreement.
- The **two-kinds-of-nonstandard-model** distinction: models that *disagree* with ℕ (from
  incompleteness) vs models of Th(ℕ) that *agree* yet are nonstandard (pure expressive weakness).
- **Th/Mod Galois-connection** theorem: incompleteness and non-categoricity are order-dual.
- **Precise Lawvere statement** + **honest instance-audit** table (Cantor / diagonal-lemma /
  reflection = Lawvere; compactness / L–S = not).
- Tennenbaum upgraded to the **standard-system / Scott-set** argument.
- Skolem upgraded: non-absoluteness of cardinality + forward link to forcing.
- **Generic multiverse / Ω-logic / Ultimate-L** deepening.
- CSS: `.lawcore`, `.audit`.

### Fixed
- **CH vs determinacy.** Removed the implication that CH refutes second-order categoricity — it
  does not; categoricity holds in any full model regardless of the continuum's size. What it
  presupposes is the *determinacy* of ℘(ℕ), which CH's independence leaves open.
- Sources: + Scott 1962, Steel 2014; Woodin annotated (Ω-logic · Ultimate-L).

## [1.1.0] — 2026-06-19 · "structural expansion"

Additive expansion from three movements to four.

### Added
- **Fourth movement §IV** — *the diagonal, turned downward*: the Ascent↔Descent correspondence
  table, Putnam's "just more theory," the V-seam (universe vs multiverse), the corpus tie-back,
  and the suspension capstone SVG.
- §II: bridge/trapdoor callout, **overspill** theorem, Tennenbaum callout, Skolem callout,
  semantic-Tarski callout.
- §III: **internal-categoricity** theorem (Väänänen–Wang 2015) and an **interactive
  grounding-regress ladder**.
- Footer colophon, precision notes, and principal-sources line.

### Changed
- Lede now closes "we descend in **four** movements."

### Fixed
- `<title>` corrected to *The Descent — why the ground recedes*.

## [1.0.0] — 2026-06-18 · "baseline"

- Original three-movement essay as received: §I The Intended Model, §II The Descent
  (interactive compactness machine + order-type SVG), §III The Ground Recedes. Shared Quodlibet
  design system; the semantic companion to *The Ascent*.

---

[3.0.0]: ./releases/quodlibet-the-descent-v3.0.0.html
[2.1.0]: ./releases/quodlibet-the-descent-v2.1.0.html
[2.0.0]: ./releases/quodlibet-the-descent-v2.0.0.html
[1.1.0]: ./releases/quodlibet-the-descent-v1.1.0.html
[1.0.0]: ./releases/quodlibet-the-descent-v1.0.0.html
