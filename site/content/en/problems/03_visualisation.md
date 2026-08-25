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
  `get_term_info` returns the registered images for a neuron keyed by template brain — and the MCP documents how to turn those into a live 3D scene URL, so your assistant can hand you a clickable view:

  > **You:** Show me neuron VFB_jrchjtdb in 3D and summarise what it is.
  >
  > **Assistant** → `get_term_info(VFB_jrchjtdb)` → images aligned to **JRCFIB2018Fum** (`VFB_00101384`) and **JRC2018Unisex** (`VFB_00101567`); classification, predicted transmitter, lineage
  >
  > **Assistant:** DA1_lPN_R (FlyEM-HB:1734350908) is an *adult antennal lobe projection neuron DA1 lPN* (also typed *adult fruitless aDT-e (female) neuron*), lineage ALl1/BAlc, predicted cholinergic (91%, connectome data). View it in 3D over the standard JRC2018Unisex template: `https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?id=VFB_jrchjtdb&i=VFB_00101567,VFB_jrchjtdb` — swap the first ID in `i=` to `VFB_00101384` to see it over its native hemibrain EM volume instead.

  Download formats (SWC, OBJ, NRRD) are listed per image, so "get me the skeleton file" is also one question away.

mcp_prompt: |
  Show me the 3D image of neuron VFB_jrchjtdb and two of its strongest partners in the same template.

chat_content: |
  Chat can help you find neurons to visualise, though for publication-quality figures you'll want the Python API.
  
  **Optimized prompt:** Ask by the neuron's name for its images plus key facts in one question.

chat_query: "Show me images of DA1_lPN_R and tell me its neurotransmitter and which brain regions it connects to."

chat_screenshot: "/img/chat-p3-visualisation.png"

chat_screenshot_alt: "VFB Chat showing registered images of DA1_lPN_R with neurotransmitter prediction and connected regions"

browser_content: |
  This is the browser's home ground: publication-quality sanity-checking with zero installs.

  1. **Load neurons.** Run any image query (see P1) and tick the checkboxes of the neurons you want — here the left and right Male CNS DA1 lPNs — or open the pre-built scene with the button below.

  2. **Drive the scene.** Each neuron gets a colour and a row in the **Layers** panel: click the eye to hide/show, the swatch to recolour, the name to bring up its Term Info. The template brain stays as anatomical context, and the Slice Viewer tracks the same alignment so you can flick between 3D and section views.

     ![Left and right DA1 lPNs over the JRC2018Unisex template, with Layers and Term Info](/img/browser-p3-3dview.png)

  3. **Interrogate any neuron.** With an individual selected, Term Info shows its neurotransmitter prediction (94% acetylcholine here), soma side, lineage — and one-click queries such as *Neurons connected to…*.

  4. **Share the exact view.** The URL updates as you work: it records the template and every loaded neuron. Copy it into a paper, a Slack message or a lab notebook and anyone opens the identical scene — that is what the button below does.

  **Worth noticing:** stick to the standard JRC2018Unisex space for comparisons — but if you open an EM neuron with its native template first in `i=` (e.g. `?id=VFB_jrchjtdb&i=VFB_00101384,VFB_jrchjtdb`), the raw hemibrain EM volume loads behind the skeleton and you can scroll the actual electron microscopy it was traced from.

browser_url: "https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?id=VFB_jrmc37h9&i=VFB_00101567,VFB_jrmc37ha,VFB_jrmc37h9"

when_to_use: |
  - **API/navis** for publication figures and morphometric measurements
  - **MCP/Chat** for a quick look and orientation
  - **3D Browser** for interactive exploration without code
---

Load skeletons/meshes with `navis` (+ `pymaid`/neuPrint loaders), plot co-registered.

**Key question:** *Show these neurons together in a common template.*
