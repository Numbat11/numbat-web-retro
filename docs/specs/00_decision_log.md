# Decision Log — numbat-web-retro

Append-only record of what was **actually built** and **why**, for contextual referral.
Newest entry on top. **Never edit or delete prior entries** — supersede them with a new one.
Each entry is a lightweight ADR. Keep it PII-free (safe to commit).

Related specs (forward-looking intent) live alongside this file as `NN_<slug>.md`.

---

## 2026-07-03 — Popyalar live-site link in the Gallery modal

**Status after this:** Built · **Author:** Numbat + Claude

**What shipped**
`script.js` `PROJECTS[0].url` set to `https://app.popyalar.com`. The modal already had a
conditional "Visit live site →" link (`target="_blank" rel="noopener"`) wired up from the
very first Gallery build — it just needed a non-empty `url` to render.

**Why**
Checked `numbat-web-nature/src/lib/data/projects.js` (the committed seed) first — all
`url` fields are empty there. The real values live in `numbat-web-nature/data/projects.json`
(gitignored, admin-panel-edited, so it's the actual live state): only `popyalar` has a URL
set (`https://app.popyalar.com`); `bats`, `wildadventures`, and `treebaby` are all still
`""`. So only Popyalar gets a link for now — matches what the user confirmed (no link for
Tree Baby).

---

## 2026-07-03 — No-cache dev server (`scripts/dev-server.py`)

**Status after this:** Built · **Author:** Numbat + Claude

**What shipped**
`scripts/dev-server.py` — a ~15-line wrapper around `http.server.SimpleHTTPRequestHandler`
that adds `Cache-Control: no-store` to every response. `launch.json`, `README.md` and
`CLAUDE.md` updated to run this instead of plain `python3 -m http.server`.

**Why**
Plain `http.server` sends no cache header at all, so browsers cache `styles.css`/`script.js`
aggressively on a normal (non-hard) refresh. This bit the hero image crop fix directly: the
CSS was correctly updated on disk, but a plain reload kept showing the old cropped 16:9
version — confirmed via a cache-busted `fetch()` that the server had the new CSS all along.
Rather than relying on everyone remembering to hard-refresh during active styling work,
fixed it at the server.

---

## 2026-07-03 — Hero image crop fix

**Status after this:** Built · **Author:** Numbat + Claude

**What shipped**
`.hero-media` in `styles.css`: `aspect-ratio` changed from `16/9` to `3072/1544` (the
source's real ratio), `object-fit` changed from `cover` to `contain`, `max-width` bumped
480px → 560px.

**Why**
The dropped hero PNG's subject (the carved numbat) runs edge-to-edge on its canvas — nose
at column 0, tail-tip at column ~3071 (confirmed with a Pillow bounding-box check on the
alpha channel: `getbbox()` returned the full 3072×1544 canvas, no dead margin to trim).
Forcing that into a 16:9 frame with `object-fit: cover` cropped ~10% off each side,
slicing straight through the nose and tail. Matching the frame's ratio to the source and
switching to `contain` guarantees the whole figure is always visible, at the cost of a
sliver of letterboxed background at top/bottom — a good trade for a hero centerpiece.

**Verified:** desktop (1440×900) and the preview tool's narrow default viewport, cache-busted
stylesheet reload to rule out a stale-CSS false negative — nose and tail both fully in frame.

---

## 2026-07-02 — Real images dropped in, optimized to WebP

**Status after this:** Built · **Author:** Numbat + Claude

**What shipped**
The 5 images the user dropped into `assets/images/{hero,gallery}/` (named
`popyalar-poster.png`, `BATS-poster.png`, `WA-poster.png`, `treebaby-poster.png`,
`numbat-stonecarved-...-2x.png`) were renamed to match the slugs already wired into
`index.html`/`gallery.html`, then resized + converted with `sips` + `cwebp`:

| Slot | Source (full-res) | Shipped | Before → after |
|---|---|---|---|
| Hero | 3072×1544, alpha | `hero/optimized/main.webp` 960×482 | 3.25 MB → 48 KB |
| Popyalar | 2000×2000 | `gallery/optimized/popyalar.webp` 800×800 | 3.21 MB → 76 KB |
| BATS | 960×720, alpha | `gallery/optimized/bats.webp` 800×600 | 374 KB → 46 KB |
| Wild Adventures | 720×960 | `gallery/optimized/wildadventures.webp` 600×800 | 414 KB → 48 KB |
| Tree Baby | 960×720 | `gallery/optimized/treebaby.webp` 800×600 | 413 KB → 40 KB |

`gallery/numbatweb-poster.png` (2574×2452) was left untouched — not currently wired into
any page; asked the user what it's for before doing anything with it.

**Key build decisions**

- **WebP over GIF or plain PNG**, matching `numbat-web-selector`'s established convention.
  GIF was ruled out for the hero: 256-colour palette + 1-bit alpha would band/jag the
  edges of a soft-edged carved-stone graphic. WebP keeps the sibling repos' shipped-asset
  pattern consistent and gets full 8-bit alpha at a fraction of PNG's size.
- **The hero image already had a real alpha channel** (`sips -g hasAlpha` → `yes`) — no
  background removal was needed, just confirming it via `webpinfo -diag` (dedicated `ALPH`
  chunk present) after conversion, since `cwebp` silently drops alpha if the source lacks it.
- **`-alpha_q 100` on the hero only.** The 4 gallery shots are opaque photography/renders
  (no alpha payload to protect); the hero has a soft carved edge, so its alpha channel gets
  the least-lossy setting to avoid fringing where it meets the bevel frame.
- **Sources kept, at full resolution, outside `optimized/`** — same "never reference the
  source directly in HTML" rule as the selector repo, so a future re-crop/re-export never
  loses quality relative to what's already shipped.
- **No `<picture>`/PNG fallback.** WebP support is effectively universal in 2026 evergreen
  browsers (this matches the selector's WebP-only approach); adding a fallback path for a
  browser that can't decode WebP isn't a realistic scenario worth the extra markup.

---

## 2026-07-02 — Guestbook, hit counter, View Source easter egg, gallery pruned to 4

**Status after this:** Built · **Author:** Numbat + Claude

**What shipped**

| File | What it does |
|---|---|
| `guestbook.html` | New page — sign-in form (name/message) + entry list, persisted in `localStorage['nwr-guestbook']`, seeded with one welcome entry. Rendered via `textContent`/`createElement`, never `innerHTML`, since entries are user-supplied (XSS guard) |
| `script.js` | Added `initGuestbook()`, `initHitCounter()`, `initContextMenu()` + supporting `openSourceViewer()`/`openProperties()`/`savePageAs()`/`buildSystemDialog()`; trimmed `PROJECTS` from 10 to 4 entries |
| `styles.css` | Added `.guestbook-*`, `.ctx-menu`, `.hit-counter`/`.status-links`, `.card-media`/`.hero-media` (image frames with graceful missing-image placeholder), `.win-body pre`/`dl` (source viewer + properties dialog content) |
| `gallery.html` | Down to the 4 `favourite: true` projects (Coastal Eats, Outback Trails, Reef Monitor, Bushfire Ready, Wattle Studio, Solar Dash removed per user request — still in Nature's source data for a possible future pass); each card now has a `.card-media` image slot |
| `index.html` | Hero gets a `.hero-media` image slot; featured-work cards get matching `.card-media` slots; copy updated from "See all 10 projects" to "See the full gallery" |
| All 6 pages | Nav gets a "Guestbook" link; footer status bar gets a `view source` link + LCD-style visitor counter |

**Key build decisions**

- **Right-click easter egg, not a fake browser chrome.** `initContextMenu()` overrides the
  real `contextmenu` event with a beveled menu (View Source, Back, Refresh, Print, Save
  Page As…, Properties) — every item does something real (native `print()`, a genuine
  `Blob`-based HTML download, `history.back()`), not decorative dead links, per the standing
  "every clickable button enacts a change" rule. Trade-off: native "Save Image As" etc. are
  unavailable site-wide while this is active — acceptable for a static portfolio piece.
- **View Source shows live DOM, not original bytes.** `document.documentElement.outerHTML`
  reflects post-JS state (hit counter incremented, nav `is-current` class, etc.), unlike a
  real browser's "View Source" which shows the original fetched HTML. Close enough for the
  gag; not worth an extra fetch of the raw file for perfect fidelity.
- **Image slots ship before real images do.** Every frame (`card-media`/`hero-media`) has
  an `onerror` handler that swaps in a "Snapshot coming soon" placeholder instead of the
  browser's default broken-image icon — so the site looks intentional right now, and once
  a file lands at the exact expected path (see `CLAUDE.md` Asset map) it just works, zero
  code changes.
- **Guestbook is per-browser, not shared.** No backend in this stack, so entries live in
  the visitor's own `localStorage` — flagged clearly in the page copy so it doesn't read
  as broken when a second visitor doesn't see prior entries.
- **Gallery pruned, not deleted.** The 6 removed projects stay in
  `numbat-web-nature/src/lib/data/projects.js` (the actual source of truth); this stack's
  `script.js` `PROJECTS` array is just the 4-item subset the user asked to keep visible.

---

## 2026-07-02 — Gallery, Services, Pricing, Contact built (all stubs replaced)

**Status after this:** Built · **Author:** Numbat + Claude

**What shipped**
All four remaining stub pages replaced with real, interactive pages, per the standing
rule that clickable button-styled elements must enact a change rather than link to a
static page:

| File | What it does |
|---|---|
| `services.html` | All 11 NOPRDDBLEMO steps as a `role="tablist"` of buttons; clicking one swaps a `.reader-pane` detail panel in place (mirrors the Netscape screenshot's sidebar-tab behaviour); reads `location.hash` to auto-select on load |
| `gallery.html` | Project grid as buttons (not links); each opens a beveled "OS window" modal (`.win-overlay`) with the full story/tech/live-url, Prev/Next between projects, closes via `×`/backdrop/Escape; deep-links via `#project/<slug>` mirroring Nature's `ProjectModal.svelte` |
| `pricing.html` | 3 tier cards that expand in place to reveal a connective blurb + a mailto "Enquire about `<Tier>`" button pre-filled in the subject line |
| `contact.html` | Real form; submit builds the same `mailto:` link Nature's `Contact.svelte` builds, then swaps to a success panel (no backend in this stack) |
| `index.html` | NOPRDDBLEMO teaser tiles now link to `services.html#<slug>`; featured-work cards link to `gallery.html#project/<slug>` — both auto-select/auto-open on arrival |
| `script.js` | Added `PROJECTS` (10 entries, later trimmed) + `STEPS` (11 entries) data arrays and `initServices()`/`initGallery()`/`initPricing()`/`initContact()`, each a no-op if its page's root element isn't present |
| `styles.css` | Added `.win-*` modal classes, `.reader-pane`, `.tier-card.is-expanded`, form/field styles, `.service-chip`/`.ops-box`; removed the now-unused `.construction-banner` rules |

**Key build decisions**

- **A shared "OS window" component** (`.win-overlay`/`.win`/`.win-titlebar`) reused for the
  Gallery modal — steel-blue title bar with decorative `_`/`▢` and a functional `×`,
  matching the nav/section-header gradient already established on Home.
- **Verification handed to the user directly** — per explicit request, dropped
  `preview_screenshot`/`preview_click` from the loop for this kind of iteration; just start
  `python3 -m http.server 8080` and let the user test in their own browser, then patch on
  their feedback. Faster, no token cost, matches how the Home page build was verified.

---

## 2026-07-02 — Repo bootstrap + Home page built

**Spec:** [01_home-page-foundation.md](./01_home-page-foundation.md) · **Status after this:** Built (Home only)
**Author:** Numbat + Claude

**What shipped**
New repo, 5 pages, no build step:

| File | What it does |
|---|---|
| `styles.css` | Design tokens (silver bevel system, steel-blue title-bar gradient, classic link colours), nav bar, 3D buttons, hero, NOPRDDBLEMO tile grid, work cards, poll widget box, footer/status bar, `construction-banner` for stubs |
| `index.html` | Full Home page — ghosted "NUMBAT WEB" hero wordmark, NOPRDDBLEMO 11-tile teaser linking to Services, 4 featured projects (the `favourite: true` set from Nature's `projects.js`), a "Today's Poll" widget, business footer |
| `gallery.html` / `services.html` / `pricing.html` / `contact.html` | Shared chrome + a construction-banner stub (yellow/black hazard stripe, one-line teaser, back-home link); `contact.html`'s stub also surfaces the `mailto:` link directly since that's the one thing worth doing before the full form ships |
| `script.js` | Plain ES module — highlights the current nav button by pathname; wires the poll form's `submit` (with `preventDefault`) to a canned witty response per stack choice |

**Key build decisions**

- **Design seed → tokens, not a literal screenshot.** Pulled the steel-blue title-bar
  gradient, silver 3D bevel (`outset`/`inset` border trick), and classic underlined blue
  links from `netscape-6-3510948317.png`, but did not recreate a fake browser chrome
  around the page — the result is a genuine 90s *website* (nav-as-toolbar, beveled
  buttons, ghosted wordmark) rather than a screenshot pastiche.
- **CSS Grid/Flexbox under a tables-and-bevels *look*.** The multistack brief says
  "90s retro (tables, bevels)"; literal `<table>` layout would regress mobile
  responsiveness relative to Nature/Futuristic, so the retro feel is achieved with
  bevel borders + a fixed silver/steel palette while the layout itself is modern CSS.
- **System fonts only.** `Times New Roman` (body) + `Tahoma/Verdana/Arial` (UI) — no
  webfont hunt, keeps the "no build" brief intact and is period-accurate regardless.
- **Content copied verbatim from Nature**, not reworded — project taglines/tech lists
  from `numbat-web-nature/src/lib/data/projects.js`, business details from
  `Contact.svelte` — per the multistack "don't reword independently" rule.
- **Stub pages, not empty pages.** Gallery/Services/Pricing/Contact ship as real,
  on-brand construction banners rather than 404s or blank files, so the nav is fully
  clickable even before the next build pass.

**Verified in preview (desktop + narrow viewport)**
- Home page renders correctly at both a narrow (mobile-width) and 1440×900 desktop
  viewport; nav wraps to two rows at narrow widths as intended.
- All 4 stub pages load with correct per-page title/heading and highlight the matching
  nav button; no failed network requests, no console errors.
- Poll widget: selecting a stack and submitting shows the canned response and does not
  trigger a page navigation (confirmed no query-string reload).
- Not yet done: Lighthouse/accessibility pass, tablet-width check — deferred to the
  follow-up spec alongside the full Gallery/Services/Pricing/Contact builds.

---
