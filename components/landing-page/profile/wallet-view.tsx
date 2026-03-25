"use client";

import { Download, Upload, Loader2, History } from "lucide-react";
import { useLedger } from "@/hooks/useWallet";
import { format } from "date-fns";

export function WalletView() {
  const { data: transactions, isLoading, error } = useLedger();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#f10e7c]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl text-[#1a1a1a]">Wallet</h1>
      </div>

      {/* Transaction History */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <History className="w-5 h-5 text-[#6b6b6b]" />
          <h2 className="italic text-xl text-[#1a1a1a]">Transaction History</h2>
        </div>

        {error ? (
          <div className="p-8 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-center">
            Failed to load transaction history. Please try again later.
          </div>
        ) : !transactions || transactions.length === 0 ? (
          <div className="p-12 bg-white rounded-2xl border border-[#e7e8e9] text-center text-[#6b6b6b]">
            <p>No transaction history found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#e7e8e9] hover:border-[#f10e7c]/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f5f5f5] rounded-full flex items-center justify-center">
                    {transaction.type === "CREDIT" ? (
                      <Download className="w-5 h-5 text-[#34c759]" />
                    ) : (
                      <Upload className="w-5 h-5 text-[#6b6b6b]" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1a]">
                      {transaction.shopName || transaction.narration || transaction.merchantRef || (transaction.type === "CREDIT" ? "Credit" : "Debit")}
                    </p>
                    <p className="text-xs text-[#a1a1a1]">
                      {transaction.createdAt || transaction.transactionDate ? 
                        format(new Date(transaction.createdAt || transaction.transactionDate), "MMM dd, yyyy 'at' hh:mm a") : 
                        "N/A"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      transaction.type === "CREDIT"
                        ? "text-[#34c759]"
                        : "text-[#1a1a1a]"
                    }`}
                  >
                    {transaction.type === "CREDIT" ? "+" : "−"} ₦
                    {transaction.amount.toLocaleString()}
                  </p>
                  <p className={`text-xs flex items-center justify-end gap-1 ${
                    transaction.status === "SUCCESS" ? "text-[#34c759]" : 
                    transaction.status === "PENDING" ? "text-yellow-600" : "text-red-500"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      transaction.status === "SUCCESS" ? "bg-[#34c759]" : 
                      transaction.status === "PENDING" ? "bg-yellow-600" : "bg-red-500"
                    }`}></span>
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
