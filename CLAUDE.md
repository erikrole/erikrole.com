# CLAUDE.md - Erik Role Personal Website

## Overview
Personal landing page for Erik Role — a minimal, single-page static site with a 404 page. Built with Astro, deployed to Cloudflare Pages.

**URL**: https://erikrole.com

## Tech Stack
- **Framework**: Astro 5.x (static site generator)
- **Styling**: Inline CSS with CSS custom properties (no external stylesheets)
- **Fonts**: Abril Fatface + Lora (Google Fonts)
- **Deployment**: Cloudflare Pages (wrangler.toml)
- **PostCSS**: Autoprefixer only (postcss.config.cjs)

## Project Structure
```
/
├── public/
│   ├── img/                    # Profile photo, company logos
│   ├── favicon.svg/ico         # Site icons
│   └── robots.txt
├── src/pages/
│   ├── index.astro             # Homepage (entire site)
│   └── 404.astro               # 404 page
├── astro.config.mjs            # Astro config + sitemap integration
├── postcss.config.cjs          # Autoprefixer
├── wrangler.toml               # Cloudflare Pages config
└── package.json
```

That's it. No components, layouts, templates, or content collections.

## Commands
```bash
npm run dev      # Dev server at localhost:4321
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

## Homepage Features (index.astro)
- Profile photo with hover lift
- Name (Abril Fatface) + job title
- Bio paragraph
- Icon-only social links (Instagram, X, LinkedIn, Email)
- Resume section with company logos and light/dark logo variants (B1G Network)
- Mobile: scroll-triggered reveal — bio fades out, resume slides in, profile shrinks sticky
- Desktop: all content visible, centered layout
- Dark mode via system preference (`prefers-color-scheme`)
- SEO: OpenGraph, Twitter cards, JSON-LD Person schema, canonical URL
- Print styles, reduced-motion support
- Auto-updating copyright year

## Dark Mode
- Inline `<script is:inline>` in `<head>` adds `.dark` class before render (no flash)
- `<script>` at end of body listens for `change` events on `matchMedia`
- CSS uses `html.dark` selector to override `:root` variables
- Both pages implement dark mode independently (no shared layout)

## Color Palette
| Variable | Light | Dark |
|----------|-------|------|
| --bg | #f5ede0 (cream) | #2d2825 (charcoal) |
| --text | #0d0d0d | #f0ede8 |
| --text-secondary | #6b5e50 | #a8998d |
| --border | #e8ddd0 | #4a4035 |

## Social Links
- Instagram: https://www.instagram.com/erikrole/
- X/Twitter: https://x.com/ErikRole
- LinkedIn: https://www.linkedin.com/in/erikrole/
- Email: erikrole@gmail.com

## Deployment
Cloudflare Pages via wrangler.toml. Build creates `dist/`, which is the asset directory.

## Rules
- Read files before editing
- Keep changes minimal — this is intentionally a simple site
- Support both light and dark modes when changing styles
- Use CSS variables, not hardcoded colors
- Don't add components/layouts/abstractions — inline everything in the page files
- Images go in `public/img/`, referenced as `/img/filename.ext`

## Workflow Guidelines
- Enter plan mode for non-trivial tasks (3+ steps)
- If something goes wrong, stop and re-plan
- Verify changes work before marking complete (`npm run build`)
- After corrections, update this file with lessons learned
- Use subagents for research to keep main context clean

*Last updated: 2026-03-15*
