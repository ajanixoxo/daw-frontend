"use client";

import { Download, Upload } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "deposit",
    title: "Bank Deposit",
    date: "Oct 14, 2025 at 10:30 AM",
    amount: 500.0,
    status: "Completed",
  },
  {
    id: 2,
    type: "withdrawal",
    title: "Withdrawal to Bank Account",
    date: "Oct 14, 2025 at 10:30 AM",
    amount: 500.0,
    status: "Completed",
  },
  {
    id: 3,
    type: "deposit",
    title: "Bank Deposit",
    date: "Oct 14, 2025 at 10:30 AM",
    amount: 500.0,
    status: "Completed",
  },
  {
    id: 4,
    type: "withdrawal",
    title: "Withdrawal to Bank Account",
    date: "Oct 14, 2025 at 10:30 AM",
    amount: 500.0,
    status: "Completed",
  },
  {
    id: 5,
    type: "deposit",
    title: "Bank Deposit",
    date: "Oct 14, 2025 at 10:30 AM",
    amount: 500.0,
    status: "Completed",
  },
];

export function WalletView() {
  return (
    <div className="space-y-6">
      <h1 className="  text-3xl md:text-4xl text-[#1a1a1a]">Wallet</h1>

      {/* Balance Card */}
      <div className="bg-white rounded-2xl border border-[#e7e8e9] p-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-2 h-2 bg-[#34c759] rounded-full"></span>
          <span className="text-[#34c759] text-sm">Active</span>
        </div>
        <p className="text-[#6b6b6b] text-sm tracking-wider mb-1">
          WALLET BALANCE
        </p>
        <p className="text-[#ec008c] text-5xl md:text-6xl font-medium mb-2">
          $450,000
        </p>
        <p className="text-[#a1a1a1] text-sm">Available to spend or withdraw</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 py-4 px-6 bg-white border border-[#e7e8e9] rounded-xl text-[#1a1a1a] font-medium hover:bg-[#f5f5f5] transition-colors">
          <Download className="w-5 h-5" />
          Deposit Funds
        </button>
        <button className="flex items-center justify-center gap-2 py-4 px-6 bg-white border border-[#e7e8e9] rounded-xl text-[#1a1a1a] font-medium hover:bg-[#f5f5f5] transition-colors">
          <Upload className="w-5 h-5" />
          Withdraw Funds
        </button>
      </div>

      {/* Recent History */}
      <div>
        <h2 className="font-serif italic text-xl text-[#1a1a1a] mb-4">
          Recent History
        </h2>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#e7e8e9]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#f5f5f5] rounded-full flex items-center justify-center">
                  {transaction.type === "deposit" ? (
                    <Download className="w-5 h-5 text-[#6b6b6b]" />
                  ) : (
                    <Upload className="w-5 h-5 text-[#6b6b6b]" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1a1a1a]">
                    {transaction.title}
                  </p>
                  <p className="text-xs text-[#a1a1a1]">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-medium ${
                    transaction.type === "deposit"
                      ? "text-[#34c759]"
                      : "text-[#6b6b6b]"
                  }`}
                >
                  {transaction.type === "deposit" ? "+" : "−"} $
                  {transaction.amount.toFixed(2)}
                </p>
                <p className="text-xs text-[#34c759] flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 bg-[#34c759] rounded-full"></span>
                  {transaction.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
