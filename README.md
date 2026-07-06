# Meridian Platform

A vanilla, fully responsive company-profile website with a matching CMS dashboard —
a hand-coded rebuild of the imported "Meridian Platform" Claude Design prototype.

Software Version: 1.0.0

## What this is

- **`index.html`** — Meridian's public studio website (hero, services, work gallery with
  live filtering, studio/about, team, testimonials, contact, footer).
- **`admin.html`** — the Meridian CMS: a dashboard with KPIs, a pure-CSS visits chart,
  activity feed, content tables, team/media management, and settings. Reached from the
  public site via **Client login**; returns via **View site**.

Both pages are a single **responsive** layout each — the desktop design and the mobile
design are the *same document* reflowing at CSS breakpoints (no separate mobile build,
no device toggle). Resize the window and the layout adapts.

## How to open

Just open `index.html` in any modern browser (double-click it, or drag it onto a browser
window). No build step, no server, no install.

For a local server (optional, nicer for caching):

```
# from this folder
python -m http.server 8000
# then visit http://localhost:8000
```

## Responsive behaviour

| Width | Landing | Admin |
|-------|---------|-------|
| ≥ 1024px | full desktop layout | sidebar + content |
| 768–1023px | tighter grids | sidebar + content, denser |
| < 768px | single column, hamburger menu | sidebar → fixed bottom tab-nav; tables become cards |

## Structure

```
index.html        Public company-profile site
admin.html        CMS dashboard
css/
  base.css        Design tokens, reset, shared components (buttons, pills, chips, icons)
  landing.css     Landing layout + responsive reflow
  admin.css       Admin layout + responsive reflow
js/
  main.js         Landing: hamburger menu, gallery filter, smooth scroll
  admin.js        Admin: tab switching (sidebar + bottom nav), filters, swatches
```

## Notes

- **Dependencies (CDN only):** Google Fonts (Space Grotesk + Manrope) and Unsplash photos.
  An internet connection is needed for the fonts and imagery to display; everything else
  is local. Swap the Unsplash `<img src>` values for your own photos when ready.
- **Front-end only:** forms, search and action buttons (New project, Upload, Save…) are
  visual — there is no backend, matching the original prototype.
- Icons are inline SVG; the visits chart is plain HTML/CSS (no chart library).
