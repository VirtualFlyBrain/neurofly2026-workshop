---
title: "P1 · Discovery"
description: "Find every instance of a neuron type across all datasets"
weight: 1
route: python
python_content: |
  Use `vfb.get_instances()` to search for a neuron type by name. The ontology gives each cell type one name, so a single query spans FlyWire, hemibrain, BANC, male-CNS, MANC, optic-lobe and CATMAID datasets at once.
  
  ```python
  from vfb_connect import vfb
  
  # Search for DA1 lPN neurons
  df = vfb.get_instances("DA1 lPN")
  print(f"Found {len(df)} instances across datasets")
  print(df[['dataset', 'vfb_id', 'label']])
  ```
  
  **Expected result:** ~68 individual neurons classified as DA1 lPN across multiple datasets.

mcp_content: |
  The MCP tool can search VFB conversationally and return structured results with identifiers.

mcp_prompt: |
  Search VFB for the neuron type 'DA1 lPN' and list every individual neuron across all datasets, with their dataset and VFB ID.

chat_content: |
  VFB Chat provides a zero-install way to discover neurons. It stays focused on Drosophila neuroanatomy and answers from VFB's data.
  
  **Optimized prompt:** Ask for the count and list with IDs in one question.

chat_query: "List all DA1 lPN neurons in VFB with their VFB IDs and which datasets they're in (FlyWire, hemibrain, BANC, etc)."

chat_screenshot: "/img/chat-p1-discovery.png"

chat_screenshot_alt: "VFB Chat showing 68 DA1 lPN neurons listed with VFB IDs and dataset names"

browser_content: |
  The 3D Circuit Browser lets you explore neuron instances spatially. Search for the type and see all instances overlaid in template space.

browser_url: "https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?q=DA1_lPN"

when_to_use: |
  - **Chat** to find the right name fast and get oriented
  - **MCP** when you want conversational search with structured output
  - **Python API** when you need the full table for downstream analysis and reproducibility
---

The ontology gives each cell type one name, so a single query spans FlyWire, hemibrain, BANC, male-CNS, MANC, optic-lobe and CATMAID datasets at once.

**Key question:** *Find all instances of a neuron type across every dataset.*
