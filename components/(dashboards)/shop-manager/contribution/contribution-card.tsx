interface ContributionCardProps {
  tier: string
  amount: string
  dueDate: string
}

export function ContributionCard({ tier, amount, dueDate }: ContributionCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 md:p-8 border border-[#e4e7ec] space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f0f2f5] rounded-full">
        <div className="w-2 h-2 rounded-full bg-[#0f0f0f]" />
        <span className="text-sm font-medium text-[#0f0f0f]">{tier}</span>
      </div>

      <div className="text-center space-y-2">
        <div className="text-4xl md:text-5xl font-bold text-[#f10e7c]">{amount}</div>
        <div className="text-sm text-[#667185]">Contribution Amount</div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#e4e7ec]">
        <span className="text-sm text-[#667185]">This is your fixed monthly contribution amount</span>
        <div className="text-right">
          <div className="text-xs text-[#667185]">Due Date</div>
          <div className="text-sm font-semibold text-[#0f0f0f]">{dueDate}</div>
        </div>
      </div>
    </div>
  )
}
