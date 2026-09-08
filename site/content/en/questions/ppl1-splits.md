---
title: "Split-GAL4 lines targeting PPL1"
slug: "ppl1-splits"
description: "How many split-GAL4 combinations does VFB hold for the PPL1 dopaminergic neurons, and which subtypes actually have coverage?"
weight: 30
date: 2026-09-08
---

**Asked at the VFB table, NeuroFly 2026 (Cologne), 8 September 2026.**

## The question

> "Splits targeting PPL1?"

Terse, but a very typical table question: someone working on the dopaminergic PPL1 cluster wanted to know what split-GAL4 tools exist to target it.

## How we answered it

1. `search_terms` for "PPL1" — resolves to the class **dopaminergic PPL1 neuron** (`FBbt:00100219`, symbol PPL1).
2. `get_term_info` + `run_query` (`SplitsTargeting`) on that class directly — this only found **one** split-GAL4 combination annotated at the whole-cluster level, which seemed too low given how well-studied PPL1 is.
3. `run_query` (`SubclassesOf`) on the same class — PPL1 has **18** named subtypes (the six individually numbered PPL101–PPL106, several SMP/dFB/MB-AMP/DP/MB-SV neurons, and the fan-shaped-body-projecting FB5H/FB6H/FB7B).
4. `run_query` (`SplitsTargeting`), batched across all 18 subtype IDs — this is where almost all of VFB's split coverage actually lives.
5. For the four subtypes with zero splits, `run_query` (`TransgeneExpressionHere`) to check for non-split (single-transgene) driver lines instead, then `run_query` (`FindStocks`) on any transgene IDs found, to get orderable stock numbers.

## What we found

Querying the whole class only surfaces splits explicitly annotated at that level — it does **not** aggregate splits recorded against its subtypes. That one whole-cluster result was `P{ple-GAL4.DBD.TH-C} ∩ P{DAT-B-p65.AD}`.

Splitting the query out by subtype tells a very different story:

| PPL1 subtype | FBbt ID | Splits (VFB) |
|---|---|---|
| PPL101 | FBbt:00100243 | 33 |
| PPL105 | FBbt:00100236 | 31 |
| PPL106 | FBbt:00110320 | 30 |
| PPL103 | FBbt:00100241 | 28 |
| dFB neuron | FBbt:00110322 | 27 |
| PPL104 | FBbt:00110321 | 26 |
| SMP neuron | FBbt:00048269 | 15 |
| SMP-gamma neuron | FBbt:00048251 | 14 |
| SMP-PED neuron | FBbt:00048250 | 13 |
| bSMP-gamma neuron | FBbt:00048252 | 13 |
| MB-AMP neuron | FBbt:00110324 | 10 |
| FB5H / FB6H / FB7B | FBbt:00051241 / 00051242 / 00051243 | 1 (same combination, shared by all three) |
| PPL102 | FBbt:00111025 | 0 |
| mushroom body PPL1 neuron (umbrella grouping) | FBbt:00049840 | 0 |
| DP neuron | FBbt:00110319 | 0 |
| MB-SV neuron | FBbt:00110323 | 0 |

Two of the zero-split subtypes (PPL102 and DP neuron) have no driver-line data of any kind in VFB — not even a single-transgene line, split or otherwise. For the other two, `TransgeneExpressionHere` did turn up single-transgene (non-split) lines, though with a caveat worth stating plainly: VFB's own `expressed_in` annotation on those records points to *other*, more specific PPL1 subtypes rather than to MB-SV or the umbrella "mushroom body PPL1 neuron" grouping itself. Three of those single-transgene lines have orderable Bloomington stocks:

| Driver | VFB-annotated target | Stock |
|---|---|---|
| GMR25D01-lexA | PPL103 | [FBst0053519](https://flybase.org/reports/FBst0053519) / [FBst0094684](https://flybase.org/reports/FBst0094684) |
| GMR30E11-lexA | PPL101 | [FBst0054209](https://flybase.org/reports/FBst0054209) |
| GMR50B03-GAL4 | PPL105 | [FBst0038727](https://flybase.org/reports/FBst0038727) |

**Worth being honest about:** the high per-subtype counts (26–33) are not that many *distinct* tools — they're mostly recombinations of a small, shared pool of hemidriver lines (`DAT-B`, `ple-GAL4.DBD` TH-C/D/F, `R55C10`, `R60F07`, `R76F01`, `R76F02`, `R76F05`, `R61H03`…) paired against each other, and a single split-GAL4 line commonly labels several PPL1 subtypes at once — so the per-row counts overlap heavily and don't sum to a meaningful class-wide total. "SplitsTargeting" also only records an expression-pattern-to-class annotation, not whether a split is clean or specific to that one subtype.

## Sources

- [FBbt:00100219 — dopaminergic PPL1 neuron (PPL1)](https://virtualflybrain.org/reports/FBbt_00100219)
- Xie et al., 2018, *Cell Rep.* 23(2):652–665; Aso et al., 2014, *eLife* 3:e04577/e04580; Aso and Rubin, 2016, *eLife* 5:e16135
