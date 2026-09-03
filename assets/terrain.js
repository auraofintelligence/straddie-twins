/* The Straddie Twins: the island, rendered from real data.
   Height: Copernicus DEM GLO-30 (30 m posts, European Space Agency / Sentinel programme).
   Colour: Copernicus Sentinel-2 true colour, 10 m, scene S2C_56JNQ_20260713, 13 July 2026.
   No library. WebGL2, one mesh, one light. Falls back to the flat relief image.
   Luke x Claude. */
(function () {
  'use strict';

  /* ---------- small matrix helpers (column-major, like WebGL wants) ---------- */
  function perspective(fovy, aspect, near, far) {
    const f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
    return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0];
  }
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function norm(v) { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function lookAt(eye, at, up) {
    const z = norm(sub(eye, at)), x = norm(cross(up, z)), y = cross(z, x);
    return [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0,
            -dot(x, eye), -dot(y, eye), -dot(z, eye), 1];
  }
  function mul(a, b) {
    const o = new Array(16);
    for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
      o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
    }
    return o;
  }

  const VERT = `#version 300 es
  precision highp float;
  in vec2 aGrid;                 // 0..1 across the island
  uniform mat4 uViewProj;
  uniform sampler2D uHeight;
  uniform vec2 uSize;            // island extent in scene units
  uniform float uLift;           // vertical exaggeration, scene units per unit height
  out vec2 vUv;
  out vec3 vWorld;
  void main() {
    vUv = aGrid;
    float h = texture(uHeight, vec2(aGrid.x, 1.0 - aGrid.y)).r;
    vWorld = vec3((aGrid.x - 0.5) * uSize.x, h * uLift, (0.5 - aGrid.y) * uSize.y);
    gl_Position = uViewProj * vec4(vWorld, 1.0);
  }`;

  const FRAG = `#version 300 es
  precision highp float;
  in vec2 vUv;
  in vec3 vWorld;
  uniform sampler2D uHeight;
  uniform sampler2D uColour;
  uniform vec2 uTexel;           // 1/heightmap size
  uniform vec2 uSize;
  uniform float uLift;
  uniform vec3 uSun;
  uniform vec3 uEye;
  uniform float uFade;
  out vec4 outColour;

  float hAt(vec2 uv) { return texture(uHeight, vec2(uv.x, 1.0 - uv.y)).r; }

  void main() {
    // normal from the height field itself, per fragment, so the dunes read
    float hL = hAt(vUv - vec2(uTexel.x, 0.0)), hR = hAt(vUv + vec2(uTexel.x, 0.0));
    float hD = hAt(vUv - vec2(0.0, uTexel.y)), hU = hAt(vUv + vec2(0.0, uTexel.y));
    float sx = (hR - hL) * uLift, sz = (hU - hD) * uLift;
    float dx = 2.0 * uTexel.x * uSize.x, dz = 2.0 * uTexel.y * uSize.y;
    vec3 n = normalize(vec3(-sx / dx, 1.0, sz / dz));

    vec3 base = texture(uColour, vec2(vUv.x, 1.0 - vUv.y)).rgb;
    float h = hAt(vUv);
    float land = smoothstep(0.002, 0.02, h);

    // the sun sits north and low: this is a winter morning at 27 degrees south
    float lam = max(dot(n, uSun), 0.0);
    float sky = 0.42 + 0.30 * n.y;
    vec3 lit = base * (sky + 0.85 * lam);

    // water keeps a flat normal and takes a sheen instead
    vec3 v = normalize(uEye - vWorld);
    vec3 hv = normalize(uSun + v);
    float spec = pow(max(dot(vec3(0.0, 1.0, 0.0), hv), 0.0), 90.0);
    vec3 water = base * 1.04 + vec3(0.36, 0.52, 0.62) * spec * 0.85;

    vec3 c = mix(water, lit, land);
    // depth haze towards the far end, so the length of the island reads
    float d = clamp(length(uEye - vWorld) * uFade, 0.0, 1.0);
    c = mix(c, vec3(0.031, 0.055, 0.098), d * 0.80);
    // dissolve the cut edge of the data so the mesh has no visible corners
    float e = min(min(vUv.x, 1.0 - vUv.x) / 0.05, min(vUv.y, 1.0 - vUv.y) / 0.022);
    c = mix(vec3(0.020, 0.035, 0.071), c, clamp(e, 0.0, 1.0));
    outColour = vec4(c, 1.0);
  }`;

  function compile(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }

  function loadImage(src) {
    return new Promise((res, rej) => {
      const im = new Image();
      im.onload = () => res(im); im.onerror = () => rej(new Error('image ' + src));
      im.src = src;
    });
  }

  window.initIslandTerrain = async function (host) {
    const canvas = host.querySelector('canvas');
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fallback = () => { host.classList.add('terrain-flat'); };
    if (!canvas) return fallback();

    const gl = canvas.getContext('webgl2', { antialias: true, alpha: false, powerPreference: 'high-performance' });
    if (!gl) return fallback();

    let meta, colourImg, heightImg;
    try {
      const base = host.getAttribute('data-terrain') || 'assets/island/';
      const r = await fetch(base + 'island-meta.json');
      meta = await r.json();
      [colourImg, heightImg] = await Promise.all([
        loadImage(base + 'island-colour.jpg'),
        loadImage(base + 'island-height.png'),
      ]);
    } catch (e) { return fallback(); }

    host.classList.add('terrain-live');

    /* scene units: 1 unit = 10 km, so the island is about 2 by 4.5 */
    const SX = meta.metres[0] / 10000, SZ = meta.metres[1] / 10000;
    const LIFT = (meta.maxHeightM / 10000) * (window.__ISLAND_LIFT || 5);   // vertical exaggeration, stated on the page

    /* ---------- geometry: a grid, displaced in the vertex shader ---------- */
    const CW = 200, CH = Math.round(200 * SZ / SX);
    const verts = new Float32Array((CW + 1) * (CH + 1) * 2);
    let p = 0;
    for (let j = 0; j <= CH; j++) for (let i = 0; i <= CW; i++) { verts[p++] = i / CW; verts[p++] = j / CH; }
    const idx = new Uint32Array(CW * CH * 6);
    let q = 0;
    for (let j = 0; j < CH; j++) for (let i = 0; i < CW; i++) {
      const a = j * (CW + 1) + i, b = a + 1, c = a + CW + 1, d = c + 1;
      idx[q++] = a; idx[q++] = c; idx[q++] = b; idx[q++] = b; idx[q++] = c; idx[q++] = d;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.bindAttribLocation(prog, 0, 'aGrid');
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return fallback();
    gl.useProgram(prog);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo); gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);

    function tex(unit, img, linearFilterOnly) {
      const t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linearFilterOnly ? gl.LINEAR : gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      if (!linearFilterOnly) gl.generateMipmap(gl.TEXTURE_2D);
      return t;
    }
    tex(0, heightImg, true);
    tex(1, colourImg, false);
    const U = n => gl.getUniformLocation(prog, n);
    gl.uniform1i(U('uHeight'), 0); gl.uniform1i(U('uColour'), 1);
    gl.uniform2f(U('uSize'), SX, SZ);
    gl.uniform1f(U('uLift'), LIFT);
    gl.uniform2f(U('uTexel'), 1 / heightImg.width, 1 / heightImg.height);
    gl.uniform3fv(U('uSun'), norm([0.15, 0.62, 0.77]));   // low winter sun, out of the north
    gl.uniform1f(U('uFade'), 0.052);

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.020, 0.035, 0.071, 1);

    /* ---------- markers: the three townships, at their real coordinates ---------- */
    const layer = host.querySelector('[data-markers]');
    const marks = Object.entries(meta.places || {}).map(([name, pl]) => {
      const el = document.createElement('span');
      el.className = 'tpin';
      el.innerHTML = `<i></i><b>${name.replace(/\s*\(/, '<em>(').replace(/\)$/, ')</em>')}</b>`;
      if (layer) layer.appendChild(el);
      const hpx = { x: Math.round(pl.u * heightImg.width), y: Math.round(pl.v * heightImg.height) };
      return { el, u: pl.u, v: pl.v, hpx };
    });
    // read the height under each township out of the height map itself
    const hc = document.createElement('canvas');
    hc.width = heightImg.width; hc.height = heightImg.height;
    const hx = hc.getContext('2d', { willReadFrequently: true });
    hx.drawImage(heightImg, 0, 0);
    marks.forEach(m => {
      const d = hx.getImageData(Math.min(hc.width - 1, m.hpx.x), Math.min(hc.height - 1, m.hpx.y), 1, 1).data;
      m.world = [(m.u - 0.5) * SX, (d[0] / 255) * LIFT, (0.5 - (1 - m.v)) * SZ];
      m.world[2] = ((1 - m.v) - 0.5) * SZ * -1;
    });

    const CAM = {
      wide:   { eye: [1.75, 1.45, 1.35], at: [-0.35, 0.00, -0.75], fov: 0.66, sway: 0.075 },
      narrow: { eye: [1.30, 1.55, 2.10], at: [-0.10, 0.00, -0.55], fov: 0.80, sway: 0.045 },
    };
    let W = 0, H = 0, raf = 0, t0 = performance.now(), running = true;
    function resize() {
      const r = host.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function frame(now) {
      const t = reduced ? 0 : (now - t0) / 1000;
      const wide = W > 900;
      const C = window.__ISLAND_CAM || (wide ? CAM.wide : CAM.narrow);
      // the island runs north; this looks up it from the south, drifting slowly
      const sway = Math.sin(t * 0.043) * C.sway;
      const eye = [C.eye[0] + sway, C.eye[1] + Math.sin(t * 0.061) * 0.05, C.eye[2]];
      const at = C.at;
      const view = lookAt(eye, at, [0, 1, 0]);
      const proj = perspective(C.fov, W / H, 0.05, 40);
      const vp = mul(proj, view);

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniformMatrix4fv(U('uViewProj'), false, new Float32Array(vp));
      gl.uniform3fv(U('uEye'), eye);
      gl.bindVertexArray(vao);
      gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_INT, 0);

      // project the townships with the same matrices
      marks.forEach(m => {
        const w = m.world;
        const cx = vp[0] * w[0] + vp[4] * w[1] + vp[8] * w[2] + vp[12];
        const cy = vp[1] * w[0] + vp[5] * w[1] + vp[9] * w[2] + vp[13];
        const cw = vp[3] * w[0] + vp[7] * w[1] + vp[11] * w[2] + vp[15];
        if (cw <= 0) { m.el.style.opacity = '0'; return; }
        const x = (cx / cw * 0.5 + 0.5) * W, y = (0.5 - cy / cw * 0.5) * H;
        m.el.style.transform = `translate(${(x - 4).toFixed(1)}px, ${(y - 7).toFixed(1)}px)`;
        const clear = W > 900 ? W * 0.46 : 0;
        m.el.style.opacity = (x > clear && x < W - 10 && y > 40 && y < H - 40) ? '1' : '0';
      });

      if (running && !reduced) raf = requestAnimationFrame(frame);
    }

    resize(); frame(performance.now());
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { resize(); if (reduced) frame(performance.now()); }, 140); });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!reduced) { running = true; t0 = performance.now() - 1000; raf = requestAnimationFrame(frame); }
    });
  };
})();
