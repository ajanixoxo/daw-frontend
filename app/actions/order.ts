"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getFreshToken } from "@/app/actions/auth";
import { IActionResponse } from "@/types/product.types";
import { IGetAllOrdersResponse, IGetOrderResponse, IGetOrderStatusResponse } from "@/types/order.types";

export async function getAllOrders(): Promise<IActionResponse<IGetAllOrdersResponse>> {
  try {
    const token = await getFreshToken();
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
    const token = await getFreshToken();
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

export async function getOrderStatus(orderId: string): Promise<IActionResponse<IGetOrderStatusResponse>> {
  try {
    const token = await getFreshToken();
    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.get<IGetOrderStatusResponse>(
      API_ENDPOINTS.MARKETPLACE.ORDER_STATUS(orderId),
      { token }
    );

    return { success: true, data: response };
  } catch (error) {
    console.error("Get order status error:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch order status";
    return { success: false, error: message };
  }
}
