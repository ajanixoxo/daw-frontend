import { type LucideIcon, ArrowUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change?: string
  changeLabel: string
  icon: LucideIcon
  trend?: "up" | "down"
}

export function StatCard({ title, value, change, changeLabel, icon: Icon, trend }: StatCardProps) {
  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold tracking-tight lg:text-3xl">{value}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {change && trend === "up" && (
                <span className="flex items-center gap-1 text-[#009a49]">
                  <ArrowUp className="h-3 w-3" />
                  {change}
                </span>
              )}
              <span className={cn(change && "ml-1")}>{changeLabel}</span>
            </div>
          </div>
          <div className="rounded-lg bg-[#ffedf6] p-2.5">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
