---
title: "Connectivity between L3 and Tm9"
slug: "l3-tm9-connections"
description: "How strong is the L3→Tm9 connection, and does its synapse-count distribution hold up across the optic-lobe connectomes"
weight: 50
date: 2026-09-09
---

**Asked at the VFB table, NeuroFly 2026 (Cologne), 9 September 2026.**

## The question

> "Find me connectivity data between L3 and Tm9, then plot synapse count against frequency, coloured by dataset."

L3 is a lamina monopolar neuron, Tm9 a transmedullary neuron — a canonical, heavily studied connection in the optic lobe's motion/ON pathway. The asker didn't want a single headline number but the *shape* of the connection: how many synapses each individual L3→Tm9 pair makes, and whether that shape is reproducible across the connectomes VFB now holds.

## How we answered it

1. `search_terms` to canonicalise both types — **L3** = lamina monopolar neuron L3 (`FBbt:00003721`), **Tm9** = transmedullary neuron Tm9 (`FBbt:00003797`). Worth noting the immature-neuron terms and the Tm9a/Tm9b subtypes that also match the text search.
2. `list_connectome_datasets` to see what's currently loaded.
3. `query_connectivity` with **both** ends fixed (L3 upstream, Tm9 downstream) and `group_by_class=false`, so we get individual neuron-to-neuron pairs rather than a class-level aggregate, at synapse threshold ≥1. This is a live cross-dataset query; the both-ends L3→Tm9 form returned **5,356 pairs**.
4. Binned each pair by its synapse count and drew one frequency polygon per dataset.

Direction matters: we queried **L3→Tm9** (Tm9 postsynaptic), the biologically dominant direction — the reverse is negligible.

## What we found

The three well-sampled datasets agree almost exactly — median synaptic weight of **21–23** per L3→Tm9 pair — a reassuring cross-connectome check on a textbook connection. The distribution is bimodal: a low-count shoulder (2–4 synapses, weak or incidental touches) and a broad main peak around **22–30 synapses**, the genuine columnar retinotopic connection.

{{< embed-page src="/questions/l3-tm9-connections.html" title="L3→Tm9 synapse-count distribution, coloured by dataset" height="1050" >}}

| Dataset | Pairs | Min | Median | Mean | Max |
|---|---|---|---|---|---|
| male-CNS (v1.0) | 2,511 | 2 | 22 | 19.2 | 47 |
| FlyWire (v783) | 1,528 | 2 | 21 | 18.6 | 47 |
| Optic Lobe (v1.0.1) | 1,315 | 2 | 23 | 19.7 | 47 |
| BANC (v888) | 2 | 20 | 22 | 22.0 | 24 |

**Worth being honest about:**

- **Dataset coverage.** Only optic-lobe connectomes reconstruct these cells. Hemibrain, MANC, FAFB-CATMAID and the larval L1 CNS were excluded — they don't contain L3/Tm9. BANC currently exposes just 2 such pairs, far too few to say anything about its distribution.
- **Version drift.** The version tags stamped on the returned edges (male-CNS **v1.0**, BANC **v888**) ran *ahead* of what `list_connectome_datasets` advertised (v0.9, v626) — the connectivity backend and the dataset registry are populated separately, so trust the per-edge source tag, not the registry, for provenance.
- **Not normalised.** These are raw pair counts. Datasets differ in how many optic-lobe columns were reconstructed, so compare the *shapes* of the distributions, not the absolute peak heights.

## Sources

- [FBbt:00003721 — lamina monopolar neuron L3](https://virtualflybrain.org/reports/FBbt_00003721)
- [FBbt:00003797 — transmedullary neuron Tm9](https://virtualflybrain.org/reports/FBbt_00003797)
- Fischbach and Dittrich, 1989, *Cell Tissue Res.* 258(3):441–475; connectome sources: FlyWire (Dorkenwald, Schlegel et al., 2024), Optic Lobe (Nern et al., 2024), male-CNS (Berg et al., 2025).
