"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession, refreshAccessToken } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";
import { IVerifyNinRequest, IVerifyNinResponse } from "@/types/kyc.types";

export async function verifyNin(data: { nin: string }): Promise<IActionResponse<IVerifyNinResponse>> {
  try {
    await refreshAccessToken();
    const session = await getServerSession();
    const token = session?.accessToken;
    const userId = session?.userId;

    if (!token || !userId) {
      return { success: false, error: "Authentication required" };
    }

    const payload: IVerifyNinRequest = {
      userId,
      nin: data.nin,
    };

    const response = await apiClient.post<IVerifyNinResponse>(
      API_ENDPOINTS.KYC.VERIFY_NIN,
      payload,
      { token }
    );

    return { success: true, data: response, message: "KYC verification successful" };
  } catch (error) {
    console.error("KYC verification error:", error);
    const message = error instanceof Error ? error.message : "Failed to verify KYC";
    return { success: false, error: message };
  }
}





