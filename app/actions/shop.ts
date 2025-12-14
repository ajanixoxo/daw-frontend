"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession, refreshAccessToken } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";
import { ICreateShopRequest, ICreateShopResponse, IShop } from "@/types/shop.types";
import { revalidatePath } from "next/cache";

export async function createShop(data: ICreateShopRequest): Promise<IActionResponse<ICreateShopResponse>> {
  try {
    // Refresh token first
    await refreshAccessToken();
    
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.post<ICreateShopResponse>(
      API_ENDPOINTS.SHOPS.CREATE,
      data,
      { token }
    );

    revalidatePath("/sellers/shop");
    return { success: true, data: response, message: "Shop created successfully" };
  } catch (error) {
    console.error("Create shop error:", error);
    const message = error instanceof Error ? error.message : "Failed to create shop";
    return { success: false, error: message };
  }
}

export async function getUserShop(): Promise<IActionResponse<IShop>> {
  try {
    // Refresh token first
    await refreshAccessToken();
    
    const session = await getServerSession();
    const token = session?.accessToken;
    const userId = session?.userId;

    if (!token || !userId) {
      return { success: false, error: "Authentication required" };
    }

    // Try to get shop_id from token payload (if available)
    // For now, we'll need an endpoint to get user's shop
    // Since we don't have that endpoint, we'll return an error
    // In production, you'd decode the JWT token to get shop_id
    
    // TODO: Add endpoint to get user's shop by owner_id
    // For now, return error suggesting to create a shop first
    return { success: false, error: "Please create a shop first" };
  } catch (error) {
    console.error("Get user shop error:", error);
    const message = error instanceof Error ? error.message : "Failed to get user shop";
    return { success: false, error: message };
  }
}
