"use client"

import { Package, TrendingUp, DollarSign, Clock } from "lucide-react"
import { StatsCard } from "@/components/(dashboards)/logistics-dashboard/earnings/stats-card"
import { EarningsChart } from "@/components/(dashboards)/logistics-dashboard/earnings/earnings-chart"
import { PaymentsTable } from "@/components/(dashboards)/logistics-dashboard/earnings/payments-table"
import { PaymentDetailsModal } from "@/components/(dashboards)/logistics-dashboard/earnings/payment-details-modal"
import { useState } from "react"
import { useLogisticsEarnings } from "@/hooks/useLogistics"

export default function EarningsPage() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const { data: earningsData, isLoading } = useLogisticsEarnings()

  const earnings = earningsData?.data

  // Calculate "This Month" based on the last entry in the monthly chart
  const thisMonthEarnings = earnings?.monthlyChart && earnings.monthlyChart.length > 0
    ? earnings.monthlyChart[earnings.monthlyChart.length - 1].amount
    : 0

  return (
    <>
      <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Earnings</h1>
            <p className="text-muted-foreground">Track your earnings and payment history</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Earnings"
              value={isLoading ? "..." : `₦${earnings?.totalEarnings?.toLocaleString() || 0}`}
              change="+10% More than Previous"
              trend="up"
              icon={DollarSign}
            />
            <StatsCard 
              title="This Month" 
              value={isLoading ? "..." : `₦${thisMonthEarnings.toLocaleString()}`} 
              change="+10% More than Previous" 
              trend="up" 
              icon={Package} 
            />
            <StatsCard
              title="Avg per Delivery"
              value={isLoading ? "..." : `₦${earnings?.avgPerDelivery?.toLocaleString(undefined, { maximumFractionDigits: 0 }) || 0}`}
              change="+10% More than Previous"
              trend="up"
              icon={TrendingUp}
            />
            <StatsCard
              title="Pending Payout"
              value={isLoading ? "..." : `₦${earnings?.pendingPayout?.toLocaleString() || 0}`}
              change="+10% More than Previous"
              trend="up"
              icon={Clock}
            />
          </div>

          {/* Earnings Chart */}
          <EarningsChart />

          {/* Payments Table */}
          <PaymentsTable onViewDetails={setSelectedPayment} />
        </div>
      </div>

      {/* Payment Details Modal */}
      <PaymentDetailsModal paymentId={selectedPayment} onClose={() => setSelectedPayment(null)} />
    </>
  )
}
