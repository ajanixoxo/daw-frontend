"use client"

import { useEffect, useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { getCooperativeLoans } from "@/app/actions/loans"
import { ILoanAdminRecord } from "@/types/loan.types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ActiveLoansTable() {
  const [loans, setLoans] = useState<ILoanAdminRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setLoading(true)
        const result = await getCooperativeLoans()
        if (result.success && result.data) {
          setLoans(result.data)
        } else {
          throw new Error(result.error || "Failed to fetch active loans")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }
    fetchLoans()
  }, [])

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
  }

  const getStatusStyle = (status: string) => {
    if (status === "approved" || status === "disbursed") return "bg-[#34c759]/10 text-[#34c759]"
    return "bg-[#ff3b30]/10 text-[#ff3b30]"
  }

  const getStatusDot = (status: string) => {
    if (status === "approved" || status === "disbursed") return "bg-[#34c759]"
    return "bg-[#ff3b30]"
  }

  const getStatusLabel = (status: string) => {
    if (status === "approved" || status === "disbursed") return "Current"
    return "Overdue"
  }

  const filteredLoans = loans.filter((l) => {
    const matchesSearch = l.member.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || l.status.toLowerCase() === statusFilter
    // Combine "approved" and "disbursed" as "active" if needed, or keep separate
    // For now, simple matching. If user wants "Active" to mean both, we can adjust.
    // Let's assume the dropdown has "approved" and "overdue" specific values.
    
    // Improved logic for grouped statuses if needed:
    if (statusFilter === "active") {
        return matchesSearch && (l.status === "approved" || l.status === "disbursed")
    }
    
    return matchesSearch && matchesStatus
  })

  if (error) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p className="text-sm text-red-600">Error: {error}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-[#222222]">Active Loans</h2>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center gap-2 rounded-lg border border-[#e4e7ec] bg-white px-4 py-2.5 text-sm font-medium text-[#222222] transition-colors hover:bg-[#f5f5f5]">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                <DropdownMenuRadioItem value="all">All Loans</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="active">Active (Approved/Disbursed)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="overdue">Overdue</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="completed">Completed</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#838794]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-[#e4e7ec] animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-200 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-32 bg-gray-200 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-200 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
                    <td className="px-6 py-4"><div className="h-6 w-20 bg-gray-200 rounded-full" /></td>
                    <td className="px-6 py-4"><div className="h-8 w-24 bg-gray-200 rounded" /></td>
                  </tr>
                ))
              ) : filteredLoans.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-sm text-[#838794]">
                    No active loans found
                  </td>
                </tr>
              ) : (
                filteredLoans.map((loan) => (
                  <tr key={loan._id} className="border-b border-[#e4e7ec] transition-colors hover:bg-[#f9f9f9]">
                    <td className="px-6 py-4 text-sm text-[#222222]">{loan._id.slice(-6).toUpperCase()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#222222]">{loan.member}</td>
                    <td className="px-6 py-4 text-sm text-[#676767]">{loan.loanProduct}</td>
                    <td className="px-6 py-4 text-sm text-[#222222]">{loan.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-[#222222]">{loan.outstanding.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-[#676767]">{formatDate(loan.dueDate)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(loan.status)}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${getStatusDot(loan.status)}`} />
                        {getStatusLabel(loan.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
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
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 lg:hidden">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="rounded-xl bg-white p-4 shadow-sm animate-pulse">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-40 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          ))
        ) : filteredLoans.length === 0 ? (
          <div className="text-center py-8 text-sm text-[#838794]">No active loans found</div>
        ) : (
          filteredLoans.map((loan) => (
            <div key={loan._id} className="rounded-xl bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="mb-1 text-sm font-medium text-[#222222]">{loan.member}</div>
                  <div className="text-xs text-[#838794]">{loan._id.slice(-6).toUpperCase()}</div>
                </div>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(loan.status)}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${getStatusDot(loan.status)}`} />
                  {getStatusLabel(loan.status)}
                </span>
              </div>
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#838794]">Category:</span>
                  <span className="text-[#222222]">{loan.loanProduct}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#838794]">Principal:</span>
                  <span className="text-[#222222]">{loan.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#838794]">Outstanding:</span>
                  <span className="text-[#222222]">{loan.outstanding.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#838794]">Due Date:</span>
                  <span className="text-[#222222]">{formatDate(loan.dueDate)}</span>
                </div>
              </div>
              <button className="w-full rounded-lg bg-[#f0f2f5] px-4 py-2 text-sm font-medium text-[#676767] transition-colors hover:bg-[#e4e7ec]">
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
