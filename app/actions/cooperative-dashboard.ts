"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";

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

/**
 * Get cooperative dashboard statistics (total members and revenue)
 */
export async function getCooperativeDashboardStats(): Promise<
  IActionResponse<DashboardStats>
> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

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
    const session = await getServerSession();
    const token = session?.accessToken;

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
    const session = await getServerSession();
    const token = session?.accessToken;

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
    const session = await getServerSession();
    const token = session?.accessToken;

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
