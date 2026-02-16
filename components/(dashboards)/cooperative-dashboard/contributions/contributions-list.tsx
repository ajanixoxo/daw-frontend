"use client"

import { useEffect, useState } from "react"
import { Search, SlidersHorizontal, MoreVertical } from "lucide-react"
import { getAllContributions, ContributionRecord } from "@/app/actions/contributions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ContributionsList() {
  const [contributions, setContributions] = useState<ContributionRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true)
        const result = await getAllContributions()
        if (result.success && result.data) {
          setContributions(result.data)
        } else {
          throw new Error(result.error || "Failed to fetch contributions")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }
    fetchContributions()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
      case "completed":
        return "bg-[#e8f5e9] text-[#009a49]"
      case "missed":
      case "overdue":
        return "bg-[#ffece5] text-[#ff383c]"
      default:
        return "bg-[#fff4e6] text-[#f5b546]"
    }
  }

  const getStatusDot = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
      case "completed":
        return "bg-[#009a49]"
      case "missed":
      case "overdue":
        return "bg-[#ff383c]"
      default:
        return "bg-[#f5b546]"
    }
  }

  const filteredContributions = contributions.filter((c) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch = c.member.toLowerCase().includes(query) || c.type.toLowerCase().includes(query)
    const matchesStatus = statusFilter === "all" || c.status.toLowerCase() === statusFilter
    
    // Group "paid" and "completed" if needed
    if (statusFilter === "completed") {
        return matchesSearch && (c.status === "paid" || c.status === "completed")
    }
    
    return matchesSearch && matchesStatus
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
        <h2 className="text-lg font-semibold text-[#000000] sm:text-xl">All Contributions</h2>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center gap-2 rounded-lg border border-[#e4e7ec] bg-white px-4 py-2 text-sm font-medium text-[#000000] transition-colors hover:bg-[#f5f5f5]">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                <DropdownMenuRadioItem value="all">All Contributions</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="completed">Completed/Paid</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="overdue">Overdue/Missed</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-[#e4e7ec] animate-pulse">
                  <td className="px-4 py-4"><div className="h-4 w-32 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-28 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
                  <td className="px-4 py-4"><div className="h-6 w-20 bg-gray-200 rounded-full" /></td>
                  <td className="px-4 py-4"><div className="h-8 w-24 bg-gray-200 rounded" /></td>
                </tr>
              ))
            ) : filteredContributions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-[#838794]">
                  No contributions found
                </td>
              </tr>
            ) : (
              filteredContributions.map((contribution) => (
                <tr key={contribution._id} className="border-b border-[#e4e7ec] transition-colors hover:bg-[#f7f7f7]">
                  <td className="px-4 py-4 text-sm font-medium text-[#000000]">{contribution.member}</td>
                  <td className="px-4 py-4 text-sm text-[#676767]">{contribution.type}</td>
                  <td className="px-4 py-4 text-sm text-[#000000]">${contribution.amount.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-[#676767]">{formatDate(contribution.date)}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(contribution.status)}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${getStatusDot(contribution.status)}`} />
                      {contribution.status === "paid" ? "Completed" : contribution.status === "missed" ? "Overdue" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="rounded-lg bg-[#f0f2f5] px-4 py-2 text-sm font-medium text-[#676767] transition-colors hover:bg-[#e4e7ec]">
                      View Details
                    </button>
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
        ) : filteredContributions.length === 0 ? (
          <div className="text-center py-8 text-sm text-[#838794]">No contributions found</div>
        ) : (
          filteredContributions.map((contribution) => (
            <div key={contribution._id} className="rounded-lg border border-[#e4e7ec] p-4">
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
                  <div className="font-medium text-[#000000]">${contribution.amount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="mb-1 text-[#676767]">Date</div>
                  <div className="text-[#676767]">{formatDate(contribution.date)}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(contribution.status)}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${getStatusDot(contribution.status)}`} />
                  {contribution.status === "paid" ? "Completed" : contribution.status === "missed" ? "Overdue" : "Pending"}
                </span>
                <button className="rounded-lg bg-[#f0f2f5] px-4 py-2 text-sm font-medium text-[#676767]">
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
