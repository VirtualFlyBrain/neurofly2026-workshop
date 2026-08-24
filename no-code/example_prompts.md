# Optimized Chat Prompts — by Problem

Copy-paste starting points for VFB Chat. Each maps to a problem card in [`../problems/`](../problems/) and to the Python route (A) in the notebooks.

> **Tip:** Always end with *"…and give me the VFB IDs"* so you can reproduce results with `vfb_connect`.

---

## P1 · Discovery — find a neuron type across datasets

**Goal:** Find every instance of a neuron type with IDs and dataset names

**Optimized Chat Prompt:**
> "List the individual DA1 lPN neurons in VFB with VFB IDs and datasets."

**Expected Answer:** 68 individual image records with VFB IDs across MaleCNS, FlyWire, hemibrain (FlyEM-HB) and BANC datasets.

**Screenshot:** `/img/chat-p1-discovery.png`

---

## P2 · Bridging — is this the same cell in another dataset?

**Goal:** Cross-dataset identity via morphology and cell type

**Optimized Chat Prompt:**
> "Which FlyWire neuron is the closest NBLAST match to hemibrain neuron VFB_jrchjtdb? Give both VFB IDs, the score, and whether they are the same cell type."

**Expected Answer:** The closest FlyWire neuron with its NBLAST score (~0.68) and confirmation both are annotated DA1 lPN.

**Screenshot:** `/img/chat-p2-bridging.png`

---

## P3 · Visualisation — see neurons together

**Goal:** Quick 3D visualization and morphology summary

**Optimized Chat Prompt:**
> "Show me images of DA1_lPN_R and tell me its neurotransmitter and which brain regions it connects to."

**Expected Answer:** Registered image thumbnails and formats, predicted neurotransmitter (acetylcholine), connected regions and partner counts.

**Screenshot:** `/img/chat-p3-visualisation.png`

---

## P4 · Connectomics — strongest partners & pathway

**Goal:** Top downstream partners with synaptic weights

**Optimized Chat Prompt:**
> "Which neurons are downstream of DA1_lPN_R? List the 10 strongest partners with synapse counts and VFB IDs."

**Expected Answer:** Ranked list of 10 partners with VFB IDs, names, and synapse counts.

**Screenshot:** `/img/chat-p4-connectomics.png`

---

## P5 · Similarity / NBLAST — cross-dataset morphological match

**Goal:** Find morphologically similar neurons with scores

**Optimized Chat Prompt:**
> "Which neurons have a similar morphology to DA1_lPN_R? Give the top 5 NBLAST matches with scores and which dataset each is from."

**Expected Answer:** Top matches with NBLAST scores (best ~0.81), spread across hemibrain, FAFB, FlyWire and FlyCircuit.

**Screenshot:** `/img/chat-p5-similarity.png`

---

## P6 · Transcriptomics — expression profile of a cell type

**Goal:** Expression data and marker genes for a cell type

**Optimized Chat Prompt:**
> "What scRNAseq expression data does VFB hold for Kenyon cells? Name the datasets and list the top marker genes with expression levels."

**Expected Answer:** scRNAseq datasets (Davie 2018, Baker 2021) with top marker genes and per-cluster expression levels.

**Screenshot:** `/img/chat-p6-transcriptomics.png`

---

## P7 · Putting it together — multi-step exploration

**Goal:** Chain multiple questions to explore a brain region

**Step-by-Step Prompts:**

1. **Discovery:** "What neuron types are intrinsic to the mushroom body?"
2. **Instances:** "Show me instances of Kenyon cell with VFB IDs."
3. **Connectivity:** "What are the top 5 downstream partners of KCg-m_R?"
4. **Cross-dataset:** "Which neurons have a similar morphology to KCg-m_R?"
5. **Expression:** "What expression data exists for Kenyon cells?"

Substitute the type and neuron names from each answer — and use the names the chat itself uses.

**Expected Answer:** Complete workflow from region → type → instances → partners → matches → expression.

**Screenshot:** `/img/chat-p7-together.png`

---

## Blank Question Template

After working through these examples, use the [blank question template](/no-code/chat-template/) to explore your own neurons of interest.

**Quick Tips:**
- Keep each question to one plainly-named entity — short questions resolve best
- Prefer the names the chat uses in its answers (e.g. `DA1_lPN_R`) over IDs pasted into long questions; parenthesised IDs like "(FlyEM-HB:...)" often fail to resolve
- Always ask for VFB IDs for reproducibility
- One step at a time — search, then drill in, then compare

---

**Compare with:**
- **Python (A):** See notebooks in `../python/`
- **MCP (B):** See setup guide in `../no-code/MCP_setup.md`
