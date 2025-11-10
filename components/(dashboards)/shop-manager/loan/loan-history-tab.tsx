export default function LoanHistoryTab() {
  const loans = [
    {
      id: "LN-001",
      purpose: "Inventory Purchase",
      status: "Active",
      repaid: 45000,
      remaining: 5000,
      originalAmount: 50000,
      dueDate: "July 15, 2024",
    },
    {
      id: "LN-001",
      purpose: "Inventory Purchase",
      status: "Active",
      repaid: 45000,
      remaining: 5000,
      originalAmount: 50000,
      dueDate: "July 15, 2024",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Loan History</h2>

      <div className="space-y-4">
        {loans.map((loan, index) => (
          <div key={index} className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">{loan.id}</h3>
                <p className="text-gray-600">{loan.purpose}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-600"></span>
                {loan.status}
              </span>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">Repaid: ₦{loan.repaid.toLocaleString()}</span>
                <span className="text-gray-600">Remaining: ₦{loan.remaining.toLocaleString()}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#f10e7c]"
                  style={{
                    width: `${(loan.repaid / loan.originalAmount) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between border-t pt-4">
              <div>
                <p className="text-sm text-gray-600">Original Amount</p>
                <p className="text-xl font-bold">₦{loan.originalAmount.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="text-xl font-bold">{loan.dueDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
