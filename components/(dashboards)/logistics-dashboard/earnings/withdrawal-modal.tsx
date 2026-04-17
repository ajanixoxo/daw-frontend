"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/zustand/store";
import { useRequestWithdrawal } from "@/hooks/useWithdrawals";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { IUser } from "@/types/auth.types";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  profile?: IUser | null;
}

export function WithdrawalModal({ isOpen, onClose, balance, profile }: WithdrawalModalProps) {
  const user = useAuthStore((state) => state.user);
  const { mutate: requestWithdrawal, isPending } = useRequestWithdrawal();

  const [amount, setAmount] = useState("");
  const [bankDetails, setBankDetails] = useState({
    accountNumber: profile?.accountNo || user?.accountNo || "",
    bankName: profile?.bankName || user?.bankName || "",
    accountName: profile?.accountName || user?.accountName || "",
  });
  const [saveBankDetails, setSaveBankDetails] = useState(false);

  // Sync with profile if it changes (e.g. after a refresh)
  useEffect(() => {
    if (profile) {
      setBankDetails((prev) => ({
        accountNumber: profile.accountNo || prev.accountNumber,
        bankName: profile.bankName || prev.bankName,
        accountName: profile.accountName || prev.accountName,
      }));
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numAmount = Number(amount);

    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (numAmount < 1000) {
      alert("Minimum withdrawal amount is ₦1000");
      return;
    }

    if (numAmount > balance) {
      alert(`Insufficient balance. Your available balance is ₦${balance.toLocaleString()}`);
      return;
    }

    const cleanedBankDetails = {
      accountNumber: bankDetails.accountNumber.trim(),
      bankName: bankDetails.bankName.trim(),
      accountName: bankDetails.accountName.trim(),
    };

    if (!cleanedBankDetails.accountNumber || !cleanedBankDetails.bankName || !cleanedBankDetails.accountName) {
      alert("Please fill in all bank details");
      return;
    }

    requestWithdrawal({
      amount: numAmount,
      bankDetails: cleanedBankDetails,
      saveBankDetails,
    }, {
      onSuccess: (res) => {
        if (res.success) onClose();
      }
    });
  };

  const isAmountValid = Number(amount) >= 100000 && Number(amount) <= balance;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            Request a payout to your bank account. Minimum ₦1,000.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min={1000}
                max={balance}
              />
              <p className="text-[10px] text-muted-foreground">
                Available: ₦{balance.toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="1234567890"
                value={bankDetails.accountNumber}
                onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                placeholder="Access Bank"
                value={bankDetails.bankName}
                onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                placeholder="John Doe"
                value={bankDetails.accountName}
                onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="saveDetails"
                checked={saveBankDetails}
                onCheckedChange={(checked) => setSaveBankDetails(!!checked)}
              />
              <label
                htmlFor="saveDetails"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Save bank details for next time
              </label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#F10E7C] hover:bg-[#D40D6D] h-12"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              "Request Payout"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
