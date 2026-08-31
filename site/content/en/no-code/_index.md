---
title: "No-Code Track"
description: "Explore VFB without installing anything — no Python required"
---

## Three Routes to VFB Data

Choose the right tool for your needs. Chat and the 3D Browser need nothing installed at all; MCP needs a one-time URL registered with your AI client — no code either way.

### Route D: VFB Chat — Quick & Easy

[chat.virtualflybrain.org](https://chat.virtualflybrain.org) is a guardrailed natural-language interface to VFB — nothing to install or configure. Perfect for quick answers on the go, or when you don't have access to a more powerful AI.

**Best for:** Fast lookups, teaching demos, getting started without setup

**Example:**
> "Where do I find DA1 lPN neurons in VFB, and which connectomes have them?"

### Route E: 3D Circuit Browser — Visual Exploration

The [Circuit Browser](https://v2.virtualflybrain.org/) is VFB's interactive 3D viewer — nothing to install, works in any modern browser (WebGL required). Point and click instead of asking a question: open a neuron's term page and build up a scene from there.

**Best for:** Exploring morphology and connectivity visually, browsing a circuit hop by hop, sharing exactly what you're looking at (the URL encodes the scene)

**Example:** Open a term page via a deep link — `…/geppetto?id=FBbt_00067363` — then use its **Query For** menu to pull in connected neurons, images or subclasses without writing a query. See the [3D Browser setup notes](/setup/#browser) for deep-link tips.

### Route C: MCP Tool — Your LLM + VFB Data

The VFB MCP tool runs inside your own LLM (Claude, etc.) and lets you chain VFB queries with your own reasoning and all your connected data.

**Best for:** Deep analysis, combining VFB data with your own datasets, leveraging your LLM's full capabilities

**Setup:** One URL to register with your AI client — see the [MCP setup guide](/setup/#mcp).

**Example prompt:**
> "Search VFB for the neuron type 'DA1 lPN' and list every individual neuron across all datasets, with their dataset and VFB ID."

## Tips for Good Answers

Chat and MCP both take natural-language questions — these apply to either:

- **Name the entity precisely** — a neuron type, region, gene, or a VFB/FlyBase ID removes ambiguity
- **Ask for the identifiers** — end with "…and give me the VFB IDs" so you can carry results into `vfb_connect` later if you want to
- **Say which dataset** when it matters ("in FlyWire", "in the male-CNS", "in BANC")
- **One step at a time** — search, then drill in, then compare

## Work Through the Sessions

Use the route selector on each [session page](/sessions/) to see the Chat, MCP and 3D Browser walkthroughs for each session.
