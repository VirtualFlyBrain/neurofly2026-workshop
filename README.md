# VFB Workshop — NeuroFly 2026

**Bridging connectomes and transcriptomics across the *Drosophila* CNS**

Interactive workshop materials from [Virtual Fly Brain](https://virtualflybrain.org) for
**[NeuroFly 2026](https://neurofly.org/y2026/)** — the 21st Biennial European *Drosophila*
Neurobiology Conference, University of Cologne, Germany, **7–11 September 2026**.

This is the 2026 successor to our 2024 *"Bridging connectomics and transcriptomics"* session and
the earlier *"Hacking the connectome"* workshop
([training](https://github.com/VirtualFlyBrain/training) / [natworkshop](https://github.com/VirtualFlyBrain/natworkshop)).
It covers the same core skills — finding, bridging, visualising and analysing neurons across
datasets — updated for the connectomes and tools we've added since, and now shows every task
**three ways**.

---

## 🎯 One problem, solved three ways

The workshop is built around real research questions. For each one we show the same answer via three
routes, so you can pick whichever fits your workflow — from a quick natural-language question to a
fully scripted analysis:

| Route | What it is | Best for |
|-------|-----------|----------|
| **A · `vfb_connect`** | Python API returning pandas DataFrames | Reproducible, scriptable analysis and figures |
| **B · VFB MCP tool** | [vfb3-mcp.virtualflybrain.org](https://vfb3-mcp.virtualflybrain.org) inside an LLM (e.g. Claude) | Exploratory, conversational analysis with data-grounded answers |
| **C · VFB chat** | [chat.virtualflybrain.org](https://chat.virtualflybrain.org) (guardrailed, no setup) | Zero-install natural-language lookups; great for teaching & non-coders |

> The MCP tool and chat are **woven into every module**, not treated as an add-on. A short
> *"when to reach for which"* box closes each problem.

The questions each module asks, the exemplar data behind them and the results you should expect are
specified in [`DESIGN.md`](DESIGN.md).

---

## 🚀 Getting started

Nothing to install — open a notebook in Google Colab:

| Module | Topic | Open |
|--------|-------|------|
| 00 | Setup & the 2026 data landscape | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/python/00_Setup_and_Orientation.ipynb) |
| 01 | Discovery — finding neurons across datasets | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/python/01_Discovery.ipynb) |
| 02 | Bridging datasets & identity | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/python/02_Bridging_datasets.ipynb) |
| 03 | Visualisation | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/python/03_Visualisation.ipynb) |
| 04 | Connectomics | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/python/04_Connectomics.ipynb) |
| 05 | Similarity & NBLAST | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/python/05_Similarity_NBLAST.ipynb) |
| 06 | Transcriptomics | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/python/06_Transcriptomics.ipynb) |
| 07 | Putting it together | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/python/07_Putting_it_together.ipynb) |

**No-code track:** start at [`no-code/`](no-code/) — set up the MCP tool, or just open
[chat.virtualflybrain.org](https://chat.virtualflybrain.org) and work through
[`no-code/example_prompts.md`](no-code/example_prompts.md).

**R / natverse track:** see [`R/`](R/) (mirrors the Python modules; published after the Python track).

**Run it yourself / self-host:** `pip install -r requirements.txt`, or use the
[`Dockerfile`](Dockerfile) / [Binder config](binder/) for a hosted JupyterLab. See
[Self-hosting](#-self-hosting).

---

## 🗂️ What's new since 2024

The fly CNS is now covered by whole-CNS and sex-specific connectomes that didn't exist (or weren't
integrated) at the last workshop. Current connectomes on VFB:

- **BANC** (Brain And Nerve Cord) — whole adult CNS
- **FAFB–FlyWire** (v783) — adult brain
- **male-CNS** — adult male CNS
- **Optic Lobe** (JRC_Optic-Lobe v1.0.1)
- **MANC** (v1.2.1) — male adult nerve cord
- **Hemibrain** (v1.2.1)
- **FAFB-CATMAID** and **L1 larval CNS (CATMAID)**

Plus the **VFB MCP tool** (2026, [preprint](https://doi.org/10.64898/2026.06.16.732577)), the
**chat.virtualflybrain.org** interface, the **Circuit Browser**, and an updated
[`vfb_connect`](https://pypi.org/project/vfb_connect/). See [`PLAN.md`](PLAN.md) for the full design
and a 2024 → 2026 diff.

---

## 🧰 Tools used

- [`vfb_connect`](https://vfb-connect.readthedocs.io/) — Python client for the VFB knowledge base
- [`navis`](https://navis.readthedocs.io/) — neuron visualisation & morphometrics
- [`neuprint-python`](https://github.com/connectome-neuprint/neuprint-python) — neuPrint connectomes
- [`pymaid`](https://pymaid.readthedocs.io/) (`python-catmaid`) — CATMAID datasets
- [`navis-flybrains`](https://github.com/schlegelp/navis-flybrains) — template-space transforms
- [VFB MCP tool](https://vfb3-mcp.virtualflybrain.org) & [VFB chat](https://chat.virtualflybrain.org)
- R: the [natverse](http://natverse.org) (`nat`, `neuprintr`, `rcatmaid`, `nat.nblast`)

## 💻 Self-hosting

```bash
git clone https://github.com/VirtualFlyBrain/neurofly2026-workshop.git
cd neurofly2026-workshop
pip install -r requirements.txt
jupyter lab
```

Or build the container: `docker build -t vfb-workshop . && docker run -p 8888:8888 vfb-workshop`.
A [Binder](binder/) config is included for a free hosted session.

## 📜 Licence & citing

Materials released under the [GNU GPL v2](LICENSE), consistent with the VFB `training` repo.
If VFB helps your work, please cite
[Court et al. (2023)](https://doi.org/10.3389/fphys.2023.1076533); for the MCP tool cite
[McLachlan et al. (2026)](https://doi.org/10.64898/2026.06.16.732577).

## 🙋 Support

Questions during or after the workshop: [VFB contact page](https://virtualflybrain.org/about/contactus/)
· [GitHub issues](https://github.com/VirtualFlyBrain/neurofly2026-workshop/issues)
· community [Google group / support](https://virtualflybrain.org).
