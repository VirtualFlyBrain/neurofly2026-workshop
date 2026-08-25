# R / natverse track

This track mirrors the Python modules for R users, built on the [natverse](http://natverse.org)
(`nat`, `neuprintr`, `rcatmaid`, `nat.nblast`) plus the `vfbconnectr` wrapper. It follows the 2024
[natworkshop](https://github.com/VirtualFlyBrain/natworkshop) repo and updates it for the 2026
datasets and tools.

**Status (Aug 2026):** live as Colab-ready `.ipynb` notebooks (R kernel) driven through
`reticulate` — the same `vfb_connect` engine as the Python track, verified against vfb-connect 2.4.2.
Open any of them directly in Colab (Runtime is set to R automatically):

| Module | R notebook |
|--------|-----------|
| 00 Setup & orientation | [`00_Setup_R.ipynb`](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/R/00_Setup_R.ipynb) |
| 01 Discovery | [`01_Discovery_R.ipynb`](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/R/01_Discovery_R.ipynb) |
| 02 Bridging datasets | [`02_Bridging_datasets_R.ipynb`](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/R/02_Bridging_datasets_R.ipynb) |
| 03 Visualisation | [`03_Visualisation_R.ipynb`](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/R/03_Visualisation_R.ipynb) |
| 04 Connectomics | [`04_Connectomics_R.ipynb`](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/R/04_Connectomics_R.ipynb) |
| 05 Similarity / NBLAST | [`05_Similarity_NBLAST_R.ipynb`](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/R/05_Similarity_NBLAST_R.ipynb) |
| 06 Transcriptomics | [`06_Transcriptomics_R.ipynb`](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/R/06_Transcriptomics_R.ipynb) |
| 07 Putting it together | [`07_Putting_it_together_R.ipynb`](https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/R/07_Putting_it_together_R.ipynb) |

Native-natverse `.Rmd` variants (nat / nat.nblast / neuprintr) remain a possible follow-up; the
`vfbconnectr` wrapper is verified working against vfb-connect 2.4.2 and provides
`read.neurons.vfb()` for pulling skeletons into `nat`.

The **no-code (MCP / chat) routes are language-agnostic** — R users use the exact same
[`../no-code/`](../no-code/) guides and [`../problems/`](../problems/) prompts. Only route **A**
(code) differs between the Python and R tracks.

### Setup (once filled)
```r
install.packages("natmanager")
natmanager::install("natverse")
# vfbconnectr: remotes::install_github("jefferis/vfbconnectr")
```
