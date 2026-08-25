---
title: "P2 · Bridging & Identity"
description: "Is this FlyWire neuron the same cell as that hemibrain one?"
weight: 2
route: python
python_content: |
  Cross-dataset identity via shared typing and morphology. Resolve both IDs, compare their ontology types, and confirm with NBLAST.
  
  ```python
  from vfb_connect import vfb
  
  # Get neuron info from both datasets
  fw_neuron = vfb.get_instances_by_id("VFB_fw035286")
  hb_neuron = vfb.get_instances_by_id("VFB_jrchjtdb")
  
  # Compare cell types
  print(f"FlyWire type: {fw_neuron['cell_type'].iloc[0]}")
  print(f"Hemibrain type: {hb_neuron['cell_type'].iloc[0]}")
  ```

mcp_content: |
  Ask the MCP tool to find cross-dataset matches and compare cell types.

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

  1. **Open the hemibrain neuron.** Use the button below to open **DA1_lPN_R (FlyEM-HB:1734350908)** — VFB_jrchjtdb. Its EM volume loads in the Slice Viewer and the skeleton appears in 3D.

  2. **Run the NBLAST query.** Click the *Queries for DA1_lPN_R…* bar, hover **Neurons with ▸** and choose **Neurons with similar morphology to DA1_lPN_R [NBLAST mean score]**.

  3. **Read the results across datasets.** 107 neighbours arrive sorted by score. The **Template_Space** and **Imaging_Technique** columns tell you where each match lives — JRCFIB2018Fum is the hemibrain, FAFB and FlyWire rows are a *different animal*. A high-scoring row from another dataset annotated with the same cell type is your bridge.

     ![NBLAST neighbours of DA1_lPN_R sorted by score](/img/browser-p5-nblast-results.png)

  4. **Check the match visually.** Tick the query neuron and a candidate match: both load into the 3D viewer aligned to the same template, so you can rotate and confirm the morphology agrees — the step no table can give you.

  **Worth noticing:** identity across datasets is a judgement, not a lookup — scores drop smoothly and a different type (DL3 lPN) appears among the true DA1 matches. The browser makes that ambiguity visible.

browser_url: "https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?id=VFB_jrchjtdb"

when_to_use: |
  - **API** for a defensible, reproducible mapping with NBLAST scores
  - **MCP/Chat** to explore candidates quickly before formal analysis
---

Cross-dataset identity via shared typing and morphology.

**Key question:** *Is this FlyWire neuron the same cell as that hemibrain one?*
