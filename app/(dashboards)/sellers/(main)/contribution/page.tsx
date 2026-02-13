import { Search, SlidersHorizontal, CreditCard, DollarSign, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard } from "@/components/(dashboards)/sellers-dashboard/stat-card"

const paymentHistory = [
  {
    date: "Apr 12, 2025",
    reference: "CTN001234",
    method: "Mobile Money",
    amount: "$25,000",
    status: "Completed",
  },
  {
    date: "Apr 12, 2025",
    reference: "CTN001234",
    method: "Card",
    amount: "$25,000",
    status: "Completed",
  },
  {
    date: "Apr 12, 2025",
    reference: "CTN001234",
    method: "Bank Transfer",
    amount: "$25,000",
    status: "Completed",
  },
  {
    date: "Apr 12, 2025",
    reference: "CTN001234",
    method: "Card",
    amount: "$25,000",
    status: "Completed",
  },
  {
    date: "Apr 12, 2025",
    reference: "CTN001234",
    method: "Card",
    amount: "$25,000",
    status: "Completed",
  },
  {
    date: "Apr 12, 2025",
    reference: "CTN001234",
    method: "Card",
    amount: "$25,000",
    status: "Completed",
  },
  {
    date: "Apr 12, 2025",
    reference: "Marvin McKinney",
    method: "Turtleneck",
    amount: "$17.84",
    status: "Cancelled",
  },
  {
    date: "Apr 12, 2025",
    reference: "Marvin McKinney",
    method: "Turtleneck",
    amount: "$17.84",
    status: "Pending",
  },
  {
    date: "Apr 12, 2025",
    reference: "Marvin McKinney",
    method: "Turtleneck",
    amount: "$17.84",
    status: "Shipped",
  },
  {
    date: "Apr 12, 2025",
    reference: "Marvin McKinney",
    method: "Turtleneck",
    amount: "$17.84",
    status: "Cancelled",
  },
]

export default function ContributionPage() {
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
            value="Silver"
            subtitle="Contribution: ₦25,000"
            iconColor="#E6007A"
          />
          <StatCard
            icon={DollarSign}
            title="Total Contributions"
            value="₦145,000"
            subtitleHighlight="4"
            subtitle="Payments"
            trend="up"
            iconColor="#E6007A"
          />
          <StatCard
            icon={Calendar}
            title="Last Payment"
            value="15/10/2025"
            subtitle="₦50,000"
            iconColor="#E6007A"
          />
        </div>

        {/* Make a Contribution Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#000000] mb-1">Make a Contribution</h2>
          <p className="text-[#667185] text-sm mb-6">
            Your contribution amount is fixed based on your Silver tier membership
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contribution Amount Card */}
            <Card className="bg-white border-0 shadow-sm p-6">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f0f2f5] rounded-full text-xs font-medium text-[#1d2739]">
                  <span className="w-2 h-2 rounded-full bg-[#1d2739]" />
                  Silver Tier
                </span>
              </div>

              <div className="text-center mb-6">
                <p className="text-5xl font-bold text-[#f10e7c] mb-2">$25,000</p>
                <p className="text-[#667185] text-sm">Contribution Amount</p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#e4e7ec]">
                <p className="text-[#667185] text-sm">This is your fixed monthly contribution amount</p>
                <div className="text-right">
                  <p className="text-[#667185] text-xs mb-1">Due Date</p>
                  <p className="text-[#1d2739] text-sm font-semibold">July 15, 2024</p>
                </div>
              </div>
            </Card>

            {/* Payment Method Card */}
            <Card className="bg-white border-0 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-[#000000] mb-6">Payment Method</h3>

              <div className="space-y-4">
                <Select>
                  <SelectTrigger className="w-full border-[#e4e7ec] text-[#667185]">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mobile-money">Mobile Money</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="w-full bg-[#f10e7c] hover:bg-[#d00d6a] text-white py-6 text-base font-medium">
                  Proceed to Payment
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
                  <TableHead className="text-[#475367] font-medium text-xs">Reference</TableHead>
                  <TableHead className="text-[#475367] font-medium text-xs">Method</TableHead>
                  <TableHead className="text-[#475367] font-medium text-xs">Amount</TableHead>
                  <TableHead className="text-[#475367] font-medium text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment, index) => (
                  <TableRow key={index} className="border-b border-[#e4e7ec]">
                    <TableCell className="text-[#1d2739] text-sm">{payment.date}</TableCell>
                    <TableCell className="text-[#1d2739] text-sm">{payment.reference}</TableCell>
                    <TableCell className="text-[#1d2739] text-sm">{payment.method}</TableCell>
                    <TableCell className="text-[#1d2739] text-sm font-medium">{payment.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          payment.status === "Completed" || payment.status === "Shipped"
                            ? "bg-[#e7f6ec] text-[#009a49]"
                            : payment.status === "Cancelled"
                              ? "bg-[#ffece5] text-[#ad3307]"
                              : "bg-[#ffe7cc] text-[#f56630]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            payment.status === "Completed" || payment.status === "Shipped"
                              ? "bg-[#009a49]"
                              : payment.status === "Cancelled"
                                ? "bg-[#ad3307]"
                                : "bg-[#f56630]"
                          }`}
                        />
                        {payment.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
