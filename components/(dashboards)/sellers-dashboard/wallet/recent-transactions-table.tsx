"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: "Credit" | "Debit";
  status: "Completed" | "Pending";
  amount: number;
}

interface RecentTransactionsTableProps {
  transactions?: Transaction[];
}

const DEMO_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    date: "Apr 12, 2025",
    description: "Order Payment - #ORD-001",
    type: "Credit",
    status: "Completed",
    amount: 25000,
  },
  {
    id: "2",
    date: "Apr 12, 2025",
    description: "Withdrawal to Bank",
    type: "Debit",
    status: "Completed",
    amount: 25000,
  },
  {
    id: "3",
    date: "Apr 12, 2025",
    description: "Loan Repayment",
    type: "Debit",
    status: "Completed",
    amount: 25000,
  },
  {
    id: "4",
    date: "Apr 12, 2025",
    description: "Monthly Contribution",
    type: "Debit",
    status: "Pending",
    amount: 25000,
  },
  {
    id: "5",
    date: "Apr 12, 2025",
    description: "Order Payment - #ORD-001",
    type: "Credit",
    status: "Completed",
    amount: 25000,
  },
];

export function RecentTransactionsTable({
  transactions = DEMO_TRANSACTIONS,
}: RecentTransactionsTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="border-[#e7e8e9] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-[#1d1d2a]">
          Recent Transactions
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-[#667185] border-[#e7e8e9] hover:bg-gray-50 hover:text-[#1d1d2a]"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e7e8e9] bg-[#f9fafb]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#667185] uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#667185] uppercase tracking-wider">
                  Description
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#667185] uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#667185] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right py-3 px-4 text-xs font-medium text-[#667185] uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-[#e7e8e9] last:border-0 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm text-[#667185] whitespace-nowrap">
                    {transaction.date}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#1d1d2a] font-medium">
                    {transaction.description}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#667185]">
                    {transaction.type}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                        transaction.status === "Completed"
                          ? "bg-[#ecfdf3] text-[#027a48] border-[#ecfdf3]"
                          : "bg-[#fff6ed] text-[#c4320a] border-[#fff6ed]",
                      )}
                    >
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          transaction.status === "Completed"
                            ? "bg-[#12b76a]"
                            : "bg-[#fb6514]",
                        )}
                      />
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-[#1d1d2a] font-medium text-right">
                    {formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
