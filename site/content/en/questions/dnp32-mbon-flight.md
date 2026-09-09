---
title: "MBONs, the 'dopaminergic' descending neuron DNp32, and flight"
slug: "dnp32-mbon-flight"
description: "Whether mushroom body output neurons reach DNp32, what DNp32 actually releases, and where its output goes in the ventral nerve cord"
weight: 80
date: 2026-09-09
---

**Asked at the VFB table, NeuroFly 2026 (Cologne), 9 September 2026.**

## The question

> "We're looking at connections between MBONs and the dopaminergic descending neuron DNp32 — and its downstream partners to do with flight, including the halteres."

A visitor studying how mushroom body output reaches descending neurons wanted the MBON → DNp32 connections, and then DNp32's own targets on the flight and haltere side.

## How we answered it

1. `search_terms` for "DNp32" — resolves to **descending neuron of the posterior brain DNp32** (`FBbt:00047665`) plus its seven reconstructions: hemibrain, FlyWire (L and R), male CNS (L and R) and FAFB.
2. `get_term_info` on the class and all seven instances — reads the curated identity and, on each EM neuron, the transmitter prediction with its confidence.
3. `query_connectivity` with **mushroom body output neuron** (`FBbt:00047953`) upstream and DNp32 downstream, then the reverse, across every dataset at weight ≥ 1.
4. `run_query` (`NeuronNeuronConnectivityQuery`) on both male CNS DNp32 cells — the only reconstructions that span brain and cord — to list every downstream partner with synapse counts, then the same query on the eleven strongest targets to follow the pathway one more step.
5. Downloaded the VFB skeletons for DNp32 and its partners to draw the figure below.

## What we found

**DNp32 is not straightforwardly dopaminergic.** The class is curated as a myosuppressin (*Ms*) peptidergic neurosecretory neuron, after Namiki et al. (2018). The small-molecule prediction on each reconstruction is low-confidence and differs by connectome:

| Reconstruction | Predicted transmitter | Confidence | Source |
|---|---|---|---|
| FlyWire L / R | dopamine | 51% / 56% | Eckstein et al., 2024 |
| Hemibrain DNp32_R | octopamine | 43% | Eckstein et al., 2024 |
| Male CNS L / R | serotonin | 58% / 57% | Berg et al., 2025 |
| FAFB skid 430 | no prediction | — | — |

Three different monoamines at about 50% on a curated peptidergic cell reads as the classifier responding to dense-core-vesicle ultrastructure rather than as evidence for any one of them. "An Ms-expressing descending neuron with an unresolved monoamine prediction" is the defensible description.

**MBONs do reach DNp32, weakly.** Across all datasets there are 15 MBON → DNp32 neuron pairs totalling 63 synapses, none stronger than 8. Two types recur in every connectome: **MBON35 (γ2)** (8 and 7 synapses in the male CNS, 6 in FlyWire, 2 in the hemibrain) and **MBON20 (γ1γ2)** (7 in the hemibrain, 7 and 4 in the male CNS, 6 and 3 in FlyWire). MBON17, MBON04, MBON15, MBON25 and MBON34 contribute single low-count edges. In the other direction DNp32 → MBON20 is 5 (male CNS) and 3 (hemibrain), a weak reciprocal loop present in two independent volumes. At the default weight ≥ 5 cut-off only the MBON20 and MBON35 edges survive.

**Its output is leg and jump, not wing and haltere.** In the male CNS, DNp32's strongest brain targets are the GABAergic WED055 cluster in the wedge (43, 36, 34 synapses…), the descending neurons DNge075 (42) and DNd03 (27), the CSD serotonergic interneuron (38) and glutamatergic CB3660/AVLP075 cells. In the cord every target above weight 5 is an interneuron, dominated by the cholinergic 18B hemilineage (IN18B005: 38 and 21; IN18B011: 14 and 14) and GABAergic 12B/6B cells. One step further those interneurons drive leg motor neurons — sternotrochanter MN (81), MNml29 (65), sternal posterior rotator MN (59) — and the tergotrochanteral jump muscle MN (23, 21). The only wing or haltere motor neurons reached at second order are **hg4 MN** (via IN06B064, 2 synapses) and **MNwm36** and **DVMn 1a–c** (via DNd03, 2 synapses each), at the noise floor. This matches the class's curated anatomy, which lists synaptic sites in the T1–T3 leg neuropils, tectulum and gnathal ganglion and none in wing or haltere neuropil.

{{< embed-page src="/questions/dnp32-3d.html" title="DNp32 and its downstream partners — rotatable, male CNS v1.0" height="2500" >}}

The viewer shows both male CNS DNp32 cells, their brain partners, the 18B/12B/6B interneurons they drive, the leg and jump motor neurons those reach, and the three wing/haltere motor neurons that only just register. Drag to rotate; click a name to isolate it.

**Worth being honest about.** VFB holds no direct DNp32 → wing or haltere motor neuron synapses, and absence in VFB is not absence in the fly: the male CNS is one animal, and small or unreliably detected synapses fall below these counts. The 18B hemilineage and the tergotrochanteral MN are the takeoff circuit, so if DNp32 has a role in flight it sits upstream of takeoff rather than in wing or haltere steering. And if the flight/haltere link came from another source, it is worth checking that the neuron in question really is DNp32 rather than a neighbouring posterior DN.

## Sources

- [FBbt:00047665 — descending neuron of the posterior brain DNp32](https://virtualflybrain.org/reports/FBbt_00047665)
- [DNp32_R (MaleCNS:524968)](https://virtualflybrain.org/reports/VFB_jrmc30p8) · [DNp32_L (MaleCNS:556286)](https://virtualflybrain.org/reports/VFB_jrmc30p9)
- Namiki et al., 2018, *eLife* 7: e34272 (descending neuron atlas)
- Eckstein et al., 2024, *Cell* 187(10): 2574–2594 ([FBrf0259490](http://flybase.org/reports/FBrf0259490)); Berg et al., 2025, bioRxiv [10.1101/2025.10.09.680999](https://doi.org/10.1101/2025.10.09.680999)
