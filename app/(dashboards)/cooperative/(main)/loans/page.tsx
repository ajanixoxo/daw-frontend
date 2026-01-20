import { LoansHeader } from "@/components/(dashboards)/cooperative-dashboard/loans/loans-header"
import { LoansStats } from "@/components/(dashboards)/cooperative-dashboard/loans/loans-stats"
import { LoansTabs } from "@/components/(dashboards)/cooperative-dashboard/loans/loans-tabs"

export default function LoansPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        <LoansHeader />
        <LoansStats />
        <LoansTabs />
      </div>
    </div>
  )
}
