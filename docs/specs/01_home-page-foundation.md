# Spec 01 — Home page foundation

**Status:** Planning → building this session
**Author:** Numbat + Claude

## Why
Old School is the third slot in the Numbat Web multi-stack showcase (see
`numbat-web-selector/docs/MULTISTACK-CONTEXT.md`) — reserved in the selector UI but never
built. This spec covers the repo bootstrap and the Home page only; Gallery, Services,
Pricing and Contact get coming-soon stubs here and full builds in a later spec.

## Design seed
`assets/reference/netscape-6-3510948317.png` — a Netscape 6 "What's New" screenshot.
Pulled from it: steel-blue gradient title bar, silver/gray 3D-beveled buttons and panels,
classic underlined blue links, a giant translucent ghosted wordmark behind the hero copy,
sidebar "widget" boxes, and a bottom status/menu bar.

Brief per the multistack docs: **vanilla HTML/CSS, no framework, no build step —
"90s retro (tables, bevels)"**.

## Design tokens
- Bevel: `#c0c0c0` silver base, light edge `#ffffff`/`#dfdfdf`, dark edge `#808080`/`#404040`
  via `outset`/`inset` border styles — used for nav bar, buttons, widget boxes.
- Title-bar accent: steel-blue gradient `#4a6d99` → `#8fb0d1`, used on the fixed nav bar
  and section headers.
- Links: `#0000EE` unvisited / `#551A8B` visited, underlined.
- Type: `"Times New Roman", serif` body copy, `Tahoma, Verdana, Arial, sans-serif` UI/nav.
  System fonts only — no webfont hunt, consistent with the "no build" brief.
- Layout: CSS Grid/Flexbox under the hood for real responsiveness. The *look* is
  tables-and-bevels; the markup is not literal `<table>` layout, so this stack doesn't
  regress on mobile relative to Nature/Futuristic.

## Content mapping (source: Nature stack, the content source of truth)
- Hero copy + brand voice line ("We build the web, differently.") —
  `numbat-web-futuristic/docs/NUMBAT-WEB-CONTEXT.md` § Brand voice.
- NOPRDDBLEMO 11-letter acronym teaser (linking to `services.html` stub) —
  `numbat-web-nature/src/lib/pages/Services.svelte`.
- Featured work: the 4 `favourite: true` projects (Popyalar, BATS, Wild Adventures, Tree
  Baby) — `numbat-web-nature/src/lib/data/projects.js`.
- Business footer (Numbat Web / Wild Adventures Pty Ltd / ABN 36 678 683 219 /
  numbat11@gmail.com) — `numbat-web-nature/src/lib/pages/Contact.svelte`.

## Pages this session
- `index.html` — full build (above content).
- `gallery.html`, `services.html`, `pricing.html`, `contact.html` — shared chrome, a
  retro "under construction" banner, one-line teaser, link back home.

## Open questions / deferred
- Full Gallery/Services/Pricing/Contact builds — next spec.
- Enabling the Old School slot in `numbat-web-selector` — deferred until this stack has
  more than a Home page.
- Coolify resource + DNS — manual step for the user once ready to deploy.
