import type { LucideIcon } from "lucide-react"
import { ArrowUp } from "lucide-react"

interface ShopStatsCardProps {
  icon: LucideIcon
  label: string
  value: string
  trend?: string
  trendLabel?: string
  subtitle?: string
  showTrend?: boolean
}

export function ShopStatsCard({
  icon: Icon,
  label,
  value,
  trend,
  trendLabel,
  subtitle,
  showTrend = true,
}: ShopStatsCardProps) {
  return (
    <div className="rounded-xl border border-[#e4e7ec] bg-white p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-lg bg-[#fccfe5] p-2">
          <Icon className="h-5 w-5 text-[#f10e7c]" />
        </div>
        <span className="text-sm text-[#667185]">{label}</span>
      </div>
      <div className="mb-2 text-3xl font-bold text-[#1c1c1c]">{value}</div>
      {showTrend && trend && trendLabel && (
        <div className="flex items-center gap-1 text-sm text-[#009a49]">
          <ArrowUp className="h-4 w-4" />
          <span className="font-medium">{trend}</span>
          <span className="text-[#667185]">{trendLabel}</span>
        </div>
      )}
      {subtitle && <div className="text-sm text-[#667185]">{subtitle}</div>}
    </div>
  )
}
