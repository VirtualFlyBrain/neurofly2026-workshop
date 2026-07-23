# No-code track — explore VFB in natural language

You don't need to write any code to work through this workshop. Two natural-language routes reach the
same VFB knowledge base the Python notebooks use:

1. **[chat.virtualflybrain.org](https://chat.virtualflybrain.org)** — a guardrailed chat interface.
   Nothing to install, nothing to configure. Best starting point, and ideal for teaching.
   → [`chat_vfb_guide.md`](chat_vfb_guide.md)

2. **VFB MCP tool** ([vfb3-mcp.virtualflybrain.org](https://vfb3-mcp.virtualflybrain.org)) — connect
   VFB to your own LLM client (Claude Desktop/Code, Copilot, VS Code…) so the model can query VFB
   directly and ground its answers in real data. → [`MCP_setup.md`](MCP_setup.md)

Then work through the shared problems in [`../problems/`](../problems/) using
[`example_prompts.md`](example_prompts.md) — every problem lists a **B (MCP)** and **C (chat)** prompt
next to the Python code, so you can compare routes.

### Why this matters
The VFB MCP tool was benchmarked on 30 neuroscience tasks: an LLM with the MCP answered 25/30
correctly vs 14/30 for a web-search-assisted LLM and 2/30 for a bare LLM — and on tasks needing data
quantification, 89% vs 11%. The gain comes from grounding answers in VFB's expert-curated,
ontology-backed knowledge graph rather than the model's memory. See
[McLachlan et al. (2026)](https://doi.org/10.64898/2026.06.16.732577).

> **Reproducibility note for researchers:** natural-language routes are excellent for exploration and
> for getting to the right query fast, but for anything you'll publish, capture the underlying IDs and
> re-run the equivalent `vfb_connect` call (route A) so your analysis is scriptable and versioned.
