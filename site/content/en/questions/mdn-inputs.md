---
title: "What feeds the moonwalker descending neuron?"
slug: "mdn-inputs"
description: "MDN's strongest presynaptic partners, cross-checked across two independent connectomes"
weight: 20
date: 2026-09-07
---

**Asked at the VFB table, NeuroFly 2026 (Cologne), 7 September 2026.**

## The question

> "What neuron does the moonwalker descending neuron take input from?"

The moonwalker descending neuron (MDN) drives backward walking in *Drosophila* — a well-known circuit — and the visitor wanted its presynaptic partners.

## How we answered it

1. `search_terms` for "moonwalker descending neuron" — resolves to the adult class (there's a separate larval "mooncrawler" homonym; the class label disambiguates them).
2. `run_query` (`UpstreamClassConnectivity`) on the class — this only returns umbrella classes ("adult neuron", "interneuron"…), not useful biology, because MDN sits under many overlapping ontology parents.
3. `run_query` (`ListAllAvailableImages`) — MDN has 20 registered instances in VFB, across male CNS, MANC, hemibrain, FlyWire and BANC.
4. `run_query` (`NeuronInputsTo`) on one MDN cell from two independent volumes — male CNS v0.9 `MDN_R` and FlyWire `LAL.GNG.12` — to get real per-cell presynaptic partner lists (891 and 359 rows) and see which partners show up in both.

A live cross-dataset `query_connectivity` call was also tried but timed out (it runs uncached, on demand); the per-cell partner lists above already answer the question.

## What we found

The strongest input in **both** independently reconstructed volumes is **CB0095**, a GABAergic (inhibitory) neuron in the gnathal ganglion. The next tier is a cholinergic **DNpe023** (descending neuron of the posterior brain) and several lateral-accessory-lobe local neurons (LAL162, LAL144). A glutamatergic route comes in via lobula tangential cells (LT51 / VPNl&d1 lineage) — a visual input. In the whole-CNS male CNS volume, a substantial ascending GABAergic input from the VNC (AN06B012, hemilineage 6/NB5-2) also appears — absent from FlyWire because that volume is brain-only.

{{< embed-page src="/questions/mdn-inputs.html" title="MDN and its strongest presynaptic partners" height="4260" >}}

**Worth being honest about:** these are single-cell partner lists from one MDN per dataset, not a class-level aggregate across all 20 registered MDN instances — weights differ between volumes partly for reconstruction-completeness reasons, not just biology. FlyWire's neurotransmitter calls are predictions, not measurements.

## Sources

- [FBbt:00111308 — adult moonwalker descending neuron (MDN)](https://virtualflybrain.org/reports/FBbt_00111308)
- Male CNS v0.9/v1.0 connectome, Berg et al. (2025); FlyWire connectome, Dorkenwald et al. (2023); hemibrain v1.2.1, Xu et al. (2020)
