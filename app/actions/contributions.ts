"use server";

import { apiClient } from "@/lib/api/client";
import { getServerSession } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";

// ---------- Interfaces ----------

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
    const session = await getServerSession();
    const token = session?.accessToken;
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
    const session = await getServerSession();
    const token = session?.accessToken;
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
 * Get contribution types for the DAW cooperative
 */
export async function getContributionTypes(): Promise<
  IActionResponse<ContributionTypeRecord[]>
> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;
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
    const session = await getServerSession();
    const token = session?.accessToken;
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
    const session = await getServerSession();
    const token = session?.accessToken;
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
 * Update contribution type status (approve/reject)
 */
export async function updateContributionTypeStatusAction(
  id: string,
  status: "active" | "pending" | "rejected"
): Promise<IActionResponse<ContributionTypeRecord>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;
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
