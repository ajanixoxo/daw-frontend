import { ContributionsHeader } from "@/components/(dashboards)/cooperative-dashboard/contributions/contributions-header"
import { ContributionsStats } from "@/components/(dashboards)/cooperative-dashboard/contributions/contributions-stats"
import { ContributionsTabs } from "@/components/(dashboards)/cooperative-dashboard/contributions/contributions-tabs"
import { ContributionsList } from "@/components/(dashboards)/cooperative-dashboard/contributions/contributions-list"

export default function ContributionsPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        <ContributionsHeader />
        <ContributionsStats />
        <ContributionsTabs />
        <ContributionsList />
      </div>
    </div>
  )
}
