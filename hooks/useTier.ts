"use client";

import { useState } from "react";
import {
  createTier,
  updateTier,
  getAllTiersByCoopId,
} from "@/app/actions/tier";
import { CreateTierPayload, Tier } from "@/types/tier.types";

interface UpdateTierPayload extends Partial<CreateTierPayload> {
  id: string;
}

export function useTierActions() {
  const [tiers, setTiers] = useState<Tier[]>([]);

  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const fetchAll = async (cooperativeId: string) => {
    if (!cooperativeId) return;
    console.log(cooperativeId);
    setFetchLoading(true);
    setFetchError(null);
    try {
      const res = await getAllTiersByCoopId(cooperativeId);
      console.log("res", res.data);
      if (!res.success) {
        setFetchError(res.error || "Failed to fetch tiers");
        return;
      }
      setTiers(res.data || []);
    } finally {
      setFetchLoading(false);
    }
  };

  // Create new tier
  const create = async (payload: CreateTierPayload) => {
    if (!payload.cooperativeId) return;
    setCreateLoading(true);
    setCreateError(null);
    try {
      const res = await createTier(payload);
      if (!res.success) {
        setCreateError(res.error || "Failed to create tier");
        return;
      }
      alert(res.message);
      await fetchAll(payload.cooperativeId);
    } finally {
      setCreateLoading(false);
    }
  };

  // Update existing tier
  const update = async (
    payload: UpdateTierPayload & { cooperativeId: string }
  ) => {
    setUpdateLoading(true);
    setUpdateError(null);

    try {
      console.log("payload for update", payload);
      const res = await updateTier(payload);
      if (!res.success) {
        setUpdateError(res.error || "Failed to update tier");
        return;
      }
      alert(res.message);
      await fetchAll(payload.cooperativeId); // refresh tiers after update
    } finally {
      setUpdateLoading(false);
    }
  };

  return {
    tiers,
    fetchAll,
    fetchLoading,
    fetchError,
    create,
    createLoading,
    createError,
    update,
    updateLoading,
    updateError,
  };
}
