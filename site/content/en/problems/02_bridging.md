---
title: "P2 · Bridging & Identity"
description: "Is this FlyWire neuron the same cell as that hemibrain one?"
weight: 2
route: python
python_content: |
  Resolve both IDs, compare their ontology types, then let NBLAST rank candidates — filtering the score table by source dataset does the bridging.

  ```python
  from vfb_connect import vfb

  matches = vfb.get_similar_neurons("VFB_jrchjtdb",
                                    similarity_score='NBLAST_score',
                                    return_dataframe=True)
  # best matches from a DIFFERENT dataset (FlyWire)
  fw = matches[matches.source_id.str.contains('flywire')]
  print(fw[['id', 'score', 'label', 'tags']].head(2))
  ```

  **Verified output** (Aug 2026): 107 neighbours in total; the top FlyWire rows —

  ```text
            id  score                                      label
  VFB_fw036329   0.68  AL.MB_CA.111 (FlyWire:720575940605102694)
  VFB_fw035224   0.62  AL.MB_CA.127 (FlyWire:720575940603231916)
  ```

  Both carry the tags *adult antennal lobe projection neuron DA1 lPN* — same type annotation, different animal: that agreement between morphology (score) and ontology (`tags`) is the bridge. In-dataset hemibrain sisters score 0.75–0.80 for comparison, so expect a cross-dataset penalty.

r_content: |
  ```r
  m <- vfb$get_similar_neurons("VFB_jrchjtdb",
                               similarity_score = "NBLAST_score",
                               return_dataframe = TRUE)
  fw <- m[grepl("flywire", m$source_id), ]
  head(fw[, c("id", "score", "label")], 2)
  ```

  **Verified output** (Aug 2026): the best FlyWire match is `VFB_fw036329` — AL.MB_CA.111 — at score **0.68**, tagged with the same two cell types as the query. Exactly the Python route's answer: the bridging logic (morphology score + shared ontology types) is language-independent.

  For natverse users, [natverse/vfbconnectr](https://github.com/natverse/vfbconnectr) wraps the same package and adds `read.neurons.vfb()` to pull matches straight into `nat` for your own NBLAST runs.

mcp_content: |
  The MCP exposes the pre-computed NBLAST neighbours of any connectome neuron, so cross-dataset bridging is one query plus a filter:

  > **You:** Here's hemibrain neuron VFB_jrchjtdb. Find its closest FlyWire match and tell me if they're the same type.
  >
  > **Assistant** → `get_term_info(VFB_jrchjtdb)` → *SimilarMorphologyTo* available (count **107**)
  > → `run_query(VFB_jrchjtdb, SimilarMorphologyTo)` → rows sorted by NBLAST score, each with source dataset
  >
  > **Assistant:** The top matches are other hemibrain DA1 lPNs (scores 0.80–0.75). The best **FlyWire** match is **AL.MB_CA.111 (FlyWire:720575940605102694)** `VFB_fw036329` at score **0.68** — annotated with the same types, *adult antennal lobe projection neuron DA1 lPN* and *adult fruitless aDT-e (female) neuron*, so connectome data indicates it is the corresponding cell in the other dataset. FAFB matches (Uniglomerular mALT DA1 lPN#R1, #R4) sit at the same score.

  Because every row carries its source and template, the assistant can separate "same animal, another reconstruction" from "corresponding cell in a different dataset" — the crux of bridging.

mcp_prompt: |
  Here's a FlyWire neuron VFB_id X. Find the morphologically closest neuron in the hemibrain and tell me if they're annotated as the same type.

chat_content: |
  Chat can help you explore candidate matches across datasets.
  
  **Optimized prompt:** Give the specific VFB ID and ask for the match, score, and type confirmation.

chat_query: "Which FlyWire neuron is the closest NBLAST match to hemibrain neuron VFB_jrchjtdb? Give both VFB IDs, the score, and whether they are the same cell type."

chat_screenshot: "/img/chat-p2-bridging.png"

chat_screenshot_alt: "VFB Chat matching hemibrain DA1_lPN_R to its closest FlyWire neuron by NBLAST score with cell type confirmation"

browser_content: |
  The browser bridges datasets the same way the other routes do — NBLAST similarity plus shared cell-type annotation — but you get to *see* the evidence.

  1. **Open the hemibrain neuron in the standard space.** Use the button below to open **DA1_lPN_R (FlyEM-HB:1734350908)** — VFB_jrchjtdb — aligned to the JRC2018Unisex template, the shared coordinate space that makes cross-dataset comparison possible.

     ![DA1_lPN_R over the JRC2018Unisex template with its NBLAST and connectivity queries listed](/img/browser-p2-neuron.png)

  2. **Run the NBLAST query.** Click the *Queries for DA1_lPN_R…* bar, hover **Neurons with ▸** and choose **Neurons with similar morphology to DA1_lPN_R [NBLAST mean score]**.

  3. **Read the results across datasets.** 107 neighbours arrive sorted by score. The **Template_Space** and **Imaging_Technique** columns tell you where each match lives — JRCFIB2018Fum is the hemibrain, FAFB and FlyWire rows are a *different animal*. A high-scoring row from another dataset annotated with the same cell type is your bridge.

     ![NBLAST neighbours of DA1_lPN_R sorted by score](/img/browser-p5-nblast-results.png)

  4. **Check the match visually.** Tick the query neuron and a candidate match: both load into the 3D viewer aligned to the same template, so you can rotate and confirm the morphology agrees — the step no table can give you.

  **Worth noticing:** identity across datasets is a judgement, not a lookup — scores drop smoothly and a different type (DL3 lPN) appears among the true DA1 matches. The browser makes that ambiguity visible.

browser_url: "https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?id=VFB_jrchjtdb&i=VFB_00101567,VFB_jrchjtdb"

try_next: |
  - **Is the bridge symmetric?** NBLAST from the FlyWire match back: query `VFB_fw036329` the same way (66 neighbours; its own FlyWire sisters top the list at 0.78, FAFB at 0.74). Where does your original hemibrain neuron rank in the reverse direction?
  - **A third dataset:** bridge hemibrain → FAFB via `Uniglomerular mALT DA1 lPN#R1` (`VFB_00101201`, score 0.68) and check its type annotation agrees.
  - **Chat:** *"Which FlyWire neuron is the closest NBLAST match to hemibrain neuron VFB_jrchjtdf? …"* — a sister individual; do you get the same FlyWire cell?

when_to_use: |
  - **API** for a defensible, reproducible mapping with NBLAST scores
  - **MCP/Chat** to explore candidates quickly before formal analysis
---

Cross-dataset identity via shared typing and morphology.

**Key question:** *Is this FlyWire neuron the same cell as that hemibrain one?*

