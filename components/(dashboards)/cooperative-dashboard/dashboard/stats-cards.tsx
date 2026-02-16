"use client";

import { Users, DollarSign, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getCooperativeDashboardStats } from "@/app/actions/cooperative-dashboard";

interface DashboardStats {
  totalMembers: number;
  totalRevenue: number;
}

export function StatsCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const result = await getCooperativeDashboardStats();

        if (result.success && result.data) {
          setStats(result.data);
        } else {
          throw new Error(result.error || "Failed to fetch stats");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      title: "Total Members",
      value: loading ? "..." : stats?.totalMembers.toString() || "0",
      change: "10% More than Previous",
      icon: Users,
    },
    {
      title: "Revenue",
      value: loading
        ? "..."
        : `₦${stats?.totalRevenue.toLocaleString() || "0"}`,
      change: "10% More than Previous",
      icon: DollarSign,
    },
  ];

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <p>Error loading dashboard stats: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {statsData.map((stat) => (
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
              <TrendingUp
                className="h-[12px] w-[12px] text-[#12B76A] shrink-0"
                strokeWidth={2.5}
              />
              <p className="text-[10px] font-medium text-[#12B76A]">
                {stat.change}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
