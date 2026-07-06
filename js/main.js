/* ============================================================
   Meridian Platform — main.js (landing)
   Work-gallery filter, smooth anchor scroll, and the mobile
   bottom navigation (scroll-to-top + scroll-spy active state).
   Vanilla JS, no dependencies.
   ============================================================ */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');

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

  /* ---------- Mobile bottom nav: Home scroll-to-top + scroll-spy ---------- */
  var bottomLinks = document.querySelectorAll('.landing-bottomnav a');
  var topLink = document.querySelector('.landing-bottomnav a[data-top]');

  if (topLink) {
    topLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function updateSpy() {
    if (!bottomLinks.length) return;
    var offset = (header ? header.offsetHeight : 0) + 24;
    var pos = window.scrollY + offset;
    var current = 'top';
    ['work', 'studio', 'contact'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= pos) current = id;
    });
    bottomLinks.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('data-spy') === current);
    });
  }

  window.addEventListener('scroll', updateSpy, { passive: true });
  window.addEventListener('resize', updateSpy);
  updateSpy();
})();
