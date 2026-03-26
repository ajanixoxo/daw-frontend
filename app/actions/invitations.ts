"use server";

import { getFreshToken } from "@/app/actions/auth";
import { apiClient } from "@/lib/api/client";

interface InviteMemberParams {
  email: string;
  role: "seller" | "admin";
  firstName: string;
  lastName?: string;
  phone?: string;
}

interface InviteMemberResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
}

export async function inviteMember(params: InviteMemberParams): Promise<InviteMemberResponse> {
  try {
    const token = await getFreshToken();

    if (!token) {
      return { success: false, error: "Not authenticated" };
    }

    // Call the backend API
    const response = await apiClient.post<InviteMemberResponse>(
      "/api/cooperative/invitation/invite", 
      params,
      { token }
    );

    return {
      success: true,
      message: response.message || "Invitation sent successfully",
      data: response.data,
    };
  } catch (error: any) {

    console.error("Error inviting member:", error);
    return {
      success: false,
      error: error.message || "Failed to send invitation",
    };
  }
}
