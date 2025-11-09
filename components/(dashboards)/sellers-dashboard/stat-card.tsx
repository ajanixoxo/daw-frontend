import { type LucideIcon, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  icon: LucideIcon
  title: string
  value: string
  subtitle: string
  trend?: "up" | "neutral"
  iconColor?: string
}

export function StatCard({ icon: Icon, title, value, subtitle, trend, iconColor = "#f10e7c" }: StatCardProps) {
  return (
    <Card className="border-[#e7e8e9]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${iconColor}15` }}
            >
              <Icon className="h-5 w-5" style={{ color: iconColor }} />
            </div>
            <span className="text-sm text-[#667185]">{title}</span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-[#1d1d2a]">{value}</p>
          <div className="flex items-center gap-1">
            {trend === "up" && (
              <>
                <TrendingUp className="h-3 w-3 text-[#34c759]" />
                <span className="text-xs text-[#34c759]">{subtitle}</span>
              </>
            )}
            {trend === "neutral" && <span className="text-xs text-[#667185]">{subtitle}</span>}
            {!trend && <span className="text-xs text-[#667185]">{subtitle}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
