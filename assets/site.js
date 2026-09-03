/* The Straddie Twins: shared behaviour. Luke x Claude. No network, no tracking, no build step. */
(function () {
  'use strict';

  const JOURNEY = [
    { file: 'index.html', title: 'Start' },
    { file: 'island.html', title: 'The island' },
    { file: 'twin.html', title: 'What a twin is' },
    { file: 'two-builds.html', title: 'Why two builds' },
    { file: 'first-build.html', title: 'Inside the first build' },
    { file: 'systems.html', title: 'Every part' },
    { file: 'data.html', title: 'Where the numbers come from' },
    { file: 'second-build.html', title: 'Inside the second build' },
    { file: 'ferry-page.html', title: 'The ferry page' },
    { file: 'run.html', title: 'Open them yourself' },
    { file: 'next.html', title: 'Built, designed, not built' },
    { file: 'glossary.html', title: 'Glossary' },
  ];
  const TOPNAV = [
    { file: 'index.html', title: 'Start' },
    { file: 'two-builds.html', title: 'Two builds' },
    { file: 'systems.html', title: 'Every part' },
    { file: 'data.html', title: 'The numbers' },
    { file: 'ferry-page.html', title: 'Ferry page' },
    { file: 'run.html', title: 'Open them' },
    { file: 'glossary.html', title: 'Glossary' },
    { file: 'about.html', title: 'About' },
  ];
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const here = (location.pathname.split('/').pop() || 'index.html');

  /* ---------- top bar ---------- */
  function topbar() {
    const host = document.querySelector('[data-topbar]');
    if (!host) return;
    const links = TOPNAV.map(p => `<a href="${p.file}"${p.file === here ? ' aria-current="page"' : ''}>${p.title}</a>`).join('');
    host.className = 'topbar';
    host.innerHTML = `<div class="wrap"><a class="brand" href="index.html"><span class="mark" aria-hidden="true"></span>The Straddie Twins</a><button class="menu-btn" type="button" aria-expanded="false" aria-controls="topnav">Menu</button><nav class="topnav" id="topnav" aria-label="Pages">${links}</nav></div>`;
    const btn = host.querySelector('.menu-btn'), nav = host.querySelector('.topnav');
    btn.addEventListener('click', () => { const open = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', String(open)); });
  }

  /* ---------- journey rail ---------- */
  function rail() {
    const i = JOURNEY.findIndex(p => p.file === here);
    const host = document.querySelector('[data-rail]');
    if (i < 0 || !host) return;
    document.body.classList.add('has-rail');
    const prev = JOURNEY[i - 1], next = JOURNEY[i + 1];
    const dots = JOURNEY.map((p, k) => `<a class="dot${k < i ? ' done' : ''}${k === i ? ' now' : ''}" href="${p.file}" title="${k}. ${p.title}" aria-label="${p.title}"></a>`).join('');
    host.className = 'rail';
    host.innerHTML = `<div class="inner">
      ${prev ? `<a class="nav prev" href="${prev.file}"><span aria-hidden="true">&larr;</span> ${prev.title}</a>` : '<span></span>'}
      <div><div class="dots">${dots}</div><div class="label">${i} of ${JOURNEY.length - 1} · ${JOURNEY[i].title}</div></div>
      ${next ? `<a class="nav next" href="${next.file}">${next.title} <span aria-hidden="true">&rarr;</span></a>` : '<span></span>'}
    </div>`;
    const tag = document.querySelector('[data-step]');
    if (tag) tag.innerHTML = `<b>${String(i).padStart(2, '0')}</b> / ${String(JOURNEY.length - 1).padStart(2, '0')} · ${JOURNEY[i].title.toUpperCase()}`;
    document.addEventListener('keydown', e => {
      if (e.target && /input|textarea/i.test(e.target.tagName)) return;
      if (e.key === 'ArrowRight' && next) location.href = next.file;
      if (e.key === 'ArrowLeft' && prev) location.href = prev.file;
    });
  }

  /* ---------- reveal on scroll ---------- */
  function reveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (reduced || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: 0.12 });
    els.forEach((e, k) => { e.style.transitionDelay = `${Math.min(k % 6, 5) * 60}ms`; io.observe(e); });
  }

  /* ---------- counters ---------- */
  function counters() {
    const els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    const run = el => {
      const target = parseFloat(el.getAttribute('data-count')); const dec = (el.getAttribute('data-count').split('.')[1] || '').length;
      if (reduced) { el.textContent = target.toFixed(dec); return; }
      const t0 = performance.now(), dur = 1100;
      const step = now => { const p = Math.min(1, (now - t0) / dur); const e = 1 - Math.pow(1 - p, 3); el.textContent = (target * e).toFixed(dec); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
    const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } }), { threshold: 0.4 });
    els.forEach(e => io.observe(e));
  }

  /* ---------- the island: real terrain, real imagery ---------- */
  function terrain() {
    const host = document.querySelector('[data-terrain]');
    if (host && window.initIslandTerrain) window.initIslandTerrain(host);
  }

  /* ---------- page-hero photography ---------- */
  function heroPhoto() {
    document.querySelectorAll('[data-photo]').forEach(el => {
      el.style.backgroundImage = `url("assets/island/${el.getAttribute('data-photo')}")`;
    });
  }

  /* ---------- the locator: a relief image with the townships pinned ---------- */
  function islandFigure() {
    const hosts = document.querySelectorAll('[data-island-figure]');
    if (!hosts.length) return;
    fetch('assets/island/island-meta.json').then(r => r.json()).then(meta => {
      hosts.forEach(host => {
        const pins = Object.entries(meta.places || {}).map(([name, p]) => {
          const left = p.u > 0.6;
          const label = name.replace(/\s*\(/, '<em>(').replace(/\)$/, ')</em>');
          return `<span class="pin${left ? ' left' : ''}" style="left:${(p.u * 100).toFixed(2)}%;top:${(p.v * 100).toFixed(2)}%"><i></i><b>${label}</b></span>`;
        }).join('');
        host.innerHTML = `<div class="relief"><img src="assets/island/island-relief.jpg" width="576" height="1322" loading="lazy" alt="Minjerribah from above: the surf beach down the eastern side, the sand banks of Moreton Bay to the west, the lakes and the sand mine inland.">${pins}</div>` +
          `<div class="cap">Copernicus Sentinel-2, 13 July 2026, shaded with Copernicus DEM elevation. ${meta.metres[0] / 1000} km by ${(meta.metres[1] / 1000).toFixed(1)} km at ${meta.metresPerPixel} m a pixel.</div>`;
      });
    }).catch(() => {});
  }

  /* ---------- the component explorer ---------- */
  function explorer() {
    const host = document.querySelector('[data-explorer]');
    if (!host || !window.TWIN_COMPONENTS) return;
    const all = window.TWIN_COMPONENTS;
    const areas = [...new Set(all.map(c => c.area))];
    const state = { build: 'all', area: 'all', status: 'all', q: '' };
    host.innerHTML = `<div class="filters" role="group" aria-label="Filter the parts">
      <button class="f" data-k="build" data-v="all" aria-pressed="true">Both builds</button><button class="f" data-k="build" data-v="first" aria-pressed="false">First build</button><button class="f" data-k="build" data-v="second" aria-pressed="false">Second build</button>
      <span class="sep"></span>
      <button class="f" data-k="status" data-v="all" aria-pressed="true">Any status</button><button class="f" data-k="status" data-v="running" aria-pressed="false">Running</button><button class="f" data-k="status" data-v="partial" aria-pressed="false">Partly</button><button class="f" data-k="status" data-v="designed" aria-pressed="false">Designed only</button>
      <span class="sep"></span>
      <input type="search" placeholder="Search parts" aria-label="Search parts">
    </div>
    <div class="filters" role="group" aria-label="Filter by area"><button class="f" data-k="area" data-v="all" aria-pressed="true">Every area</button>${areas.map(a => `<button class="f" data-k="area" data-v="${a}" aria-pressed="false">${a}</button>`).join('')}</div>
    <div class="explorer-count" aria-live="polite"></div><div class="explorer-grid"></div>`;
    const grid = host.querySelector('.explorer-grid'), count = host.querySelector('.explorer-count');
    function render() {
      const q = state.q.trim().toLowerCase();
      const items = all.filter(c => (state.build === 'all' || c.build === state.build) && (state.area === 'all' || c.area === state.area) && (state.status === 'all' || c.status === state.status) && (!q || (c.name + ' ' + c.what + ' ' + c.file + ' ' + c.area).toLowerCase().includes(q)));
      const byBuild = { first: all.filter(c => c.build === 'first').length, second: all.filter(c => c.build === 'second').length };
      count.textContent = `${items.length} of ${all.length} parts · first build ${byBuild.first} · second build ${byBuild.second}`;
      grid.innerHTML = items.map(c => `<div class="part ${c.build}" tabindex="0" role="button" aria-expanded="false"><div class="head"><span class="name">${c.name}</span><span class="chip ${c.status}">${c.status === 'designed' ? 'designed' : c.status === 'partial' ? 'partly' : 'running'}</span></div><div class="area">${c.build === 'first' ? 'first build' : 'second build'} · ${c.area}</div><div class="what">${c.what}</div><div class="file">${c.file}</div></div>`).join('') || '<p class="muted">Nothing matches. Clear a filter.</p>';
    }
    host.addEventListener('click', e => {
      const f = e.target.closest('.f'); if (f) { state[f.dataset.k] = f.dataset.v; host.querySelectorAll(`.f[data-k="${f.dataset.k}"]`).forEach(b => b.setAttribute('aria-pressed', String(b === f))); render(); return; }
      const p = e.target.closest('.part'); if (p) { p.classList.toggle('open'); p.setAttribute('aria-expanded', String(p.classList.contains('open'))); }
    });
    host.addEventListener('keydown', e => { const p = e.target.closest('.part'); if (p && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); p.click(); } });
    host.querySelector('input').addEventListener('input', e => { state.q = e.target.value; render(); });
    render();
  }

  /* ---------- counts from the data, so numbers cannot drift ---------- */
  function dataCounts() {
    if (!window.TWIN_COMPONENTS) return;
    const all = window.TWIN_COMPONENTS;
    document.querySelectorAll('[data-count-parts]').forEach(el => {
      const spec = el.getAttribute('data-count-parts').split(':'); // build:area:status, any may be *
      const n = all.filter(c => (spec[0] === '*' || c.build === spec[0]) && (spec[1] === '*' || c.area === spec[1]) && (spec[2] === undefined || spec[2] === '*' || c.status === spec[2])).length;
      el.setAttribute('data-count', String(n)); el.textContent = String(n);
    });
  }

  document.addEventListener('DOMContentLoaded', () => { topbar(); rail(); dataCounts(); counters(); reveal(); heroPhoto(); terrain(); islandFigure(); explorer(); });
})();
