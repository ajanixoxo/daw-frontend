const paymentHistory = [
  { date: "Apr 12, 2025", reference: "CTN001234", method: "Mobile Money", amount: "$25,000", status: "completed" },
  { date: "Apr 12, 2025", reference: "CTN001234", method: "Card", amount: "$25,000", status: "completed" },
  { date: "Apr 12, 2025", reference: "CTN001234", method: "Bank Transfer", amount: "$25,000", status: "completed" },
  { date: "Apr 12, 2025", reference: "CTN001234", method: "Card", amount: "$25,000", status: "completed" },
  { date: "Apr 12, 2025", reference: "CTN001234", method: "Card", amount: "$25,000", status: "completed" },
  { date: "Apr 12, 2025", reference: "CTN001234", method: "Card", amount: "$25,000", status: "completed" },
  { date: "Apr 12, 2025", reference: "Marvin McKinney", method: "Turtleneck", amount: "$17.84", status: "cancelled" },
  { date: "Apr 12, 2025", reference: "Marvin McKinney", method: "Turtleneck", amount: "$17.84", status: "pending" },
  { date: "Apr 12, 2025", reference: "Marvin McKinney", method: "Turtleneck", amount: "$17.84", status: "shipped" },
  { date: "Apr 12, 2025", reference: "Marvin McKinney", method: "Turtleneck", amount: "$17.84", status: "cancelled" },
]

const statusStyles = {
  completed: "text-[#34c759] bg-[#e8f8ee]",
  cancelled: "text-[#ff383c] bg-[#ffecec]",
  pending: "text-[#ff8d28] bg-[#fff4ec]",
  shipped: "text-[#34c759] bg-[#e8f8ee]",
}

export function PaymentHistoryTable() {
  return (
    <div className="bg-white rounded-xl border border-[#e4e7ec] overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f9f9f9] border-b border-[#e4e7ec]">
              <th className="px-6 py-4 text-left text-sm font-medium text-[#667185]">Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#667185]">Reference</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#667185]">Method</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#667185]">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#667185]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e4e7ec]">
            {paymentHistory.map((payment, index) => (
              <tr key={index} className="hover:bg-[#fafafa] transition-colors">
                <td className="px-6 py-4 text-sm text-[#0f0f0f]">{payment.date}</td>
                <td className="px-6 py-4 text-sm text-[#0f0f0f]">{payment.reference}</td>
                <td className="px-6 py-4 text-sm text-[#0f0f0f]">{payment.method}</td>
                <td className="px-6 py-4 text-sm text-[#0f0f0f]">{payment.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusStyles[payment.status as keyof typeof statusStyles]}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-[#e4e7ec]">
        {paymentHistory.map((payment, index) => (
          <div key={index} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium text-[#0f0f0f]">{payment.reference}</div>
                <div className="text-sm text-[#667185] mt-1">{payment.date}</div>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusStyles[payment.status as keyof typeof statusStyles]}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#667185]">{payment.method}</span>
              <span className="font-semibold text-[#0f0f0f]">{payment.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
