# Workshop plan — VFB @ NeuroFly 2026

**Event:** NeuroFly 2026 (21st Biennial European *Drosophila* Neurobiology Conference),
University of Cologne, Germany, 7–11 September 2026.
**Format:** online, interactive; hands-on notebooks + live no-code demos.
**Audience:** *Drosophila* neuroscientists. Coding track assumes some Python (or R); the no-code
MCP/chat track assumes none.
**Working title:** *Bridging connectomes and transcriptomics across the Drosophila CNS.*

---

## 1. Goals

1. Update the community on the data now integrated in VFB — especially the **whole-CNS (BANC)** and
   **sex-specific (male-CNS, MANC)** connectomes and the **optic lobe** dataset.
2. Teach the core cross-dataset skills (discover → bridge → visualise → analyse connectivity →
   compare morphology → link to transcriptomics) against the **current** data and tools.
3. Introduce the **VFB MCP tool** and **chat.virtualflybrain.org** as first-class ways to explore
   the data, shown side-by-side with `vfb_connect` on the same problems.
4. Leave attendees with runnable, self-hostable materials they can adapt to their own systems.

## 2. Design principle — "one problem, solved three ways"

Every topic is anchored to a concrete research question and answered via three routes:

- **A · `vfb_connect`** (Python) — reproducible/scriptable.
- **B · VFB MCP tool** in an LLM (Claude etc.) — conversational, data-grounded.
- **C · chat.virtualflybrain.org** — guardrailed, zero-install.

Each problem ends with a **"when to reach for which"** box. This weaves MCP/chat through the whole
workshop (per the 2026 brief) rather than isolating them in one session, and lets attendees follow
along at whatever technical level they're comfortable with.

The canonical problems live in [`problems/`](problems/) and are reused across the notebooks.

## 3. Module outline (Python-first; R mirrors it)

| # | Module | Core question | New-for-2026 emphasis |
|---|--------|---------------|------------------------|
| 00 | Setup & orientation | "What data is in VFB in 2026, and how do I reach it?" | The expanded connectome roster; MCP + chat first-run |
| 01 | Discovery | "Find all instances of a neuron type across every dataset." | BANC / male-CNS / optic-lobe instances appear alongside legacy sets |
| 02 | Bridging datasets & identity | "Is *this* FlyWire neuron the *same* cell as *that* hemibrain one?" | Cross-connectome identity; typing via the ontology |
| 03 | Visualisation | "Show me these neurons together in a common template." | navis 3D; Circuit Browser; whole-CNS co-visualisation |
| 04 | Connectomics | "Who are the strongest partners of neuron X, and along what pathway?" | `query_connectivity`; comparing partners across connectomes |
| 05 | Similarity & NBLAST | "What is the morphological match to this neuron in another dataset?" | Cross-connectome NBLAST incl. BANC/male-CNS/optic lobe |
| 06 | Transcriptomics | "What is this cell type's expression profile, and which genes mark it?" | scRNAseq ↔ connectome cell-type bridge |
| 07 | Putting it together | A short guided mini-project using all three routes | Using MCP/chat as a research assistant end-to-end |

**Reference notebooks** (`python/reference/`): VFB API overview, VFB data types, plotting, neuPrint,
pymaid/CATMAID — carried over from 2024 and refreshed.

### Suggested timing (≈3 h online session)
- 00 + welcome — 20 min
- 01 Discovery — 25 min
- 02 Bridging — 25 min
- 03 Visualisation — 25 min
- *break* — 10 min
- 04 Connectomics — 30 min
- 05 NBLAST — 25 min
- 06 Transcriptomics — 20 min
- 07 Wrap-up mini-project + Q&A — 15 min

(Modular: a 90-min cut = 00, 01, 04, and one of 05/06.)

## 4. Datasets to feature (current on VFB, July 2026)

| Dataset | VFB symbol | Notes |
|---------|-----------|-------|
| BANC v626 | `BANC` | Whole adult CNS — headline addition |
| FlyWire (FAFB) v783 | `fw` | Adult brain |
| JRC Optic-Lobe v1.0.1 | `ol` | Optic lobe |
| MANC v1.2.1 | `mv` | Male adult nerve cord |
| Hemibrain v1.2.1 | `hb` | Adult brain subset |
| male-CNS v0.9 | `mc` | Adult male CNS |
| FAFB (CATMAID) | `fafb` | Manually traced EM |
| L1 larval CNS (CATMAID) | `l1em` | Larval |

*Verify versions live at run time via `vfb_connect` / the MCP `list_connectome_datasets` tool —
these move.*

## 5. 2024 → 2026 diff (what to update)

> **Heads-up on the source material:** the "2024" workshop pages on the VFB site wrap notebooks whose
> repos were last substantively updated in **2021–2022** (`training` last commit 2022-06; `natworkshop`
> 2021-05). Treat them as *structural* references only — the code is rebuilt against the current API,
> not copied. `vfb_connect` itself is current (last release May 2026).

- **Datasets:** add BANC, male-CNS, optic lobe; bump FlyWire/MANC/hemibrain versions. Re-run any
  cell that hard-codes dataset lists or counts.
- **API (verified against vfb_connect source, 2026):** modern import is `from vfb_connect import vfb`
  (a ready singleton) returning DataFrames; the old notebooks use
  `from vfb_connect.cross_server_tools import VfbConnect; vc = VfbConnect()`. The notebooks now use
  the confirmed current methods: `get_datasets`, `get_instances`, `get_instances_by_dataset`,
  `get_terms_by_region`, `get_neurons_downstream_of` / `get_neurons_upstream_of` /
  `get_connected_neurons_by_type`, `get_similar_neurons(similarity_score='NBLAST_score')`,
  `get_transcriptomic_profile` / `get_cell_types_by_genes` / `get_scRNAseq_expression`,
  `get_images(..., image_type='swc')`, `get_vfb_link`, `term`/`terms`, `search`. New since 2024 and
  worth featuring: neurotransmitter-prediction helpers (`get_nt_predictions`,
  `get_nt_receptors_in_downstream_neurons`).
- **New routes:** add the MCP and chat solution to every problem (didn't exist in 2024).
- **Transcriptomics:** refresh scRNAseq datasets and the connectome↔expression bridge.
- **Transforms:** `navis-flybrains` template list has grown — confirm bridging paths for the new
  templates.
- **Platform:** 2024 used Deepnote + a Colab notebook; 2026 leads with Colab badges per notebook and
  adds a self-host (Docker/Binder) path.

## 6. Delivery / hosting

- **Primary:** Google Colab (free, one-click, no login friction for attendees).
- **Self-host / reproducible:** `requirements.txt` + `Dockerfile` + `binder/` (JupyterLab).
- **No-code:** chat.virtualflybrain.org (nothing to install) and the MCP tool in the attendee's own
  LLM client.

## 7. Open TODOs before the event

- [ ] Confirm final repo name & create under `VirtualFlyBrain/` (see delivery notes); wire up Colab
      badge URLs to the real default branch.
- [x] Verify `vfb_connect` method names against current source (done — see §5).
- [ ] **Execute every notebook against live services** with real IDs and pin `requirements.txt`
      versions once stable (method names are confirmed; live values/outputs still need a run-through).
- [ ] Fill the R/natverse track (currently a stub mirroring the Python modules).
- [ ] Add/refresh slides in `presentations/` (data-landscape 2026; type-vs-individual; tool map).
- [ ] Record a short intro video (as in prior workshops) and link it.
- [ ] Decide short URL (previous: `tinyurl.com/workshopVFB`) and point it at the new landing page.
- [ ] Dry-run the MCP + chat demos; capture example transcripts for the no-code guide.
- [ ] Accessibility / license / acknowledgements pass.

## 8. Related repos & links

- Python (2024): https://github.com/VirtualFlyBrain/training
- R (2024): https://github.com/VirtualFlyBrain/natworkshop
- MCP server: https://github.com/VirtualFlyBrain/VFB3-MCP · https://vfb3-mcp.virtualflybrain.org
- Chat: https://chat.virtualflybrain.org
- `vfb_connect`: https://vfb-connect.readthedocs.io/
- MCP preprint: McLachlan et al. (2026), https://doi.org/10.64898/2026.06.16.732577
- VFB reference paper: Court et al. (2023), https://doi.org/10.3389/fphys.2023.1076533
