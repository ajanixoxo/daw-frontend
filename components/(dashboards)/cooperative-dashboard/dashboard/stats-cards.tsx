"use client";

import { Card, CardContent } from "@/components/ui/card";
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
      iconBg: "#ffedf6",
      iconColor: "#f10e7c",
    },
    {
      title: "Revenue",
      value: loading
        ? "..."
        : `₦${stats?.totalRevenue.toLocaleString() || "0"}`,
      change: "10% More than Previous",
      icon: DollarSign,
      iconBg: "#ffedf6",
      iconColor: "#f10e7c",
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
    <div className="grid gap-4 sm:grid-cols-2">
      {statsData.map((stat) => (
        <Card key={stat.title} className="border-[#e4e7ec] bg-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-[#838794]">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold text-[#1d1d2a]">
                  {stat.value}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs text-[#009a49]">
                  <TrendingUp className="h-3 w-3" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: stat.iconBg }}
              >
                <stat.icon className="h-5 w-5" style={{ color: stat.iconColor }} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
