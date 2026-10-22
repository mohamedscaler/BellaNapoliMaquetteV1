/* ==========================================================================
   Bella Napoli da Luigi — V2 « Méditerranée » — Interactions
   ========================================================================== */
(function () {
  'use strict';

  var body = document.body;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var clamp = function (v, min, max) { return Math.min(max, Math.max(min, v)); };
  var lenis = null;

  /* ---------- Découpe en lettres ---------- */
  function splitChars(el, baseDelay, step, wrap) {
    var text = el.textContent;
    el.textContent = '';
    el.setAttribute('aria-hidden', 'true');
    Array.prototype.forEach.call(text, function (ch, i) {
      var c = document.createElement('span');
      c.className = 'char';
      c.textContent = ch === ' ' ? ' ' : ch;
      c.style.transitionDelay = (baseDelay + i * step).toFixed(2) + 's';
      if (wrap) {
        var w = document.createElement('span');
        w.className = 'split-wrap';
        w.appendChild(c);
        el.appendChild(w);
      } else {
        el.appendChild(c);
      }
    });
  }
  $$('.split').forEach(function (el) {
    splitChars(el, 1 + parseFloat(el.dataset.delay || 0), 0.05, true);
  });
  var wordmark = $('.split-scroll');
  if (wordmark) splitChars(wordmark, 0, 0, false);

  /* ---------- Découpe en mots (texte d'intro) ---------- */
  $$('[data-words]').forEach(function (block) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span');
            w.className = 'w';
            w.style.setProperty('--i', i++);
            w.textContent = part;
            frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    })(block);
  });

  /* ---------- Intro ---------- */
  body.classList.add('is-loading');
  var t0 = performance.now();
  var introDone = false;
  function finishIntro() {
    if (introDone) return;
    introDone = true;
    setTimeout(function () {
      body.classList.remove('is-loading');
      body.classList.add('is-loaded');
    }, reduceMotion ? 0 : Math.max(0, 1300 - (performance.now() - t0)));
  }
  if (document.readyState === 'complete') finishIntro();
  else { window.addEventListener('load', finishIntro, { once: true }); setTimeout(finishIntro, 2600); }

  /* ---------- Smooth scroll ---------- */
  var ls = document.createElement('script');
  ls.src = 'https://unpkg.com/lenis@1/dist/lenis.min.js';
  ls.async = true;
  ls.onload = function () {
    if (reduceMotion || !window.Lenis) return;
    lenis = new window.Lenis({ lerp: 0.085, smoothWheel: true });
    lenis.on('scroll', requestTick);
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
  };
  document.head.appendChild(ls);

  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      var target = id.length > 1 && $(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.5 });
      else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  /* ---------- Navigation ---------- */
  var nav = $('.navbar_component');
  var burger = $('.navbar_burger');
  var overlay = $('.menu-overlay');
  function openMenu() {
    body.classList.add('is-menu-open');
    burger.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');
    if (lenis) lenis.stop();
  }
  function closeMenu() {
    if (!body.classList.contains('is-menu-open')) return;
    body.classList.remove('is-menu-open');
    burger.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    if (lenis) lenis.start();
  }
  burger.addEventListener('click', function () { body.classList.contains('is-menu-open') ? closeMenu() : openMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------- Révélations ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal, [data-words]').forEach(function (el) { io.observe(el); });

  /* ---------- Compteurs ---------- */
  $$('[data-count]').forEach(function (el) {
    var target = parseInt(el.dataset.count, 10);
    var cio = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return;
      cio.disconnect();
      var s = performance.now(), d = reduceMotion ? 1 : 2000;
      (function step(now) {
        var p = Math.min(1, (now - s) / d);
        el.textContent = Math.round((1 - Math.pow(1 - p, 4)) * target);
        if (p < 1) requestAnimationFrame(step);
      })(s);
    }, { threshold: 0.6 });
    cio.observe(el);
  });

  /* ---------- Les 3 gestes (accordéon) ---------- */
  var gestures = $$('.gesture');
  function activateGesture(g) {
    gestures.forEach(function (x) { x.classList.toggle('is-active', x === g); });
  }
  gestures.forEach(function (g) {
    if (finePointer) g.addEventListener('mouseenter', function () { activateGesture(g); });
    g.addEventListener('click', function () { activateGesture(g); });
    g.addEventListener('focus', function () { activateGesture(g); });
  });


  /* ---------- Savoir-faire : points de pagination (mobile) ---------- */
  (function () {
    var wrap = $('.gestures');
    if (!wrap) return;
    var dots = document.createElement('div');
    dots.className = 'gestures-dots';
    dots.setAttribute('aria-hidden', 'true');
    gestures.forEach(function () { dots.appendChild(document.createElement('span')); });
    wrap.parentNode.insertBefore(dots, wrap.nextSibling);
    function update() {
      var w = wrap.clientWidth, i = Math.round(wrap.scrollLeft / (w * 0.82 + 12));
      $$('span', dots).forEach(function (d, k) { d.classList.toggle('is-active', k === Math.min(i, gestures.length - 1)); });
    }
    wrap.addEventListener('scroll', update, { passive: true });
    update();
  })();

  /* ---------- Signatures : image qui suit le curseur ---------- */
  var hover = $('.hover-image');
  var hoverImg = hover && $('img', hover);
  if (hover && finePointer && !reduceMotion) {
    var mx = -999, my = -999, hx = -999, hy = -999, lastX = 0;
    $$('.sig-row').forEach(function (row) {
      row.addEventListener('mouseenter', function (e) {
        hoverImg.onerror = row.dataset.fallback ? function () { hoverImg.onerror = null; hoverImg.src = row.dataset.fallback; } : null;
        if (hoverImg.getAttribute('src') !== row.dataset.img) hoverImg.src = row.dataset.img;
        if (hx < -900) { hx = e.clientX; hy = e.clientY; }
        hover.classList.add('is-visible');
      });
      row.addEventListener('mouseleave', function () { hover.classList.remove('is-visible'); });
    });
    window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
    (function loop() {
      hx = lerp(hx, mx, 0.14);
      hy = lerp(hy, my, 0.14);
      var vx = clamp((hx - lastX) * 0.6, -14, 14);
      lastX = hx;
      hover.style.setProperty('--hx', hx.toFixed(1) + 'px');
      hover.style.setProperty('--hy', hy.toFixed(1) + 'px');
      hover.style.setProperty('--hr', vx.toFixed(1) + 'deg');
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Carte (catégories) ---------- */
  var menu = window.MENU || [];
  var navList = $('.menu_nav-list');
  var panel = $('.menu_panel');
  var titleEl = $('.menu_panel-title');
  var introEl = $('.menu_panel-intro');
  var listEl = $('.menu_list');
  var moreBtn = $('.menu_more');
  var LIMIT = 12;

  function render(cat) {
    titleEl.textContent = cat.label;
    introEl.textContent = cat.intro || '';
    listEl.innerHTML = '';
    panel.classList.remove('is-expanded');
    var extra = cat.items.length - LIMIT;
    moreBtn.hidden = extra <= 0;
    if (extra > 0) $('.menu_more-label', moreBtn).textContent = 'Voir les ' + extra + ' autres';
    cat.items.forEach(function (item, i) {
      var el = document.createElement('div');
      el.className = 'menu_item' + (i >= LIMIT ? ' is-extra' : '');
      el.style.setProperty('--i', i >= LIMIT ? i - LIMIT : i);
      el.innerHTML =
        '<div class="menu_item-row"><span class="menu_item-name">' + item.name +
        (item.tag ? '<span class="menu_item-tag">' + item.tag + '</span>' : '') +
        '</span><span class="menu_item-price">' + item.price.replace(' / ', ' – ') + ' CHF</span></div>' +
        (item.desc ? '<p class="menu_item-desc">' + item.desc + '</p>' : '');
      listEl.appendChild(el);
    });
  }
  function select(index, animate) {
    $$('.menu_tab', navList).forEach(function (t, i) {
      t.setAttribute('aria-selected', i === index ? 'true' : 'false');
      t.tabIndex = i === index ? 0 : -1;
    });
    if (!animate) { render(menu[index]); return; }
    panel.classList.add('is-switching');
    setTimeout(function () {
      render(menu[index]);
      panel.classList.remove('is-switching');
      if (lenis) lenis.resize();
    }, 280);
  }
  if (navList && menu.length) {
    menu.forEach(function (cat, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'menu_tab';
      b.setAttribute('role', 'tab');
      b.innerHTML = '<span>' + cat.label + '</span><span class="menu_tab-count">' + cat.items.length + '</span>';
      b.addEventListener('click', function () { if (b.getAttribute('aria-selected') !== 'true') select(i, true); });
      navList.appendChild(b);
    });
    select(0, false);
    // Les cartes « La cuisine » ouvrent directement la bonne catégorie
    $$('[data-cat]').forEach(function (link) {
      link.addEventListener('click', function () {
        var i = menu.findIndex(function (c) { return c.id === link.dataset.cat; });
        if (i > -1) select(i, false);
      });
    });
    moreBtn.addEventListener('click', function () {
      panel.classList.add('is-expanded');
      moreBtn.hidden = true;
      if (lenis) lenis.resize();
    });
  }

  /* ---------- Carte cadeau ---------- */
  var giftcard = $('.giftcard');
  var amountEl = $('.giftcard_amount');
  $$('.gift_amount').forEach(function (btn) {
    btn.addEventListener('click', function () {
      $$('.gift_amount').forEach(function (b) { b.setAttribute('aria-checked', b === btn ? 'true' : 'false'); });
      giftcard.classList.remove('is-flipped');
      amountEl.classList.add('is-changing');
      setTimeout(function () {
        amountEl.textContent = btn.dataset.amount;
        amountEl.classList.remove('is-changing');
      }, 250);
    });
  });
  if (giftcard) {
    giftcard.addEventListener('click', function () { giftcard.classList.toggle('is-flipped'); });
    if (finePointer && !reduceMotion) {
      var zone = giftcard.parentElement;
      zone.addEventListener('mousemove', function (e) {
        var r = giftcard.getBoundingClientRect();
        giftcard.style.setProperty('--ry', (((e.clientX - r.left) / r.width - 0.5) * 16).toFixed(1) + 'deg');
        giftcard.style.setProperty('--rx', (((e.clientY - r.top) / r.height - 0.5) * -16).toFixed(1) + 'deg');
      });
      zone.addEventListener('mouseleave', function () {
        giftcard.style.setProperty('--ry', '0deg');
        giftcard.style.setProperty('--rx', '0deg');
      });
    }
  }

  /* ---------- Réservation (maquette) ---------- */
  var guests = $('#guests');
  $$('.stepper_btn').forEach(function (b) {
    b.addEventListener('click', function () {
      guests.value = clamp((parseInt(guests.value, 10) || 1) + parseInt(b.dataset.step, 10), 1, 20);
    });
  });
  var date = $('#date');
  if (date) {
    var d = new Date();
    do { d.setDate(d.getDate() + 1); } while (d.getDay() === 0 || d.getDay() === 1);
    var iso = function (x) { return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
    date.value = iso(d);
    date.min = iso(new Date());
  }
  var form = $('.booking_form');
  // Envoie la demande de réservation par e-mail au restaurant (client mail du visiteur)
  form && form.addEventListener('submit', function (e) {
    e.preventDefault();
    var slot = $('input[name="time"]:checked', form);
    var d = date.value ? date.value.split('-').reverse().join('/') : '';
    var body = 'Bonjour,\n\nJe souhaite réserver une table :\n'
      + '• Couverts : ' + guests.value + '\n'
      + '• Date : ' + d + '\n'
      + '• Heure : ' + (slot ? slot.value : '') + '\n\n'
      + 'Nom : \nTéléphone : \n\nMerci !';
    window.location.href = 'mailto:bella.napoli.bulle@gmail.com?subject='
      + encodeURIComponent('Réservation — ' + guests.value + ' pers. le ' + d + ' à ' + (slot ? slot.value : ''))
      + '&body=' + encodeURIComponent(body);
    var label = $('.booking_submit', form);
    label.textContent = 'Ouverture de votre messagerie…';
    setTimeout(function () { label.textContent = 'Confirmer la réservation'; }, 4000);
  });

  /* ---------- Horaires : statut + jour en cours ---------- */
  (function () {
    var now;
    try { now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Zurich' })); } catch (e) { now = new Date(); }
    var day = now.getDay(), min = now.getHours() * 60 + now.getMinutes();
    var today = $('.hours li[data-day="' + day + '"]') || (day === 1 ? $('.hours li[data-day="0"]') : null);
    if (today) today.classList.add('is-today');

    var el = $('.status'), label = el && $('.status_label', el);
    if (!el) return;
    var slots = [[690, 840], [1110, 1320]];
    var days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    var fmt = function (m) { return Math.floor(m / 60) + 'h' + String(m % 60).padStart(2, '0'); };
    var open = function (x) { return x >= 2 && x <= 6; };
    if (open(day)) {
      for (var i = 0; i < slots.length; i++) {
        if (min >= slots[i][0] && min < slots[i][1]) { label.textContent = 'Ouvert maintenant · jusqu’à ' + fmt(slots[i][1]); return; }
        if (min < slots[i][0]) { el.classList.add('is-closed'); label.textContent = 'Fermé · ouvre à ' + fmt(slots[i][0]); return; }
      }
    }
    var next = (day + 1) % 7, g = 0;
    while (!open(next) && g++ < 7) next = (next + 1) % 7;
    el.classList.add('is-closed');
    label.textContent = 'Fermé · ouvre ' + (next === (day + 1) % 7 ? 'demain' : days[next]) + ' à 11h30';
  })();

  /* ---------- Moteur de scroll ---------- */
  var progress = $('.progress');
  var parallaxEls = $$('.parallax[data-speed]');
  var timeline = $('.timeline');
  var steps = $$('.timeline_step');
  var footer = $('.footer_component');
  var wordChars = wordmark ? $$('.char', wordmark) : [];
  var hero = $('.section_hero');
  var booking = $('#reservation');
  var cta = $('.floating-cta');
  var lastY = 0, ticking = false;

  function onScroll() {
    ticking = false;
    var y = window.scrollY, vh = window.innerHeight;
    var max = document.documentElement.scrollHeight - vh;

    progress.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    nav.classList.toggle('is-scrolled', y > 30);
    body.classList.toggle('is-past-top', y > 160);
    if (!body.classList.contains('is-menu-open')) nav.classList.toggle('is-hidden', y > lastY && y > 600);
    lastY = y;

    if (!reduceMotion) {
      parallaxEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        el.style.setProperty('--py', (-((r.top + r.height / 2) - vh / 2) * parseFloat(el.dataset.speed)).toFixed(1) + 'px');
      });
    }

    // Frise chronologique : remplissage + étape active
    if (timeline) {
      var tr = timeline.getBoundingClientRect();
      timeline.style.setProperty('--t', clamp((vh * 0.6 - tr.top) / tr.height, 0, 1).toFixed(3));
      steps.forEach(function (s) {
        var r = s.getBoundingClientRect();
        s.classList.toggle('is-active', r.top < vh * 0.65);
      });
    }

    // Grand logo du footer : lettres qui montent une à une
    if (wordChars.length) {
      var fr = wordmark.getBoundingClientRect();
      var p = clamp((vh - fr.top) / (vh * 0.6), 0, 1);
      wordChars.forEach(function (c, i) {
        var local = clamp(p * 1.6 - i * (0.6 / wordChars.length), 0, 1);
        c.style.setProperty('--cy', ((1 - local) * 60).toFixed(1) + '%');
        c.style.opacity = (0.15 + local * 0.85).toFixed(2);
      });
    }

    if (cta) {
      var hb = hero.getBoundingClientRect().bottom, br = booking.getBoundingClientRect();
      cta.classList.toggle('is-visible', hb < 0 && !(br.top < vh && br.bottom > 0));
    }
  }
  function requestTick() { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  onScroll();
})();
