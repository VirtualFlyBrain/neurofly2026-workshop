# Workshop problems — one question, three routes

These are the canonical research questions the workshop is built around. Each notebook expands one of
them; the no-code guides answer the same questions with the MCP tool and chat. Use this page as the
map.

For every problem: **A** = `vfb_connect` Python · **B** = VFB MCP tool in an LLM ·
**C** = chat.virtualflybrain.org. Pick a neuron type / region / gene you actually care about and
substitute it throughout — the workshop works best when you drive it with your own biology.

---

## P1 · Discovery — *"Find every instance of a neuron type across all datasets."*
The ontology gives each cell type one name, so a single query spans FlyWire, hemibrain, BANC,
male-CNS, MANC, optic-lobe and CATMAID datasets at once.
- **A:** `vfb.get_instances("<type name>")` → DataFrame of individuals + dataset + VFB IDs.
- **B:** *"Search VFB for `<type>` and list every individual across all datasets with IDs."*
- **C:** *"Where do I find `<type>` neurons in VFB, and which connectomes have them?"*
- **When to reach for which:** chat to find the right name fast; API when you need the full table for
  downstream steps. → `python/01_Discovery.ipynb`

## P2 · Bridging & identity — *"Is this FlyWire neuron the same cell as that hemibrain one?"*
Cross-dataset identity via shared typing and morphology.
- **A:** resolve both IDs, compare their ontology types; confirm with NBLAST (P5).
- **B:** *"Find the hemibrain match for FlyWire neuron X and say if they share a cell type."*
- **C:** *"Is there a hemibrain equivalent of this FlyWire neuron?"*
- **When:** API for a defensible, reproducible mapping; MCP/chat to explore candidates.
  → `python/02_Bridging_datasets.ipynb`

## P3 · Visualisation — *"Show these neurons together in a common template."*
- **A:** load skeletons/meshes with `navis` (+ `pymaid`/neuPrint loaders), plot co-registered.
- **B:** *"Show the 3D image of neuron X with two strong partners in the same template."*
- **C:** *"Show me what neuron X looks like."*
- **When:** API/`navis` for publication figures & measurements; MCP/chat for a quick look.
  → `python/03_Visualisation.ipynb`

## P4 · Connectomics — *"Who are neuron X's strongest partners, and along what pathway?"*
- **A:** VFB connectivity queries / neuPrint for weighted partners; trace a short pathway.
- **B:** *"Top 10 downstream partners of X by weight; flag those in the mushroom body."*
- **C:** *"Who does neuron X connect to most strongly?"*
- **When:** API for quantitative partner tables and multi-hop paths; MCP/chat to orient.
  → `python/04_Connectomics.ipynb`

## P5 · Similarity / NBLAST — *"What's the morphological match in another dataset?"*
- **A:** NBLAST via VFB / `navis`; rank matches with scores across datasets.
- **B:** *"Run an NBLAST query for X; return top cross-dataset matches with scores."*
- **C:** *"What neurons look most similar to X?"*
- **When:** API when scores/thresholds matter; MCP/chat for a fast shortlist.
  → `python/05_Similarity_NBLAST.ipynb`

## P6 · Transcriptomics — *"What's this cell type's expression profile / marker genes?"*
The connectomics↔transcriptomics bridge — the through-line of the 2024 workshop, updated.
- **A:** VFB transcriptomics queries linking cell types ↔ scRNAseq clusters / expressed genes.
- **B:** *"What expression data does VFB have for cell type T, and its marker genes?"*
- **C:** *"What genes are expressed in cell type T?"*
- **When:** API to join expression to connectivity; MCP/chat to survey what exists.
  → `python/06_Transcriptomics.ipynb`

## P7 · Putting it together — *a mini-project*
Region → intrinsic types → pick one → visualise → partners → cross-dataset match → expression.
Do it once with the API and once conversationally, and compare. → `python/07_Putting_it_together.ipynb`

---

### The recurring "when to reach for which"
- **chat.virtualflybrain.org** — zero setup, on-topic, teaching & quick lookups.
- **MCP tool in your LLM** — conversational + chainable with your own reasoning/tools.
- **`vfb_connect`** — reproducible, scriptable, the route for anything you'll publish.

A good habit: **explore** with chat/MCP, **capture the IDs**, then **reproduce** with `vfb_connect`.
