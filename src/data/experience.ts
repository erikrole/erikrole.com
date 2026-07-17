export type Role = {
  id: string
  role: string
  org: string
  start: string
  end: string
  current?: boolean
  type?: string
  /** One-line artifact for the rundown slug: venue, scope, or channel. */
  stat?: string
  description: string
}

export const EXPERIENCE: Role[] = [
  {
    id: "wi-asst",
    role: "Assistant Director of Creative Video",
    org: "Wisconsin Badgers",
    start: "2025",
    end: "Present",
    current: true,
    stat: "Kohl Center",
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
    stat: "Fiserv Forum",
    description:
      "Create timely, engaging videoboard content for in-venue use during Bucks home games. Work both independently and with the in-house team to deliver high-quality work on brand and on deadline.",
  },
  {
    id: "wi-digital",
    role: "Digital Producer",
    org: "Wisconsin Badgers",
    start: "2019",
    end: "2025",
    stat: "23 varsity sports",
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
    stat: "American Family Field",
    description:
      "Produced videoboard content for Brewers home games at American Family Field across multiple seasons.",
  },
  {
    id: "btn",
    role: "Multi-Platform Video Editor",
    org: "Big Ten Network",
    start: "2018",
    end: "2019",
    stat: "@WisconsinOnBTN",
    description:
      "Shot and edited content for @WisconsinOnBTN social channels. Led creative production across BTN's digital, social, and broadcast platforms as a digital advocate aligning Wisconsin Athletics with Big Ten Network initiatives.",
  },
]

export const EXPERIENCE_SPAN = `${Math.min(...EXPERIENCE.map((r) => Number(r.start)))} → Present`
