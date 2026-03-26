"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpRight, ArrowDownLeft, Inbox } from "lucide-react";
import { ILedgerEntry } from "@/types/wallet.types";
import { Input } from "@/components/ui/input";

interface RecentTransactionsTableProps {
  transactions: ILedgerEntry[];
}

export function RecentTransactionsTable({
  transactions,
}: RecentTransactionsTableProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredTransactions = transactions.filter(t =>
    t.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.narration?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "SUCCESS":
        return "bg-green-50 text-green-700 border-green-100";
      case "PENDING":
        return "bg-orange-50 text-orange-700 border-orange-100";
      case "FAILED":
        return "bg-red-50 text-red-700 border-red-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e7e8e9] shadow-sm overflow-hidden">
      <div className="p-6 border-b border-[#e7e8e9] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/30">
        <div>
          <h2 className="text-lg font-bold text-[#1d1d2a]">Recent Transactions</h2>
          <p className="text-xs text-[#667185] mt-0.5">Your financial activity for this month</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#98a2b3]" />
            <Input
              placeholder="Search reference..."
              className="h-10 pl-9 border-[#e7e8e9] focus-visible:ring-[#DB005F] text-sm bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Filter/Export — coming soon */}
          {/* <Button variant="outline" className="h-10 border-[#e7e8e9] gap-2 font-medium text-xs bg-white">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
          <Button variant="outline" className="h-10 border-[#e7e8e9] gap-2 font-medium text-xs bg-white">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button> */}
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-b border-[#e7e8e9]">
              <TableHead className="font-bold text-[#1d1d2a] py-4 text-xs uppercase tracking-tighter">Date & Time</TableHead>
              <TableHead className="font-bold text-[#1d1d2a] py-4 text-xs uppercase tracking-tighter">Reference</TableHead>
              <TableHead className="font-bold text-[#1d1d2a] py-4 text-xs uppercase tracking-tighter">Type</TableHead>
              <TableHead className="font-bold text-[#1d1d2a] py-4 text-xs uppercase tracking-tighter">Status</TableHead>
              <TableHead className="font-bold text-[#1d1d2a] py-4 text-right text-xs uppercase tracking-tighter">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, idx) => (
                <TableRow key={transaction._id || idx} className="hover:bg-gray-50/50 transition-colors border-b border-[#e7e8e9] last:border-0 group">
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#1d1d2a]">
                        {transaction.transactionDate ? format(new Date(transaction.transactionDate), "MMM dd, yyyy") : "N/A"}
                      </span>
                      <span className="text-[10px] text-[#667185] mt-0.5">
                        {transaction.transactionDate ? format(new Date(transaction.transactionDate), "hh:mm a") : ""}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#1d1d2a] group-hover:text-[#DB005F] transition-colors">
                        {transaction.reference}
                      </span>
                      <span className="text-[10px] text-[#667185] mt-0.5 truncate max-w-[150px]">
                        {transaction.narration || "No description"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${transaction.type === 'CREDIT' ? 'bg-green-50' : 'bg-red-50'}`}>
                        {transaction.type === 'CREDIT' ? (
                          <ArrowDownLeft className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-3.5 w-3.5 text-red-600" />
                        )}
                      </div>
                      <span className="text-xs font-bold text-[#1d1d2a] tracking-tight">{transaction.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(transaction.status)} border rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider`}
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <span className={`text-sm font-bold tracking-tight ${transaction.type === 'CREDIT' ? 'text-green-600' : 'text-[#1d1d2a]'}`}>
                      {transaction.type === 'CREDIT' ? "+" : "-"} {formatCurrency(transaction.amount)}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                      <Inbox className="h-8 w-8 text-[#98a2b3]" />
                    </div>
                    <div>
                      <p className="text-[#1d1d2a] font-bold">No transactions found</p>
                      <p className="text-xs text-[#667185] mt-1">When you make transactions, they will appear here.</p>
                    </div>
                    {searchTerm && (
                      <Button variant="link" onClick={() => setSearchTerm("")} className="text-[#DB005F] p-0 h-auto text-xs">
                        Clear search
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
