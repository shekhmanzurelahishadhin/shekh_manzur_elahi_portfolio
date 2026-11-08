(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* ========================================================
     THEME
     The hero and footer are always dark; the theme only
     switches the content sheet between white and navy.
     ======================================================== */
  const themeToggle = document.getElementById('themeToggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('sme-theme', theme); } catch (e) {}
  }

  let stored = null;
  try { stored = localStorage.getItem('sme-theme'); } catch (e) {}
  applyTheme(stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  if (themeToggle) themeToggle.addEventListener('click', () => {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ========================================================
     PROJECT RENDERING
     PROJECT_DATA (projects.js) feeds two layouts:
       [data-projects][data-layout=stack]  sticky stacked cards (home)
       [data-projects]              grid cards (projects.html)
     ======================================================== */
  const DATA = window.PROJECT_DATA || [];
  const PROJECTS = {};
  DATA.forEach((p) => { PROJECTS[p.key] = p; });

  const CAT_LABEL = { ai: 'AI', nextjs: 'Next.js', react: 'React.js', laravel: 'Laravel', fullstack: 'Full Stack' };
  function primaryTag(p) {
    const first = p.cat.split(' ')[0];
    return CAT_LABEL[first] || 'Project';
  }

  function visual(p, withChips) {
    const chips = withChips ? `<div class="pv-chips">${p.chips.slice(0, 3).map(() => '<span></span>').join('')}</div>` : '';
    return `<div class="pv ${p.tone}" aria-hidden="true"><i class="fas ${p.icon} pv-ico"></i>${chips}</div>`;
  }

  function fillChips(scope, sel, list) {
    scope.querySelectorAll(sel).forEach((s, i) => { s.textContent = list[i]; });
  }

  function renderProjectCards() {
    const list = document.querySelector('[data-projects]');
    if (!list || !DATA.length) return;

    const limit = parseInt(list.dataset.limit, 10);
    const items = Number.isFinite(limit) ? DATA.slice(0, limit) : DATA;

    list.innerHTML = '';
    items.forEach((p, i) => {
      const card = document.createElement('article');
      card.className = 'proj-card reveal';
      card.style.setProperty('--i', i);
      card.dataset.cat = p.cat;
      card.dataset.key = p.key;
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', p.title + ' — view details');
      card.dataset.search = (p.title + ' ' + p.blurb + ' ' + p.stack.join(' ') + ' ' + p.chips.join(' ')).toLowerCase();

      const links = p.links.map((l) => l.private
        ? `<a href="#" data-noopen><i class="${l.icon}"></i> ${l.label}</a>`
        : `<a href="${l.href}" target="_blank" rel="noopener"><i class="${l.icon}"></i> ${l.label}</a>`
      ).join('');

      card.innerHTML = `
        ${visual(p, true)}
        <div class="proj-body">
          <span class="tag"></span>
          <h3></h3>
          <p></p>
          <div class="chip-row">${p.chips.map(() => '<span></span>').join('')}</div>
          <div class="proj-foot">
            <span class="proj-more">View details <i class="fas fa-arrow-right"></i></span>
            <div class="proj-links">${links}</div>
          </div>
        </div>`;

      // text set via textContent so data can never inject markup
      card.querySelector('.tag').textContent = primaryTag(p);
      card.querySelector('h3').textContent = p.title;
      card.querySelector('.proj-body p').textContent = p.blurb;
      fillChips(card, '.proj-body .chip-row span', p.chips);
      fillChips(card, '.pv-chips span', p.chips);
      if (!p.links.length) card.querySelector('.proj-links').remove();

      list.appendChild(card);
    });
  }

  renderProjectCards();

  (function projectCount() {
    const el = document.getElementById('projCount');
    const list = document.querySelector('[data-projects]');
    if (!el || !list || !DATA.length) return;
    const total = DATA.length;
    const shown = list.children.length;
    el.textContent = shown < total ? `Showing ${shown} of ${total} projects` : `${total} projects in total`;
  })();

  /* ========================================================
     3D BACKGROUND (three.js) — developer icons in outline
     ======================================================== */
  function initScene() {
    if (typeof THREE === 'undefined') return;
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    } catch (e) { return; }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 14;

    const group = new THREE.Group();
    scene.add(group);

    const V = (x, y, z) => new THREE.Vector3(x, y, z || 0);
    const geoOf = (pts) => new THREE.BufferGeometry().setFromPoints(pts);
    const poly = (arr, closed) => {
      const out = [];
      for (let i = 0; i < arr.length - 1; i++) out.push(V(arr[i][0], arr[i][1]), V(arr[i + 1][0], arr[i + 1][1]));
      if (closed) out.push(V(arr[arr.length - 1][0], arr[arr.length - 1][1]), V(arr[0][0], arr[0][1]));
      return out;
    };
    const circle = (cx, cy, r, seg) => {
      const a = [];
      for (let i = 0; i < (seg || 20); i++) { const t = (i / (seg || 20)) * Math.PI * 2; a.push([cx + Math.cos(t) * r, cy + Math.sin(t) * r]); }
      return poly(a, true);
    };
    const rect = (x, y, w, h) => poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], true);
    const ringY = (r, y, seg) => {
      const pts = [];
      for (let i = 0; i < seg; i++) {
        const a0 = (i / seg) * Math.PI * 2, a1 = ((i + 1) / seg) * Math.PI * 2;
        pts.push(V(Math.cos(a0) * r, y, Math.sin(a0) * r), V(Math.cos(a1) * r, y, Math.sin(a1) * r));
      }
      return pts;
    };

    const code = [
      ...poly([[-0.35, 0.45], [-0.85, 0], [-0.35, -0.45]]),
      ...poly([[0.18, 0.55], [-0.18, -0.55]]),
      ...poly([[0.35, 0.45], [0.85, 0], [0.35, -0.45]])
    ];
    const brace = [[-0.25, 0.75], [-0.4, 0.68], [-0.45, 0.5], [-0.45, 0.15], [-0.55, 0.03], [-0.7, 0], [-0.55, -0.03], [-0.45, -0.15], [-0.45, -0.5], [-0.4, -0.68], [-0.25, -0.75]];
    const braces = [...poly(brace), ...poly(brace.map(([x, y]) => [-x, y]))];
    const terminal = [
      ...rect(-0.95, -0.62, 1.9, 1.24),
      ...poly([[-0.95, 0.38], [0.95, 0.38]]),
      ...circle(-0.78, 0.5, 0.05, 10), ...circle(-0.62, 0.5, 0.05, 10), ...circle(-0.46, 0.5, 0.05, 10),
      ...poly([[-0.7, 0.12], [-0.42, -0.08], [-0.7, -0.28]]),
      ...poly([[-0.3, -0.3], [0.1, -0.3]])
    ];
    const branchCurve = [];
    for (let i = 0; i <= 10; i++) { const t = i / 10; branchCurve.push([-0.4 + 0.85 * t, -0.3 + 0.36 * (1 - Math.pow(1 - t, 2))]); }
    const git = [
      ...circle(-0.4, -0.72, 0.15), ...circle(-0.4, 0.72, 0.15), ...circle(0.45, 0.21, 0.15),
      ...poly([[-0.4, -0.57], [-0.4, 0.57]]),
      ...poly(branchCurve)
    ];
    const db = [...ringY(0.62, 0.55, 40), ...ringY(0.62, 0, 40), ...ringY(0.62, -0.55, 40)];
    [0, 1, 2, 3].forEach((k) => { const a = k * Math.PI / 2; db.push(V(Math.cos(a) * 0.62, 0.55, Math.sin(a) * 0.62), V(Math.cos(a) * 0.62, -0.55, Math.sin(a) * 0.62)); });
    const server = [];
    [0.3, -0.2, -0.7].forEach((y) => {
      server.push(...rect(-0.8, y, 1.6, 0.4));
      server.push(...circle(0.5, y + 0.2, 0.05, 10), ...circle(0.64, y + 0.2, 0.05, 10));
      server.push(...poly([[-0.62, y + 0.2], [-0.1, y + 0.2]]));
    });
    const browser = [
      ...rect(-0.95, -0.65, 1.9, 1.3),
      ...poly([[-0.95, 0.4], [0.95, 0.4]]),
      ...circle(-0.8, 0.52, 0.05, 10), ...circle(-0.66, 0.52, 0.05, 10), ...circle(-0.52, 0.52, 0.05, 10),
      ...rect(-0.35, 0.47, 1.1, 0.1),
      ...poly([[-0.75, 0.15], [0.3, 0.15]]), ...poly([[-0.75, -0.08], [0.6, -0.08]]), ...poly([[-0.75, -0.31], [0.1, -0.31]])
    ];
    const gearPts = [];
    const TEETH = 8;
    for (let i = 0; i < TEETH * 4; i++) {
      const a = (i / (TEETH * 4)) * Math.PI * 2;
      const r = (i % 4 === 0 || i % 4 === 1) ? 0.72 : 0.56;
      gearPts.push([Math.cos(a) * r, Math.sin(a) * r]);
    }
    const gear = [...poly(gearPts, true), ...circle(0, 0, 0.22, 24)];

    const icons = [
      [code, false], [db, true], [terminal, false], [braces, false],
      [git, false], [server, false], [browser, false], [gear, false]
    ];
    const COLORS = [0x8f7dff, 0x6a55ff, 0xb3a6ff, 0x7b66ff];

    const shapes = [];
    const positions = [
      [-9.5, 3.8, -9], [9.0, 2.8, -8], [-7.2, -4.2, -10], [7.8, -3.8, -9],
      [-2.6, 5.4, -12], [3.2, -5.6, -11], [-11.5, -0.4, -12], [11.5, 0.2, -11]
    ];

    positions.forEach((p, i) => {
      const [pts, spins] = icons[i % icons.length];
      const mat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.3, color: COLORS[i % COLORS.length] });
      const mesh = new THREE.LineSegments(geoOf(pts), mat);
      mesh.position.set(p[0], p[1], p[2]);
      mesh.scale.setScalar(1.1);
      if (spins) {
        mesh.rotation.set(0.35, Math.random() * Math.PI, 0);
        mesh.userData.spin = { x: 0, y: 0.0028 };
      } else {
        mesh.userData.sway = true;
        mesh.rotation.z = (Math.random() - 0.5) * 0.25;
      }
      mesh.userData.floatSeed = Math.random() * Math.PI * 2;
      mesh.userData.baseY = p[1];
      group.add(mesh);
      shapes.push(mesh);
    });

    const COUNT = 620;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 38;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 26;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 22 - 8;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.032, transparent: true, opacity: 0.35, color: 0xb3a6ff, sizeAttenuation: true });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    let targetX = 0, targetY = 0, curX = 0, curY = 0, scrollY = 0;
    window.addEventListener('pointermove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
    window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let running = true;
    document.addEventListener('visibilitychange', () => { running = !document.hidden; });

    const clock = new THREE.Clock();
    (function animate() {
      requestAnimationFrame(animate);
      if (!running) return;
      const t = clock.getElapsedTime();
      curX += (targetX - curX) * 0.045;
      curY += (targetY - curY) * 0.045;

      shapes.forEach((m) => {
        if (m.userData.sway) {
          m.rotation.y = Math.sin(t * 0.35 + m.userData.floatSeed) * 0.45;
          m.rotation.x = Math.sin(t * 0.27 + m.userData.floatSeed * 1.7) * 0.15;
        } else {
          m.rotation.x += m.userData.spin.x;
          m.rotation.y += m.userData.spin.y;
        }
        m.position.y = m.userData.baseY + Math.sin(t * 0.55 + m.userData.floatSeed) * 0.5;
      });

      group.rotation.y = curX * 0.28;
      group.rotation.x = curY * 0.18;
      group.position.y = scrollY * 0.0018;
      points.rotation.y = t * 0.018 + curX * 0.1;
      points.rotation.x = curY * 0.06;
      camera.position.x += (curX * 1.1 - camera.position.x) * 0.05;
      camera.position.y += (-curY * 0.8 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    })();
    canvas.classList.add('ready');
  }
  // three.js is loaded only after the page is showing, so it never delays the content
  if (!reduceMotion && document.getElementById('bg-canvas')) {
    const loadThree = () => {
      const tag = document.createElement('script');
      tag.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      tag.async = true;
      tag.onload = initScene;
      document.head.appendChild(tag);
    };
    if (document.readyState === 'complete') setTimeout(loadThree, 200);
    else window.addEventListener('load', () => setTimeout(loadThree, 200));
  }

  /* ========================================================
     NAV: drawer, scroll state, active link, back-to-top
     ======================================================== */
  const hamburger = document.getElementById('navHamburger');
  const drawer = document.getElementById('navDrawer');
  function setDrawer(open) {
    if (!drawer || !hamburger) return;
    hamburger.classList.toggle('open', open);
    drawer.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (hamburger) hamburger.addEventListener('click', () => setDrawer(!drawer.classList.contains('open')));
  if (drawer) drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setDrawer(false)));

  const navbar = document.getElementById('navbar');
  const btt = document.getElementById('back-top');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-pill a');

  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 30);
    if (btt) btt.classList.toggle('show', y > 600);

    let current = '';
    // getBoundingClientRect, not offsetTop: sections inside the sheet are offset from the sheet
    sections.forEach((s) => { if (s.getBoundingClientRect().top <= 140) current = s.id; });
    navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#' || a.hasAttribute('data-noopen')) return;
      const t = document.querySelector(href);
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  /* ========================================================
     HERO: word-by-word title + staggered entrance
     ======================================================== */
  (function heroIntro() {
    const title = document.querySelector('[data-split]');
    if (title) {
      const words = title.textContent.trim().split(/\s+/);
      title.setAttribute('aria-label', title.textContent.trim());
      title.innerHTML = words.map((w, i) =>
        `<span class="w" aria-hidden="true"><span style="transition-delay:${(0.05 + i * 0.045).toFixed(2)}s">${w.replace(/</g, '&lt;')}</span></span>`
      ).join(' ');
    }
    const appear = [...document.querySelectorAll('.appear')];
    const wordCount = title ? title.querySelectorAll('.w').length : 0;
    const base = 0.15 + wordCount * 0.045;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (title) title.classList.add('in');
      appear.forEach((el, i) => {
        // anything inside the hero follows the title; the rest is handled by the reveal observer
        if (el.closest('.hero') || el.closest('.page-hero') || el.closest('.nf')) {
          el.style.transitionDelay = (el.closest('.logos') ? 0 : base + i * 0.06).toFixed(2) + 's';
          if (!el.closest('.logos')) el.classList.add('in');
        }
      });
    }));
  })();

  /* ========================================================
     SCROLL REVEAL + COUNTERS + EDU BARS
     ======================================================== */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  // stagger siblings that enter together
  document.querySelectorAll('.reveal, .logos .appear').forEach((el) => {
    const sibs = el.parentElement ? [...el.parentElement.children].filter((c) => c.classList.contains('reveal')) : [];
    const idx = Math.max(0, sibs.indexOf(el));
    if (!el.classList.contains('proj-card')) el.style.transitionDelay = (Math.min(idx, 6) * 80) + 'ms';
    revealObserver.observe(el);
  });

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      if (reduceMotion) { el.textContent = target + suffix; countObserver.unobserve(el); return; }
      const dur = 1400;
      const start = performance.now();
      (function step(now) {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(step);
      })(start);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.width = entry.target.dataset.pct + '%';
      barObserver.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.edu-bar i[data-pct]').forEach((b) => barObserver.observe(b));

  /* ========================================================
     SCRUB TEXT: words light up as the paragraph scrolls by
     ======================================================== */
  (function scrubText() {
    const blocks = document.querySelectorAll('.scrub');
    if (!blocks.length) return;
    const all = [];
    blocks.forEach((block) => {
      // wrap words in text nodes only, so <strong> etc. survive
      const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((node) => {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const s = document.createElement('span');
          s.className = 'sw';
          s.textContent = part;
          frag.appendChild(s);
        });
        node.parentNode.replaceChild(frag, node);
      });
      all.push({ block, words: [...block.querySelectorAll('.sw')] });
    });

    if (reduceMotion) { all.forEach(({ words }) => words.forEach((w) => w.classList.add('lit'))); return; }

    function update() {
      const vh = window.innerHeight;
      all.forEach(({ block, words }) => {
        const r = block.getBoundingClientRect();
        // 0 when the top hits 85% of the viewport, 1 when the bottom reaches 45%
        const start = vh * 0.85, end = vh * 0.45;
        const total = (r.height + start - end);
        const p = Math.min(1, Math.max(0, (start - r.top) / total));
        const n = Math.round(p * words.length);
        words.forEach((w, i) => w.classList.toggle('lit', i < n));
      });
    }
    let raf = 0;
    window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); }, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();

  /* ========================================================
     STACKED PROJECT CARDS: earlier cards shrink and dim as
     the next one slides over them
     ======================================================== */
  (function stackCards() {
    const list = document.querySelector('[data-layout="stack"]');
    if (!list || reduceMotion) return;
    const cards = () => [...list.querySelectorAll('.proj-card:not(.hide)')];

    function update() {
      if (window.innerWidth <= 900) { cards().forEach((c) => { c.style.transform = ''; c.style.filter = ''; }); return; }
      const cs = cards();
      cs.forEach((card, i) => {
        const next = cs[i + 1];
        if (!next) { card.style.transform = ''; card.style.filter = ''; return; }
        const a = card.getBoundingClientRect();
        const b = next.getBoundingClientRect();
        // how far the next card has travelled over this one (0..1)
        const overlap = Math.min(1, Math.max(0, (a.bottom - b.top) / a.height));
        card.style.transform = `scale(${(1 - overlap * 0.06).toFixed(4)})`;
        card.style.filter = `brightness(${(1 - overlap * 0.25).toFixed(3)})`;
      });
    }
    let raf = 0;
    window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); }, { passive: true });
    window.addEventListener('resize', update);
    list.__updateStack = update;
    update();
  })();

  /* ========================================================
     FOCUS STEPPER: numbered pills, auto-advance until touched
     ======================================================== */
  (function focusSteps() {
    const wrap = document.querySelector('[data-steps]');
    if (!wrap) return;
    const btns = [...wrap.querySelectorAll('[data-step]')];
    const panels = [...wrap.querySelectorAll('[data-step-panel]')];
    const label = wrap.querySelector('[data-step-label]');
    let cur = 0, timer = null, touched = false;

    function go(i, focus) {
      cur = (i + btns.length) % btns.length;
      btns.forEach((b, j) => {
        const on = j === cur;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
        b.tabIndex = on ? 0 : -1;
      });
      panels.forEach((p, j) => p.classList.toggle('active', j === cur));
      if (label) label.textContent = `Step ${cur + 1} : ${btns[cur].dataset.name}`;
      if (focus) btns[cur].focus();
    }
    function stop() { touched = true; clearInterval(timer); }

    btns.forEach((b, i) => {
      b.addEventListener('click', () => { stop(); go(i); });
      b.addEventListener('keydown', (e) => {
        const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (d === undefined) return;
        e.preventDefault(); stop(); go(cur + d, true);
      });
    });
    go(0);

    if (!reduceMotion) {
      // only auto-advance while the stepper is on screen
      new IntersectionObserver(([e]) => {
        clearInterval(timer);
        if (e.isIntersecting && !touched) timer = setInterval(() => go(cur + 1), 4500);
      }, { threshold: 0.4 }).observe(wrap);
    }
  })();

  /* ========================================================
     MARQUEES: duplicate content for a seamless loop
     ======================================================== */
  document.querySelectorAll('[data-marquee] .marquee-track').forEach((track) => {
    const clone = track.innerHTML;
    track.insertAdjacentHTML('beforeend', clone);
    [...track.children].slice(track.children.length / 2).forEach((c) => c.setAttribute('aria-hidden', 'true'));
  });

  /* ========================================================
     PROJECT FILTER (home tabs + archive search)
     ======================================================== */
  const projTabs = document.querySelectorAll('.proj-tab');
  const searchWrap = document.querySelector('.proj-search');
  const searchInput = document.getElementById('projSearch');
  const emptyState = document.querySelector('.proj-empty');
  let activeCat = 'all';

  function applyFilters() {
    const term = (searchInput ? searchInput.value : '').trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll('[data-projects] .proj-card').forEach((card) => {
      const show = (activeCat === 'all' || card.dataset.cat.includes(activeCat)) &&
                   (!term || (card.dataset.search || '').includes(term));
      card.classList.toggle('hide', !show);
      // re-shown cards are revealed by the observer once they scroll into view
      if (show) visible++;
    });
    if (emptyState) emptyState.classList.toggle('show', visible === 0);
    const result = document.getElementById('projResult');
    if (result) {
      const total = document.querySelectorAll('[data-projects] .proj-card').length;
      result.textContent = visible === total ? `Showing all ${total} projects`
        : `Showing ${visible} of ${total} projects` + (term ? ` for “${term}”` : '');
    }
    if (searchWrap) searchWrap.classList.toggle('filled', term.length > 0);

    const list = document.querySelector('[data-layout="stack"]');
    if (list && list.__updateStack) list.__updateStack();

    if (projTabs.length) {
      const url = new URL(window.location.href);
      if (activeCat === 'all') url.searchParams.delete('filter');
      else url.searchParams.set('filter', activeCat);
      history.replaceState(null, '', url);
    }
  }

  function selectCategory(cat) {
    activeCat = cat;
    projTabs.forEach((b) => {
      const on = b.dataset.cat === cat;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    applyFilters();
  }

  projTabs.forEach((btn) => btn.addEventListener('click', () => {
    selectCategory(btn.dataset.cat);
    // keep the chosen chip in view when the chip row scrolls sideways on phones
    btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
  }));

  document.querySelectorAll('[data-clear-filters]').forEach((b) => b.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    selectCategory('all');
  }));

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
    const clearBtn = searchWrap && searchWrap.querySelector('.clear');
    if (clearBtn) clearBtn.addEventListener('click', () => { searchInput.value = ''; applyFilters(); searchInput.focus(); });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchInput.value) { e.stopPropagation(); searchInput.value = ''; applyFilters(); }
    });
  }

  if (projTabs.length) {
    const wanted = new URLSearchParams(window.location.search).get('filter');
    const valid = wanted && [...projTabs].some((b) => b.dataset.cat === wanted);
    selectCategory(valid ? wanted : 'all');
  }

  /* ========================================================
     EXPERIENCE DURATIONS (computed so they never go stale)
     ======================================================== */
  (function experienceDurations() {
    function months(fromStr, toStr) {
      const [fy, fm] = fromStr.split('-').map(Number);
      const to = toStr ? toStr.split('-').map(Number) : null;
      const now = new Date();
      const ty = to ? to[0] : now.getFullYear();
      const tm = to ? to[1] : now.getMonth() + 1;
      return (ty - fy) * 12 + (tm - fm) + 1;
    }
    function label(n) {
      const y = Math.floor(n / 12), m = n % 12;
      if (!y) return m + ' mo';
      if (!m) return y + (y > 1 ? ' yrs' : ' yr');
      return y + (y > 1 ? ' yrs' : ' yr') + ' ' + m + ' mo';
    }
    document.querySelectorAll('.tl-dur[data-from]').forEach((el) => {
      el.textContent = label(months(el.dataset.from, el.dataset.to));
    });
    const since = document.querySelector('[data-since]');
    if (since) {
      const total = Math.floor(months(since.dataset.since) / 12);
      since.dataset.count = String(total);
      since.dataset.suffix = '+';
      since.textContent = total + '+';
    }
  })();

  /* ========================================================
     TYPING EFFECT
     ======================================================== */
  const typedEl = document.getElementById('typed');
  const phrases = ['Full Stack Web Developer', 'Laravel & PHP Engineer', 'ERP Systems Specialist', 'React.js Developer', 'Database Architect'];
  if (typedEl) {
    if (reduceMotion) {
      typedEl.textContent = phrases[0];
    } else {
      let pi = 0, ci = 0, deleting = false;
      (function type() {
        const word = phrases[pi];
        typedEl.textContent = word.slice(0, ci);
        let delay = deleting ? 45 : 85;
        if (!deleting && ci === word.length) { deleting = true; delay = 1800; }
        else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 350; }
        else { ci += deleting ? -1 : 1; }
        setTimeout(type, delay);
      })();
    }
  }

  /* ========================================================
     TOASTS
     ======================================================== */
  const toastHost = document.getElementById('toasts');
  const TOAST_ICON = { ok: 'fa-circle-check', err: 'fa-circle-exclamation', info: 'fa-circle-info' };
  function toast(message, kind) {
    if (!toastHost) return;
    kind = kind || 'info';
    const el = document.createElement('div');
    el.className = 'toast ' + kind;
    el.innerHTML = `<i class="fas ${TOAST_ICON[kind]}"></i><span></span>`;
    el.querySelector('span').textContent = message;
    toastHost.appendChild(el);
    setTimeout(() => {
      el.classList.add('out');
      el.addEventListener('animationend', () => el.remove(), { once: true });
    }, 3200);
  }

  /* ========================================================
     PROJECT DETAIL MODAL
     ======================================================== */
  const modalRoot = document.getElementById('modal-root');
  const modalIcon = document.getElementById('modalIcon');
  let lastFocused = null;

  function openModal(key) {
    const p = PROJECTS[key];
    if (!p || !modalRoot) return;
    lastFocused = document.activeElement;

    modalIcon.className = 'modal-icon ' + p.tone;
    modalIcon.innerHTML = `<i class="fas ${p.icon}"></i>`;
    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalRole').textContent = p.role;
    document.getElementById('modalDesc').textContent = p.desc;

    const pts = document.getElementById('modalPoints');
    pts.innerHTML = '';
    p.points.forEach((t) => { const li = document.createElement('li'); li.textContent = t; pts.appendChild(li); });

    const st = document.getElementById('modalStack');
    st.innerHTML = '';
    p.stack.forEach((t) => { const s = document.createElement('span'); s.textContent = t; st.appendChild(s); });

    const lk = document.getElementById('modalLinks');
    lk.innerHTML = '';
    const openable = p.links.filter((l) => l.href);
    openable.forEach((l) => {
      const a = document.createElement('a');
      a.href = l.href; a.target = '_blank'; a.rel = 'noopener';
      a.innerHTML = `<i class="${l.icon}"></i> ${l.label}`;
      lk.appendChild(a);
    });
    lk.style.display = openable.length ? '' : 'none';

    modalRoot.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalRoot.querySelector('.modal-close').focus();
    history.replaceState(null, '', '#project-' + key);
  }

  function closeModal() {
    if (!modalRoot || !modalRoot.classList.contains('open')) return;
    modalRoot.classList.remove('open');
    document.body.style.overflow = '';
    if (window.location.hash.startsWith('#project-')) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    if (lastFocused) lastFocused.focus();
  }

  if (modalRoot) {
    modalRoot.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const f = modalRoot.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    modalRoot.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeModal));
  }

  // one delegated handler covers stacked and grid cards
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.proj-card');
    if (!card || !card.dataset.key) return;
    const link = e.target.closest('a');
    if (link && !link.hasAttribute('data-noopen')) return;
    if (link) e.preventDefault();
    openModal(card.dataset.key);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest && e.target.closest('.proj-card');
    if (!card || card !== e.target) return;
    e.preventDefault();
    openModal(card.dataset.key);
  });

  (function openFromHash() {
    const m = /^#project-(.+)$/.exec(window.location.hash);
    if (m && PROJECTS[m[1]]) setTimeout(() => openModal(m[1]), 300);
  })();

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeModal();
    if (drawer && drawer.classList.contains('open')) setDrawer(false);
  });

  /* ========================================================
     COPY TO CLIPBOARD
     ======================================================== */
  document.querySelectorAll('.ci-item.copyable').forEach((el) => {
    const copy = async () => {
      const value = el.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        toast('Copied to clipboard: ' + value, 'ok');
      } catch (err) {
        toast('Could not copy — please select it manually.', 'err');
      }
    };
    el.addEventListener('click', copy);
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); copy(); } });
  });

  /* ========================================================
     CONTACT FORM → validation → WHATSAPP
     ======================================================== */
  const form = document.getElementById('contactForm');
  if (form) {
    const validateField = (input) => {
      const group = input.closest('.form-group');
      const v = input.value.trim();
      let ok;
      if (input.id === 'c-email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      else if (input.id === 'c-message') ok = v.length >= 10;
      else ok = v.length > 0;
      group.classList.toggle('invalid', !ok);
      return ok;
    };

    form.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.closest('.form-group').classList.contains('invalid')) validateField(input);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = [...form.querySelectorAll('input, textarea')];
      if (!fields.map(validateField).every(Boolean)) {
        toast('Please fix the highlighted fields.', 'err');
        const firstBad = form.querySelector('.form-group.invalid input, .form-group.invalid textarea');
        if (firstBad) firstBad.focus();
        return;
      }
      const name = document.getElementById('c-name').value.trim();
      const email = document.getElementById('c-email').value.trim();
      const subject = document.getElementById('c-subject').value.trim();
      const message = document.getElementById('c-message').value.trim();
      const text = `*New Contact Message from Website*%0A👤 *Name:* ${encodeURIComponent(name)}%0A📧 *Email:* ${encodeURIComponent(email)}%0A📝 *Subject:* ${encodeURIComponent(subject)}%0A💬 *Message:* ${encodeURIComponent(message)}`;
      window.open(`https://api.whatsapp.com/send?phone=8801973829988&text=${text}`, '_blank');
      toast('Opening WhatsApp with your message…', 'ok');
      form.reset();
    });
  }
})();
