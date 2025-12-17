"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession } from "@/app/actions/auth";
import { IActionResponse } from "@/types/product.types";
import { IGetAllOrdersResponse, IGetOrderResponse } from "@/types/order.types";

export async function getAllOrders(): Promise<IActionResponse<IGetAllOrdersResponse>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.get<IGetAllOrdersResponse>(
      API_ENDPOINTS.MARKETPLACE.GET_ALL_ORDERS,
      { token }
    );

    return { success: true, data: response };
  } catch (error) {
    console.error("Get all orders error:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch orders";
    return { success: false, error: message };
  }
}

export async function getOrder(orderId: string): Promise<IActionResponse<IGetOrderResponse>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.get<IGetOrderResponse>(
      API_ENDPOINTS.MARKETPLACE.GET_ORDER(orderId),
      { token }
    );

    return { success: true, data: response };
  } catch (error) {
    console.error("Get order error:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch order";
    return { success: false, error: message };
  }
}
