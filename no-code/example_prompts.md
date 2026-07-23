# Example prompts — MCP (B) & chat (C), by problem

Copy-paste starting points for the natural-language routes. Each maps to a problem card in
[`../problems/`](../problems/) and to the Python route (A) in the notebooks. Adjust the neuron type,
region, gene or dataset to your own interest.

> Tip: end MCP/chat prompts with *"…and list the VFB IDs"* so you can reproduce the result with
> `vfb_connect`.

## P1 · Discovery — find a neuron type across datasets
- **B (MCP):** "Search VFB for the neuron type 'DA1 lPN' (or a type I care about) and list every
  individual neuron across all datasets, with their dataset and VFB ID."
- **C (chat):** "Where do I find DA1 lPN neurons in VFB, and which connectomes have them?"

## P2 · Bridging — is this the same cell in another dataset?
- **B:** "Here's a FlyWire neuron VFB_id X. Find the morphologically closest neuron in the hemibrain
  and tell me if they're annotated as the same type."
- **C:** "Is there a hemibrain equivalent of this FlyWire neuron, and do they share a cell type?"

## P3 · Visualisation — see neurons together
- **B:** "Show me the 3D image of neuron X and two of its strongest partners in the same template."
- **C:** "Show me what neuron X looks like."

## P4 · Connectomics — strongest partners & pathway
- **B:** "For neuron X, list the top 10 downstream partners by synaptic weight, and tell me which are
  in the mushroom body."
- **C:** "Who does neuron X connect to most strongly?"

## P5 · Similarity / NBLAST — cross-dataset morphological match
- **B:** "Run an NBLAST similarity query for neuron X and return the top matches with scores across
  datasets; note which come from BANC or male-CNS."
- **C:** "What neurons look most similar to neuron X?"

## P6 · Transcriptomics — expression profile of a cell type
- **B:** "For cell type T, what scRNAseq / expression data does VFB have, and which marker genes are
  associated with it?"
- **C:** "What genes are expressed in cell type T?"

## P7 · Putting it together
- **B:** "Starting from region R: find its intrinsic neuron types, pick one, show it, list its main
  partners, find its closest match in another connectome, and summarise any expression data — give
  me all the VFB IDs so I can reproduce this in vfb_connect."
- **C:** Walk the same chain one question at a time.
