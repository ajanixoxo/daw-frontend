"use client";

import {
  ShoppingBag,
  FileText,
  CheckCircle,
  CreditCard,
  TrendingUp,
  type LucideIcon,
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

interface StatItemProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle: string;
  subtitleHighlight?: string;
  trend?: "up" | "none";
  iconColor?: string;
}

function StatItem({
  icon: Icon,
  title,
  value,
  subtitle,
  subtitleHighlight,
  trend = "none",
  iconColor = "#E6007A",
}: StatItemProps) {
  return (
    <div className="bg-white border border-[#F0F2F5] flex flex-col justify-between h-[120px] w-full p-4 transition-colors hover:border-[#E6007A]/20">
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${iconColor}12` }}
        >
          <Icon className="h-3.5 w-3.5" style={{ color: iconColor }} />
        </div>
        <span className="text-[13px] font-medium text-[#667185] tracking-tight">
          {title}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="text-[26px] font-bold text-[#101828] leading-none tracking-tight">
          {value}
        </h3>

        <div className="flex items-center gap-1">
          {trend === "up" && (
            <TrendingUp
              className="h-[12px] w-[12px] text-[#12B76A] shrink-0"
              strokeWidth={2.5}
            />
          )}
          <p className="text-[10px] font-medium">
            {subtitleHighlight && (
              <span className="text-[#12B76A] mr-1">{subtitleHighlight}</span>
            )}
            <span className="text-[#98A2B3]">{subtitle}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function MemberStatsCards({ stats }: MemberStatsCardsProps) {
  const formatCurrency = (amount: number) =>
    `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;

  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatItem
        icon={ShoppingBag}
        title="Total Sales"
        value={formatCurrency(stats.totalSales || 0)}
        subtitleHighlight={`${stats.ordersCompleted || 0}`}
        subtitle="Total Orders"
        trend="up"
        iconColor="#E6007A"
      />
      <StatItem
        icon={FileText}
        title="Products Listed"
        value={String(stats.productsListed || 0)}
        subtitle="Listed Products"
        trend="up"
        iconColor="#E6007A"
      />
      <StatItem
        icon={CheckCircle}
        title="Orders Completed"
        value={String(stats.ordersCompleted || 0)}
        subtitle="Orders Fulfilled"
        iconColor="#E6007A"
      />
      <StatItem
        icon={CreditCard}
        title="Contributions Paid"
        value={formatCurrency(stats.totalContributions || 0)}
        subtitleHighlight={`${stats.contributionsCount || 0}`}
        subtitle="Payments Made"
        trend="up"
        iconColor="#E6007A"
      />
    </div>
  );
}
