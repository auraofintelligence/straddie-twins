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

  /* ---------- the island field: a stylised silhouette, not a survey ---------- */
  const ISLAND = [[0.30,0.05],[0.45,0.02],[0.60,0.02],[0.72,0.04],[0.78,0.10],[0.76,0.18],[0.72,0.30],[0.66,0.45],[0.60,0.60],[0.54,0.75],[0.48,0.88],[0.42,0.98],[0.36,0.92],[0.30,0.80],[0.26,0.66],[0.22,0.52],[0.20,0.42],[0.22,0.30],[0.24,0.18],[0.27,0.10]];
  const TOWNS = [{ n: 'Dunwich', x: 0.21, y: 0.42 }, { n: 'Amity Point', x: 0.31, y: 0.07 }, { n: 'Point Lookout', x: 0.73, y: 0.05 }];

  function inside(px, py, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1]; if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) c = !c; } return c; }
  function segDist(px, py, ax, ay, bx, by) { const dx = bx - ax, dy = by - ay; const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy || 1))); const x = ax + t * dx, y = ay + t * dy; return Math.hypot(px - x, py - y); }
  function polyDist(px, py, poly) { let d = 1e9; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) d = Math.min(d, segDist(px, py, poly[j][0], poly[j][1], poly[i][0], poly[i][1])); return d; }

  function heroCanvas() {
    const canvas = document.querySelector('canvas[data-island]');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const mode = canvas.getAttribute('data-island') || 'contours';
    let W = 0, H = 0, grid = null, cols = 0, rows = 0, ox = 0, oy = 0, scale = 1, t0 = performance.now();
    function layout() {
      const r = canvas.getBoundingClientRect(); const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.max(1, Math.floor(r.width)); H = Math.max(1, Math.floor(r.height));
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // fit the island (1 by 1 box, tall) into the right two thirds of the hero
      scale = Math.min(H * 0.92, W * 0.42); ox = W - scale * 0.82 - Math.min(W * 0.06, 80); oy = (H - scale) / 2;
      if (W < 720) { scale = Math.min(H * 0.8, W * 0.7); ox = (W - scale * 0.72) / 2; oy = (H - scale) / 2 - 20; }
      cols = 110; rows = 130; grid = new Float32Array((cols + 1) * (rows + 1));
      for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) {
        const x = i / cols, y = j / rows; const d = polyDist(x, y, ISLAND);
        grid[j * (cols + 1) + i] = inside(x, y, ISLAND) ? Math.min(1, d / 0.16) : -Math.min(1, d / 0.16);
      }
    }
    function field(i, j, t) { const base = grid[j * (cols + 1) + i]; const x = i / cols, y = j / rows; const ripple = 0.045 * Math.sin(8 * x + 6 * y + t * 0.9) + 0.03 * Math.sin(13 * y - 4 * x - t * 0.6); return base + ripple; }
    function sx(i) { return ox + (i / cols) * scale; } function sy(j) { return oy + (j / rows) * scale; }
    function lerpPt(ax, ay, av, bx, by, bv, iso) { const t = (iso - av) / ((bv - av) || 1e-6); return [ax + (bx - ax) * t, ay + (by - ay) * t]; }
    function contour(iso, t) {
      ctx.beginPath();
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const a = field(i, j, t), b = field(i + 1, j, t), c = field(i + 1, j + 1, t), d = field(i, j + 1, t);
        const idx = (a > iso ? 8 : 0) | (b > iso ? 4 : 0) | (c > iso ? 2 : 0) | (d > iso ? 1 : 0);
        if (idx === 0 || idx === 15) continue;
        const x0 = sx(i), y0 = sy(j), x1 = sx(i + 1), y1 = sy(j + 1);
        const top = lerpPt(x0, y0, a, x1, y0, b, iso), right = lerpPt(x1, y0, b, x1, y1, c, iso), bottom = lerpPt(x0, y1, d, x1, y1, c, iso), left = lerpPt(x0, y0, a, x0, y1, d, iso);
        const seg = (p, q) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); };
        switch (idx) {
          case 1: case 14: seg(left, bottom); break; case 2: case 13: seg(bottom, right); break; case 3: case 12: seg(left, right); break;
          case 4: case 11: seg(top, right); break; case 5: seg(top, left); seg(bottom, right); break; case 6: case 9: seg(top, bottom); break;
          case 7: case 8: seg(top, left); break; case 10: seg(top, right); seg(left, bottom); break;
        }
      }
      ctx.stroke();
    }
    let raf = 0;
    function frame(now) {
      const t = reduced ? 0 : (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      // sea glow
      const g = ctx.createRadialGradient(ox + scale * 0.45, oy + scale * 0.45, scale * 0.1, ox + scale * 0.45, oy + scale * 0.45, scale * 0.9);
      g.addColorStop(0, 'rgba(94,231,255,0.10)'); g.addColorStop(1, 'rgba(94,231,255,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      // contours: sea (negative) faint violet, land (positive) cyan brightening toward the ridge
      ctx.lineWidth = 1; ctx.lineJoin = 'round';
      for (let k = -4; k <= 8; k++) {
        const iso = k * 0.12; if (iso < -0.9 || iso > 0.98) continue;
        const land = iso >= 0; const a = land ? 0.16 + 0.09 * k : 0.10 - 0.015 * k;
        ctx.strokeStyle = land ? `rgba(94,231,255,${Math.min(0.9, a)})` : `rgba(143,123,255,${Math.max(0.05, a)})`;
        ctx.shadowBlur = land ? 8 : 0; ctx.shadowColor = 'rgba(94,231,255,0.5)';
        contour(iso, t);
      }
      ctx.shadowBlur = 0;
      // scan sweep across the island
      if (!reduced && mode !== 'still') {
        const p = (t * 0.12) % 1.2 - 0.1; const y = oy + p * scale;
        const sg = ctx.createLinearGradient(0, y - 40, 0, y + 40); sg.addColorStop(0, 'rgba(255,209,102,0)'); sg.addColorStop(0.5, 'rgba(255,209,102,0.22)'); sg.addColorStop(1, 'rgba(255,209,102,0)');
        ctx.fillStyle = sg; ctx.fillRect(ox - scale * 0.1, y - 40, scale * 1.1, 80);
      }
      // townships
      ctx.font = '600 11px "JetBrains Mono", monospace'; ctx.textBaseline = 'middle';
      TOWNS.forEach((tw, k) => {
        const x = ox + tw.x * scale, y = oy + tw.y * scale; const pulse = reduced ? 1 : 1 + 0.25 * Math.sin(t * 2 + k);
        ctx.beginPath(); ctx.arc(x, y, 3.2 * pulse, 0, Math.PI * 2); ctx.fillStyle = '#ffd166'; ctx.shadowBlur = 14; ctx.shadowColor = 'rgba(255,209,102,0.8)'; ctx.fill(); ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(233,239,249,0.85)'; const left = tw.x < 0.5; ctx.textAlign = left ? 'right' : 'left'; ctx.fillText(tw.n.toUpperCase(), x + (left ? -10 : 10), y);
      });
      if (!reduced && mode !== 'still') raf = requestAnimationFrame(frame);
    }
    layout(); frame(performance.now());
    let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { cancelAnimationFrame(raf); layout(); raf = requestAnimationFrame(frame); }, 120); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(raf); else if (!reduced) raf = requestAnimationFrame(frame); });
  }

  /* ---------- island SVG figure (stylised) ---------- */
  function islandSvg() {
    document.querySelectorAll('[data-island-svg]').forEach(host => {
      const pts = ISLAND.map(p => `${(p[0] * 300).toFixed(1)},${(p[1] * 380).toFixed(1)}`).join(' ');
      const towns = TOWNS.map(t => `<circle cx="${t.x * 300}" cy="${t.y * 380}" r="4" fill="#ffd166"/><text class="lbl big" x="${t.x * 300 + (t.x < 0.5 ? -10 : 10)}" y="${t.y * 380 + 4}" text-anchor="${t.x < 0.5 ? 'end' : 'start'}">${t.n}</text>`).join('');
      host.innerHTML = `<svg viewBox="-70 -20 440 445" role="img" aria-label="A stylised outline of North Stradbroke Island with its three townships marked"><defs><linearGradient id="isl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5ee7ff" stop-opacity="0.35"/><stop offset="1" stop-color="#8f7bff" stop-opacity="0.15"/></linearGradient></defs><polygon points="${pts}" fill="url(#isl)" stroke="#5ee7ff" stroke-width="1.5" stroke-linejoin="round"/>${towns}<text class="lbl" x="150" y="410" text-anchor="middle">MORETON BAY TO THE WEST · THE PACIFIC TO THE EAST</text></svg><div class="cap">Stylised outline, not to scale. The twins carry the real geometry.</div>`;
    });
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

  document.addEventListener('DOMContentLoaded', () => { topbar(); rail(); dataCounts(); counters(); reveal(); heroCanvas(); islandSvg(); explorer(); });
})();
