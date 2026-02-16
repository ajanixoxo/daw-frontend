"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession, refreshAccessToken } from "@/app/actions/auth";
import { IActionResponse } from "@/types/product.types";
import { 
  IPlaceOrderRequest, 
  IPlaceOrderResponse, 
  IPaymentInitiateRequest, 
  IPaymentInitiateResponse,
  IPaymentVerifyResponse
} from "@/types/checkout.types";

export async function placeOrder(data: IPlaceOrderRequest): Promise<IActionResponse<IPlaceOrderResponse>> {
  try {
    await refreshAccessToken();
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.post<IPlaceOrderResponse>(
      API_ENDPOINTS.CHECKOUT.PLACE_ORDER,
      data,
      { token }
    );

    return { success: true, data: response, message: "Order placed successfully" };
  } catch (error) {
    console.error("Place order error:", error);
    const message = error instanceof Error ? error.message : "Failed to place order";
    return { success: false, error: message };
  }
}

export async function initiatePayment(data: IPaymentInitiateRequest): Promise<IActionResponse<IPaymentInitiateResponse>> {
  try {
    await refreshAccessToken();
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    console.log("Initiating payment with payload:", JSON.stringify(data, null, 2));

    const response = await apiClient.post<IPaymentInitiateResponse>(
      API_ENDPOINTS.PAYMENT.INITIATE,
      data,
      { token }
    );

    return { success: true, data: response, message: "Payment initiated" };
  } catch (error) {
    console.error("Initiate payment error:", error);
    const message = error instanceof Error ? error.message : "Failed to initiate payment";
    return { success: false, error: message };
  }
}

export async function verifyPayment(reference: string): Promise<IActionResponse<IPaymentVerifyResponse>> {
  try {
    await refreshAccessToken();
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    console.log("Verifying payment with reference:", reference);

    const response = await apiClient.get<IPaymentVerifyResponse>(
      API_ENDPOINTS.PAYMENT.VERIFY(reference),
      { token }
    );

    return { success: true, data: response, message: "Payment verified successfully" };
  } catch (error) {
    console.error("Verify payment error:", error);
    const message = error instanceof Error ? error.message : "Failed to verify payment";
    return { success: false, error: message };
  }
}
