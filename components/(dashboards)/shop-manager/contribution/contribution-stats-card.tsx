import { Package } from "lucide-react"

interface ContributionStatsCardProps {
  label: string
  value: string
  subtitle: string
}

export function ContributionStatsCard({ label, value, subtitle }: ContributionStatsCardProps) {
  return (
    <div className="bg-white border border-[#F0F2F5] flex flex-col justify-between h-[120px] w-full p-4 transition-colors hover:border-[#E6007A]/20">
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0"
          style={{ backgroundColor: "#E6007A12" }}
        >
          <Package className="h-3.5 w-3.5 text-[#E6007A]" />
        </div>
        <span className="text-[13px] font-medium text-[#667185] tracking-tight">{label}</span>
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="text-[26px] font-bold text-[#101828] leading-none tracking-tight">{value}</h3>
        <p className="text-[10px] font-medium text-[#98A2B3]">{subtitle}</p>
      </div>
    </div>
  )
}
