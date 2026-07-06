/* ============================================================
   Meridian Platform — main.js (landing)
   Mobile hamburger menu, work-gallery filter, smooth anchor scroll.
   Vanilla JS, no dependencies.
   ============================================================ */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');

  /* ---------- Mobile hamburger menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');

  function setMenu(open) {
    if (!menu || !toggle) return;
    if (open) { menu.removeAttribute('hidden'); }
    else { menu.setAttribute('hidden', ''); }
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    var iconMenu = toggle.querySelector('[data-icon="menu"]');
    var iconClose = toggle.querySelector('[data-icon="close"]');
    if (iconMenu && iconClose) {
      iconMenu.hidden = open;
      iconClose.hidden = !open;
    }
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(menu.hasAttribute('hidden'));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) setMenu(false);
  });

  /* ---------- Work gallery filter ---------- */
  var chips = document.querySelectorAll('.filter-chips .chip');
  var items = document.querySelectorAll('.work-item');

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      var filter = chip.getAttribute('data-filter');
      items.forEach(function (item) {
        var show = filter === 'All' || item.getAttribute('data-cat') === filter;
        item.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------- Smooth scroll with sticky-header offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var offset = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset - 12;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
