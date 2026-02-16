"use client";

import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingBag, 
  FileText, 
  CheckCircle, 
  CreditCard,
  TrendingUp 
} from "lucide-react";

interface MemberStatsCardsProps {
  stats: {
    totalContributions: number;
    contributionsCount: number;
    totalLoans: number;
    activeLoans: number;
    totalSales: number;
    productsListed: number;
    ordersCompleted: number;
  };
}

export function MemberStatsCards({ stats }: MemberStatsCardsProps) {
  const statItems = [
    {
      title: "Total Sales",
      value: `₦${(stats.totalSales || 0).toLocaleString()}`,
      change: "10% More than last month",
      changeType: "positive",
      icon: ShoppingBag,
      iconBg: "#ffedf6",
      iconColor: "#f10e7c",
    },
    {
      title: "Products Listed",
      value: stats.productsListed || 0,
      change: "10% More than last month",
      changeType: "positive",
      icon: FileText,
      iconBg: "#ffedf6",
      iconColor: "#f10e7c",
    },
    {
      title: "Orders Completed",
      value: stats.ordersCompleted || 0,
      change: "10% More than last month",
      changeType: "positive",
      icon: CheckCircle,
      iconBg: "#ffedf6",
      iconColor: "#f10e7c",
    },
    {
      title: "Contributions Paid",
      value: `₦${(stats.totalContributions || 0).toLocaleString()}`,
      change: "10% More than last month",
      changeType: "positive",
      icon: CreditCard,
      iconBg: "#ffedf6",
      iconColor: "#f10e7c",
    },
  ];

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((stat) => (
        <Card key={stat.title} className="border-[#e4e7ec] bg-white p-0">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              {/* Header: Icon + Title */}
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: stat.iconBg }}
                >
                  <stat.icon
                    className="h-4 w-4"
                    style={{ color: stat.iconColor }}
                  />
                </div>
                <span className="text-sm text-[#838794]">{stat.title}</span>
              </div>

              {/* Value */}
              <div>
                <h3 className="text-2xl font-bold text-[#1d1d2a]">
                  {stat.value}
                </h3>
              </div>

              {/* Trend */}
              <div className="flex items-center gap-1 text-xs text-[#009a49]">
                <TrendingUp className="h-3 w-3" />
                <span>{stat.change}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
