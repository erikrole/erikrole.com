import { describe, it, expect } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Site } from "@/components/Site"

describe("Site — initial render", () => {
  it("shows the About tab by default with profile info", () => {
    render(<Site />)
    expect(screen.getByRole("heading", { level: 1, name: /erik role/i })).toBeInTheDocument()
    expect(screen.getByText(/Assistant Director of Creative Video/i)).toBeInTheDocument()
    expect(screen.getByText(/Wisconsin Badgers/i)).toBeInTheDocument()
  })

  it("renders all four social links", () => {
    render(<Site />)
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute("href", "mailto:erikrole@gmail.com")
    expect(screen.getByRole("link", { name: /instagram/i })).toHaveAttribute("href", "https://www.instagram.com/erikrole/")
    expect(screen.getByRole("link", { name: /^x$/i })).toHaveAttribute("href", "https://x.com/ErikRole")
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute("href", "https://www.linkedin.com/in/erikrole/")
  })

  it("opens external social links in a new tab with safe rel", () => {
    render(<Site />)
    const linkedin = screen.getByRole("link", { name: /linkedin/i })
    expect(linkedin).toHaveAttribute("target", "_blank")
    expect(linkedin.getAttribute("rel")).toContain("noopener")
  })
})

describe("Site — tabs", () => {
  it("uses ARIA tablist semantics", () => {
    render(<Site />)
    const tablist = screen.getByRole("tablist")
    expect(tablist).toBeInTheDocument()
    const tabs = within(tablist).getAllByRole("tab")
    expect(tabs).toHaveLength(2)
    expect(tabs[0]).toHaveAttribute("aria-selected", "true")
    expect(tabs[1]).toHaveAttribute("aria-selected", "false")
  })

  it("each tab points at a tabpanel via aria-controls", () => {
    render(<Site />)
    const aboutTab = screen.getByRole("tab", { name: /about/i })
    const panelId = aboutTab.getAttribute("aria-controls")
    expect(panelId).toBeTruthy()
    const panel = document.getElementById(panelId!)
    expect(panel).not.toBeNull()
    expect(panel).toHaveAttribute("role", "tabpanel")
    expect(panel).toHaveAttribute("aria-labelledby", aboutTab.id)
  })

  it("switches to the Experience tab on click", async () => {
    const user = userEvent.setup()
    render(<Site />)
    await user.click(screen.getByRole("tab", { name: /experience/i }))
    expect(screen.getByRole("tab", { name: /experience/i })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tab", { name: /about/i })).toHaveAttribute("aria-selected", "false")
    expect(screen.getByText(/5 roles · 2018 — present/i)).toBeInTheDocument()
  })

  it("supports arrow key navigation between tabs", async () => {
    const user = userEvent.setup()
    render(<Site />)
    const aboutTab = screen.getByRole("tab", { name: /about/i })
    aboutTab.focus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("tab", { name: /experience/i })).toHaveAttribute("aria-selected", "true")
    await user.keyboard("{ArrowLeft}")
    expect(screen.getByRole("tab", { name: /about/i })).toHaveAttribute("aria-selected", "true")
  })

  it("uses roving tabindex on the tablist", () => {
    render(<Site />)
    const aboutTab = screen.getByRole("tab", { name: /about/i })
    const expTab = screen.getByRole("tab", { name: /experience/i })
    expect(aboutTab).toHaveAttribute("tabindex", "0")
    expect(expTab).toHaveAttribute("tabindex", "-1")
  })
})

describe("Site — Experience rows", () => {
  it("collapses all rows by default", async () => {
    const user = userEvent.setup()
    render(<Site />)
    await user.click(screen.getByRole("tab", { name: /experience/i }))
    const rows = screen.getAllByRole("button", { expanded: false })
    expect(rows.length).toBeGreaterThan(0)
  })

  it("expands a row when clicked and only one row at a time", async () => {
    const user = userEvent.setup()
    render(<Site />)
    await user.click(screen.getByRole("tab", { name: /experience/i }))
    const rowButtons = screen.getAllByRole("button").filter((b) => b.classList.contains("xp-row"))
    expect(rowButtons.length).toBeGreaterThanOrEqual(2)
    await user.click(rowButtons[0])
    expect(rowButtons[0]).toHaveAttribute("aria-expanded", "true")
    await user.click(rowButtons[1])
    expect(rowButtons[0]).toHaveAttribute("aria-expanded", "false")
    expect(rowButtons[1]).toHaveAttribute("aria-expanded", "true")
  })

  it("toggles a row closed when clicked again", async () => {
    const user = userEvent.setup()
    render(<Site />)
    await user.click(screen.getByRole("tab", { name: /experience/i }))
    const row = screen.getAllByRole("button").filter((b) => b.classList.contains("xp-row"))[0]
    await user.click(row)
    expect(row).toHaveAttribute("aria-expanded", "true")
    await user.click(row)
    expect(row).toHaveAttribute("aria-expanded", "false")
  })
})

describe("Site — theme toggle", () => {
  it("toggles the .dark class and data-theme attribute on documentElement", async () => {
    const user = userEvent.setup()
    render(<Site />)
    const button = screen.getByRole("button", { name: /switch to (dark|light) mode/i })
    const initiallyDark = document.documentElement.classList.contains("dark")
    await user.click(button)
    expect(document.documentElement.classList.contains("dark")).toBe(!initiallyDark)
    expect(document.documentElement.getAttribute("data-theme")).toBe(!initiallyDark ? "dark" : "light")
  })

  it("persists the chosen theme to localStorage", async () => {
    const user = userEvent.setup()
    render(<Site />)
    const button = screen.getByRole("button", { name: /switch to (dark|light) mode/i })
    await user.click(button)
    const stored = localStorage.getItem("theme")
    expect(stored).toMatch(/^(light|dark)$/)
    expect(stored).toBe(document.documentElement.classList.contains("dark") ? "dark" : "light")
  })

  it("reflects the current theme in the aria-label", async () => {
    const user = userEvent.setup()
    render(<Site />)
    const button = screen.getByRole("button", { name: /switch to (dark|light) mode/i })
    const before = button.getAttribute("aria-label")
    await user.click(button)
    const after = button.getAttribute("aria-label")
    expect(before).not.toBe(after)
  })
})
