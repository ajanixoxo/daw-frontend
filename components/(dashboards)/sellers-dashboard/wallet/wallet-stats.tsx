"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock, Info } from "lucide-react";
import { IWalletStats } from "@/types/wallet.types";
import { Skeleton } from "@/components/ui/skeleton";

interface WalletStatsProps {
  data: IWalletStats;
  isLoading?: boolean;
}

export function WalletStats({ data, isLoading }: WalletStatsProps) {
  const stats = data;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[160px] w-full rounded-2xl bg-gray-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Balance Card */}
      <Card className="border-0 bg-linear-to-br from-[#1d1d2a] to-[#2d2d3d] text-white overflow-hidden relative shadow-2xl transition-transform hover:scale-[1.01]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#DB005F]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
        <CardContent className="p-7 flex flex-col justify-between h-full min-h-[165px] relative z-10">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                  <Wallet className="h-5 w-5 text-[#DB005F]" />
                </div>
                <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">
                  Total Balance
                </span>
              </div>
              <Info className="h-4 w-4 text-white/40 cursor-help" />
            </div>
            <div className="mt-2">
              <h3 className="text-3xl font-extrabold tracking-tight">
                {formatCurrency(stats.totalBalance)}
              </h3>
              {stats.accountNo && (
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="px-2 py-0.5 bg-white/10 rounded-md text-[10px] font-bold text-white/80 uppercase tracking-tighter border border-white/10">
                    {stats.bankName}
                  </span>
                  <span className="text-xs text-white/60 font-medium">#{stats.accountNo}</span>
                </div>
              )}
            </div>
          </div>
          <p className="text-[10px] font-bold text-white/40 mt-4 uppercase tracking-[0.2em]">Live Wallet Balance</p>
        </CardContent>
      </Card>

      {/* Available Balance Card */}
      <Card className="border-[#e7e8e9] shadow-md bg-white overflow-hidden relative group hover:border-[#DB005F]/30 transition-all rounded-2xl">
        <CardContent className="p-7 flex flex-col justify-between h-full min-h-[165px]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center border border-green-100 group-hover:bg-green-100 transition-colors">
                <ArrowDownLeft className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-[#667185] uppercase tracking-wider">
                Available
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-3xl font-extrabold text-[#1d1d2a] tracking-tight">
                {formatCurrency(stats.availableBalance)}
              </h3>
              <p className="text-xs text-green-600 font-bold mt-2.5 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> Ready for withdrawal
              </p>
            </div>
          </div>
          <p className="text-[10px] font-bold text-[#667185]/40 mt-4 uppercase tracking-[0.2em]">Withdrawable Funds</p>
        </CardContent>
      </Card>

      {/* Pending Balance Card */}
      <Card className="border-[#e7e8e9] shadow-md bg-white overflow-hidden relative group hover:border-[#DB005F]/30 transition-all rounded-2xl">
        <CardContent className="p-7 flex flex-col justify-between h-full min-h-[165px]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 group-hover:bg-orange-100 transition-colors">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <span className="text-sm font-semibold text-[#667185] uppercase tracking-wider">
                Pending
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-3xl font-extrabold text-[#1d1d2a] tracking-tight">
                {formatCurrency(stats.pendingBalance)}
              </h3>
              <p className="text-xs text-orange-600 font-bold mt-2.5 flex items-center gap-1">
                <Skeleton className="h-1 w-8 rounded-full bg-orange-200" /> Processing Orders
              </p>
            </div>
          </div>
          <p className="text-[10px] font-bold text-[#667185]/40 mt-4 uppercase tracking-[0.2em]">PENDING ORDER AMOUNT</p>
        </CardContent>
      </Card>
    </div>
  );
}

function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
