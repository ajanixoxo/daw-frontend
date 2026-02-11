import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Clock, CheckCircle2 } from "lucide-react";

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Balance Card */}
      <Card className="border-0 bg-linear-to-r from-[#DB005F] to-[#791F56] text-white overflow-hidden relative shadow-md">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
        <CardContent className="p-6 flex flex-col justify-between h-full min-h-[160px] relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Wallet className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-white/90">
                Total Balance
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-3xl font-bold tracking-tight">
                {formatCurrency(stats.totalBalance)}
              </h3>
            </div>
          </div>
          <p className="text-xs text-white/80 mt-4">Wallet Balance</p>
        </CardContent>
      </Card>

      {/* Available Balance Card */}
      <Card className="border-[#e7e8e9] shadow-sm bg-white">
        <CardContent className="p-6 flex flex-col justify-between h-full min-h-[160px]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#DB005F]/10 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-[#DB005F]" />
              </div>
              <span className="text-sm font-medium text-[#667185]">
                Available Balance
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-3xl font-bold text-[#1d1d2a] tracking-tight">
                {formatCurrency(stats.availableBalance)}
              </h3>
            </div>
          </div>
          <p className="text-xs text-[#667185] mt-4">Ready for Withdrawal</p>
        </CardContent>
      </Card>

      {/* Pending Balance Card */}
      <Card className="border-[#e7e8e9] shadow-sm bg-white">
        <CardContent className="p-6 flex flex-col justify-between h-full min-h-[160px]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#DB005F]/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-[#DB005F]" />
              </div>
              <span className="text-sm font-medium text-[#667185]">
                Pending Balance
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-3xl font-bold text-[#1d1d2a] tracking-tight">
                {formatCurrency(stats.pendingBalance)}
              </h3>
            </div>
          </div>
          <p className="text-xs text-[#667185] mt-4">Processing Orders</p>
        </CardContent>
      </Card>
    </div>
  );
}
