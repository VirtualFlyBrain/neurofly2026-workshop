---
title: "P7 · Putting It Together"
description: "A mini-project using all routes"
weight: 7
route: python
python_content: |
  A guided mini-project that uses all the tools together.
  
  ```python
  from vfb_connect import vfb
  import navis
  
  # 1. Find neurons in a region
  region_neurons = vfb.get_terms_by_region("mushroom body")
  
  # 2. Pick one and get its instances
  instances = vfb.get_instances(region_neurons['type'].iloc[0])
  
  # 3. Visualize
  skeletons = vfb.get_skeletons(instances['vfb_id'].head(3).tolist())
  navis.plot3d(skeletons)
  
  # 4. Get connectivity
  partners = vfb.get_neurons_downstream_of(instances['vfb_id'].iloc[0], top_n=5)
  
  # 5. Find cross-dataset matches
  matches = vfb.get_similar_neurons(instances['vfb_id'].iloc[0])
  
  # 6. Check expression
  expression = vfb.get_transcriptomic_profile(region_neurons['type'].iloc[0])
  ```

mcp_content: |
  Chain multiple queries together in a conversation.

mcp_prompt: |
  Starting from the mushroom body: find its intrinsic neuron types, pick one, show it, list its main partners, find its closest match in another connectome, and summarise any expression data — give me all the VFB IDs so I can reproduce this in vfb_connect.

chat_content: |
  Walk through the same chain one question at a time in chat. Each question builds on the previous answer.
  
  **Step-by-step prompts:**
  1. "What neuron types are intrinsic to the mushroom body?"
  2. "Show me instances of Kenyon cell with VFB IDs."
  3. "What are the top 5 downstream partners of KCg-m_R?"
  4. "Which neurons have a similar morphology to KCg-m_R?"
  5. "What expression data exists for Kenyon cells?"
  
  Use the names the chat itself uses in its answers — plain names resolve better than IDs pasted into long questions.

chat_screenshot: "/img/chat-p7-together.png"

chat_screenshot_alt: "VFB Chat showing multi-step conversation exploring mushroom body neurons through discovery, visualization, connectivity, and expression"

browser_content: |
  The whole P1→P6 chain works as one browsing session — every answer is a link to the next question, and the History menu retraces your steps.

  1. **Start from the region.** Search *mushroom body* — the suggestion list's facet tags already separate the neuropil, its parts and its larval counterpart. Pick **mushroom body (FBbt_00005801)**.

     ![Searching for the mushroom body](/img/browser-search.png)

  2. **Survey what VFB can tell you.** The region's query menu is the whole workshop in miniature: **Neurons with ▸** (innervating here), **Tract/Nerves innervating here**, **Lineage clones**, **Subclasses**, **Parts of mushroom body**, **Reports of transgene expression**, and **List all available images**.

     ![The query menu for the mushroom body](/img/browser-p7-mb-queries.png)

  3. **Region → type.** Run **Neurons with ▸ some part here** and pick a Kenyon cell from the results — or go via *Parts of mushroom body* to the calyx and its intrinsic neurons.

  4. **Type → instance → partners.** From the Kenyon cell's term page, list its images (P1), tick one into the 3D viewer (P3), and run *Neurons connected to…* on it (P4).

  5. **Instance → matches → expression.** NBLAST its neighbours (P5), then check *Reports of transgene expression* for the type (P6).

  6. **Keep the trail.** The **History** menu (top bar) lists every term and query you touched, and the final URL encodes your finished scene — paste it anywhere to hand a colleague your entire session.

  **Worth noticing:** you never typed an ID. The graph carried you from a word ("mushroom body") to specific, citable individuals with IDs — which is exactly what you then feed to `vfb_connect` to make it reproducible.

browser_url: "https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?id=FBbt_00005801"

when_to_use: |
  This is where the three routes complement each other most:
  - **Chat/MCP** for exploration and hypothesis generation
  - **Python API** for reproducible analysis and figures
  - **3D Browser** for spatial understanding throughout
  
  A good habit: explore with chat/MCP, capture the IDs, then reproduce with `vfb_connect`.
---

A short guided mini-project using all three routes. Do it once with the API and once conversationally, and compare.

**Key question:** *Region → intrinsic types → pick one → visualise → partners → cross-dataset match → expression.*
