# CLAUDE.md - Erik Role Personal Website

## Overview
Personal portfolio for Erik Role — a single scrolling page with a broadcast/videoboard aesthetic: giant condensed display type, a broadcast "lower-third" hero signature, credited selected work, and a rundown-sheet experience list. Built with Astro 6, zero client frameworks (no React), hand-rolled CSS with design tokens. Deployed to Cloudflare Pages.

**URL**: https://erikrole.com

## Tech Stack
- **Framework**: Astro 6.x (static SSG), no UI framework — all `.astro` components
- **Styling**: Plain CSS custom properties in `src/styles/globals.css` — `oklch()` color tokens, light + dark themes (no Tailwind, no shadcn, no Radix)
- **Fonts**: Self-hosted from `/fonts/` — Anton (display), Archivo variable 400–700 (body), IBM Plex Mono 400/500 (utility/labels)
- **Client JS**: Two tiny inlined scripts in `Layout.astro` (theme bootstrap + toggle/scroll listeners). No framework bundle ships.
- **Deployment**: Cloudflare Pages (`wrangler.toml`, output dir `dist/`)
- **CI**: GitHub Actions runs `npm run build` on push/PR (`.github/workflows/build.yml`)

## Project Structure
```
/
├── public/
│   ├── fonts/                  # anton-400, archivo-var, ibm-plex-mono-400/500 (woff2)
│   ├── favicon.svg             # Cardinal square + "ER"
│   └── robots.txt
├── src/
│   ├── assets/                 # Imported, optimized, fingerprinted portfolio images
│   ├── data/
│   │   ├── site.ts             # PROFILE + SOCIALS (typed)
│   │   ├── experience.ts       # EXPERIENCE roles + EXPERIENCE_SPAN (typed)
│   │   └── work.ts             # Verified external portfolio destination + featured scope
│   ├── layouts/
│   │   └── Layout.astro        # Document shell: meta/OG, fonts, theme bootstrap, toggle+scroll scripts
│   ├── components/
│   │   ├── TopBar.astro        # Fixed bar: wordmark, anchor nav, theme toggle
│   │   ├── Hero.astro          # Giant stacked name + lower-third signature
│   │   ├── SelectedWork.astro  # Featured credited-work gateway
│   │   ├── About.astro         # Portrait + bio + socials
│   │   ├── Experience.astro    # Rundown-sheet role list
│   │   ├── Footer.astro
│   │   └── Icon.astro          # Inline SVG icons (socials, sun/moon)
│   ├── styles/
│   │   └── globals.css         # All tokens, layout, components, motion, print
│   └── pages/
│       ├── index.astro         # SEO payload (JSON-LD) + composes components
│       └── 404.astro           # Standalone "SIGNAL LOST" page, scoped <style>
├── astro.config.mjs            # Astro + @astrojs/sitemap
├── tsconfig.json               # @/* path aliases
├── wrangler.toml               # Cloudflare Pages config
└── package.json
```

## Commands
```bash
npm run dev      # Dev server at localhost:4321
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

## Architecture
Fully static — no islands. Interactivity is two small scripts in `Layout.astro`:
1. Inline `is:inline` script in `<head>`: reads `localStorage.theme` override, falls back to `prefers-color-scheme`, applies `.dark` + `data-theme` before paint.
2. Bundled (inlined by Astro) script before `</body>`: theme toggle click handler (persists override to localStorage), OS-theme change listener (only when no override), topbar scrolled-state class.

Motion is reserved for the one-shot hero introduction and interactive state feedback. Below-the-fold portfolio and resume content renders immediately.

The 404 page is standalone (imports globals.css for tokens, own scoped styles, own theme bootstrap) — no dependency on Layout/components.

## Design tokens
All colors as CSS custom properties on `:root` (light — "printed game program") and `.dark` (dark — "arena, lights down"). Use `var(--ink)`, `var(--bg)`, `var(--accent)`, `var(--hairline)`, etc. — never hardcode colors.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `oklch(97.5% 0.003 250)` cool paper | `oklch(13.5% 0.006 260)` arena charcoal |
| `--ink` / `--ink-2/3/4` | near-black → grays | near-white → grays |
| `--accent` | cardinal red `oklch(50% 0.2 27)` | brighter `oklch(60% 0.21 27)` |
| `--lt-accent` | accent for the inverted lower-third strip (opposite theme's accent) | — |
| `--shell` / `--gutter` | layout width (1080px) and side padding | same |

Type roles: `--font-display` (Anton, always uppercase), `--font-sans` (Archivo), `--font-mono` (IBM Plex Mono, uppercase + letterspaced for labels/dates/nav).

## Theme behavior
1. Inline script in `<head>` (Layout.astro and 404.astro) applies `.dark` + `data-theme` before paint: localStorage override wins, else OS preference.
2. OS theme changes sync live only when the user hasn't set an override.
3. `#theme-toggle` button in TopBar toggles and persists to `localStorage.theme`.

## Social Links
- Email: erikrole@gmail.com
- Instagram: https://www.instagram.com/erikrole/
- X/Twitter: https://x.com/ErikRole
- LinkedIn: https://www.linkedin.com/in/erikrole/

## Resume data
Typed data lives in `src/data/experience.ts` (`EXPERIENCE` array), `src/data/site.ts` (`PROFILE`, `SOCIALS`), and `src/data/work.ts` (`FEATURED_WORK`). `current: true` shows the pulsing red "NOW" indicator; `type: "Freelance"` etc. shows a small pill under the dates.

## Deployment
Cloudflare Pages via `wrangler.toml`. Build output is `dist/`.

## Rules
- Read files before editing
- Light + dark must both look right when changing styles
- Use CSS custom properties (`var(--ink)`, `var(--bg)`, etc.), not hardcoded colors
- Keep page-level concerns (SEO, theme bootstrap, OG meta) in `Layout.astro`/`.astro` pages; content data in `src/data/`
- Imported content images go in `src/assets/` so Astro can optimize and fingerprint them; fonts and browser-root assets remain in `public/`
- Don't reintroduce Tailwind, shadcn, component libraries, or a client framework — the site is plain CSS + static Astro by design
- Anton is display-only and always uppercase; body copy stays in Archivo

## Workflow Guidelines
- Enter plan mode for non-trivial tasks (3+ steps)
- If something goes wrong, stop and re-plan
- Verify changes work before marking complete (`npm run build`)
- After corrections, update this file with lessons learned

## Lessons learned
- `img` width/height HTML attributes act as presentational hints — when overriding size in CSS with `aspect-ratio`, also set `height: auto` or the attribute height wins.
- The collaborative browser can intermittently fail screenshots when the page is scrolled. For below-the-fold visual checks, first try a fresh preview tab; if needed, keep `scrollY` at 0 and temporarily translate the page body.
- At 320px, fixed-width header controls need `flex-shrink: 0` plus a narrow-screen spacing pass; otherwise Flexbox compresses the theme toggle and wraps the wordmark despite their declared sizes.
- Keep the site static until a measured user need justifies server state. Use Cloudflare `_headers` for cache and security policy, and keep credited work as verified external links rather than inventing project attribution.
- Reserve motion for the branded hero and direct interaction feedback; portfolio and resume content should not wait on scroll-driven reveals.

*Last updated: 2026-08-10*
