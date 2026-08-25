---
title: "P4 · Connectomics"
description: "Who are neuron X's strongest partners, and along what pathway?"
weight: 4
route: python
python_content: |
  Two levels, both one call. For an **individual**, the term object serves the pre-computed partner list; for **types**, `get_connected_neurons_by_type` compares across whole connectomes.

  ```python
  from vfb_connect import vfb

  # individual: ranked partners of one hemibrain DA1 lPN
  da1 = vfb.term("VFB_jrchjtdb")
  for p in da1.downstream_partners(weight=20)[:5]:
      print(p)

  # type-to-type across datasets
  kc = vfb.get_connected_neurons_by_type(upstream_type='DA1 lPN',
                                         downstream_type='Kenyon cell',
                                         weight=10, return_dataframe=True)
  print(len(kc), "DA1 lPN → Kenyon cell pairs (weight ≥ 10)")
  ```

  **Verified output** (Aug 2026):

  ```text
  Partner(weight=73, partner=v2LN30_R (FlyEM-HB:1671620613))
  Partner(weight=61, partner=lLN2T_c(Tortuous)_R (FlyEM-HB:1704347707))
  Partner(weight=61, partner=DA1_vPN_R (FlyEM-HB:733316908))
  Partner(weight=47, partner=lLN2P_b(Patchy)_R (FlyEM-HB:1946178096))
  Partner(weight=43, partner=lLN2T_c(Tortuous)_R (FlyEM-HB:1671292719))

  1132 DA1 lPN → Kenyon cell pairs (weight ≥ 10)
  ```

  **Gotcha to teach:** `get_connected_neurons_by_type` defaults to `exclude_dbs=['hb','fafb']` (to avoid double-counting the overlapping hemibrain/FAFB volumes) — so those 1,132 pairs are FlyWire + male-CNS + BANC. Pass `exclude_dbs=[]` to include everything.

mcp_content: |
  The connectivity of any connectome neuron is a pre-computed query — the assistant fetches all partners with per-direction synapse counts and does the ranking itself:

  > **You:** For neuron VFB_jrchjtdb, list the top 10 downstream partners by synaptic weight.
  >
  > **Assistant** → `get_term_info(VFB_jrchjtdb)` → *NeuronNeuronConnectivityQuery* (count **484**)
  > → `run_query(VFB_jrchjtdb, NeuronNeuronConnectivityQuery, limit=0)` → 484 partners, each with **outputs** and **inputs** synapse counts → sorts by outputs
  >
  > **Assistant:** VFB holds 484 connected neurons for DA1_lPN_R (FlyEM-HB:1734350908). Top 10 by output synapses: v2LN30_R (73), DA1_vPN_R (61), lLN2T_c(Tortuous)_R (61), lLN2P_b(Patchy)_R (47), lLN2P_c(Patchy)_R (43), lLN2T_c(Tortuous)_R #2 (43), lLN2T_e(Tortuous)_R (33), LHAV4a4_R ×2 (30 each), M_vPNml55_R (30) — each with its VFB ID (VFB_jrchk8e8, VFB_jrchjtdh, …). *ConnectivityPerRegion* breaks the same edges down by neuropil for the "which are in the mushroom body?" follow-up.

  **Worth noticing:** the chat route's answer for "DA1_lPN_R" used a *different individual* (FlyEM-HB:1734350788) and got different counts. Individuals are not interchangeable — always keep the ID.

mcp_prompt: |
  For neuron VFB_jrchjtdb, list the top 10 downstream partners by synaptic weight, and tell me which are in the mushroom body.

chat_content: |
  Chat can provide connectivity summaries.
  
  **Optimized prompt:** Specify top N partners and ask for synaptic weights with IDs.

chat_query: "Which neurons are downstream of DA1_lPN_R? List the 10 strongest partners with synapse counts and VFB IDs."

chat_screenshot: "/img/chat-p4-connectomics.png"

chat_screenshot_alt: "VFB Chat ranking the 10 strongest downstream partners of DA1_lPN_R with synapse counts and VFB IDs"

browser_content: |
  Connectivity in the browser is one click from any connectome neuron, and the table it returns is sortable and downloadable.

  1. **Open a connectome neuron.** Use the button below for the Male CNS **DA1_lPN_R (MaleCNS:13064)**. In its Term Info, the *Query For* section already offers **Neurons connected to DA1_lPN_R** with the partner count (581).

  2. **Run it.** The results list every partner with **Outputs** and **Inputs** columns — synapse counts in each direction. Click the *Outputs* header to rank downstream partners: the local neuron v2LN30, sister DA1 vPN, lateral horn and Kenyon cell targets fall out exactly as in the Python route.

     ![Partners of DA1_lPN_R ranked by output synapses](/img/browser-p4-connectivity.png)

  3. **Chase the circuit.** Every partner name is a link — click one and its term page opens with its own connectivity query, so you can walk the circuit hop by hop. Tick checkboxes to pile the pathway up in the 3D viewer as you go.

  4. **Take it to Python.** *Download results (CSV)* gives you the same table with IDs, ready for `vfb_connect`.

  **Worth noticing:** the instance query menu also offers **Show connectivity per region** — the same partners broken down by neuropil, which answers "which of these connections are in the mushroom body?" without any code.

browser_url: "https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?id=VFB_jrmc37h9"

when_to_use: |
  - **API** for quantitative partner tables and multi-hop pathway analysis
  - **MCP/Chat** to orient and get quick summaries
  - **3D Browser** for interactive connectivity exploration
---

VFB connectivity queries and neuPrint for weighted partners; trace a short pathway.

**Key question:** *Who are neuron X's strongest partners, and along what pathway?*

### Try it next

- **How stable is a ranking?** Run the same question on the sister individual `VFB_jrchjtdf` (FlyEM-HB:1734350788) — its top partners are v2LN30_R (60), DA1_vPN_R (59), lLN2T_c (47). Same cast, different counts: how much do individual neurons of one type vary?
- **Which partners are Kenyon cells?** At type level, `get_connected_neurons_by_type(upstream_type='DA1 lPN', downstream_type='Kenyon cell', weight=10)` → 1,132 pairs — now try other downstream types (lateral horn neurons?).
- **By region:** the browser/MCP *Show connectivity per region* query breaks the same 484 partners down across 11 neuropils — which fraction of the output is in the mushroom-body calyx?
