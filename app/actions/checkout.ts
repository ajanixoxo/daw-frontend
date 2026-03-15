"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getFreshToken } from "@/app/actions/auth";
import { IActionResponse } from "@/types/product.types";
import {
  IPlaceOrderRequest,
  IPlaceOrderResponse,
  IPaymentInitiateRequest,
  IPaymentInitiateResponse,
  IPaymentVerifyResponse,
  IPaystackInitiateRequest,
  IPaystackInitiateResponse,
  IPaystackVerifyResponse,
  IPaypalCreateOrderRequest,
  IPaypalCreateOrderResponse,
  IPaypalCaptureResponse,
} from "@/types/checkout.types";

export async function placeOrder(data: IPlaceOrderRequest): Promise<IActionResponse<IPlaceOrderResponse>> {
  try {
    const token = await getFreshToken();
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
    const token = await getFreshToken();
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

// ── Paystack ──────────────────────────────────────────────────────────────────

export async function initiatePaystackPayment(
  data: IPaystackInitiateRequest
): Promise<IActionResponse<IPaystackInitiateResponse>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const response = await apiClient.post<IPaystackInitiateResponse>(
      API_ENDPOINTS.PAYSTACK.INITIALIZE,
      data,
      { token }
    );
    return { success: true, data: response, message: "Paystack payment initiated" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to initiate Paystack payment";
    return { success: false, error: message };
  }
}

export async function verifyPaystackPayment(
  reference: string
): Promise<IActionResponse<IPaystackVerifyResponse>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const response = await apiClient.post<IPaystackVerifyResponse>(
      API_ENDPOINTS.PAYSTACK.VERIFY,
      { reference },
      { token }
    );
    return { success: true, data: response, message: "Payment verified" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to verify Paystack payment";
    return { success: false, error: message };
  }
}

// ── PayPal ────────────────────────────────────────────────────────────────────

export async function initiatePaypalOrder(
  data: IPaypalCreateOrderRequest
): Promise<IActionResponse<IPaypalCreateOrderResponse>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const response = await apiClient.post<IPaypalCreateOrderResponse>(
      API_ENDPOINTS.PAYPAL.CREATE_ORDER,
      data,
      { token }
    );
    return { success: true, data: response, message: "PayPal order created" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create PayPal order";
    return { success: false, error: message };
  }
}

export async function capturePaypalOrder(
  paypalOrderId: string
): Promise<IActionResponse<IPaypalCaptureResponse>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const response = await apiClient.post<IPaypalCaptureResponse>(
      API_ENDPOINTS.PAYPAL.CAPTURE_ORDER,
      { paypalOrderId },
      { token }
    );
    return { success: true, data: response, message: "PayPal payment captured" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to capture PayPal payment";
    return { success: false, error: message };
  }
}

// ── Vigipay verify (existing) ─────────────────────────────────────────────────

export async function verifyPayment(reference: string): Promise<IActionResponse<IPaymentVerifyResponse>> {
  try {
    const token = await getFreshToken();
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
