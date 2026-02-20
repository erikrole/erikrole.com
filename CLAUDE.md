# CLAUDE.md - Erik Role Personal Website

## Project Overview
Personal landing page for Erik Role built with the Clay Astro theme. This is a minimalist, image-centric static site designed as a professional landing page with social links, bio, and media content.

**Site Owner**: Erik Role
**Social Links**:
- Instagram: https://www.instagram.com/erikrole/
- X/Twitter: https://x.com/ErikRole
- LinkedIn: https://www.linkedin.com/in/erikrole/

---

## Tech Stack
- **Framework**: Astro 5.16.5 (static site generator)
- **Styling**: PostCSS with CSS custom properties (CSS variables)
- **Content**: Astro Content Collections (Markdown/MDX)
- **TypeScript**: Strict mode enabled
- **Deployment**: Cloudflare Pages (wrangler.toml)
- **Font**: Abril Fatface (Google Fonts) for headings

---

## Current Implementation

**IMPORTANT**: The homepage (`src/pages/index.astro`) has been completely rebuilt as a **single-page landing site**. It does NOT use the Clay theme components or templates. The design is minimal, clean, and focused solely on Erik's professional identity.

**Homepage Features**:
- Profile photo with hover bounce effect
- Name and current title
- Professional bio summary
- Icon-only social links (Instagram, X, LinkedIn, Email)
- Compact resume section with company logos
- Auto-updating copyright year in footer
- Adaptive B1G Network logo (black/white based on theme)
- System-responsive dark mode (⚠️ currently troubleshooting)

**Other pages** (bio, work, news, sold, contact, elements) still use the original Clay theme structure but are not linked from the homepage.

## Project Structure

```
/
├── .claudeignore               # Files excluded from Claude context
├── .git/hooks/pre-commit       # Build validation before commits
├── public/                     # Static assets
│   ├── img/                    # Images (reference as /img/filename.jpg)
│   ├── favicon.svg/ico         # Site icons
│   └── robots.txt              # SEO robots file
├── src/
│   ├── components/             # Reusable components
│   │   ├── Header.astro        # Site header with navigation
│   │   ├── Footer.astro        # Site footer
│   │   └── PostCard.astro      # Card component for grids
│   ├── content/                # Content Collections (Markdown)
│   │   ├── pages/              # Main pages (index, bio, contact, etc.)
│   │   ├── work/               # Portfolio items
│   │   ├── news/               # Blog posts
│   │   └── sold/               # Exhibitions/sold items
│   ├── layouts/
│   │   └── Layout.astro        # Master layout (header, footer, theme)
│   ├── pages/                  # Route definitions
│   │   ├── index.astro         # Homepage
│   │   ├── [...slug].astro     # Catch-all dynamic route
│   │   └── [collection]/[slug].astro # Collection item routes
│   ├── styles/                 # CSS files
│   │   ├── vars.css            # CSS variables (colors, fonts)
│   │   ├── content.css         # Typography for markdown
│   │   └── components/         # Component-specific styles
│   └── templates/              # Templates for content types
│       ├── Page.astro          # Simple page template
│       ├── List.astro          # Collection listing template
│       ├── Work.astro          # Individual item template
│       └── Contact.astro       # Contact form template
├── astro.config.mjs            # Astro configuration
└── package.json                # Dependencies and scripts
```

---

## Content Management

### Content Collections
Content is managed through Astro's Content Collections API. All collections share a common schema defined in `src/content/config.ts`.

**Available Collections**:
1. **pages** - Main site pages (homepage, bio, contact, etc.)
2. **work** - Portfolio/work items
3. **news** - Blog posts and news
4. **sold** - Exhibitions/sold items archive

### Frontmatter Schema
All content files support these fields:

```yaml
---
title: string (required)           # Page/item title
description: string (optional)     # Short description
date: YYYY-MM-DD (optional)        # Publication date (for sorting)
thumbnail: /img/file.jpg (optional) # Card/header image
templateKey: string (optional)     # Which template to use
image: string (optional)           # Alternative image field
featuredimage: string (optional)   # Featured image
heading: string (optional)         # Custom heading
subheading: string (optional)      # Custom subheading
number: number (optional)          # Sort order on homepage
pagetype: ['main'] (optional)      # Include on homepage if contains 'main'
---
```

### Template Keys
The `templateKey` field determines which template renders the content:
- `index-page` → Homepage
- `bio-page` → About/bio page
- `work-page` → Work listing page
- `news-page` → News listing page
- `contact-page` → Contact form page
- `exhibitions-page` → Sold/exhibitions listing page
- (none) → Default Page template for simple pages

### Adding New Content

**To add a new page**:
1. Create `src/content/pages/page-name.md`
2. Add frontmatter with `title` and optional `templateKey`
3. Write content in Markdown
4. Page automatically available at `/page-name`

**To add portfolio/work items**:
1. Create `src/content/work/item-name.md`
2. Add frontmatter with `title`, `date`, `thumbnail`
3. Item available at `/work/item-name`

**To add images**:
1. Place image in `public/img/`
2. Reference in frontmatter as `/img/filename.jpg`

---

## Styling System

### CSS Variables (Homepage Only)
The homepage uses inline CSS variables (not `src/styles/vars.css`). All styles defined in `src/pages/index.astro`:

```css
:root {
    color-scheme: light dark;
    --bg: #f5f4f0;              /* Cream background */
    --text: #1a1a1a;            /* Dark text */
    --text-secondary: #666;     /* Gray for subtitles */
    --border: #e0e0e0;          /* Light gray borders */
}

html.dark {
    color-scheme: dark;
    --bg: #2a2a2a;              /* Charcoal background */
    --text: #f5f5f5;            /* Light text */
    --text-secondary: #b0b0b0;  /* Light gray for subtitles */
    --border: #444;             /* Dark gray borders */
}
```

**Font**: Abril Fatface (Google Fonts) for name/headings

**To customize**: Edit the `<style>` section in `src/pages/index.astro`

### Theme System
- NO manual toggle (respects system preference only)
- Detects `prefers-color-scheme: dark` via JavaScript
- Adds `.dark` class to `<html>` when dark mode detected
- CSS uses `html.dark` selector for specificity
- Theme preference can be saved to localStorage (not currently used)

---

## Navigation Structure

### Main Navigation
Defined in `src/components/Header.astro`:
- Home → `/`
- Bio → `/bio`
- Work → `/work`
- News → `/news`
- Contact → `/contact`
- Elements → `/elements` (style guide)

**To modify navigation**:
1. Edit the `<nav>` section in `Header.astro`
2. Update links and labels as needed
3. Mobile hamburger menu updates automatically

### Footer
Defined in `src/components/Footer.astro`
- Currently minimal
- Good place for social links, copyright, etc.

---

## Key Features

### Dark Mode (✅ FIXED)
**Root cause**: `postcss-custom-properties` with `{ preserve: false }` in `postcss.config.cjs` was resolving all CSS variables at build time. `var(--bg)` became `#f5f4f0` hardcoded, so `html.dark` had nothing to override.

**Fix**: Changed `{ preserve: false }` to `{ preserve: true }` in `postcss.config.cjs`. CSS variables now remain as `var(--bg)` etc. in compiled output, allowing `html.dark` overrides to work at runtime.

**Implementation** (src/pages/index.astro):
- Inline script in `<head>` with `is:inline` directive detects system preference
- Adds `.dark` class to `<html>` when dark mode is active
- CSS uses `html.dark` selector to override `:root` variables

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 740px, 980px, 1280px, 1680px
- Hamburger menu on mobile (< 850px)
- Grid adapts from 3-column to full-width

### Client-Side Routing
- Astro View Transitions enabled
- Smooth page navigation (SPA-like feel)
- No full page reloads between routes

### SEO
- Automatic sitemap generation (`sitemap.xml`)
- Meta tags in Layout.astro
- robots.txt in public/

### Forms
- Netlify form integration in Contact template
- reCAPTCHA support
- Submission confirmation page at `/contact/thanks`

---

## Claude Code Optimizations

### .claudeignore
A `.claudeignore` file excludes unnecessary files from Claude's context:
- `node_modules/` - Dependencies
- `dist/` and `.astro/` - Build artifacts
- `.DS_Store`, `*.log`, `.cache/` - Temp files
- `.git/`, `.vscode/`, `.idea/` - Version control and IDE files

**Impact**: Faster operations, reduced token usage, better performance

### .gitignore
A `.gitignore` file prevents build artifacts from being committed to version control:
- `dist/`, `.astro/` - Build output (regenerated on deploy)
- `node_modules/` - Dependencies (installed via package.json)
- `.DS_Store`, logs, cache files - Temporary files
- `.env` files - Environment variables

**Impact**: Cleaner git history, smaller repo size, no repeated build artifact commits

### Pre-commit Hook
A pre-commit hook (`.git/hooks/pre-commit`) automatically runs `npm run build` before every commit to catch errors early.

**Impact**: Prevents broken deployments, validates changes before they reach the repo. Build output is validated but not committed (excluded by .gitignore).

## Development Workflow

### Commands
```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview production build locally
```

### Deployment
Site is deployed to **Cloudflare Pages** using Wrangler:

**Configuration** (`wrangler.toml`):
```toml
name = "erikrole"
compatibility_date = "2026-02-01"

[assets]
directory = "./dist"
```

**To deploy**:
1. Build: `npm run build` (creates `dist/` folder)
2. Deploy via Cloudflare dashboard or CLI
3. Site URL: erikrole.com

### Git Workflow
- **Current branch**: `claude/personal-landing-page-uc2NX`
- **Main branch**: (to be determined)
- Always commit and push changes before stopping work
- Use clear, descriptive commit messages
- Pre-commit hook automatically validates builds

### Making Changes

**To update homepage**:
1. Edit `src/content/pages/index.md` for content
2. Modify `src/pages/index.astro` for layout/structure

**To update bio/about page**:
1. Edit `src/content/pages/bio.md`

**To add social links**:
1. Edit `src/components/Header.astro` or `Footer.astro`
2. Add links with appropriate icons/styling

**To customize colors**:
1. Edit `src/styles/vars.css`
2. Update both light and dark mode values

---

## Personal Landing Page Customization

### Current Goals
- ✅ Easily identifiable name and photo
- ✅ Links out to various social platforms
- ✅ About me page with a short bio
- ⏳ Room for embedded videos and photos

### Recommended Simplifications
For a personal landing page (vs. artist portfolio):
1. **Remove or repurpose sections**: News, Sold, Work collections may be unnecessary
2. **Simplify navigation**: Focus on Home, About, Contact + social links
3. **Homepage focus**: Make homepage more landing-page centric with hero section
4. **Social integration**: Add social links prominently in header/footer
5. **Media gallery**: Repurpose Work collection for photos/videos if needed

---

## Important Rules

### Content Updates
- NEVER commit changes without user request
- Always read files before editing
- Keep changes minimal and focused
- Preserve existing structure unless explicitly changing it

### Style Changes
- Use CSS variables instead of hardcoded values
- Support both light and dark modes
- Test responsive breakpoints
- Maintain existing design language

### Navigation & Structure
- Keep URL structure consistent
- Don't remove pages without checking for links
- Update navigation when adding/removing pages
- Maintain accessibility (semantic HTML, ARIA labels)

### Images
- Optimize images before adding to `public/img/`
- Use descriptive filenames
- Reference as `/img/filename.jpg` in frontmatter
- Consider responsive image sizes

### Git Operations
- Commit logical units of work
- Write clear commit messages
- Push to `claude/personal-landing-page-uc2NX` branch
- Don't force push unless explicitly requested

---

## Common Tasks

### Add a New Page
```bash
# 1. Create markdown file
# src/content/pages/new-page.md

# 2. Add frontmatter
---
title: "New Page"
description: "Page description"
---

# 3. Add content in Markdown

# 4. Update navigation in Header.astro if needed
```

### Embed a Video
```markdown
<!-- YouTube -->
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>

<!-- Vimeo -->
<iframe src="https://player.vimeo.com/video/VIDEO_ID" width="640" height="360" frameborder="0" allowfullscreen></iframe>
```

### Add Social Links
```astro
<!-- In Header.astro or Footer.astro -->
<div class="social-links">
  <a href="https://www.instagram.com/erikrole/" target="_blank" rel="noopener">Instagram</a>
  <a href="https://x.com/ErikRole" target="_blank" rel="noopener">Twitter</a>
  <a href="https://www.linkedin.com/in/erikrole/" target="_blank" rel="noopener">LinkedIn</a>
</div>
```

### Change Color Scheme
```css
/* In src/styles/vars.css */
:root {
  --color-primary: #YOUR_COLOR;
  --color-base: #YOUR_TEXT_COLOR;
  /* ... more variables */
}

[data-theme='dark'] {
  --color-primary: #YOUR_DARK_COLOR;
  /* ... dark mode overrides */
}
```

---

## Troubleshooting

### Build Errors
- Check TypeScript errors: `npm run build`
- Pre-commit hook will catch build errors automatically
- Verify frontmatter matches schema in `content/config.ts`
- Ensure all image paths are valid
- Check for missing imports

### Dark Mode Not Working (Current Issue)
**Symptoms**: Site stays in light mode even when system is set to dark mode

**Debugging steps**:
1. Open browser console (F12 or Cmd+Option+I)
2. Check if script runs and detects dark mode preference
3. Verify `.dark` class is added to `<html>` element (Inspect > Elements)
4. Check computed styles to see if CSS variables are overridden
5. Look for CSS specificity conflicts

**Known issues**:
- CSS specificity with `:root` vs `.dark` selectors
- Need to use `html.dark` for proper specificity
- Original Clay theme used manual toggle, NOT system detection

### Styling Issues
- Clear browser cache (Cmd+Shift+R or Ctrl+F5)
- Check CSS variable names in inline `<style>` (not vars.css for homepage)
- Verify CSS specificity (use browser DevTools)
- Test in both light and dark modes on actual Mac/iPhone

### Favicon 404
- Check file exists in `public/img/`
- Verify filename matches reference in `<link>` tag
- Common names: `favicon.ico`, `favicon.svg`, `favicon.png`

### Content Not Appearing
- Verify frontmatter is valid YAML
- Check `templateKey` matches available templates
- Ensure collection is imported in page routes
- Note: Homepage is now standalone, doesn't pull from collections

---

## Performance Best Practices

- **Optimize images**: Use WebP/AVIF formats, compress JPGs
- **Lazy load**: Images below the fold can lazy load
- **Minimize JavaScript**: Astro ships zero JS by default - keep it that way
- **Use content collections**: Type-safe, optimized content handling
- **Leverage static generation**: Pre-render all routes at build time

---

## Security Notes

- Contact form uses Netlify form handling (no backend required)
- No user authentication (static site)
- reCAPTCHA protects against spam
- External links use `rel="noopener"` for security

---

## Completed Features

- ✅ Single-page minimal landing design
- ✅ Profile photo with hover bounce effect
- ✅ Icon-only social links (Instagram, X, LinkedIn, Email)
- ✅ Compact resume section with company logos
- ✅ Auto-updating copyright year
- ✅ Adaptive B1G Network logo (black/white versions)
- ✅ Cloudflare Pages deployment
- ✅ Claude Code optimizations (.claudeignore, pre-commit hook)

## Known Issues

- ❌ Dark mode not responding to system preference (troubleshooting in progress)
- ⚠️ Favicon 404 error (needs file verification)

## Future Enhancements

Potential improvements for this personal landing page:
- [ ] Fix dark mode system preference detection
- [ ] Add video embed section (YouTube/Vimeo)
- [ ] Add photo gallery section
- [ ] Add resume/CV download link (PDF)
- [ ] Add analytics (Plausible, Fathom, or Google Analytics)
- [ ] Implement OpenGraph tags for better social sharing
- [ ] Add schema.org structured data for SEO
- [ ] Create custom 404 page
- [ ] Add smooth scroll animations

---

## Lessons Learned

### Dark Mode Implementation
**Challenge**: Automatic dark mode detection in Astro

**What we learned**:
- Inline scripts need `is:inline` directive to prevent bundling
- Script must run in `<head>` before page renders to prevent flash
- CSS specificity matters: `html.dark` beats `:root` selector
- `@media (prefers-color-scheme: dark)` can conflict with JS approach
- Original Clay theme used manual toggle, NOT system detection
- Browser console debugging reveals script execution but not CSS application issues

**Best practices**:
- Use `window.matchMedia('(prefers-color-scheme: dark)').matches` for detection
- Add `.dark` class to `<html>` element, not `<body>`
- Use higher specificity selectors (`html.dark`) for dark mode overrides
- Add `color-scheme: dark` to CSS for proper browser rendering
- Test on actual devices (Mac/iPhone), not just browser DevTools

### Claude Code Optimizations
**High-impact, low-effort improvements**:
1. **`.claudeignore`** - Exclude build artifacts and dependencies from context
2. **Pre-commit hooks** - Validate builds before commits
3. **Focused documentation** - Keep CLAUDE.md updated with current state

**Performance tips**:
- Exclude large directories (node_modules, dist, .git) from Claude's context
- Use pre-commit hooks to catch errors early
- Document troubleshooting steps for future reference

## Resources

- **Astro Docs**: https://docs.astro.build
- **Content Collections**: https://docs.astro.build/en/guides/content-collections/
- **PostCSS**: https://postcss.org/
- **Cloudflare Pages**: https://developers.cloudflare.com/pages/
- **Wrangler**: https://developers.cloudflare.com/workers/wrangler/
- **Google Fonts (Abril Fatface)**: https://fonts.google.com/specimen/Abril+Fatface

---

*Last updated: 2026-02-02*
