"use client";

import { Users, ShoppingBag, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function MemberStats({
  stats,
}: {
  stats: {
    totalContributions: number;
    contributionsCount: number;
    totalLoans: number;
    activeLoans: number;
  };
}) {
  const statItems = [
    {
      title: "Total Contributions",
      value: `₦${stats.totalContributions.toLocaleString()}`,
      change: `${stats.contributionsCount} transactions`,
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Active Loans",
      value: stats.activeLoans,
      change: `${stats.totalLoans} total loans`,
      changeType: "neutral",
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {statItems.map((stat) => (
        <Card key={stat.title} className="border-[#e4e7ec] bg-white p-0">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-[#838794]">{stat.title}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1d1d2a]">
                    {stat.value}
                  </span>
                </div>
                <div
                  className={`mt-2 flex items-center gap-1 text-xs ${
                    stat.changeType === "positive"
                      ? "text-[#009a49]"
                      : "text-[#838794]"
                  }`}
                >
                  {stat.changeType === "positive" && (
                    <TrendingUp className="h-3 w-3" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="rounded-full bg-[#f9fafb] p-2">
                 <stat.icon className="h-4 w-4 text-[#667185]" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
