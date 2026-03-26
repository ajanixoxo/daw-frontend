"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy } from "lucide-react";

export function MemberHeader() {
  const router = useRouter();

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e4e7ec] bg-white hover:bg-[#f5f5f5] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-[#1d1d2a]" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#1d1d2a] lg:text-3xl">
            Member Profile
          </h1>
          <p className="mt-1 text-sm text-[#838794] lg:text-base">
            View member details and shop
          </p>
        </div>
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
  );
}
