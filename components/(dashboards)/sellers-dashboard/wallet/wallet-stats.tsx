import { Wallet, Clock, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/(dashboards)/sellers-dashboard/stat-card";

interface WalletStatsProps {
  data?: {
    totalBalance: number;
    availableBalance: number;
    pendingBalance: number;
  };
}

export function WalletStats({ data }: WalletStatsProps) {
  // Default demo data if none provided
  const stats = data || {
    totalBalance: 2450000,
    availableBalance: 2300000,
    pendingBalance: 150000,
  };

  const formatCurrency = (amount: number) =>
    `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        icon={Wallet}
        title="Total Balance"
        value={formatCurrency(stats.totalBalance)}
        subtitle="Wallet Balance"
        highlighted
      />
      <StatCard
        icon={CheckCircle2}
        title="Available Balance"
        value={formatCurrency(stats.availableBalance)}
        subtitle="Ready for Withdrawal"
        iconColor="#E6007A"
      />
      <StatCard
        icon={Clock}
        title="Pending Balance"
        value={formatCurrency(stats.pendingBalance)}
        subtitle="Processing Orders"
        iconColor="#E6007A"
      />
    </div>
  );
}
