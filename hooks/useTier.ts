"use client";

import { useState } from "react";
//import { createTier } from "@/app/actions/createTier";
//import { CreateTierPayload } from "@/types/subscription.types";
import { createTier } from "@/app/actions/tier";
import { CreateTierPayload } from "@/types/tier.types";

export function useCreateTier() {
  const [loading, setLoading] = useState(false);

  const create = async (payload: CreateTierPayload) => {
    console.log("payload", payload);
    setLoading(true);
    const res = await createTier(payload);
    setLoading(false);

    if (!res.success) {
      alert(res.error);
      return;
    }

    alert(res.message);
  };

  return { create, loading };
}
