/* ==========================================================================
   Bella Napoli da Luigi — Interactions
   ========================================================================== */
(function () {
  'use strict';

  var doc = document.documentElement;
  var body = document.body;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var isDesktop = function () { return window.innerWidth >= 768; };
  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };
  var lenis = null;

  /* ---------- Intro ---------- */
  body.classList.add('is-loading');
  var start = performance.now();
  function finishIntro() {
    var wait = Math.max(0, 1500 - (performance.now() - start));
    setTimeout(function () {
      body.classList.remove('is-loading');
      body.classList.add('is-loaded');
    }, reduceMotion ? 0 : wait);
  }
  if (document.readyState === 'complete') finishIntro();
  else {
    window.addEventListener('load', finishIntro, { once: true });
    setTimeout(finishIntro, 2800); // ne pas attendre les images lentes
  }

  /* ---------- Smooth scroll (Lenis, chargé si disponible) ---------- */
  function initLenis() {
    if (reduceMotion || !window.Lenis) return;
    lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', requestTick);
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
  }
  var lenisScript = document.createElement('script');
  lenisScript.src = 'https://unpkg.com/lenis@1/dist/lenis.min.js';
  lenisScript.async = true;
  lenisScript.onload = initLenis;
  document.head.appendChild(lenisScript);

  /* ---------- Liens d'ancre ---------- */
  $$('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id.length < 2) return;
      var target = $(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      if (lenis) lenis.scrollTo(target, { offset: id === '#top' ? 0 : -20, duration: 1.4 });
      else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  /* ---------- Navigation ---------- */
  var nav = $('.navbar_component');
  var burger = $('.navbar_burger');
  var overlay = $('.menu-overlay');
  var lastY = 0;

  function openMenu() {
    body.classList.add('is-menu-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fermer le menu');
    overlay.setAttribute('aria-hidden', 'false');
    if (lenis) lenis.stop();
  }
  function closeMenu() {
    if (!body.classList.contains('is-menu-open')) return;
    body.classList.remove('is-menu-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    overlay.setAttribute('aria-hidden', 'true');
    if (lenis) lenis.start();
  }
  burger.addEventListener('click', function () {
    body.classList.contains('is-menu-open') ? closeMenu() : openMenu();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------- Révélations au scroll ---------- */
  var revealTargets = $$('.reveal, .split-reveal, .clip-reveal, .eyebrow, .story_signature');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add('is-in');
      setTimeout(function () { el.classList.add('is-done'); }, 1600);
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
  revealTargets.forEach(function (el) { io.observe(el); });

  /* ---------- Compteur 48h ---------- */
  $$('[data-count]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var counterIo = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      counterIo.disconnect();
      var t0 = performance.now(), duration = reduceMotion ? 1 : 2200;
      (function step(now) {
        var p = Math.min(1, (now - t0) / duration);
        var eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }, { threshold: 0.6 });
    counterIo.observe(el);
  });

  /* ---------- Texte qui se remplit mot à mot ---------- */
  var fillBlocks = $$('[data-fill]');
  fillBlocks.forEach(function (block) {
    // Découpe chaque nœud texte en <span class="word"> en gardant les <em>
    (function split(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var span = document.createElement('span');
            span.className = 'word';
            span.textContent = part;
            frag.appendChild(span);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          split(child);
        }
      });
    })(block);
    block._words = $$('.word', block);
  });

  /* ---------- Carte (onglets) ---------- */
  var menuData = window.MENU || [];
  var tabsEl = $('.menu_tabs');
  var listEl = $('.menu_list');
  var introEl = $('.menu_panel-intro');
  var panelEl = $('.menu_panel');

  var moreEl = $('.menu_more');
  var MENU_LIMIT = 12;

  function renderCategory(cat) {
    introEl.textContent = cat.intro || '';
    listEl.innerHTML = '';
    panelEl.classList.remove('is-expanded');
    var extra = cat.items.length - MENU_LIMIT;
    moreEl.hidden = extra <= 0;
    if (extra > 0) $('.menu_more-label', moreEl).textContent = 'Voir les ' + extra + ' autres';
    cat.items.forEach(function (item, i) {
      var row = document.createElement('div');
      row.className = 'menu_item' + (i >= MENU_LIMIT ? ' is-extra' : '');
      row.style.setProperty('--i', i >= MENU_LIMIT ? i - MENU_LIMIT : i);
      var tag = item.tag ? '<span class="menu_item-tag">' + item.tag + '</span>' : '';
      var price = item.price.indexOf('/') > -1 ? item.price.replace(' / ', ' – ') : item.price;
      row.innerHTML =
        '<div class="menu_item-row">' +
          '<span class="menu_item-name">' + item.name + tag + '</span>' +
          '<span class="menu_item-leader"></span>' +
          '<span class="menu_item-price">' + price + ' CHF</span>' +
        '</div>' +
        (item.desc ? '<p class="menu_item-desc">' + item.desc + '</p>' : '');
      listEl.appendChild(row);
    });
  }

  function selectTab(index, animate) {
    $$('.menu_tab', tabsEl).forEach(function (tab, i) {
      tab.setAttribute('aria-selected', i === index ? 'true' : 'false');
      tab.tabIndex = i === index ? 0 : -1;
    });
    if (!animate) { renderCategory(menuData[index]); return; }
    panelEl.classList.add('is-switching');
    setTimeout(function () {
      renderCategory(menuData[index]);
      panelEl.classList.remove('is-switching');
      if (lenis) lenis.resize();
      updateLayout();
    }, 300);
  }

  if (tabsEl && menuData.length) {
    menuData.forEach(function (cat, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'menu_tab';
      btn.setAttribute('role', 'tab');
      btn.innerHTML = cat.label + '<span class="menu_tab-count">' + cat.items.length + '</span>';
      btn.addEventListener('click', function () {
        if (btn.getAttribute('aria-selected') === 'true') return;
        selectTab(i, true);
      });
      tabsEl.appendChild(btn);
    });
    selectTab(0, false);
    $('button', moreEl).addEventListener('click', function () {
      panelEl.classList.add('is-expanded');
      moreEl.hidden = true;
      if (lenis) lenis.resize();
      updateLayout();
    });
  }

  /* ---------- Statut ouvert / fermé (heure de Bulle) ---------- */
  (function status() {
    var el = $('.status');
    if (!el) return;
    var label = $('.status_label', el);
    var slots = [[690, 840], [1110, 1320]]; // 11h30–14h00 · 18h30–22h00
    var days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    var fmt = function (m) { return Math.floor(m / 60) + 'h' + String(m % 60).padStart(2, '0'); };
    var now;
    try { now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Zurich' })); } catch (e) { now = new Date(); }
    var day = now.getDay(), min = now.getHours() * 60 + now.getMinutes();
    var openDay = function (d) { return d >= 2 && d <= 6; };

    if (openDay(day)) {
      for (var i = 0; i < slots.length; i++) {
        if (min >= slots[i][0] && min < slots[i][1]) {
          label.textContent = 'Ouvert · jusqu’à ' + fmt(slots[i][1]);
          return;
        }
        if (min < slots[i][0]) {
          el.classList.add('is-closed');
          label.textContent = 'Fermé · ouvre à ' + fmt(slots[i][0]);
          return;
        }
      }
    }
    var next = (day + 1) % 7, guard = 0;
    while (!openDay(next) && guard++ < 7) next = (next + 1) % 7;
    el.classList.add('is-closed');
    label.textContent = 'Fermé · ouvre ' + (next === (day + 1) % 7 ? 'demain' : days[next]) + ' à 11h30';
  })();

  /* ---------- Formulaire de réservation (maquette) ---------- */
  (function booking() {
    var form = $('.booking_form');
    if (!form) return;
    var date = $('#date', form);
    var d = new Date();
    do { d.setDate(d.getDate() + 1); } while (d.getDay() === 0 || d.getDay() === 1);
    var iso = function (x) { return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
    date.value = iso(d);
    date.min = iso(new Date());
    form.addEventListener('submit', function () {
      var label = $('.booking_submit-label', form);
      label.textContent = 'Demande envoyée ✓';
      setTimeout(function () { label.textContent = 'Réserver une table'; }, 3000);
    });
  })();

  /* ---------- Scroll : parallaxe, remplissage, signatures, nav ---------- */
  var parallaxEls = $$('.parallax[data-speed]');
  var sigSection = $('.section_signatures');
  var sigTrack = $('.signatures_track');
  var sigWrap = $('.signatures_track-wrap');
  var sigBar = $('.signatures_progress');
  var floatingCta = $('.floating-cta');
  var hero = $('.section_hero');
  var booking = $('#reservation');
  var sigShift = 0;
  var ticking = false;

  function updateLayout() {
    if (!sigSection || !sigTrack) return;
    if (isDesktop() && !reduceMotion) {
      var wrapLeft = parseFloat(getComputedStyle(sigWrap).paddingLeft) || 0;
      sigShift = Math.max(0, sigTrack.scrollWidth - (window.innerWidth - wrapLeft) + wrapLeft);
      sigSection.style.height = (window.innerHeight + sigShift) + 'px';
    } else {
      sigShift = 0;
      sigSection.style.height = '';
    }
    requestTick();
  }

  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    var vh = window.innerHeight;

    // Navigation : fond + masquage au scroll descendant
    nav.classList.toggle('is-scrolled', y > 40);
    if (!body.classList.contains('is-menu-open')) nav.classList.toggle('is-hidden', y > lastY && y > 500);
    lastY = y;

    // Parallaxe
    if (!reduceMotion) {
      parallaxEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var offset = (r.top + r.height / 2) - vh / 2;
        el.style.setProperty('--py', (-offset * parseFloat(el.dataset.speed)).toFixed(1) + 'px');
      });
    }

    // Texte qui se remplit
    fillBlocks.forEach(function (block) {
      var r = block.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.3)));
      var n = Math.round(p * block._words.length);
      block._words.forEach(function (w, i) { w.classList.toggle('is-on', i < n || reduceMotion); });
    });

    // Signatures : défilement horizontal piloté par le scroll vertical
    if (sigShift > 0) {
      var top = sigSection.getBoundingClientRect().top;
      var p2 = Math.min(1, Math.max(0, -top / sigShift));
      sigTrack.style.setProperty('--tx', (-p2 * sigShift).toFixed(1) + 'px');
      sigBar.style.setProperty('--p', p2.toFixed(3));
    }

    // CTA flottant mobile
    if (floatingCta) {
      var heroBottom = hero.getBoundingClientRect().bottom;
      var bookTop = booking.getBoundingClientRect().top;
      var bookBottom = booking.getBoundingClientRect().bottom;
      floatingCta.classList.toggle('is-visible', heroBottom < 0 && !(bookTop < vh && bookBottom > 0));
    }
  }

  function requestTick() {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', updateLayout);
  window.addEventListener('load', updateLayout);

  // Progression des signatures en mobile (défilement natif)
  sigTrack && sigTrack.addEventListener('scroll', function () {
    if (sigShift > 0) return;
    var max = sigTrack.scrollWidth - sigTrack.clientWidth;
    sigBar.style.setProperty('--p', max > 0 ? (sigTrack.scrollLeft / max).toFixed(3) : 0);
  }, { passive: true });

  updateLayout();

  /* ---------- Curseur personnalisé ---------- */
  if (finePointer && !reduceMotion) {
    var cursor = $('.cursor');
    var cursorLabel = $('.cursor_label');
    var tx = -100, ty = -100, cx = -100, cy = -100;
    window.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      doc.classList.add('has-cursor');
      var labelled = e.target.closest && e.target.closest('[data-cursor]');
      var hover = e.target.closest && e.target.closest('a, button, select, input, label, .pillar, .menu_item, .sig-card');
      if (labelled) {
        cursorLabel.textContent = labelled.getAttribute('data-cursor');
        cursor.classList.add('is-label');
        cursor.classList.remove('is-hover');
      } else {
        cursor.classList.remove('is-label');
        cursor.classList.toggle('is-hover', !!hover);
      }
    });
    document.addEventListener('mouseleave', function () { doc.classList.remove('has-cursor'); });
    (function loop() {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      cursor.style.setProperty('--cx', cx.toFixed(1) + 'px');
      cursor.style.setProperty('--cy', cy.toFixed(1) + 'px');
      requestAnimationFrame(loop);
    })();

    /* Boutons magnétiques */
    $$('.magnetic').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', ((e.clientX - (r.left + r.width / 2)) * 0.3).toFixed(1) + 'px');
        el.style.setProperty('--my', ((e.clientY - (r.top + r.height / 2)) * 0.45).toFixed(1) + 'px');
      });
      el.addEventListener('mouseleave', function () {
        el.style.setProperty('--mx', '0px');
        el.style.setProperty('--my', '0px');
      });
    });

    /* Carte cadeau en 3D */
    var gift = $('.gift-card');
    var giftZone = gift && gift.parentElement;
    if (giftZone) {
      giftZone.addEventListener('mousemove', function (e) {
        var r = giftZone.getBoundingClientRect();
        gift.style.setProperty('--ry', (((e.clientX - r.left) / r.width - 0.5) * 24).toFixed(1) + 'deg');
        gift.style.setProperty('--rx', (((e.clientY - r.top) / r.height - 0.5) * -24).toFixed(1) + 'deg');
      });
      giftZone.addEventListener('mouseleave', function () {
        gift.style.setProperty('--ry', '0deg');
        gift.style.setProperty('--rx', '0deg');
      });
    }
  }
})();
