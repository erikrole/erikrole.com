# CLAUDE.md - Erik Role Personal Website

## Overview
Personal landing page for Erik Role — a refined minimal site with a tabbed About / Experience layout. Built with Astro 6 + a single React island. Hand-rolled CSS using design tokens (no Tailwind, no component library). Deployed to Cloudflare Workers Static Assets.

**URL**: https://erikrole.com

## Tech Stack
- **Framework**: Astro 6.x (static SSG) with one React island
- **UI**: Plain React + plain CSS (no Tailwind, no shadcn, no Radix)
- **Styling**: CSS custom properties in `src/styles/globals.css` — `oklch()` color tokens, light + dark themes
- **Fonts**: Self-hosted Abril Fatface (display) + Darker Grotesque (body), served from `/fonts/`
- **Deployment**: Cloudflare Workers Static Assets (`wrangler.toml` with `[assets] directory = "./dist"`)
- **Testing**: Vitest + React Testing Library + happy-dom (`tests/`, `npm test`)
- **CI**: GitHub Actions runs `npm run build` on push/PR (`.github/workflows/build.yml`)

## Project Structure
```
/
├── public/
│   ├── fonts/                  # Self-hosted woff2 (Abril Fatface, Darker Grotesque)
│   ├── img/                    # Headshot
│   ├── _headers                # Security headers (CSP, etc.) for Cloudflare
│   ├── favicon.svg / favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   └── Site.tsx            # Single React island: TabBar + About + Experience + ThemeToggle
│   ├── styles/
│   │   └── globals.css         # All design tokens, layout, components, print, reduced-motion
│   └── pages/
│       ├── index.astro         # Mounts <Site client:load />
│       └── 404.astro           # Standalone, scoped <style>, no shared layout
├── tests/
│   ├── setup.ts                # Vitest setup (jest-dom matchers, cleanup, matchMedia stub)
│   └── Site.test.tsx           # Component tests (tabs, theme, expand/collapse)
├── astro.config.mjs            # Astro + @astrojs/react + @astrojs/sitemap
├── tsconfig.json               # @/* path aliases
├── vitest.config.ts            # Test runner config
├── wrangler.toml               # Cloudflare Workers Static Assets config
└── package.json
```

## Commands
```bash
npm run dev         # Dev server at localhost:4321
npm run build       # Production build to dist/
npm run preview     # Preview production build
npm test            # Run vitest once
npm run test:watch  # Run vitest in watch mode
```

## Architecture
The whole interactive UI is one island: `Site.tsx` is mounted with `client:load` from `index.astro`. It owns:
- Tab state (About / Experience)
- Scroll-based tab-bar shadow
- Expand/collapse state for experience rows
- Theme toggle (writes `.dark` class + `data-theme` to `<html>`)

The 404 page is fully standalone with inline `<style>` — no React, no shared layout, no dependencies on Site.tsx.

## Design tokens
All colors defined as CSS custom properties on `:root` (light) and overridden on `.dark`. Use `var(--ink)`, `var(--bg)`, `var(--hairline)`, etc. — never hardcode colors. Fonts via `var(--font-display)` and `var(--font-sans)`.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `oklch(98.5% 0.004 80)` warm off-white | `oklch(15% 0.005 80)` |
| `--ink` / `--ink-2/3/4` | progressive grays toward warm cream | inverted |
| `--hairline` | subtle separator | subtle separator |
| `--status` | green pulse for "current" roles | brighter green |

## Theme behavior
1. Inline script in `<head>` reads `localStorage.theme` first, falling back to `prefers-color-scheme`, and applies `.dark` + `data-theme="dark"` before paint (no flash).
2. Listener follows OS theme changes only when the user has not made an explicit choice (no `localStorage.theme`).
3. `ThemeToggle` button writes the user's choice to `localStorage.theme`, which sticks across reloads and overrides the OS listener.

## Social Links
- Email: erikrole@gmail.com
- Instagram: https://www.instagram.com/erikrole/
- X/Twitter: https://x.com/ErikRole
- LinkedIn: https://www.linkedin.com/in/erikrole/

## Resume data
Hardcoded in `Site.tsx` — `EXPERIENCE` array. Edit there to update roles. `current: true` shows the pulsing status dot. `type: "Freelance"` etc. shows a small pill next to the org name.

## Deployment
Cloudflare Workers Static Assets via `wrangler.toml` (`[assets] directory = "./dist"`). Build output is `dist/`. Security headers come from `public/_headers` (copied to `dist/_headers` at build time).

## Rules
- Read files before editing
- Light + dark must both look right when changing styles
- Use CSS custom properties (`var(--ink)`, `var(--bg)`, etc.), not hardcoded colors
- Keep page-level concerns (SEO, theme bootstrap, OG meta) in `.astro` files; behavior + state in `Site.tsx`
- Images go in `public/img/`, fonts in `public/fonts/`
- Don't reintroduce Tailwind, shadcn, or component libraries — the site uses plain CSS by design

## Workflow Guidelines
- Enter plan mode for non-trivial tasks (3+ steps)
- If something goes wrong, stop and re-plan
- Verify changes work before marking complete (`npm test && npm run build`)
- After corrections, update this file with lessons learned

*Last updated: 2026-05-08*
