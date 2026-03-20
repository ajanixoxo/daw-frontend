"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyMemberProfile } from "@/app/actions/member";
import { fetchMember } from "@/app/actions/coop";
import { IMember } from "@/types/auth.types";
import { useState } from "react";

export const useMember = () => {
  return useQuery({
    queryKey: ["my-member-profile"],
    queryFn: async () => {
      const response = await getMyMemberProfile();
      if (!response.success) throw new Error(response.error);
      return response.data;
    }
  });
};

export const useFetchMembers = () => {
  const [members, setMembers] = useState<IMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllMembers = async (cooperativeId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchMember(cooperativeId);
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
