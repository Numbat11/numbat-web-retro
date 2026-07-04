# Numbat Web — Old School Stack

The **Old School** entry in the Numbat Web multi-stack showcase: the same studio content
rendered as a third distinct stack + aesthetic. This one is **vanilla HTML + CSS +
JS** — no framework, no build step — styled as a 90s-retro site (silver 3D bevels, a
steel-blue title-bar accent, classic underlined blue links) seeded from a Netscape 6
screenshot.

> Sibling stacks (separate repos): **Nature** (SvelteKit, the content source of truth)
> and **Futuristic** (React + TypeScript). See
> `../numbat-web-selector/docs/MULTISTACK-CONTEXT.md` for the full picture.

## Status
All 6 pages are built (Home, Gallery, Services, Pricing, Contact, Guestbook), each with
real interactions instead of dead links — see `docs/specs/00_decision_log.md` for what's
shipped and why.

## Quick start
```bash
python3 scripts/dev-server.py 8080
# open http://localhost:8080
```

No build, no `node_modules`, no env vars. Uses a tiny wrapper around `http.server` that
sends `Cache-Control: no-store` so CSS/JS edits always show up on a plain refresh — plain
`python3 -m http.server` caches aggressively and can show stale styles.

## Documentation
- [CLAUDE.md](CLAUDE.md) — project overview, design tokens, file inventory
- [docs/specs/01_home-page-foundation.md](docs/specs/01_home-page-foundation.md) — Home page spec
- [docs/specs/00_decision_log.md](docs/specs/00_decision_log.md) — append-only build log

## Deploy
Not yet deployed. Once more pages are built, this becomes a Coolify static resource at
`retro.numbatweb.com.au`, matching `numbat-web-selector`'s deploy pattern.
