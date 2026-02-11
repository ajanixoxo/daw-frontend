"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { WalletStats } from "@/components/(dashboards)/sellers-dashboard/wallet/wallet-stats";
import { RecentTransactionsTable } from "@/components/(dashboards)/sellers-dashboard/wallet/recent-transactions-table";
import { WithdrawFundsDrawer } from "@/components/(dashboards)/sellers-dashboard/wallet/withdraw-funds-drawer";

export default function WalletPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1d1d2a]">Wallet</h1>
          <p className="text-sm text-[#667185] mt-1">
            Manage your earnings and withdrawals
          </p>
        </div>
        <WithdrawFundsDrawer>
          <Button className="gap-2 bg-[#1d1d2a] hover:bg-[#1d1d2a]/90 text-white rounded-lg px-6 h-10 w-full sm:w-auto">
            <ArrowUpRight className="h-4 w-4" />
            Withdraw Funds
          </Button>
        </WithdrawFundsDrawer>
      </div>

      <WalletStats />

      <div className="mt-8">
        <RecentTransactionsTable />
      </div>
    </div>
  );
}
