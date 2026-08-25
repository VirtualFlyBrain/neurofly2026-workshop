---
title: "P5 · Similarity / NBLAST"
description: "What's the morphological match in another dataset?"
weight: 5
route: python
python_content: |
  NBLAST scores are pre-computed — one call returns the ranked table with dataset provenance.

  ```python
  from vfb_connect import vfb

  m = vfb.get_similar_neurons("VFB_jrchjtdb",
                              similarity_score='NBLAST_score',
                              return_dataframe=True)
  print(len(m), "neighbours")
  print(m[['id', 'score', 'label', 'source_id']].head(7))
  ```

  **Verified output** (Aug 2026):

  ```text
  107 neighbours
            id  score                                       label                             source_id
  VFB_jrchjtde   0.80              DA1_lPN_R (FlyEM-HB:754534424)  neuprint_JRC_Hemibrain_1point2point1
  VFB_jrchjtdg   0.76              DA1_lPN_R (FlyEM-HB:754538881)  neuprint_JRC_Hemibrain_1point2point1
  VFB_jrchjtdf   0.76             DA1_lPN_R (FlyEM-HB:1734350788)  neuprint_JRC_Hemibrain_1point2point1
  VFB_jrchjtda   0.75              DA1_lPN_R (FlyEM-HB:722817260)  neuprint_JRC_Hemibrain_1point2point1
  VFB_jrchjtdd   0.75             DA1_lPN_R (FlyEM-HB:5813039315)  neuprint_JRC_Hemibrain_1point2point1
  VFB_00101201   0.68  Uniglomerular mALT DA1 lPN#R1 (FAFB:57323)                          catmaid_fafb
  VFB_fw036329   0.68   AL.MB_CA.111 (FlyWire:720575940605102694)                            flywire783
  ```

  Sisters in the same volume top the list (0.75–0.80); the first cross-dataset matches arrive at 0.68, and morphologically similar *other* types appear further down with no clean score gap — sort, inspect, judge.

r_content: |
  ```r
  m <- vfb$get_similar_neurons("VFB_jrchjtdb",
                               similarity_score = "NBLAST_score",
                               return_dataframe = TRUE)
  nrow(m)
  head(m[, c("id", "score", "label")], 7)
  ```

  **Verified output** (Aug 2026): 107 neighbours; hemibrain sisters at 0.80–0.75, then `VFB_00101201` (FAFB) and `VFB_fw036329` (FlyWire) tied at **0.68** — the same table as the Python route, ready for `dplyr`. Split it by dataset with `m |> dplyr::mutate(dataset = sub("_.*", "", source_id))` and compare score distributions per volume.

mcp_content: |
  NBLAST similarity is served ranked, with dataset provenance on every row:

  > **You:** Run an NBLAST query for neuron VFB_jrchjtdb and return the top matches with scores across datasets.
  >
  > **Assistant** → `run_query(VFB_jrchjtdb, SimilarMorphologyTo)` → **107** neighbours, score-sorted
  >
  > **Assistant:** Top matches: DA1_lPN_R (FlyEM-HB:754534424) **0.80**, DA1_lPN_R (FlyEM-HB:754538881) **0.76**, DA1_lPN_R (FlyEM-HB:1734350788) **0.76**, DA1_lPN_R (FlyEM-HB:722817260) **0.75**, DA1_lPN_R (FlyEM-HB:5813039315) **0.75** — all hemibrain. The first cross-dataset hits arrive at **0.68**: Uniglomerular mALT DA1 lPN#R1 (FAFB) and AL.MB_CA.111 (FlyWire). Scores fall smoothly, and morphologically similar *other* types appear further down — there is no clean threshold, so treat the ranking as evidence to inspect, not a verdict.

  Ask "load the top 5 into the 3D viewer" and the assistant can build the scene URL from the IDs in the same result.

mcp_prompt: |
  Run an NBLAST query for neuron VFB_jrchjtdb and return the top matches with scores across datasets; note which come from BANC or male-CNS.

chat_content: |
  Chat can help you find similar neurons.
  
  **Optimized prompt:** Ask for top matches with scores and dataset names.

chat_query: "Which neurons have a similar morphology to DA1_lPN_R? Give the top 5 NBLAST matches with scores and which dataset each is from."

chat_screenshot: "/img/chat-p5-similarity.png"

chat_screenshot_alt: "VFB Chat showing top NBLAST matches for DA1_lPN_R with scores across hemibrain, FAFB, FlyWire and FlyCircuit"

browser_content: |
  NBLAST similarity is a stored query in the browser — no R, no registration, instant answer.

  1. **Open the query neuron.** Use the button below for hemibrain **DA1_lPN_R (FlyEM-HB:1734350908)** (VFB_jrchjtdb), aligned to the JRC2018Unisex template so every match can be compared in the same space.

  2. **Find the query.** Click the *Queries for DA1_lPN_R…* bar and hover **Neurons with ▸**:

     ![The NBLAST query in the instance query menu](/img/browser-p5-nblast-menu.png)

  3. **Read the ranked matches.** 107 neighbours, **Score** column pre-sorted (top hits ≈0.8). Type, dataset (Template_Space) and imaging technique come along for each row, with thumbnails.

     ![NBLAST results sorted by score](/img/browser-p5-nblast-results.png)

  4. **Overlay the top hits.** Tick the query neuron plus the top few matches — they load aligned in the 3D viewer so you can see *why* they scored high, and where the lower-scoring ones diverge.

  **Worth noticing:** scores fall smoothly with no clean threshold, and a morphologically similar *different* type (DL3 lPN, ≈0.65) sits among the DA1 matches — sort, look, and judge rather than trusting a cut-off.

browser_url: "https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?id=VFB_jrchjtdb&i=VFB_00101567,VFB_jrchjtdb"

when_to_use: |
  - **API** when scores and thresholds matter for your analysis
  - **MCP/Chat** for a fast shortlist of candidates
  - **3D Browser** for interactive similarity exploration
---

NBLAST via VFB / `navis`; rank matches with scores across datasets.

**Key question:** *What's the morphological match to this neuron in another dataset?*

### Try it next

- **Does the ranking replicate?** Run the identical query from another hemibrain sister, `VFB_jrchjtdd` — it returns ~112 neighbours. Do the FlyWire and FAFB matches keep their order?
- **Find the impostor:** somewhere below the DA1 matches sits DL3_lPN_R (a *different* glomerulus) at ≈0.65 — locate it in your table and compare its score with the genuine cross-dataset matches above it. What threshold would you have had to pick?
- **Close the loop in 3D:** tick the query neuron plus the 0.68 FlyWire match in the browser and rotate — can you see *why* the score dropped from the 0.80 in-dataset match?
