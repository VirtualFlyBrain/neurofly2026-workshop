# Connect the VFB MCP tool to your LLM

The **Model Context Protocol (MCP)** lets an LLM call external tools. The VFB MCP server exposes VFB's
knowledge base — term info, search, connectivity, NBLAST similarity — so your assistant answers from
real VFB data and can show 3D neuron images inline.

**Hosted server URL:** `https://vfb3-mcp.virtualflybrain.org`
(No install needed — you point your client at the URL. Source:
[VirtualFlyBrain/VFB3-MCP](https://github.com/VirtualFlyBrain/VFB3-MCP).)

## Claude Desktop
Settings → Connectors / MCP → add an HTTP server:
- **Name:** `virtual-fly-brain`
- **Type:** HTTP
- **URL:** `https://vfb3-mcp.virtualflybrain.org`

## Claude Code
Add to `~/.claude.json` (Windows: `%USERPROFILE%\.claude.json`) and restart:
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

## VS Code / GitHub Copilot
Add an MCP server in Settings (search "MCP"), or in `mcp.json`:
```json
{ "servers": { "virtual-fly-brain": { "type": "http", "url": "https://vfb3-mcp.virtualflybrain.org" } } }
```

## Other MCP clients / Gemini
Any client that supports HTTP MCP servers works with the same URL. Gemini has no direct web-UI MCP
support yet — use a small Python/Node client (`pip install mcp google-genai`).

## Test it
Ask your assistant:
- "Get information about the neuron VFB_jrchjti6."
- "Search for terms related to *medulla* in the fly brain."
- "What neurons are morphologically similar to IN02A049?"

If you get VFB neuron names, brain regions, expression or connectivity back, you're connected.

## The tools it exposes
- `get_term_info` — full definition, classification, relationships, images for a VFB ID
- `search_terms` — keyword search with filters (entity type, system, neurotransmitter, dataset)
- `run_query` — execute queries incl. NBLAST morphological similarity
- (plus hierarchy, connectivity, entity/combination resolution and dataset listing)

More examples: [VFB3-MCP/examples.md](https://github.com/VirtualFlyBrain/VFB3-MCP/blob/main/examples.md)
· full guide: [VFB MCP tutorial](https://virtualflybrain.org/docs/tutorials/vfb-mcp-guide/).
