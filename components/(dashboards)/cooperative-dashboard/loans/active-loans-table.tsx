"use client"

import { Search, SlidersHorizontal } from "lucide-react"

const loans = [
  {
    id: "LN001",
    member: "Marvin McKinney",
    category: "Tier 1",
    principal: "$10,000",
    outstanding: "$5,000",
    guarantors: 50,
    dueDate: "Apr 12, 2025",
    status: "Current",
  },
  {
    id: "LN001",
    member: "Marvin McKinney",
    category: "Tier 1",
    principal: "$10,000",
    outstanding: "$10,000",
    guarantors: 50,
    dueDate: "Apr 12, 2025",
    status: "Overdue",
  },
  {
    id: "LN001",
    member: "Marvin McKinney",
    category: "Tier 1",
    principal: "$10,000",
    outstanding: "$10,000",
    guarantors: 50,
    dueDate: "Apr 12, 2025",
    status: "Current",
  },
  {
    id: "LN001",
    member: "Marvin McKinney",
    category: "Tier 1",
    principal: "$10,000",
    outstanding: "$10,000",
    guarantors: 50,
    dueDate: "Apr 12, 2025",
    status: "Overdue",
  },
  {
    id: "LN001",
    member: "Marvin McKinney",
    category: "Tier 1",
    principal: "$10,000",
    outstanding: "$10,000",
    guarantors: 50,
    dueDate: "Apr 12, 2025",
    status: "Current",
  },
  {
    id: "LN001",
    member: "Marvin McKinney",
    category: "Tier 1",
    principal: "$10,000",
    outstanding: "$10,000",
    guarantors: 50,
    dueDate: "Apr 12, 2025",
    status: "Current",
  },
  {
    id: "LN001",
    member: "Marvin McKinney",
    category: "Tier 1",
    principal: "$10,000",
    outstanding: "$10,000",
    guarantors: 50,
    dueDate: "Apr 12, 2025",
    status: "Overdue",
  },
  {
    id: "LN001",
    member: "Marvin McKinney",
    category: "Tier 1",
    principal: "$10,000",
    outstanding: "$10,000",
    guarantors: 50,
    dueDate: "Apr 12, 2025",
    status: "Current",
  },
  {
    id: "LN001",
    member: "Marvin McKinney",
    category: "Tier 1",
    principal: "$10,000",
    outstanding: "$10,000",
    guarantors: 50,
    dueDate: "Apr 12, 2025",
    status: "Overdue",
  },
]

export function ActiveLoansTable() {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-[#222222]">Pending Applications</h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#838794]" />
            <input
              type="text"
              placeholder="Search here..."
              className="w-full rounded-lg border border-[#e4e7ec] bg-white py-2.5 pl-10 pr-4 text-sm text-[#222222] placeholder:text-[#838794] focus:border-[#f10e7c] focus:outline-none"
            />
          </div>
          <button className="flex items-center justify-center gap-2 rounded-lg border border-[#e4e7ec] bg-white px-4 py-2.5 text-sm font-medium text-[#222222] transition-colors hover:bg-[#f5f5f5]">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e4e7ec] bg-[#f9f9f9]">
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Loan ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Member</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Principal</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Outstanding</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Guarantors</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, index) => (
                <tr key={index} className="border-b border-[#e4e7ec] transition-colors hover:bg-[#f9f9f9]">
                  <td className="px-6 py-4 text-sm text-[#222222]">{loan.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#222222]">{loan.member}</td>
                  <td className="px-6 py-4 text-sm text-[#676767]">{loan.category}</td>
                  <td className="px-6 py-4 text-sm text-[#222222]">{loan.principal}</td>
                  <td className="px-6 py-4 text-sm text-[#222222]">{loan.outstanding}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-[#e4e7ec]">
                        <div className="h-full rounded-full bg-[#f10e7c]" style={{ width: `${loan.guarantors}%` }} />
                      </div>
                      <span className="text-sm text-[#676767]">{loan.guarantors}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#676767]">{loan.dueDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                        loan.status === "Current" ? "bg-[#34c759]/10 text-[#34c759]" : "bg-[#ff3b30]/10 text-[#ff3b30]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${loan.status === "Current" ? "bg-[#34c759]" : "bg-[#ff3b30]"}`}
                      />
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg bg-[#f0f2f5] px-4 py-2 text-sm font-medium text-[#676767] transition-colors hover:bg-[#e4e7ec]">
                        View Details
                      </button>
                      {loan.status === "Overdue" && (
                        <button className="rounded-lg bg-[#f10e7c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d10d6a]">
                          Send Reminder
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 lg:hidden">
        {loans.map((loan, index) => (
          <div key={index} className="rounded-xl bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="mb-1 text-sm font-medium text-[#222222]">{loan.member}</div>
                <div className="text-xs text-[#838794]">{loan.id}</div>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                  loan.status === "Current" ? "bg-[#34c759]/10 text-[#34c759]" : "bg-[#ff3b30]/10 text-[#ff3b30]"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${loan.status === "Current" ? "bg-[#34c759]" : "bg-[#ff3b30]"}`}
                />
                {loan.status}
              </span>
            </div>
            <div className="mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#838794]">Category:</span>
                <span className="text-[#222222]">{loan.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#838794]">Principal:</span>
                <span className="text-[#222222]">{loan.principal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#838794]">Outstanding:</span>
                <span className="text-[#222222]">{loan.outstanding}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#838794]">Due Date:</span>
                <span className="text-[#222222]">{loan.dueDate}</span>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-[#838794]">Guarantors</span>
                  <span className="text-[#676767]">{loan.guarantors}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#e4e7ec]">
                  <div className="h-full rounded-full bg-[#f10e7c]" style={{ width: `${loan.guarantors}%` }} />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 rounded-lg bg-[#f0f2f5] px-4 py-2 text-sm font-medium text-[#676767] transition-colors hover:bg-[#e4e7ec]">
                View Details
              </button>
              {loan.status === "Overdue" && (
                <button className="flex-1 rounded-lg bg-[#f10e7c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d10d6a]">
                  Send Reminder
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
