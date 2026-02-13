"use client";

import * as React from "react";
import { ArrowLeft, Loader2, CheckCircle2, Search, Building2, ShieldCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getBanks, processAdminPayout, accountLookup, getPayoutCharge } from "@/app/actions/wallet";
import { IBank } from "@/types/wallet.types";
import { toast } from "sonner";

const toTitleCase = (str: string) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export function AdminPayoutDrawer({
    children,
    onSuccess,
}: {
    children: React.ReactNode;
    onSuccess?: () => void;
}) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [banksLoading, setBanksLoading] = React.useState(false);
    const [lookupLoading, setLookupLoading] = React.useState(false);
    const [banks, setBanks] = React.useState<IBank[]>([]);
    const [bankSearch, setBankSearch] = React.useState("");
    const [charge, setCharge] = React.useState<any>(null);
    const [formData, setFormData] = React.useState({
        amount: "",
        accountNumber: "",
        bankCode: "",
        accountName: "",
        pin: "",
    });

    const [isVerified, setIsVerified] = React.useState(false);

    React.useEffect(() => {
        if (open) {
            fetchBanks();
        }
    }, [open]);

    const fetchBanks = async () => {
        setBanksLoading(true);
        try {
            const result = await getBanks();
            if (result.success && result.data) {
                const banksData = Array.isArray(result.data) ? result.data : [];
                const sortedBanks = [...banksData].sort((a, b) => a.bankName.localeCompare(b.bankName));
                setBanks(sortedBanks);
            } else {
                toast.error("Failed to fetch banks list");
            }
        } catch (error) {
            toast.error("Error fetching banks");
        } finally {
            setBanksLoading(false);
        }
    };

    const handleLookup = async () => {
        if (!formData.bankCode || formData.accountNumber.length !== 10) {
            toast.error("Please enter a 10-digit account number and select a bank");
            return;
        }

        setLookupLoading(true);
        try {
            const result = await accountLookup(formData.bankCode, formData.accountNumber);
            if (result.success && result.data) {
                setFormData(prev => ({ ...prev, accountName: result.data!.accountName }));
                setIsVerified(true);
                toast.success("Account verified!");
            } else {
                toast.error(result.error || "Account verification failed");
                setIsVerified(false);
            }
        } catch (error) {
            toast.error("Error verifying account");
        } finally {
            setLookupLoading(false);
        }
    };

    const fetchCharge = async (amount: number) => {
        if (amount <= 0) return;
        try {
            const result = await getPayoutCharge(amount);
            if (result.success) {
                setCharge(result.data);
            }
        } catch (error) {
            console.error("Failed to fetch charge:", error);
        }
    };

    const handlePayout = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.amount || !formData.accountNumber || !formData.bankCode || !formData.accountName || !formData.pin) {
            toast.error("Please fill in all required fields");
            return;
        }

        setLoading(true);
        try {
            const result = await processAdminPayout({
                amount: parseFloat(formData.amount),
                bankCode: formData.bankCode,
                accountNumber: formData.accountNumber,
                accountName: formData.accountName,
                pin: formData.pin,
            });

            if (result.success) {
                toast.success("Payout initiated successfully!");
                setOpen(false);
                onSuccess?.();
            } else {
                toast.error(result.error || "Payout failed");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const filteredBanks = banks.filter(bank =>
        bank.bankName.toLowerCase().includes(bankSearch.toLowerCase())
    );

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent
                side="right"
                className="w-full sm:max-w-md p-0 gap-0 border-l border-[#e7e8e9] bg-white"
            >
                <SheetHeader className="p-6 border-b border-[#e7e8e9] flex flex-row items-center gap-4 space-y-0 text-left bg-gray-50/50">
                    <SheetClose asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="-ml-2 h-9 w-9 text-[#667185] hover:bg-white hover:text-[#1d1d2a] border border-transparent hover:border-[#e7e8e9] transition-all"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </SheetClose>
                    <SheetTitle className="text-xl font-bold text-[#1d1d2a]">
                        Process Admin Payout
                    </SheetTitle>
                </SheetHeader>

                <form onSubmit={handlePayout}>
                    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="amount" className="text-sm font-semibold text-[#1d1d2a]">
                                    Payout Amount (NGN)
                                </Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667185] font-medium">₦</span>
                                    <Input
                                        id="amount"
                                        type="number"
                                        placeholder="0.00"
                                        value={formData.amount}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setFormData({ ...formData, amount: val });
                                            if (val) fetchCharge(parseFloat(val));
                                        }}
                                        required
                                        className="h-12 pl-8 border-[#e7e8e9] text-lg font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bank" className="text-sm font-semibold text-[#1d1d2a]">
                                    Destination Bank
                                </Label>
                                <Select
                                    value={formData.bankCode}
                                    onValueChange={(value) => {
                                        setFormData({ ...formData, bankCode: value });
                                        setIsVerified(false);
                                    }}
                                    required
                                >
                                    <SelectTrigger id="bank" className="h-12 border-[#e7e8e9]">
                                        <SelectValue placeholder={banksLoading ? "Loading banks..." : "Choose bank"} />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[300px]">
                                        <div className="p-2 border-b sticky top-0 bg-white z-10">
                                            <Input
                                                placeholder="Search bank..."
                                                value={bankSearch}
                                                onChange={(e) => setBankSearch(e.target.value)}
                                                onKeyDown={(e) => e.stopPropagation()}
                                                className="h-9 text-xs"
                                            />
                                        </div>
                                        {filteredBanks.map((bank) => (
                                            <SelectItem key={bank.bankCode} value={bank.bankCode}>
                                                {toTitleCase(bank.bankName)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="account" className="text-sm font-semibold text-[#1d1d2a]">
                                    Account Number
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="account"
                                        placeholder="10 digit account number"
                                        maxLength={10}
                                        value={formData.accountNumber}
                                        onChange={(e) => {
                                            setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, "") });
                                            setIsVerified(false);
                                        }}
                                        required
                                        className="h-12 flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-12 px-4"
                                        onClick={handleLookup}
                                        disabled={lookupLoading || formData.accountNumber.length !== 10 || !formData.bankCode}
                                    >
                                        {lookupLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="accountName" className="text-sm font-semibold text-[#1d1d2a]">
                                    Account Name
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="accountName"
                                        value={formData.accountName}
                                        readOnly
                                        placeholder="Verified account name"
                                        className={`h-12 ${isVerified ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}
                                    />
                                    {isVerified && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 h-5 w-5" />}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="pin" className="text-sm font-semibold text-[#1d1d2a]">
                                    Wallet PIN
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667185]" />
                                    <Input
                                        id="pin"
                                        type="password"
                                        maxLength={4}
                                        placeholder="Enter 4-digit PIN"
                                        value={formData.pin}
                                        onChange={(e) => setFormData({ ...formData, pin: e.target.value.replace(/\D/g, "") })}
                                        required
                                        className="h-12 pl-10 border-[#e7e8e9]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[#e7e8e9] space-y-4">
                            <div className="bg-[#DB005F]/5 p-4 rounded-xl border border-[#DB005F]/10 space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-[#667185]">Transaction Fee</span>
                                    <span className="text-[#1d1d2a] font-semibold">₦{charge?.totalFee || "0.00"}</span>
                                </div>
                                <div className="flex justify-between text-sm pt-2 border-t border-[#DB005F]/10">
                                    <span className="text-[#1d1d2a] font-medium">Total Deduction</span>
                                    <span className="text-[#DB005F] font-bold">₦{(parseFloat(formData.amount || "0") + (charge?.totalFee || 0)).toLocaleString()}</span>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading || !isVerified}
                                className="w-full h-14 font-bold text-white bg-[#DB005F] hover:bg-[#b0004d] rounded-xl"
                            >
                                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Initiate Payout"}
                            </Button>
                        </div>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}
