import { getMemberDetails } from "@/app/actions/cooperative-dashboard";
import { MemberHeader } from "@/components/(dashboards)/cooperative-dashboard/members/member/member-header";
import { MemberStatsCards } from "@/components/(dashboards)/cooperative-dashboard/members/member/members-stats-cards";
import { MemberTabs } from "@/components/(dashboards)/cooperative-dashboard/members/member/member-tab";
import { MemberProfile } from "@/components/(dashboards)/cooperative-dashboard/members/member/profile";

export default async function MemberDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  if (!id || id === 'undefined' || id === 'null') {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-[#838794]">
          Invalid Member ID. Please return to the members list.
        </p>
      </div>
    );
  }

  const result = await getMemberDetails(id);

  if (!result.success || !result.data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-[#838794]">
          Member not found or failed to load details.
        </p>
      </div>
    );
  }

  const { member, shop, stats } = result.data;

  // Format dates
  const joinDate = new Date(member.joinDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container mx-auto max-w-6xl  px-4 py-8">
      <MemberHeader />

      <MemberProfile
        name={`${member.userId.firstName} ${member.userId.lastName}`}
        description={
          shop?.description || "No shop description available"
        }
        rating={0} // Rating not yet in backend response?
        location="Lagos, NG" // Placeholder or need to fetch from profile
        memberSince={joinDate}
        email={member.userId.email}
        phone={member.userId.phone}
        status={member.status}
      />

      <MemberStatsCards stats={stats} />

      <MemberTabs memberId={member._id} />
    </div>
  );
}

