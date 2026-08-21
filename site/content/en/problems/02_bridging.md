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

chat_query: "Is there a hemibrain equivalent of FlyWire neuron VFB_fw035286, and do they share a cell type?"

browser_content: |
  Visualize both neurons together in template space to assess morphological similarity.

browser_url: "https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?id=VFB_fw035286,VFB_jrchjtdb"

when_to_use: |
  - **API** for a defensible, reproducible mapping with NBLAST scores
  - **MCP/Chat** to explore candidates quickly before formal analysis
---

Cross-dataset identity via shared typing and morphology.

**Key question:** *Is this FlyWire neuron the same cell as that hemibrain one?*
