---
title: "What neuromodulator data does VFB hold for neurons?"
slug: "neuromodulator-data"
description: "How neurotransmitter and neuropeptide identity is stored in VFB — curated class assertions versus per-neuron EM predictions — and where the gaps are"
weight: 70
date: 2026-09-09
---

**Asked at the VFB table, NeuroFly 2026 (Cologne), 9 September 2026.**

## The question

> "What information do you have on neuromodulators for neurons?"

A visitor working on aminergic and peptidergic modulation wanted to know whether VFB records which transmitter or neuropeptide a neuron releases, and where that information comes from.

## How we answered it

1. `search_terms` for "neuromodulator" — returns nothing. There is no term or search facet with that name, so the first job was to find how the concept is actually encoded.
2. `list_search_facets` with `contains="ergic"` — lists the nine transmitter facets the search index carries, with the number of records under each.
3. `get_term_info` on **peptidergic neuron** (`FBbt:00004101`) — shows the curated pattern: the class is defined as any neuron *capable of* peptide secretion (GO:0002790), with 312 subclasses for specific peptides.
4. `get_term_info` on individual EM reconstructions from the hemibrain, male CNS and FlyWire — shows the second pattern: a per-neuron *capable of* relationship carrying a prediction confidence and a citation.

## What we found

Transmitter identity lives at two levels, both using the same relationship — `capable of` (RO:0002215) pointing at a Gene Ontology secretion process — so a single query pattern finds both.

**Curated, at the class level.** Ontology classes carry the assertion, and it is inherited by every instance. The umbrella **peptidergic neuron** class has 312 subclasses, most of them peptide-specific: allatostatin A and C, CCAP, CCHamide-1/2, corazonin, Dh44, Hugin, ITP, leucokinin, Mip, NPF/sNPF, Pdf, PTTH, tachykinin, natalisin, GPA2/GPB5, eclosion hormone and so on, at adult and larval stages. The classical amines follow the same pattern (190 dopaminergic classes, plus octopaminergic, tyraminergic, serotonergic and histaminergic ones).

**Predicted, per EM neuron.** Where a connectome ships transmitter predictions, VFB attaches them to each reconstruction as `capable of` with the classifier's confidence and its source — for example the hemibrain LPN_R reads "43% capable of dopamine secretion, neurotransmission (Eckstein et al., 2024)", and the male CNS AstA1_L reads "74% capable of GABA secretion (Berg et al., 2025)". A neuron's tags reflect both routes, so AstA1_L is *Peptidergic* through its allatostatin A class and *GABAergic* through the prediction.

| Facet | Records | What it means |
|---|---|---|
| cholinergic | 294,948 | mostly EM predictions |
| GABAergic | 103,210 | mostly EM predictions |
| glutamatergic | 94,191 | mostly EM predictions |
| histaminergic | 20,968 | photoreceptors, largely by class |
| dopaminergic | 20,236 | class assertions plus predictions |
| peptidergic | 17,962 | class assertions only |
| serotonergic | 3,568 | class assertions plus predictions |
| octopaminergic | 635 | class assertions plus predictions |
| tyraminergic | 287 | class assertions plus predictions |

These are counts of VFB records, not of neurons in a fly: the same cell type appears once per connectome it was reconstructed in.

Around the identity itself: class-level connectivity aggregates work on these classes (`DownstreamClassConnectivity` on peptidergic neuron returns 56,562 rows), 203 driver-line expression patterns are annotated to peptidergic classes, 81 scRNAseq clusters map to them (Davie et al., 2018 and others), and there are 45 neurotransmitter-receptor gene entries.

**Worth being honest about.** Neuropeptides are never predicted from EM — the classifiers only cover the small molecules — so peptidergic identity on a connectome neuron comes solely from its mapping to an FBbt class (FlyWire's *ITP* cell-type label becomes *adult ipc-1 neuron*, for instance). The peptidergic facet is generic, so "which peptide?" means walking the subclass tree. Per-neuron predictions cover the hemibrain, FlyWire and male CNS but not the older FAFB/CATMAID skeletons, and the receptor side is the 45 gene entries with no per-neuron receptor expression. Finally, the predictions are attributed evidence, and they can disagree between connectomes for the same cell — see [the DNp32 entry](/questions/dnp32-mbon-flight/) for a case where three volumes give three different monoamines.

## Sources

- [FBbt:00004101 — peptidergic neuron](https://virtualflybrain.org/reports/FBbt_00004101)
- Eckstein et al., 2024, *Cell* 187(10): 2574–2594 (FlyWire/hemibrain transmitter predictions, [FlyBase FBrf0259490](http://flybase.org/reports/FBrf0259490))
- Berg et al., 2025, bioRxiv [10.1101/2025.10.09.680999](https://doi.org/10.1101/2025.10.09.680999) (male CNS)
- Davie et al., 2018, *Cell* 174(4): 982–998 (scRNAseq clusters)
