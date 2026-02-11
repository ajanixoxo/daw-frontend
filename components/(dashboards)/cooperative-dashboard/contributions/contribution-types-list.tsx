"use client"

import { useEffect, useState } from "react"
import {
  getContributionTypes,
  updateContributionTypeStatusAction,
  ContributionTypeRecord,
} from "@/app/actions/contributions"

export function ContributionTypesList() {
  const [types, setTypes] = useState<ContributionTypeRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTypes = async () => {
    try {
      setLoading(true)
      const result = await getContributionTypes()
      if (result.success && result.data) {
        setTypes(result.data)
      } else {
        throw new Error(result.error || "Failed to fetch contribution types")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTypes()
  }, [])

  const handleStatusUpdate = async (id: string, status: "active" | "rejected") => {
    const result = await updateContributionTypeStatusAction(id, status)
    if (result.success) {
      fetchTypes() // Refresh list
    }
  }

  const formatType = (type: string) => {
    switch (type) {
      case "recurring": return "Recurring"
      case "target-based": return "Target-based"
      case "investment": return "Investment"
      case "one-time": return "One-time"
      default: return type
    }
  }

  const formatFrequency = (frequency: string, type: string) => {
    if (type !== "recurring") return `$${0..toLocaleString()}`
    return frequency.charAt(0).toUpperCase() + frequency.slice(1)
  }

  if (error) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <p className="text-sm text-red-600">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
      <h2 className="mb-6 text-lg font-semibold text-[#000000] sm:text-xl">Contribution Types</h2>

      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e4e7ec] bg-[#f7f7f7]">
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Frequency/Target</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Members</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#676767]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(4)].map((_, i) => (
                <tr key={i} className="border-b border-[#e4e7ec] animate-pulse">
                  <td className="px-4 py-4"><div className="h-4 w-32 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-12 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-8 w-32 bg-gray-200 rounded" /></td>
                </tr>
              ))
            ) : types.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-[#838794]">
                  No contribution types created yet
                </td>
              </tr>
            ) : (
              types.map((ct) => (
                <tr key={ct._id} className="border-b border-[#e4e7ec] transition-colors hover:bg-[#f7f7f7]">
                  <td className="px-4 py-4 text-sm font-medium text-[#000000]">{ct.name}</td>
                  <td className="px-4 py-4 text-sm text-[#676767]">{formatType(ct.type)}</td>
                  <td className="px-4 py-4 text-sm text-[#676767]">
                    {ct.type === "recurring" ? formatFrequency(ct.frequency, ct.type) : `$${ct.amount.toLocaleString()}`}
                  </td>
                  <td className="px-4 py-4 text-sm text-[#000000]">${ct.amount.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-[#000000]">{ct.memberCount}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg bg-[#f0f2f5] px-4 py-2 text-sm font-medium text-[#676767] transition-colors hover:bg-[#e4e7ec]">
                        Review
                      </button>
                      {ct.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(ct._id, "active")}
                            className="rounded-lg bg-[#009a49] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#008040]"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(ct._id, "rejected")}
                            className="rounded-lg bg-[#ff383c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#e0282c]"
                          >
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
          [...Array(4)].map((_, i) => (
            <div key={i} className="rounded-lg border border-[#e4e7ec] p-4 animate-pulse">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-40 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          ))
        ) : types.length === 0 ? (
          <div className="text-center py-8 text-sm text-[#838794]">No contribution types created yet</div>
        ) : (
          types.map((ct) => (
            <div key={ct._id} className="rounded-lg border border-[#e4e7ec] p-4">
              <div className="mb-3">
                <div className="mb-1 font-medium text-[#000000]">{ct.name}</div>
                <div className="text-sm text-[#676767]">{formatType(ct.type)}</div>
              </div>
              <div className="mb-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="mb-1 text-[#676767]">Amount</div>
                  <div className="font-medium text-[#000000]">${ct.amount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="mb-1 text-[#676767]">Members</div>
                  <div className="font-medium text-[#000000]">{ct.memberCount}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-lg bg-[#f0f2f5] px-3 py-1.5 text-sm font-medium text-[#676767]">Review</button>
                {ct.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(ct._id, "active")}
                      className="rounded-lg bg-[#009a49] px-3 py-1.5 text-sm font-medium text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(ct._id, "rejected")}
                      className="rounded-lg bg-[#ff383c] px-3 py-1.5 text-sm font-medium text-white"
                    >
                      Reject
                    </button>
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
