import { type LucideIcon, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ShopStatsCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "neutral" | "warning"
  icon: LucideIcon
}

export function ShopStatsCard({ title, value, change, trend, icon: Icon }: ShopStatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary/10">
                <Icon className="h-3 w-3 text-primary" />
              </div>
              {title}
            </div>
            <div className="text-3xl font-bold text-foreground">{value}</div>
          </div>
        </div>
        <div
          className={`mt-3 flex items-center gap-1 text-xs ${
            trend === "up" ? "text-success" : trend === "warning" ? "text-warning" : "text-muted-foreground"
          }`}
        >
          {trend === "up" && <TrendingUp className="h-3 w-3" />}
          {change}
        </div>
      </CardContent>
    </Card>
  )
}
