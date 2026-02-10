"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession, refreshAccessToken } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";

export async function upgradeToSeller(): Promise<IActionResponse> {
  try {
    await refreshAccessToken();
    const session = await getServerSession();
    const token = session?.accessToken;
    const userId = session?.userId;

    if (!token || !userId) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.patch<{ success: boolean; message?: string }>(
      API_ENDPOINTS.USERS.UPGRADE_SELLER(userId),
      {},
      { token }
    );

    return { success: true, message: response.message || "Role upgraded to seller successfully" };
  } catch (error) {
    console.error("Upgrade role error:", error);
    const message = error instanceof Error ? error.message : "Failed to upgrade role";
    return { success: false, error: message };
  }
}





