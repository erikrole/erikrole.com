import { Card, CardContent } from "@/components/ui/card"

interface ExperienceCardProps {
  logo: string
  logoDark?: string
  company: string
  title: string
  duration: string
  isPresent?: boolean
  partTime?: boolean
  index: number
}

export function ExperienceCard({
  logo,
  logoDark,
  company,
  title,
  duration,
  isPresent,
  partTime,
  index,
}: ExperienceCardProps) {
  return (
    <Card
      className="border-0 border-b border-border/50 rounded-lg bg-transparent shadow-none hover:shadow-md hover:scale-[1.02] hover:border-border hover:bg-foreground/[0.04] transition-all duration-300 ease-out animate-slide-in-left print:break-inside-avoid print:shadow-none print:hover:shadow-none print:hover:scale-100"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="flex gap-3 p-2 pb-4">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center hover:-translate-y-1 transition-transform duration-300">
          {logoDark ? (
            <>
              <img
                src={logo}
                alt={company}
                width={40}
                height={40}
                className="w-full h-full object-contain dark:hidden"
                loading="lazy"
                decoding="async"
              />
              <img
                src={logoDark}
                alt={company}
                width={40}
                height={40}
                className="w-full h-full object-contain hidden dark:block"
                loading="lazy"
                decoding="async"
              />
            </>
          ) : (
            <img
              src={logo}
              alt={company}
              width={36}
              height={36}
              className="w-full h-full object-contain"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold mb-0.5">{title}</div>
          <div className="text-xs text-muted-foreground">
            {duration}
            {isPresent && (
              <>
                {" "}
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-green align-middle relative -top-px" />
                {" Present"}
              </>
            )}
            {partTime && " · Part-time"}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
