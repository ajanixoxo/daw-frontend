"use client";

import { approveMember } from "@/app/actions/member";
import { useState } from "react";

export function useApproveMember() {
  const [loading, setLoading] = useState(false);

  const approve = async (memberId: string) => {
    try {
      setLoading(true);
      const res = await approveMember(memberId);

      if (!res.success) {
        alert(res.error || "Approval failed");
        return;
      }

      alert("Member approved successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { approve, loading };
}
