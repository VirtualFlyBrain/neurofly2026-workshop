---
title: "Some of the queries given to us at NeuroFly 2026"
description: "Real queries put to VFB at the NeuroFly 2026 workshop table, answered live and kept here as worked examples"
---

At the VFB table during NeuroFly 2026 (Cologne, September 2026), people put real queries to us about their own neurons of interest. Each one below was answered live with the [VFB MCP](/no-code/#route-c-mcp-tool--your-llm--vfb-data) — the same tool the [No-Code track](/no-code/) teaches — and the answer, including any figure it produced, is kept here as a worked example.

These aren't scripted demos: they're genuine queries, the tool calls that answered them, and an honest account of what VFB's data does and doesn't say.

## Index

| Query | Asked | Summary |
|---|---|---|
| [Ring-shaped neurons in the fly connectome](/questions/ring-shaped-neurons/) | 7 Sept 2026 | Which VFB neuron types have a ring-shaped morphology, and what does VFB hold on them |
| [What feeds the moonwalker descending neuron?](/questions/mdn-inputs/) | 7 Sept 2026 | MDN's strongest presynaptic partners, cross-checked across two independent connectomes |
| [Split-GAL4 lines targeting PPL1](/questions/ppl1-splits/) | 8 Sept 2026 | Why the whole-class query undercounts, and where PPL1's real split coverage lives, subtype by subtype |
| [Connections to Tm3](/questions/tm3-connections/) | 8 Sept 2026 | Tm3's strongest recorded inputs, and why the whole-class connectivity query surfaces ontology umbrella terms first |

## Adding another one

Each entry is its own page under `site/content/en/questions/`, plus (if it produced a standalone figure) a static HTML file under `site/static/questions/`. To add one:

1. Copy the front matter block from an existing page (`ring-shaped-neurons.md` is the simplest template) and give it the next `weight` (they list in weight order).
2. Write the question as it was actually asked, how it was answered (which tools/queries), and what came back — including the caveats, not just the headline numbers.
3. If there's a generated figure, drop the self-contained HTML file in `site/static/questions/` and embed it with the `embed-page` shortcode:
   ```
   {{</* embed-page src="/questions/your-file.html" title="Figure title" height="1400" */>}}
   ```
4. Add a row to the table above.
