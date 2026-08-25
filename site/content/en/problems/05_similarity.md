---
title: "P5 · Similarity / NBLAST"
description: "What's the morphological match in another dataset?"
weight: 5
route: python
python_content: |
  Run NBLAST queries via VFB or navis to find morphological matches.
  
  ```python
  from vfb_connect import vfb
  
  # NBLAST search
  matches = vfb.get_similar_neurons("VFB_jrchjtdb", similarity_score='NBLAST_score')
  print(matches[['match_id', 'match_name', 'dataset', 'NBLAST_score']].head(10))
  ```

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
