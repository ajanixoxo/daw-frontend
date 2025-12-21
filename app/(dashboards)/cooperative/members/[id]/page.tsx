import { MemberStats } from "@/components/(dashboards)/cooperative-dashboard/members/member/Member-stat";
import { MemberTabs } from "@/components/(dashboards)/cooperative-dashboard/members/member/member-tab";
import { ContributionList } from "@/components/(dashboards)/cooperative-dashboard/members/member/contri-list";
import { MemberHeader } from "@/components/(dashboards)/cooperative-dashboard/members/member/member-header";
import { MemberProfile } from "@/components/(dashboards)/cooperative-dashboard/members/member/profile";

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
        <MemberHeader />
        <MemberProfile
          name="Amina's Fashion Boutique"
          description="Quality African fashion and accessories"
          rating={4.6}
          location="Lagos, Nigeria"
          memberSince="Jan 2020"
          email="amina@gmail.com"
          phone="+234 903235555"
          status="Active Seller"
        />

        <MemberStats />
        <MemberTabs />
        <ContributionList />
      </div>
    </div>
  );
}
