"use client"

import { useEffect, useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { getPendingApplications, approveLoanAction, rejectLoanAction, LoanRecord } from "@/app/actions/loans"

export function PendingApplicationsTable() {
  const [applications, setApplications] = useState<LoanRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchPending = async () => {
    try {
      setLoading(true)
      const result = await getPendingApplications()
      if (result.success && result.data) {
        setApplications(result.data)
      } else {
        throw new Error(result.error || "Failed to fetch pending applications")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPending() }, [])

  const handleApprove = async (id: string) => {
    const result = await approveLoanAction(id)
    if (result.success) fetchPending()
  }

  const handleReject = async (id: string) => {
    const result = await rejectLoanAction(id)
    if (result.success) fetchPending()
  }

  const filteredApps = applications.filter((a) =>
    a.member.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (error) {
    return <div className="rounded-xl bg-white p-6 shadow-sm"><p className="text-sm text-red-600">Error: {error}</p></div>
  }

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="border-b border-[#e4e7ec] animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-200 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-32 bg-gray-200 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-28 bg-gray-200 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-200 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-8 w-40 bg-gray-200 rounded" /></td>
                  </tr>
                ))
              ) : filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-[#838794]">
                    No pending applications
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app._id} className="border-b border-[#e4e7ec] transition-colors hover:bg-[#f9f9f9]">
                    <td className="px-6 py-4 text-sm text-[#222222]">{app._id.slice(-6).toUpperCase()}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-[#222222]">{app.member}</div>
                      <div className="text-xs text-[#838794]">{app.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#222222]">${app.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-[#676767]">{app.purpose || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-[#676767]">{app.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg bg-[#f0f2f5] px-4 py-2 text-sm font-medium text-[#676767] transition-colors hover:bg-[#e4e7ec]">
                          Review
                        </button>
                        <button
                          onClick={() => handleApprove(app._id)}
                          className="rounded-lg bg-[#f10e7c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d10d6a]"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(app._id)}
                          className="rounded-lg bg-[#ff3b30] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#e0282c]"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 lg:hidden">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="rounded-xl bg-white p-4 shadow-sm animate-pulse">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-40 bg-gray-200 rounded" />
              </div>
            </div>
          ))
        ) : filteredApps.length === 0 ? (
          <div className="text-center py-8 text-sm text-[#838794]">No pending applications</div>
        ) : (
          filteredApps.map((app) => (
            <div key={app._id} className="rounded-xl bg-white p-4 shadow-sm">
              <div className="mb-4">
                <div className="mb-1 text-sm font-medium text-[#222222]">{app.member}</div>
                <div className="text-xs text-[#838794]">{app._id.slice(-6).toUpperCase()}</div>
              </div>
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#838794]">Amount:</span>
                  <span className="text-[#222222]">${app.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#838794]">Purpose:</span>
                  <span className="text-[#222222]">{app.purpose || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#838794]">Category:</span>
                  <span className="text-[#222222]">{app.category}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 rounded-lg bg-[#f0f2f5] px-4 py-2 text-sm font-medium text-[#676767]">Review</button>
                <button onClick={() => handleApprove(app._id)} className="flex-1 rounded-lg bg-[#f10e7c] px-4 py-2 text-sm font-medium text-white">Approve</button>
                <button onClick={() => handleReject(app._id)} className="flex-1 rounded-lg bg-[#ff3b30] px-4 py-2 text-sm font-medium text-white">Reject</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
