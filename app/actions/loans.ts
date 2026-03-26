"use server";

import { apiClient } from "@/lib/api/client";
import { getFreshToken } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";
import { 
  ILoan, 
  ILoanProduct, 
  ILoanApplication, 
  IEligibilityResponse,
  ILoanAdminRecord
} from "@/types/loan.types";

// ---------- Helper ----------

async function getDawCoopId(): Promise<string | null> {
  try {
    const coopResponse = await apiClient.get<{
      success: boolean;
      cooperative: { _id: string };
    }>("/api/cooperatives/daw");
    return coopResponse?.cooperative?._id || null;
  } catch {
    return null;
  }
}

// ---------- Loan Products ----------

export async function getLoanProducts(): Promise<IActionResponse<ILoanProduct[]>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const response = await apiClient.get<{ success: boolean; data: ILoanProduct[] }>(
      "/api/loans/products",
      { token }
    );

    return { success: true, data: response.data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch loan products";
    return { success: false, error: message };
  }
}

// ---------- Borrowing Flow ----------

export async function checkLoanEligibilityAction(loanProductId: string): Promise<IActionResponse<IEligibilityResponse>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const response = await apiClient.get<{ success: boolean; data: IEligibilityResponse }>(
      `/api/loans/check-eligibility/${loanProductId}`,
      { token }
    );

    return { success: true, data: response.data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to check eligibility";
    return { success: false, error: message };
  }
}

export async function applyForLoanAction(data: ILoanApplication): Promise<IActionResponse<ILoan>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const response = await apiClient.post<{ success: boolean; data: ILoan }>(
      "/api/loans/apply",
      data,
      { token }
    );

    return { success: true, data: response.data, message: "Application submitted successfully" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit application";
    return { success: false, error: message };
  }
}

export async function getMyLoans(): Promise<IActionResponse<ILoan[]>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const response = await apiClient.get<{ success: boolean; data: ILoan[] }>(
      "/api/loans/my-loans",
      { token }
    );

    return { success: true, data: response.data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch your loans";
    return { success: false, error: message };
  }
}

// ---------- Administrative Flow ----------

export async function getCooperativeLoans(status?: string): Promise<IActionResponse<ILoanAdminRecord[]>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const cooperativeId = await getDawCoopId();
    if (!cooperativeId) return { success: false, error: "Cooperative not found" };

    const url = status 
      ? `/api/loans/cooperative/${cooperativeId}?status=${status}`
      : `/api/loans/cooperative/${cooperativeId}`;

    const response = await apiClient.get<{ success: boolean; data: ILoanAdminRecord[] }>(
      url,
      { token }
    );

    return { success: true, data: response.data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch cooperative loans";
    return { success: false, error: message };
  }
}

export async function updateLoanStatus(
  id: string, 
  action: "review" | "approve" | "reject" | "disburse",
  payload: any = {}
): Promise<IActionResponse<ILoan>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const response = await apiClient.patch<{ success: boolean; data: ILoan }>(
      `/api/loans/${id}/${action}`,
      payload,
      { token }
    );

    return { success: true, data: response.data, message: `Loan ${action}d successfully` };
  } catch (error) {
    const message = error instanceof Error ? error.message : `Failed to ${action} loan`;
    return { success: false, error: message };
  }
}

export async function getLoanStats(): Promise<IActionResponse<any>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const cooperativeId = await getDawCoopId();
    if (!cooperativeId) return { success: false, error: "Cooperative not found" };

    const response = await apiClient.get<{ success: boolean; data: any }>(
      `/api/loans/cooperative/${cooperativeId}/stats`,
      { token }
    );

    return { success: true, data: response.data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch loan stats";
    return { success: false, error: message };
  }
}
