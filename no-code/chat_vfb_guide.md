# Using chat.virtualflybrain.org

[chat.virtualflybrain.org](https://chat.virtualflybrain.org) is a **guardrailed** natural-language
interface to VFB — a chat that stays focused on *Drosophila* neuroanatomy and answers from VFB's data.
There is nothing to install or configure: open the page and start asking.

> **Preview status:** we'll be previewing this tool live at NeuroFly 2026. Expect it to keep
> improving; please send feedback via the [VFB contact page](https://virtualflybrain.org/about/contactus/).

## When to use chat vs the MCP tool
- **chat.virtualflybrain.org** — zero setup, always on-topic, great for teaching and quick lookups.
  Best default for non-coders and for demoing in a room.
- **MCP tool in your own LLM** — more flexible: chain VFB queries with your own reasoning, other
  tools, and follow-on analysis. Needs a one-time setup ([`MCP_setup.md`](MCP_setup.md)).

## Tips for good answers
- **Name the entity precisely** — a neuron type, region, gene, or a VFB/FlyBase ID
  (e.g. `FBbt_00003748` = medulla) removes ambiguity.
- **Ask for the identifiers.** End with "…and give me the VFB IDs" so you can carry results into
  `vfb_connect` (route A) for a reproducible re-run.
- **Say which dataset** when it matters ("in FlyWire", "in the male-CNS", "in BANC").
- **One step at a time** — search, then drill in, then compare. It mirrors how the API works.

## Try these
- "What is the mushroom body and what are its main input and output neurons?"
- "Find cholinergic neurons in the optic lobe."
- "Show me a neuron similar in shape to a hemibrain projection neuron in FlyWire."
- "Which datasets in VFB cover the ventral nerve cord?"

Work through [`../problems/`](../problems/) using the **C (chat)** prompt given for each problem, and
compare the answer with the Python (A) and MCP (B) routes.
