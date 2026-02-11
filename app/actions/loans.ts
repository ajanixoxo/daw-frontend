"use server";

import { apiClient } from "@/lib/api/client";
import { getServerSession } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";

// ---------- Interfaces ----------

export interface LoanStats {
  totalDisbursed: number;
  activeLoans: number;
  repaymentRate: number;
  overdueLoans: number;
  overdueAmount: number;
}

export interface LoanRecord {
  _id: string;
  member: string;
  email: string;
  category: string;
  amount: number;
  outstanding: number;
  interestRate: number;
  purpose: string;
  durationMonths: number;
  status: string;
  createdAt: string;
  dueDate: string | null;
  repayments: { date: string; amount: number; transactionId: string }[];
}

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

// ---------- Server Actions ----------

export async function getLoanStats(): Promise<IActionResponse<LoanStats>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;
    if (!token) return { success: false, error: "Authentication required" };

    const cooperativeId = await getDawCoopId();
    if (!cooperativeId) return { success: false, error: "Cooperative not found" };

    const response = await apiClient.get<{ success: boolean; data: LoanStats }>(
      `/api/loans/cooperative/${cooperativeId}/stats`,
      { token }
    );

    return { success: true, data: response.data, message: "Stats fetched" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch loan stats";
    return { success: false, error: message };
  }
}

export async function getActiveLoans(): Promise<IActionResponse<LoanRecord[]>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;
    if (!token) return { success: false, error: "Authentication required" };

    const cooperativeId = await getDawCoopId();
    if (!cooperativeId) return { success: false, error: "Cooperative not found" };

    const response = await apiClient.get<{ success: boolean; data: LoanRecord[] }>(
      `/api/loans/cooperative/${cooperativeId}?status=approved`,
      { token }
    );

    // Also get disbursed loans
    const disbursedResponse = await apiClient.get<{ success: boolean; data: LoanRecord[] }>(
      `/api/loans/cooperative/${cooperativeId}?status=disbursed`,
      { token }
    );

    const all = [...(response.data || []), ...(disbursedResponse.data || [])];
    return { success: true, data: all, message: "Active loans fetched" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch active loans";
    return { success: false, error: message };
  }
}

export async function getPendingApplications(): Promise<IActionResponse<LoanRecord[]>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;
    if (!token) return { success: false, error: "Authentication required" };

    const cooperativeId = await getDawCoopId();
    if (!cooperativeId) return { success: false, error: "Cooperative not found" };

    const response = await apiClient.get<{ success: boolean; data: LoanRecord[] }>(
      `/api/loans/cooperative/${cooperativeId}?status=pending`,
      { token }
    );

    return { success: true, data: response.data, message: "Pending applications fetched" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch pending applications";
    return { success: false, error: message };
  }
}

export async function getAllLoanApplications(): Promise<IActionResponse<LoanRecord[]>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;
    if (!token) return { success: false, error: "Authentication required" };

    const cooperativeId = await getDawCoopId();
    if (!cooperativeId) return { success: false, error: "Cooperative not found" };

    const response = await apiClient.get<{ success: boolean; data: LoanRecord[] }>(
      `/api/loans/cooperative/${cooperativeId}`,
      { token }
    );

    return { success: true, data: response.data, message: "All applications fetched" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch loan applications";
    return { success: false, error: message };
  }
}

export async function approveLoanAction(id: string): Promise<IActionResponse<LoanRecord>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;
    if (!token) return { success: false, error: "Authentication required" };

    const response = await apiClient.put<{ success: boolean; data: LoanRecord }>(
      `/api/loans/${id}/approve`,
      {},
      { token }
    );

    return { success: true, data: response.data, message: "Loan approved" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to approve loan";
    return { success: false, error: message };
  }
}

export async function rejectLoanAction(id: string): Promise<IActionResponse<LoanRecord>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;
    if (!token) return { success: false, error: "Authentication required" };

    const response = await apiClient.put<{ success: boolean; data: LoanRecord }>(
      `/api/loans/${id}/reject`,
      {},
      { token }
    );

    return { success: true, data: response.data, message: "Loan rejected" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to reject loan";
    return { success: false, error: message };
  }
}
