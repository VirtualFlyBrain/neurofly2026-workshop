---
title: "P4 · Connectomics"
description: "Who are neuron X's strongest partners, and along what pathway?"
weight: 4
route: python
python_content: |
  Query connectivity with weighted partner lists.
  
  ```python
  from vfb_connect import vfb
  
  # Get downstream partners
  partners = vfb.get_neurons_downstream_of("VFB_jrchjtdb", top_n=10)
  print(partners[['partner_id', 'partner_name', 'synapse_count', 'weight']])
  
  # Filter for mushroom body neurons
  mb_partners = partners[partners['region'].str.contains('mushroom body', case=False)]
  print(f"Mushroom body partners: {len(mb_partners)}")
  ```

mcp_content: |
  Ask for connectivity with specific filters.

mcp_prompt: |
  For neuron VFB_jrchjtdb, list the top 10 downstream partners by synaptic weight, and tell me which are in the mushroom body.

chat_content: |
  Chat can provide connectivity summaries.
  
  **Optimized prompt:** Specify top N partners and ask for synaptic weights with IDs.

chat_query: "List the top 10 downstream partners of neuron VFB_jrchjtdb by synapse count. Include their VFB IDs, names, and synaptic weights."

chat_screenshot: "/img/chat-p4-connectomics.png"

chat_screenshot_alt: "VFB Chat showing top 10 downstream partners with VFB IDs and synapse counts"

browser_content: |
  The Circuit Browser shows connectivity graphically with interactive exploration.

browser_url: "https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?id=VFB_jrchjtdb&connectivity=true"

when_to_use: |
  - **API** for quantitative partner tables and multi-hop pathway analysis
  - **MCP/Chat** to orient and get quick summaries
  - **3D Browser** for interactive connectivity exploration
---

VFB connectivity queries and neuPrint for weighted partners; trace a short pathway.

**Key question:** *Who are neuron X's strongest partners, and along what pathway?*
