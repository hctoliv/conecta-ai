(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  const P = [
    { id: 'santa-julia', name: 'Santa Julia', seg: 'Gastronomia', where: 'Bar e restaurante · Vila Olímpia', url: 'https://hctoliv.github.io/santa-julia/', c: 'rgba(255,180,40,.35)',
      desc: 'Bar e restaurante com almoço, happy hour, balada e música ao vivo, aberto até a madrugada.', chips: ['Reserva online', 'Agenda da semana', 'WhatsApp'] },
    { id: 'bad-boy', name: 'Bad Boy', seg: 'Varejo', where: 'Loja oficial · moda e luta', url: 'https://hctoliv.github.io/bad-boy-motion/', c: 'rgba(200,200,220,.25)',
      desc: 'Loja oficial de roupas e equipamentos para quem treina pesado, com lançamentos em destaque.', chips: ['Loja', 'Lançamentos', 'Vídeo'] },
    { id: 'praca-sao-lourenco', name: 'Praça São Lourenço', seg: 'Gastronomia', where: 'Restaurante · Vila Olímpia', url: 'https://hctoliv.github.io/praca-sao-lourenco/', c: 'rgba(200,150,60,.3)',
      desc: 'Restaurante na Vila Olímpia com cozinha, almoço, jantar, bar, eventos e reservas.', chips: ['Reservas', 'Eventos', 'Cardápio'] },
    { id: 'abn-imoveis', name: 'ABN Imóveis', seg: 'Imóveis', where: 'Imobiliária · ABC Paulista', url: 'https://hctoliv.github.io/previaja/p/abn-imoveis/', c: 'rgba(217,169,63,.35)',
      desc: 'Imóveis à venda e para alugar no ABC, com busca, tour pelos cômodos e visita agendada no WhatsApp.', chips: ['Busca de imóveis', 'Ficha do imóvel', 'WhatsApp'] },
    { id: 'academia-cba', name: 'Academia CBA', seg: 'Saúde e bem-estar', where: 'Academia · Vila da Saúde', url: 'https://hctoliv.github.io/academia-cba/', c: 'rgba(255,120,40,.3)',
      desc: 'Musculação old school, jiu-jitsu e boxe, com aula experimental pelo WhatsApp.', chips: ['Modalidades', 'Horários', 'WhatsApp'] },
    { id: 'scl-laboratorio', name: 'SCL Laboratório', seg: 'Saúde e bem-estar', where: 'Laboratório · saúde empresarial', url: 'https://hctoliv.github.io/sc-laboratorio/', c: 'rgba(80,150,255,.35)',
      desc: 'Coleta e exames no local de trabalho, com orçamento online e acesso aos resultados.', chips: ['Orçamento', 'Resultados', 'Empresas'] },
    { id: 'oficina-de-estampas', name: 'Oficina de Estampas', seg: 'Indústria', where: 'Silk-screen · São Paulo, desde 1993', url: 'https://hctoliv.github.io/impressao45/', c: 'rgba(255,200,40,.3)',
      desc: 'Silk-screen feito à mão para marcas, motoclubes, restaurantes, academias e eventos.', chips: ['Portfólio', 'Orçamento', 'Processo'] },
    { id: 'fiat-amazonas', name: 'Fiat Amazonas', seg: 'Automotivo', where: 'Concessionária Fiat · Mooca', url: 'https://hctoliv.github.io/fiat-amazonas/', c: 'rgba(230,40,60,.3)',
      desc: 'Carros 0 km, seminovos, vendas diretas e oficina num só endereço, na Alcântara Machado.', chips: ['Modelos', 'Oficina', 'Como chegar'] },
    { id: 'holy-burger', name: 'Holy Burger', seg: 'Gastronomia', where: 'Hamburgueria · Vila Buarque', url: 'https://hctoliv.github.io/holy-burger/', c: 'rgba(230,170,40,.35)',
      desc: 'O clássico do Centro desde 2013, eleito o 2º melhor hambúrguer do mundo pelo Burger Dudes.', chips: ['Cardápio', 'Prêmios', 'Eventos'] },
    { id: 'lalec', name: 'LALEC', seg: 'Social', where: 'ONG · casa de acolhimento', url: 'https://hctoliv.github.io/lalec/', c: 'rgba(80,200,120,.3)',
      desc: 'Casa de acolhimento para crianças, com formas de ajudar, Pix e bazar.', chips: ['Doações por Pix', 'Como ajudar', 'Bazar'] }
  ];
  const img = (id, k = '') => `img/projetos/${id}${k}.webp`;
  const host = (u) => u.replace('https://', '').replace(/\/$/, '');

  /* abertura */
  const loader = $('#loader'), num = $('#loadNum'), bar = $('#loadBar');
  let n = 0;
  const t = setInterval(() => { n = Math.min(10, n + 1); num.textContent = String(n).padStart(2, '0'); bar.style.width = n * 10 + '%'; if (n >= 10) clearInterval(t); }, reduce ? 0 : 110);
  const open = () => { loader.classList.add('is-out'); document.body.classList.remove('is-loading'); document.body.classList.add('is-ready'); countUp(); };
  setTimeout(open, reduce ? 0 : 1500);
  $$('.hero__foot, .hero .tag').forEach((el, i) => { el.classList.add('fade'); el.style.animationDelay = 0.4 + i * 0.12 + 's'; });

  /* números */
  function countUp() {
    $$('[data-count]').forEach((el) => {
      const to = +el.dataset.count, t0 = performance.now();
      const step = (now) => { const p = Math.min(1, (now - t0) / 1200); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }

  /* faixa */
  const mq = P.map((p) => `<span>${p.name}</span><i>✦</i>`).join('');
  $('#marquee').innerHTML = mq + mq;

  /* projetos empilhados */
  const stack = $('#stack');
  stack.innerHTML = P.map((p, i) => `
    <article class="proj" style="--i:${i};--c:${p.c}" data-id="${p.id}">
      <span class="proj__glow"></span>
      <div class="proj__info">
        <span class="proj__num">${String(i + 1).padStart(2, '0')}</span>
        <div>
          <p class="proj__seg">${p.seg} · ${p.where}</p>
          <h3>${p.name}</h3>
          <p class="proj__desc">${p.desc}</p>
          <div class="proj__chips">${p.chips.map((c) => `<span>${c}</span>`).join('')}</div>
        </div>
        <div class="proj__btns">
          <a class="btn btn--grad" href="${p.url}" target="_blank" rel="noopener">Ver site no ar ↗</a>
          <button class="btn btn--line" type="button" data-open="${p.id}">Ver detalhes</button>
        </div>
      </div>
      <div class="proj__media">
        <div class="browser" data-cursor="view" data-open="${p.id}">
          <div class="browser__bar"><i></i><i></i><i></i><span>${host(p.url)}</span></div>
          <div class="browser__scroll"><img src="${img(p.id, '-full')}" alt="Página do site ${p.name}" loading="lazy"></div>
        </div>
        <div class="phone"><img src="${img(p.id, '-cel')}" alt="Site ${p.name} no celular" loading="lazy"></div>
      </div>
    </article>`).join('');

  /* rolagem do site dentro da tela */
  $$('.browser__scroll', stack).forEach((box) => {
    const im = $('img', box);
    const go = () => { const d = im.offsetHeight - box.offsetHeight; if (d > 0) im.style.transform = `translateY(${-d}px)`; };
    const back = () => { im.style.transform = ''; };
    box.addEventListener('mouseenter', go); box.addEventListener('mouseleave', back);
  });

  /* encolher o cartão de baixo enquanto o próximo sobe */
  const cards = $$('.proj', stack);
  const desk = () => innerWidth > 1100;

  /* todos: filtro */
  const segs = [...new Set(P.map((p) => p.seg))];
  const chips = $('#chips'), grid = $('#grid');
  chips.innerHTML = [`<button class="chip is-on" data-f="" aria-pressed="true">Todos <small>${P.length}</small></button>`, ...segs.map((s) => `<button class="chip" data-f="${s}" aria-pressed="false">${s} <small>${P.filter((p) => p.seg === s).length}</small></button>`)].join('');
  const render = (f) => {
    grid.innerHTML = P.filter((p) => !f || p.seg === f).map((p, i) => `
      <button class="tile" type="button" data-open="${p.id}" data-cursor="view" style="animation-delay:${i * 0.05}s" aria-label="Ver detalhes de ${p.name}">
        <div class="tile__img"><img src="${img(p.id, '-thumb')}" alt="" loading="lazy"></div>
        <div class="tile__body"><div><b>${p.name}</b><span>${p.where}</span></div><span class="tile__arrow" aria-hidden="true">→</span></div>
      </button>`).join('');
  };
  chips.addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (!b) return; $$('.chip', chips).forEach((x) => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', x === b); }); render(b.dataset.f); });
  render('');

  /* modal */
  const modal = $('#modal'); let last = null;
  document.addEventListener('click', (e) => {
    const o = e.target.closest('[data-open]'); if (!o || e.target.closest('a')) return;
    const p = P.find((x) => x.id === o.dataset.open); if (!p) return; last = o;
    $('#mSeg').textContent = `${p.seg} · ${p.where}`; $('#mTitle').textContent = p.name; $('#mDesc').textContent = p.desc;
    $('#mLink').href = p.url; $('#mUrl').textContent = host(p.url);
    $('#mFull').src = img(p.id, '-full'); $('#mFull').alt = `Página do site ${p.name}`;
    $('#mCel').src = img(p.id, '-cel'); $('#mCel').alt = `Site ${p.name} no celular`;
    $('.modal .browser__scroll').scrollTop = 0;
    modal.hidden = false; document.body.classList.add('is-locked'); $('.modal__close').focus();
  });
  const close = () => { modal.hidden = true; document.body.classList.remove('is-locked'); if (last) last.focus(); };
  $$('[data-close]', modal).forEach((b) => b.addEventListener('click', close));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) close(); });

  /* nav */
  const nav = $('#nav'), burger = $('#burger'), menu = $('#menu'); let lastY = 0;
  burger.addEventListener('click', () => { const op = burger.getAttribute('aria-expanded') !== 'true'; burger.setAttribute('aria-expanded', op); menu.classList.toggle('is-open', op); document.body.classList.toggle('is-locked', op); });
  $$('a', menu).forEach((a) => a.addEventListener('click', () => { burger.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); document.body.classList.remove('is-locked'); }));

  /* revelar */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
  $$('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 0.1 + 's'; io.observe(el); });

  /* scroll */
  let ticking = false;
  const onScroll = () => {
    ticking = false; const y = scrollY;
    nav.classList.toggle('is-solid', y > 40);
    nav.classList.toggle('is-hidden', y > lastY && y > 700 && !menu.classList.contains('is-open')); lastY = y;
    if (desk() && !reduce) {
      cards.forEach((c, i) => {
        const next = cards[i + 1]; if (!next) { c.style.transform = ''; return; }
        const r = next.getBoundingClientRect(), top = parseFloat(getComputedStyle(next).top);
        const p = Math.min(1, Math.max(0, 1 - (r.top - top) / innerHeight));
        c.style.transform = `scale(${1 - p * 0.06})`; c.style.filter = `brightness(${1 - p * 0.45})`;
      });
    } else cards.forEach((c) => { c.style.transform = ''; c.style.filter = ''; });
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll); onScroll();

  /* rede de pontos (como no site da Conecta Aí) */
  const cv = $('#net'), ctx = cv.getContext('2d'); let W, H, pts = [], mx = -999, my = -999;
  const size = () => { const d = Math.min(devicePixelRatio, 1.5); W = cv.width = innerWidth * d; H = cv.height = innerHeight * d; cv.dataset.d = d; };
  size(); addEventListener('resize', size);
  const N = innerWidth < 700 ? 34 : 70;
  for (let i = 0; i < N; i++) pts.push({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .00035, vy: (Math.random() - .5) * .00035 });
  addEventListener('pointermove', (e) => { const d = +cv.dataset.d; mx = e.clientX * d; my = e.clientY * d; });
  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    const d = +cv.dataset.d, R = 150 * d;
    pts.forEach((p) => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > 1) p.vx *= -1; if (p.y < 0 || p.y > 1) p.vy *= -1; });
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], ax = a.x * W, ay = a.y * H;
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j], bx = b.x * W, by = b.y * H, dd = Math.hypot(ax - bx, ay - by);
        if (dd < R) { ctx.strokeStyle = `rgba(110,160,255,${(1 - dd / R) * 0.22})`; ctx.lineWidth = d; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); }
      }
      const dm = Math.hypot(ax - mx, ay - my);
      if (dm < R * 1.4) { ctx.strokeStyle = `rgba(0,200,255,${(1 - dm / (R * 1.4)) * 0.6})`; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(mx, my); ctx.stroke(); }
      ctx.fillStyle = dm < R * 1.4 ? 'rgba(0,200,255,.9)' : 'rgba(150,180,255,.45)';
      ctx.beginPath(); ctx.arc(ax, ay, 1.6 * d, 0, 6.3); ctx.fill();
    }
    if (!reduce) requestAnimationFrame(draw);
  };
  draw();

  /* cursor */
  if (fine && !reduce) {
    const cur = $('#cursor'); let cx = 0, cy = 0, tx = 0, ty = 0;
    addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; cur.classList.add('is-on'); });
    document.addEventListener('pointerover', (e) => {
      const v = e.target.closest('[data-cursor="view"]'), l = e.target.closest('a, button');
      cur.classList.toggle('is-view', !!v); cur.classList.toggle('is-link', !v && !!l);
    });
    const loop = () => { cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2; cur.style.transform = `translate(${cx}px, ${cy}px)`; requestAnimationFrame(loop); };
    loop();
  }
})();
