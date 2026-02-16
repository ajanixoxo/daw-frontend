"use client"

import { useEffect, useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { getLoanEligibility, LoanEligibilityRecord } from "@/app/actions/contributions"

export function LoanEligibilityList() {
  const [records, setRecords] = useState<LoanEligibilityRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getLoanEligibility()
        if (result.success && result.data) {
          setRecords(result.data)
        } else {
          throw new Error(result.error || "Failed to fetch loan eligibility")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "eligible":
        return "bg-[#e8f5e9] text-[#009a49]"
      case "under_review":
        return "bg-[#fff4e6] text-[#f5b546]"
      default:
        return "bg-[#f0f2f5] text-[#676767]"
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case "eligible": return "bg-[#009a49]"
      case "under_review": return "bg-[#f5b546]"
      default: return "bg-[#676767]"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "eligible": return "Eligible"
      case "under_review": return "Under Review"
      default: return "Ineligible"
    }
  }

  const filteredRecords = records.filter((r) => {
    const query = searchQuery.toLowerCase()
    return r.memberName.toLowerCase().includes(query) || r.type.toLowerCase().includes(query)
  })

  if (error) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <p className="text-sm text-red-600">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-[#000000] sm:text-xl">Loan Eligibility Tracking</h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#676767]" />
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Total Contributions</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Contribution Months</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-[#e4e7ec] animate-pulse">
                  <td className="px-4 py-4"><div className="h-4 w-32 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-28 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-6 w-20 bg-gray-200 rounded-full" /></td>
                  <td className="px-4 py-4"><div className="h-8 w-24 bg-gray-200 rounded" /></td>
                </tr>
              ))
            ) : filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-[#838794]">
                  No loan eligibility records found
                </td>
              </tr>
            ) : (
              filteredRecords.map((record, index) => (
                <tr key={`${record.memberId}-${index}`} className="border-b border-[#e4e7ec] transition-colors hover:bg-[#f7f7f7]">
                  <td className="px-4 py-4 text-sm font-medium text-[#000000]">{record.memberName}</td>
                  <td className="px-4 py-4 text-sm text-[#000000]">${record.totalContributions.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-[#676767]">{record.type}</td>
                  <td className="px-4 py-4 text-sm text-[#676767]">
                    {record.contributionMonths} Month{record.contributionMonths !== 1 ? "s" : ""}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(record.status)}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${getStatusDot(record.status)}`} />
                      {getStatusLabel(record.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg bg-[#f0f2f5] px-4 py-2 text-sm font-medium text-[#676767] transition-colors hover:bg-[#e4e7ec]">
                        Review
                      </button>
                      {record.status === "under_review" && (
                        <>
                          <button className="rounded-lg bg-[#009a49] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#008040]">
                            Approve
                          </button>
                          <button className="rounded-lg bg-[#ff383c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#e0282c]">
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 lg:hidden">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="rounded-lg border border-[#e4e7ec] p-4 animate-pulse">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-40 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          ))
        ) : filteredRecords.length === 0 ? (
          <div className="text-center py-8 text-sm text-[#838794]">No loan eligibility records found</div>
        ) : (
          filteredRecords.map((record, index) => (
            <div key={`${record.memberId}-${index}`} className="rounded-lg border border-[#e4e7ec] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-medium text-[#000000]">{record.memberName}</span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(record.status)}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${getStatusDot(record.status)}`} />
                  {getStatusLabel(record.status)}
                </span>
              </div>
              <div className="mb-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="mb-1 text-[#676767]">Total</div>
                  <div className="font-medium text-[#000000]">${record.totalContributions.toLocaleString()}</div>
                </div>
                <div>
                  <div className="mb-1 text-[#676767]">Type</div>
                  <div className="text-[#676767]">{record.type}</div>
                </div>
                <div>
                  <div className="mb-1 text-[#676767]">Months</div>
                  <div className="font-medium text-[#000000]">{record.contributionMonths}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-lg bg-[#f0f2f5] px-3 py-1.5 text-sm font-medium text-[#676767]">Review</button>
                {record.status === "under_review" && (
                  <>
                    <button className="rounded-lg bg-[#009a49] px-3 py-1.5 text-sm font-medium text-white">Approve</button>
                    <button className="rounded-lg bg-[#ff383c] px-3 py-1.5 text-sm font-medium text-white">Reject</button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
