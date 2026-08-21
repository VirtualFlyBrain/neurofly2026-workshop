# Optimized Chat Prompts — by Problem

Copy-paste starting points for VFB Chat. Each maps to a problem card in [`../problems/`](../problems/) and to the Python route (A) in the notebooks.

> **Tip:** Always end with *"…and give me the VFB IDs"* so you can reproduce results with `vfb_connect`.

---

## P1 · Discovery — find a neuron type across datasets

**Goal:** Find every instance of a neuron type with IDs and dataset names

**Optimized Chat Prompt:**
> "List all DA1 lPN neurons in VFB with their VFB IDs and which datasets they're in (FlyWire, hemibrain, BANC, etc)."

**Expected Answer:** ~68 individual neurons with VFB IDs across FlyWire, hemibrain, BANC, male-CNS, MANC, and optic lobe datasets.

**Screenshot:** `/img/chat-p1-discovery.png`

---

## P2 · Bridging — is this the same cell in another dataset?

**Goal:** Cross-dataset identity via morphology and cell type

**Optimized Chat Prompt:**
> "Find the hemibrain neuron that matches FlyWire neuron VFB_fw035286. Are they the same cell type? Give me both VFB IDs."

**Expected Answer:** Match confirmation with both VFB IDs and shared cell type annotation.

**Screenshot:** `/img/chat-p2-bridging.png`

---

## P3 · Visualisation — see neurons together

**Goal:** Quick 3D visualization and morphology summary

**Optimized Chat Prompt:**
> "Show me the 3D image of neuron VFB_jrchjtdb. What are its main morphological features and which brain region is it in?"

**Expected Answer:** 3D viewer link plus key morphology facts (arborization pattern, brain region).

**Screenshot:** `/img/chat-p3-visualisation.png`

---

## P4 · Connectomics — strongest partners & pathway

**Goal:** Top downstream partners with synaptic weights

**Optimized Chat Prompt:**
> "List the top 10 downstream partners of neuron VFB_jrchjtdb by synapse count. Include their VFB IDs, names, and synaptic weights."

**Expected Answer:** Ranked list of 10 partners with VFB IDs, names, and synapse counts.

**Screenshot:** `/img/chat-p4-connectomics.png`

---

## P5 · Similarity / NBLAST — cross-dataset morphological match

**Goal:** Find morphologically similar neurons with scores

**Optimized Chat Prompt:**
> "What are the top 5 neurons most similar to VFB_jrchjtdb by NBLAST score? Include their VFB IDs, datasets, and similarity scores."

**Expected Answer:** Top 5 matches with NBLAST scores, noting which come from BANC or male-CNS.

**Screenshot:** `/img/chat-p5-similarity.png`

---

## P6 · Transcriptomics — expression profile of a cell type

**Goal:** Expression data and marker genes for a cell type

**Optimized Chat Prompt:**
> "What scRNAseq expression data and marker genes are associated with the DA1 lPN cell type in VFB? List the genes with expression levels."

**Expected Answer:** Expression profile with marker genes and their expression levels.

**Screenshot:** `/img/chat-p6-transcriptomics.png`

---

## P7 · Putting it together — multi-step exploration

**Goal:** Chain multiple questions to explore a brain region

**Step-by-Step Prompts:**

1. **Discovery:** "What neuron types are intrinsic to the mushroom body?"
2. **Instances:** "Show me instances of [type from step 1] with VFB IDs"
3. **Connectivity:** "What are the top 5 downstream partners of [ID from step 2]?"
4. **Cross-dataset:** "Find the cross-dataset match for [ID from step 2] in another connectome"
5. **Expression:** "What expression data exists for [type from step 1]?"

**Expected Answer:** Complete workflow from region → type → instances → partners → matches → expression.

**Screenshot:** `/img/chat-p7-together.png`

---

## Blank Question Template

After working through these examples, use the [blank question template](/no-code/chat-template/) to explore your own neurons of interest.

**Quick Tips:**
- Name entities precisely (neuron type, VFB ID, FlyBase ID)
- Always ask for VFB IDs for reproducibility
- Specify datasets when it matters ("in FlyWire", "in BANC")
- One step at a time — search, then drill in, then compare

---

**Compare with:**
- **Python (A):** See notebooks in `../python/`
- **MCP (B):** See setup guide in `../no-code/MCP_setup.md`
