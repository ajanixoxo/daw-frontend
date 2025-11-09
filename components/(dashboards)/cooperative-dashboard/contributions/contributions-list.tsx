"use client"

import { Search, SlidersHorizontal, MoreVertical } from "lucide-react"

const contributions = [
  {
    member: "Marvin McKinney",
    type: "Monthly Savings",
    amount: "$10,000",
    date: "Apr 12, 2025",
    status: "Completed",
  },
  {
    member: "Marvin McKinney",
    type: "Target Savings - Education",
    amount: "$10,000",
    date: "Apr 12, 2025",
    status: "Overdue",
  },
  {
    member: "Marvin McKinney",
    type: "Monthly Savings",
    amount: "$10,000",
    date: "Apr 12, 2025",
    status: "Completed",
  },
  {
    member: "Marvin McKinney",
    type: "Investment Pool Q1",
    amount: "$10,000",
    date: "Apr 12, 2025",
    status: "Overdue",
  },
  {
    member: "Marvin McKinney",
    type: "Target Savings - Education",
    amount: "$10,000",
    date: "Apr 12, 2025",
    status: "Completed",
  },
  {
    member: "Marvin McKinney",
    type: "Monthly Savings",
    amount: "$10,000",
    date: "Apr 12, 2025",
    status: "Completed",
  },
  {
    member: "Marvin McKinney",
    type: "Investment Pool Q1",
    amount: "$10,000",
    date: "Apr 12, 2025",
    status: "Completed",
  },
  {
    member: "Marvin McKinney",
    type: "Target Savings - Education",
    amount: "$10,000",
    date: "Apr 12, 2025",
    status: "Overdue",
  },
  {
    member: "Marvin McKinney",
    type: "Investment Pool Q1",
    amount: "$10,000",
    date: "Apr 12, 2025",
    status: "Completed",
  },
  {
    member: "Marvin McKinney",
    type: "Monthly Savings",
    amount: "$10,000",
    date: "Apr 12, 2025",
    status: "Overdue",
  },
]

export function ContributionsList() {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-[#000000] sm:text-xl">All Contributions</h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#676767]" />
            <input
              type="text"
              placeholder="Search here..."
              className="w-full rounded-lg border border-[#e4e7ec] bg-white py-2 pl-10 pr-4 text-sm text-[#000000] placeholder:text-[#676767] focus:border-[#f10e7c] focus:outline-none focus:ring-1 focus:ring-[#f10e7c] sm:w-[280px]"
            />
          </div>
          <button className="flex items-center justify-center gap-2 rounded-lg border border-[#e4e7ec] bg-white px-4 py-2 text-sm font-medium text-[#000000] transition-colors hover:bg-[#f5f5f5]">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e4e7ec] bg-[#f7f7f7]">
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Member</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((contribution, index) => (
              <tr key={index} className="border-b border-[#e4e7ec] transition-colors hover:bg-[#f7f7f7]">
                <td className="px-4 py-4 text-sm font-medium text-[#000000]">{contribution.member}</td>
                <td className="px-4 py-4 text-sm text-[#676767]">{contribution.type}</td>
                <td className="px-4 py-4 text-sm text-[#000000]">{contribution.amount}</td>
                <td className="px-4 py-4 text-sm text-[#676767]">{contribution.date}</td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      contribution.status === "Completed"
                        ? "bg-[#e8f5e9] text-[#009a49]"
                        : "bg-[#ffece5] text-[#ff383c]"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        contribution.status === "Completed" ? "bg-[#009a49]" : "bg-[#ff383c]"
                      }`}
                    />
                    {contribution.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button className="rounded-lg bg-[#f0f2f5] px-4 py-2 text-sm font-medium text-[#676767] transition-colors hover:bg-[#e4e7ec]">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 lg:hidden">
        {contributions.map((contribution, index) => (
          <div key={index} className="rounded-lg border border-[#e4e7ec] p-4">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <div className="mb-1 font-medium text-[#000000]">{contribution.member}</div>
                <div className="text-sm text-[#676767]">{contribution.type}</div>
              </div>
              <button className="text-[#676767]">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="mb-1 text-[#676767]">Amount</div>
                <div className="font-medium text-[#000000]">{contribution.amount}</div>
              </div>
              <div>
                <div className="mb-1 text-[#676767]">Date</div>
                <div className="text-[#676767]">{contribution.date}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                  contribution.status === "Completed" ? "bg-[#e8f5e9] text-[#009a49]" : "bg-[#ffece5] text-[#ff383c]"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    contribution.status === "Completed" ? "bg-[#009a49]" : "bg-[#ff383c]"
                  }`}
                />
                {contribution.status}
              </span>
              <button className="rounded-lg bg-[#f0f2f5] px-4 py-2 text-sm font-medium text-[#676767]">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
