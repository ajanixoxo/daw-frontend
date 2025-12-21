"use client";

import { useState } from "react";

import { Cooperative, createCooperative } from "@/app/actions/coop";

export interface CreateCooperativePayload {
  name: string;
  description: string;
  category: string;
  countryCode: string;
  phone: string;
  email: string;
  bylaws?: string;
  logo?: File | null;
  banner?: File | null;
}

type UseCreateCooperativeReturn = {
  createCoop: (
    payload: CreateCooperativePayload
  ) => Promise<Cooperative | null>;
  loading: boolean;
  error: string | null;
  success: boolean;
};

export const useCreateCooperative = (): UseCreateCooperativeReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createCoop = async (
    payload: CreateCooperativePayload
  ): Promise<Cooperative | null> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      console.log("payload for create coop", payload);
      const res = await createCooperative(payload);
      console.log("res", res);
      if (!res.success) {
        setError(res.error || "Failed to create cooperative");
        return null;
      }

      setSuccess(true);
      return res.data ?? null;
    } catch {
      setError("Something went wrong while creating cooperative");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createCoop,
    loading,
    error,
    success,
  };
};
