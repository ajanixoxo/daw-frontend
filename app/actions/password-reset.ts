"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { createServerSession, destroyServerSession, getFreshToken } from "@/app/actions/auth";
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
): Promise<IActionResponse<IForgotPasswordResponse>> {
  try {
    const response = await apiClient.post<IForgotPasswordResponse>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      data
    );

    return { 
      success: true, 
      message: response.message,
      data: response 
    };
  } catch (error) {
    console.error("Forgot password error:", error);
    const message = error instanceof Error ? error.message : "Failed to process forgot password request";
    return { success: false, error: message };
  }
}

export async function resetPassword(
  data: IResetPasswordRequest,
  token: string
): Promise<IActionResponse> {
  try {
    if (!token) {
      return { success: false, error: "Reset token is missing. Please try again." };
    }

    const response = await apiClient.post<IResetPasswordResponse>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      data,
      { token }
    );

    return { success: true, message: response.message };
  } catch (error) {
    console.error("Reset password error:", error);
    const message = error instanceof Error ? error.message : "Failed to reset password";
    return { success: false, error: message };
  }
}
