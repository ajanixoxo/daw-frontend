import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowUp, FileText } from "lucide-react"

const cooperatives = [
  {
    rank: 1,
    name: "Lagos Artisan Network",
    location: "Lagos",
    members: 45,
    growth: "10%",
    amount: "$125,000",
  },
  {
    rank: 2,
    name: "Lagos Artisan Network",
    location: "Lagos",
    members: 45,
    growth: "10%",
    amount: "$125,000",
  },
  {
    rank: 3,
    name: "Lagos Artisan Network",
    location: "Lagos",
    members: 45,
    growth: "10%",
    amount: "$125,000",
  },
  {
    rank: 4,
    name: "Lagos Artisan Network",
    location: "Lagos",
    members: 45,
    growth: "10%",
    amount: "$125,000",
  },
  {
    rank: 5,
    name: "Lagos Artisan Network",
    location: "Lagos",
    members: 45,
    growth: "10%",
    amount: "$125,000",
  },
  {
    rank: 6,
    name: "Lagos Artisan Network",
    location: "Lagos",
    members: 45,
    growth: "10%",
    amount: "$125,000",
  },
]

export function TopCooperatives() {
  return (
    <Card className="border-[#e4e7ec] bg-white">
      <CardHeader className="p-6">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#1d1d2a]" />
          <h3 className="text-lg font-semibold text-[#1d1d2a]">Top Cooperatives</h3>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#e4e7ec]">
          {cooperatives.map((coop) => (
            <div key={`${coop.rank}-${coop.name}`} className="flex items-center gap-4 p-4 px-6">
              <span className="text-sm font-medium text-[#838794]">{coop.rank}</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5ebff]">
                <span className="text-sm font-semibold text-[#973bfe]">M</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1d1d2a]">{coop.name}</p>
                <p className="text-xs text-[#838794]">
                  {coop.location} · {coop.members} members
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUp className="h-3 w-3 text-[#009a49]" />
                <span className="text-xs text-[#009a49]">{coop.growth}</span>
              </div>
              <p className="text-sm font-semibold text-[#1d1d2a]">{coop.amount}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
