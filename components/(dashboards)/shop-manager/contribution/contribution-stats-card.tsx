import { Package } from "lucide-react"

interface ContributionStatsCardProps {
  label: string
  value: string
  subtitle: string
}

export function ContributionStatsCard({ label, value, subtitle }: ContributionStatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-[#e4e7ec]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#ffedf6] flex items-center justify-center">
          <Package className="w-4 h-4 text-[#f10e7c]" />
        </div>
        <span className="text-sm text-[#667185]">{label}</span>
      </div>
      <div className="text-2xl md:text-3xl font-bold text-[#0f0f0f] mb-1">{value}</div>
      <div className="text-sm text-[#667185]">{subtitle}</div>
    </div>
  )
}
