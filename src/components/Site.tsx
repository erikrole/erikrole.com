import { useEffect, useState, type CSSProperties } from "react"

const PROFILE = {
  name: "Erik Role",
  title: "Assistant Director of Creative Video",
  org: "Wisconsin Badgers",
  bio: "Creative video producer leading visual storytelling for Wisconsin Men's Basketball. Social-first content, in-venue production, and brand strategy.",
}

const SOCIALS = [
  { id: "email", label: "Email", href: "mailto:erikrole@gmail.com" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/erikrole/", external: true },
  { id: "x", label: "X", href: "https://x.com/ErikRole", external: true },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/erikrole/", external: true },
]

type Role = {
  id: string
  role: string
  org: string
  start: string
  end: string
  current?: boolean
  type?: string
  description: string
}

const EXPERIENCE: Role[] = [
  {
    id: "wi-asst",
    role: "Assistant Director of Creative Video",
    org: "Wisconsin Badgers",
    start: "2025",
    end: "Present",
    current: true,
    description:
      "Lead creative direction and visual storytelling for Wisconsin Men's Basketball. Oversee in-venue and social-first content, mentor student production staff, and partner across athletics to elevate brand presence and fan engagement.",
  },
  {
    id: "bucks",
    role: "Videoboard Content Creator",
    org: "Milwaukee Bucks",
    start: "2022",
    end: "Present",
    current: true,
    type: "Freelance",
    description:
      "Create timely, engaging videoboard content for in-venue use during Bucks home games. Work both independently and with the in-house team to deliver high-quality work on brand and on deadline.",
  },
  {
    id: "wi-digital",
    role: "Digital Producer",
    org: "Wisconsin Badgers",
    start: "2019",
    end: "2025",
    description:
      "Produced creative content across all 23 varsity sports with a focus on Men's Basketball — intros, hype videos, feature packages. Helped train and mentor student interns; maintained the media archive and equipment inventory.",
  },
  {
    id: "brewers",
    role: "Videoboard Content Creator",
    org: "Milwaukee Brewers",
    start: "2018",
    end: "2023",
    type: "Seasonal",
    description:
      "Produced videoboard content for Brewers home games at American Family Field across multiple seasons.",
  },
  {
    id: "btn",
    role: "Multi-Platform Video Editor",
    org: "Big Ten Network",
    start: "2018",
    end: "2019",
    description:
      "Shot and edited content for @WisconsinOnBTN social channels. Led creative production across BTN's digital, social, and broadcast platforms as a digital advocate aligning Wisconsin Athletics with Big Ten Network initiatives.",
  },
]

const Icon = ({ name, size = 16 }: { name: string; size?: number }) => {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }
  switch (name) {
    case "email":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      )
    case "instagram":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="4.5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      )
    case "x":
      return (
        <svg {...props}>
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      )
    case "linkedin":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 11v6" />
        </svg>
      )
    case "sun":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )
    case "moon":
      return (
        <svg {...props}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )
    default:
      return null
  }
}

function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof document === "undefined") return false
    return document.documentElement.classList.contains("dark")
  })
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light")
  }, [dark])
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
    >
      <Icon name={dark ? "sun" : "moon"} size={16} />
    </button>
  )
}

const cssVar = (k: string, v: string): CSSProperties => ({ [k]: v } as CSSProperties)

function TabBar({
  active,
  onChange,
}: {
  active: string
  onChange: (id: string) => void
}) {
  const tabs = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
  ]
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = tabs.findIndex((t) => t.id === active)
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      onChange(tabs[(i + 1) % tabs.length].id)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      onChange(tabs[(i - 1 + tabs.length) % tabs.length].id)
    }
  }
  return (
    <nav
      className={`tabbar tabbar-top ${scrolled ? "scrolled" : ""}`}
      role="tablist"
      onKeyDown={onKeyDown}
    >
      <div className="tabbar-mark">
        <span className="tabbar-mark-dot" />
        <span className="tabbar-mark-text">erikrole</span>
      </div>
      <div className="tabbar-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            tabIndex={active === t.id ? 0 : -1}
            className={`tabbar-tab ${active === t.id ? "is-active" : ""}`}
            onClick={() => onChange(t.id)}
          >
            <span className="tabbar-tab-label">{t.label}</span>
          </button>
        ))}
      </div>
      <ThemeToggle />
    </nav>
  )
}

function About() {
  return (
    <section className="about">
      <div className="about-head">
        <div className="reveal-item" style={cssVar("--d", "0ms")}>
          <div className="portrait" style={{ width: 120, height: 120 }}>
            <img
              src="/img/20240731-240731MBB-3329-Role-Edit.webp"
              alt="Erik Role"
              width={120}
              height={120}
            />
          </div>
        </div>
        <div className="about-head-text">
          <h1 className="display reveal-item" style={cssVar("--d", "60ms")}>
            {PROFILE.name}
          </h1>
          <p className="meta reveal-item" style={cssVar("--d", "120ms")}>
            <span>{PROFILE.title}</span>
            <span className="meta-sep">/</span>
            <span>{PROFILE.org}</span>
          </p>
        </div>
      </div>

      <p className="bio reveal-item" style={cssVar("--d", "200ms")}>
        {PROFILE.bio}
      </p>

      <ul className="socials reveal-item" style={cssVar("--d", "340ms")}>
        {SOCIALS.map((s) => (
          <li key={s.id}>
            <a
              href={s.href}
              className="social"
              aria-label={s.label}
              target={s.external ? "_blank" : undefined}
              rel={s.external ? "noopener me" : undefined}
            >
              <span className="social-icon">
                <Icon name={s.id} size={16} />
              </span>
              <span className="social-label">{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function ExperienceRow({
  item,
  index,
  expanded,
  onToggle,
}: {
  item: Role
  index: number
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <li
      className={`xp ${expanded ? "is-open" : ""} reveal-item`}
      style={cssVar("--d", `${index * 60}ms`)}
    >
      <button className="xp-row" onClick={onToggle} aria-expanded={expanded}>
        <span className="xp-main">
          <span className="xp-role">{item.role}</span>
          <span className="xp-org">
            <span className="xp-org-name">{item.org}</span>
            {item.type && <span className="xp-tag">{item.type}</span>}
          </span>
        </span>
        <span className="xp-dates">
          <span>{item.start}</span>
          <span className="xp-dates-arrow">→</span>
          <span>
            {item.current ? (
              <span className="xp-current">
                <span className="xp-current-dot" />
                {item.end}
              </span>
            ) : (
              item.end
            )}
          </span>
        </span>
        <span className="xp-toggle" aria-hidden="true">
          <span className="xp-toggle-line xp-toggle-h" />
          <span className="xp-toggle-line xp-toggle-v" />
        </span>
      </button>
      <div className="xp-body">
        <div className="xp-body-inner">
          <p>{item.description}</p>
        </div>
      </div>
    </li>
  )
}

function Experience() {
  const [openId, setOpenId] = useState<string | null>(null)
  return (
    <section className="xp-section">
      <div className="xp-header reveal-item" style={cssVar("--d", "0ms")}>
        <span className="eyebrow">Experience</span>
        <span className="xp-header-count">
          {EXPERIENCE.length} roles · 2018 — present
        </span>
      </div>
      <ul className="xp-list">
        {EXPERIENCE.map((item, i) => (
          <ExperienceRow
            key={item.id}
            item={item}
            index={i}
            expanded={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          />
        ))}
      </ul>
    </section>
  )
}

export function Site() {
  const [active, setActive] = useState<"about" | "experience">("about")
  const [pageKey, setPageKey] = useState(0)

  useEffect(() => {
    setPageKey((k) => k + 1)
  }, [active])

  return (
    <div className="app">
      <TabBar active={active} onChange={(id) => setActive(id as "about" | "experience")} />
      <main className="stage" key={pageKey}>
        {active === "about" ? <About /> : <Experience />}
      </main>
      <footer className="foot">
        <span>© {new Date().getFullYear()} Erik Role</span>
        <span className="foot-sep">·</span>
        <span>Madison, WI</span>
      </footer>
    </div>
  )
}
