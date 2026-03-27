"use client"

import { useEffect, useState } from "react"
import { Search, CreditCard, DollarSign, Calendar, CheckCircle, Loader2, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard } from "@/components/(dashboards)/sellers-dashboard/stat-card"
import {
  getMySummary,
  getMyHistory,
  initiatePayment,
} from "@/app/actions/contributions"
import type { ContributionSummary, ContributionHistoryItem, PaymentPlatform } from "@/app/actions/contributions"
import { toast } from "sonner"
import { format } from "date-fns"

const ALL_PAYMENT_PLATFORMS: { id: PaymentPlatform; name: string; description: string; color: string; currencies: ("NGN" | "USD")[] }[] = [
  {
    id: "paystack",
    name: "Paystack",
    description: "Pay with card or bank transfer via Paystack",
    color: "#00C3F7",
    currencies: ["NGN"],
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Pay in USD via PayPal",
    color: "#003087",
    currencies: ["NGN", "USD"],
  },
  {
    id: "vigipay",
    name: "VígiPay",
    description: "Pay via VígiPay wallet",
    color: "#f10e7c",
    currencies: ["NGN"],
  },
]

const formatCurrency = (amount: number, currency: "NGN" | "USD" = "NGN") =>
  new Intl.NumberFormat(currency === "USD" ? "en-US" : "en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: currency === "USD" ? 2 : 0,
    maximumFractionDigits: currency === "USD" ? 2 : 0,
  }).format(amount)

const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return "—"
  try {
    return format(new Date(dateStr), "dd MMM yyyy")
  } catch {
    return "—"
  }
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case "paid":
      return { badge: "bg-[#e7f6ec] text-[#009a49]", dot: "bg-[#009a49]" }
    case "missed":
      return { badge: "bg-[#ffece5] text-[#ad3307]", dot: "bg-[#ad3307]" }
    default:
      return { badge: "bg-[#ffe7cc] text-[#f56630]", dot: "bg-[#f56630]" }
  }
}

export default function ContributionPage() {
  const [summary, setSummary] = useState<ContributionSummary | null>(null)
  const [history, setHistory] = useState<ContributionHistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showPlatformModal, setShowPlatformModal] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<PaymentPlatform | null>(null)

  const currentMonth = new Date().toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  })

  const fetchData = async () => {
    setLoading(true)
    setFetchError(null)
    try {
      const [summaryResult, historyResult] = await Promise.all([
        getMySummary(),
        getMyHistory(),
      ])

      if (summaryResult.success && summaryResult.data) {
        setSummary(summaryResult.data)
      } else {
        setFetchError(summaryResult.error || "Failed to load contribution data")
      }

      if (historyResult.success && historyResult.data) {
        setHistory(historyResult.data)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleContribute = async () => {
    if (!summary?.monthlyAmount) return
    setShowPlatformModal(true)
  }

  const handleProceedWithPlatform = async () => {
    if (!summary?.monthlyAmount || !selectedPlatform) return
    setShowPlatformModal(false)
    setPaying(true)
    try {
      const result = await initiatePayment(summary.monthlyAmount, currentMonth, selectedPlatform)
      if (result.success && result.data?.paymentUrl) {
        window.location.href = result.data.paymentUrl
      } else {
        toast.error(result.error || "Failed to initiate payment")
      }
    } catch {
      toast.error("An unexpected error occurred")
    } finally {
      setPaying(false)
      setSelectedPlatform(null)
    }
  }

  const userCurrency = summary?.currency ?? "NGN"
  const availablePlatforms = ALL_PAYMENT_PLATFORMS.filter((p) =>
    p.currencies.includes(userCurrency)
  )

  const paidContributions = history.filter((h) => h.status === "paid")
  const totalPaid = paidContributions.reduce((sum, h) => sum + h.amount, 0)
  const alreadyPaidThisMonth = history.some(
    (h) => h.month === currentMonth && h.status === "paid"
  )

  const filteredHistory = history.filter(
    (h) =>
      h.month?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.status?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#f10e7c]" />
          <p className="text-sm text-[#667085]">Loading contribution data...</p>
        </div>
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <p className="text-sm text-[#667085] max-w-sm">{fetchError}</p>
          <Button
            onClick={fetchData}
            className="bg-[#f10e7c] hover:bg-[#d00d6a] text-white"
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-4 md:p-6 lg:p-8">
      {/* Payment Platform Modal */}
      {showPlatformModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-semibold text-[#101828]">Choose Payment Method</h3>
                <p className="text-sm text-[#667085] mt-0.5">
                  Select how you want to pay {summary?.monthlyAmount ? formatCurrency(summary.monthlyAmount, userCurrency) : ""}
                </p>
              </div>
              <button
                onClick={() => { setShowPlatformModal(false); setSelectedPlatform(null) }}
                className="size-8 rounded-full flex items-center justify-center hover:bg-[#f5f5f5] text-[#667085]"
              >
                <X className="size-4" />
              </button>
            </div>

            {userCurrency === "USD" && (
              <p className="text-xs text-[#667085] bg-[#f5f5f5] rounded-lg px-3 py-2 mb-4">
                USD accounts are billed via PayPal only.
              </p>
            )}

            <div className="space-y-3 mb-6">
              {availablePlatforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    selectedPlatform === platform.id
                      ? "border-[#f10e7c] bg-[#fff5f9]"
                      : "border-[#e4e7ec] hover:border-[#f10e7c]/40 hover:bg-[#fafafa]"
                  }`}
                >
                  <span
                    className="size-10 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold"
                    style={{ backgroundColor: platform.color }}
                  >
                    {platform.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#101828]">{platform.name}</p>
                    <p className="text-xs text-[#667085]">{platform.description}</p>
                  </div>
                  <span
                    className={`size-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                      selectedPlatform === platform.id
                        ? "border-[#f10e7c] bg-[#f10e7c]"
                        : "border-[#d0d5dd]"
                    }`}
                  >
                    {selectedPlatform === platform.id && (
                      <span className="size-2 rounded-full bg-white" />
                    )}
                  </span>
                </button>
              ))}
            </div>

            <Button
              onClick={handleProceedWithPlatform}
              disabled={!selectedPlatform || paying}
              className="w-full bg-[#f10e7c] hover:bg-[#d00d6a] text-white h-12 text-sm font-medium disabled:opacity-50"
            >
              {paying ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Initiating Payment...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[24px] font-bold text-[#101828] leading-tight">
            Contribution
          </h1>
          <p className="text-[13px] text-[#667085] mt-1 font-normal">
            Make monthly contributions and view your payment history
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={CreditCard}
            title="Current Tier"
            value={summary?.currentTier || "—"}
            subtitle={
              summary?.monthlyAmount
                ? `Contribution: ${formatCurrency(summary.monthlyAmount, userCurrency)}`
                : "No tier assigned"
            }
            iconColor="#E6007A"
          />
          <StatCard
            icon={DollarSign}
            title="Total Contributions"
            value={formatCurrency(totalPaid, userCurrency)}
            subtitleHighlight={String(paidContributions.length)}
            subtitle="Payments made"
            trend="up"
            iconColor="#E6007A"
          />
          <StatCard
            icon={Calendar}
            title="Last Payment"
            value={formatDate(summary?.lastContributionDate)}
            subtitle={
              summary?.lastContributionAmount
                ? formatCurrency(summary.lastContributionAmount, userCurrency)
                : "No payments yet"
            }
            iconColor="#E6007A"
          />
          <StatCard
            icon={Calendar}
            title="Next Payment Due"
            value={formatDate(summary?.nextDueDate)}
            subtitle={
              summary?.monthlyAmount ? formatCurrency(summary.monthlyAmount, userCurrency) : "—"
            }
            iconColor="#E6007A"
          />
        </div>

        {/* Make a Contribution */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#000000] mb-1">
            {summary?.userType === "seller" ? "Pay Subscription" : "Make a Contribution"}
          </h2>
          <p className="text-[#667185] text-sm mb-6">
            {summary?.userType === "seller"
              ? `Your monthly subscription is fixed at ${formatCurrency(summary.monthlyAmount, userCurrency)}`
              : `Your contribution amount is fixed based on your ${summary?.currentTier || "membership"} tier`}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contribution Amount Card */}
            <Card className="bg-white border-0 shadow-sm p-6">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f0f2f5] rounded-full text-xs font-medium text-[#1d2739]">
                  <span className="w-2 h-2 rounded-full bg-[#1d2739]" />
                  {summary?.currentTier || "Member"} Tier
                </span>
              </div>

              <div className="text-center mb-6">
                <p className="text-5xl font-bold text-[#f10e7c] mb-2">
                  {summary?.monthlyAmount
                    ? formatCurrency(summary.monthlyAmount, userCurrency)
                    : "—"}
                </p>
                <p className="text-[#667185] text-sm">Monthly Contribution Amount</p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#e4e7ec]">
                <p className="text-[#667185] text-sm">Fixed monthly contribution</p>
                <div className="text-right">
                  <p className="text-[#667185] text-xs mb-1">Next Due</p>
                  <p className="text-[#1d2739] text-sm font-semibold">
                    {formatDate(summary?.nextDueDate)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Contribute Action Card */}
            <Card className="bg-white border-0 shadow-sm p-6 flex flex-col justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[#000000] mb-2">
                  {currentMonth} Contribution
                </h3>
                <p className="text-[#667185] text-sm">
                  {alreadyPaidThisMonth
                    ? "You have already paid your contribution for this month."
                    : `Click below to pay your ${currentMonth} contribution of ${summary?.monthlyAmount ? formatCurrency(summary.monthlyAmount, userCurrency) : "—"}.`}
                </p>
              </div>

              {alreadyPaidThisMonth ? (
                <div className="flex items-center gap-3 p-4 bg-[#e7f6ec] rounded-xl">
                  <CheckCircle className="h-5 w-5 text-[#009a49] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#009a49]">
                      Paid for {currentMonth}
                    </p>
                    <p className="text-xs text-[#009a49]/80">
                      Your contribution has been received.
                    </p>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={handleContribute}
                  disabled={paying || !summary?.monthlyAmount}
                  className="w-full bg-[#f10e7c] hover:bg-[#d00d6a] text-white py-6 text-base font-medium"
                >
                  {paying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Initiating Payment...
                    </>
                  ) : (
                    `Contribute ${summary?.monthlyAmount ? formatCurrency(summary.monthlyAmount, userCurrency) : ""}`
                  )}
                </Button>
              )}

            </Card>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-5 border-b border-[#e4e7ec] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-[#000000]">Payment History</h2>
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667185]" />
              <Input
                placeholder="Search by month or status..."
                className="pl-9 pr-4 py-2 w-full sm:w-[280px] border-[#e4e7ec] text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#f0f2f5] hover:bg-[#f0f2f5] border-b border-[#e4e7ec]">
                  <TableHead className="text-[#475367] font-medium text-xs">Month</TableHead>
                  <TableHead className="text-[#475367] font-medium text-xs">Amount</TableHead>
                  <TableHead className="text-[#475367] font-medium text-xs">Date Paid</TableHead>
                  <TableHead className="text-[#475367] font-medium text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item, index) => {
                    const style = getStatusStyle(item.status)
                    return (
                      <TableRow
                        key={item._id || index}
                        className="border-b border-[#e4e7ec]"
                      >
                        <TableCell className="text-[#1d2739] text-sm font-medium">
                          {item.month}
                        </TableCell>
                        <TableCell className="text-[#1d2739] text-sm font-medium">
                          {formatCurrency(item.amount, userCurrency)}
                        </TableCell>
                        <TableCell className="text-[#1d2739] text-sm">
                          {formatDate(item.paidAt)}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.badge}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-40 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-[#667085] text-sm">
                          {searchQuery
                            ? "No contributions match your search"
                            : "No contribution history yet"}
                        </p>
                        {searchQuery && (
                          <Button
                            variant="link"
                            onClick={() => setSearchQuery("")}
                            className="text-[#f10e7c] p-0 h-auto text-xs"
                          >
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
      </div>
    </div>
  )
}
