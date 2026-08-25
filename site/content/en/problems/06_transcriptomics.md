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
  
  **Optimized prompt:** Ask for both expression profile and marker genes with IDs.

chat_query: "What scRNAseq expression data does VFB hold for Kenyon cells? Name the datasets and list the top marker genes with expression levels."

chat_screenshot: "/img/chat-p6-transcriptomics.png"

chat_screenshot_alt: "VFB Chat showing scRNAseq datasets and marker gene expression levels for Kenyon cells"

browser_content: |
  Honest answer: the Circuit Browser is not the tool for expression *tables* — scRNAseq matrices live in the chat, MCP and Python routes. What the browser does give you is expression **anatomy**:

  1. **Open the cell type.** Use the button below for **Kenyon cell (FBbt_00003686)**.

  2. **Find reported expression.** In the query menu, run **Reports of transgene expression in Kenyon cell** — the driver lines and transgenes reported to express here, each linking to its own term page with registered images.

  3. **See the pattern, not just the number.** Tick a driver-line image and the expression pattern loads over the template next to the neurons it labels — the visual complement to the marker-gene lists the other routes return.

  4. **Cross-check a marker's driver.** Found an interesting gene via scRNAseq in another route? Search its driver line here and confirm where it actually expresses.

  No screenshots needed for this one — the flow is identical to P1's search-and-query pattern. For expression levels and cluster tables, flip to Route A (Python) or Route C (Chat).

browser_url: "https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?id=FBbt_00003686"

when_to_use: |
  - **API** to join expression data to connectivity for analysis
  - **MCP/Chat** to survey what expression data exists
  - **3D Browser** to visualize expression patterns spatially
---

The connectomics–transcriptomics bridge — the through-line of the workshop.

**Key question:** *What's this cell type's expression profile and marker genes?*
