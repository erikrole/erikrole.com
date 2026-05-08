import { describe, it, expect, beforeAll } from "vitest"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

const dist = join(process.cwd(), "dist")
const distExists = existsSync(dist)

const readDist = (file: string) => readFileSync(join(dist, file), "utf8")

describe.skipIf(!distExists)("build output", () => {
  let indexHtml = ""
  let notFoundHtml = ""
  let headers = ""

  beforeAll(() => {
    indexHtml = readDist("index.html")
    notFoundHtml = readDist("404.html")
    headers = readDist("_headers")
  })

  it("emits index.html and 404.html", () => {
    expect(indexHtml.length).toBeGreaterThan(0)
    expect(notFoundHtml.length).toBeGreaterThan(0)
  })

  it("preloads both self-hosted fonts", () => {
    expect(indexHtml).toMatch(/rel="preload"[^>]*href="\/fonts\/abril-fatface-400\.woff2"/)
    expect(indexHtml).toMatch(/rel="preload"[^>]*href="\/fonts\/darker-grotesque\.woff2"/)
  })

  it("has a single inline theme bootstrap that reads localStorage before paint", () => {
    expect(indexHtml).toContain("localStorage.getItem('theme')")
    expect(indexHtml).toMatch(/prefers-color-scheme: dark/)
  })

  it("emits canonical and OG tags", () => {
    expect(indexHtml).toContain('rel="canonical"')
    expect(indexHtml).toContain('property="og:image"')
    expect(indexHtml).toContain('name="twitter:card"')
  })

  it("emits Person JSON-LD schema", () => {
    expect(indexHtml).toContain('application/ld+json')
    expect(indexHtml).toContain('"@type":"Person"')
  })

  it("404 has noindex and the same theme bootstrap pattern", () => {
    expect(notFoundHtml).toContain('content="noindex"')
    expect(notFoundHtml).toContain("localStorage.getItem('theme')")
  })

  it("does not contain the dead 'scroll-smooth' class", () => {
    expect(indexHtml).not.toContain("scroll-smooth")
  })

  it("does not reference deleted brand logo or jpeg assets", () => {
    for (const asset of [
      "Badgers.png",
      "Brewers.png",
      "Bucks.png",
      "B1G Network",
      "Role-Edit.jpeg",
    ]) {
      expect(indexHtml).not.toContain(asset)
      expect(notFoundHtml).not.toContain(asset)
    }
  })

  it("ships _headers with a tightened CSP (no Google Fonts allowlist)", () => {
    expect(headers).toContain("Content-Security-Policy")
    expect(headers).not.toContain("fonts.googleapis.com")
    expect(headers).not.toContain("fonts.gstatic.com")
    expect(headers).toContain("font-src 'self'")
  })

  it("ships sitemap files referenced by robots.txt", () => {
    expect(existsSync(join(dist, "sitemap-index.xml"))).toBe(true)
  })

  it("portrait image has decoding=async and fetchpriority=high for LCP", () => {
    expect(indexHtml.toLowerCase()).toContain('decoding="async"')
    expect(indexHtml.toLowerCase()).toContain('fetchpriority="high"')
  })

  it("ships the portrait webp and no longer ships the deleted JPEG", () => {
    expect(existsSync(join(dist, "img", "20240731-240731MBB-3329-Role-Edit.webp"))).toBe(true)
    expect(existsSync(join(dist, "img", "20240731-240731MBB-3329-Role-Edit.jpeg"))).toBe(false)
  })
})
