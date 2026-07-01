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
| **Old School (this repo)** | `retro.numbatweb.com.au` | HTML/CSS | In progress — Home page only |

The `numbat-web-selector` apex still shows "COMING SOON" for this slot until it has more
than a Home page.

---

## File inventory

```
numbat-web-retro/
├── index.html              — Home page (built)
├── gallery.html             — coming-soon stub
├── services.html            — coming-soon stub
├── pricing.html             — coming-soon stub
├── contact.html             — coming-soon stub
├── styles.css               — design tokens + retro chrome + layout
├── script.js                — nav toggle + poll widget (no framework)
├── favicon.svg
├── assets/
│   └── reference/netscape-6-3510948317.png   — design seed screenshot (not shipped on pages)
├── CLAUDE.md                — this file
├── README.md
└── docs/
    └── specs/
        ├── 00_decision_log.md
        └── 01_home-page-foundation.md
```

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
- Projects: `numbat-web-nature/src/lib/data/projects.js`
- Services (NOPRDDBLEMO): `numbat-web-nature/src/lib/pages/Services.svelte`
- Pricing: `numbat-web-nature/src/lib/pages/Pricing.svelte`
- Contact / business details: `numbat-web-nature/src/lib/pages/Contact.svelte`

---

## Run locally
```bash
python3 -m http.server 8080   # open http://localhost:8080
```

No build, no node_modules, no env vars.

## Deploy
Not yet connected to Coolify. Once the site has more than a Home page, create a Coolify
static resource pointed at `retro.numbatweb.com.au` (same pattern as `numbat-web-selector`),
then flip the Old School slot to `active: true` in the selector.
