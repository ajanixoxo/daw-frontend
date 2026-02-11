import { type LucideIcon, TrendingUp } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: LucideIcon
}

export function StatsCard({ title, value, change, trend, icon: Icon }: StatsCardProps) {
  return (
    <div className="bg-white border border-[#F0F2F5] flex flex-col justify-between h-[120px] w-full p-4 transition-colors hover:border-[#E6007A]/20">
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0"
          style={{ backgroundColor: "#E6007A12" }}
        >
          <Icon className="h-3.5 w-3.5 text-[#E6007A]" />
        </div>
        <span className="text-[13px] font-medium text-[#667185] tracking-tight">
          {title}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="text-[26px] font-bold text-[#101828] leading-none tracking-tight">
          {value}
        </h3>

        <div className="flex items-center gap-1">
          {trend === "up" && (
            <TrendingUp
              className="h-[12px] w-[12px] text-[#12B76A] shrink-0"
              strokeWidth={2.5}
            />
          )}
          <p className="text-[10px] font-medium">
            <span className={trend === "up" ? "text-[#12B76A]" : "text-[#98A2B3]"}>
              {change}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
