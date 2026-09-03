/* =============================================================================
   search.js — the nav search palette. The search engine and palette block of
   virtualflybrain.org's app.js (VFB2, themes/vfb-nova), lifted verbatim apart
   from the trigger selector; keep the two in step when fixing ranking bugs.
   ============================================================================= */

(function () {
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* --- search engine -------------------------------------------------------
     Shared by the ⌘K palette and the standalone /search/ page. Config comes
     from whichever element is on the page; both carry the same data-*. */
  const cfgEl = $('.palette');
  if (!cfgEl) return;
  const indexURL = cfgEl.dataset.index;
  const solrURL = cfgEl.dataset.solr;
  const browserURL = cfgEl.dataset.browser;
  /* virtualflybrain.org's own page index (the file its /search/ runs over),
     fetched cross-origin — the site sends Access-Control-Allow-Origin: * —
     and only once per palette session. It is served with a year-long
     immutable Cache-Control, so the URL carries the hour to keep a stale copy
     from outliving the day. Failure is silent: the workshop's own pages and
     the anatomy terms must never depend on it. */
  const remoteIndexURL = cfgEl.dataset.remoteIndex;
  const remoteBase = cfgEl.dataset.remoteBase || '';
  const remoteLabel = cfgEl.dataset.remoteLabel || 'virtualflybrain.org';
  let remoteDocs = null;
  let remoteLoading = null;
  let docs = null;
  let seq = 0;            /* guards against out-of-order SOLR responses */
  let termCtl = null;     /* aborts the in-flight SOLR request when typing */

  const ICONS = {
    docs: 'fa-book', blog: 'fa-newspaper', about: 'fa-circle-info',
    hosted: 'fa-server', term: 'fa-diagram-project', '': 'fa-file-lines',
  };

  async function load() {
    if (docs) return docs;
    try {
      const r = await fetch(indexURL, { credentials: 'same-origin' });
      docs = await r.json();
    } catch (e) { docs = []; }
    return docs;
  }

  function loadRemote() {
    if (remoteDocs) return Promise.resolve(remoteDocs);
    if (remoteLoading) return remoteLoading;
    if (!remoteIndexURL) { remoteDocs = []; return Promise.resolve(remoteDocs); }
    const stamp = new Date().toISOString().slice(0, 13);
    remoteLoading = fetch(remoteIndexURL + (remoteIndexURL.includes('?') ? '&' : '?') + 'v=' + stamp)
      .then((r) => (r.ok ? r.json() : []))
      .then((j) => { remoteDocs = (Array.isArray(j) ? j : []).map((d) => Object.assign({}, d, { url: remoteBase + d.url, remote: true })); return remoteDocs; })
      .catch(() => { remoteDocs = []; return remoteDocs; });
    return remoteLoading;
  }

  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function mark(text, q) {
    if (!q) return esc(text);
    const i = text.toLowerCase().indexOf(q);
    if (i < 0) return esc(text);
    return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
  }

  /* Does q appear in s at the start of a word? "api" is in "SOLR API"; "mb" is
     in "Thumbnails" too, but only mid-word — and a two-letter query buried
     inside a longer word is a coincidence, not a hit. Without this, "MB"
     answered with Thumbnails and "EB" with Website Features, both ranked as
     title matches above the mushroom body and the ellipsoid body. */
  function wordHit(s, q) {
    let i = s.indexOf(q);
    while (i > -1) {
      if (i === 0 || !/[a-z0-9]/.test(s[i - 1])) return true;
      i = s.indexOf(q, i + 1);
    }
    return false;
  }

  function score(d, q) {
    const t = d.title.toLowerCase();
    if (t === q) return 0;
    if (t.startsWith(q)) return 1;
    if (wordHit(t, q)) return 2;
    /* Front-matter keywords: the words a reader searches by that the title
       does not carry. A word hit on a curated keyword ranks with a word hit
       on the title, because that is what it is for — and because results
       are laid out as strong page hits, then anatomy terms, then weak page
       hits: a page that matches "larval" only in its body sits under the
       eight-term block, which is where the datasets-by-stage page was. */
    if ((d.keywords || []).some((k) => wordHit(String(k).toLowerCase(), q))) return 2;
    if (t.includes(q)) return 3;                                  /* mid-word only */
    if ((d.section || '').toLowerCase().includes(q)) return 4;
    if ((d.desc || '').toLowerCase().includes(q)) return 5;
    if ((d.body || '').toLowerCase().includes(q)) return 7;
    return 99;
  }

  /* --- anatomy terms, live from SOLR ---------------------------------------
     The ~763k generated term pages are not in the Hugo index, so the site
     search alone answers "medulla" with nothing. These come from the same
     ontology core and the same query the 3D browser's own search uses
     (geppetto-vfb searchConfiguration.js): identical qf/pf/bq/fq weighting, so
     ranking matches what users get in the browser. rows is 8 rather than 500
     because this is a palette, not a results page.

     Fails silently. SOLR being down must never break search over site pages. */
  const SOLR_FQ = [
    '(short_form:VFB* OR short_form:FB* OR facets_annotation:DataSet OR facets_annotation:pub) AND NOT short_form:VFBc_*',
    'NOT facets_annotation:Deprecated',
  ];
  const SOLR_BQ = 'short_form:VFBexp*^10.0 short_form:VFB*^50.0 facets_annotation:Class^200.0 ' +
    'short_form:FBbt*^150.0 short_form:FBbt_00003982^2 facets_annotation:Deprecated^0.001 ' +
    'facets_annotation:DataSet^500.0 facets_annotation:pub^100.0';

  /* SOLR labels can carry a stray backslash before a quote from over-escaped
     source data ("y5B\'2a" for "y5B'2a"). Never legitimate; safe to strip. */
  const cleanLabel = (l) => (typeof l === 'string' ? l.replace(/\\(['"])/g, '$1') : l);

  /* --- exact-match promotion -----------------------------------------------
     edismax scores a long label containing the query above a short label that
     *is* the query, because more matched text earns more. So "medulla" came
     back under "medulla anlage", "MB" under a dataset title, "EB" under two
     split-GAL4 collections. The 3D browser hides this in its autocomplete's
     own reordering; a plain list has nowhere to hide it.

     So: ask SOLR for a deeper page, lift the rows that match the query
     *exactly* — on ID, on label, then on a synonym — and leave everything
     else in SOLR's order. Only exact equality promotes. A prefix rule was
     tried and rejected: it pushed "lobe system of adult mushroom body" over
     the optic lobe connectome for "lobe", which is worse than the problem. */
  const norm = (s) => String(s == null ? '' : s).toLowerCase().replace(/\s+/g, ' ').trim();

  function exactness(t, q) {
    if (norm(t.short_form) === q) return 0;
    if (norm(cleanLabel(t.label)) === q) return 1;
    if ((t.synonym || []).some((s) => norm(cleanLabel(s)) === q)) return 2;
    return 3;
  }

  const TERM_ROWS = 8;      /* shown */
  const TERM_FETCH = 40;    /* fetched, so a buried exact match can be found */

  async function fetchTerms(q, mine) {
    if (!solrURL || q.length < 2) return null;
    if (termCtl) termCtl.abort();
    termCtl = new AbortController();
    const p = new URLSearchParams({
      q: q, 'q.op': 'OR', defType: 'edismax', mm: '45%',
      qf: 'label^110 synonym^100 label_autosuggest synonym_autosuggest shortform_autosuggest',
      pf: 'label^250 synonym^120', ps: '0',
      fl: 'short_form,label,synonym,unique_facets',
      bq: SOLR_BQ, rows: String(TERM_FETCH), start: '0', wt: 'json',
    });
    SOLR_FQ.forEach((f) => p.append('fq', f));
    try {
      const r = await fetch(solrURL + '?' + p.toString(), { signal: termCtl.signal });
      if (!r.ok) return null;
      const j = await r.json();
      if (mine !== seq) return null;      /* a newer query has since been typed */
      const docs = (j.response && j.response.docs) || [];
      const qn = norm(q);
      return docs
        .map((t, i) => ({ t: t, e: exactness(t, qn), i: i }))
        .sort((a, b) => a.e - b.e || a.i - b.i)   /* stable: SOLR order within a tier */
        .slice(0, TERM_ROWS)
        .map((x) => x.t);
    } catch (e) { return null; }
  }

  function termsHTML(terms, q) {
    if (!terms || !terms.length) return '';
    return '<li class="palette__group" aria-hidden="true">Anatomy terms &middot; opens in the 3D browser</li>' +
      terms.map((t) => {
        const label = cleanLabel(t.label) || t.short_form;
        const facets = (t.unique_facets || []).slice(0, 3).join(' · ');
        return '<li class="res">' +
          '<a href="' + browserURL + '?id=' + encodeURIComponent(t.short_form) + '" target="_blank" rel="noopener">' +
            '<i class="r-icon fas fa-diagram-project"></i>' +
            '<span class="r-title">' + mark(label, q) +
              '<span class="r-desc">' + esc(t.short_form) + (facets ? ' — ' + esc(facets) : '') + '</span>' +
            '</span>' +
            '<span class="r-sec">term</span>' +
          '</a></li>';
      }).join('');
  }

  function render(q, list, selectFirst) {
    const items = (docs || [])
      .map((d) => ({ d, s: score(d, q) }))
      .filter((x) => x.s < 99)
      .sort((a, b) => a.s - b.s || a.d.title.length - b.d.title.length)
      .slice(0, 24);

    sel = 0;
    const pageHTML = (x) => {
      const d = x.d;
      const icon = ICONS[d.section] || ICONS[''];
      return '<li class="res">' +
        '<a href="' + d.url + '"' + (d.remote ? ' target="_blank" rel="noopener"' : '') + '>' +
          '<i class="r-icon fas ' + icon + '"></i>' +
          '<span class="r-title">' + mark(d.title, q) +
            (d.desc ? '<span class="r-desc">' + esc(d.desc) + '</span>' : '') +
          '</span>' +
          '<span class="r-sec">' + esc(d.remote ? remoteLabel : (d.section || 'page')) + '</span>' +
        '</a></li>';
    };
    const REMOTE_ROWS = 6;
    const remoteItems = (remoteDocs || [])
      .map((d) => ({ d, s: score(d, q) }))
      .filter((x) => x.s < 99)
      .sort((a, b) => a.s - b.s || a.d.title.length - b.d.title.length)
      .slice(0, REMOTE_ROWS);
    const groupHTML = (label) => '<li class="palette__group" aria-hidden="true">' + label + '</li>';
    const remoteStrong = remoteItems.filter((x) => x.s <= 2).map(pageHTML).join('');
    const remoteWeak = remoteItems.filter((x) => x.s > 2).map(pageHTML).join('');

    /* A page whose *title* matches outranks any anatomy term: someone typing
       "solr api" wants the doc. A page that merely mentions the word in its
       body does not — "medulla" must not bury the medulla under two API
       tutorials that happen to use it as their example query. So title-tier
       hits sit above the terms group and the rest below it. */
    /* Workshop pages first — this is the workshop's search — then the main
       site's pages that match on title or keyword, then anatomy terms, then
       the body-only matches from both. */
    const strongHTML = items.filter((x) => x.s <= 2).map(pageHTML).join('');
    const weakHTML = items.filter((x) => x.s > 2).map(pageHTML).join('');
    const remoteStrongHTML = remoteStrong ? groupHTML(esc(remoteLabel) + ' &middot; documentation') + remoteStrong : '';
    const remoteWeakHTML = remoteWeak ? groupHTML(esc(remoteLabel) + ' &middot; mentions') + remoteWeak : '';
    const pagesHTML = strongHTML + remoteStrongHTML + weakHTML + remoteWeakHTML;

    const mine = ++seq;
    list.innerHTML = pagesHTML || '<li class="palette__empty">Searching…</li>';
    if (selectFirst) markFirst(list);

    /* The main-site index arrives once; the first query re-renders when it
       lands so its rows appear without another keystroke. */
    if (!remoteDocs) loadRemote().then(() => { if (mine === seq) render(q, list, selectFirst); });

    fetchTerms(q, mine).then((terms) => {
      if (mine !== seq) return;
      const th = termsHTML(terms, q);
      if (!pagesHTML && !th) {
        list.innerHTML = '<li class="palette__empty">No match for “' + esc(q) + '”.</li>';
        return;
      }
      list.innerHTML = th ? strongHTML + remoteStrongHTML + th + weakHTML + remoteWeakHTML : pagesHTML;
      if (selectFirst) markFirst(list);
      list.dispatchEvent(new CustomEvent('vfb:results'));
    });
  }

  function markFirst(list) {
    const first = list.querySelector('li.res');
    if (first) first.classList.add('is-sel');
    sel = 0;
  }

  /* --- the palette itself --------------------------------------------------- */
  const pal = $('.palette');
  const input = pal ? $('#palette-input') : null;
  const list = pal ? $('#palette-results') : null;
  let sel = 0;

  function recent() {
    list.innerHTML = (docs || []).filter((d) => d.pinned).slice(0, 8).map((d, i) =>
      '<li class="res ' + (i === 0 ? 'is-sel' : '') + '"><a href="' + d.url + '">' +
      '<i class="r-icon fas ' + (ICONS[d.section] || ICONS['']) + '"></i>' +
      '<span class="r-title">' + esc(d.title) + '</span>' +
      '<span class="r-sec">' + esc(d.section || 'page') + '</span></a></li>').join('');
    sel = 0;
  }

  async function open() {
    pal.hidden = false;
    document.body.style.overflow = 'hidden';
    await load();
    recent();
    input.value = '';
    input.focus();
  }
  function close() {
    pal.hidden = true;
    document.body.style.overflow = '';
  }

  if (pal) {
  $$('.js-search, .search-trigger').forEach((b) => b.addEventListener('click', open));
  pal.addEventListener('click', (e) => { if (e.target === pal) close(); });
  $('.js-close-palette')?.addEventListener('click', close);

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) return recent();
    render(q, list, true);
  });

  function move(step) {
    const items = $$('#palette-results li.res');
    if (!items.length) return;
    items[sel]?.classList.remove('is-sel');
    sel = (sel + step + items.length) % items.length;
    items[sel].classList.add('is-sel');
    items[sel].scrollIntoView({ block: 'nearest' });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? open() : close(); return; }
    if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName) && pal.hidden) { e.preventDefault(); open(); return; }
    if (pal.hidden) return;
    if (e.key === 'Escape') { close(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter') {
      const a = $('#palette-results li.is-sel a');
      if (a) {
        e.preventDefault();
        /* term results carry target=_blank; Enter should honour that too */
        if (a.target === '_blank') window.open(a.href, '_blank', 'noopener');
        else window.location.href = a.getAttribute('href');
      }
    }
  });
  }   /* end palette */

})();
