export const PROFILE = {
  name: "Erik Role",
  title: "Assistant Director of Creative Video",
  org: "Wisconsin Badgers",
  location: "Madison, WI",
  coordinates: "43.0731° N — 89.4012° W",
  bio: "Creative video producer leading visual storytelling for Wisconsin Men's Basketball. Social-first content, in-venue production, and brand strategy.",
} as const

export type Social = {
  id: "email" | "instagram" | "x" | "linkedin"
  label: string
  href: string
  external?: boolean
}

export const SOCIALS: Social[] = [
  { id: "email", label: "Email", href: "mailto:erikrole@gmail.com" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/erikrole/", external: true },
  { id: "x", label: "X", href: "https://x.com/ErikRole", external: true },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/erikrole/", external: true },
]
