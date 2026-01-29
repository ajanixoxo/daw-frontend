"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession } from "@/app/actions/auth";
import { IActionResponse, IUser } from "@/types/auth.types";

interface IProfileResponse {
  success: boolean;
  user: IUser;
}

export async function getUserProfile(): Promise<IActionResponse<IUser>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Please login to view profile" };
    }

    const response = await apiClient.get<IProfileResponse>(
      API_ENDPOINTS.AUTH.PROFILE,
      { token }
    );

    if (!response.success || !response.user) {
      return { success: false, error: "Failed to fetch user profile" };
    }

    return { success: true, data: response.user };
  } catch (error) {
    console.error("Get profile error:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch profile";
    return { success: false, error: message };
  }
}

interface ISellerDocumentsMeResponse {
  hasDocuments: boolean;
  status?: string;
}

export async function getSellerDocumentsMe(): Promise<
  IActionResponse<{ hasDocuments: boolean }>
> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Please login" };
    }

    const response = await apiClient.get<ISellerDocumentsMeResponse>(
      API_ENDPOINTS.SHOPS.SELLER_DOCUMENTS_ME,
      { token }
    );

    return {
      success: true,
      data: { hasDocuments: response?.hasDocuments ?? false },
    };
  } catch (error) {
    console.error("Get seller documents error:", error);
    return { success: true, data: { hasDocuments: false } };
  }
}
