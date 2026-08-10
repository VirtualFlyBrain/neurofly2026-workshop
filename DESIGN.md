# Workshop design — questions, exemplar data and expected results

**Status:** draft for curator review.
**Verified:** every number and identifier below was returned by a live call to VFB on
**2026-08-08** using `vfb_connect` 2.3.14 and the VFB MCP. Where a call was slow or returned
nothing, that is recorded too.

---

## What this document is for

This is the content specification the workshop is built from. The notebooks in [`python/`](python/),
the problem cards in [`problems/README.md`](problems/README.md) and the prompts in
[`no-code/example_prompts.md`](no-code/example_prompts.md) are all downstream of it.

Review the biology and the choice of examples **here**, not in the code. Anything changed in this
document gets rebuilt into the notebooks; anything changed only in a notebook will drift out of
step with the other two routes.

The workshop is a self-paced online course, available before and during NeuroFly 2026 and kept
afterwards as a standing resource. There is no instructor to correct a bad example in the room, so
the exemplars need to be right, and the learner needs to be told what to expect.

## How to review this

Three questions per module:

1. **Is this a question a *Drosophila* neuroscientist would actually ask?** If it reads as an API
   demonstration rather than a research question, say so.
2. **Is the exemplar the right one, and is it correct?** Every worked example is stated below with
   its identifiers, so it can be checked without reading the code.
3. **Is the conclusion we ask the learner to draw defensible?** Each module ends by asking the
   learner to notice something. Those are listed as "teaching point".

Points needing a decision are marked **[CURATOR]**. Edit this file directly, or comment on the
pull request — either works.

---

## The running example

The course carries one neuron type from module 01 to module 07, so the learner accumulates
identifiers rather than starting over each time.

| | |
|---|---|
| **Type** | adult antennal lobe projection neuron DA1 lPN |
| **CURIE** | `FBbt:00067363` (symbol `DA1_lPN`) |
| **Exact synonyms** | `DA1 lPN`, `iACT (DA1)`, `mALT (DA1)` |
| **What it is** | Adult uniglomerular antennal lobe projection neuron from the dorsal hemilineage of the lateral neuroblast (ALl1); dendrites mainly in antennal lobe glomerulus DA1; innervates the mushroom body calyx and the anterior edge of the lateral horn; cholinergic; fasciculates with the medial antennal lobe tract |
| **Also classified as** | adult *fruitless* aDT-e (female) neuron (`FBbt:00110423`) — in the female datasets only; see module 02 |
| **Sources** | Bates et al. 2020 (FBrf0246460); Marin et al. 2002 (FBrf0146917); Cachero et al. 2010 (FBrf0211926); Ito et al. 2013 (FBrf0221438); Tanaka et al. 2004 (FBrf0174482) |
| **Example individual** | `VFB_jrchjtdb` — DA1_lPN_R, hemibrain bodyId 1734350908 |
| **FlyWire counterpart** | `VFB_fw035286` |

**Why this type.** It is well described in the literature, present in five of VFB's datasets, absent
from two of them for a reason a learner can understand, pheromone-responsive so the biology is
motivating, and it feeds the mushroom body — which gives a natural route into module 06, where the
transcriptomic data actually lives.

**Where it stops working.** DA1 lPN has **no transcriptomic profile in VFB**
(`get_transcriptomic_profile` returns empty). Module 06 therefore has to hand over to its
downstream partner, the Kenyon cell. That hand-over is currently implicit; see module 06 below.

> **[CURATOR] Is DA1 lPN the right spine for the whole course?** The alternative is to use a
> different exemplar per module and lose the continuity. A second alternative is to pick a type
> that does have expression data so that one example carries all seven modules — but nothing
> obvious does that *and* appears in five connectomes.

### Counting, and how we talk about it

The ontology description states there are **around eight DA1 lPNs per hemisphere** (Bates et al.
2020). VFB holds **68 individual neurons** classified as DA1 lPN, because the same cells have been
reconstructed independently in five datasets. The course says "VFB holds 68 records", never "there
are 68 DA1 lPNs", and module 01 uses the gap between 8 and 68 as the teaching point about what a
count from an integration platform means.

> **[CURATOR]** Is "around eight per hemisphere" still the number you would quote? It is what the
> DAO definition says, sourced to Bates et al. 2020.

---

## Module 00 · Setup and the 2026 data landscape

**Question:** *What data is in VFB in 2026, and how do I reach it?*

| | |
|---|---|
| **Route A call** | `vfb.get_datasets()` |
| **Expected** | ~211 rows. This is **all** datasets — light microscopy and scRNAseq included — not just connectomes. |
| **Route B** | "List the connectome datasets currently integrated in Virtual Fly Brain with their versions." (`list_connectome_datasets`) |
| **Route C** | "Which connectome datasets does VFB have, and which cover the ventral nerve cord?" |

**Connectomes to name:** BANC v626 (whole adult CNS), FAFB–FlyWire v783, male-CNS v0.9,
JRC Optic-Lobe v1.0.1, MANC v1.2.1, hemibrain v1.2.1, FAFB (CATMAID), L1 larval CNS (CATMAID).

**Teaching point:** list what is live rather than trusting a hard-coded roster — the roster moves,
and the notebook shows you how to check.

> **[CURATOR]** Anything missing from, or wrong in, that roster as of September 2026? Is there a
> dataset landing between now and the event that should be named?

---

## Module 01 · Discovery

**Question:** *Find every instance of a neuron type across all datasets.*

| | |
|---|---|
| **Route A calls** | `vfb.get_instances('adult antennal lobe projection neuron DA1 lPN')`; `vfb.get_terms_by_region(...)` |
| **Expected** | **68 individuals.** By `data_source`: BANC 18, FlyWire 15, FAFB 15, male-CNS 13, hemibrain 7. |
| **Absent from** | MANC and the optic lobe |
| **New since 2024** | 31 of 68 come from BANC, male-CNS or optic lobe |

**Teaching points.**

1. One ontology term retrieves cells from five independently reconstructed datasets with five
   different naming conventions (`BANC_626:720575941624135932`, `AL.MB_CA.108 (FlyWire:…)`,
   `Uniglomerular mALT DA1 lPN#R8 (FAFB:57381)`, `DA1_lPN_R (FlyEM-HB:5813039315)`,
   `DA1_lPN_L (MaleCNS:13583)`). That is the entire value proposition of the platform, visible in
   one call.
2. Absence from MANC and optic lobe is not a data gap — DA1 lPN is a central-brain neuron and
   neither dataset covers the central brain.
3. 68 records ≠ 68 cells (see counting, above).

> **[CURATOR] Is the "new since 2024" cut still the right framing?** It currently means BANC,
> male-CNS and optic lobe. If the course outlives the conference by a couple of years, "new since
> 2024" ages badly — should this become "whole-CNS and sex-specific datasets" instead?

---

## Module 02 · Bridging datasets and identity

**Question:** *Is this FlyWire neuron the same cell as that hemibrain one?*

| | |
|---|---|
| **Route A calls** | `vfb.terms([...]).summary`; `vfb.term(id).parents` / `.xrefs` / `.datasets`; NBLAST from module 05 as confirmation |
| **Exemplars** | hemibrain `VFB_jrchjtdd`, `VFB_jrchjtdb`; FlyWire `VFB_fw035286`, `VFB_fw035057`, `VFB_fw033192` |
| **Expected** | Both resolve to the same two ontology parents; cross-references point out to neuPrint, FlyWire Codex and neuronbridge; licences differ by dataset (hemibrain CC-BY, FlyWire CC-BY-NC, FAFB CC-BY-SA) |

**Teaching points.**

1. Identity is established by *shared typing*, then corroborated by morphology (module 05) — not
   by name matching, since the names share nothing.
2. The cross-references are the exit route back to each dataset's own portal.
3. Licences differ between the datasets a single query returns. Anyone redistributing a figure
   needs to know that, and it is easy to miss.

**Something to resolve before this ships.** The same neurons report different parent labels
depending on the call: `get_instances` gives *adult antennal lobe projection neuron DA1 lPN* and
*adult fruitless aDT-e (female) neuron*, while `terms().summary` gives *iACT (DA1)* and
*female aDT3 neuron*. These are synonyms of the same classes, but a learner comparing two cells
across two calls will read it as a disagreement.

> **[CURATOR]** Is showing both label forms a teaching opportunity (synonyms are real, and knowing
> the ontology carries them is useful) or a distraction we should suppress by pinning the label
> form? My inclination is to show it once, in this module, and explain it.
>
**The dual typing splits by dataset, and the split is worth looking at.** Verified 2026-08-08,
counting how many DA1 lPN individuals also carry *adult fruitless aDT-e (female) neuron*
(`FBbt:00110423`) as a parent:

| Dataset | Typed as *fru* aDT-e (female) |
|---|---|
| BANC | 18 / 18 |
| FlyWire | 15 / 15 |
| hemibrain | 7 / 7 |
| FAFB | **8 / 15** |
| male-CNS | **0 / 13** |

male-CNS carrying none of it is consistent — that dataset is male, and the other four are female or
female-derived, so the female typing is correctly withheld rather than missing. FAFB splitting
8/7 *within one dataset* is the one that looks like annotation coverage rather than biology.

> **[CURATOR]** Is the FAFB 8-of-15 split a curation gap, or is there a reason those seven cells
> are not typed as *fruitless* aDT-e? If it is a gap, this is a good honest teaching moment about
> integration — but only if we can say which it is.
>
> **[CURATOR]** Multiple inheritance is worth showing, and the sex split makes it concrete. Is
> "the female typing is absent from male-CNS because that specimen is male" the explanation you
> would give, or is there more to it?

---

## Module 03 · Visualisation

**Question:** *Show these neurons together in a common template.*

| | |
|---|---|
| **Route A calls** | `vfb.get_images([ids], template='JRC2018Unisex', image_type='swc', image_folder=…)`; `navis` for plotting; `vfb.get_vfb_link([ids], 'JRC2018Unisex')` |
| **Template** | JRC2018Unisex — every DA1 lPN individual is registered to it, which is what makes co-visualisation possible |
| **Expected** | SWC skeletons downloaded per neuron; a 3D plot of the hemibrain and FlyWire cells in one space; a working deep link back into the VFB site |

**Teaching point:** cells reconstructed from different brains, by different groups, at different
resolutions can be drawn in one coordinate frame because VFB registers them all to shared
templates. The registration is the work; the plot is the easy part.

**Two API notes that shape this module:** `get_images` requires `image_folder` (it raises without
one), and `get_vfb_link` takes `template` as a required positional argument. Both are easy to get
wrong and both currently appear without those arguments in our own materials.

> **[CURATOR]** Should this module also show the **Circuit Browser** and the VFB site's own 3D
> viewer, rather than only `navis`? For a self-paced learner the site may be the more useful
> destination, and it needs no install.

---

## Module 04 · Connectomics

**Question:** *Who are this neuron's strongest partners, and along what pathway?*

| | |
|---|---|
| **Route A call** | `vfb.get_connected_neurons_by_type(upstream_type='adult antennal lobe projection neuron DA1 lPN', downstream_type='Kenyon cell', weight=10)` |
| **Expected at weight ≥ 10** | **1,132 connections.** By source: FlyWire 489, male-CNS 473, BANC 170. |
| **Expected at weight ≥ 1** | 1,673 connections. FlyWire 711, male-CNS 572, BANC 390. |
| **Downstream classes returned** | alpha/beta Kenyon cell (`FBbt:00100248`), gamma main Kenyon cell (`FBbt:00111061`), alpha'/beta' middle Kenyon cell (`FBbt:00100253`) |
| **Neurotransmitter** | `vfb.get_nt_predictions('adult antennal lobe projection neuron DA1 lPN')` → acetylcholine for every individual, confidence 0.85–0.96, attributed to FlyBase:FBrf0259490 and Berg et al. 2025 |

**Teaching points.**

1. The classic olfactory → memory step, recovered from three independent whole-brain
   reconstructions, with real synaptic weights.
2. **Hemibrain and FAFB return nothing here, and that is deliberate.** `get_connected_neurons_by_type`
   defaults to `exclude_dbs=['hb', 'fafb']` because those two overlap other datasets and would
   double-count. A learner who does not know this will conclude the hemibrain has no DA1 lPN →
   Kenyon cell connections, which is false. This must be stated in the notebook, not buried.
3. Neurotransmitter identity here is a *prediction with a confidence and a citation*, not an
   assertion — and the notebook should say so in those words.

**Known limitation:** `get_neurons_downstream_of` / `get_neurons_upstream_of` return an empty
DataFrame for an individual neuron such as `VFB_jrchjtdd`. Only the type-level call works. The
notebook uses the type-level call and does not mention the per-instance one.

> **[CURATOR]** Is DA1 lPN → Kenyon cell the right pathway to feature, or would you rather show
> DA1 lPN → lateral horn, which is the innate rather than the learned arm? The mushroom body route
> is chosen partly because it sets up module 06.
>
> **[CURATOR]** Should the default `weight=10` be explained as a signal-to-noise threshold, and if
> so what is the honest justification? "10 is conventional" is not one I would want to write down
> without a reference.

---

## Module 05 · Similarity and NBLAST

**Question:** *What is the morphological match to this neuron in another dataset?*

| | |
|---|---|
| **Route A call** | `vfb.get_similar_neurons('VFB_jrchjtdd', similarity_score='NBLAST_score')` |
| **Expected** | **112 hits** (was 107 on 2026-07-21 — see drift, below). Output column is `score`, *not* `NBLAST_score`. |
| **Top hits** | other hemibrain DA1_lPN_R at 0.82, 0.79, 0.78, 0.75, 0.74 |
| **First cross-dataset hit** | `VFB_00101205`, Uniglomerular mALT DA1 lPN#R4 (FAFB:755022), 0.67 |
| **Then** | FlyWire DA1 lPNs at 0.63–0.66, interleaved with more FAFB |
| **First different type** | `VFB_jrchjteg`, DL3_lPN_R (hemibrain), 0.64 — a neighbouring glomerulus PN |
| **Tail** | DA1 lvPN and multiglomerular PNs at 0.30–0.31 |

**Teaching points.**

1. Morphology alone recovers the ontology's typing: the same cell type comes back first, from
   datasets that share no naming.
2. Within-dataset scores (0.74–0.82) sit above cross-dataset scores (0.63–0.68). That is a
   registration and reconstruction-quality effect, not biology, and a learner comparing raw scores
   across datasets needs to know it.
3. The score at which a different type appears — DL3 lPN at 0.64, sitting *among* the correct
   cross-dataset matches — is the honest answer to "what threshold should I use?". There isn't a
   clean one.

> **[CURATOR]** Point 3 is the most useful thing in this module and also the easiest to get wrong.
> Is "no clean threshold; inspect the ranked list and check the labels" the message you want, or is
> there a defensible rule of thumb for cross-dataset NBLAST on VFB that we should give instead?

---

## Module 06 · Transcriptomics

**Question:** *What is this cell type's expression profile, and which genes mark it?*

This module needs the most curator input, because the exemplar in the current notebook does not
work.

**What we found on 2026-08-08:**

| Call | Result |
|---|---|
| `get_transcriptomic_profile('Kenyon cell')` | **~15–20 minutes**, then 69k+ rows. Unusable in a notebook cell. |
| `get_transcriptomic_profile('Kenyon cell', no_subtypes=True)` | **Empty** — the parent class has no scRNAseq of its own |
| `get_transcriptomic_profile('adult Kenyon cell')` | 69,168 rows in **69 s** |
| `get_transcriptomic_profile('alpha/beta Kenyon cell')` | 18,234 rows in **42 s** |
| `get_transcriptomic_profile('adult antennal lobe projection neuron DA1 lPN')` | **Empty** |
| `get_cell_types_by_genes(['Dop1R1'])` | 359 rows in 78 s |
| `get_scRNAseq_expression('Kenyon cell')` | Empty — this one needs an **ID**, not a label |
| `get_scRNAseq_expression('FBbt_00100247')` | 6 rows in <1 s |

`PLAN.md` §9 records `get_transcriptomic_profile('Kenyon cell')` as "verified non-empty". It is
non-empty, but only after expanding every subtype, and no attendee will wait that long.

**Proposed design.** Use **alpha/beta Kenyon cell** (`FBbt:00100248`) as the profiled exemplar: it
runs in about 40 s, it is a real cell type rather than a parent class, and it is one of the classes
module 04 has just returned as a DA1 lPN partner — so the connectome-to-expression bridge is a
step the learner takes with their own result, not a topic change.

Data returned includes `gene`, `gene_id`, `level`, `extent`, `sample_sex`, `sample_tissue`,
`dataset_id` and a reference — e.g. Lu et al. 2023, *Science* 380(6650): eadg0934, split by sex, and
Li et al. 2022 Fly Cell Atlas, and Mokashi et al. 2021.

**Teaching points.**

1. The connectome names a partner class; the ontology carries that class through to scRNAseq
   clusters; you go from a wiring diagram to genes in two calls. This is the through-line of the
   2024 workshop, and it is the reason the mushroom body is the destination in module 04.
2. **Not every connectome cell type has expression data.** DA1 lPN does not. Say this plainly —
   connectome cell types and scRNAseq clusters are different partitions of the same nervous system
   and they only partly align.
3. The `hasScRNAseq` facet in `vfb.search()` results is how you find out in advance which types
   *do* have data, rather than guessing and getting an empty frame. This should be shown.

> **[CURATOR] Is alpha/beta Kenyon cell the right exemplar?** Alternatives: adult Kenyon cell
> (broader, 69 s), gamma main Kenyon cell (the other class module 04 returns), or something outside
> the mushroom body entirely.
>
> **[CURATOR] What should the learner conclude from `level` and `extent`?** They are the two
> quantitative columns and the module currently does nothing with them. A one-line definition of
> each, in your words, would improve this module more than any extra code.
>
> **[CURATOR]** Is there a marker-gene story worth telling here — a gene that cleanly distinguishes
> alpha/beta from gamma Kenyon cells — that would turn this from a data dump into a result?

---

## Module 07 · Putting it together

**Question:** *A guided mini-project chaining every skill, done twice — once with the API, once
conversationally.*

Chain: region → intrinsic cell types → pick one → visualise → partners → cross-dataset match →
expression.

**Current state:** the notebook has a blank cell and an invitation. Self-paced, that is not enough
— there is no worked solution to compare against. It needs a complete run through, with the
learner's own substitution invited afterwards.

**Exemplar region:** mushroom body.

**A problem to solve first.** `vfb.get_terms_by_region('mushroom body', cells_only=True)` returns
606 rows in 24 s, and `get_terms_by_region('calyx of adult mushroom body', cells_only=True)`
returns 256 — but both lists open with the same entries, including *adult antler neuron 019*, which
is not a mushroom body intrinsic neuron. The call appears to return everything overlapping the
region, unranked.

> **[CURATOR] What is the right query for "the intrinsic neuron types of the mushroom body"?**
> `get_subclasses('Kenyon cell')` would give a clean, defensible answer for the intrinsic
> population. Is that what a neuroscientist means by the question, or does the honest answer need
> to include the extrinsic types (MBONs, DANs, APL) as well?
>
> **[CURATOR]** Is the mushroom body the right region for the mini-project, given the whole course
> has already spent modules 04 and 06 there? A different region would make the learner transfer the
> skills rather than repeat them — the central complex and the lateral horn are the obvious
> candidates.

---

## Cross-cutting decisions

**[CURATOR] How much biology should the notebooks carry?** Currently they are close to pure
method: here is a call, here is a table. The alternative is two or three sentences of biological
framing per module, which makes the course teach neuroscience-with-VFB rather than
VFB-with-a-neuron-as-an-example. The second is more work and needs your voice, not mine.

**[CURATOR] Whose data is being shown, and is it attributed well enough?** Every module returns
data from several groups' reconstructions. Dataset names appear in the output tables, but the
notebooks do not currently name the papers. For a resource that stays up indefinitely, under-
attribution is a real risk.

**[CURATOR] Are there results in here we should not assert?** The course draws conclusions in
prose — that morphology recovers ontological typing, that hemibrain scores exceed cross-dataset
scores for registration reasons, that connectome types and scRNAseq clusters only partly align.
Each is defensible from what we observed, but they are our readings and worth a second opinion.

---

## Expected results, and drift

Every module states what the learner should see, and why their number may differ. This matters
more for a self-paced course than a live one: alone, a different number is indistinguishable from a
mistake.

Drift is not hypothetical. Between 2026-07-21 and 2026-08-08 the NBLAST hit count for one hemibrain
DA1 lPN went from **107 to 112**. Three weeks, five hits.

The policy in the notebooks is therefore:

> You should see around 112 hits. If your number differs, VFB has added or updated data since this
> was written — that is expected, and noticing it is part of the point.

with a scheduled CI run of `tools/run_notebooks.py` and a "last verified" date on the README, so
the gap between what we claim and what VFB returns stays small.

---

## API defects found while verifying this

Recorded here because they shape the material, and because they should go upstream to
`vfb_connect`.

1. `get_nt_predictions(['VFB_jrchjtdd'])` fails — a list is interpolated into the Cypher string
   literally, producing a syntax error that surfaces as `TypeError: 'bool' object is not iterable`.
   A bare string works. The workshop uses a string.
2. `get_images(...)` raises `TypeError` when `image_folder` is left at its `None` default.
3. `get_vfb_link(ids)` requires `template` as a positional argument.
4. `get_neurons_downstream_of` / `get_neurons_upstream_of` return an empty DataFrame for an
   individual neuron.
5. `get_scRNAseq_expression` accepts an ID but silently returns empty for a label, despite taking
   `query_by_label=True`.
6. `get_transcriptomic_profile` on a parent class with many subtypes takes 15–20 minutes with no
   progress indication.

---

## Change log

| Date | Change | By |
|---|---|---|
| 2026-08-08 | First draft; all exemplars verified live against `vfb_connect` 2.3.14 | — |
