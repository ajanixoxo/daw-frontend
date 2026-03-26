"use server";

import { apiClient } from "@/lib/api/client";
import { getFreshToken } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";

// ---------- Interfaces ----------

export interface ContributionSummary {
  currentTier: string;
  monthlyAmount: number;
  lastContributionAmount: number;
  lastContributionDate: string | null;
  nextDueDate: string;
  status: string;
}

export interface ContributionHistoryItem {
  _id: string;
  memberId: string;
  cooperativeId: string;
  amount: number;
  month: string;
  status: "paid" | "missed" | "pending";
  paidAt: string | null;
  createdAt: string;
}

export interface ContributionStats {
  totalContributions: number;
  activeMembers: number;
  loanEligible: number;
  overdueContributions: number;
  overdueAmount: number;
}

export interface ContributionRecord {
  _id: string;
  member: string;
  email: string;
  type: string;
  amount: number;
  date: string;
  status: string;
}

export interface ContributionTypeRecord {
  _id: string;
  name: string;
  type: string;
  frequency: string;
  amount: number;
  loanEligibilityMonths: number;
  status: string;
  memberCount: number;
  createdAt: string;
}

export interface LoanEligibilityRecord {
  memberId: string;
  memberName: string;
  email: string;
  totalContributions: number;
  type: string;
  contributionMonths: number;
  status: string;
}

// ---------- Helper: get cooperative ID ----------

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

/**
 * Get contribution stats for the DAW cooperative
 */
export async function getContributionStats(): Promise<
  IActionResponse<ContributionStats>
> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const cooperativeId = await getDawCoopId();
    if (!cooperativeId) return { success: false, error: "Cooperative not found" };

    const response = await apiClient.get<{ success: boolean; data: ContributionStats }>(
      `/api/contributions/cooperative/${cooperativeId}/stats`,
      { token }
    );

    return {
      success: true,
      data: response.data,
      message: "Stats fetched successfully",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch stats";
    return { success: false, error: message };
  }
}

/**
 * Get all contributions for the DAW cooperative
 */
export async function getAllContributions(): Promise<
  IActionResponse<ContributionRecord[]>
> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const cooperativeId = await getDawCoopId();
    if (!cooperativeId) return { success: false, error: "Cooperative not found" };

    const response = await apiClient.get<{ success: boolean; data: ContributionRecord[] }>(
      `/api/contributions/cooperative/${cooperativeId}`,
      { token }
    );

    return {
      success: true,
      data: response.data,
      message: "Contributions fetched successfully",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch contributions";
    return { success: false, error: message };
  }
}


/**
 * Get contributions for a specific member
 */
export async function getMemberContributions(
  memberId: string
): Promise<IActionResponse<ContributionRecord[]>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const response = await apiClient.get<{ success: boolean; data: ContributionRecord[] | any[] }>(
      `/api/contributions/member/${memberId}`,
      { token }
    );

    // Initial response seems to be the array directly based on listByMember controller
    // "return res.json(list);" in controller.
    // listByMember calls ContributionService.getMemberContributions which returns array.
    // So response might be array directly or {data: array} depending on apiClient wrapper.
    // Client wrapper usually returns data property of axios response.
    // If backend returns plain array, axios response.data is array.
    // But apiClient might expect standard response format { success: boolean, data: ... }
    
    // Let's verify apiClient implementation (I viewed it earlier).
    // It returns data directly: return response.data;
    // So if backend returns array, response is array.
    // But my types say { success: boolean, data: ... }
    
    // Wait, let's look at listByMember controller again.
    // return res.json(list);
    // So it returns array directly.
    // My previous actions assumed { success: boolean, data: ... } 
    // because listCooperativeContributions returned that structure.
    
    // I need to standardize or handle both.
    // For now, I'll assume array if not success/data object.
    
    const rawData = response as any;
    const data = Array.isArray(rawData) ? rawData : rawData.data || [];

    return {
      success: true,
      data: data,
      message: "Member contributions fetched successfully",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch member contributions";
    return { success: false, error: message };
  }
}

/**
 * Get contribution types for the DAW cooperative
 */
export async function getContributionTypes(): Promise<
  IActionResponse<ContributionTypeRecord[]>
> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const cooperativeId = await getDawCoopId();
    if (!cooperativeId) return { success: false, error: "Cooperative not found" };

    const response = await apiClient.get<{ success: boolean; data: ContributionTypeRecord[] }>(
      `/api/contributions/types/cooperative/${cooperativeId}`,
      { token }
    );

    return {
      success: true,
      data: response.data,
      message: "Contribution types fetched successfully",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch contribution types";
    return { success: false, error: message };
  }
}

/**
 * Get loan eligibility data for the DAW cooperative
 */
export async function getLoanEligibility(): Promise<
  IActionResponse<LoanEligibilityRecord[]>
> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const cooperativeId = await getDawCoopId();
    if (!cooperativeId) return { success: false, error: "Cooperative not found" };

    const response = await apiClient.get<{ success: boolean; data: LoanEligibilityRecord[] }>(
      `/api/contributions/cooperative/${cooperativeId}/loan-eligibility`,
      { token }
    );

    return {
      success: true,
      data: response.data,
      message: "Loan eligibility fetched successfully",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch loan eligibility";
    return { success: false, error: message };
  }
}

/**
 * Create a new contribution type
 */
export async function createContributionTypeAction(formData: {
  name: string;
  type: string;
  frequency: string;
  amount: number;
  loanEligibilityMonths?: number;
}): Promise<IActionResponse<ContributionTypeRecord>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const cooperativeId = await getDawCoopId();
    if (!cooperativeId) return { success: false, error: "Cooperative not found" };

    const response = await apiClient.post<{ success: boolean; data: ContributionTypeRecord }>(
      "/api/contributions/types",
      { ...formData, cooperativeId },
      { token }
    );

    return {
      success: true,
      data: response.data,
      message: "Contribution type created successfully",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create contribution type";
    return { success: false, error: message };
  }
}

/**
 * Get the logged-in member's contribution summary
 * (tier, monthly amount, last/next payment dates)
 */
export async function getMySummary(): Promise<IActionResponse<ContributionSummary>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const response = await apiClient.get<{ success: boolean; data: ContributionSummary }>(
      "/api/contributions/summary",
      { token }
    );

    return { success: true, data: response.data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch contribution summary";
    return { success: false, error: message };
  }
}

/**
 * Get the logged-in member's contribution history
 */
export async function getMyHistory(): Promise<IActionResponse<ContributionHistoryItem[]>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const response = await apiClient.get<ContributionHistoryItem[] | { data: ContributionHistoryItem[] }>(
      "/api/contributions/history",
      { token }
    );

    // Backend returns array directly
    const data = Array.isArray(response) ? response : (response as any).data || [];
    return { success: true, data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch contribution history";
    return { success: false, error: message };
  }
}

/**
 * Initiate a contribution payment via Vigipay
 * Returns a paymentUrl to redirect the user to
 */
export async function initiatePayment(
  amount: number,
  month: string
): Promise<IActionResponse<{ paymentUrl: string; reference: string }>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const response = await apiClient.post<{
      success: boolean;
      paymentUrl: string;
      reference: string;
    }>(
      "/api/contributions/pay",
      { amount, month },
      { token }
    );

    return {
      success: true,
      data: { paymentUrl: response.paymentUrl, reference: response.reference },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment initiation failed";
    return { success: false, error: message };
  }
}

/**
 * Update contribution type status (approve/reject)
 */
export async function updateContributionTypeStatusAction(
  id: string,
  status: "active" | "pending" | "rejected"
): Promise<IActionResponse<ContributionTypeRecord>> {
  try {
    const token = await getFreshToken();
    if (!token) return { success: false, error: "Authentication required" };

    const response = await apiClient.put<{ success: boolean; data: ContributionTypeRecord }>(
      `/api/contributions/types/${id}/status`,
      { status },
      { token }
    );

    return {
      success: true,
      data: response.data,
      message: "Status updated successfully",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update status";
    return { success: false, error: message };
  }
}
