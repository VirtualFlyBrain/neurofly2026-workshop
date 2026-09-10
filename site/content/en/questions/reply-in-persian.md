---
title: "Can you reply in Persian?"
slug: "reply-in-persian"
description: "Questions put to VFB in Persian and Hungarian, what VFB Chat got wrong with them, what changed, and how to get the same right with the MCP and your own AI"
weight: 90
date: 2026-09-10
---

**Asked at the VFB table, NeuroFly 2026 (Cologne), 10 September 2026.**

## The questions

Not everyone at the table thinks in English, and one visitor put that to the test on [VFB Chat](https://chat.virtualflybrain.org), in three languages in a row:

> "chand ta driverline dar flywire data vojood dare?"

Persian, typed in Latin letters: *how many driver lines are there in the FlyWire data?*

> "sorold fel az ellipszis testet jelolo GAL4 torzseket, valaszolj magyarul"

Hungarian: *list the GAL4 strains that label the ellipsoid body, and answer in Hungarian.*

> "can you reply in persian?"

The question behind all three is the one this page is about: VFB's data is in English, so what happens when the question is not?

## What happened in VFB Chat

The chat is a different tool from the MCP the rest of this section uses: it plans and runs the same VFB queries, but it also writes the answer, and until this visit nothing in it knew what language a question was written in. Three things went wrong, one per message.

The Persian question came back with a clarifying question in English ("Do you want to know how many split-GAL4 driver lines target neuron classes that are mapped in the FlyWire connectome…?"). A fair question — driver lines are not part of a connectome — but not in the language it was asked in.

The Hungarian question did better on the science and worse on the plumbing. "Ellipszis test" resolved to the [ellipsoid body](https://virtualflybrain.org/reports/FBbt_00003678) (`FBbt:00003678`), the expression-pattern query ran, the table of results and the follow-on chips were right, and the answer was in Hungarian because the message said so. But the Hungarian prose carried no links at all, and it said VFB holds **327** GAL4 lines above a table whose own link said **392**. The chat has an audit that catches exactly this — a number in the prose that does not match the data behind it — and it reads English. So does the layer that turns VFB's term names into links, and the one that stops an answer claiming VFB "has no" data it never queried. A Hungarian sentence went straight past all three.

"Can you reply in persian?" was treated as a new question and answered, in Persian, with "yes, I can — how can I help you explore *Drosophila* neuroscience data?" The visitor wanted the answer they had just been given, in Persian.

{{< figure src="/questions/reply-in-persian-table.jpg" alt="VFB Chat on a laptop at the workshop: the ellipsoid body expression-pattern table with 'View all 392 in VFB', the follow-on chips, the question 'can you reply in persian?' and a one-line Persian reply" caption="The screen at the table: the Hungarian turn's table and chips (392), then the reply to 'can you reply in persian?'" >}}

## What changed in the chat

The fix went into VFB Chat the same day, and the design follows from the second failure: the answer is still written in English, so every check that reads English still runs, and the translation is the **last** step, on the finished text. Concretely:

- The chat reads the language a question is written in — Persian typed in Latin letters counts as Persian — and answers in it, clarifying questions included. Asking for a language ("válaszolj magyarul", "reply in Persian") pins the rest of the conversation to it; clicking a follow-on chip keeps the conversation's language rather than switching back to English.
- Anatomical names in another language are resolved through their standard English name, since VFB's labels are English. "Ellipszis test" reaches the ellipsoid body the same way "ellipsoid body" does.
- The translation must keep every link, every number and every VFB identifier from the English exactly, and a checker confirms it did. A translation that dropped a link or altered a number is retried once and then, if it still fails, the English answer is shown with a note saying why. An unverified translation is never shown. English names of VFB terms stay in the text, with the local name in brackets on first mention, because they are what the links open.
- "Can you reply in Persian?" re-renders the previous answer in Persian, links, chips and all, and pins the conversation.
- Right-to-left scripts align correctly in the chat window.

The same three messages, put to the fixed build against the live VFB data: the Persian question is answered in Persian; the Hungarian question answers with the count the table shows ([392](https://v2.virtualflybrain.org/org.geppetto.frontend/geppetto?q=FBbt_00003678,TransgeneExpressionHere), linked), the example expression patterns, and chips in Hungarian; and "can you reply in persian?" gives that answer back in Persian with its link intact. A chip clicked afterwards is answered in Persian too, with all thirteen of its term links.

## Doing the same with the MCP and your own AI

The [No-Code track](/no-code/) puts the same VFB tools behind whichever model you already use, and that model will happily answer in any language — the question is what it does with the names. Two facts to build on, both measured on the live MCP while writing this page:

- `search_terms` is VFB's own site search, and it is English. "ellipsoid body" is an exact label match (137 results, `FBbt:00003678` first); "ellipszis test" returns nothing, and so does "Pilzkörper". An empty result here does not mean VFB lacks the structure — the tool's own note says as much — it means the index was asked in a language it does not hold.
- `resolve_entity` works the same way on FlyBase names: gene symbols, line names and stock numbers as they are written, which are the same in every language.

So the rule for your model is **translate the name, not the data**. The instruction that works, in whatever form your client takes it (a system prompt, a project instruction, a line at the top of the chat):

> Answer in the language I write in. VFB's labels and identifiers are English: before calling `search_terms`, translate anatomical structures, neuron types and cell types to their standard English name (Hungarian "ellipszis test" → "ellipsoid body"; German "Pilzkörper" → "mushroom body"); leave gene symbols, GAL4 and split-GAL4 line names, dataset names and identifiers exactly as written. In the answer, keep the English label and the VFB identifier next to the translated name so I can find the record, and copy every count from the tool output rather than from memory.

Three things worth knowing before you trust the result:

1. **The count is in the tool output, not in the model.** The 327-versus-392 slip above is a model rounding a number it had already seen. Whatever language the answer is in, check that any figure it quotes appears in the JSON the tool returned; the chat now does this mechanically, your client will not.
2. **The English label is the link.** A `FBbt:` identifier and its English label are what VFB's report pages, and every other tool in this section, key on. A translated name is for reading; it is not something you can search for or cite.
3. **Right-to-left text and links mix badly in some clients.** A Persian or Arabic sentence with an English label and a URL inside it can render with the link visibly out of place. The data is fine; the display is the client's.

**Worth being honest about:** the science in the first answer did not change — "how many driver lines are in the FlyWire data" is still not a question VFB's data answers directly, because FlyWire is an EM connectome and driver lines are annotated separately, and the chat still says so (now in Persian). What changed is that a reader gets a checked answer in their own language, or a checked answer in English, and never an unchecked one in either. The check is deterministic; the translation is a model's, and "natural Hungarian" is not something the checker measures.

## Sources

- [FBbt:00003678 — ellipsoid body](https://virtualflybrain.org/reports/FBbt_00003678)
- [VFB MCP](/no-code/#route-c-mcp-tool--your-llm--vfb-data) — `search_terms` and `resolve_entity` behaviour above measured on 10 September 2026
- [VFB Chat](https://chat.virtualflybrain.org) — the feedback transcripts from this table are what the fix was built from
