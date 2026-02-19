"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, CreditCard, DollarSign, Calendar, AlertCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/(dashboards)/sellers-dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { clientApiClient } from "@/lib/api/client-client";
import { format } from "date-fns";
import { toast } from "sonner"; // Assuming sonner

interface EligibilityData {
  tierName: string;
  maxLoanAmount: number;
  interestRate: number;
  maxDurationMonths: number;
  eligibilityCriteria: any;
}

interface Loan {
  _id: string;
  amount: number;
  status: string;
  createdAt: string;
  repaymentAmount?: number;
  dueDate?: string;
}

export default function LoansPage() {
  const [activeTab, setActiveTab] = useState("my-loans");
  const [loading, setLoading] = useState(true);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [eligibility, setEligibility] = useState<EligibilityData | null>(null);
  
  // Apply Form State
  const [applyAmount, setApplyAmount] = useState("");
  const [applyDuration, setApplyDuration] = useState("");
  const [applyReason, setApplyReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Loans
        const loansRes = await clientApiClient.get<Loan[]>("/api/loans/history");
         if (Array.isArray(loansRes)) {
          setLoans(loansRes);
        } else if ((loansRes as any).success && Array.isArray((loansRes as any).data)) {
           setLoans((loansRes as any).data);
        }

        // Fetch Eligibility
        const eligibilityRes = await clientApiClient.get<{ success: boolean; data: EligibilityData }>("/api/loans/eligibility");
        if (eligibilityRes.success) {
          setEligibility(eligibilityRes.data);
          // Set default duration if available
          if (eligibilityRes.data.maxDurationMonths) {
              setApplyDuration(eligibilityRes.data.maxDurationMonths.toString());
          }
        }
      } catch (error) {
        console.error("Error fetching loan data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eligibility) return;

    // Basic Validation
    const amount = parseFloat(applyAmount);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }
    if (amount > eligibility.maxLoanAmount) {
        alert(`Amount cannot exceed ₦${eligibility.maxLoanAmount.toLocaleString()}`);
        return;
    }

    try {
      setSubmitting(true);
      const res = await clientApiClient.post<{ success: boolean; data: any }>("/api/loans/apply", {
        amount,
        durationMonths: parseInt(applyDuration),
        reason: applyReason
      });

      if (res.success) {
        alert("Loan application submitted successfully!");
        // Refresh loans
        const loansRes = await clientApiClient.get<Loan[]>("/api/loans/history");
        if (Array.isArray(loansRes)) {
            setLoans(loansRes);
        }
        setActiveTab("my-loans");
        setApplyAmount("");
        setApplyReason("");
      } else {
        alert("Failed to apply for loan");
      }
    } catch (error: any) {
      console.error("Loan application error:", error);
      alert(error.message || "Loan application failed");
    } finally {
      setSubmitting(false);
    }
  };

  const activeLoan = loans.find(l => l.status === "active" || l.status === "approved");
  // Calculate total borrowed (sum of all approved/paid loans)
  const totalBorrowed = loans
    .filter(l => l.status === "paid" || l.status === "active" || l.status === "approved")
    .reduce((sum, l) => sum + (l.amount || 0), 0);

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
          <h1 className="text-[24px] font-bold text-[#101828] leading-tight">Loans</h1>
          <p className="text-[13px] text-[#667085] mt-1 font-normal">Apply for loans and manage your loan history.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={DollarSign}
            title="Loan Eligibility"
            value={eligibility ? `Up to ₦${eligibility.maxLoanAmount.toLocaleString()}` : "Checking..."}
            subtitle={eligibility ? `${eligibility.tierName} Tier Limit` : "Loading..."}
            iconColor="#E6007A"
          />
          <StatCard
            icon={CreditCard}
            title="Active Loan"
            value={activeLoan ? `₦${activeLoan.amount.toLocaleString()}` : "None"}
            subtitle={activeLoan ? `Status: ${activeLoan.status}` : "No active loans"}
            iconColor="#E6007A"
          />
           <StatCard
            icon={Calendar}
            title="Total Borrowed"
            value={`₦${totalBorrowed.toLocaleString()}`}
            subtitle="Lifetime total"
            iconColor="#E6007A"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white border-b border-[#e4e7ec] p-0 w-full justify-start rounded-none h-auto">
            <TabsTrigger
              value="my-loans"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#f10e7c] data-[state=active]:text-[#f10e7c] px-6 py-3"
            >
              My Loans
            </TabsTrigger>
            <TabsTrigger
              value="apply"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#f10e7c] data-[state=active]:text-[#f10e7c] px-6 py-3"
            >
              Apply for Loan
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            {/* My Loans Tab */}
            <TabsContent value="my-loans">
              <div className="bg-white rounded-lg shadow-sm">
                 <div className="p-5 border-b border-[#e4e7ec] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-lg font-semibold text-[#000000]">Loan History</h2>
                     <div className="flex items-center gap-3">
                        <div className="relative flex-1 sm:flex-initial">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667185]" />
                            <Input
                            placeholder="Search loans..."
                            className="pl-9 pr-4 py-2 w-full sm:w-[280px] border-[#e4e7ec] text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#f0f2f5] hover:bg-[#f0f2f5] border-b border-[#e4e7ec]">
                        <TableHead className="text-[#475367] font-medium text-xs">Date Applied</TableHead>
                        <TableHead className="text-[#475367] font-medium text-xs">Amount</TableHead>
                        <TableHead className="text-[#475367] font-medium text-xs">Status</TableHead>
                        <TableHead className="text-[#475367] font-medium text-xs">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loans.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                    No loans found.
                                </TableCell>
                            </TableRow>
                        ) : (
                          loans.map((loan) => (
                            <TableRow key={loan._id} className="border-b border-[#e4e7ec]">
                              <TableCell className="text-[#1d2739] text-sm">
                                {format(new Date(loan.createdAt), "MMM dd, yyyy")}
                              </TableCell>
                              <TableCell className="text-[#1d2739] text-sm font-medium">₦{loan.amount.toLocaleString()}</TableCell>
                              <TableCell>
                                <Badge
                                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium shadow-none ${
                                    loan.status === "active" || loan.status === "approved"
                                      ? "bg-[#e7f6ec] text-[#009a49] hover:bg-[#e7f6ec]"
                                      : loan.status === "pending"
                                      ? "bg-[#fff8e5] text-[#b54708] hover:bg-[#fff8e5]"
                                      : loan.status === "rejected"
                                      ? "bg-[#ffece5] text-[#ad3307] hover:bg-[#ffece5]"
                                      : "bg-[#f0f2f5] text-[#344054] hover:bg-[#f0f2f5]"
                                  }`}
                                >
                                  {loan.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="text-[#f10e7c] hover:text-[#d00d6a] hover:bg-[#fff0f7]">
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* Apply Tab */}
            <TabsContent value="apply">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card className="p-6 border-0 shadow-sm">
                            <h3 className="text-lg font-semibold text-[#101828] mb-1">Apply for a New Loan</h3>
                            <p className="text-[#667085] text-sm mb-6">Fill in the details below to request a loan.</p>

                            <form onSubmit={handleApply} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="amount">Loan Amount (₦)</Label>
                                    <Input 
                                        id="amount" 
                                        type="number" 
                                        placeholder="Enter amount" 
                                        value={applyAmount}
                                        onChange={(e) => setApplyAmount(e.target.value)}
                                        max={eligibility?.maxLoanAmount}
                                    />
                                    {eligibility && (
                                        <p className="text-xs text-[#667085]">
                                            Maximum eligible amount: ₦{eligibility.maxLoanAmount.toLocaleString()}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration (Months)</Label>
                                    <Select value={applyDuration} onValueChange={setApplyDuration}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select duration" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[...Array(eligibility?.maxDurationMonths || 12)].map((_, i) => (
                                                <SelectItem key={i + 1} value={(i + 1).toString()}>
                                                    {i + 1} Month{(i + 1) !== 1 ? 's' : ''}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reason">Reason for Loan</Label>
                                    <Input 
                                        id="reason" 
                                        placeholder="e.g., Business expansion, Inventory" 
                                        value={applyReason}
                                        onChange={(e) => setApplyReason(e.target.value)}
                                    />
                                </div>

                                <div className="bg-[#f0f9ff] border border-[#b2ddff] rounded-lg p-4 flex gap-3 text-[#0061af] text-sm">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium mb-1">Interest Rate</p>
                                        <p>You will be charged an interest rate of {eligibility?.interestRate || 0}% for this loan.</p>
                                    </div>
                                </div>

                                <Button 
                                    type="submit" 
                                    className="w-full bg-[#f10e7c] hover:bg-[#d00d6a] text-white py-6"
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting Application...
                                        </>
                                    ) : (
                                        "Submit Application"
                                    )}
                                </Button>
                            </form>
                        </Card>
                    </div>

                    <div>
                        <Card className="p-6 border-0 shadow-sm bg-[#f9fafb]">
                            <h3 className="font-semibold text-[#101828] mb-4">Eligibility Requirements</h3>
                            <ul className="space-y-3 text-sm text-[#475367]">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#f10e7c] mt-2" />
                                    Must be an active member for at least 3 months.
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#f10e7c] mt-2" />
                                    No outstanding loans or overdue payments.
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#f10e7c] mt-2" />
                                    Minimum monthly contribution must be met.
                                </li>
                            </ul>
                            
                            <div className="mt-8 pt-6 border-t border-[#e4e7ec]">
                                <h4 className="font-medium text-[#101828] mb-2">Need Help?</h4>
                                <p className="text-xs text-[#667085] mb-4">
                                    Contact your cooperative admin for more information about loan policies.
                                </p>
                                <Button variant="outline" className="w-full text-[#344054] border-[#d0d5dd]">
                                    Contact Support
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}