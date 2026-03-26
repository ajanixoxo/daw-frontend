"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Loader2, RefreshCw } from "lucide-react";
import { WalletStats } from "@/components/(dashboards)/sellers-dashboard/wallet/wallet-stats";
import { RecentTransactionsTable } from "@/components/(dashboards)/sellers-dashboard/wallet/recent-transactions-table";
import { WithdrawFundsDrawer } from "@/components/(dashboards)/sellers-dashboard/wallet/withdraw-funds-drawer";
import { WalletSetup } from "@/components/(dashboards)/sellers-dashboard/wallet/wallet-setup";
import { getWalletAccount, getLedger } from "@/app/actions/wallet";
import { IWalletBankAccount, ILedgerEntry, IWalletStats } from "@/types/wallet.types";

import { toast } from "sonner";

export default function WalletPage() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<IWalletBankAccount | null>(null);
  const [ledger, setLedger] = useState<ILedgerEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchData = async (showToast = false) => {
    if (showToast) setRefreshing(true);
    try {
      const [accResult, ledgerResult] = await Promise.all([
        getWalletAccount(),
        getLedger(),
      ]);

      if (accResult.success && accResult.data && accResult.data.accountNo) {
        setAccount(accResult.data);
        setShowSetup(false);
        setFetchError(null);
      } else if (accResult.success) {
        // API call succeeded but no wallet account exists yet
        setAccount(null);
        setShowSetup(true);
        setFetchError(null);
      } else {
        // API call failed — show retry state, not the setup form
        setAccount(null);
        setShowSetup(false);
        setFetchError(accResult.error || "Failed to fetch wallet info");
        if (!showToast) toast.error(accResult.error || "Failed to fetch wallet info");
      }

      if (ledgerResult.success && ledgerResult.data) {
        setLedger(ledgerResult.data);
      }

      if (showToast && !accResult.success) toast.error("Failed to refresh data");
      else if (showToast) toast.success("Data refreshed");
    } catch (error) {
      console.error("Error fetching wallet data:", error);
      setFetchError("An unexpected error occurred");
      if (showToast) toast.error("Failed to refresh data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#DB005F]" />
      </div>
    );
  }

  // If fetch failed with an actual error (not a missing account)
  if (fetchError && !showSetup) {
    return (
      <div className="p-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col items-center justify-center h-[40vh] gap-4 text-center">
          <p className="text-sm text-[#667185]">{fetchError}</p>
          <Button
            onClick={() => { setFetchError(null); setLoading(true); fetchData(); }}
            className="bg-[#1d1d2a] hover:bg-[#1d1d2a]/90 text-white rounded-lg px-6"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // If manual setup requested or no account exists
  if (showSetup || !account || !account.accountNo) {
    return (
      <div className="p-6 max-w-[1600px] mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1d1d2a]">Wallet Setup</h1>
            <p className="text-sm text-[#667185] mt-1">
              Create your virtual account to start receiving payments
            </p>
          </div>
          {account?.accountNo && (
            <Button variant="outline" onClick={() => setShowSetup(false)}>
              Back to Dashboard
            </Button>
          )}
        </div>
        <WalletSetup onComplete={() => fetchData()} />
      </div>
    );
  }

  const walletStatsData: IWalletStats = {
    totalBalance: account.walletBalance || account.accountBalance || 0,
    availableBalance: account.accountBalance || 0,
    pendingBalance: account.pendingAmount || 0,
    accountNo: account.accountNo,
    bankName: account.bankName,
  };


  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1d1d2a]">Wallet Dashboard</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-[#667185]">
              Manage your earnings and withdrawals
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-[#667185]"
              onClick={() => fetchData(true)}
              disabled={refreshing}
            >
              <RefreshCw className={`h-3 w-3 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {!account?.accountNo && (
            <Button
              variant="outline"
              className="gap-2 border-[#e7e8e9] text-[#1d1d2a]"
              onClick={() => setShowSetup(true)}
            >
              Create Wallet Account
            </Button>
          )}
          <WithdrawFundsDrawer onSuccess={() => fetchData()}>
            <Button className="gap-2 bg-[#1d1d2a] hover:bg-[#1d1d2a]/90 text-white rounded-lg px-6 h-10 w-full sm:w-auto">
              <ArrowUpRight className="h-4 w-4" />
              Withdraw Funds
            </Button>
          </WithdrawFundsDrawer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center gap-2 p-3 bg-[#DB005F]/5 rounded-lg border border-[#DB005F]/10">
          <p className="text-sm font-medium text-[#DB005F]">
            Settlement Info: {account.bankName} • {account.accountNo} • {account.accountName}
          </p>
        </div>
        <WalletStats data={walletStatsData} isLoading={refreshing} />
      </div>

      <div className="mt-8">
        <RecentTransactionsTable transactions={ledger} />
      </div>
    </div>
  );
}
