"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Plus } from "lucide-react";
//import { InviteMembersDrawer } from "./invite-members-drawer"

export function MemberHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1d1d2a] lg:text-3xl">
            Member Profile
          </h1>
          <p className="mt-1 text-sm text-[#838794] lg:text-base">
            View member details and shop
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="border-[#e4e7ec] bg-white text-[#1d1d2a] hover:bg-[#f5f5f5]"
          >
            <Copy className="mr-2 h-4 w-4" />
            Share Shop
          </Button>
        </div>
      </div>
    </>
  );
}
