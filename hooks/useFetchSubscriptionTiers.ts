"use client";

import { useState } from "react";
import { fetchSubscriptionTiers } from "@/app/actions/coop";
import { SubscriptionTier } from "@/app/actions/coop";

type UseFetchSubscriptionTiersReturn = {
  tiers: SubscriptionTier[];
  fetchAllTiers: (cooperativeId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
};

export const useFetchSubscriptionTiers =
  (): UseFetchSubscriptionTiersReturn => {
    const [tiers, setTiers] = useState<SubscriptionTier[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAllTiers = async (cooperativeId: string) => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetchSubscriptionTiers(cooperativeId);

        if (!res.success) {
          setError(res.error || "Failed to fetch subscription tiers");
          return;
        }

        setTiers(res.data ?? []);
      } catch {
        setError("Something went wrong while fetching subscription tiers");
      } finally {
        setLoading(false);
      }
    };

    return {
      tiers,
      fetchAllTiers,
      loading,
      error,
    };
  };
