"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Plus } from "lucide-react"
import { InviteMembersDrawer } from "./invite-members-drawer"

export function MembersHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1d1d2a] lg:text-3xl">Members</h1>
          <p className="mt-1 text-sm text-[#838794] lg:text-base">Manage and invite members to your cooperative</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* <Button variant="outline" className="border-[#e4e7ec] bg-white text-[#1d1d2a] hover:bg-[#f5f5f5]">
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </Button> */}
          <Button className="bg-[#1d1d2a] text-white hover:bg-[#2d2d3a]" onClick={() => setIsDrawerOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Invite Members
          </Button>
        </div>
      </div>

      <InviteMembersDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  )
}
