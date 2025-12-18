"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";

export async function approveMember(
  memberId: string
): Promise<IActionResponse> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    if (!memberId) {
      return { success: false, error: "Member ID is required" };
    }

    const response = await apiClient.put<{
      success: boolean;
      message?: string;
    }>(API_ENDPOINTS.USERS.UPDATE_USER(memberId), {}, { token });

    return {
      success: true,
      message: response.message || "Member approved successfully",
    };
  } catch (error) {
    console.error("Approve member error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to approve member";
    return { success: false, error: message };
  }
}
