import { MembersHeader } from "@/components/(dashboards)/cooperative-dashboard/members/members-header"
import { MembersStats } from "@/components/(dashboards)/cooperative-dashboard/members/members-stats"
import { MembersTabs } from "@/components/(dashboards)/cooperative-dashboard/members/members-tabs"
import { MembersList } from "@/components/(dashboards)/cooperative-dashboard/members/members-list"

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
        <MembersHeader />
        <MembersStats />
        <MembersTabs />
        <MembersList />
      </div>
    </div>
  )
}
