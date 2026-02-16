"use client";

import { useFetchMembers } from "@/hooks/useMember";
import { Users, ShoppingBag, Clock, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { getDawCooperativeId } from "@/app/actions/coop";

export function MembersStats() {
  const { members, fetchAllMembers, loading } = useFetchMembers();

  useEffect(() => {
    const loadMembers = async () => {
      const cooperativeId = await getDawCooperativeId();
      if (cooperativeId) {
        fetchAllMembers(cooperativeId);
      }
    };
    loadMembers();
  }, []);

  const totalMembers = members.length;

  const activeSellers = members.filter((m) =>
    typeof m.userId !== "string" && m.userId?.roles?.includes("seller")
  ).length;

  const pendingInvites = members.filter(
    (m) => typeof m.userId !== "string" && m.userId?.status === "invited"
  ).length;

  const stats = [
    {
      title: "Total Members",
      value: totalMembers,
      change: "Updated live",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Active Sellers",
      value: activeSellers,
      change: "Verified sellers",
      changeType: "positive",
      icon: ShoppingBag,
    },
    {
      title: "Pending Invites",
      value: pendingInvites,
      change: "Requires attention",
      changeType: "neutral",
      icon: Clock,
    },
  ];

  if (loading) return <p>Loading stats...</p>;

  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white border border-[#F0F2F5] flex flex-col justify-between h-[120px] w-full p-4 transition-colors hover:border-[#E6007A]/20">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#E6007A12" }}
            >
              <stat.icon className="h-3.5 w-3.5 text-[#E6007A]" />
            </div>
            <span className="text-[13px] font-medium text-[#667185] tracking-tight">
              {stat.title}
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <h3 className="text-[26px] font-bold text-[#101828] leading-none tracking-tight">
              {stat.value}
            </h3>
            <div className="flex items-center gap-1">
              {stat.changeType === "positive" && (
                <TrendingUp
                  className="h-[12px] w-[12px] text-[#12B76A] shrink-0"
                  strokeWidth={2.5}
                />
              )}
              <p className="text-[10px] font-medium">
                <span className={stat.changeType === "positive" ? "text-[#12B76A]" : "text-[#98A2B3]"}>
                  {stat.change}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
