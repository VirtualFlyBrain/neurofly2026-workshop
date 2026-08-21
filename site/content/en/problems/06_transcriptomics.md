---
title: "P6 · Transcriptomics"
description: "What's this cell type's expression profile and marker genes?"
weight: 6
route: python
python_content: |
  Query transcriptomics data linking cell types to scRNAseq clusters and expressed genes.
  
  ```python
  from vfb_connect import vfb
  
  # Get expression profile for a cell type
  expression = vfb.get_transcriptomic_profile("DA1 lPN")
  print(expression[['gene', 'expression_level', 'cluster']])
  
  # Find marker genes
  markers = vfb.get_marker_genes("DA1 lPN")
  print(markers)
  ```

mcp_content: |
  Ask about expression data and marker genes.

mcp_prompt: |
  For cell type 'DA1 lPN', what scRNAseq / expression data does VFB have, and which marker genes are associated with it?

chat_content: |
  Chat can survey what expression data exists for a cell type.

chat_query: "What genes are expressed in the DA1 lPN cell type?"

browser_content: |
  The Circuit Browser can overlay expression data on neurons.

browser_url: "https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?q=DA1_lPN&expression=true"

when_to_use: |
  - **API** to join expression data to connectivity for analysis
  - **MCP/Chat** to survey what expression data exists
  - **3D Browser** to visualize expression patterns spatially
---

The connectomics–transcriptomics bridge — the through-line of the workshop.

**Key question:** *What's this cell type's expression profile and marker genes?*
