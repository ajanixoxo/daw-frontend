"use client";

import { fetchMember } from "@/app/actions/coop";
import { IMember } from "@/types/auth.types";
import { useState } from "react";

export const useFetchMembers = () => {
  const [members, setMembers] = useState<IMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllMembers = async (cooperativeId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchMember(cooperativeId);
      console.log("fetch member ", res.data);
      if (!res.success) {
        setError(res.error || "Failed to fetch members");
        return;
      }

      setMembers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Something went wrong while fetching members");
    } finally {
      setLoading(false);
    }
  };

  return {
    members,
    fetchAllMembers,
    loading,
    error,
  };
};
