---
title: "Session 6 · Transcriptomics"
slug: "session-6-transcriptomics"
aliases: ["/problems/p6-transcriptomics/"]
description: "What's this cell type's expression profile and marker genes?"
weight: 6
route: python
colab_python: "https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/python/06_Transcriptomics.ipynb"

colab_r: "https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/R/06_Transcriptomics_R.ipynb"

python_content: |
  Pick a type that actually has expression data, then pull its full profile. **Do not** profile the parent class — "Kenyon cell" expands 37 subtypes and takes 15–20 minutes; a specific subtype returns in under a minute.

  ```python
  from vfb_connect import vfb

  e = vfb.get_transcriptomic_profile("alpha/beta Kenyon cell",
                                     return_dataframe=True)
  print(len(e), "gene × cluster rows")
  print(e[['gene', 'level', 'extent', 'ref']].head(3))
  ```

  **Verified output** (Aug 2026, ~40 s):

  ```text
  18234 gene × cluster rows
      gene       level    extent                                           ref
   14-3-3ε   761.69006  0.551111  Lu et al., 2023, Science 380(6650): eadg0934
   14-3-3ε   998.50635  0.446281  Lu et al., 2023, Science 380(6650): eadg0934
   14-3-3ε  1092.53160  0.441065  Lu et al., 2023, Science 380(6650): eadg0934
  ```

  Each row is one gene in one cluster with expression `level` and `extent` (fraction of cells expressing), and a real publication reference (Lu 2023, Davie 2018, …). Check a type has data before profiling: `search()` results carry a `hasScRNAseq` facet. (The spine neuron DA1 lPN has **no** transcriptomic profile — which is why this problem hands over to Kenyon cells.)

r_content: |
  ```r
  e <- vfb$get_transcriptomic_profile("alpha/beta Kenyon cell",
                                      return_dataframe = TRUE)
  nrow(e)
  head(e[, c("gene", "level", "extent")], 3)
  ```

  Returns the same **18,234 gene × cluster rows** (~40 s) as the Python route, as an R data frame — `level`, `extent` (fraction of cells expressing) and a real publication `ref` per row, ready for `dplyr`/`ggplot2`. The same warnings apply: profile a *specific subtype*, never the bare parent class ("Kenyon cell" expands 37 subtypes and takes 15–20 minutes), and check a type has data first via the `hasScRNAseq` search facet.

mcp_content: |
  This is where the MCP route shines over the browser: scRNAseq coverage is a first-class query.

  > **You:** For cell type 'Kenyon cell', what scRNAseq data does VFB have, and from which studies?
  >
  > **Assistant** → `get_term_info(FBbt_00003686)` → *anatScRNAseqQuery* available (count **79**)
  > → `run_query(FBbt_00003686, anatScRNAseqQuery)` → 79 clusters, each with cell type, dataset and publication (PMID/DOI)
  >
  > **Assistant:** VFB links **79 scRNAseq clusters** to Kenyon cells and their subtypes, including: Davie 2018 (Cell, PMID 29909982) with separate α′/β′, α/β and γ clusters; Baker 2021 (Genome Res., PMID 34035044) female/male/mixed-sex adult KC clusters; Brunet Avalos 2019 (eLife) larval KCs; Mokashi 2021 (Front. Psychiatry). Each cluster record links its expressed genes with per-cluster expression levels — ask "top marker genes for the α/β cluster" to drill in.

  **Tip:** ask your assistant to *check which subtypes have data first* (the cluster list above) rather than requesting a full profile of the parent class — "Kenyon cell" spans 37 subclasses and the full expansion is slow in every route.

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

  No screenshots needed for this one — the flow is identical to Session 1's search-and-query pattern. For expression levels and cluster tables, flip to Route A (Python), Route B (R) or Route D (Chat).

browser_url: "https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?id=FBbt_00003686"

try_next: |
  - **Subtype contrast:** profile `"adult Kenyon cell"` (69,168 rows, ~70 s) and compare which markers separate the γ clusters from α/β in the Davie 2018 data.
  - **Chat:** *"What single-cell transcriptomic clusters are there for Kenyon cell?"* lists all 79 with their publications — pick one cluster and ask for its top markers.
  - **Check before you query:** search any other cell type and look for the `hasScRNAseq` facet before requesting a profile — which of *your* favourite types has data?

when_to_use: |
  - **API** to join expression data to connectivity for analysis
  - **MCP/Chat** to survey what expression data exists
  - **3D Browser** to visualize expression patterns spatially
---

The connectomics–transcriptomics bridge — the through-line of the workshop.

**Key question:** *What's this cell type's expression profile and marker genes?*

