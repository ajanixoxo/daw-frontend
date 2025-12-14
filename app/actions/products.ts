"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession, refreshAccessToken } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";
import { IAddProductRequest, IAddProductResponse } from "@/types/product.types";
import { getShopIdFromToken } from "@/lib/utils/token";
import { revalidatePath } from "next/cache";

export async function addProduct(data: Omit<IAddProductRequest, 'shop_id'>): Promise<IActionResponse<IAddProductResponse>> {
  try {
    // Refresh token first
    await refreshAccessToken();
    
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    // Get shop_id from token
    const shop_id = getShopIdFromToken(token);
    
    if (!shop_id) {
      return { success: false, error: "Shop ID not found. Please create a shop first." };
    }

    const payload: IAddProductRequest = {
      ...data,
      shop_id,
    };

    const response = await apiClient.post<IAddProductResponse>(
      API_ENDPOINTS.MARKETPLACE.ADD_PRODUCT,
      payload,
      { token }
    );

    revalidatePath("/sellers/products");
    return { success: true, data: response, message: "Product added successfully" };
  } catch (error) {
    console.error("Add product error:", error);
    const message = error instanceof Error ? error.message : "Failed to add product";
    return { success: false, error: message };
  }
}

