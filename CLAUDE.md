# numbat-web-retro — Claude context

## Project overview
The **Old School** slot in the Numbat Web multi-stack showcase: the same studio content
rendered a third way, this time as a vanilla HTML/CSS 90s-retro site (tables-and-bevels
look, no framework, no build step) — same philosophy as `numbat-web-selector`.

- **Reserved URL:** https://retro.numbatweb.com.au (not yet deployed — no Coolify resource)
- **Repo:** https://github.com/Numbat11/numbat-web-retro
- **Local path:** `/Users/numbat/Documents/numbat-web-retro`
- **Stack:** plain HTML + CSS + vanilla JS. **No framework, no build step.**

Related specs: `docs/specs/01_home-page-foundation.md`
**Multistack primary source of truth:** `../numbat-web-selector/docs/MULTISTACK-CONTEXT.md`
**Content source of truth:** `../numbat-web-nature` (Nature stack)

---

## Sibling stacks

| Label | Subdomain | Framework | Status |
|---|---|---|---|
| Nature | `nature.numbatweb.com.au` | SvelteKit | Live |
| Futuristic | `futuristic.numbatweb.com.au` | React + TS | Live |
| **Old School (this repo)** | `retro.numbatweb.com.au` | HTML/CSS | In progress — all 6 pages built |

The `numbat-web-selector` apex still shows "COMING SOON" for this slot until it's deployed.

---

## File inventory

```
numbat-web-retro/
├── index.html              — Home (hero, NOPRDDBLEMO teaser, featured work, poll)
├── gallery.html             — 4 featured projects, OS-window modal detail view
├── services.html            — full NOPRDDBLEMO, interactive reader-pane
├── pricing.html             — 3 tiers (expand-in-place), services, ongoing ops
├── contact.html             — mailto form + business info cards
├── guestbook.html           — localStorage guestbook (sign + view entries)
├── styles.css               — design tokens + retro chrome + layout
├── script.js                — all page logic (nav, poll, gallery modal, services
│                               reader-pane, pricing expand, contact/guestbook forms,
│                               hit counter, right-click "View Source" easter egg)
├── favicon.svg
├── assets/
│   ├── reference/netscape-6-3510948317.png   — design seed screenshot (not shipped on pages)
│   └── images/
│       ├── hero/
│       │   ├── main.png                      — source (full-res, alpha, not shipped)
│       │   └── optimized/main.webp           — shipped (960w, alpha preserved)
│       └── gallery/
│           ├── <slug>.png                    — sources (full-res, not shipped)
│           ├── numbatweb-poster.png          — spare asset, not wired into any page yet
│           └── optimized/<slug>.webp         — shipped (800w)
├── CLAUDE.md                — this file
├── README.md
└── docs/
    └── specs/
        ├── 00_decision_log.md
        └── 01_home-page-foundation.md
```

### Asset map — images (shipped 2026-07-02)
Sources live at `assets/images/{hero,gallery}/<name>.png` (full-res, never referenced
directly in HTML — same rule as `numbat-web-selector`). HTML references the optimized
WebP derivatives below; if one goes missing, its frame falls back to a "Snapshot coming
soon" placeholder instead of a broken-image icon (`.card-media`/`.hero-media` in
`styles.css`).

| Slot | Source | Shipped (HTML src) | Used on |
|---|---|---|---|
| Hero | `hero/main.png` (3072×1544, alpha) | `hero/optimized/main.webp` (960×482) | Home |
| Popyalar | `gallery/popyalar.png` | `gallery/optimized/popyalar.webp` (800×800) | Home + Gallery |
| BATS | `gallery/bats.png` | `gallery/optimized/bats.webp` (800×600) | Home + Gallery |
| Wild Adventures | `gallery/wildadventures.png` | `gallery/optimized/wildadventures.webp` (600×800) | Home + Gallery |
| Tree Baby | `gallery/treebaby.png` | `gallery/optimized/treebaby.webp` (800×600) | Home + Gallery |

Regenerate an optimized file after replacing a source:
```bash
sips -Z 800 assets/images/gallery/<slug>.png --out /tmp/x.png   # 960 for hero
cwebp -q 82 -m 6 /tmp/x.png -o assets/images/gallery/optimized/<slug>.webp
```
Add `-alpha_q 100` for images with transparency (the hero).

---

## Design system

### Aesthetic
90s retro: silver/gray 3D-beveled panels and buttons (`outset`/`inset` borders), a
steel-blue gradient title-bar accent for the nav bar, classic underlined blue links, a
giant translucent ghosted wordmark behind hero copy. Derived from
`assets/reference/netscape-6-3510948317.png` (a Netscape 6 screenshot).

### Tokens (CSS custom properties, `styles.css`)
| Token | Value | Use |
|---|---|---|
| `--silver` | `#c0c0c0` | panel/button base |
| `--bevel-light` | `#ffffff` / `#dfdfdf` | bevel highlight edge |
| `--bevel-dark` | `#808080` / `#404040` | bevel shadow edge |
| `--titlebar-start` / `--titlebar-end` | `#4a6d99` → `#8fb0d1` | nav bar + section header gradient |
| `--link` | `#0000EE` | unvisited link |
| `--link-visited` | `#551A8B` | visited link |

### Typography
`"Times New Roman", serif` for body copy, `Tahoma, Verdana, Arial, sans-serif` for
nav/UI/buttons. System fonts only — no webfont hunt, keeps the "no build" brief intact.

### Layout note
The look is tables-and-bevels; the underlying markup is CSS Grid/Flexbox, not literal
`<table>` layout, so mobile responsiveness doesn't regress relative to the sibling stacks.

---

## Content model
Copied (not reworded) from the Nature stack per the multistack "don't reword
independently" rule:
- Projects: `numbat-web-nature/src/lib/data/projects.js` — only the 4 `favourite: true`
  entries (Popyalar, BATS, Wild Adventures, Tree Baby) are shown; the other 6 were
  deliberately dropped from this stack's Gallery/Home, kept in the source for a future pass.
- Services (NOPRDDBLEMO): `numbat-web-nature/src/lib/pages/Services.svelte`
- Pricing: `numbat-web-nature/src/lib/pages/Pricing.svelte`
- Contact / business details: `numbat-web-nature/src/lib/pages/Contact.svelte`

---

## Interactive features (retro-flavoured, all functional — no dead buttons)
- **Services reader-pane** — clicking a NOPRDDBLEMO tile swaps a detail panel in place
  (`initServices()`); deep-links via `services.html#<step-slug>`.
- **Gallery OS-window modal** — clicking a project opens a beveled dialog with Prev/Next
  (`initGallery()`); deep-links via `gallery.html#project/<slug>`.
- **Pricing expand-in-place** — clicking a tier reveals more detail + a pre-filled mailto
  enquiry button (`initPricing()`).
- **Contact form** — builds a `mailto:` link and swaps in a success panel (`initContact()`,
  no backend, same pattern as Nature's `Contact.svelte`).
- **Guestbook** (`guestbook.html`) — sign-in form + entry list, persisted in
  `localStorage['nwr-guestbook']` (`initGuestbook()`). Per-browser only, not shared across
  visitors — there's no backend in this stack. Rendered via `textContent`, never
  `innerHTML`, since entries are user-supplied strings (XSS guard).
- **Hit counter** — `localStorage['nwr-hits']`, increments on every page load, rendered in
  the footer status bar (`initHitCounter()`).
- **"View Source" easter egg** — right-click anywhere for a fake retro context menu
  (`initContextMenu()`): View Source (real `outerHTML` dump in a dialog), Back, Refresh,
  Print, Save Page As… (downloads the live HTML via a Blob), Properties (title/URL/size/
  last-modified). A `view source` link in every footer triggers the same action for
  visitors who don't right-click. Trade-off: overriding `contextmenu` globally means the
  native "Save Image As" etc. are unavailable while this is active.

---

## Run locally
```bash
python3 scripts/dev-server.py 8080   # open http://localhost:8080
```

No build, no node_modules, no env vars. `scripts/dev-server.py` is a thin wrapper around
`http.server` that adds `Cache-Control: no-store` — plain `http.server` sends no cache
header at all, which lets browsers cache CSS/JS aggressively and show stale styles after
an edit + plain refresh (bit us once on the hero image fix — looked unfixed on a normal
reload until a hard refresh cleared the cached stylesheet).

## Deploy
Not yet connected to Coolify. Once the site has more than a Home page, create a Coolify
static resource pointed at `retro.numbatweb.com.au` (same pattern as `numbat-web-selector`),
then flip the Old School slot to `active: true` in the selector.
