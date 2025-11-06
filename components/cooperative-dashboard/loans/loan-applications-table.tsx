"use client"

import { Search, SlidersHorizontal } from "lucide-react"

const applications = [
  {
    id: "LA001",
    member: "Marvin McKinney",
    memberId: "DAW-005",
    amount: "$10,000",
    purpose: "Open retail store",
    category: "Tier 1",
    status: "Shipped",
    guarantors: "2/3",
  },
  {
    id: "LA001",
    member: "Marvin McKinney",
    memberId: "DAW-005",
    amount: "$10,000",
    purpose: "Open retail store",
    category: "Tier 1",
    status: "Cancelled",
    guarantors: "2/3",
  },
  {
    id: "LA001",
    member: "Marvin McKinney",
    memberId: "DAW-005",
    amount: "$10,000",
    purpose: "Open retail store",
    category: "Tier 1",
    status: "Pending",
    guarantors: "2/3",
  },
  {
    id: "LA001",
    member: "Marvin McKinney",
    memberId: "DAW-005",
    amount: "$10,000",
    purpose: "Open retail store",
    category: "Tier 1",
    status: "Shipped",
    guarantors: "2/3",
  },
  {
    id: "LA001",
    member: "Marvin McKinney",
    memberId: "DAW-005",
    amount: "$10,000",
    purpose: "Open retail store",
    category: "Tier 1",
    status: "Pending",
    guarantors: "2/3",
  },
  {
    id: "LA001",
    member: "Marvin McKinney",
    memberId: "DAW-005",
    amount: "$10,000",
    purpose: "Open retail store",
    category: "Tier 1",
    status: "Shipped",
    guarantors: "2/3",
  },
  {
    id: "LA001",
    member: "Marvin McKinney",
    memberId: "DAW-005",
    amount: "$10,000",
    purpose: "Open retail store",
    category: "Tier 1",
    status: "Cancelled",
    guarantors: "2/3",
  },
  {
    id: "LA001",
    member: "Marvin McKinney",
    memberId: "DAW-005",
    amount: "$10,000",
    purpose: "Open retail store",
    category: "Tier 1",
    status: "Pending",
    guarantors: "2/3",
  },
  {
    id: "LA001",
    member: "Marvin McKinney",
    memberId: "DAW-005",
    amount: "$10,000",
    purpose: "Open retail store",
    category: "Tier 1",
    status: "Shipped",
    guarantors: "2/3",
  },
]

export function LoanApplicationsTable() {
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
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">ID No.</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Member</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Purpose</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Guarantors</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={index} className="border-b border-[#e4e7ec] transition-colors hover:bg-[#f9f9f9]">
                  <td className="px-6 py-4 text-sm text-[#222222]">{app.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-[#222222]">{app.member}</div>
                    <div className="text-xs text-[#838794]">{app.memberId}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#222222]">{app.amount}</td>
                  <td className="px-6 py-4 text-sm text-[#676767]">{app.purpose}</td>
                  <td className="px-6 py-4 text-sm text-[#676767]">{app.category}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                        app.status === "Shipped"
                          ? "bg-[#34c759]/10 text-[#34c759]"
                          : app.status === "Cancelled"
                            ? "bg-[#ff3b30]/10 text-[#ff3b30]"
                            : "bg-[#ff9500]/10 text-[#ff9500]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          app.status === "Shipped"
                            ? "bg-[#34c759]"
                            : app.status === "Cancelled"
                              ? "bg-[#ff3b30]"
                              : "bg-[#ff9500]"
                        }`}
                      />
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#676767]">{app.guarantors}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg bg-[#f0f2f5] px-4 py-2 text-sm font-medium text-[#676767] transition-colors hover:bg-[#e4e7ec]">
                        Review
                      </button>
                      {app.status === "Shipped" && (
                        <>
                          <button className="rounded-lg bg-[#f10e7c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d10d6a]">
                            Approve
                          </button>
                          <button className="rounded-lg bg-[#f10e7c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d10d6a]">
                            Reject
                          </button>
                        </>
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
        {applications.map((app, index) => (
          <div key={index} className="rounded-xl bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="mb-1 text-sm font-medium text-[#222222]">{app.member}</div>
                <div className="text-xs text-[#838794]">{app.memberId}</div>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                  app.status === "Shipped"
                    ? "bg-[#34c759]/10 text-[#34c759]"
                    : app.status === "Cancelled"
                      ? "bg-[#ff3b30]/10 text-[#ff3b30]"
                      : "bg-[#ff9500]/10 text-[#ff9500]"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    app.status === "Shipped"
                      ? "bg-[#34c759]"
                      : app.status === "Cancelled"
                        ? "bg-[#ff3b30]"
                        : "bg-[#ff9500]"
                  }`}
                />
                {app.status}
              </span>
            </div>
            <div className="mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#838794]">ID:</span>
                <span className="text-[#222222]">{app.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#838794]">Amount:</span>
                <span className="text-[#222222]">{app.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#838794]">Purpose:</span>
                <span className="text-[#222222]">{app.purpose}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#838794]">Category:</span>
                <span className="text-[#222222]">{app.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#838794]">Guarantors:</span>
                <span className="text-[#222222]">{app.guarantors}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 rounded-lg bg-[#f0f2f5] px-4 py-2 text-sm font-medium text-[#676767] transition-colors hover:bg-[#e4e7ec]">
                Review
              </button>
              {app.status === "Shipped" && (
                <>
                  <button className="flex-1 rounded-lg bg-[#f10e7c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d10d6a]">
                    Approve
                  </button>
                  <button className="flex-1 rounded-lg bg-[#f10e7c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d10d6a]">
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
