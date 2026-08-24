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
  Explore the complete workflow in the Circuit Browser.

browser_url: "https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?q=mushroom_body"

when_to_use: |
  This is where the three routes complement each other most:
  - **Chat/MCP** for exploration and hypothesis generation
  - **Python API** for reproducible analysis and figures
  - **3D Browser** for spatial understanding throughout
  
  A good habit: explore with chat/MCP, capture the IDs, then reproduce with `vfb_connect`.
---

A short guided mini-project using all three routes. Do it once with the API and once conversationally, and compare.

**Key question:** *Region → intrinsic types → pick one → visualise → partners → cross-dataset match → expression.*
