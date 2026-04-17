"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useWithdrawals,
  useApproveWithdrawal,
  useRejectWithdrawal,
} from "@/hooks/useWithdrawals";
import { Loader2, CheckCircle, XCircle, Info } from "lucide-react";
import { format } from "date-fns";

export function WithdrawalRequestsTable() {
  const { data: response, isLoading } = useWithdrawals("pending");
  const { mutate: approve, isPending: isApproving } = useApproveWithdrawal();
  const { mutate: reject, isPending: isRejecting } = useRejectWithdrawal();

  const withdrawals = response?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-[#DB005F]" />
      </div>
    );
  }

  if (withdrawals.length === 0) {
    return (
      <div className="text-center py-12 border rounded-xl bg-gray-50/50">
        <p className="text-gray-500">No pending withdrawal requests.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#e7e8e9] overflow-hidden bg-white">
      <Table>
        <TableHeader className="bg-[#f9fafb]">
          <TableRow>
            <TableHead>Provider</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Bank Info</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawals.map((w: any) => (
            <TableRow key={w._id}>
              <TableCell>
                <div className="font-medium text-[#1d1d2a]">
                  {w.userId?.firstName} {w.userId?.lastName}
                </div>
                <div className="text-xs text-gray-500">{w.userId?.email}</div>
              </TableCell>
              <TableCell className="font-bold text-[#1d1d2a]">
                ₦{w.amount.toLocaleString()}
              </TableCell>
              <TableCell>
                <div className="text-sm font-medium">{w.bankDetails.bankName}</div>
                <div className="text-xs text-gray-500">
                  {w.bankDetails.accountNumber} - {w.bankDetails.accountName}
                </div>
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {format(new Date(w.createdAt), "dd MMM yyyy")}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => reject({ id: w._id, adminNote: "Rejected by admin" })}
                  disabled={isRejecting || isApproving}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => approve({ id: w._id, adminNote: "Approved and processed" })}
                  disabled={isRejecting || isApproving}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
