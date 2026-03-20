import { ExperienceCard } from "./ExperienceCard"
import { Separator } from "@/components/ui/separator"

const experiences = [
  {
    logo: "/img/Badgers.png",
    company: "Wisconsin Badgers",
    title: "Assistant Director of Creative Video / Wisconsin Badgers",
    duration: "Jun 2025 –",
    isPresent: true,
  },
  {
    logo: "/img/Bucks.png",
    company: "Milwaukee Bucks",
    title: "Videoboard Content Creator / Milwaukee Bucks",
    duration: "Oct 2022 –",
    isPresent: true,
    partTime: true,
  },
  // past
  {
    logo: "/img/Badgers.png",
    company: "Wisconsin Badgers",
    title: "Digital Producer / Wisconsin Badgers",
    duration: "Jun 2019 – Jun 2025",
  },
  {
    logo: "/img/Brewers.png",
    company: "Milwaukee Brewers",
    title: "Videoboard Content Creator / Milwaukee Brewers",
    duration: "Mar 2018 – Dec 2023",
  },
  {
    logo: "/img/B1G Network-Black.png",
    logoDark: "/img/B1G Network-White.png",
    company: "Big Ten Network",
    title: "Multi-Platform Video Editor / Big Ten Network",
    duration: "Aug 2018 – May 2019",
  },
]

export function ResumeList() {
  const present = experiences.filter((e) => e.isPresent)
  const past = experiences.filter((e) => !e.isPresent)

  return (
    <div className="w-full">
      {present.map((exp, i) => (
        <ExperienceCard key={`present-${i}`} {...exp} index={i} />
      ))}
      <Separator className="my-4" />
      {past.map((exp, i) => (
        <ExperienceCard
          key={`past-${i}`}
          {...exp}
          index={i + present.length}
        />
      ))}
    </div>
  )
}
