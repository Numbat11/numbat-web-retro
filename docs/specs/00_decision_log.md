# Decision Log — numbat-web-retro

Append-only record of what was **actually built** and **why**, for contextual referral.
Newest entry on top. **Never edit or delete prior entries** — supersede them with a new one.
Each entry is a lightweight ADR. Keep it PII-free (safe to commit).

Related specs (forward-looking intent) live alongside this file as `NN_<slug>.md`.

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
