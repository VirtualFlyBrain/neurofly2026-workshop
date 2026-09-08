---
title: "Ring-shaped neurons in the fly connectome"
slug: "ring-shaped-neurons"
description: "Which VFB neuron types have a ring-shaped morphology, and what VFB holds on them"
weight: 10
date: 2026-09-07
---

**Asked at the VFB table, NeuroFly 2026 (Cologne), 7 September 2026.**

## The question

> "Can you search for circle shape neurons in fly connectome data?"

A visitor wanted to know whether VFB could find neurons by the shape of their arbour rather than by name — specifically, ones that form a ring or circle.

## How we answered it

VFB has no shape-based search (that's what NBLAST similarity search is for, starting from a seed neuron — see the [Similarity session](/sessions/05_similarity/)), so the first step was to check whether "ring-shaped" already exists as a named biological category. It does: the **ellipsoid body ring neurons**, a well-described class in the fly central complex. The MCP tools used, in order:

1. `search_terms` for "ring neuron" and "circular" — confirms the class exists and rules out unrelated hits (mostly visceral muscle, which also happens to be called "circular muscle").
2. `get_hierarchy` (`subclass_of`, descendants) on the top class — pulls out the full subtype tree.
3. `get_term_info` on the two branch classes, to read the literature description and confirm the anatomical claim ("forms ring-shaped arborizations… circling the ellipsoid body canal") rather than assume it from the name.
4. `run_query` (`ListAllAvailableImages`) on each subtype — counts how many registered images VFB actually holds for each, across which connectomes.

## What we found

The **[adult ellipsoid body ring neuron](https://virtualflybrain.org/reports/FBbt_00003649)** (`FBbt:00003649`, synonym *TL neuron*) splits into two branches: six intrinsic **R-neuron** subtypes (ER1–ER6, GABAergic, ~150 per hemisphere per the literature) and eight **extrinsic ring neuron** subtypes (ExR1–ExR8, mixed neurotransmitters). VFB holds 1,217 registered images across the class — mostly from the male CNS v0.9 connectome (Berg et al., 2025), plus FlyWire, BANC and hemibrain.

The figure below shows one representative neuron per subtype, each a genuine VFB-registered image on the JRC2018U template — not an illustration.

{{< embed-page src="/questions/eb-ring-neurons.html" title="Ellipsoid body ring neurons — one representative per subtype" height="1900" >}}

**Worth being honest about:** this answers "which named class is ring-shaped", not "find me anything ring-shaped by silhouette" — VFB has no morphology-only search of that kind. The two serotonergic/dopaminergic outliers (ExR3, ExR5) also extend well beyond the ellipsoid body, so "ring-shaped" only describes part of their arbour.

## Sources

- [FBbt:00003649 — adult ellipsoid body ring neuron](https://virtualflybrain.org/reports/FBbt_00003649)
- [FBbt:00007507 — adult ellipsoid body R-neuron (ER)](https://virtualflybrain.org/reports/FBbt_00007507)
- [FBbt:00003654 — adult ellipsoid body extrinsic ring neuron](https://virtualflybrain.org/reports/FBbt_00003654)
- Hanesch et al., 1989, *Cell Tissue Res.* 257(2):343–366; Omoto et al., 2018, *Front. Neural Circuits* 12:103
