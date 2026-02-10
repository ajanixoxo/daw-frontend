"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession, refreshAccessToken } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";
import { IWishlistResponse } from "@/types/wishlist.types";
import { revalidatePath } from "next/cache";

export async function addToWishlist(productId: string): Promise<IActionResponse> {
  try {
    await refreshAccessToken();
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Please login to add items to wishlist" };
    }

    await apiClient.post(
      API_ENDPOINTS.WISHLIST.ADD,
      { product_id: productId },
      { token }
    );

    revalidatePath("/profile");
    return { success: true, message: "Product added to wishlist" };
  } catch (error) {
    console.error("Add to wishlist error:", error);
    const message = error instanceof Error ? error.message : "Failed to add to wishlist";
    return { success: false, error: message };
  }
}

export async function removeFromWishlist(productId: string): Promise<IActionResponse> {
  try {
    await refreshAccessToken();
    const session = await getServerSession();
    const token = session?.accessToken;

    console.log("Remove from wishlist - Product ID:", productId);
    console.log("Remove from wishlist - Token exists:", !!token);

    if (!token) {
      return { success: false, error: "Please login to remove items from wishlist" };
    }

    // Using DELETE method as per pattern seen in cart removal
    await apiClient.delete(
      API_ENDPOINTS.WISHLIST.REMOVE(productId),
      undefined,
      { token }
    );

    revalidatePath("/profile");
    return { success: true, message: "Product removed from wishlist" };
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    const message = error instanceof Error ? error.message : "Failed to remove from wishlist";
    return { success: false, error: message };
  }
}

export async function getWishlist(): Promise<IActionResponse<IWishlistResponse>> {
  try {
    await refreshAccessToken();
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Please login to view wishlist" };
    }

    const response = await apiClient.get<IWishlistResponse>(
      API_ENDPOINTS.WISHLIST.GET,
      { token }
    );

    return { success: true, data: response };
  } catch (error) {
    console.error("Get wishlist error:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch wishlist";
    return { success: false, error: message };
  }
}
