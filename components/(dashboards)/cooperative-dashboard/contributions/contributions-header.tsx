"use client"

import { useState } from "react"
import { CreateContributionDrawer } from "./create-contribution-drawer"

export function ContributionsHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#000000] sm:text-3xl">Contributions</h1>
          <p className="mt-1 text-sm text-[#676767] sm:text-base">
            Manage contribution types and track member participation
          </p>
        </div>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#000000] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#222222]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Contribution
        </button>
      </div>

      <CreateContributionDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  )
}
