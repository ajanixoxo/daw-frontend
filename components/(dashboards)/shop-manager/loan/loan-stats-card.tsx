import type { LucideIcon } from "lucide-react"

interface LoanStatsCardProps {
  icon: LucideIcon
  label: string
  value: string
  description: string
}

export default function LoanStatsCard({ icon: Icon, label, value, description }: LoanStatsCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-gray-600">
        <Icon className="h-5 w-5 text-[#f10e7c]" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  )
}
