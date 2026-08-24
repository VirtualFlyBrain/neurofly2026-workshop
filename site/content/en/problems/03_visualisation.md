---
title: "P3 · Visualisation"
description: "Show these neurons together in a common template"
weight: 3
route: python
python_content: |
  Load skeletons with `navis` and plot them co-registered in a common template space.
  
  ```python
  import navis
  from vfb_connect import vfb
  
  # Get neuron skeletons
  neurons = vfb.get_skeletons(["VFB_jrchjtdb", "VFB_fw035286"])
  
  # Plot in 3D
  navis.plot3d(neurons, color=['red', 'blue'])
  ```

mcp_content: |
  Request 3D visualisation through the MCP tool.

mcp_prompt: |
  Show me the 3D image of neuron VFB_jrchjtdb and two of its strongest partners in the same template.

chat_content: |
  Chat can help you find neurons to visualise, though for publication-quality figures you'll want the Python API.
  
  **Optimized prompt:** Ask by the neuron's name for its images plus key facts in one question.

chat_query: "Show me images of DA1_lPN_R and tell me its neurotransmitter and which brain regions it connects to."

chat_screenshot: "/img/chat-p3-visualisation.png"

chat_screenshot_alt: "VFB Chat showing registered images of DA1_lPN_R with neurotransmitter prediction and connected regions"

browser_content: |
  The Circuit Browser provides interactive 3D visualization with no code.

browser_url: "https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?id=VFB_jrchjtdb"

when_to_use: |
  - **API/navis** for publication figures and morphometric measurements
  - **MCP/Chat** for a quick look and orientation
  - **3D Browser** for interactive exploration without code
---

Load skeletons/meshes with `navis` (+ `pymaid`/neuPrint loaders), plot co-registered.

**Key question:** *Show these neurons together in a common template.*
