---
title: "VFB Workshop — NeuroFly 2026"
description: "Bridging connectomes and transcriptomics across the Drosophila CNS"
---

<div class="hero">
  <div class="hero__bg"></div>
  <div class="wrap">
    <div class="hero__content">
      <p class="eyebrow">NeuroFly 2026 · 7–11 September · University of Cologne</p>
      <h1 class="hero__title">
        Bridging <span class="gradient-text">connectomes</span> and <span class="gradient-text">transcriptomics</span>
      </h1>
      <p class="lede">
        Interactive workshop materials from <a href="https://virtualflybrain.org">Virtual Fly Brain</a>. 
        Learn to find, bridge, visualise and analyse neurons across datasets — three ways.
      </p>
      <div class="hero__actions">
        <a href="#problems" class="btn btn--primary">
          <i class="fas fa-arrow-right"></i>
          Start the Workshop
        </a>
        <a href="https://colab.research.google.com/github/VirtualFlyBrain/neurofly2026-workshop/blob/main/python/00_Setup_and_Orientation.ipynb" class="btn" target="_blank" rel="noopener">
          <i class="fab fa-google"></i>
          Open in Colab
        </a>
      </div>
    </div>
  </div>
</div>

<section class="section" id="problems">
  <div class="wrap">
    <h2>One Problem, Three Routes</h2>
    <p class="lede">
      The workshop is built around real research questions. For each one we show the same answer via three routes, 
      so you can pick whichever fits your workflow.
    </p>
    
    <div class="route-selector" id="routeSelector"></div>
    
    <div class="doc" style="margin-top: var(--sp-6);">
      <div class="doc__main">
        {{ range .Site.RegularPages.ByWeight }}
        <article class="card" style="margin-bottom: var(--sp-4);">
          <h3><a href="{{ .Permalink }}">{{ .Title }}</a></h3>
          <p>{{ .Description }}</p>
          <div class="card__meta">
            <span class="pill"><i class="fas fa-route"></i> {{ .Params.route | default "python" }}</span>
          </div>
        </article>
        {{ end }}
      </div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <h2>What's New for 2026</h2>
    <div class="doc">
      <div class="doc__main prose">
        <p>The fly CNS is now covered by whole-CNS and sex-specific connectomes that didn't exist (or weren't integrated) at the last workshop:</p>
        <ul>
          <li><strong>BANC</strong> (Brain And Nerve Cord) — whole adult CNS</li>
          <li><strong>male-CNS</strong> — adult male CNS</li>
          <li><strong>MANC</strong> — male adult nerve cord</li>
          <li><strong>Optic Lobe</strong> (JRC_Optic-Lobe v1.0.1)</li>
        </ul>
        <p>Plus the <strong>VFB MCP tool</strong> and <strong>chat.virtualflybrain.org</strong> interface for natural-language exploration.</p>
      </div>
    </div>
  </div>
</section>

{{ partial "route-selector.html" . }}
