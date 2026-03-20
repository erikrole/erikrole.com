# CLAUDE.md - Erik Role Personal Website

## Overview
Personal landing page for Erik Role — a refined minimal, single-page static site with a 404 page. Built with Astro + React islands, styled with Tailwind CSS v4 and shadcn/ui components. Deployed to Cloudflare Pages.

**URL**: https://erikrole.com

## Tech Stack
- **Framework**: Astro 5.x (static site generator) with React islands
- **UI Components**: shadcn/ui (React) — Avatar, Card, Separator, Tooltip
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin
- **Fonts**: Abril Fatface + Lora (Google Fonts)
- **Deployment**: Cloudflare Pages (wrangler.toml)

## Project Structure
```
/
├── public/
│   ├── img/                    # Profile photo, company logos
│   ├── favicon.svg/ico         # Site icons
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn primitives (avatar, card, separator, tooltip)
│   │   ├── ProfilePhoto.tsx    # Avatar with hover scale + shadow bloom
│   │   ├── SocialLinks.tsx     # Tooltip-wrapped icon links
│   │   ├── ExperienceCard.tsx  # Elevated card with hover lift
│   │   └── ResumeList.tsx      # Cards + Separator composition
│   ├── lib/
│   │   └── utils.ts            # cn() utility (clsx + tailwind-merge)
│   ├── styles/
│   │   └── globals.css         # Tailwind + shadcn theme + animations
│   └── pages/
│       ├── index.astro         # Homepage with React islands
│       └── 404.astro           # 404 page (Tailwind only, no React)
├── components.json             # shadcn configuration
├── astro.config.mjs            # Astro + React + Tailwind v4 config
├── tsconfig.json               # TypeScript with @/* path aliases
├── wrangler.toml               # Cloudflare Pages config
└── package.json
```

## Commands
```bash
npm run dev      # Dev server at localhost:4321
npm run build    # Production build to dist/
npm run preview  # Preview production build
npx shadcn@latest add <component>  # Add new shadcn component
```

## Architecture: Astro Islands
React components render as islands within Astro pages:
- `ProfilePhoto` — `client:load` (tiny bundle, renders immediately)
- `SocialLinks` — `client:load` (tooltips need client JS)
- `ResumeList` — `client:visible` (below fold on mobile, delays hydration)
- 404 page uses plain Tailwind classes (no React hydration needed)

Mobile scroll behavior stays as vanilla JS in `<script>` tags (tightly coupled to page structure, not React state).

## Homepage Features (index.astro)
- Profile photo (120px Avatar) with hover scale + shadow bloom
- Name (Abril Fatface, fluid clamp sizing) + italic job title
- Bio paragraph with staggered fade-in-up entrance animations
- Social links with shadcn Tooltips (Instagram, X, LinkedIn, Email)
- Resume section with elevated Cards, hover lift, staggered entrance
- Mobile: scroll-triggered reveal — bio fades out, resume slides in, profile shrinks sticky
- Desktop: all content visible, vertically centered layout
- Dark mode via system preference (`prefers-color-scheme`)
- SEO: OpenGraph, Twitter cards, JSON-LD Person schema, canonical URL
- Print styles, reduced-motion support
- Auto-updating copyright year

## Theming (src/styles/globals.css)
Uses shadcn Tailwind v4 pattern:
- `:root` / `.dark` define CSS variables
- `@theme inline` maps them to Tailwind utilities
- `@custom-variant dark` enables class-based dark mode
- Custom animations: `fade-in`, `fade-in-up`, `slide-in-left`, `bounce-arrow`

## Dark Mode
- Inline `<script is:inline>` in `<head>` adds `.dark` class before render (no flash)
- `<script>` at end of body listens for `change` events on `matchMedia`
- Tailwind `dark:` variant via `@custom-variant dark (&:where(.dark, .dark *))`
- Both pages implement dark mode independently (no shared layout)

## Color Palette
| Variable | Light | Dark |
|----------|-------|------|
| --background | #f5ede0 (cream) | #2d2825 (charcoal) |
| --foreground | #0d0d0d | #f0ede8 |
| --muted-foreground | #6b5e50 | #a8998d |
| --border | #e8ddd0 | #4a4035 |
| --accent-green | #4caf50 | #4caf50 |

## Social Links
- Instagram: https://www.instagram.com/erikrole/
- X/Twitter: https://x.com/ErikRole
- LinkedIn: https://www.linkedin.com/in/erikrole/
- Email: erikrole@gmail.com

## Deployment
Cloudflare Pages via wrangler.toml. Build creates `dist/`, which is the asset directory.

## Rules
- Read files before editing
- Support both light and dark modes when changing styles
- Use Tailwind utilities and CSS variables, not hardcoded colors
- React components go in `src/components/`, shadcn primitives in `src/components/ui/`
- Keep page-level concerns (SEO, scroll behavior, dark mode script) in `.astro` files
- Images go in `public/img/`, referenced as `/img/filename.ext`

## Workflow Guidelines
- Enter plan mode for non-trivial tasks (3+ steps)
- If something goes wrong, stop and re-plan
- Verify changes work before marking complete (`npm run build`)
- After corrections, update this file with lessons learned
- Use subagents for research to keep main context clean

*Last updated: 2026-03-20*
