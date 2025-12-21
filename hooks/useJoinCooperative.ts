import {
  fetchAllCooperatives,
  fetchCooperativeById,
  joinCooperative,
} from "@/app/actions/coop";
import { JoinCooperativePayload, ICooperative } from "@/types/Coop.types";
import { useState } from "react";

export const useCooperative = () => {
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [joinSuccess, setJoinSuccess] = useState(false);

  const [cooperatives, setCooperatives] = useState<ICooperative[]>([]);
  const [isLoadingCooperatives, setIsLoadingCooperatives] = useState(false);
  const [cooperativesError, setCooperativesError] = useState<string | null>(
    null
  );

  const [cooperative, setCooperative] = useState<ICooperative | null>(null);
  const [isLoadingCooperative, setIsLoadingCooperative] = useState(false);
  const [cooperativeError, setCooperativeError] = useState<string | null>(null);

  const join = async (payload: JoinCooperativePayload) => {
    try {
      setIsJoining(true);
      setJoinError(null);
      setJoinSuccess(false);

      const response = await joinCooperative(payload);

      if (!response.success) {
        throw new Error(response.error);
      }
      console.log("join ", response);
      setJoinSuccess(true);
      return response.data;
    } catch (err: any) {
      setJoinError(err.message || "Failed to join cooperative");
      throw err;
    } finally {
      setIsJoining(false);
    }
  };

  const loadCooperatives = async () => {
    try {
      setIsLoadingCooperatives(true);
      setCooperativesError(null);

      const response = await fetchAllCooperatives();

      if (!response.success) {
        throw new Error(response.error);
      }

      // Map to ICooperative
      const formattedCoops: ICooperative[] = (response.data ?? []).map(
        (coop: any) => ({
          _id: coop._id,
          adminId: coop.adminId,
          name: coop.name,
          description: coop.description,
          subscriptionTiers: coop.subscriptionTiers ?? [],
        })
      );

      setCooperatives(formattedCoops);
    } catch (err: any) {
      setCooperativesError(err.message || "Failed to load cooperatives");
    } finally {
      setIsLoadingCooperatives(false);
    }
  };

  const loadCooperativeById = async (id: string) => {
    try {
      setIsLoadingCooperative(true);
      setCooperativeError(null);

      const response = await fetchCooperativeById(id);

      if (!response.success) {
        throw new Error(response.error);
      }

      setCooperative((response.data as unknown as ICooperative) ?? null);
    } catch (err: any) {
      setCooperativeError(err.message || "Failed to load cooperative");
    } finally {
      setIsLoadingCooperative(false);
    }
  };

  return {
    join,
    isJoining,
    joinError,
    joinSuccess,

    cooperatives,
    loadCooperatives,
    isLoadingCooperatives,
    cooperativesError,

    cooperative,
    loadCooperativeById,
    isLoadingCooperative,
    cooperativeError,
  };
};
