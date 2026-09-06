(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ========================================================
     THEME
     ======================================================== */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('sme-theme', theme); } catch (e) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#07081a' : '#f2f3fb');
    if (window.__updateSceneTheme) window.__updateSceneTheme(theme);
  }

  let stored = null;
  try { stored = localStorage.getItem('sme-theme'); } catch (e) {}
  applyTheme(stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));

  themeToggle.addEventListener('click', () => {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  const PROJECTS = {};
  (window.PROJECT_DATA || []).forEach((p) => { PROJECTS[p.key] = p; });

  /* ------------------------------------------------------------
     Render project cards from PROJECT_DATA.
     [data-projects] marks the grid; data-limit caps how many
     render (used by the featured grid on the home page).
     ------------------------------------------------------------ */
  function renderProjectCards() {
    const grid = document.querySelector('[data-projects]');
    if (!grid || !window.PROJECT_DATA) return;

    const limit = parseInt(grid.dataset.limit, 10);
    const list = Number.isFinite(limit) ? window.PROJECT_DATA.slice(0, limit) : window.PROJECT_DATA;

    grid.innerHTML = '';
    list.forEach((p) => {
      const card = document.createElement('article');
      card.className = 'proj-card glass shine reveal tilt';
      card.dataset.cat = p.cat;
      card.dataset.key = p.key;
      // keyboard-reachable: the whole card acts as a button that opens the detail modal
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', p.title + ' — view details');
      // searchable haystack (title + blurb + full stack), lowercased once at render
      card.dataset.search = (p.title + ' ' + p.blurb + ' ' + p.stack.join(' ') + ' ' + p.chips.join(' ')).toLowerCase();

      const links = p.links.map((l) => l.private
        ? `<a href="#" data-noopen><i class="${l.icon}"></i> ${l.label}</a>`
        : `<a href="${l.href}" target="_blank" rel="noopener"><i class="${l.icon}"></i> ${l.label}</a>`
      ).join('');

      card.innerHTML = `
        <div class="proj-banner ${p.tone}"><i class="fas ${p.icon}"></i></div>
        <div class="proj-body">
          <h3></h3>
          <p></p>
          <div class="proj-stack">${p.chips.map(() => '<span></span>').join('')}</div>
          <span class="proj-more">View details <i class="fas fa-arrow-right"></i></span>
          <div class="proj-links">${links}</div>
        </div>`;

      // text set via textContent so titles/blurbs can never inject markup
      card.querySelector('h3').textContent = p.title;
      card.querySelector('p').textContent = p.blurb;
      card.querySelectorAll('.proj-stack span').forEach((s, i) => { s.textContent = p.chips[i]; });
      if (!p.links.length) card.querySelector('.proj-links').remove();

      grid.appendChild(card);
    });
  }
  renderProjectCards();

  // "Showing 6 of 11" on the home page; "11 projects" on the archive page
  (function projectCount() {
    const el = document.getElementById('projCount');
    const grid = document.querySelector('[data-projects]');
    if (!el || !grid || !window.PROJECT_DATA) return;
    const total = window.PROJECT_DATA.length;
    const shown = grid.children.length;
    el.textContent = shown < total
      ? `Showing ${shown} of ${total} projects`
      : `${total} projects in total`;
  })();

  /* ========================================================
     3D BACKGROUND (three.js)
     ======================================================== */
  function initScene() {
    if (typeof THREE === 'undefined' || reduceMotion) return;
    const canvas = document.getElementById('bg-canvas');
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

    // --- Wireframe polyhedra: small, far back, whisper-quiet ---
    const geometries = [
      new THREE.IcosahedronGeometry(0.85, 0),
      new THREE.OctahedronGeometry(0.7, 0),
      new THREE.TorusGeometry(0.62, 0.17, 10, 28),
      new THREE.DodecahedronGeometry(0.72, 0),
      new THREE.TetrahedronGeometry(0.68, 0)
    ];

    const shapes = [];
    const positions = [
      [-9.5, 3.8, -9], [9.0, 2.8, -8], [-7.2, -4.2, -10],
      [7.8, -3.8, -9], [-2.6, 5.4, -12], [3.2, -5.6, -11]
    ];

    positions.forEach((p, i) => {
      const geo = geometries[i % geometries.length];
      const mat = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.14 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(p[0], p[1], p[2]);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mesh.userData.spin = {
        x: (Math.random() - 0.5) * 0.0026,
        y: (Math.random() - 0.5) * 0.0026
      };
      mesh.userData.floatSeed = Math.random() * Math.PI * 2;
      mesh.userData.baseY = p[1];
      group.add(mesh);
      shapes.push(mesh);
    });

    // --- Particle field: fine dust, not confetti ---
    const COUNT = 620;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 38;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 26;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 22 - 8;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.032, transparent: true, opacity: 0.32, sizeAttenuation: true });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // --- Theme-aware colouring ---
    const PALETTE = {
      dark:  { shapes: [0x8b5cf6, 0x22d3ee, 0xf472b6, 0xfbbf24, 0x8b5cf6, 0x22d3ee], dots: 0xa78bfa, shapeOpacity: 0.16, dotOpacity: 0.34 },
      light: { shapes: [0x7c3aed, 0x0891b2, 0xdb2777, 0xd97706, 0x7c3aed, 0x0891b2], dots: 0x7c3aed, shapeOpacity: 0.12, dotOpacity: 0.22 }
    };

    window.__updateSceneTheme = function (theme) {
      const p = PALETTE[theme] || PALETTE.dark;
      shapes.forEach((m, i) => {
        m.material.color.setHex(p.shapes[i % p.shapes.length]);
        m.material.opacity = p.shapeOpacity;
      });
      pMat.color.setHex(p.dots);
      pMat.opacity = p.dotOpacity;
    };
    window.__updateSceneTheme(root.getAttribute('data-theme'));

    // --- Interaction ---
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
    function animate() {
      requestAnimationFrame(animate);
      if (!running) return;

      const t = clock.getElapsedTime();
      curX += (targetX - curX) * 0.045;
      curY += (targetY - curY) * 0.045;

      shapes.forEach((m) => {
        m.rotation.x += m.userData.spin.x;
        m.rotation.y += m.userData.spin.y;
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
    }
    animate();
    canvas.classList.add('ready');
  }
  initScene();

  /* ========================================================
     CURSOR SPOTLIGHT
     ======================================================== */
  const cursorGlow = document.getElementById('cursor-glow');
  if (window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
    let gx = 0, gy = 0, tx = 0, ty = 0, raf = null;
    window.addEventListener('pointermove', (e) => {
      tx = e.clientX; ty = e.clientY;
      cursorGlow.style.opacity = '1';
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    function loop() {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      cursorGlow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }
  }

  /* ========================================================
     CARD SHEEN + 3D TILT
     ======================================================== */
  document.querySelectorAll('.shine').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  if (window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
    document.querySelectorAll('.tilt').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateY(-8px) scale(1.015)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });

    // Hero photo card 3D tilt
    const heroCard = document.getElementById('heroCard');
    const heroWrap = document.querySelector('.hero-photo-wrap');
    if (heroCard && heroWrap) {
      heroWrap.addEventListener('pointermove', (e) => {
        const r = heroWrap.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        heroCard.style.transform = `rotateX(${(-py * 12).toFixed(2)}deg) rotateY(${(px * 14).toFixed(2)}deg)`;
      });
      heroWrap.addEventListener('pointerleave', () => { heroCard.style.transform = ''; });
    }
  }

  /* ========================================================
     NAV: hamburger, scroll state, active link, progress
     ======================================================== */
  const hamburger = document.getElementById('navHamburger');
  const drawer = document.getElementById('navDrawer');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    drawer.classList.toggle('open');
  });
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
  }));

  const navbar = document.getElementById('navbar');
  const btt = document.getElementById('back-top');
  const progress = document.getElementById('scroll-progress');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links li a');
  const dotLinks = document.querySelectorAll('.dot-link');
  const bttRing = document.getElementById('bttRing');
  const RING_LEN = 2 * Math.PI * 21;
  if (bttRing) bttRing.style.strokeDasharray = RING_LEN;

  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    if (btt) btt.classList.toggle('show', y > 420);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? y / max : 0;
    if (progress) progress.style.width = (pct * 100) + '%';
    if (bttRing) bttRing.style.strokeDashoffset = RING_LEN * (1 - pct);

    let current = '';
    sections.forEach((s) => { if (y >= s.offsetTop - 120) current = s.id; });
    navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    dotLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ========================================================
     SMOOTH SCROLL
     ======================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const t = document.querySelector(href);
      if (t) {
        e.preventDefault();
        window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  /* ========================================================
     PROJECT FILTER
     ======================================================== */
  const projTabs = document.querySelectorAll('.proj-tab');
  const searchWrap = document.querySelector('.proj-search');
  const searchInput = document.getElementById('projSearch');
  const emptyState = document.querySelector('.proj-empty');
  let activeCat = 'all';

  function applyFilters() {
    const term = (searchInput ? searchInput.value : '').trim().toLowerCase();
    let visible = 0;

    document.querySelectorAll('.proj-card').forEach((card) => {
      const matchesCat = activeCat === 'all' || card.dataset.cat.includes(activeCat);
      const matchesTerm = !term || (card.dataset.search || '').includes(term);
      const show = matchesCat && matchesTerm;
      card.classList.toggle('hide', !show);
      if (show) visible++;
    });

    if (emptyState) emptyState.classList.toggle('show', visible === 0);
    if (searchWrap) searchWrap.classList.toggle('filled', term.length > 0);

    // reflect the category in the URL so a filtered view can be shared / bookmarked
    if (projTabs.length) {
      const url = new URL(window.location.href);
      if (activeCat === 'all') url.searchParams.delete('filter');
      else url.searchParams.set('filter', activeCat);
      history.replaceState(null, '', url);
    }
    return visible;
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

  projTabs.forEach((btn) => {
    btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    btn.addEventListener('click', () => selectCategory(btn.dataset.cat));
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
    const clearBtn = searchWrap && searchWrap.querySelector('.clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        applyFilters();
        searchInput.focus();
      });
    }
    // Escape clears the search rather than bubbling to the modal handler
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchInput.value) {
        e.stopPropagation();
        searchInput.value = '';
        applyFilters();
      }
    });
  }

  // restore ?filter= from the URL on load
  if (projTabs.length) {
    const wanted = new URLSearchParams(window.location.search).get('filter');
    const valid = wanted && [...projTabs].some((b) => b.dataset.cat === wanted);
    selectCategory(valid ? wanted : 'all');
  }

  /* ========================================================
     SCROLL REVEAL + SKILL BARS + COUNTERS
     ======================================================== */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (Math.min(i % 6, 5) * 70) + 'ms';
    revealObserver.observe(el);
  });

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, i * 80);
      });
      barObserver.unobserve(entry.target);
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('.skill-planet').forEach((p) => barObserver.observe(p));

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const dur = 1400;
      const start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

  /* ========================================================
     TYPING EFFECT
     ======================================================== */
  const typedEl = document.getElementById('typed');
  const phrases = [
    'Full Stack Web Developer',
    'Laravel & PHP Engineer',
    'ERP Systems Specialist',
    'React.js Developer',
    'Database Architect'
  ];
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
     MARQUEE (duplicate for seamless loop)
     ======================================================== */
  const track = document.getElementById('marqueeTrack');
  if (track) track.innerHTML += track.innerHTML;

  /* ========================================================
     TOASTS
     ======================================================== */
  const toastHost = document.getElementById('toasts');
  const TOAST_ICON = { ok: 'fa-circle-check', err: 'fa-circle-exclamation', info: 'fa-circle-info' };

  function toast(message, kind) {
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
    p.points.forEach((t) => {
      const li = document.createElement('li');
      li.textContent = t;
      pts.appendChild(li);
    });

    const st = document.getElementById('modalStack');
    st.innerHTML = '';
    p.stack.forEach((t) => {
      const s = document.createElement('span');
      s.textContent = t;
      st.appendChild(s);
    });

    const lk = document.getElementById('modalLinks');
    lk.innerHTML = '';
    const openable = p.links.filter((l) => l.href);
    openable.forEach((l) => {
      const a = document.createElement('a');
      a.href = l.href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.innerHTML = `<i class="${l.icon}"></i> ${l.label}`;
      lk.appendChild(a);
    });
    lk.style.display = openable.length ? '' : 'none';

    modalRoot.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalRoot.querySelector('.modal-close').focus();

    // make the open project shareable
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

  // keep Tab inside the dialog while it is open
  if (modalRoot) modalRoot.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusables = modalRoot.querySelectorAll('button, a[href], input, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  document.querySelectorAll('.proj-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      // real outbound links keep their own behaviour
      const link = e.target.closest('a');
      if (link && !link.hasAttribute('data-noopen')) return;
      if (link) e.preventDefault();
      openModal(card.dataset.key);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      if (e.target.closest('a')) return; // let links handle their own keys
      e.preventDefault();
      openModal(card.dataset.key);
    });
  });

  // deep link: projects.html#project-erp opens that project on load
  (function openFromHash() {
    const m = /^#project-(.+)$/.exec(window.location.hash);
    if (m && PROJECTS[m[1]]) setTimeout(() => openModal(m[1]), 300);
  })();

  if (modalRoot) modalRoot.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeModal));

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (modalRoot && modalRoot.classList.contains('open')) closeModal();
    if (drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });

  /* ========================================================
     COPY TO CLIPBOARD
     ======================================================== */
  document.querySelectorAll('.ci-item.copyable').forEach((el) => {
    el.addEventListener('click', async () => {
      const value = el.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        toast('Copied to clipboard: ' + value, 'ok');
      } catch (err) {
        toast('Could not copy — please select it manually.', 'err');
      }
    });
  });

  /* ========================================================
     CONTACT FORM → validation → WHATSAPP
     ======================================================== */
  const form = document.getElementById('contactForm');

  function initContactForm() {
    if (!form) return;

  function validateField(input) {
    const group = input.closest('.form-group');
    const v = input.value.trim();
    let ok;
    if (input.id === 'c-email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    else if (input.id === 'c-message') ok = v.length >= 10;
    else ok = v.length > 0;
    group.classList.toggle('invalid', !ok);
    return ok;
  }

  form.querySelectorAll('input, textarea').forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.closest('.form-group').classList.contains('invalid')) validateField(input);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('input, textarea')];
    const allOk = fields.map(validateField).every(Boolean);

    if (!allOk) {
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
  initContactForm();

  /* ========================================================
     PRELOADER
     ======================================================== */
  const preloader = document.getElementById('preloader');
  const preBar = document.getElementById('preBar');
  const preText = document.getElementById('preText');
  let prePct = 0;
  let preDone = false;
  const hasPreloader = preloader && preBar && preText;

  const preTimer = hasPreloader ? setInterval(() => {
    prePct = Math.min(prePct + Math.random() * 18, 92);
    preBar.style.width = prePct + '%';
    preText.textContent = 'Loading ' + Math.round(prePct) + '%';
  }, 160) : null;

  function finishPreloader() {
    if (preDone || !hasPreloader) return;
    preDone = true;
    clearInterval(preTimer);
    preBar.style.width = '100%';
    preText.textContent = 'Welcome';
    setTimeout(() => preloader.classList.add('done'), 420);
  }

  if (document.readyState === 'complete') finishPreloader();
  else window.addEventListener('load', finishPreloader);
  // never let a slow asset trap the page behind the loader
  setTimeout(finishPreloader, 4000);
})();
