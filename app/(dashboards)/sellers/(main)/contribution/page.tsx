"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, CreditCard, DollarSign, Calendar, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/(dashboards)/sellers-dashboard/stat-card";
import { clientApiClient } from "@/lib/api/client-client";
import { format } from "date-fns";

interface ContributionSummary {
  currentTier: string;
  monthlyAmount: number;
  lastContributionAmount: number;
  lastContributionDate: string | null;
  nextDueDate: string;
  status: string;
}

interface ContributionHistoryItem {
  _id: string;
  month: string;
  amount: number;
  status: string;
  createdAt: string;
  paidAt?: string;
  contributionTypeId?: {
    name: string;
  };
}

export default function ContributionPage() {
  const [summary, setSummary] = useState<ContributionSummary | null>(null);
  const [history, setHistory] = useState<ContributionHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Summary
        const summaryRes = await clientApiClient.get<{ success: boolean; data: ContributionSummary }>("/api/contributions/summary");
        console.log("Frontend Contribution Summary Response:", summaryRes); // DEBUG LOG
        if (summaryRes.success) {
          setSummary(summaryRes.data);
        }

        // Fetch History
        const historyRes = await clientApiClient.get<ContributionHistoryItem[]>("/api/contributions/history");
        // Check if historyRes is the array directly or inside data property
        // Based on controller it returns res.json(list) which is array
        if (Array.isArray(historyRes)) {
          setHistory(historyRes);
        } else if ((historyRes as any).success && Array.isArray((historyRes as any).data)) {
           setHistory((historyRes as any).data);
        }
      } catch (error) {
        console.error("Error fetching contribution data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePayment = async () => {
    if (!summary) return;

    try {
      setProcessingPayment(true);
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const currentMonth = monthNames[new Date().getMonth()];

      const res = await clientApiClient.post<{ success: boolean; paymentUrl: string }>("/api/contributions/pay", {
        amount: summary.monthlyAmount,
        month: currentMonth // Default to current month for now
      });

      if (res.success && res.paymentUrl) {
        window.location.href = res.paymentUrl;
      } else {
        alert("Failed to initiate payment");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      alert(error.message || "Payment processing failed");
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-pink-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[24px] font-bold text-[#101828] leading-tight">Contribution</h1>
          <p className="text-[13px] text-[#667085] mt-1 font-normal">Make contributions and view your payment history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={CreditCard}
            title="Current Tier"
            value={summary?.currentTier || "N/A"}
            subtitle={`Contribution: ₦${summary?.monthlyAmount?.toLocaleString() || 0}`}
            iconColor="#E6007A"
          />
          <StatCard
            icon={DollarSign}
            title="Last Contribution"
            value={`₦${summary?.lastContributionAmount?.toLocaleString() || 0}`}
            subtitle={summary?.lastContributionDate ? format(new Date(summary.lastContributionDate), "MMM dd, yyyy") : "No payments yet"}
            iconColor="#E6007A"
          />
          <StatCard
            icon={Calendar}
            title="Next Due Date"
            value={summary?.nextDueDate ? format(new Date(summary.nextDueDate), "MMM dd, yyyy") : "N/A"}
            subtitle="Upcoming"
            iconColor="#E6007A"
          />
        </div>

        {/* Make a Contribution Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#000000] mb-1">Make a Contribution</h2>
          <p className="text-[#667185] text-sm mb-6">
            Your contribution amount is fixed based on your {summary?.currentTier} tier membership
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contribution Amount Card */}
            <Card className="bg-white border-0 shadow-sm p-6">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f0f2f5] rounded-full text-xs font-medium text-[#1d2739]">
                  <span className="w-2 h-2 rounded-full bg-[#1d2739]" />
                  {summary?.currentTier} Tier
                </span>
              </div>

              <div className="text-center mb-6">
                <p className="text-5xl font-bold text-[#f10e7c] mb-2">₦{summary?.monthlyAmount?.toLocaleString()}</p>
                <p className="text-[#667185] text-sm">Contribution Amount</p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#e4e7ec]">
                <p className="text-[#667185] text-sm">This is your fixed monthly contribution amount</p>
                <div className="text-right">
                  <p className="text-[#667185] text-xs mb-1">Due Date</p>
                  <p className="text-[#1d2739] text-sm font-semibold">
                    {summary?.nextDueDate ? format(new Date(summary.nextDueDate), "MMM dd, yyyy") : "N/A"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Payment Method Card */}
            <Card className="bg-white border-0 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-[#000000] mb-6">Payment Method</h3>

              <div className="space-y-4">
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="w-full border-[#e4e7ec] text-[#667185]">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Card / Mobile Money (VigiPay)</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                    className="w-full bg-[#f10e7c] hover:bg-[#d00d6a] text-white py-6 text-base font-medium"
                    onClick={handlePayment}
                    disabled={processingPayment}
                >
                  {processingPayment ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                  ) : (
                      "Proceed to Payment"
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Payment History Section */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Section Header */}
          <div className="p-5 border-b border-[#e4e7ec] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-[#000000]">Payment History</h2>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667185]" />
                <Input
                  placeholder="Search here..."
                  className="pl-9 pr-4 py-2 w-full sm:w-[280px] border-[#e4e7ec] text-sm"
                />
              </div>
              <Button variant="outline" size="sm" className="border-[#e4e7ec] text-[#344054] gap-2 bg-transparent">
                <SlidersHorizontal className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#f0f2f5] hover:bg-[#f0f2f5] border-b border-[#e4e7ec]">
                  <TableHead className="text-[#475367] font-medium text-xs">Date</TableHead>
                  <TableHead className="text-[#475367] font-medium text-xs">Description</TableHead>
                  <TableHead className="text-[#475367] font-medium text-xs">Amount</TableHead>
                  <TableHead className="text-[#475367] font-medium text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                            No payment history found.
                        </TableCell>
                    </TableRow>
                ) : (
                    history.map((payment, index) => (
                    <TableRow key={index} className="border-b border-[#e4e7ec]">
                        <TableCell className="text-[#1d2739] text-sm">
                            {format(new Date(payment.createdAt), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell className="text-[#1d2739] text-sm">
                            {payment.contributionTypeId?.name || (payment.month ? `Contribution - ${payment.month}` : "Contribution")}
                        </TableCell>
                        <TableCell className="text-[#1d2739] text-sm font-medium">₦{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>
                        <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            payment.status === "paid" || payment.status === "Completed"
                                ? "bg-[#e7f6ec] text-[#009a49]"
                                : payment.status === "missed"
                                ? "bg-[#ffece5] text-[#ad3307]"
                                : "bg-[#ffe7cc] text-[#f56630]"
                            }`}
                        >
                            <span
                            className={`w-1.5 h-1.5 rounded-full ${
                                payment.status === "paid" || payment.status === "Completed"
                                ? "bg-[#009a49]"
                                : payment.status === "missed"
                                    ? "bg-[#ad3307]"
                                    : "bg-[#f56630]"
                            }`}
                            />
                            {payment.status}
                        </span>
                        </TableCell>
                    </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
