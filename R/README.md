# R / natverse track

This track mirrors the Python modules for R users, built on the [natverse](http://natverse.org)
(`nat`, `neuprintr`, `rcatmaid`, `nat.nblast`) plus the `vfbconnectr` wrapper. It follows the 2024
[natworkshop](https://github.com/VirtualFlyBrain/natworkshop) repo and updates it for the 2026
datasets and tools.

**Status:** Python-first for 2026 — this track is a stub to be filled after the Python notebooks are
validated (see [`../PLAN.md`](../PLAN.md) §7). The intended notebooks mirror the Python set:

| Module | R notebook |
|--------|-----------|
| 00 Setup & orientation | `00_Setup_and_Orientation.Rmd` |
| 01 Discovery | `01_Discovery.Rmd` |
| 02 Bridging datasets | `02_Bridging_datasets.Rmd` |
| 03 Visualisation | `03_Visualisation.Rmd` |
| 04 Connectomics | `04_Connectomics.Rmd` |
| 05 Similarity / NBLAST | `05_Similarity_NBLAST.Rmd` |
| 06 Transcriptomics | `06_Transcriptomics.Rmd` |
| 07 Putting it together | `07_Putting_it_together.Rmd` |

The **no-code (MCP / chat) routes are language-agnostic** — R users use the exact same
[`../no-code/`](../no-code/) guides and [`../problems/`](../problems/) prompts. Only route **A**
(code) differs between the Python and R tracks.

### Setup (once filled)
```r
install.packages("natmanager")
natmanager::install("natverse")
# vfbconnectr: remotes::install_github("jefferis/vfbconnectr")
```
