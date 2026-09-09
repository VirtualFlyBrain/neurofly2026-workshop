---
title: "Connections to Tm3"
slug: "tm3-connections"
description: "Tm3's strongest recorded inputs, and why the whole-class connectivity query is dominated by ontology umbrella terms"
weight: 40
date: 2026-09-08
---

**Asked at the VFB table, NeuroFly 2026 (Cologne), 8 September 2026.**

## The question

> "Connections to Tm3?"

Asked by someone working on the optic lobe who wanted to know what Tm3 is connected to.

## How we answered it

1. `search_terms` for "Tm3" — resolves to **transmedullary neuron Tm3** (`FBbt:00003791`), a narrow-field visual-projection neuron in the medulla, distinct from the other Tm subtypes whose names also begin with "Tm3" (Tm30, Tm31, Tm3Y and so on) that match the same search.
2. `get_term_info` on the class — its literature description already states it receives input from lamina monopolar neurons L1 and L5 and medulla intrinsic neuron Mi1, and outputs to T4.
3. `run_query` (`UpstreamClassConnectivity`) on the class, at a generous limit — 451 rows total, but most of the highest-ranked ones are ontology umbrella classes ("adult neuron", "CNS neuron", "interneuron") rather than real cell types, because VFB reports connectivity at every ancestor level of the class hierarchy, not just the most specific one.
4. Filtered the 451 rows down to actual named cell types, ranked by total synaptic weight.

## What we found

VFB's three strongest recorded inputs to Tm3 by weight are **lamina monopolar neuron L1** (weight 165,060), **medulla intrinsic neuron Mi1** (151,550), and **lamina monopolar neuron L5** (116,211) — which matches the literature description on file (Takemura et al., 2013) almost exactly, a reassuring cross-check between the free-text description and the underlying connectome annotation.

| Presynaptic partner | FBbt ID | Total weight | Instances connected |
|---|---|---|---|
| Lamina monopolar neuron L1 | FBbt:00003719 | 165,060 | 2,473 / 4,466 (55%) |
| Medulla intrinsic neuron Mi1 | FBbt:00003776 | 151,550 | 3,164 / 5,137 (62%) |
| Lamina monopolar neuron L5 | FBbt:00003725 | 116,211 | 2,465 / 4,278 (58%) |
| Tm3 → Tm3 (recurrent) | FBbt:00003791 | 56,117 | 3,494 / 5,664 (62%) |
| Distal medullary amacrine Dm1 | FBbt:00003768 | 33,435 | 140 / 226 (62%) |
| Medulla intrinsic neuron Mi13 | FBbt:00111283 | 21,486 | 1,383 / 2,446 (57%) |
| T3 neuron | FBbt:00003730 | 20,488 | 2,776 / 5,430 (51%) |
| Medulla tangential neuron Mt4 | FBbt:00003840 | 18,884 | 104 / 160 (65%) |
| Proximal medullary amacrine Pm3 | FBbt:00110066 | 18,846 | 112 / 181 (62%) |
| Proximal medullary amacrine Pm10 | FBbt:20007262 | 15,705 | 124 / 199 (62%) |

Everything past the top three (Dm1, Mi13, T3, Mt4, Pm3, Pm10, and further down T2a, Mi9, Mi4, Dm12) appears in VFB's connectome-derived connectivity annotations but not in the curated literature description of the class — treat it as attributed connectome evidence, not a reviewed circuit diagram.

**Worth being honest about:** this is VFB's aggregated per-class connectivity annotation, which doesn't cleanly separate which connectome dataset(s) each row is drawn from — the total instance counts suggest more than one dataset's Tm3 reconstructions may be pooled together rather than counted once. If you need a single-dataset answer (e.g. the optic lobe connectome only, or male CNS only), that needs a follow-up query rather than reading these numbers directly.

## Sources

- [FBbt:00003791 — transmedullary neuron Tm3](https://virtualflybrain.org/reports/FBbt_00003791)
- Takemura et al., 2013, *Nature* 500(7461):175–181; Fischbach and Dittrich, 1989, *Cell Tissue Res.* 258(3):441–475
