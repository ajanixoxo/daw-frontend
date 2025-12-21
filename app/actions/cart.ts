"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession } from "@/app/actions/auth";
import type {
  IAddToCartRequest,
  IAddToCartResponse,
  IActionResponse,
  ICartResponse,
} from "@/types/product.types";
import { revalidatePath } from "next/cache";

export async function addToCart(
  data: IAddToCartRequest
): Promise<IActionResponse<IAddToCartResponse>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    console.log("Cart Action - Session found:", !!session);
    console.log("Cart Action - Token found:", !!token);
    if (token)
      console.log(
        "Cart Action - Token prefix:",
        token.substring(0, 10) + "..."
      );

    if (!token) {
      console.error("Cart Action - No token found in session");
      throw new Error("Authentication required");
    }

    const payload = {
      product_id: data.productId,
      quantity: data.quantity,
    };

    const response = await apiClient.post<IAddToCartResponse>(
      API_ENDPOINTS.CART.ADD_ITEM,
      payload,
      { token }
    );

    revalidatePath("/cart");
    return { success: true, data: response, message: "Item added to cart" };
  } catch (error) {
    console.error("Add to cart error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to add item to cart";
    return { success: false, error: message };
  }
}

export async function getCart(): Promise<IActionResponse<ICartResponse>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await apiClient.get<ICartResponse>(
      API_ENDPOINTS.CART.GET_CART,
      { token }
    );

    return { success: true, data: response };
  } catch (error) {
    console.error("Get cart error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch cart";
    return { success: false, error: message };
  }
}

export async function updateCartItem(
  cartItemId: string,
  quantity: number
): Promise<IActionResponse<IAddToCartResponse>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      throw new Error("Authentication required");
    }

    const payload = {
      quantity: quantity,
    };

    const response = await apiClient.put<IAddToCartResponse>(
      API_ENDPOINTS.CART.UPDATE_ITEM(cartItemId),
      payload,
      { token }
    );

    revalidatePath("/cart");
    return { success: true, data: response, message: "Cart item updated" };
  } catch (error) {
    console.error("Update cart item error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to update cart item";
    return { success: false, error: message };
  }
}

export async function removeCartItem(itemId: string): Promise<IActionResponse> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      throw new Error("Authentication required");
    }

    await apiClient.delete(
      API_ENDPOINTS.CART.REMOVE_ITEM(itemId),
      {},
      { token }
    );

    revalidatePath("/cart");
    return { success: true, message: "Removed" };
  } catch (error) {
    console.error("Remove cart item error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Failed to remove item from cart";
    return { success: false, error: message };
  }
}
