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
  Request NBLAST results through the MCP tool.

mcp_prompt: |
  Run an NBLAST query for neuron VFB_jrchjtdb and return the top matches with scores across datasets; note which come from BANC or male-CNS.

chat_content: |
  Chat can help you find similar neurons.
  
  **Optimized prompt:** Ask for top matches with scores and dataset names.

chat_query: "Which neurons have a similar morphology to DA1_lPN_R? Give the top 5 NBLAST matches with scores and which dataset each is from."

chat_screenshot: "/img/chat-p5-similarity.png"

chat_screenshot_alt: "VFB Chat showing top NBLAST matches for DA1_lPN_R with scores across hemibrain, FAFB, FlyWire and FlyCircuit"

browser_content: |
  The Circuit Browser includes NBLAST search functionality.

browser_url: "https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?nblast=VFB_jrchjtdb"

when_to_use: |
  - **API** when scores and thresholds matter for your analysis
  - **MCP/Chat** for a fast shortlist of candidates
  - **3D Browser** for interactive similarity exploration
---

NBLAST via VFB / `navis`; rank matches with scores across datasets.

**Key question:** *What's the morphological match to this neuron in another dataset?*
