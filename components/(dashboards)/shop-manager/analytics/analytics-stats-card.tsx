import { Package2, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AnalyticsStatsCardProps {
  title: string
  value: string
  subtitle: string
  trend?: "up" | "down" | "neutral"
}

export default function AnalyticsStatsCard({ title, value, subtitle, trend = "neutral" }: AnalyticsStatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package2 className="h-4 w-4 text-[#f10e7c]" />
              {title}
            </div>
            <div className="mt-2 text-3xl font-bold">{value}</div>
            <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
              {trend === "up" && (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">{subtitle}</span>
                </>
              )}
              {trend === "neutral" && <span>{subtitle}</span>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
