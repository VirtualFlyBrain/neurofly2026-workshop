---
title: "No-Code Track"
description: "Explore VFB with natural language — no Python required"
---

## Two Routes, Zero Code

You don't need to write code to explore VFB's data. We provide two natural-language routes for different needs:

### Route C: VFB Chat — Quick & Easy

[chat.virtualflybrain.org](https://chat.virtualflybrain.org) is a guardrailed natural-language interface to VFB — nothing to install or configure. Perfect for quick answers on the go, or when you don't have access to a more powerful AI.

**Best for:** Fast lookups, teaching demos, getting started without setup

**Example:**
> "Where do I find DA1 lPN neurons in VFB, and which connectomes have them?"

### Route B: MCP Tool — Your LLM + VFB Data

The [VFB MCP tool](https://vfb3-mcp.virtualflybrain.org) runs inside your own LLM (Claude, etc.) and lets you chain VFB queries with your own reasoning and all your connected data.

**Best for:** Deep analysis, combining VFB data with your own datasets, leveraging your LLM's full capabilities

**Setup:** Follow the [MCP setup guide](https://github.com/VirtualFlyBrain/neurofly2026-workshop/blob/main/no-code/MCP_setup.md).

**Example prompt:**
> "Search VFB for the neuron type 'DA1 lPN' and list every individual neuron across all datasets, with their dataset and VFB ID."

## Tips for Good Answers

- **Name the entity precisely** — a neuron type, region, gene, or a VFB/FlyBase ID removes ambiguity
- **Ask for the identifiers** — end with "…and give me the VFB IDs" so you can carry results into `vfb_connect` for reproducible re-runs
- **Say which dataset** when it matters ("in FlyWire", "in the male-CNS", "in BANC")
- **One step at a time** — search, then drill in, then compare

## Work Through the Problems

Use the route selector on each [problem page](/problems/) to see the MCP and Chat prompts for each research question.
