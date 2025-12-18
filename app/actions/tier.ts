"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";
import { CreateTierPayload, Tier } from "@/types/tier.types";

interface GetAllTiersResponse extends IActionResponse {
  data?: Tier[];
}

interface UpdateTierPayload extends Partial<CreateTierPayload> {
  id: string;
}

export async function createTier(
  payload: CreateTierPayload
): Promise<IActionResponse> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    if (!payload?.name || !payload?.cooperativeId) {
      return { success: false, error: "Invalid tier data" };
    }

    const response = await apiClient.post<{
      success: boolean;
      message?: string;
    }>(API_ENDPOINTS.SUBSCRIPTION_TIERS.CREATE_TIER, payload, { token });

    return {
      success: true,
      message: response.message || "Subscription tier created successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create tier";
    return { success: false, error: message };
  }
}

export async function updateTier(
  payload: UpdateTierPayload
): Promise<IActionResponse> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    if (!payload?.id) {
      return { success: false, error: "Tier ID is required" };
    }

    const { id, ...updateData } = payload;

    const response = await apiClient.put<{
      success: boolean;
      message?: string;
    }>(API_ENDPOINTS.SUBSCRIPTION_TIERS.UPDATE(id), updateData, { token });

    return {
      success: true,
      message: response.message || "Subscription tier updated successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update tier";
    return { success: false, error: message };
  }
}

export async function getAllTiersByCoopId(
  cooperativeId: string
): Promise<GetAllTiersResponse> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    if (!cooperativeId) {
      return { success: false, error: "Cooperative ID is required" };
    }

    const response = await apiClient.get<{
      success: boolean;
      data: Tier[];
    }>(API_ENDPOINTS.SUBSCRIPTION_TIERS.GET_ALL(cooperativeId), {
      token,
    });
    console.log("respsne", response);

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch tiers";
    return { success: false, error: message };
  }
}
