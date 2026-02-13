"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ContributionList } from "./contri-list";
import { LoanList } from "./loan-list";

export function MemberTabs({ memberId }: { memberId: string }) {
  const [activeTab, setActiveTab] = useState("contributions");

  return (
    <div>
      <div className="mb-6 flex box-border w-full gap-4 bg-white">
        <Button
          variant="ghost"
          className={`h-auto rounded-none w-1/2 cursor-pointer px-4 py-2 text-sm font-medium bg-transparent ${
            activeTab === "contributions"
              ? "bg-[#f10e7c] text-white rounded-lg"
              : "border-transparent text-[#838794] "
          }`}
          onClick={() => setActiveTab("contributions")}
        >
          Contributions
        </Button>
        <Button
          variant="ghost"
          className={`h-auto rounded-none w-1/2 cursor-pointer px-4 py-2 text-sm font-medium bg-transparent ${
            activeTab === "loans"
              ? "bg-[#f10e7c] text-white rounded-lg"
              : "border-transparent text-[#838794] "
          }`}
          onClick={() => setActiveTab("loans")}
        >
          Loan History
        </Button>
      </div>

      {activeTab === "contributions" ? (
        <ContributionList memberId={memberId} />
      ) : (
        <LoanList memberId={memberId} />
      )}
    </div>
  );
}
