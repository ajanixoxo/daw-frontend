"use client"

import { Package, TrendingUp, DollarSign, Clock } from "lucide-react"
import { StatsCard } from "@/components/(dashboards)/logistics-dashboard/earnings/stats-card"
import { EarningsChart } from "@/components/(dashboards)/logistics-dashboard/earnings/earnings-chart"
import { PaymentsTable } from "@/components/(dashboards)/logistics-dashboard/earnings/payments-table"
import { PaymentDetailsModal } from "@/components/(dashboards)/logistics-dashboard/earnings/payment-details-modal"
import { useState } from "react"

export default function EarningsPage() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Earnings"
              value="₦328,000"
              change="+10% More than Previous"
              trend="up"
              icon={DollarSign}
            />
            <StatsCard title="This Month" value="₦67,000" change="+10% More than Previous" trend="up" icon={Package} />
            <StatsCard
              title="Avg per Delivery"
              value="₦1,489"
              change="+10% More than Previous"
              trend="up"
              icon={TrendingUp}
            />
            <StatsCard
              title="Pending Payout"
              value="₦12,500"
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
