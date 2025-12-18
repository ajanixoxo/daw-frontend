"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";
import { CreateTierPayload } from "@/types/tier.types";

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
    console.log("payload in action", payload);
    const response = await apiClient.post<{
      success: boolean;
      message?: string;
    }>(API_ENDPOINTS.SUBSCRIPTION_TIERS.CREATE_TIER, payload, { token });

    return {
      success: true,
      message: response.message || "Subscription tier created successfully",
    };
  } catch (error) {
    console.error("Create tier error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create tier";
    return { success: false, error: message };
  }
}
