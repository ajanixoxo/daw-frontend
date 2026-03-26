"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getFreshToken } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";
import { revalidatePath } from "next/cache";

interface DashboardStats {
  totalMembers: number;
  totalRevenue: number;
}

interface RevenueData {
  month: string;
  revenue: number;
}

interface TopMember {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  totalContributed: number;
  contributionCount: number;
}

interface RecentMember {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  joinDate: string;
  subscriptionTier: string;
  status: string;
}

export interface MemberDetails {
  member: {
    _id: string;
    userId: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      roles: string[];
      status: string;
      avatar?: string;
    };
    cooperativeId: string;
    subscriptionTierId: {
      _id: string;
      name: string;
      monthlyContribution: number;
    };
    monthlyContribution: number;
    status: string;
    joinDate: string;
  };
  shop?: {
    _id: string;
    name: string;
    description: string;
    category: string;
    logo_url?: string;
    banner_url?: string;
    status: string;
  };
  stats: {
    totalContributions: number;
    contributionsCount: number;
    totalLoans: number;
    activeLoans: number;
    totalSales: number;
    productsListed: number;
    ordersCompleted: number;
  };
}

/**
 * Get cooperative dashboard statistics (total members and revenue)
 */
export async function getCooperativeDashboardStats(): Promise<
  IActionResponse<DashboardStats>
> {
  try {
    const token = await getFreshToken();

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.get<{ success: boolean; data: DashboardStats }>(
      "/api/cooperatives/dashboard/stats",
      { token }
    );

    return {
      success: true,
      data: response.data,
      message: "Dashboard stats fetched successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch dashboard stats";
    return { success: false, error: message };
  }
}

/**
 * Get revenue chart data for the past 12 months
 */
export async function getRevenueChartData(): Promise<
  IActionResponse<RevenueData[]>
> {
  try {
    const token = await getFreshToken();

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.get<{ success: boolean; data: RevenueData[] }>(
      "/api/cooperatives/dashboard/revenue",
      { token }
    );

    return {
      success: true,
      data: response.data,
      message: "Revenue chart data fetched successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch revenue chart data";
    return { success: false, error: message };
  }
}

/**
 * Get top members ranked by total contribution amount
 */
export async function getTopMembers(): Promise<
  IActionResponse<TopMember[]>
> {
  try {
    const token = await getFreshToken();

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.get<{ success: boolean; data: TopMember[] }>(
      "/api/cooperatives/dashboard/top-members",
      { token }
    );

    return {
      success: true,
      data: response.data,
      message: "Top members fetched successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch top members";
    return { success: false, error: message };
  }
}

/**
 * Get the 4 most recent members who joined
 */
export async function getRecentMembers(): Promise<
  IActionResponse<RecentMember[]>
> {
  try {
    const token = await getFreshToken();

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.get<{ success: boolean; data: RecentMember[] }>(
      "/api/cooperatives/dashboard/recent-members",
      { token }
    );

    return {
      success: true,
      data: response.data,
      message: "Recent members fetched successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch recent members";
    return { success: false, error: message };
  }
}

export interface CooperativeMember {
  memberId: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joinDate: string;
  subscriptionTier: string;
  monthlyContribution: number;
  status: string;
  roles: string[];
}

/**
 * Get all members for the DAW cooperative.
 * Replicates the same fetch pattern as getRecentMembers.
 */
export async function getAllCooperativeMembers(): Promise<
  IActionResponse<CooperativeMember[]>
> {
  try {
    const token = await getFreshToken();

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    // Step 1: Get the DAW cooperative ID (same as dashboard pattern)
    const coopResponse = await apiClient.get<{
      success: boolean;
      cooperative: { _id: string };
    }>("/api/cooperatives/daw");

    const cooperativeId = coopResponse?.cooperative?._id;
    if (!cooperativeId) {
      return { success: false, error: "DAW Cooperative not found" };
    }

    // Step 2: Fetch all members for this cooperative
    const members = await apiClient.get<any[]>(
      `/api/members/cooperative/${cooperativeId}`,
      { token }
    );

    // Step 3: Flatten the response (same pattern as getRecentMembers)
    const rawMembers = Array.isArray(members) ? members : [];
    const formattedMembers: CooperativeMember[] = rawMembers.map((member: any) => {
      // console.log("Mapping member:", member._id, member.userId);
      const mId = member._id || member.id;
      if (!mId) console.error("Member ID missing for member:", member);
      
      return {
        memberId: mId || "",
        userId: member.userId?._id || member.userId || "",
        firstName: member.userId?.firstName || "",
        lastName: member.userId?.lastName || "",
        email: member.userId?.email || "",
        phone: member.userId?.phone || "",
        joinDate: member.createdAt || member.joinDate || "",
        subscriptionTier: member.subscriptionTierId?.name || "N/A",
        monthlyContribution: member.subscriptionTierId?.monthlyContribution || 0,
        status: member.status || "active",
        roles: member.userId?.roles || [],
      };
    });
    
    console.log("Formatted members count:", formattedMembers.length);
    if (formattedMembers.length > 0) {
        console.log("Sample member:", formattedMembers[0]);
    }



    return {
      success: true,
      data: formattedMembers,
      message: "Members fetched successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch members";
    console.error("getAllCooperativeMembers error:", message);
    return { success: false, error: message };
  }
}

/**
 * Get detailed member info (Profile, Shop, Stats)
 */
export async function getMemberDetails(
  memberId: string
): Promise<IActionResponse<MemberDetails>> {
  try {
    const token = await getFreshToken();

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.get<MemberDetails>(
      `/api/members/${memberId}/details`,
      { token }
    );

    return {
      success: true,
      data: response,
      message: "Member details fetched successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch member details";
    return { success: false, error: message };
  }
}

/**
 * Remove a member from the cooperative
 */
export async function removeMemberAction(
  memberId: string
): Promise<IActionResponse<void>> {
  try {
    const token = await getFreshToken();

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    await apiClient.delete(
      `/api/members/${memberId}`,
      undefined,
      { token }
    );

    revalidatePath("/cooperative/members");
    return { success: true, message: "Member removed successfully" };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to remove member";
    return { success: false, error: message };
  }
}
