/* ============================================================
   Meridian Platform — admin.js
   Section tab switching (shared by sidebar + mobile bottom nav),
   projects filter, brand-colour swatch selection.
   Vanilla JS, no dependencies.
   ============================================================ */
(function () {
  'use strict';

  var panels = document.querySelectorAll('.admin-panel');
  var tabButtons = document.querySelectorAll('[data-tab]');
  var title = document.getElementById('adminTitle');
  var content = document.querySelector('.admin-content');

  var TITLES = {
    dashboard: 'Dashboard',
    projects: 'Projects',
    team: 'Team',
    media: 'Media library',
    settings: 'Settings'
  };

  function activate(tab, titleText) {
    panels.forEach(function (p) { p.hidden = (p.id !== 'tab-' + tab); });
    tabButtons.forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-tab') === tab);
    });
    if (title) title.textContent = titleText || TITLES[tab] || '';
    if (content) content.scrollTop = 0;
  }

  /* ---------- Tab switching (sidebar + bottom nav) ---------- */
  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activate(btn.getAttribute('data-tab'), btn.getAttribute('data-title'));
    });
  });

  /* ---------- In-content jumps (e.g. "Manage all" -> Projects) ---------- */
  document.querySelectorAll('[data-goto]').forEach(function (el) {
    el.addEventListener('click', function () {
      activate(el.getAttribute('data-goto'));
    });
  });

  /* ---------- Projects filter chips ---------- */
  var projectsPanel = document.getElementById('tab-projects');
  if (projectsPanel) {
    var chips = projectsPanel.querySelectorAll('.chip');
    var rows = projectsPanel.querySelectorAll('.data-table__row');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        var filter = chip.getAttribute('data-filter');
        rows.forEach(function (row) {
          var show = filter === 'All' || row.getAttribute('data-cat') === filter;
          row.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* ---------- Brand-colour swatch selection ---------- */
  var swatches = document.querySelectorAll('.swatch');
  swatches.forEach(function (sw) {
    sw.addEventListener('click', function () {
      swatches.forEach(function (s) { s.classList.remove('swatch--active'); });
      sw.classList.add('swatch--active');
    });
  });
})();
