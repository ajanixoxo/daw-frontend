"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { createServerSession, getServerSession, destroyServerSession, refreshAccessToken } from "@/app/actions/auth";
import { 
  IActionResponse, 
  IForgotPasswordRequest, 
  IForgotPasswordResponse,
  IResetPasswordRequest,
  IResetPasswordResponse,
  ISessionData
} from "@/types/auth.types";

export async function forgotPassword(
  data: IForgotPasswordRequest
): Promise<IActionResponse> {
  try {
    const response = await apiClient.post<IForgotPasswordResponse>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      data
    );


    const sessionData: ISessionData = {
      userId: "", // Not available yet
      email: data.email,
      role: "buyer", // Default role
      isVerified: false,
      accessToken: response.token,
      refreshToken: "",
    };

    await createServerSession(sessionData);

    return { success: true, message: response.message };
  } catch (error) {
    console.error("Forgot password error:", error);
    const message = error instanceof Error ? error.message : "Failed to process forgot password request";
    return { success: false, error: message };
  }
}

export async function resetPassword(
  data: IResetPasswordRequest
): Promise<IActionResponse> {
  try {
    await refreshAccessToken();
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Session expired. Please try again." };
    }

    const response = await apiClient.post<IResetPasswordResponse>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      data,
      { token }
    );

   
    await destroyServerSession();

    return { success: true, message: response.message };
  } catch (error) {
    console.error("Reset password error:", error);
    const message = error instanceof Error ? error.message : "Failed to reset password";
    return { success: false, error: message };
  }
}
