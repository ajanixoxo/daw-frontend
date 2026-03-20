"use client";

import { useEffect, useState } from "react";
import { Loader2, Wallet, ArrowUpRight, ShieldCheck, RefreshCw, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminWallet, getLedger } from "@/app/actions/wallet";
import { IAdminWalletResponse, ILedgerEntry } from "@/types/wallet.types";
import { RecentTransactionsTable } from "@/components/(dashboards)/sellers-dashboard/wallet/recent-transactions-table";
import { AdminPayoutDrawer } from "@/components/(dashboards)/admin-dashboard/wallet/admin-payout-drawer";
import { UpdateWalletPinModal } from "@/components/(dashboards)/admin-dashboard/wallet/update-wallet-pin-modal";
import { toast } from "sonner";
import { useAuthStore } from "@/zustand/store";

export default function AdminWalletPage() {
    const { user } = useAuthStore();
    const isSupportAdmin = user?.roles?.includes("support-admin") || false;
    
    const [loading, setLoading] = useState(true);
    const [wallet, setWallet] = useState<IAdminWalletResponse | null>(null);
    const [ledger, setLedger] = useState<ILedgerEntry[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async (showToast = false) => {
        if (showToast) setRefreshing(true);
        try {
            const [walletResult, ledgerResult] = await Promise.all([
                getAdminWallet(),
                getLedger(),
            ]);

            if (walletResult.success && walletResult.data) {
                setWallet(walletResult.data);
            } else {
                toast.error(walletResult.error || "Failed to fetch wallet");
                console.log(walletResult)
            }

            if (ledgerResult.success && ledgerResult.data) {
                setLedger(ledgerResult.data);
            }

            if (showToast) toast.success("Data refreshed");
        } catch (error) {
            console.error("Error fetching admin wallet data:", error);
            if (showToast) toast.error("An unexpected error occurred");
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

    return (
        <div className="p-6 max-w-[1600px] mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1d1d2a]">Business Wallet</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-[#667185]">
                            Manage business funds and global payouts
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 bg-[#1d1d2a] text-white border-none shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Wallet size={120} />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-gray-400 font-medium text-sm lg:text-base flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-[#DB005F]" />
                            Business Balance
                        </CardTitle>
                        <CardDescription className="text-3xl lg:text-4xl font-bold text-white mt-2">
                            ₦{wallet?.currentBalance.toLocaleString() || "0.00"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="space-y-1">
                                <p className="text-xs text-gray-400">Wallet ID</p>
                                <p className="text-sm font-mono truncate">{wallet?.walletID || "N/A"}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-400">Status</p>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <p className="text-sm font-medium">Active</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-[#e7e8e9] shadow-sm flex flex-col justify-center p-6 bg-white">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-[#1d1d2a]">Quick Actions</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {!isSupportAdmin ? (
                                <>
                                    <AdminPayoutDrawer onSuccess={() => fetchData()}>
                                        <Button className="w-full justify-start gap-2 bg-[#DB005F] hover:bg-[#b0004d] text-white">
                                            <ArrowUpRight className="h-4 w-4" />
                                            Process Payout
                                        </Button>
                                    </AdminPayoutDrawer>
                                    <UpdateWalletPinModal>
                                        <Button variant="outline" className="w-full justify-start gap-2 border-[#e7e8e9]">
                                            <CreditCard className="h-4 w-4" />
                                            Update Wallet PIN
                                        </Button>
                                    </UpdateWalletPinModal>
                                </>
                            ) : (
                                <p className="text-sm text-[#667185] italic">
                                    Management actions are restricted for support accounts.
                                </p>
                            )}
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[#1d1d2a]">Recent Wallet Activity</h2>
                </div>
                <RecentTransactionsTable transactions={ledger} />
            </div>
        </div>
    );
}
