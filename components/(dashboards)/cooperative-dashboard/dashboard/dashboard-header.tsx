"use client";
import { Button } from "@/components/ui/button";
import { UserPlus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const router = useRouter();

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-[#1d1d2a] lg:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-[#838794]">
          Manage your cooperative members and track performance
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          className="gap-2 border-[#e4e7ec] bg-white text-[#1d1d2a] hover:bg-[#f7f7f7]"
        >
          <UserPlus className="h-4 w-4" />
          Invite Members
        </Button>
        {/* <Button
          onClick={() => router.push("/cooperatives/create/create-tier")}
          className="gap-2 bg-[#1d1d2a] text-white hover:bg-[#33363e]"
        >
          <Plus className="h-4 w-4" />
          Create Tier
        </Button> */}
      </div>
    </div>
  );
}
