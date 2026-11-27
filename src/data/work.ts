export type WorkItem = {
  eyebrow: string
  title: string
  description: string
  /** Verified external destination only — never invent credits or links. */
  href: string
  linkLabel: string
  disciplines: readonly string[]
}

/**
 * Credited work, in rundown order. The first entry renders as the featured card;
 * any further entries render as numbered rundown rows beneath it.
 */
export const WORK: readonly WorkItem[] = [
  {
    eyebrow: "Wisconsin Men's Basketball",
    title: "BadgerMBB Creative",
    description:
      "Creative direction, social-first storytelling, and in-venue production for Wisconsin Men's Basketball.",
    href: "https://gondola.cc/ErikRole",
    linkLabel: "View credited work",
    disciplines: ["Creative direction", "Social-first", "In-venue"],
  },
]
