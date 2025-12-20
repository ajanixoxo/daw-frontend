import { Search, SlidersHorizontal } from "lucide-react"
import { ContributionStatsCard } from "@/components/(dashboards)/shop-manager/contribution/contribution-stats-card"
import { ContributionCard } from "@/components/(dashboards)/shop-manager/contribution/contribution-card"
import { PaymentMethodCard } from "@/components/(dashboards)/shop-manager/contribution/payment-method-card"
import { PaymentHistoryTable } from "@/components/(dashboards)/shop-manager/contribution/payment-history-table"

export default function ContributionPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0f0f0f]">Contribution</h1>
          <p className="text-[#667185] mt-1">Make contributions and view your payment history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ContributionStatsCard label="Current Tier" value="Silver" subtitle="Contribution: UGX 25,000" />
          <ContributionStatsCard label="Total Contributions" value="$145,000" subtitle="From 4 payments" />
          <ContributionStatsCard label="Last Payment" value="15/10/2025" subtitle="$50,000" />
        </div>

        {/* Make a Contribution Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-[#0f0f0f]">Make a Contribution</h2>
            <p className="text-[#667185] text-sm">
              Your contribution amount is fixed based on your Silver tier membership
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ContributionCard tier="Silver Tier" amount="$25,000" dueDate="July 15, 2024" />
            <PaymentMethodCard />
          </div>
        </div>

        {/* Payment History */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold text-[#0f0f0f]">Payment History</h2>

            <div className="flex gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667185]" />
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full pl-10 pr-4 py-2 border border-[#e4e7ec] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f10e7c] focus:border-transparent"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-[#e4e7ec] rounded-lg hover:bg-[#f7f7f7] transition-colors">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>

          <PaymentHistoryTable />
        </div>
      </div>
    </div>
  )
}
