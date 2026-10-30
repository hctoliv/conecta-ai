(() => {
  const WHATSAPP = '5511999118966';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => innerWidth <= 860;
  const wa = (txt) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;
  $('#ano').textContent = new Date().getFullYear();

  /* ---------- loader ---------- */
  const loader = $('#loader'), pctEl = $('#ldPct');
  let pct = 0, loaded = false;
  addEventListener('load', () => (loaded = true));
  setTimeout(() => (loaded = true), 3500);
  const t0 = performance.now();
  function tick() {
    const target = loaded ? 100 : Math.min(90, (performance.now() - t0) / 18);
    pct += (target - pct) * 0.12 + 0.3;
    if (pct >= 100 && performance.now() - t0 > 1400) return done();
    pctEl.textContent = Math.min(99, Math.floor(pct));
    requestAnimationFrame(tick);
  }
  function done() {
    pctEl.textContent = 100;
    setTimeout(() => {
      loader.classList.add('out');
      document.body.classList.remove('is-loading');
      document.body.classList.add('ready');
      setTimeout(() => loader.remove(), 1100);
    }, 200);
  }
  loader.addEventListener('click', () => (pct = 100, loaded = true));
  reduce ? done() : requestAnimationFrame(tick);

  /* ---------- header e menu ---------- */
  const hd = $('#hd'), burger = $('#burger'), nav = $('#nav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('a', nav).forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); document.body.style.overflow = '';
  }));

  /* ---------- rede do hero ---------- */
  const cv = $('#net'), ctx = cv.getContext('2d'), hero = $('.hero');
  let W, H, dpr, pts = [], mouse = { x: -999, y: -999, on: false }, heroVis = true;
  function sizeNet() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = hero.clientWidth; H = hero.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(clamp(W * H / 14000, 40, 120));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.8 + .8, hot: 0
    }));
  }
  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true;
  });
  hero.addEventListener('pointerleave', () => (mouse.on = false));
  new IntersectionObserver(([e]) => (heroVis = e.isIntersecting)).observe(hero);
  const LINK = 130, MLINK = 210;
  function drawNet(t) {
    if (heroVis) {
      ctx.clearRect(0, 0, W, H);
      // sem mouse (celular), um ponto "ideia" passeia sozinho
      const mx = mouse.on ? mouse.x : W * (.62 + .22 * Math.sin(t / 3200));
      const my = mouse.on ? mouse.y : H * (.42 + .2 * Math.cos(t / 2700));
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = mx - p.x, dy = my - p.y, d = Math.hypot(dx, dy);
        p.hot += ((d < MLINK ? 1 : 0) - p.hot) * .08;
        if (d < MLINK && d > 40) { p.x += dx * .0025; p.y += dy * .0025; }
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(110,170,255,${(1 - d / LINK) * .22})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      const g = ctx.createRadialGradient(mx, my, 0, mx, my, MLINK);
      g.addColorStop(0, 'rgba(0,200,255,.18)'); g.addColorStop(1, 'rgba(0,200,255,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(mx, my, MLINK, 0, 7); ctx.fill();
      for (const p of pts) {
        if (p.hot > .05) {
          ctx.strokeStyle = `rgba(0,200,255,${p.hot * .75})`; ctx.lineWidth = 1.4;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mx, my); ctx.stroke();
        }
        ctx.fillStyle = p.hot > .3 ? '#7fe3ff' : 'rgba(170,200,255,.55)';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + p.hot * 1.6, 0, 7); ctx.fill();
      }
      ctx.fillStyle = '#fff'; ctx.shadowColor = '#00c8ff'; ctx.shadowBlur = 20;
      ctx.beginPath(); ctx.arc(mx, my, 5, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
      ctx.font = '500 11px "DM Mono", monospace'; ctx.fillStyle = 'rgba(238,243,255,.85)';
      const flip = mx > W - 100;
      ctx.textAlign = flip ? 'right' : 'left';
      ctx.fillText('SUA IDEIA', mx + (flip ? -12 : 12), my - 10);
    }
    if (!reduce) requestAnimationFrame(drawNet);
  }
  sizeNet(); requestAnimationFrame(drawNet);

  /* ---------- manifesto palavra por palavra ---------- */
  const man = $('#manifestoT');
  const HL = ['desconectada.', 'liga', 'pontos:', 'WhatsApp.'];
  man.innerHTML = man.textContent.trim().split(/\s+/).map(w => `<span class="w${HL.includes(w) ? ' hl' : ''}">${w}</span>`).join(' ');
  const words = $$('.w', man);

  /* ---------- serviços ---------- */
  const sv = $('#servicos'), track = $('#svTrack'), bar = $('#svBar');
  const panels = $$('[data-sv]', track).map(el => {
    const demo = $('.sv__demo', el);
    return { el, demo, counts: $$('[data-count]', demo).map(c => ({ c, n: +c.dataset.count })), stepEl: $('[data-step]', demo) };
  });
  const stepNames = ['wireframe', 'layout', 'design', 'no ar'];
  const fmt = n => n.toLocaleString('pt-BR');

  /* ---------- cabo do método ---------- */
  const stepsWrap = $('#steps'), cable = $('#cable'), cPath = $('#cablePath'), cLive = $('#cableLive');
  const steps = $$('[data-step-i]', stepsWrap);
  let cLen = 0, dotYs = [];
  function buildCable() {
    const top = stepsWrap.getBoundingClientRect().top;
    const h = stepsWrap.offsetHeight, x0 = isMobile() ? 16 : 22;
    cable.setAttribute('viewBox', `0 0 60 ${h}`);
    cable.style.height = h + 'px';
    dotYs = steps.map(s => { const d = $('.step__dot', s).getBoundingClientRect(); return d.top + d.height / 2 - top; });
    let d = `M${x0} 0`;
    let prev = 0;
    dotYs.forEach((y, i) => {
      const mid = (prev + y) / 2, sw = i % 2 ? -14 : 14;
      d += ` C${x0 + sw} ${mid} ${x0 - sw} ${mid} ${x0} ${y}`;
      prev = y;
    });
    d += ` L${x0} ${h}`;
    cPath.setAttribute('d', d); cLive.setAttribute('d', d);
    cLen = cLive.getTotalLength();
    cLive.style.strokeDasharray = cLen;
  }

  /* ---------- loop de scroll ---------- */
  let lastY = scrollY, dirty = true;
  addEventListener('scroll', () => (dirty = true), { passive: true });
  addEventListener('resize', () => { sizeNet(); buildCable(); dirty = true; });

  function frame() {
    if (dirty) {
      dirty = false;
      const y = scrollY, vh = innerHeight, vw = innerWidth;

      hd.classList.toggle('solid', y > 40);
      hd.classList.toggle('hide', y > vh * .8 && y > lastY + 2 && !nav.classList.contains('open'));
      if (y < lastY - 2) hd.classList.remove('hide');
      lastY = y;
      $('#waFloat').classList.toggle('on', y > vh * .7);

      // manifesto
      const mr = man.getBoundingClientRect();
      const mp = clamp((vh * .85 - mr.top) / (mr.height + vh * .35));
      const on = Math.round(mp * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < on));

      // serviços
      const sr = sv.getBoundingClientRect();
      if (!isMobile()) {
        const sp = clamp(-sr.top / (sr.height - vh));
        const max = track.scrollWidth - vw;
        track.style.transform = `translate3d(${-sp * max}px,0,0)`;
        bar.style.transform = `scaleX(${sp})`;
      }
      panels.forEach(p => {
        const r = p.el.getBoundingClientRect();
        const pp = isMobile()
          ? clamp((vh * .95 - r.top) / (vh * .75))
          : clamp((vw - r.left) / (vw * .85));
        p.demo.classList.toggle('s1', pp > .3);
        p.demo.classList.toggle('s2', pp > .55);
        p.demo.classList.toggle('s3', pp > .8);
        if (p.stepEl) p.stepEl.textContent = stepNames[pp > .8 ? 3 : pp > .55 ? 2 : pp > .3 ? 1 : 0];
        const cp = clamp((pp - .3) / .6);
        const ease = 1 - Math.pow(1 - cp, 3);
        p.counts.forEach(({ c, n }) => (c.textContent = fmt(Math.round(n * ease))));
        const line = $('#chartLine', p.demo);
        if (line) {
          if (!line._len) { line._len = line.getTotalLength(); line.style.strokeDasharray = line._len; }
          line.style.strokeDashoffset = line._len * (1 - ease);
        }
      });

      // método
      if (cLen) {
        const wr = stepsWrap.getBoundingClientRect();
        const head = vh * .55 - wr.top;
        const cp = clamp(head / wr.height);
        cLive.style.strokeDashoffset = cLen * (1 - cp);
        steps.forEach((s, i) => s.classList.toggle('on', head >= dotYs[i] - 4));
      }
    }
    requestAnimationFrame(frame);
  }
  document.fonts.ready.then(() => { buildCable(); dirty = true; });
  buildCable();
  requestAnimationFrame(frame);

  /* ---------- revelar ---------- */
  $$('.metodo__head, .projetos__head, .pj, .conectar__head, .form, .servicos__head .label').forEach(el => el.classList.add('rv'));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -12% 0px' });
  $$('.rv').forEach(el => io.observe(el));

  /* ---------- tilt nos projetos ---------- */
  if (matchMedia('(hover:hover)').matches) {
    $$('.pj').forEach(pj => {
      const fr = $('.pj__fr', pj);
      pj.addEventListener('pointermove', e => {
        const r = fr.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        fr.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      pj.addEventListener('pointerleave', () => (fr.style.transform = ''));
    });
  }

  /* ---------- hub de conexão ---------- */
  const nodes = $$('.hub__node'), svg = $('#hubLines'), NS = 'http://www.w3.org/2000/svg';
  const lines = nodes.map((n, i) => {
    const a = -Math.PI / 2 + i * (Math.PI * 2 / nodes.length);
    const x = 200 + Math.cos(a) * 160, y = 200 + Math.sin(a) * 160;
    n.style.left = (x / 4) + '%'; n.style.top = (y / 4) + '%';
    const l = document.createElementNS(NS, 'line');
    l.setAttribute('x1', 200); l.setAttribute('y1', 200); l.setAttribute('x2', x); l.setAttribute('y2', y);
    svg.appendChild(l);
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('r', 3); dot.style.opacity = 0;
    svg.appendChild(dot);
    return { l, dot, x, y, key: n.dataset.node, n, t: Math.random() };
  });
  const checks = $$('#chips input');
  function syncHub() {
    const sel = checks.filter(c => c.checked).map(c => c.value);
    lines.forEach(L => {
      const on = sel.includes(L.key);
      L.l.classList.toggle('on', on); L.n.classList.toggle('on', on); L.on = on;
    });
    if (sel.length) $('#fErr').hidden = true;
  }
  checks.forEach(c => c.addEventListener('change', syncHub));
  // nós clicáveis também marcam a opção
  nodes.forEach(n => {
    n.style.cursor = 'pointer'; n.parentElement.removeAttribute('aria-hidden');
    n.addEventListener('click', () => {
      const c = checks.find(c => c.value === n.dataset.node);
      c.checked = !c.checked; syncHub();
    });
  });
  // pulsos correndo pelos fios ligados
  (function pulse() {
    lines.forEach(L => {
      if (!L.on) { L.dot.style.opacity = 0; return; }
      L.t = (L.t + .012) % 1;
      L.dot.setAttribute('cx', L.x + (200 - L.x) * L.t);
      L.dot.setAttribute('cy', L.y + (200 - L.y) * L.t);
      L.dot.style.opacity = 1;
    });
    if (!reduce) requestAnimationFrame(pulse);
  })();
  const nome = $('#fNome');
  nome.addEventListener('input', () => ($('#hubName').textContent = nome.value.trim().split(' ')[0] || 'você'));

  /* ---------- WhatsApp ---------- */
  $('#waFloat').href = wa('Oi, Conecta Aí! Vim pelo site e quero conversar sobre o meu projeto.');
  $('#waFloat').target = '_blank';
  $$('.ft__row a[href="#conectar"]').forEach(a => { a.href = $('#waFloat').href; a.target = '_blank'; });

  $('#form').addEventListener('submit', e => {
    e.preventDefault();
    const sel = checks.filter(c => c.checked).map(c => c.value);
    if (!sel.length) { $('#fErr').hidden = false; return; }
    const obj = $('input[name=obj]:checked').value;
    const n = nome.value.trim(), neg = $('#fNeg').value.trim();
    const linhas = [
      `Oi, Conecta Aí! ${n ? `Aqui é ${n}. ` : ''}Montei minha conexão no site:`,
      '',
      `*Preciso de:* ${sel.join(', ')}`,
      `*Objetivo:* ${obj}`,
    ];
    if (neg) linhas.push(`*Meu negócio:* ${neg}`);
    linhas.push('', 'Bora conversar?');
    open(wa(linhas.join('\n')), '_blank');
  });
})();
