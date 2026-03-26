"use client";

import * as React from "react";
import { ArrowLeft, Loader2, CheckCircle2, Search, Building2, Info } from "lucide-react";
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
import { getBanks, withdrawFunds, accountLookup } from "@/app/actions/wallet";
import { IBank } from "@/types/wallet.types";
import { toast } from "sonner";

// Utility to convert ALL CAPS to Title Case
const toTitleCase = (str: string) => {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export function WithdrawFundsDrawer({
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
  const [formData, setFormData] = React.useState({
    amount: "",
    accountNumber: "",
    bankCode: "",
    accountName: "",
    narration: "Cooperative Withdrawal",
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
      toast.error("Please enter a 10-digit account number and select a bank first");
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

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.accountNumber || !formData.bankCode || !formData.accountName) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const result = await withdrawFunds({
        recipient_account_number: formData.accountNumber,
        recipient_account_name: formData.accountName,
        recipient_bank_code: formData.bankCode,
        amount: parseFloat(formData.amount),
        narration: formData.narration,
      });

      if (result.success) {
        toast.success("Withdrawal request submitted successfully!");
        setOpen(false);
        onSuccess?.();
      } else {
        toast.error(result.error || "Withdrawal failed");
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
            Withdraw Funds
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleWithdraw}>
          <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
            <div className="space-y-6">
              <div className="space-y-2.5">
                <Label
                  htmlFor="amount"
                  className="text-sm font-semibold text-[#1d1d2a]"
                >
                  Withdrawal Amount (NGN)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667185] font-medium">₦</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                    className="h-12 pl-8 border-[#e7e8e9] bg-white placeholder:text-[#98a2b3] focus-visible:ring-[#DB005F] focus-visible:ring-offset-0 text-lg font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <Label
                  htmlFor="bank"
                  className="text-sm font-semibold text-[#1d1d2a]"
                >
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
                  <SelectTrigger
                    id="bank"
                    className="h-12 border-[#e7e8e9] bg-white text-[#1d1d2a] focus:ring-[#DB005F] focus:ring-offset-0"
                  >
                    <SelectValue placeholder={banksLoading ? "Loading banks..." : "Choose your bank"} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[350px] p-0 shadow-xl border-[#e7e8e9]">
                    <div className="p-2 border-b border-[#e7e8e9] sticky top-0 bg-white z-10">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#98a2b3]" />
                        <Input
                          placeholder="Search bank..."
                          value={bankSearch}
                          onChange={(e) => setBankSearch(e.target.value)}
                          onKeyDown={(e) => e.stopPropagation()} // Prevent select from closing
                          className="h-9 pl-8 text-xs border-[#e7e8e9] focus-visible:ring-[#DB005F]"
                        />
                      </div>
                    </div>
                    <div className="p-1">
                      {filteredBanks.length > 0 ? (
                        filteredBanks.map((bank) => (
                          <SelectItem
                            key={bank.bankCode}
                            value={bank.bankCode}
                            className="py-3 px-3 cursor-pointer focus:bg-[#DB005F]/5 focus:text-[#DB005F] rounded-md transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 opacity-50" />
                              <span>{toTitleCase(bank.bankName)}</span>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <div className="py-8 text-center text-[#667185] text-xs">
                          {banksLoading ? (
                            <div className="flex items-center justify-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Fetching Banks...</span>
                            </div>
                          ) : "No banks matching your search"}
                        </div>
                      )}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2.5">
                <Label
                  htmlFor="account"
                  className="text-sm font-semibold text-[#1d1d2a]"
                >
                  Account Number
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="account"
                    placeholder="10 digit account number"
                    maxLength={10}
                    value={formData.accountNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setFormData({ ...formData, accountNumber: val });
                      setIsVerified(false);
                    }}
                    required
                    className="h-12 border-[#e7e8e9] bg-white placeholder:text-[#98a2b3] focus-visible:ring-[#DB005F] focus-visible:ring-offset-0 flex-1 tracking-wider font-medium"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 px-4 border-[#e7e8e9] hover:bg-[#DB005F]/5 hover:text-[#DB005F] transition-colors"
                    onClick={handleLookup}
                    disabled={lookupLoading || formData.accountNumber.length !== 10 || !formData.bankCode}
                  >
                    {lookupLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2.5">
                <Label
                  htmlFor="accountName"
                  className="text-sm font-semibold text-[#1d1d2a]"
                >
                  Account Name
                </Label>
                <div className="relative">
                  <Input
                    id="accountName"
                    placeholder="Enter recipient name"
                    value={formData.accountName}
                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                    required
                    className={`h-12 border-[#e7e8e9] bg-white placeholder:text-[#98a2b3] focus-visible:ring-[#DB005F] pr-10 transition-all ${isVerified ? 'border-green-200 bg-green-50/30' : ''}`}
                  />
                  {isVerified && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {isVerified && (
                  <p className="text-xs text-green-600 font-medium">Account verified successfully</p>
                )}
              </div>

              <div className="space-y-2.5">
                <Label
                  htmlFor="narration"
                  className="text-sm font-semibold text-[#1d1d2a]"
                >
                  Narration
                </Label>
                <Input
                  id="narration"
                  placeholder="Withdrawal from wallet"
                  value={formData.narration}
                  onChange={(e) => setFormData({ ...formData, narration: e.target.value })}
                  className="h-12 border-[#e7e8e9] bg-white placeholder:text-[#98a2b3] focus-visible:ring-[#DB005F] focus-visible:ring-offset-0"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#e7e8e9] space-y-4">
              <div className="bg-[#DB005F]/5 p-4 rounded-xl border border-[#DB005F]/10 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#667185]">Transaction Fee</span>
                  <span className="text-[#1d1d2a] font-semibold">₦0.00</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[#DB005F]/10">
                  <span className="text-[#1d1d2a] font-medium">Total Deduction</span>
                  <span className="text-[#DB005F] font-bold">₦{formData.amount || "0.00"}</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || banksLoading}
                className="w-full h-14 text-base font-bold text-white bg-[#DB005F] hover:bg-[#b0004d] rounded-xl shadow-lg shadow-[#DB005F]/20 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Withdrawal...
                  </>
                ) : (
                  "Confirm Withdrawal"
                )}
              </Button>
              <p className="text-[10px] text-center text-[#667185] px-4">
                Funds will be settled to the provided account within a few minutes.
              </p>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
