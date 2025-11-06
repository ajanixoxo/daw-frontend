import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUp, FileText } from "lucide-react"

const members = [
  {
    id: 1,
    name: "Turtleneck v-neck",
    organization: "Lagos Artisan Network",
    revenue: "$125,000",
    growth: "10%",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-BljW5QiKtOA0kKJLug4b8neZft6oqX.png",
  },
  {
    id: 2,
    name: "Turtleneck v-neck",
    organization: "Lagos Artisan Network",
    revenue: "$125,000",
    growth: "10%",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-BljW5QiKtOA0kKJLug4b8neZft6oqX.png",
  },
  {
    id: 3,
    name: "Turtleneck v-neck",
    organization: "Lagos Artisan Network",
    revenue: "$125,000",
    growth: "10%",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-BljW5QiKtOA0kKJLug4b8neZft6oqX.png",
  },
  {
    id: 4,
    name: "Turtleneck v-neck",
    organization: "Lagos Artisan Network",
    revenue: "$125,000",
    growth: "10%",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-BljW5QiKtOA0kKJLug4b8neZft6oqX.png",
  },
  {
    id: 5,
    name: "Turtleneck v-neck",
    organization: "Lagos Artisan Network",
    revenue: "$125,000",
    growth: "10%",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-BljW5QiKtOA0kKJLug4b8neZft6oqX.png",
  },
]

export function TopPerformingMembers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <FileText className="h-5 w-5" />
          Top Performing Members
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground w-6">{member.id}</span>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>TN</AvatarFallback>
                </Avatar>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.organization}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-sm text-[#009a49]">
                  <ArrowUp className="h-3 w-3" />
                  {member.growth}
                </span>
                <span className="text-sm font-semibold text-foreground min-w-[80px] text-right">{member.revenue}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
