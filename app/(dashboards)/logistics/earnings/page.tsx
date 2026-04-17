"use client"

import { Package, TrendingUp, DollarSign, Clock } from "lucide-react"
import { StatsCard } from "@/components/(dashboards)/logistics-dashboard/earnings/stats-card"
import { EarningsChart } from "@/components/(dashboards)/logistics-dashboard/earnings/earnings-chart"
import { PaymentsTable } from "@/components/(dashboards)/logistics-dashboard/earnings/payments-table"
import { PaymentDetailsModal } from "@/components/(dashboards)/logistics-dashboard/earnings/payment-details-modal"
import { useState } from "react"
import { useLogisticsEarnings } from "@/hooks/useLogistics"
import { useAuthStore } from "@/zustand/store"
import { Button } from "@/components/ui/button"
import { useProfile } from "@/hooks/useProfile"
import { WithdrawalModal } from "@/components/(dashboards)/logistics-dashboard/earnings/withdrawal-modal"

export default function EarningsPage() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const { data: earningsData, isLoading: isEarningsLoading } = useLogisticsEarnings()
  const { data: profile, isLoading: isProfileLoading } = useProfile()
  const user = useAuthStore((state) => state.user)

  const isLoading = isEarningsLoading || isProfileLoading;

  const earnings = earningsData?.data
  const walletBalance = earnings?.sharedBalance ?? 0
  const totalEarnings = earnings?.totalEarnings ?? 0
  const avgPerDelivery = earnings?.avgPerDelivery ?? 0
  const pendingPayout = earnings?.pendingPayout ?? 0

  // Calculate "This Month" based on the last entry in the monthly chart
  const thisMonthEarnings = earnings?.monthlyChart && earnings.monthlyChart.length > 0
    ? earnings.monthlyChart[earnings.monthlyChart.length - 1].amount
    : 0

  return (
    <>
      <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Earnings</h1>
              <p className="text-muted-foreground">Track your earnings and payment history</p>
            </div>
            <Button 
              onClick={() => setIsWithdrawModalOpen(true)}
              className="bg-[#F10E7C] hover:bg-[#D40D6D] w-full sm:w-auto"
            >
              Withdraw Funds
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Wallet Balance"
              value={isLoading ? "..." : `₦${walletBalance.toLocaleString()}`}
              change="Available for Withdrawal"
              trend="up"
              icon={DollarSign}
            />
            <StatsCard
              title="Total Earnings"
              value={isLoading ? "..." : `₦${totalEarnings.toLocaleString()}`}
              change={`${earnings?.totalDeliveries || 0} Total Deliveries`}
              trend="up"
              icon={DollarSign}
            />
            <StatsCard 
              title="This Month" 
              value={isLoading ? "..." : `₦${thisMonthEarnings.toLocaleString()}`} 
              change="Monthly Activity" 
              trend="up" 
              icon={Package} 
            />
            <StatsCard
              title="Avg per Delivery"
              value={isLoading ? "..." : `₦${avgPerDelivery.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
              change="Delivery Performance"
              trend="up"
              icon={TrendingUp}
            />
            <StatsCard
              title="Pending Payout"
              value={isLoading ? "..." : `₦${pendingPayout.toLocaleString()}`}
              change="Pending Completions"
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

      {/* Withdrawal Modal */}
      <WithdrawalModal 
        isOpen={isWithdrawModalOpen} 
        onClose={() => setIsWithdrawModalOpen(false)} 
        balance={walletBalance}
        profile={profile}
      />
    </>
  )
}
