---
title: "Setup"
description: "Get each of the four routes working on your system — most need no installation at all"
---

Two of the four routes need zero setup (Chat and the 3D Browser), one needs a single `pip install` (Python), and one needs you to point your own AI assistant at a URL (MCP). Do the ones you plan to use before the workshop; each takes a few minutes at most.

## Route A — Python (`vfb_connect`) {#python}

**Zero-install option:** run the notebooks in Google Colab — nothing on your machine:
[Open 00_Setup_and_Orientation in Colab](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/python/00_Setup_and_Orientation.ipynb). In Colab, run the first `pip install` cell and, if prompted, restart the runtime before continuing.

**Local install** (Python 3.9+, a virtual environment keeps things clean):

```bash
python3 -m venv vfb-env
source vfb-env/bin/activate        # Windows: vfb-env\Scripts\activate
pip install --upgrade pip setuptools
pip install vfb-connect
```

**Verify it works:**

```python
from vfb_connect import vfb        # first import connects to VFB services
df = vfb.get_instances("DA1 lPN", return_dataframe=True)
print(len(df))                     # -> 68
```

The first `import` establishes connections and caches term data, so give it a couple of minutes the first time; after that it is fast. `navis` (for 3D plotting) is installed as a dependency — `.plot3d()` works out of the box in Jupyter/Colab.

## Route B — Your LLM + the VFB MCP {#mcp}

The **Model Context Protocol (MCP)** lets your own AI assistant call VFB directly, so it answers from live VFB data instead of memory. The hosted server is:

```text
https://vfb3-mcp.virtualflybrain.org
```

Nothing to install — you register that URL with your client. Source: [VirtualFlyBrain/VFB3-MCP](https://github.com/VirtualFlyBrain/VFB3-MCP).

**Claude Desktop:** Settings → Connectors → *Add custom connector* — name it `virtual-fly-brain`, type **HTTP**, paste the URL.

**Claude Code:** add to `~/.claude.json` (Windows: `%USERPROFILE%\.claude.json`) and restart:

```json
{
  "mcpServers": {
    "virtual-fly-brain": {
      "type": "http",
      "url": "https://vfb3-mcp.virtualflybrain.org",
      "tools": ["*"]
    }
  }
}
```

**VS Code / GitHub Copilot:** add an MCP server in Settings (search "MCP"), or in `mcp.json`:

```json
{ "servers": { "virtual-fly-brain": { "type": "http", "url": "https://vfb3-mcp.virtualflybrain.org" } } }
```

**Any other MCP-capable client** works with the same URL. (Gemini's web UI has no direct MCP support yet — use a small Python/Node MCP client instead.)

**Verify it works:** ask your assistant *"What is DA1 lPN? Use the VFB tools."* — you should see it call `search_terms` / `get_term_info` and answer with the FBbt ID and literature sources. If it answers instantly with no tool calls, it is answering from memory: check the connector is enabled for the conversation.

## Route C — VFB Chat {#chat}

Nothing to set up. Open **[chat.virtualflybrain.org](https://chat.virtualflybrain.org)** in any browser and ask a question.

Worth knowing before you start:

- You get **100 queries per day** (the counter sits next to the input box).
- Short, single-entity questions resolve best — *"Which neurons are downstream of DA1_lPN_R?"* beats a long multi-clause sentence. Reuse the names the chat itself uses in its answers.
- You can pre-load a question in the URL: `https://chat.virtualflybrain.org/?query=What+is+DA1+lPN%3F` — this is how the embedded examples on the problem pages work.
- Answers are AI-generated from VFB data: verify anything critical against the primary sources it links.

## Route D — 3D Circuit Browser {#browser}

Nothing to set up. Open **[v2.virtualflybrain.org](https://v2.virtualflybrain.org/)** in a modern browser (WebGL required — any recent Chrome, Firefox, Safari or Edge; the first load takes a few seconds while the template brain streams in).

Worth knowing before you start:

- Deep links do the setup for you: `…/geppetto?id=FBbt_00067363` opens a term page; `…/geppetto?id=X&i=TEMPLATE,IMG1,IMG2` rebuilds an entire 3D scene (template first in `i=`). Every "Open in Circuit Browser" button on the problem pages uses these.
- The URL updates as you work and **encodes your scene** — copy it any time to save or share exactly what you see.
- If you ever hit a "VFB Error report" dialogue, just Reload — and check your link uses `?id=`, not a bare label.

---

Once you are set up, start with [Problem 1: Discovery](/problems/p1-discovery/) — every problem page shows all four routes side by side.
