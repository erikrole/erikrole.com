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
- **Deployment**: Configured for Netlify (works with any static host)

---

## Project Structure

```
/
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

### CSS Variables
All colors, fonts, and spacing defined in `src/styles/vars.css`:

```css
/* Primary colors */
--color-primary: #3eb0ef          /* Brand color (light mode) */
--color-base: #131313             /* Text color (light mode) */
--color-bg: #ffffff               /* Background (light mode) */

/* Fonts */
--font-sans-serif: 'Futura', ...  /* Headers, navigation */
--font-serif: 'EB Garamond', ...  /* Body text */

/* Dark mode */
[data-theme='dark'] {
  --color-primary: #5ec2ff
  --color-base: #e0e0e0
  --color-bg: #121212
}
```

**To customize colors/fonts**: Edit `src/styles/vars.css`

### Theme System
- Light/dark mode toggle in header
- Preference saved to localStorage
- Respects `prefers-color-scheme` media query
- Controlled via `data-theme` attribute on document root

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

### Dark Mode
- Toggle button in header (sun/moon icon)
- Auto-detects system preference
- Persists user choice
- Smooth transitions between themes

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

## Development Workflow

### Commands
```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview production build locally
```

### Git Workflow
- **Current branch**: `claude/personal-landing-page-uc2NX`
- **Main branch**: (to be determined)
- Always commit and push changes before stopping work
- Use clear, descriptive commit messages

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
- Verify frontmatter matches schema in `content/config.ts`
- Ensure all image paths are valid
- Check for missing imports

### Styling Issues
- Clear browser cache
- Check CSS variable names in `vars.css`
- Verify PostCSS is processing correctly
- Test in both light and dark modes

### Content Not Appearing
- Verify frontmatter is valid YAML
- Check `templateKey` matches available templates
- Ensure collection is imported in page routes
- Check if item needs `pagetype: ['main']` for homepage

### Navigation Issues
- Verify links in `Header.astro` match actual routes
- Check that pages exist in `src/content/pages/`
- Test mobile hamburger menu functionality

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

## Future Enhancements

Potential improvements for this personal landing page:
- [ ] Add analytics (Plausible, Fathom, or Google Analytics)
- [ ] Implement image gallery/lightbox for photos
- [ ] Add blog/writing section if needed
- [ ] Integrate YouTube/Vimeo API for video embeds
- [ ] Add resume/CV download link
- [ ] Implement OpenGraph tags for better social sharing
- [ ] Add schema.org structured data for SEO
- [ ] Create custom 404 page

---

## Resources

- **Astro Docs**: https://docs.astro.build
- **Content Collections**: https://docs.astro.build/en/guides/content-collections/
- **PostCSS**: https://postcss.org/
- **Netlify Deploy**: https://docs.netlify.com/

---

*Last updated: 2026-02-01*
