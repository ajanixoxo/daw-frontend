import { type LucideIcon, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: LucideIcon
}

export function StatsCard({ title, value, change, trend, icon: Icon }: StatsCardProps) {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 text-[#f10e7c]">
              <Icon className="h-5 w-5" />
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-bold text-foreground">{value}</p>
              <div className="flex items-center gap-1.5 text-xs">
                {trend === "up" && (
                  <>
                    <TrendingUp className="h-3.5 w-3.5 text-[#009a49]" />
                    <span className="text-[#009a49] font-medium">{change}</span>
                  </>
                )}
                {trend === "neutral" && <span className="text-muted-foreground">{change}</span>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
